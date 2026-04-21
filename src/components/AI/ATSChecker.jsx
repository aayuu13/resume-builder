import { useState } from 'react'
import { checkATS } from '../../utils/aiHelpers'

export default function ATSChecker({ resumeData }) {
  const [jobDesc, setJobDesc] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleCheck = async () => {
    if (!resumeData || !resumeData.trim()) {
      alert('Resume data is empty. Please generate or upload your resume first.')
      return
    }
    if (!jobDesc.trim()) {
      alert('Please paste a job description')
      return
    }

    setLoading(true)
    setError('')
    setResult(null)

    try {
      console.log('=== ATS Check Started ===')
      console.log('Resume text length:', resumeData.length)
      console.log('Job description length:', jobDesc.length)

      const rawResponse = await checkATS(resumeData, jobDesc)
      
      console.log('Raw AI Response:', rawResponse)

      if (!rawResponse || typeof rawResponse !== 'string') {
        throw new Error('Invalid response from AI')
      }

      // Clean the response (remove markdown code blocks)
      let cleaned = rawResponse.replace(/```json|```/g, '').trim()

      // Find JSON object
      const start = cleaned.indexOf('{')
      const end = cleaned.lastIndexOf('}')

      if (start === -1 || end === -1) {
        console.error('No JSON found in response:', cleaned)
        throw new Error('AI did not return valid JSON')
      }

      const jsonString = cleaned.slice(start, end + 1)
      console.log('Extracted JSON string:', jsonString)

      const parsedResult = JSON.parse(jsonString)
      
      console.log('Successfully parsed result:', parsedResult)

      // Basic validation
      if (typeof parsedResult.score !== 'number') {
        throw new Error('Score is missing or invalid in AI response')
      }

      setResult(parsedResult)

    } catch (err) {
      console.error('ATS Check Failed:', err)
      setError(err.message || 'Something went wrong')
      alert(`Failed to analyze: ${err.message || 'Unknown error'}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-2xl p-8 mt-6" style={{ backgroundColor: '#ffffff', border: '1px solid #ede9e3' }}>
      <h2 style={{ fontSize: 18, fontWeight: 600, color: '#1c1917', marginBottom: 4 }}>
        ATS Score Checker
      </h2>
      <p style={{ fontSize: 13, color: '#a8a29e', marginBottom: 20 }}>
        Paste a job description to see how well your resume matches
      </p>

      <textarea
        value={jobDesc}
        onChange={e => setJobDesc(e.target.value)}
        placeholder="Paste the job description here..."
        rows={6}
        className="w-full rounded-xl px-4 py-3 text-sm outline-none resize-none"
        style={{ 
          border: '1px solid #ede9e3', 
          backgroundColor: '#faf9f7', 
          color: '#1c1917', 
          marginBottom: 16 
        }}
      />

      <button
        onClick={handleCheck}
        disabled={loading || !jobDesc.trim() || !resumeData}
        className="w-full py-3 rounded-xl text-sm font-semibold transition"
        style={{
          backgroundColor: loading || !jobDesc.trim() || !resumeData ? '#e7e5e4' : '#1c1917',
          color: loading || !jobDesc.trim() || !resumeData ? '#a8a29e' : '#ffffff',
        }}
      >
        {loading ? 'Analyzing with AI...' : 'Check ATS Score'}
      </button>

      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          {error}
        </div>
      )}

      {result && (
        <div className="mt-6 space-y-5">
          {/* Score Section */}
          <div className="text-center py-4">
            <div style={{
              fontSize: 52,
              fontWeight: 300,
              color: result.score >= 70 ? '#16a34a' : result.score >= 40 ? '#d97706' : '#dc2626',
              letterSpacing: '-2px'
            }}>
              {result.score}
            </div>
            <div style={{ fontSize: 12, color: '#a8a29e', letterSpacing: '0.08em' }}>ATS MATCH SCORE</div>
            
            <div className="w-full rounded-full mt-3" style={{ height: 4, backgroundColor: '#ede9e3' }}>
              <div
                className="rounded-full transition-all"
                style={{
                  height: 4,
                  width: `${Math.min(result.score, 100)}%`,
                  backgroundColor: result.score >= 70 ? '#16a34a' : result.score >= 40 ? '#d97706' : '#dc2626'
                }}
              />
            </div>
          </div>

          {/* Matched Keywords */}
          {result.matched_keywords?.length > 0 && (
            <div>
              <p style={{ fontSize: 11, fontWeight: 600, color: '#78716c', letterSpacing: '0.08em', marginBottom: 8 }}>MATCHED KEYWORDS</p>
              <div className="flex flex-wrap gap-2">
                {result.matched_keywords.map((k, i) => (
                  <span key={i} className="px-3 py-1 rounded-full text-xs" style={{ backgroundColor: '#f0fdf4', color: '#16a34a' }}>
                    {k}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Missing Keywords */}
          {result.missing_keywords?.length > 0 && (
            <div>
              <p style={{ fontSize: 11, fontWeight: 600, color: '#78716c', letterSpacing: '0.08em', marginBottom: 8 }}>MISSING KEYWORDS</p>
              <div className="flex flex-wrap gap-2">
                {result.missing_keywords.map((k, i) => (
                  <span key={i} className="px-3 py-1 rounded-full text-xs" style={{ backgroundColor: '#fef2f2', color: '#dc2626' }}>
                    {k}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Suggestions */}
          {result.suggestions?.length > 0 && (
            <div>
              <p style={{ fontSize: 11, fontWeight: 600, color: '#78716c', letterSpacing: '0.08em', marginBottom: 8 }}>SUGGESTIONS</p>
              <div className="space-y-3">
                {result.suggestions.map((s, i) => (
                  <div key={i} className="flex gap-3 text-sm" style={{ color: '#57534e' }}>
                    <span style={{ color: '#c4bfba', flexShrink: 0 }}>→</span> 
                    {s}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}