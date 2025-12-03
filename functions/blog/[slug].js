// This function intercepts social media crawlers and search engines
// Returns proper meta tags and structured data for SEO and social previews

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
  'yandex',
  'baiduspider',
  'duckduckbot',
  'applebot',
  'petalbot',
  'semrushbot',
  'ahrefsbot',
]

function isBot(userAgent) {
  if (!userAgent) return false
  const ua = userAgent.toLowerCase()
  return BOT_USER_AGENTS.some((bot) => ua.includes(bot))
}

function escapeHtml(text) {
  if (!text) return ''
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
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
        tags: props.Tags?.multi_select?.map((t) => t.name) || [],
      }
    }

    const { title, description, cover, date, author, tags } = post
    const pageUrl = `${BASE_URL}/blog/${slug}`
    const ogImage = cover || `${BASE_URL}/og-image.png`
    
    // Escape HTML entities for safety
    const safeTitle = escapeHtml(title)
    const safeDescription = escapeHtml(description)
    const safeAuthor = escapeHtml(author)

    // JSON-LD structured data for SEO
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: title,
      description: description,
      image: ogImage,
      url: pageUrl,
      datePublished: date || undefined,
      dateModified: date || undefined,
      author: {
        '@type': 'Person',
        name: author,
        url: BASE_URL,
      },
      publisher: {
        '@type': 'Person',
        name: 'Vikas Rathod',
        url: BASE_URL,
        logo: {
          '@type': 'ImageObject',
          url: `${BASE_URL}/favicons/favicon-32x32.png`,
        },
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': pageUrl,
      },
      keywords: tags?.join(', ') || '',
    }

    // Breadcrumb structured data
    const breadcrumbData = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: BASE_URL,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Blog',
          item: `${BASE_URL}/blog`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: title,
          item: pageUrl,
        },
      ],
    }

    // Return SEO-friendly HTML with proper meta tags and structured data
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- Primary Meta Tags -->
  <title>${safeTitle} | Vikas Rathod</title>
  <meta name="title" content="${safeTitle} | Vikas Rathod">
  <meta name="description" content="${safeDescription}">
  <meta name="author" content="${safeAuthor}">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
  <meta name="googlebot" content="index, follow">
  <link rel="canonical" href="${pageUrl}">
  ${tags?.length ? `<meta name="keywords" content="${escapeHtml(tags.join(', '))}">` : ''}
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="article">
  <meta property="og:url" content="${pageUrl}">
  <meta property="og:title" content="${safeTitle}">
  <meta property="og:description" content="${safeDescription}">
  <meta property="og:image" content="${ogImage}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:site_name" content="Vikas Rathod">
  <meta property="og:locale" content="en_US">
  ${date ? `<meta property="article:published_time" content="${date}">` : ''}
  <meta property="article:author" content="${safeAuthor}">
  ${tags?.map(tag => `<meta property="article:tag" content="${escapeHtml(tag)}">`).join('\n  ') || ''}
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:url" content="${pageUrl}">
  <meta name="twitter:title" content="${safeTitle}">
  <meta name="twitter:description" content="${safeDescription}">
  <meta name="twitter:image" content="${ogImage}">
  <meta name="twitter:creator" content="@vikasxrathod">
  <meta name="twitter:site" content="@vikasxrathod">
  
  <!-- Favicons -->
  <link rel="icon" href="/favicons/favicon.ico">
  <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png">
  
  <!-- Structured Data / JSON-LD -->
  <script type="application/ld+json">${JSON.stringify(structuredData)}</script>
  <script type="application/ld+json">${JSON.stringify(breadcrumbData)}</script>
</head>
<body>
  <article>
    <header>
      <h1>${safeTitle}</h1>
      <p>${safeDescription}</p>
      ${date ? `<time datetime="${date}">${new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>` : ''}
      <span>By ${safeAuthor}</span>
    </header>
    ${cover ? `<img src="${cover}" alt="${safeTitle}" width="1200" height="630">` : ''}
    <nav aria-label="Breadcrumb">
      <ol>
        <li><a href="${BASE_URL}">Home</a></li>
        <li><a href="${BASE_URL}/blog">Blog</a></li>
        <li>${safeTitle}</li>
      </ol>
    </nav>
    <p>Loading full article...</p>
    <a href="${pageUrl}">Read the full article</a>
  </article>
  
  <!-- Redirect browsers that execute JS to the SPA version -->
  <script>window.location.replace("${pageUrl}");</script>
</body>
</html>`

    return new Response(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html;charset=UTF-8',
        'Cache-Control': 'public, max-age=86400', // Cache for 1 day
      },
    })
  } catch (err) {
    console.error('Error generating meta tags:', err)
    // Fallback to SPA
    return env.ASSETS.fetch(request)
  }
}
