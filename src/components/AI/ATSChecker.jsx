import { useState } from 'react'
import { checkATS } from '../../utils/aiHelpers'

export default function ATSChecker({ resumeData }) {
  const [jobDesc, setJobDesc] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleCheck = async () => {
    if (!jobDesc.trim()) return
    setLoading(true)
    try {
      const raw = await checkATS(resumeData, jobDesc)
      const clean = raw.replace(/```json|```/g, '').trim()
      const start = clean.indexOf('{')
      const end = clean.lastIndexOf('}')
      setResult(JSON.parse(clean.slice(start, end + 1)))
    } catch (e) {
      alert('Failed to check ATS. Try again.')
    }
    setLoading(false)
  }

  return (
    <div
      className="rounded-2xl p-8 mt-6"
      style={{ backgroundColor: '#ffffff', border: '1px solid #ede9e3' }}
    >
      <h2 style={{ fontSize: 18, fontWeight: 600, color: '#1c1917', marginBottom: 4 }}>ATS Score Checker</h2>
      <p style={{ fontSize: 13, color: '#a8a29e', marginBottom: 20 }}>
        Paste a job description to see how well your resume matches
      </p>

      <textarea
        value={jobDesc}
        onChange={e => setJobDesc(e.target.value)}
        placeholder="Paste the job description here..."
        rows={5}
        className="w-full rounded-xl px-4 py-3 text-sm outline-none resize-none"
        style={{ border: '1px solid #ede9e3', backgroundColor: '#faf9f7', color: '#1c1917', marginBottom: 12 }}
      />

      <button
        onClick={handleCheck}
        disabled={loading || !jobDesc.trim()}
        className="w-full py-3 rounded-xl text-sm font-semibold transition"
        style={{
          backgroundColor: loading || !jobDesc.trim() ? '#e7e5e4' : '#1c1917',
          color: loading || !jobDesc.trim() ? '#a8a29e' : '#ffffff',
        }}
      >
        {loading ? 'Analyzing...' : 'Check ATS Score'}
      </button>

      {result && (
        <div className="mt-6 space-y-5">
          {/* Score */}
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
            <div className="w-full rounded-full mt-3" style={{ height: 3, backgroundColor: '#ede9e3' }}>
              <div
                className="rounded-full transition-all"
                style={{
                  height: 3,
                  width: `${result.score}%`,
                  backgroundColor: result.score >= 70 ? '#16a34a' : result.score >= 40 ? '#d97706' : '#dc2626'
                }}
              />
            </div>
          </div>

          {/* Matched */}
          {result.matched_keywords?.length > 0 && (
            <div>
              <p style={{ fontSize: 11, fontWeight: 600, color: '#78716c', letterSpacing: '0.08em', marginBottom: 8 }}>MATCHED</p>
              <div className="flex flex-wrap gap-2">
                {result.matched_keywords.map((k, i) => (
                  <span key={i} className="px-3 py-1 rounded-full text-xs" style={{ backgroundColor: '#f0fdf4', color: '#16a34a' }}>{k}</span>
                ))}
              </div>
            </div>
          )}

          {/* Missing */}
          {result.missing_keywords?.length > 0 && (
            <div>
              <p style={{ fontSize: 11, fontWeight: 600, color: '#78716c', letterSpacing: '0.08em', marginBottom: 8 }}>MISSING</p>
              <div className="flex flex-wrap gap-2">
                {result.missing_keywords.map((k, i) => (
                  <span key={i} className="px-3 py-1 rounded-full text-xs" style={{ backgroundColor: '#fef2f2', color: '#dc2626' }}>{k}</span>
                ))}
              </div>
            </div>
          )}

          {/* Suggestions */}
          {result.suggestions?.length > 0 && (
            <div>
              <p style={{ fontSize: 11, fontWeight: 600, color: '#78716c', letterSpacing: '0.08em', marginBottom: 8 }}>SUGGESTIONS</p>
              <div className="space-y-2">
                {result.suggestions.map((s, i) => (
                  <div key={i} className="flex gap-3" style={{ fontSize: 13, color: '#78716c' }}>
                    <span style={{ color: '#c4bfba' }}>→</span> {s}
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