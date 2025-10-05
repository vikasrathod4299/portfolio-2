export async function onRequest(context) {
  const { VITE_NOTION_TOKEN, VITE_NOTION_DATA_SOURCES_ID } = context.env;
  const slug = context.params.slug;

  if (!VITE_NOTION_TOKEN || !VITE_NOTION_DATA_SOURCES_ID) {
    return new Response(
      JSON.stringify({ success: false, error: "Missing Notion configuration" }),
      { status: 500 }
    );
  }

  if (!slug) {
    return new Response(
      JSON.stringify({ success: false, error: "Missing slug" }),
      { status: 400 }
    );
  }

  try {
    // 1️⃣ Query database to find page with matching slug
    const queryUrl = `https://api.notion.com/v1/data_sources/${VITE_NOTION_DATA_SOURCES_ID}/query`;
    const queryRes = await fetch(queryUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${VITE_NOTION_TOKEN}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filter: {
          property: "Slug",
          rich_text: { equals: slug },
        },
      }),
    });

    if (!queryRes.ok) {
      const errText = await queryRes.text();
      throw new Error(`Notion query error: ${errText}`);
    }

    const queryData = await queryRes.json();
    if (!queryData.results.length) {
      return new Response(
        JSON.stringify({ success: false, error: "Post not found" }),
        { status: 404 }
      );
    }

    const page = queryData.results[0];
    const pageId = page.id;

    // 2️⃣ Fetch full content blocks for the page
    const blocksUrl = `https://api.notion.com/v1/blocks/${pageId}/children?page_size=100`;
    const blocksRes = await fetch(blocksUrl, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${VITE_NOTION_TOKEN}`,
        "Notion-Version": "2022-06-28",
      },
    });

    if (!blocksRes.ok) {
      const errText = await blocksRes.text();
      throw new Error(`Notion blocks error: ${errText}`);
    }

    const blocksData = await blocksRes.json();

    // 3️⃣ Prepare response
    const props = page.properties;
    const post = {
      id: pageId,
      title: props.Name?.title?.[0]?.plain_text || "",
      slug: props.Slug?.rich_text?.[0]?.plain_text || "",
      date: props["Published Date"]?.date?.start || "",
      tags: props.tags?.multi_select?.map((t) => t.name) || [],
      cover:
        props.cover?.files?.[0]?.file?.url ||
        props.cover?.files?.[0]?.external?.url ||
        null,
      content: blocksData.results, // full Notion blocks
    };

    return new Response(
      JSON.stringify({ success: true, post }),
      { headers: { "Content-Type": "application/json" }, status: 200 }
    );
  } catch (err) {
    console.error("Error fetching post by slug:", err);
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { headers: { "Content-Type": "application/json" }, status: 500 }
    );
  }
}
