const MODELS = [
  'openai/gpt-oss-120b:free',
  'deepseek/deepseek-r1-0528:free',
  'mistralai/mistral-small-3.2-24b-instruct:free',
  'google/gemma-3-27b-it:free',
  'meta-llama/llama-3.3-70b-instruct:free',
]

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { prompt } = req.body
  if (!prompt) return res.status(400).json({ error: 'Prompt is required' })

  const apiKey = process.env.OPENROUTER_API_KEY || process.env.VITE_OPENROUTER_API_KEY
  if (!apiKey) return res.status(500).json({ error: 'API key not configured' })

  for (const model of MODELS) {
    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'HTTP-Referer': 'https://your-app.vercel.app',
          'X-Title': 'Resume Builder'
        },
        body: JSON.stringify({
          model,
          messages: [{ role: 'user', content: prompt }]
        })
      })

      const data = await response.json()
      const text = data?.choices?.[0]?.message?.content

      if (response.ok && text?.trim()) {
        return res.status(200).json({ text })
      }
    } catch (err) {
      continue
    }
  }

  res.status(500).json({ error: 'All AI models are currently unavailable. Try again shortly.' })
}