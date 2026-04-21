import { useState } from 'react'
import { checkATSRaw } from '../../utils/aiHelpers'

export default function ATSLanding() {
  const [pdfText, setPdfText] = useState('')
  const [jobDesc, setJobDesc] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [fileName, setFileName] = useState('')
  const [extracting, setExtracting] = useState(false)
  const [extractStatus, setExtractStatus] = useState('')

  const handlePDFUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
  
    setFileName(file.name)
    setExtracting(true)
    setResult(null)
    setPdfText('')
    setExtractStatus('')
  
    try {
      const arrayBuffer = await file.arrayBuffer()
      const pdfjsLib = await import('pdfjs-dist')
  
      // ✅ Correct for your version (pdfjs-dist 3.11)
      pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js'
  
      setExtractStatus('Reading PDF...')
  
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
  
      let fullText = ''
  
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i)
        const content = await page.getTextContent()
        fullText += content.items.map(item => item.str).join(' ') + '\n'
      }
  
      const cleanedText = fullText.trim()
  
      if (cleanedText.length > 50) {
        setPdfText(cleanedText)
        setExtractStatus('PDF read successfully ✓')
      } else {
        setExtractStatus('PDF text is very short – trying OCR...')
        // ← your OCR code can go here if you want to keep it
      }
  
    } catch (err) {
      console.error('PDF extraction error:', err)
      setExtractStatus('Failed to read PDF')
      alert('Error: ' + (err.message || 'Unknown error'))
    }
  
    setExtracting(false)
  }

  const handleCheck = async () => {
    if (!pdfText || !jobDesc.trim()) return
    setLoading(true)
    setResult(null)
    try {
      const raw = await checkATSRaw(pdfText, jobDesc)
      const clean = raw.replace(/```json|```/g, '').trim()
      const start = clean.indexOf('{')
      const end = clean.lastIndexOf('}')
      setResult(JSON.parse(clean.slice(start, end + 1)))
    } catch (e) {
      alert('Error: ' + e.message)
      console.error(e)
    }
    setLoading(false)
  }

  const scoreColor = result
    ? result.score >= 70 ? '#16a34a' : result.score >= 40 ? '#d97706' : '#dc2626'
    : '#1c1917'

  const scoreLabel = result
    ? result.score >= 70 ? 'Strong Match' : result.score >= 40 ? 'Partial Match' : 'Weak Match'
    : ''

  return (
    <div style={{ marginTop: 16 }}>

      {/* Upload area */}
      <label
        htmlFor="pdf-upload"
        className="flex items-center gap-4 w-full cursor-pointer rounded-xl px-5 py-4 transition-all"
        style={{
          border: pdfText ? '1.5px solid #bbf7d0' : '1.5px dashed #ede9e3',
          backgroundColor: pdfText ? '#f0fdf4' : '#faf9f7',
        }}
      >
        <div style={{
          width: 40, height: 40,
          backgroundColor: pdfText ? '#dcfce7' : '#f5f3f0',
          borderRadius: 10,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 18, flexShrink: 0,
        }}>
          {extracting ? '⏳' : pdfText ? '✓' : '📄'}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{
            fontSize: 13, fontWeight: 600,
            color: pdfText ? '#16a34a' : '#78716c',
            marginBottom: 2,
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
          }}>
            {extracting ? extractStatus : pdfText ? fileName : 'Upload your resume PDF'}
          </p>
          <p style={{ fontSize: 11, color: '#c4bfba' }}>
            {extracting ? 'Please wait...' : pdfText ? 'PDF ready for analysis' : 'Click to browse · Text & scanned PDFs supported'}
          </p>
        </div>
        {!extracting && !pdfText && (
          <div style={{
            fontSize: 11, fontWeight: 600, color: '#78716c',
            backgroundColor: '#ffffff', border: '1px solid #ede9e3',
            borderRadius: 8, padding: '6px 12px', flexShrink: 0,
          }}>
            Browse
          </div>
        )}
      </label>
      <input
        id="pdf-upload"
        type="file"
        accept=".pdf"
        onChange={handlePDFUpload}
        style={{ display: 'none' }}
      />

      {/* OCR progress */}
      {extracting && (
        <div style={{
          marginTop: 8, padding: '10px 14px',
          backgroundColor: '#fffbeb', border: '1px solid #fef3c7',
          borderRadius: 10,
        }}>
          <p style={{ fontSize: 12, color: '#92400e' }}>⏳ {extractStatus}</p>
        </div>
      )}

      {/* Job description */}
      <div style={{ marginTop: 12 }}>
        <p style={{
          fontSize: 11, fontWeight: 600, color: '#a8a29e',
          letterSpacing: '0.08em', marginBottom: 6,
        }}>JOB DESCRIPTION</p>
        <textarea
          value={jobDesc}
          onChange={e => setJobDesc(e.target.value)}
          placeholder="Paste the job description here..."
          rows={5}
          style={{
            width: '100%', borderRadius: 12,
            padding: '12px 14px', fontSize: 13,
            color: '#1c1917', outline: 'none', resize: 'none',
            border: '1px solid #ede9e3', backgroundColor: '#faf9f7',
            fontFamily: 'inherit', lineHeight: 1.6,
          }}
        />
      </div>

      {/* Check button */}
      <button
        onClick={handleCheck}
        disabled={loading || !pdfText || !jobDesc.trim() || extracting}
        style={{
          width: '100%', marginTop: 10,
          padding: '13px 0', borderRadius: 12,
          fontSize: 13, fontWeight: 600,
          border: 'none', cursor: loading || !pdfText || !jobDesc.trim() || extracting ? 'not-allowed' : 'pointer',
          backgroundColor: loading || !pdfText || !jobDesc.trim() || extracting ? '#e7e5e4' : '#1c1917',
          color: loading || !pdfText || !jobDesc.trim() || extracting ? '#a8a29e' : '#ffffff',
          transition: 'all 0.2s',
        }}
      >
        {loading ? 'Analyzing your resume...' : 'Check ATS Score'}
      </button>

      {/* Results */}
      {result && (
        <div style={{
          marginTop: 20, padding: '24px',
          backgroundColor: '#faf9f7',
          border: '1px solid #ede9e3',
          borderRadius: 16,
        }}>

          {/* Score */}
          <div style={{ textAlign: 'center', marginBottom: 24, paddingBottom: 20, borderBottom: '1px solid #ede9e3' }}>
            <div style={{
              fontSize: 64, fontWeight: 200,
              color: scoreColor, letterSpacing: '-3px',
              lineHeight: 1,
            }}>
              {result.score}
            </div>
            <div style={{ fontSize: 11, color: '#a8a29e', letterSpacing: '0.1em', marginTop: 4 }}>ATS MATCH SCORE</div>
            <div style={{
              display: 'inline-block', marginTop: 8,
              fontSize: 11, fontWeight: 600,
              color: scoreColor,
              backgroundColor: result.score >= 70 ? '#f0fdf4' : result.score >= 40 ? '#fffbeb' : '#fef2f2',
              padding: '4px 12px', borderRadius: 100,
            }}>
              {scoreLabel}
            </div>

            {/* Score bar */}
            <div style={{
              width: '100%', height: 4,
              backgroundColor: '#e7e5e4',
              borderRadius: 100, marginTop: 14,
            }}>
              <div style={{
                height: 4, borderRadius: 100,
                width: `${result.score}%`,
                backgroundColor: scoreColor,
                transition: 'width 1s ease',
              }} />
            </div>
          </div>

          {/* Matched keywords */}
          {result.matched_keywords?.length > 0 && (
            <div style={{ marginBottom: 18 }}>
              <p style={{
                fontSize: 10, fontWeight: 700,
                color: '#a8a29e', letterSpacing: '0.1em',
                marginBottom: 10,
              }}>✓ MATCHED KEYWORDS</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {result.matched_keywords.map((k, i) => (
                  <span key={i} style={{
                    fontSize: 11, color: '#16a34a',
                    backgroundColor: '#f0fdf4',
                    border: '1px solid #bbf7d0',
                    borderRadius: 100, padding: '3px 10px',
                  }}>{k}</span>
                ))}
              </div>
            </div>
          )}

          {/* Missing keywords */}
          {result.missing_keywords?.length > 0 && (
            <div style={{ marginBottom: 18 }}>
              <p style={{
                fontSize: 10, fontWeight: 700,
                color: '#a8a29e', letterSpacing: '0.1em',
                marginBottom: 10,
              }}>✗ MISSING KEYWORDS</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {result.missing_keywords.map((k, i) => (
                  <span key={i} style={{
                    fontSize: 11, color: '#dc2626',
                    backgroundColor: '#fef2f2',
                    border: '1px solid #fecaca',
                    borderRadius: 100, padding: '3px 10px',
                  }}>{k}</span>
                ))}
              </div>
            </div>
          )}

          {/* Suggestions */}
          {result.suggestions?.length > 0 && (
            <div>
              <p style={{
                fontSize: 10, fontWeight: 700,
                color: '#a8a29e', letterSpacing: '0.1em',
                marginBottom: 10,
              }}>💡 SUGGESTIONS</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {result.suggestions.map((s, i) => (
                  <div key={i} style={{
                    display: 'flex', gap: 10, alignItems: 'flex-start',
                    padding: '10px 12px',
                    backgroundColor: '#ffffff',
                    border: '1px solid #ede9e3',
                    borderRadius: 10,
                  }}>
                    <span style={{ color: '#c4bfba', fontSize: 12, marginTop: 1 }}>0{i + 1}</span>
                    <p style={{ fontSize: 12, color: '#57534e', lineHeight: 1.6, margin: 0 }}>{s}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div style={{
            marginTop: 20, padding: '16px',
            backgroundColor: '#ffffff',
            border: '1px solid #ede9e3',
            borderRadius: 12,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#1c1917', marginBottom: 2 }}>
                Want a better score?
              </p>
              <p style={{ fontSize: 11, color: '#a8a29e' }}>Build an optimized resume with AI</p>
            </div>
            <a href="/builder" style={{
              fontSize: 12, fontWeight: 600,
              color: '#ffffff', backgroundColor: '#1c1917',
              padding: '8px 16px', borderRadius: 8,
              textDecoration: 'none',
            }}>
              Build Now →
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
