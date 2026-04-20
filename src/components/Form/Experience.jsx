import { useState } from 'react'
import { improveBullet } from '../../utils/aiHelpers'

const inputStyle = {
  width: '100%',
  border: '1px solid #ede9e3',
  borderRadius: 10,
  padding: '10px 14px',
  fontSize: 13,
  color: '#1c1917',
  backgroundColor: '#faf9f7',
  outline: 'none',
}

const labelStyle = {
  fontSize: 11,
  fontWeight: 600,
  color: '#a8a29e',
  letterSpacing: '0.08em',
  marginBottom: 6,
  display: 'block',
}

export default function Experience({ data, onChange }) {
  const [loadingIndex, setLoadingIndex] = useState(null)

  const updateItem = (index, field, value) => {
    const updated = [...data]
    updated[index] = { ...updated[index], [field]: value }
    onChange(updated)
  }

  const updateBullet = (index, bIndex, value) => {
    const updated = [...data]
    updated[index].bullets[bIndex] = value
    onChange(updated)
  }

  const addBullet = (index) => {
    const updated = [...data]
    updated[index].bullets.push('')
    onChange(updated)
  }

  const handleImproveBullet = async (expIndex, bulletIndex) => {
    const bullet = data[expIndex].bullets[bulletIndex]
    if (!bullet.trim()) return
    setLoadingIndex(`${expIndex}-${bulletIndex}`)
    try {
      const improved = await improveBullet(bullet, data[expIndex].role, data[expIndex].company)
      updateBullet(expIndex, bulletIndex, improved.trim())
    } catch (e) {
      alert('Failed to improve bullet.')
    }
    setLoadingIndex(null)
  }

  const addItem = () => onChange([...data, { company: '', role: '', from: '', to: '', current: false, bullets: [''] }])
  const removeItem = (i) => onChange(data.filter((_, idx) => idx !== i))

  return (
    <div>
      <h2 style={{ fontSize: 18, fontWeight: 600, color: '#1c1917', marginBottom: 4 }}>Work Experience</h2>
      <p style={{ fontSize: 13, color: '#a8a29e', marginBottom: 24 }}>Your professional history</p>

      {data.map((exp, i) => (
        <div key={i} className="rounded-xl p-5 mb-4" style={{ border: '1px solid #ede9e3', backgroundColor: '#faf9f7' }}>
          <div className="flex justify-between items-center mb-4">
            <span style={{ fontSize: 11, fontWeight: 600, color: '#a8a29e', letterSpacing: '0.08em' }}>EXPERIENCE {String(i + 1).padStart(2, '0')}</span>
            {data.length > 1 && (
              <button onClick={() => removeItem(i)} style={{ fontSize: 11, color: '#c4bfba' }}>Remove</button>
            )}
          </div>
          <div className="space-y-3">
            {[
              { label: 'COMPANY', field: 'company', placeholder: 'NepaTronix Engineering' },
              { label: 'ROLE', field: 'role', placeholder: 'Software Developer' },
              { label: 'FROM', field: 'from', placeholder: 'Jan 2024' },
              { label: 'TO', field: 'to', placeholder: 'Present' },
            ].map(({ label, field, placeholder }) => (
              <div key={field}>
                <label style={labelStyle}>{label}</label>
                <input
                  type="text"
                  value={exp[field]}
                  onChange={e => updateItem(i, field, e.target.value)}
                  placeholder={placeholder}
                  style={inputStyle}
                />
              </div>
            ))}

            <div>
              <label style={labelStyle}>BULLET POINTS</label>
              {exp.bullets.map((b, bIdx) => (
                <div key={bIdx} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={b}
                    onChange={e => updateBullet(i, bIdx, e.target.value)}
                    placeholder="Describe what you did and the impact..."
                    style={{ ...inputStyle, flex: 1 }}
                  />
                  <button
                    onClick={() => handleImproveBullet(i, bIdx)}
                    disabled={loadingIndex === `${i}-${bIdx}`}
                    className="rounded-lg px-3 transition"
                    style={{
                      fontSize: 11,
                      border: '1px solid #ede9e3',
                      backgroundColor: '#ffffff',
                      color: loadingIndex === `${i}-${bIdx}` ? '#c4bfba' : '#78716c',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {loadingIndex === `${i}-${bIdx}` ? '...' : '✦ AI'}
                  </button>
                </div>
              ))}
              <button
                onClick={() => addBullet(i)}
                style={{ fontSize: 12, color: '#a8a29e' }}
              >
                + Add bullet
              </button>
            </div>
          </div>
        </div>
      ))}

      <button onClick={addItem} style={{ fontSize: 13, color: '#78716c', fontWeight: 500 }}>
        + Add another experience
      </button>
    </div>
  )
}