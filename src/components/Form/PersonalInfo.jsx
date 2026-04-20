export default function PersonalInfo({ data, onChange }) {
  const update = (field, value) => onChange({ ...data, [field]: value })

  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold text-slate-800">Personal Information</h2>
      <div className="grid grid-cols-1 gap-4">
        {[
          { label: 'Full Name', field: 'name', placeholder: 'Yuyu' },
          { label: 'Email', field: 'email', placeholder: 'aayu@email.com' },
          { label: 'Phone', field: 'phone', placeholder: '+977 98XXXXXXXX' },
          { label: 'Location', field: 'location', placeholder: 'Kathmandu, Nepal' },
          { label: 'LinkedIn URL', field: 'linkedin', placeholder: 'linkedin.com/in/yourname' },
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
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-600">Professional Summary</label>
          <textarea
            value={data.summary}
            onChange={(e) => update('summary', e.target.value)}
            placeholder="A brief summary about yourself..."
            rows={4}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
      </div>
    </div>
  )
}