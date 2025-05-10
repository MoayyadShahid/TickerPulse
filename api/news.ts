// api/news.ts

const NEWS_API_KEY = process.env.VITE_NEWSAPI_KEY
const NEWS_DOMAINS = 'bloomberg.com,cnbc.com,reuters.com,wsj.com,ft.com'

export default async function handler(req, res) {
  const { ticker } = req.query
  if (typeof ticker !== 'string' || !ticker.trim()) {
    return res.status(400).json({ error: 'Missing ticker parameter' })
  }

  const url = new URL('https://newsapi.org/v2/everything')
  url.searchParams.set('q', ticker)
  url.searchParams.set('domains', NEWS_DOMAINS)
  url.searchParams.set('language', 'en')
  url.searchParams.set('sortBy', 'publishedAt')
  url.searchParams.set('pageSize', '40')
  url.searchParams.set('apiKey', NEWS_API_KEY!)

  try {
    const apiRes = await fetch(url.toString())
    if (!apiRes.ok) {
      const body = await apiRes.json().catch(() => ({}))
      return res.status(apiRes.status).json(body)
    }
    const data = await apiRes.json()
    return res.status(200).json(data)
  } catch (err: unknown) {
    console.error('Proxy error:', err)
    const message = err instanceof Error ? err.message : String(err)
    return res.status(500).json({ error: message })
  }
}
