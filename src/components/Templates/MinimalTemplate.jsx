export default function MinimalTemplate({ data }) {
  const { personal, education, experience, skills, projects } = data

  const Section = ({ title, children }) => (
    <section style={{ marginBottom: 28 }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        marginBottom: 14,
      }}>
        <span style={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: '0.12em',
          color: '#a8a29e',
          textTransform: 'uppercase',
        }}>{title}</span>
        <div style={{ flex: 1, height: 1, backgroundColor: '#f0ece8' }} />
      </div>
      {children}
    </section>
  )

  return (
    <div style={{
      backgroundColor: '#ffffff',
      padding: '48px 44px',
      fontFamily: "'Inter', sans-serif",
      maxWidth: '100%',
      minHeight: 900,
    }}>

      {/* Header */}
      <div style={{ marginBottom: 36, paddingBottom: 28, borderBottom: '1px solid #f0ece8' }}>
        <h1 style={{
          fontSize: 32,
          fontWeight: 300,
          color: '#1c1917',
          letterSpacing: '-1px',
          marginBottom: 10,
          lineHeight: 1.1,
        }}>
          {personal.name || 'Your Name'}
        </h1>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 16px', marginBottom: 14 }}>
          {[personal.email, personal.phone, personal.location, personal.linkedin]
            .filter(Boolean)
            .map((item, i) => (
              <span key={i} style={{ fontSize: 12, color: '#a8a29e' }}>{item}</span>
            ))}
        </div>

        {personal.summary && (
          <p style={{
            fontSize: 13,
            color: '#78716c',
            lineHeight: 1.7,
            maxWidth: 520,
            paddingLeft: 12,
            borderLeft: '2px solid #e7e5e4',
          }}>
            {personal.summary}
          </p>
        )}
      </div>

      {/* Education */}
      {education[0]?.school && (
        <Section title="Education">
          {education.map((e, i) => (
            <div key={i} style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 3 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#1c1917' }}>{e.school}</span>
                <span style={{ fontSize: 11, color: '#c4bfba' }}>{e.from} — {e.to}</span>
              </div>
              <div style={{ fontSize: 12, color: '#78716c' }}>
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
                <span style={{ fontSize: 14, fontWeight: 600, color: '#1c1917' }}>{e.role}</span>
                <span style={{ fontSize: 11, color: '#c4bfba' }}>{e.from} — {e.to}</span>
              </div>
              <div style={{ fontSize: 12, color: '#a8a29e', marginBottom: 8 }}>{e.company}</div>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                {e.bullets.filter(b => b).map((b, j) => (
                  <li key={j} style={{
                    fontSize: 12,
                    color: '#57534e',
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
                      backgroundColor: '#d6d3d1',
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
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 24px' }}>
            {[
              { label: 'Technical', value: skills.technical },
              { label: 'Soft Skills', value: skills.soft },
              { label: 'Languages', value: skills.languages },
              { label: 'Tools', value: skills.tools },
            ].filter(s => s.value).map((s, i) => (
              <div key={i}>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#c4bfba', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  {s.label}
                </span>
                <p style={{ fontSize: 12, color: '#57534e', marginTop: 3, lineHeight: 1.5 }}>{s.value}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Projects */}
      {projects[0]?.name && (
        <Section title="Projects">
          {projects.map((p, i) => (
            <div key={i} style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 3 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#1c1917' }}>{p.name}</span>
                {p.link && <span style={{ fontSize: 11, color: '#c4bfba' }}>{p.link}</span>}
              </div>
              {p.description && (
                <p style={{ fontSize: 12, color: '#57534e', lineHeight: 1.6, marginBottom: 4 }}>{p.description}</p>
              )}
              {p.tech && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                  {p.tech.split(',').map((t, j) => (
                    <span key={j} style={{
                      fontSize: 10,
                      color: '#a8a29e',
                      backgroundColor: '#faf9f7',
                      border: '1px solid #ede9e3',
                      borderRadius: 4,
                      padding: '2px 7px',
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
  )
}