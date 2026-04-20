export default function ModernTemplate({ data }) {
  const { personal, education, experience, skills, projects } = data

  const Section = ({ title, children }) => (
    <section style={{ marginBottom: 28 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
        <div style={{ width: 3, height: 14, backgroundColor: '#4f46e5', borderRadius: 2 }} />
        <span style={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: '0.12em',
          color: '#4f46e5',
          textTransform: 'uppercase',
        }}>{title}</span>
        <div style={{ flex: 1, height: 1, backgroundColor: '#eef2ff' }} />
      </div>
      {children}
    </section>
  )

  return (
    <div style={{
      backgroundColor: '#ffffff',
      fontFamily: "'Inter', sans-serif",
      maxWidth: '100%',
      minHeight: 900,
      overflow: 'hidden',
    }}>

      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #4338ca 0%, #6366f1 100%)',
        padding: '40px 44px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative circle */}
        <div style={{
          position: 'absolute',
          top: -40,
          right: -40,
          width: 180,
          height: 180,
          borderRadius: '50%',
          backgroundColor: 'rgba(255,255,255,0.06)',
        }} />
        <div style={{
          position: 'absolute',
          bottom: -20,
          right: 80,
          width: 80,
          height: 80,
          borderRadius: '50%',
          backgroundColor: 'rgba(255,255,255,0.06)',
        }} />

        <h1 style={{
          fontSize: 30,
          fontWeight: 700,
          color: '#ffffff',
          letterSpacing: '-0.5px',
          marginBottom: 10,
          lineHeight: 1.1,
        }}>
          {personal.name || 'Your Name'}
        </h1>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 16px', marginBottom: personal.summary ? 16 : 0 }}>
          {[personal.email, personal.phone, personal.location, personal.linkedin]
            .filter(Boolean)
            .map((item, i) => (
              <span key={i} style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)' }}>{item}</span>
            ))}
        </div>

        {personal.summary && (
          <p style={{
            fontSize: 13,
            color: 'rgba(255,255,255,0.85)',
            lineHeight: 1.7,
            maxWidth: 520,
            borderLeft: '2px solid rgba(255,255,255,0.3)',
            paddingLeft: 12,
          }}>
            {personal.summary}
          </p>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: '36px 44px' }}>

        {/* Education */}
        {education[0]?.school && (
          <Section title="Education">
            {education.map((e, i) => (
              <div key={i} style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 3 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#1e1b4b' }}>{e.school}</span>
                  <span style={{ fontSize: 11, color: '#c4bfba' }}>{e.from} — {e.to}</span>
                </div>
                <div style={{ fontSize: 12, color: '#6b7280' }}>
                  {e.degree}{e.field && `, ${e.field}`}{e.grade && ` · ${e.grade}`}
                </div>
              </div>
            ))}
          </Section>
        )}

        {/* Experience */}
        {experience[0]?.company && (
          <Section title="Experience">
            {experience.map((e, i) => (
              <div key={i} style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 2 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#1e1b4b' }}>{e.role}</span>
                  <span style={{ fontSize: 11, color: '#c4bfba' }}>{e.from} — {e.to}</span>
                </div>
                <div style={{
                  fontSize: 12,
                  color: '#6366f1',
                  fontWeight: 500,
                  marginBottom: 8,
                }}>{e.company}</div>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                  {e.bullets.filter(b => b).map((b, j) => (
                    <li key={j} style={{
                      fontSize: 12,
                      color: '#4b5563',
                      lineHeight: 1.6,
                      paddingLeft: 14,
                      position: 'relative',
                      marginBottom: 4,
                    }}>
                      <span style={{
                        position: 'absolute',
                        left: 0,
                        top: 7,
                        width: 4,
                        height: 4,
                        borderRadius: '50%',
                        backgroundColor: '#a5b4fc',
                      }} />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Section>
        )}

        {/* Skills */}
        {skills.technical && (
          <Section title="Skills">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 24px' }}>
              {[
                { label: 'Technical', value: skills.technical },
                { label: 'Soft Skills', value: skills.soft },
                { label: 'Languages', value: skills.languages },
                { label: 'Tools', value: skills.tools },
              ].filter(s => s.value).map((s, i) => (
                <div key={i} style={{
                  backgroundColor: '#faf9ff',
                  border: '1px solid #eef2ff',
                  borderRadius: 8,
                  padding: '10px 12px',
                }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#a5b4fc', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    {s.label}
                  </span>
                  <p style={{ fontSize: 12, color: '#4b5563', marginTop: 4, lineHeight: 1.5 }}>{s.value}</p>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Projects */}
        {projects[0]?.name && (
          <Section title="Projects">
            {projects.map((p, i) => (
              <div key={i} style={{
                marginBottom: 16,
                padding: '12px 14px',
                borderRadius: 10,
                border: '1px solid #eef2ff',
                backgroundColor: '#fafaff',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#1e1b4b' }}>{p.name}</span>
                  {p.link && <span style={{ fontSize: 11, color: '#a5b4fc' }}>{p.link}</span>}
                </div>
                {p.description && (
                  <p style={{ fontSize: 12, color: '#4b5563', lineHeight: 1.6, marginBottom: 6 }}>{p.description}</p>
                )}
                {p.tech && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                    {p.tech.split(',').map((t, j) => (
                      <span key={j} style={{
                        fontSize: 10,
                        color: '#6366f1',
                        backgroundColor: '#eef2ff',
                        borderRadius: 4,
                        padding: '2px 7px',
                        fontWeight: 500,
                      }}>
                        {t.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </Section>
        )}
      </div>
    </div>
  )
}