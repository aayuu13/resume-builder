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

export default function Skills({ data, onChange }) {
  const update = (field, value) => onChange({ ...data, [field]: value })

  return (
    <div>
      <h2 style={{ fontSize: 18, fontWeight: 600, color: '#1c1917', marginBottom: 4 }}>Skills</h2>
      <p style={{ fontSize: 13, color: '#a8a29e', marginBottom: 24 }}>Separate each skill with a comma</p>

      <div className="space-y-4">
        {[
          { label: 'TECHNICAL SKILLS', field: 'technical', placeholder: 'Python, React, Machine Learning, SQL' },
          { label: 'SOFT SKILLS', field: 'soft', placeholder: 'Leadership, Communication, Problem Solving' },
          { label: 'LANGUAGES', field: 'languages', placeholder: 'English, Nepali, Hindi' },
          { label: 'TOOLS & PLATFORMS', field: 'tools', placeholder: 'Git, VS Code, Figma, Excel' },
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
      </div>
    </div>
  )
}