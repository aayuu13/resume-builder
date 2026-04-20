import { useNavigate } from 'react-router-dom'
import ATSLanding from '../components/AI/ATSLanding'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#faf9f7' }}>
      {/* Header */}
      <header style={{ borderBottom: '1px solid #ede9e3', backgroundColor: '#faf9f7' }} className="px-8 py-5 flex items-center">
        <div style={{ width: 28, height: 28, backgroundColor: '#1c1917', borderRadius: 6 }} className="flex items-center justify-center mr-3">
          <span className="text-white text-xs font-bold">R</span>
        </div>
        <span style={{ color: '#1c1917', fontWeight: 600, fontSize: 15, letterSpacing: '-0.3px' }}>Resume Builder</span>
      </header>

      <div className="max-w-2xl mx-auto px-6 py-16">
        {/* Hero */}
        <div className="mb-14">
          <p style={{ fontSize: 11, color: '#a8a29e', letterSpacing: '0.12em', fontWeight: 600, textTransform: 'uppercase', marginBottom: 12 }}>
            AI-Powered
          </p>
          <h1 style={{ fontSize: 40, fontWeight: 300, color: '#1c1917', lineHeight: 1.15, letterSpacing: '-1px', marginBottom: 16 }}>
            A resume that<br />
            <span style={{ fontWeight: 700 }}>speaks for itself.</span>
          </h1>
          <p style={{ fontSize: 14, color: '#78716c', lineHeight: 1.7 }}>
            Check if your existing resume passes ATS filters — or build a brand new one from scratch with AI assistance.
          </p>
        </div>

        {/* Two paths */}
        <div className="grid grid-cols-1 gap-4 mb-16">
          {/* Path 1 — ATS Check */}
          <div
            className="rounded-2xl p-6"
            style={{ backgroundColor: '#ffffff', border: '1px solid #ede9e3' }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div style={{ width: 32, height: 32, backgroundColor: '#faf9f7', border: '1px solid #ede9e3', borderRadius: 8 }} className="flex items-center justify-center">
                <span style={{ fontSize: 16 }}>📄</span>
              </div>
              <div>
                <h2 style={{ fontSize: 15, fontWeight: 600, color: '#1c1917' }}>Check Existing Resume</h2>
                <p style={{ fontSize: 12, color: '#a8a29e' }}>Upload your PDF and check ATS score</p>
              </div>
            </div>
            <ATSLanding />
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div style={{ flex: 1, height: 1, backgroundColor: '#ede9e3' }} />
            <span style={{ fontSize: 12, color: '#c4bfba' }}>or</span>
            <div style={{ flex: 1, height: 1, backgroundColor: '#ede9e3' }} />
          </div>

          {/* Path 2 — Build from scratch */}
          <div
            className="rounded-2xl p-6 cursor-pointer transition hover:opacity-90"
            style={{ backgroundColor: '#1c1917', border: '1px solid #1c1917' }}
            onClick={() => navigate('/builder')}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div style={{ width: 32, height: 32, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 8 }} className="flex items-center justify-center">
                  <span style={{ fontSize: 16 }}>✦</span>
                </div>
                <div>
                  <h2 style={{ fontSize: 15, fontWeight: 600, color: '#ffffff' }}>Build from Scratch</h2>
                  <p style={{ fontSize: 12, color: '#a8a29e' }}>AI-powered builder with 3 templates</p>
                </div>
              </div>
              <span style={{ color: '#a8a29e', fontSize: 18 }}>→</span>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-2">
          {[
            '✦ AI-generated bullet points & summaries',
            '✦ ATS score checker against job descriptions',
            '✦ Three professionally designed templates',
            '✦ One-click PDF download',
          ].map(f => (
            <p key={f} style={{ fontSize: 12, color: '#c4bfba' }}>{f}</p>
          ))}
        </div>
      </div>
    </div>
  )
}