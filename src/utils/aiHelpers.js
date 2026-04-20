
async function askAI(prompt) {
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
      'HTTP-Referer': 'http://localhost:5173',
      'X-Title': 'Resume Builder'
    },
    body: JSON.stringify({
      model: 'openai/gpt-oss-120b:free',
      messages: [{ role: 'user', content: prompt }]
    })
  })

  const data = await response.json()
  console.log('OpenRouter response:', JSON.stringify(data, null, 2))

  if (!response.ok) {
    throw new Error(data?.error?.message || 'OpenRouter API failed')
  }

  if (!data.choices || data.choices.length === 0) {
    throw new Error('No response from AI. Try again.')
  }

  return data.choices[0].message.content
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
    Return ONLY a valid JSON object with:
    - score: number from 0-100
    - matched_keywords: array of matched keywords
    - missing_keywords: array of missing keywords
    - suggestions: array of 3 improvement tips

    Resume:
    Name: ${resumeData?.personal?.name || ''}
    Skills: ${resumeData?.skills?.technical || ''}, ${resumeData?.skills?.tools || ''}
    Experience: ${experienceText}

    Job Description: ${jobDescription}
  `)

  const clean = raw.replace(/```json|```/g, '').trim()
  const start = clean.indexOf('{')
  const end = clean.lastIndexOf('}')
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
export async function checkATSRaw(resumeText, jobDescription) {
  return await askAI(`
    You are an ATS expert. Analyze this resume text against the job description.
    Return ONLY a valid JSON object with:
    - score: number from 0-100
    - matched_keywords: array of matched keywords
    - missing_keywords: array of missing keywords
    - suggestions: array of 3 improvement tips

    Resume Text: ${resumeText.slice(0, 3000)}

    Job Description: ${jobDescription}
  `)
}