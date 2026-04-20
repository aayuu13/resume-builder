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
      <h2 className="mb-4 text-lg font-semibold text-slate-800">Education</h2>
      {data.map((edu, i) => (
        <div key={i} className="mb-4 rounded-xl border border-slate-200 p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-medium text-indigo-500">Education #{i + 1}</span>
            {data.length > 1 && (
              <button onClick={() => removeItem(i)} className="text-xs text-red-400 hover:text-red-600">
                Remove
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 gap-3">
            {[
              { label: 'School / University', field: 'school', placeholder: 'The British College' },
              { label: 'Degree', field: 'degree', placeholder: 'BSc (Hons) Computing' },
              { label: 'Field of Study', field: 'field', placeholder: 'Computer Science' },
              { label: 'From', field: 'from', placeholder: '2020' },
              { label: 'To', field: 'to', placeholder: '2024' },
              { label: 'Grade / GPA', field: 'grade', placeholder: 'First Class' },
            ].map(({ label, field, placeholder }) => (
              <div key={field}>
                <label className="mb-1 block text-xs font-medium text-slate-500">{label}</label>
                <input
                  type="text"
                  value={edu[field]}
                  onChange={(e) => updateItem(i, field, e.target.value)}
                  placeholder={placeholder}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
            ))}
          </div>
        </div>
      ))}
      <button onClick={addItem} className="text-sm font-medium text-indigo-500 hover:text-indigo-700">
        + Add Another Education
      </button>
    </div>
  )
}