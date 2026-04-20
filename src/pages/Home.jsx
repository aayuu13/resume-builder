import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center justify-center px-6 py-16 text-center">
        <span className="mb-4 block text-sm font-semibold uppercase tracking-widest text-indigo-400">
          AI-Powered
        </span>
        <h1 className="mb-5 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
          Build a Resume That <span className="text-indigo-400">Gets Noticed</span>
        </h1>
        <p className="mb-10 max-w-2xl text-lg text-slate-300 sm:text-xl">
          Create a polished resume in minutes with AI guidance, modern templates, and one-click export.
        </p>
        <div className="mb-12 flex flex-wrap justify-center gap-3">
          {['AI Content Generator', 'ATS Score Checker', '3 Templates', 'PDF Download'].map((feature) => (
            <span
              key={feature}
              className="rounded-full border border-slate-700 bg-slate-800 px-4 py-1.5 text-sm text-slate-200"
            >
              {feature}
            </span>
          ))}
        </div>
        <button
          onClick={() => navigate('/builder')}
          className="rounded-xl bg-indigo-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-indigo-900/40 transition hover:bg-indigo-500"
        >
          Start Building →
        </button>
      </div>
    </div>
  )
}