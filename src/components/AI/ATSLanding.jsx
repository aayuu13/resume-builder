import { useState } from 'react'
import { checkATSRaw } from '../../utils/aiHelpers'

export default function ATSLanding() {
  const [pdfText, setPdfText] = useState('')
  const [jobDesc, setJobDesc] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [fileName, setFileName] = useState('')
  const [extracting, setExtracting] = useState(false)

  const handlePDFUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setFileName(file.name)
    setExtracting(true)
  
    try {
      const arrayBuffer = await file.arrayBuffer()
      const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf')
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js`
  
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
      let fullText = ''
  
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i)
        const content = await page.getTextContent()
        const pageText = content.items.map(item => item.str).join(' ')
        fullText += pageText + '\n'
      }
  
      // If text extraction worked, use it
      if (fullText.trim().length > 100) {
        console.log('Text-based PDF detected ✅')
        setPdfText(fullText)
        setExtracting(false)
        return
      }
  
      // Otherwise fall back to OCR
      console.log('Image-based PDF detected, running OCR...')
      setFileName('Running OCR on ' + file.name + '...')
  
      const { createWorker } = await import('tesseract.js')
      const worker = await createWorker('eng')
  
      let ocrText = ''
  
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i)
        const viewport = page.getViewport({ scale: 2.0 })
  
        // Render page to canvas
        const canvas = document.createElement('canvas')
        canvas.width = viewport.width
        canvas.height = viewport.height
        const ctx = canvas.getContext('2d')
  
        await page.render({ canvasContext: ctx, viewport }).promise
  
        // Run OCR on canvas
        const { data: { text } } = await worker.recognize(canvas)
        ocrText += text + '\n'
      }
  
      await worker.terminate()
  
      if (!ocrText.trim()) {
        alert('Could not extract text from PDF. Please try a different file.')
        setFileName('')
        setExtracting(false)
        return
      }
  
      console.log('OCR complete ✅', ocrText.slice(0, 300))
      setPdfText(ocrText)
  
    } catch (err) {
      console.error('PDF error:', err)
      alert('Error reading PDF: ' + err.message)
    }
  
    setExtracting(false)
    setFileName(file.name)
  }

  const handleCheck = async () => {
    if (!pdfText || !jobDesc.trim()) return
    setLoading(true)
    try {
      const resumeData = {
        personal: { name: '' },
        skills: { technical: '', tools: '' },
        experience: [],
        rawText: pdfText
      }

      const raw = await checkATSRaw(pdfText, jobDesc)
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
    <div className="mt-4 space-y-3">
      {/* PDF Upload */}
      <div>
        <label
          htmlFor="pdf-upload"
          className="flex items-center gap-3 w-full cursor-pointer rounded-xl px-4 py-3 transition"
          style={{
            border: '1.5px dashed #ede9e3',
            backgroundColor: '#faf9f7',
          }}
        >
          <span style={{ fontSize: 20 }}>📎</span>
          <div>
           <p style={{ fontSize: 13, fontWeight: 500, color: '#78716c' }}>
  {extracting 
    ? fileName.includes('OCR') 
      ? '🔍 Running OCR — this may take 30 seconds...' 
      : '📖 Reading PDF...' 
    : fileName || 'Upload your resume PDF'}
</p>
<p style={{ fontSize: 11, color: '#c4bfba' }}>
  {extracting ? 'Please wait...' : 'Supports text-based and scanned PDFs'}
</p>
            <p style={{ fontSize: 11, color: '#c4bfba' }}>Click to browse</p>
          </div>
        </label>
        <input
          id="pdf-upload"
          type="file"
          accept=".pdf"
          onChange={handlePDFUpload}
          style={{ display: 'none' }}
        />
      </div>

      {/* Job Description */}
      <textarea
        value={jobDesc}
        onChange={e => setJobDesc(e.target.value)}
        placeholder="Paste the job description here..."
        rows={4}
        className="w-full rounded-xl px-4 py-3 text-sm outline-none resize-none"
        style={{
          border: '1px solid #ede9e3',
          backgroundColor: '#faf9f7',
          color: '#1c1917',
          fontSize: 13,
        }}
      />

      {/* Check button */}
      <button
        onClick={handleCheck}
        disabled={loading || !pdfText || !jobDesc.trim()}
        className="w-full py-3 rounded-xl text-sm font-semibold transition"
        style={{
          backgroundColor: loading || !pdfText || !jobDesc.trim() ? '#e7e5e4' : '#1c1917',
          color: loading || !pdfText || !jobDesc.trim() ? '#a8a29e' : '#ffffff',
        }}
      >
        {loading ? 'Analyzing...' : extracting ? 'Reading PDF...' : 'Check ATS Score'}
      </button>

      {/* Results */}
      {result && (
        <div className="mt-4 space-y-4 pt-4" style={{ borderTop: '1px solid #ede9e3' }}>
          {/* Score */}
          <div className="text-center py-2">
            <div style={{
              fontSize: 48,
              fontWeight: 300,
              letterSpacing: '-2px',
              color: result.score >= 70 ? '#16a34a' : result.score >= 40 ? '#d97706' : '#dc2626',
            }}>
              {result.score}
            </div>
            <div style={{ fontSize: 11, color: '#a8a29e', letterSpacing: '0.08em' }}>ATS MATCH SCORE</div>
            <div className="w-full rounded-full mt-2" style={{ height: 3, backgroundColor: '#ede9e3' }}>
              <div className="rounded-full transition-all" style={{
                height: 3,
                width: `${result.score}%`,
                backgroundColor: result.score >= 70 ? '#16a34a' : result.score >= 40 ? '#d97706' : '#dc2626'
              }} />
            </div>
          </div>

          {/* Matched */}
          {result.matched_keywords?.length > 0 && (
            <div>
              <p style={{ fontSize: 10, fontWeight: 700, color: '#a8a29e', letterSpacing: '0.08em', marginBottom: 8 }}>MATCHED</p>
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
              <p style={{ fontSize: 10, fontWeight: 700, color: '#a8a29e', letterSpacing: '0.08em', marginBottom: 8 }}>MISSING</p>
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
              <p style={{ fontSize: 10, fontWeight: 700, color: '#a8a29e', letterSpacing: '0.08em', marginBottom: 8 }}>SUGGESTIONS</p>
              {result.suggestions.map((s, i) => (
                <div key={i} className="flex gap-2 mb-2" style={{ fontSize: 12, color: '#78716c' }}>
                  <span style={{ color: '#c4bfba' }}>→</span> {s}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}