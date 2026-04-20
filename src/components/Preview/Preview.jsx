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
      {/* Download button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-semibold px-5 py-2 rounded-xl shadow transition disabled:opacity-50"
        >
          {downloading ? 'Generating PDF...' : '⬇ Download PDF'}
        </button>
      </div>

      {/* Resume preview — id is used by html2canvas */}
      <div id="resume-preview">
        {template === 'modern' && <ModernTemplate data={data} />}
        {template === 'minimal' && <MinimalTemplate data={data} />}
        {template === 'professional' && <ProfessionalTemplate data={data} />}
      </div>
    </div>
  )
}