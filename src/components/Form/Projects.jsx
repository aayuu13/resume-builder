export default function Projects({ data, onChange }) {
  const updateItem = (index, field, value) => {
    const updated = [...data]
    updated[index] = { ...updated[index], [field]: value }
    onChange(updated)
  }

  const addItem = () => onChange([...data, { name: '', description: '', tech: '', link: '' }])
  const removeItem = (i) => onChange(data.filter((_, idx) => idx !== i))

  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold text-slate-800">Projects</h2>
      {data.map((proj, i) => (
        <div key={i} className="mb-4 rounded-xl border border-slate-200 p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-medium text-indigo-500">Project #{i + 1}</span>
            {data.length > 1 && (
              <button onClick={() => removeItem(i)} className="text-xs text-red-400 hover:text-red-600">
                Remove
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 gap-3">
            {[
              { label: 'Project Name', field: 'name', placeholder: 'AnalystGuard' },
              { label: 'Description', field: 'description', placeholder: 'A Python tool that detects conclusion flips in data analysis...' },
              { label: 'Tech Stack', field: 'tech', placeholder: 'Python, Tkinter, Pandas, Matplotlib' },
              { label: 'GitHub / Live Link', field: 'link', placeholder: 'github.com/yourname/project' },
            ].map(({ label, field, placeholder }) => (
              <div key={field}>
                <label className="mb-1 block text-xs font-medium text-slate-500">{label}</label>
                <input
                  type="text"
                  value={proj[field]}
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
        + Add Another Project
      </button>
    </div>
  )
}