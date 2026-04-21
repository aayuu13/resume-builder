import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ATSLanding from '../components/AI/ATSLanding'

export default function Home() {
  const navigate = useNavigate()
  const [showATS, setShowATS] = useState(false)

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#faf9f7', display: 'flex', flexDirection: 'column' }}>

      {/* Header */}
      <header style={{
        borderBottom: '1px solid #ede9e3',
        backgroundColor: '#faf9f7',
        padding: '16px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 28, height: 28, backgroundColor: '#1c1917',
            borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <span style={{ color: '#fff', fontSize: 11, fontWeight: 700 }}>R</span>
          </div>
          <span style={{ color: '#1c1917', fontWeight: 600, fontSize: 14, letterSpacing: '-0.3px' }}>Resume Builder</span>
        </div>
        <button
          onClick={() => navigate('/builder')}
          style={{
            fontSize: 12, fontWeight: 600, color: '#78716c',
            backgroundColor: '#ffffff', border: '1px solid #ede9e3',
            borderRadius: 8, padding: '7px 14px', cursor: 'pointer',
          }}
        >
          Open Builder →
        </button>
      </header>

      {/* Main */}
      <main style={{
        flex: 1, display: 'flex', alignItems: 'flex-start',
        justifyContent: 'center', padding: '48px 24px',
      }}>
        <div style={{ width: '100%', maxWidth: 960 }}>

          {/* Hero — compact */}
          <div style={{ marginBottom: 32, maxWidth: 560 }}>
            <p style={{
              fontSize: 10, fontWeight: 700, color: '#a8a29e',
              letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 10,
            }}>AI-Powered · Free</p>
            <h1 style={{
              fontSize: 36, fontWeight: 300, color: '#1c1917',
              lineHeight: 1.2, letterSpacing: '-1px', marginBottom: 10,
            }}>
              A resume that<br />
              <span style={{ fontWeight: 700 }}>speaks for itself.</span>
            </h1>
            <p style={{ fontSize: 13, color: '#78716c', lineHeight: 1.6 }}>
              Check if your resume passes ATS filters — or build a new one with AI assistance.
            </p>
          </div>

          {/* Two column layout */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 16,
            alignItems: 'start',
          }}>

            {/* Left — ATS Checker */}
            <div style={{
              backgroundColor: '#ffffff',
              border: '1px solid #ede9e3',
              borderRadius: 16,
              overflow: 'hidden',
            }}>
              {/* Card header */}
              <div style={{
                padding: '16px 20px',
                borderBottom: '1px solid #ede9e3',
                display: 'flex', alignItems: 'center', gap: 10,
              }}>
                <div style={{
                  width: 30, height: 30, backgroundColor: '#faf9f7',
                  border: '1px solid #ede9e3', borderRadius: 8,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 14,
                }}>📄</div>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: '#1c1917' }}>Check Existing Resume</p>
                  <p style={{ fontSize: 11, color: '#a8a29e' }}>Upload PDF · Get ATS score instantly</p>
                </div>
              </div>

              {/* Collapsed/expanded ATS */}
              <div style={{ padding: '16px 20px' }}>
                {!showATS ? (
                  <button
                    onClick={() => setShowATS(true)}
                    style={{
                      width: '100%', padding: '11px 0',
                      backgroundColor: '#faf9f7', border: '1.5px dashed #ede9e3',
                      borderRadius: 10, fontSize: 13, fontWeight: 500,
                      color: '#78716c', cursor: 'pointer',
                    }}
                  >
                    + Upload your resume PDF
                  </button>
                ) : (
                  <ATSLanding />
                )}
              </div>
            </div>

            {/* Right — Build from scratch */}
            <div style={{
              backgroundColor: '#1c1917',
              borderRadius: 16,
              padding: '24px 20px',
              display: 'flex', flexDirection: 'column',
              gap: 20,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 30, height: 30,
                  backgroundColor: 'rgba(255,255,255,0.08)',
                  borderRadius: 8, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: 14,
                }}>✦</div>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: '#ffffff' }}>Build from Scratch</p>
                  <p style={{ fontSize: 11, color: '#a8a29e' }}>AI-powered · 3 templates · PDF export</p>
                </div>
              </div>

              {/* Feature list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  ['✦', 'AI-generated bullet points'],
                  ['✦', 'Professional summary writer'],
                  ['✦', 'ATS score checker built-in'],
                  ['✦', 'Modern, Minimal & Professional templates'],
                  ['✦', 'One-click PDF download'],
                ].map(([icon, text]) => (
                  <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 9, color: '#57534e' }}>{icon}</span>
                    <span style={{ fontSize: 12, color: '#a8a29e' }}>{text}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => navigate('/builder')}
                style={{
                  width: '100%', padding: '12px 0',
                  backgroundColor: '#ffffff', border: 'none',
                  borderRadius: 10, fontSize: 13, fontWeight: 600,
                  color: '#1c1917', cursor: 'pointer',
                  marginTop: 4,
                }}
              >
                Start Building →
              </button>
            </div>
          </div>

          {/* Footer note */}
          <p style={{
            fontSize: 11, color: '#c4bfba',
            textAlign: 'center', marginTop: 32,
          }}>
            Free to use · No account required · AI-powered by OpenRouter
          </p>
        </div>
      </main>
    </div>
  )
}