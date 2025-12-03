// This function intercepts social media crawlers and returns proper meta tags
// for blog post previews on Twitter, Facebook, LinkedIn, etc.

const BOT_USER_AGENTS = [
  'twitterbot',
  'facebookexternalhit',
  'linkedinbot',
  'slackbot',
  'discordbot',
  'telegrambot',
  'whatsapp',
  'pinterest',
  'googlebot',
  'bingbot',
]

function isBot(userAgent) {
  if (!userAgent) return false
  const ua = userAgent.toLowerCase()
  return BOT_USER_AGENTS.some((bot) => ua.includes(bot))
}

export async function onRequest(context) {
  const { request, env, params } = context
  const userAgent = request.headers.get('user-agent') || ''

  // If not a bot, let the request pass through to the SPA
  if (!isBot(userAgent)) {
    return env.ASSETS.fetch(request)
  }

  const slug = params.slug
  const { BLOG_CACHE, VITE_NOTION_TOKEN, VITE_NOTION_DATA_SOURCE_ID } = env
  const BASE_URL = 'https://vikasrathod.dev'

  try {
    // Check cache first
    const cacheKey = `post_${slug}`
    let post = await BLOG_CACHE.get(cacheKey, { type: 'json' })

    // If not in cache, fetch from Notion
    if (!post) {
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
        return env.ASSETS.fetch(request)
      }

      const queryJson = await queryRes.json()
      const results = queryJson.results

      if (!results || results.length === 0) {
        return env.ASSETS.fetch(request)
      }

      const page = results[0]
      const props = page.properties

      post = {
        title: props.Name?.title?.[0]?.plain_text || 'Blog Post',
        description: props.Description?.rich_text?.[0]?.plain_text || '',
        cover:
          props.Cover?.files?.[1]?.file?.url ||
          props.Cover?.files?.[1]?.external?.url ||
          props.Cover?.files?.[0]?.file?.url ||
          props.Cover?.files?.[0]?.external?.url ||
          null,
        date: props['Published Date']?.date?.start || '',
        author: props.Author?.rich_text?.[0]?.plain_text || 'Vikas Rathod',
      }
    }

    const { title, description, cover, date, author } = post
    const pageUrl = `${BASE_URL}/blog/${slug}`
    const ogImage = cover || `${BASE_URL}/og-image.png`

    // Return HTML with proper meta tags for social media crawlers
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- Primary Meta Tags -->
  <title>${title} - Vikas Rathod</title>
  <meta name="title" content="${title} - Vikas Rathod">
  <meta name="description" content="${description}">
  <meta name="author" content="${author}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${pageUrl}">
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="article">
  <meta property="og:url" content="${pageUrl}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:image" content="${ogImage}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:site_name" content="Vikas Rathod">
  ${date ? `<meta property="article:published_time" content="${date}">` : ''}
  <meta property="article:author" content="${author}">
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:url" content="${pageUrl}">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:image" content="${ogImage}">
  <meta name="twitter:creator" content="@vikasxrathod">
  
  <!-- Redirect to actual page for any browser that might execute JS -->
  <meta http-equiv="refresh" content="0;url=${pageUrl}">
</head>
<body>
  <h1>${title}</h1>
  <p>${description}</p>
  <a href="${pageUrl}">Read more</a>
</body>
</html>`

    return new Response(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html;charset=UTF-8',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    })
  } catch (err) {
    console.error('Error generating meta tags:', err)
    // Fallback to SPA
    return env.ASSETS.fetch(request)
  }
}
