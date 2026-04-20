import { useState } from 'react'
import PersonalInfo from '../components/Form/PersonalInfo'
import Education from '../components/Form/Education'
import Experience from '../components/Form/Experience'
import Skills from '../components/Form/Skills'
import Projects from '../components/Form/Projects'
import TemplateSelector from '../components/Templates/TemplateSelector'
import Preview from '../components/Preview/Preview'

const STEPS = ['Personal Info', 'Education', 'Experience', 'Skills', 'Projects', 'Template']

const initialData = {
  personal: { name: '', email: '', phone: '', location: '', linkedin: '', summary: '' },
  education: [{ school: '', degree: '', field: '', from: '', to: '', grade: '' }],
  experience: [{ company: '', role: '', from: '', to: '', current: false, bullets: [''] }],
  skills: { technical: '', soft: '', languages: '', tools: '' },
  projects: [{ name: '', description: '', tech: '', link: '' }],
  template: 'modern'
}

export default function Builder() {
  const [step, setStep] = useState(0)
  const [data, setData] = useState(initialData)

  const updateData = (section, value) => {
    setData(prev => ({ ...prev, [section]: value }))
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-slate-800">Resume <span className="text-indigo-500">Builder</span></h1>
        <span className="text-sm text-slate-500">Step {step + 1} of {STEPS.length}</span>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left — Form */}
        <div className="w-full lg:w-1/2 overflow-y-auto p-6">
          {/* Step tabs */}
          <div className="flex gap-2 flex-wrap mb-6">
            {STEPS.map((s, i) => (
              <button
                key={s}
                onClick={() => setStep(i)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
                  i === step
                    ? 'bg-indigo-500 text-white'
                    : i < step
                    ? 'bg-indigo-100 text-indigo-600'
                    : 'bg-slate-200 text-slate-500'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Step content */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            {step === 0 && <PersonalInfo data={data.personal} onChange={v => updateData('personal', v)} />}
            {step === 1 && <Education data={data.education} onChange={v => updateData('education', v)} />}
            {step === 2 && <Experience data={data.experience} onChange={v => updateData('experience', v)} />}
            {step === 3 && <Skills data={data.skills} onChange={v => updateData('skills', v)} />}
            {step === 4 && <Projects data={data.projects} onChange={v => updateData('projects', v)} />}
            {step === 5 && <TemplateSelector selected={data.template} onChange={v => updateData('template', v)} />}
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-4">
            <button
              onClick={() => setStep(s => Math.max(0, s - 1))}
              disabled={step === 0}
              className="px-5 py-2 rounded-xl bg-slate-200 text-slate-600 font-medium disabled:opacity-40"
            >
              ← Back
            </button>
            <button
              onClick={() => setStep(s => Math.min(STEPS.length - 1, s + 1))}
              disabled={step === STEPS.length - 1}
              className="px-5 py-2 rounded-xl bg-indigo-500 text-white font-medium disabled:opacity-40"
            >
              Next →
            </button>
          </div>
        </div>

        {/* Right — Live Preview */}
        <div className="hidden lg:block w-1/2 border-l border-slate-200 overflow-y-auto bg-slate-50 p-6">
          <Preview data={data} />
        </div>
      </div>
    </div>
  )
}