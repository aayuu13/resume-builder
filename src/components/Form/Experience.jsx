export default function Experience({ data, onChange }) {
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

  const addItem = () => onChange([...data, { company: '', role: '', from: '', to: '', current: false, bullets: [''] }])
  const removeItem = (i) => onChange(data.filter((_, idx) => idx !== i))

  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold text-slate-800">Work Experience</h2>
      {data.map((exp, i) => (
        <div key={i} className="mb-4 rounded-xl border border-slate-200 p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-medium text-indigo-500">Experience #{i + 1}</span>
            {data.length > 1 && (
              <button onClick={() => removeItem(i)} className="text-xs text-red-400 hover:text-red-600">
                Remove
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 gap-3">
            {[
              { label: 'Company', field: 'company', placeholder: 'NepaTronix Engineering' },
              { label: 'Role', field: 'role', placeholder: 'Software Developer' },
              { label: 'From', field: 'from', placeholder: 'Jan 2024' },
              { label: 'To', field: 'to', placeholder: 'Present' },
            ].map(({ label, field, placeholder }) => (
              <div key={field}>
                <label className="mb-1 block text-xs font-medium text-slate-500">{label}</label>
                <input
                  type="text"
                  value={exp[field]}
                  onChange={(e) => updateItem(i, field, e.target.value)}
                  placeholder={placeholder}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
            ))}
            <div>
              <label className="mb-2 block text-xs font-medium text-slate-500">Bullet Points</label>
              {exp.bullets.map((b, bIdx) => (
                <input
                  key={bIdx}
                  type="text"
                  value={b}
                  onChange={(e) => updateBullet(i, bIdx, e.target.value)}
                  placeholder="Describe what you did and the impact..."
                  className="mb-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              ))}
              <button onClick={() => addBullet(i)} className="text-xs text-indigo-400 hover:text-indigo-600">
                + Add bullet
              </button>
            </div>
          </div>
        </div>
      ))}
      <button onClick={addItem} className="text-sm font-medium text-indigo-500 hover:text-indigo-700">
        + Add Another Experience
      </button>
    </div>
  )
}