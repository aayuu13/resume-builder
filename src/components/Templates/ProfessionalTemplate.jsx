export default function ProfessionalTemplate({ data }) {
  const { personal, education, experience, skills, projects } = data

  return (
    <div className="mx-auto max-w-2xl overflow-hidden rounded-xl bg-white text-sm shadow-md">
      <div className="bg-slate-800 px-8 py-5 text-white">
        <h1 className="text-2xl font-bold tracking-wide">{personal.name || 'Your Name'}</h1>
        <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-300">
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>· {personal.phone}</span>}
          {personal.location && <span>· {personal.location}</span>}
          {personal.linkedin && <span>· {personal.linkedin}</span>}
        </div>
      </div>

      <div className="flex">
        <div className="w-1/3 space-y-5 bg-slate-50 px-5 py-6">
          {skills.technical && (
            <section>
              <h2 className="mb-2 text-xs font-bold uppercase tracking-widest text-slate-700">Skills</h2>
              <div className="space-y-1 text-xs text-slate-600">
                {skills.technical.split(',').map((s, i) => (
                  <div key={i} className="mb-1 mr-1 inline-block rounded bg-slate-200 px-2 py-0.5">
                    {s.trim()}
                  </div>
                ))}
              </div>
            </section>
          )}
          {skills.tools && (
            <section>
              <h2 className="mb-2 text-xs font-bold uppercase tracking-widest text-slate-700">Tools</h2>
              <p className="text-xs text-slate-600">{skills.tools}</p>
            </section>
          )}
          {skills.languages && (
            <section>
              <h2 className="mb-2 text-xs font-bold uppercase tracking-widest text-slate-700">Languages</h2>
              <p className="text-xs text-slate-600">{skills.languages}</p>
            </section>
          )}
          {education[0]?.school && (
            <section>
              <h2 className="mb-2 text-xs font-bold uppercase tracking-widest text-slate-700">Education</h2>
              {education.map((e, i) => (
                <div key={i} className="mb-2">
                  <div className="text-xs font-medium text-slate-800">{e.school}</div>
                  <div className="text-xs text-slate-500">{e.degree}</div>
                  <div className="text-xs text-slate-400">
                    {e.from} - {e.to}
                  </div>
                  {e.grade && <div className="text-xs text-slate-400">{e.grade}</div>}
                </div>
              ))}
            </section>
          )}
        </div>

        <div className="w-2/3 space-y-5 px-6 py-6">
          {personal.summary && (
            <section>
              <h2 className="mb-2 border-b border-slate-200 pb-1 text-xs font-bold uppercase tracking-widest text-slate-700">
                Profile
              </h2>
              <p className="text-xs leading-relaxed text-slate-600">{personal.summary}</p>
            </section>
          )}

          {experience[0]?.company && (
            <section>
              <h2 className="mb-2 border-b border-slate-200 pb-1 text-xs font-bold uppercase tracking-widest text-slate-700">
                Experience
              </h2>
              {experience.map((e, i) => (
                <div key={i} className="mb-3">
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-800">{e.role}</span>
                    <span className="text-xs text-slate-400">
                      {e.from} - {e.to}
                    </span>
                  </div>
                  <div className="mb-1 text-xs text-slate-500">{e.company}</div>
                  <ul className="list-inside list-disc space-y-0.5 text-xs text-slate-600">
                    {e.bullets.filter((b) => b).map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          )}

          {projects[0]?.name && (
            <section>
              <h2 className="mb-2 border-b border-slate-200 pb-1 text-xs font-bold uppercase tracking-widest text-slate-700">
                Projects
              </h2>
              {projects.map((p, i) => (
                <div key={i} className="mb-2">
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-800">{p.name}</span>
                    {p.link && <span className="text-xs text-slate-400">{p.link}</span>}
                  </div>
                  {p.description && <p className="text-xs text-slate-600">{p.description}</p>}
                  {p.tech && <p className="text-xs text-slate-400">Tech: {p.tech}</p>}
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  )
}