export default function ProfessionalTemplate({ data }) {
  const { personal, education, experience, skills, projects } = data

  const SideSection = ({ title, children }) => (
    <div style={{ marginBottom: 24 }}>
      <p style={{
        fontSize: 9,
        fontWeight: 700,
        letterSpacing: '0.14em',
        color: '#a8a29e',
        textTransform: 'uppercase',
        marginBottom: 10,
        paddingBottom: 6,
        borderBottom: '1px solid #292524',
      }}>{title}</p>
      {children}
    </div>
  )

  const MainSection = ({ title, children }) => (
    <section style={{ marginBottom: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
        <span style={{
          fontSize: 9,
          fontWeight: 700,
          letterSpacing: '0.14em',
          color: '#78716c',
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
      fontFamily: "'Inter', sans-serif",
      maxWidth: '100%',
      minHeight: 900,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    }}>

      {/* Header */}
      <div style={{
        backgroundColor: '#1c1917',
        padding: '36px 40px',
      }}>
        <h1 style={{
          fontSize: 28,
          fontWeight: 600,
          color: '#ffffff',
          letterSpacing: '-0.5px',
          marginBottom: 10,
          lineHeight: 1.1,
        }}>
          {personal.name || 'Your Name'}
        </h1>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 16px' }}>
          {[personal.email, personal.phone, personal.location, personal.linkedin]
            .filter(Boolean)
            .map((item, i) => (
              <span key={i} style={{ fontSize: 11, color: '#a8a29e' }}>{item}</span>
            ))}
        </div>
      </div>

      {/* Body — two column */}
      <div style={{ display: 'flex', flex: 1 }}>

        {/* Sidebar */}
        <div style={{
          width: '32%',
          backgroundColor: '#292524',
          padding: '28px 22px',
        }}>

          {/* Skills */}
          {skills.technical && (
            <SideSection title="Technical">
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {skills.technical.split(',').map((s, i) => (
                  <span key={i} style={{
                    fontSize: 10,
                    color: '#d6d3d1',
                    backgroundColor: '#3c3835',
                    borderRadius: 4,
                    padding: '3px 8px',
                  }}>
                    {s.trim()}
                  </span>
                ))}
              </div>
            </SideSection>
          )}

          {skills.tools && (
            <SideSection title="Tools">
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {skills.tools.split(',').map((s, i) => (
                  <span key={i} style={{
                    fontSize: 10,
                    color: '#d6d3d1',
                    backgroundColor: '#3c3835',
                    borderRadius: 4,
                    padding: '3px 8px',
                  }}>
                    {s.trim()}
                  </span>
                ))}
              </div>
            </SideSection>
          )}

          {skills.languages && (
            <SideSection title="Languages">
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {skills.languages.split(',').map((s, i) => (
                  <span key={i} style={{
                    fontSize: 10,
                    color: '#d6d3d1',
                    backgroundColor: '#3c3835',
                    borderRadius: 4,
                    padding: '3px 8px',
                  }}>
                    {s.trim()}
                  </span>
                ))}
              </div>
            </SideSection>
          )}

          {skills.soft && (
            <SideSection title="Soft Skills">
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {skills.soft.split(',').map((s, i) => (
                  <span key={i} style={{
                    fontSize: 10,
                    color: '#d6d3d1',
                    backgroundColor: '#3c3835',
                    borderRadius: 4,
                    padding: '3px 8px',
                  }}>
                    {s.trim()}
                  </span>
                ))}
              </div>
            </SideSection>
          )}

          {/* Education in sidebar */}
          {education[0]?.school && (
            <SideSection title="Education">
              {education.map((e, i) => (
                <div key={i} style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#e7e5e4', marginBottom: 3 }}>{e.school}</div>
                  <div style={{ fontSize: 11, color: '#a8a29e', marginBottom: 2 }}>{e.degree}</div>
                  {e.field && <div style={{ fontSize: 11, color: '#78716c' }}>{e.field}</div>}
                  <div style={{ fontSize: 10, color: '#57534e', marginTop: 3 }}>{e.from} — {e.to}</div>
                  {e.grade && (
                    <div style={{
                      fontSize: 10,
                      color: '#a8a29e',
                      marginTop: 4,
                      backgroundColor: '#3c3835',
                      borderRadius: 4,
                      padding: '2px 7px',
                      display: 'inline-block',
                    }}>{e.grade}</div>
                  )}
                </div>
              ))}
            </SideSection>
          )}
        </div>

        {/* Main content */}
        <div style={{ flex: 1, padding: '28px 28px' }}>

          {/* Profile */}
          {personal.summary && (
            <MainSection title="Profile">
              <p style={{
                fontSize: 12,
                color: '#57534e',
                lineHeight: 1.7,
                borderLeft: '2px solid #e7e5e4',
                paddingLeft: 12,
              }}>
                {personal.summary}
              </p>
            </MainSection>
          )}

          {/* Experience */}
          {experience[0]?.company && (
            <MainSection title="Experience">
              {experience.map((e, i) => (
                <div key={i} style={{ marginBottom: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 2 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#1c1917' }}>{e.role}</span>
                    <span style={{ fontSize: 10, color: '#c4bfba' }}>{e.from} — {e.to}</span>
                  </div>
                  <div style={{ fontSize: 11, color: '#a8a29e', marginBottom: 8 }}>{e.company}</div>
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
                          width: 3,
                          height: 3,
                          borderRadius: '50%',
                          backgroundColor: '#c4bfba',
                        }} />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </MainSection>
          )}

          {/* Projects */}
          {projects[0]?.name && (
            <MainSection title="Projects">
              {projects.map((p, i) => (
                <div key={i} style={{
                  marginBottom: 14,
                  padding: '10px 12px',
                  borderRadius: 8,
                  backgroundColor: '#faf9f7',
                  border: '1px solid #f0ece8',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#1c1917' }}>{p.name}</span>
                    {p.link && <span style={{ fontSize: 10, color: '#c4bfba' }}>{p.link}</span>}
                  </div>
                  {p.description && (
                    <p style={{ fontSize: 12, color: '#57534e', lineHeight: 1.6, marginBottom: 6 }}>{p.description}</p>
                  )}
                  {p.tech && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                      {p.tech.split(',').map((t, j) => (
                        <span key={j} style={{
                          fontSize: 10,
                          color: '#78716c',
                          backgroundColor: '#f0ece8',
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
            </MainSection>
          )}
        </div>
      </div>
    </div>
  )
}