import { NotionToMarkdown } from 'notion-to-md'
export async function onRequest(context) {
  const { VITE_NOTION_TOKEN, VITE_NOTION_DATA_SOURCE_ID } = context.env
  const slug = context.params.slug

  if (!VITE_NOTION_TOKEN || !VITE_NOTION_DATA_SOURCE_ID) {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Notion configuration missing',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    )
  }
  if (!slug) {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Slug not provided',
      }),
      { status: 400, headers: { 'Content-Type': 'application/json' } },
    )
  }

  try {
    // 1. Query database to find page with matching slug
    const queryUrl = `https://api.notion.com/v1/data_sources/${VITE_NOTION_DATA_SOURCE_ID}/query`
    const queryRes = await fetch(queryUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${VITE_NOTION_TOKEN}`,
        'Notion-Version': '2025-09-03',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        filter: {
          property: 'Slug',
          rich_text: { equals: slug },
        },
      }),
    })

    if (!queryRes.ok) {
      const errText = await queryRes.text()
      throw new Error(`Notion query error: ${errText}`)
    }

    const queryJson = await queryRes.json()
    const results = queryJson.results
    if (!results || results.length === 0) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Post not found',
        }),
        { status: 404, headers: { 'Content-Type': 'application/json' } },
      )
    }

    const page = results[0]
    const pageId = page.id

    // 2. Fetch block children (content) of the page
    const blocksUrl = `https://api.notion.com/v1/blocks/${pageId}/children?page_size=100`
    const blocksRes = await fetch(blocksUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${VITE_NOTION_TOKEN}`,
        'Notion-Version': '2025-09-03',
        'Content-Type': 'application/json',
      },
    })

    if (!blocksRes.ok) {
      const errText = await blocksRes.text()
      throw new Error(`Notion blocks error: ${errText}`)
    }

    const blocksJson = await blocksRes.json()

    const n2m = new NotionToMarkdown({
      notionClient:  {blocks: {children: {list: async () => blocksJson}}}
    })

    const mdBlocks = await n2m.pageToMarkdown(blocksJson.results)
    const mdString = n2m.toMarkdownString(mdBlocks)
    const html = mdString.parent
      .replace(/^### (.*$)/gim, "<h3>$1</h3>")
      .replace(/^## (.*$)/gim, "<h2>$1</h2>")
      .replace(/^# (.*$)/gim, "<h1>$1</h1>")
      .replace(/^\> (.*$)/gim, "<blockquote>$1</blockquote>")
      .replace(/\*\*(.*)\*\*/gim, "<b>$1</b>")
      .replace(/\*(.*)\*/gim, "<i>$1</i>")
      .replace(/\n$/gim, "<br />");


    // 3. Compose the response object
    const props = page.properties
    const post = {
      id: pageId,
      title: props.Name?.title?.[0]?.plain_text || '',
      description: props.Description?.rich_text?.[0]?.plain_text || '',
      slug: props.Slug?.rich_text?.[0]?.plain_text || '',
      date: props['Published Date']?.date?.start || '',
      tags: props.Tags?.multi_select?.map((t) => t.name) || [],
      author: props.Author?.rich_text?.[0]?.plain_text || 'Vikas Rathod',
      readingTime: props['Reading Time']?.number || null,
      cover:
        props.Cover?.files?.[0]?.file?.url ||
        props.Cover?.files?.[0]?.external?.url ||
        null,
      //content: mdString?.parent ? mdString.parent : null,
      htmlContent: html ? html : null,
    }

    return new Response(
      JSON.stringify({
        success: true,
        post,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  } catch (err) {
    console.error('Error in slug endpoint:', err)
    return new Response(
      JSON.stringify({
        success: false,
        error: err.message,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }
}
