export default function Skills({ data, onChange }) {
  const update = (field, value) => onChange({ ...data, [field]: value })

  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold text-slate-800">Skills</h2>
      <p className="mb-4 text-sm text-slate-400">Separate each skill with a comma</p>
      <div className="grid grid-cols-1 gap-4">
        {[
          { label: 'Technical Skills', field: 'technical', placeholder: 'Python, React, Machine Learning, SQL' },
          { label: 'Soft Skills', field: 'soft', placeholder: 'Leadership, Communication, Problem Solving' },
          { label: 'Languages', field: 'languages', placeholder: 'English, Nepali, Hindi' },
          { label: 'Tools & Platforms', field: 'tools', placeholder: 'Git, VS Code, Figma, Excel' },
        ].map(({ label, field, placeholder }) => (
          <div key={field}>
            <label className="mb-1 block text-sm font-medium text-slate-600">{label}</label>
            <input
              type="text"
              value={data[field]}
              onChange={(e) => update(field, e.target.value)}
              placeholder={placeholder}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
        ))}
      </div>
    </div>
  )
}