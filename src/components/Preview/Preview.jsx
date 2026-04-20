import { useState } from 'react'
import ModernTemplate from '../Templates/ModernTemplate'
import MinimalTemplate from '../Templates/MinimalTemplate'
import ProfessionalTemplate from '../Templates/ProfessionalTemplate'
import { downloadPDF } from '../../utils/pdfExport'

export default function Preview({ data }) {
  const { template } = data
  const [downloading, setDownloading] = useState(false)

  const handleDownload = async () => {
    setDownloading(true)
    await downloadPDF('resume-preview', `${data.personal.name || 'resume'}.pdf`)
    setDownloading(false)
  }

  return (
    <div>
      {/* Preview header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <p style={{ fontSize: 11, fontWeight: 600, color: '#a8a29e', letterSpacing: '0.10em' }}>LIVE PREVIEW</p>
          <p style={{ fontSize: 12, color: '#c4bfba', marginTop: 2 }}>Updates as you type</p>
        </div>
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl transition"
          style={{
            backgroundColor: downloading ? '#e7e5e4' : '#1c1917',
            color: downloading ? '#a8a29e' : '#ffffff',
            fontSize: 13,
          }}
        >
          {downloading ? 'Generating...' : '↓ Download PDF'}
        </button>
      </div>

      {/* Resume */}
      <div id="resume-preview" className="rounded-2xl overflow-hidden" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
        {template === 'modern' && <ModernTemplate data={data} />}
        {template === 'minimal' && <MinimalTemplate data={data} />}
        {template === 'professional' && <ProfessionalTemplate data={data} />}
      </div>
    </div>
  )
}