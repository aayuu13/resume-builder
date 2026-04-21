import { useState } from 'react'
import { generateSummary } from '../../utils/aiHelpers'

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

export default function PersonalInfo({ data, onChange, allData }) {
  const [loading, setLoading] = useState(false)
  const update = (field, value) => onChange({ ...data, [field]: value })

  const handleGenerateSummary = async () => {
    setLoading(true)
    try {
      const summary = await generateSummary(
        data,
        allData?.education || [],
        allData?.experience || [],
        allData?.skills || {}
      )
      update('summary', summary)
    } catch (e) {
      alert('Error: ' + e.message)
      console.error(e)
    }
    setLoading(false)
  }

  return (
    <div>
      <h2 style={{ fontSize: 18, fontWeight: 600, color: '#1c1917', marginBottom: 4 }}>Personal Information</h2>
      <p style={{ fontSize: 13, color: '#a8a29e', marginBottom: 24 }}>Your basic contact details</p>

      <div className="space-y-4">
        {[
          { label: 'FULL NAME', field: 'name', placeholder: 'Alex' },
          { label: 'EMAIL', field: 'email', placeholder: 'user@email.com' },
          { label: 'PHONE', field: 'phone', placeholder: '+977 98XXXXXXXX' },
          { label: 'LOCATION', field: 'location', placeholder: 'Kathmandu, Nepal' },
          { label: 'LINKEDIN', field: 'linkedin', placeholder: 'linkedin.com/in/yourname' },
        ].map(({ label, field, placeholder }) => (
          <div key={field}>
            <label style={labelStyle}>{label}</label>
            <input
              type="text"
              value={data[field]}
              onChange={e => update(field, e.target.value)}
              placeholder={placeholder}
              style={inputStyle}
            />
          </div>
        ))}

        <div>
          <div className="flex justify-between items-center" style={{ marginBottom: 6 }}>
            <label style={labelStyle}>PROFESSIONAL SUMMARY</label>
            <button
              onClick={handleGenerateSummary}
              disabled={loading}
              className="text-xs font-medium px-3 py-1 rounded-lg transition"
              style={{
                backgroundColor: '#f5f3f0',
                color: loading ? '#c4bfba' : '#78716c',
                fontSize: 11,
                border: '1px solid #ede9e3'
              }}
            >
              {loading ? 'Generating...' : '✦ AI Generate'}
            </button>
          </div>
          <textarea
            value={data.summary}
            onChange={e => update('summary', e.target.value)}
            placeholder="A brief summary about yourself..."
            rows={4}
            style={{ ...inputStyle, resize: 'none' }}
          />
        </div>
      </div>
    </div>
  )
}