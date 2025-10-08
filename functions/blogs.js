export async function onRequest(context) {
  const { VITE_NOTION_TOKEN, VITE_NOTION_DATA_SOURCE_ID } = context.env
if (!VITE_NOTION_TOKEN || !VITE_NOTION_DATA_SOURCE_ID) {
    return new Response(
      JSON.stringify(
        { error: 'Notion configuration is missing.', success: false },
        { status: 500, headers: { 'content-type': 'application/json' } },
      ),
    )
  }
  const NOTION_API_URL = `https://api.notion.com/v1/data_sources/${VITE_NOTION_DATA_SOURCE_ID}/query`

  try {
    // Fetch blog posts from Notion
    const res = await fetch(NOTION_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${VITE_NOTION_TOKEN}`,
        'Notion-Version': '2025-09-03',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        filter: {
          property: 'Published',
          checkbox: { equals: true },
        },
        sorts: [{ property: 'Published Date', direction: 'descending' }],
      }),
    })

    if (!res.ok) {
      const errText = await res.text()
      throw new Error(`Notion API error: ${errText}`)
    }

    const data = await res.json()

    // Transform Notion data → simplified JSON
    const posts = data.results.map((page) => {
      const props = page.properties

      return {
        id: page.id,
        title: props.Name?.title?.[0]?.plain_text || 'Untitled',
        slug: props.Slug?.rich_text?.[0]?.plain_text || '',
        date: props['Published Date']?.date?.start || '',
        tags: props.Tags?.multi_select?.map((tag) => tag.name) || [],
        description: props.Description?.rich_text?.[0]?.plain_text || '',
        thumbnail: props.Thumbnail?.files?.[0]?.file?.url ||
          props.Thumbnail?.files?.[0]?.external?.url ||
          null,
        author: props.Author?.rich_text?.[0]?.plain_text || 'Vikas Rathod',
        readingTime: props['Reading Time']?.number || null,
        url: page.url,
      }
    })

    // Return posts as JSON
    return new Response(JSON.stringify({ success: true, posts }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (err) {
    console.error('Error fetching blogs:', err)
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { headers: { 'Content-Type': 'application/json' }, status: 500 },
    )
  }
}
