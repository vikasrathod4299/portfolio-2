export async function onRequest(context) {
  const { env } = context;

  const accessToken = await getAccessToken(env);

  const resp = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (resp.status === 204 || resp.status > 400) {
    return new Response(JSON.stringify({ isPlaying: false }), {
      headers: { "content-type": "application/json" },
    });
  }

  const song = await resp.json();

  return new Response(
    JSON.stringify({
      isPlaying: song.is_playing,
      name: song.item.name,
      artist: song.item?.artists?.map((a) => a.name).join(", "),
      album: song.item?.album?.name,
      albumImageUrl: song.item?.album?.images?.[0]?.url,
      songUrl: song.item?.external_urls?.spotify,
    }),
    { headers: { "content-type": "application/json" } }
  );
}

async function getAccessToken(env) {
  const resp = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization:
        "Basic " + btoa(`${env.VITE_SPOTIFY_CLIENT_ID}:${env.VITE_SPOTIFY_CLIENT_SECRET}`),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `grant_type=refresh_token&refresh_token=${env.VITE_SPOTIFY_REFRESH_TOKEN}`,
  });

  const data = await resp.json();
  return data.access_token;
}
