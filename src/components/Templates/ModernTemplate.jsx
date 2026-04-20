export default function ModernTemplate({ data }) {
  const { personal, education, experience, skills, projects } = data

  return (
    <div className="mx-auto max-w-2xl overflow-hidden rounded-xl bg-white shadow-md">
      <div className="bg-indigo-600 px-8 py-6 text-white">
        <h1 className="text-2xl font-bold">{personal.name || 'Your Name'}</h1>
        <div className="mt-2 flex flex-wrap gap-2 text-xs text-indigo-200">
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>· {personal.phone}</span>}
          {personal.location && <span>· {personal.location}</span>}
          {personal.linkedin && <span>· {personal.linkedin}</span>}
        </div>
        {personal.summary && <p className="mt-3 text-sm leading-relaxed text-indigo-100">{personal.summary}</p>}
      </div>

      <div className="space-y-5 px-8 py-6">
        {education[0]?.school && (
          <section>
            <h2 className="mb-3 border-b border-indigo-100 pb-1 text-xs font-bold uppercase tracking-widest text-indigo-500">
              Education
            </h2>
            {education.map((e, i) => (
              <div key={i} className="mb-2">
                <div className="flex justify-between">
                  <span className="font-semibold text-slate-800">{e.school}</span>
                  <span className="text-xs text-slate-400">
                    {e.from} - {e.to}
                  </span>
                </div>
                <div className="text-sm text-slate-500">
                  {e.degree} {e.field && `· ${e.field}`} {e.grade && `· ${e.grade}`}
                </div>
              </div>
            ))}
          </section>
        )}

        {experience[0]?.company && (
          <section>
            <h2 className="mb-3 border-b border-indigo-100 pb-1 text-xs font-bold uppercase tracking-widest text-indigo-500">
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
                <div className="mb-1 text-sm text-slate-500">{e.company}</div>
                <ul className="list-inside list-disc space-y-0.5 text-sm text-slate-600">
                  {e.bullets.filter((b) => b).map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        )}

        {skills.technical && (
          <section>
            <h2 className="mb-3 border-b border-indigo-100 pb-1 text-xs font-bold uppercase tracking-widest text-indigo-500">
              Skills
            </h2>
            <div className="space-y-1 text-sm text-slate-600">
              {skills.technical && (
                <div>
                  <span className="font-medium text-slate-700">Technical: </span>
                  {skills.technical}
                </div>
              )}
              {skills.soft && (
                <div>
                  <span className="font-medium text-slate-700">Soft Skills: </span>
                  {skills.soft}
                </div>
              )}
              {skills.languages && (
                <div>
                  <span className="font-medium text-slate-700">Languages: </span>
                  {skills.languages}
                </div>
              )}
              {skills.tools && (
                <div>
                  <span className="font-medium text-slate-700">Tools: </span>
                  {skills.tools}
                </div>
              )}
            </div>
          </section>
        )}

        {projects[0]?.name && (
          <section>
            <h2 className="mb-3 border-b border-indigo-100 pb-1 text-xs font-bold uppercase tracking-widest text-indigo-500">
              Projects
            </h2>
            {projects.map((p, i) => (
              <div key={i} className="mb-2">
                <div className="flex justify-between">
                  <span className="font-semibold text-slate-800">{p.name}</span>
                  {p.link && <a href={p.link} className="text-xs text-indigo-400">{p.link}</a>}
                </div>
                {p.description && <p className="text-sm text-slate-600">{p.description}</p>}
                {p.tech && <p className="mt-0.5 text-xs text-slate-400">Tech: {p.tech}</p>}
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  )
}