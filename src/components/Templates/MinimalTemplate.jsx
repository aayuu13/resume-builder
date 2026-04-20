export default function MinimalTemplate({ data }) {
  const { personal, education, experience, skills, projects } = data

  return (
    <div className="mx-auto max-w-2xl rounded-xl bg-white p-8 text-sm text-slate-800 shadow-md">
      <div className="mb-6">
        <h1 className="text-3xl font-light tracking-tight text-slate-900">{personal.name || 'Your Name'}</h1>
        <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-400">
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>· {personal.phone}</span>}
          {personal.location && <span>· {personal.location}</span>}
          {personal.linkedin && <span>· {personal.linkedin}</span>}
        </div>
        {personal.summary && (
          <p className="mt-3 border-l-2 border-slate-200 pl-3 text-sm leading-relaxed text-slate-500">{personal.summary}</p>
        )}
      </div>

      {education[0]?.school && (
        <section className="mb-5">
          <h2 className="mb-3 text-xs uppercase tracking-widest text-slate-400">Education</h2>
          {education.map((e, i) => (
            <div key={i} className="mb-2">
              <div className="flex justify-between">
                <span className="font-medium">{e.school}</span>
                <span className="text-xs text-slate-400">
                  {e.from} - {e.to}
                </span>
              </div>
              <div className="text-xs text-slate-400">
                {e.degree} {e.field && `· ${e.field}`} {e.grade && `· ${e.grade}`}
              </div>
            </div>
          ))}
        </section>
      )}

      {experience[0]?.company && (
        <section className="mb-5">
          <h2 className="mb-3 text-xs uppercase tracking-widest text-slate-400">Experience</h2>
          {experience.map((e, i) => (
            <div key={i} className="mb-3">
              <div className="flex justify-between">
                <span className="font-medium">{e.role}</span>
                <span className="text-xs text-slate-400">
                  {e.from} - {e.to}
                </span>
              </div>
              <div className="mb-1 text-xs text-slate-400">{e.company}</div>
              <ul className="list-inside list-disc space-y-0.5 text-xs text-slate-500">
                {e.bullets.filter((b) => b).map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {skills.technical && (
        <section className="mb-5">
          <h2 className="mb-3 text-xs uppercase tracking-widest text-slate-400">Skills</h2>
          <div className="space-y-1 text-xs text-slate-500">
            {skills.technical && <div><span className="font-medium text-slate-600">Technical: </span>{skills.technical}</div>}
            {skills.soft && <div><span className="font-medium text-slate-600">Soft: </span>{skills.soft}</div>}
            {skills.languages && <div><span className="font-medium text-slate-600">Languages: </span>{skills.languages}</div>}
            {skills.tools && <div><span className="font-medium text-slate-600">Tools: </span>{skills.tools}</div>}
          </div>
        </section>
      )}

      {projects[0]?.name && (
        <section>
          <h2 className="mb-3 text-xs uppercase tracking-widest text-slate-400">Projects</h2>
          {projects.map((p, i) => (
            <div key={i} className="mb-2">
              <div className="flex justify-between">
                <span className="font-medium">{p.name}</span>
                {p.link && <span className="text-xs text-slate-400">{p.link}</span>}
              </div>
              {p.description && <p className="text-xs text-slate-500">{p.description}</p>}
              {p.tech && <p className="text-xs text-slate-400">Tech: {p.tech}</p>}
            </div>
          ))}
        </section>
      )}
    </div>
  )
}