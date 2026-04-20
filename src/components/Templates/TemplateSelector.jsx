const templates = [
    { id: 'modern', label: 'Modern', description: 'Clean lines with indigo accents' },
    { id: 'minimal', label: 'Minimal', description: 'Pure white, typography-focused' },
    { id: 'professional', label: 'Professional', description: 'Classic formal layout' },
  ]
  
  export default function TemplateSelector({ selected, onChange }) {
    return (
      <div>
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Choose a Template</h2>
        <div className="grid grid-cols-1 gap-4">
          {templates.map(t => (
            <button
              key={t.id}
              onClick={() => onChange(t.id)}
              className={`border-2 rounded-xl p-4 text-left transition ${
                selected === t.id
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-slate-200 hover:border-indigo-300'
              }`}
            >
              <div className="font-semibold text-slate-700">{t.label}</div>
              <div className="text-sm text-slate-400 mt-1">{t.description}</div>
            </button>
          ))}
        </div>
      </div>
    )
  }