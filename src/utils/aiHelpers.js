const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY

const MODELS = [
  'openai/gpt-oss-120b:free',
  'deepseek/deepseek-r1-0528:free',
  'mistralai/mistral-small-3.2-24b-instruct:free',
  'google/gemma-3-27b-it:free',
  'meta-llama/llama-3.3-70b-instruct:free',
]

async function tryModel(model, prompt) {
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`,
      'HTTP-Referer': window.location.origin,
      'X-Title': 'Resume Builder'
    },
    body: JSON.stringify({
      model,
      messages: [{ role: 'user', content: prompt }]
    })
  })

  const data = await response.json()
  console.log(`Model ${model}:`, data)

  if (!response.ok) throw new Error(data?.error?.message || 'Request failed')

  const text = data?.choices?.[0]?.message?.content
  if (!text || text.trim() === '') throw new Error('Empty response')

  return text
}

async function askAI(prompt) {
  // Try each model until one works
  for (const model of MODELS) {
    try {
      console.log(`Trying model: ${model}`)
      const text = await tryModel(model, prompt)
      console.log(`✅ Success with ${model}`)
      return text
    } catch (err) {
      console.warn(`❌ ${model} failed:`, err.message)
      continue
    }
  }

  // All models failed — try proxy
  console.log('All direct models failed, trying proxy...')
  try {
    const response = await fetch('/api/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data?.error || 'Proxy failed')
    return data.text
  } catch (err) {
    throw new Error('All AI models are currently unavailable. Please try again in a moment.')
  }
}

export async function improveBullet(bullet, role, company) {
  return await askAI(`
    Improve this resume bullet point for a ${role} role at ${company}.
    Make it more impactful, quantified, and action-oriented.
    Return ONLY the improved bullet point, nothing else.
    Original: ${bullet}
  `)
}

export async function generateSummary(personal, education, experience, skills) {
  return await askAI(`
    Write a professional resume summary (3-4 sentences) for this person:
    Name: ${personal.name}
    Education: ${education[0]?.degree} from ${education[0]?.school}
    Experience: ${experience[0]?.role} at ${experience[0]?.company}
    Skills: ${skills.technical}
    Return ONLY the summary, nothing else.
  `)
}

export async function checkATS(resumeData, jobDescription) {
  const experienceText = (resumeData?.experience || [])
    .map(e => `${e?.role || ''} at ${e?.company || ''}: ${(e?.bullets || []).join(', ')}`)
    .join('\n')

  const raw = await askAI(`
    You are an ATS expert. Analyze this resume against the job description.
    Return ONLY a valid JSON object with no extra text:
    {
      "score": number from 0-100,
      "matched_keywords": ["keyword1", "keyword2"],
      "missing_keywords": ["keyword1", "keyword2"],
      "suggestions": ["tip1", "tip2", "tip3"]
    }

    Resume:
    Name: ${resumeData?.personal?.name || ''}
    Skills: ${resumeData?.skills?.technical || ''}, ${resumeData?.skills?.tools || ''}
    Experience: ${experienceText}

    Job Description: ${jobDescription}
  `)

  const clean = raw.replace(/```json|```/g, '').trim()
  const start = clean.indexOf('{')
  const end = clean.lastIndexOf('}')
  if (start === -1 || end === -1) throw new Error('Invalid JSON response from AI')
  return clean.slice(start, end + 1)
}

export async function checkATSRaw(resumeText, jobDescription) {
  const raw = await askAI(`
    You are an ATS expert. Analyze this resume text against the job description.
    Return ONLY a valid JSON object with no extra text:
    {
      "score": number from 0-100,
      "matched_keywords": ["keyword1", "keyword2"],
      "missing_keywords": ["keyword1", "keyword2"],
      "suggestions": ["tip1", "tip2", "tip3"]
    }

    Resume Text: ${resumeText.slice(0, 3000)}
    Job Description: ${jobDescription}
  `)

  const clean = raw.replace(/```json|```/g, '').trim()
  const start = clean.indexOf('{')
  const end = clean.lastIndexOf('}')
  if (start === -1 || end === -1) throw new Error('Invalid JSON response from AI')
  return clean.slice(start, end + 1)
}

export async function tailorResume(resumeData, jobDescription) {
  return await askAI(`
    Rewrite this resume summary to better match the job description.
    Return ONLY the improved summary, nothing else.
    Current summary: ${resumeData.personal.summary}
    Job Description: ${jobDescription}
  `)
}