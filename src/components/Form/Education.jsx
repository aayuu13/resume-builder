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

export default function Education({ data, onChange }) {
  const updateItem = (index, field, value) => {
    const updated = [...data]
    updated[index] = { ...updated[index], [field]: value }
    onChange(updated)
  }

  const addItem = () => onChange([...data, { school: '', degree: '', field: '', from: '', to: '', grade: '' }])
  const removeItem = (i) => onChange(data.filter((_, idx) => idx !== i))

  return (
    <div>
      <h2 style={{ fontSize: 18, fontWeight: 600, color: '#1c1917', marginBottom: 4 }}>Education</h2>
      <p style={{ fontSize: 13, color: '#a8a29e', marginBottom: 24 }}>Your academic background</p>

      {data.map((edu, i) => (
        <div key={i} className="rounded-xl p-5 mb-4" style={{ border: '1px solid #ede9e3', backgroundColor: '#faf9f7' }}>
          <div className="flex justify-between items-center mb-4">
            <span style={{ fontSize: 11, fontWeight: 600, color: '#a8a29e', letterSpacing: '0.08em' }}>EDUCATION {String(i + 1).padStart(2, '0')}</span>
            {data.length > 1 && (
              <button onClick={() => removeItem(i)} style={{ fontSize: 11, color: '#c4bfba' }}>Remove</button>
            )}
          </div>
          <div className="space-y-3">
            {[
              { label: 'SCHOOL / UNIVERSITY', field: 'school', placeholder: 'The British College' },
              { label: 'DEGREE', field: 'degree', placeholder: 'BSc (Hons) Computing' },
              { label: 'FIELD OF STUDY', field: 'field', placeholder: 'Computer Science' },
              { label: 'FROM', field: 'from', placeholder: '2021' },
              { label: 'TO', field: 'to', placeholder: '2024' },
              { label: 'GRADE / GPA', field: 'grade', placeholder: 'First Class Honours' },
            ].map(({ label, field, placeholder }) => (
              <div key={field}>
                <label style={labelStyle}>{label}</label>
                <input
                  type="text"
                  value={edu[field]}
                  onChange={e => updateItem(i, field, e.target.value)}
                  placeholder={placeholder}
                  style={inputStyle}
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      <button
        onClick={addItem}
        style={{ fontSize: 13, color: '#78716c', fontWeight: 500 }}
      >
        + Add another education
      </button>
    </div>
  )
}