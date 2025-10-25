export async function onRequest(context) {
  const { searchParams } = new URL(context.request.url)
  const notionUrl = searchParams.get("url")

  if (!notionUrl) {
    return new Response("Missing ?url parameter", { status: 400 })
  }

  const optimizedUrl = `https://vikasrathod.dev/cdn-cgi/image/width=800,quality=80/${notionUrl}`

  return Response.redirect(optimizedUrl, 302)
}
