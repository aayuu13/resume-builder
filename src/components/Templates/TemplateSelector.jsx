const templates = [
  { id: 'modern', label: 'Modern', description: 'Indigo header, clean sections' },
  { id: 'minimal', label: 'Minimal', description: 'Pure white, light typography' },
  { id: 'professional', label: 'Professional', description: 'Two-column, sidebar layout' },
]

export default function TemplateSelector({ selected, onChange }) {
  return (
    <div>
      <h2 style={{ fontSize: 18, fontWeight: 600, color: '#1c1917', marginBottom: 4 }}>Choose a Template</h2>
      <p style={{ fontSize: 13, color: '#a8a29e', marginBottom: 24 }}>Select a layout for your resume</p>
      <div className="space-y-3">
        {templates.map(t => (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            className="w-full text-left p-5 rounded-xl transition-all"
            style={{
              border: selected === t.id ? '1.5px solid #1c1917' : '1.5px solid #ede9e3',
              backgroundColor: selected === t.id ? '#faf9f7' : '#ffffff',
            }}
          >
            <div className="flex items-center justify-between">
              <span style={{ fontWeight: 600, color: '#1c1917', fontSize: 14 }}>{t.label}</span>
              {selected === t.id && (
                <span style={{ fontSize: 11, color: '#a8a29e', fontWeight: 500 }}>Selected</span>
              )}
            </div>
            <p style={{ fontSize: 12, color: '#a8a29e', marginTop: 4 }}>{t.description}</p>
          </button>
        ))}
      </div>
    </div>
  )
}