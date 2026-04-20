import { useState } from 'react'
import PersonalInfo from '../components/Form/PersonalInfo'
import Education from '../components/Form/Education'
import Experience from '../components/Form/Experience'
import Skills from '../components/Form/Skills'
import Projects from '../components/Form/Projects'
import TemplateSelector from '../components/Templates/TemplateSelector'
import Preview from '../components/Preview/Preview'
import ATSChecker from '../components/AI/ATSChecker'

const STEPS = [
  { label: 'Personal', icon: '01' },
  { label: 'Education', icon: '02' },
  { label: 'Experience', icon: '03' },
  { label: 'Skills', icon: '04' },
  { label: 'Projects', icon: '05' },
  { label: 'Template', icon: '06' },
]

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
  const [showPreview, setShowPreview] = useState(false)

  const updateData = (section, value) => {
    setData(prev => ({ ...prev, [section]: value }))
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#faf9f7' }}>
      {/* Header */}
<header style={{ backgroundColor: '#faf9f7', borderBottom: '1px solid #ede9e3' }} className="px-8 py-5 flex items-center justify-between sticky top-0 z-10">
  <div className="flex items-center gap-3">
    <a href="/" style={{ textDecoration: 'none' }}>
      <div style={{ width: 28, height: 28, backgroundColor: '#1c1917', borderRadius: 6 }} className="flex items-center justify-center cursor-pointer hover:opacity-80 transition">
        <span className="text-white text-xs font-bold">R</span>
      </div>
    </a>
    <span style={{ color: '#1c1917', fontWeight: 600, fontSize: 15, letterSpacing: '-0.3px' }}>Resume Builder</span>
  </div>
  <div className="flex items-center gap-4">
    <button
      onClick={() => setShowPreview(!showPreview)}
      className="lg:hidden text-sm font-medium"
      style={{ color: '#78716c' }}
    >
      {showPreview ? '← Edit' : 'Preview →'}
    </button>
    <span style={{ color: '#a8a29e', fontSize: 13 }}>
      {step + 1} / {STEPS.length}
    </span>
  </div>
</header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left — Form */}
        <div className={`w-full lg:w-1/2 overflow-y-auto px-8 py-8 ${showPreview ? 'hidden' : 'block'} lg:block`}>

          {/* Step navigation */}
          <div className="flex gap-0 mb-10 border-b" style={{ borderColor: '#ede9e3' }}>
            {STEPS.map((s, i) => (
              <button
                key={s.label}
                onClick={() => setStep(i)}
                className="flex flex-col items-start pb-3 mr-6 text-left transition-all"
                style={{
                  borderBottom: i === step ? '2px solid #1c1917' : '2px solid transparent',
                  marginBottom: -1,
                }}
              >
                <span style={{ fontSize: 10, color: i === step ? '#1c1917' : '#c4bfba', fontWeight: 500, letterSpacing: '0.05em', marginBottom: 2 }}>
                  {s.icon}
                </span>
                <span style={{ fontSize: 13, color: i === step ? '#1c1917' : i < step ? '#78716c' : '#c4bfba', fontWeight: i === step ? 600 : 400 }}>
                  {s.label}
                </span>
              </button>
            ))}
          </div>

          {/* Form card */}
          <div
            className="rounded-2xl p-8 mb-6"
            style={{ backgroundColor: '#ffffff', border: '1px solid #ede9e3', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
          >
            {step === 0 && <PersonalInfo data={data.personal} onChange={v => updateData('personal', v)} allData={data} />}
            {step === 1 && <Education data={data.education} onChange={v => updateData('education', v)} />}
            {step === 2 && <Experience data={data.experience} onChange={v => updateData('experience', v)} />}
            {step === 3 && <Skills data={data.skills} onChange={v => updateData('skills', v)} />}
            {step === 4 && <Projects data={data.projects} onChange={v => updateData('projects', v)} />}
            {step === 5 && <TemplateSelector selected={data.template} onChange={v => updateData('template', v)} />}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => setStep(s => Math.max(0, s - 1))}
              disabled={step === 0}
              className="text-sm font-medium transition"
              style={{ color: step === 0 ? '#d6d3d1' : '#78716c' }}
            >
              ← Back
            </button>
            <button
              onClick={() => setStep(s => Math.min(STEPS.length - 1, s + 1))}
              disabled={step === STEPS.length - 1}
              className="text-sm font-semibold px-6 py-2.5 rounded-xl transition"
              style={{
                backgroundColor: step === STEPS.length - 1 ? '#e7e5e4' : '#1c1917',
                color: step === STEPS.length - 1 ? '#a8a29e' : '#ffffff',
              }}
            >
              Continue →
            </button>
          </div>

          {/* ATS Checker — last step only */}
          {step === STEPS.length - 1 && <ATSChecker resumeData={data} />}
        </div>

        {/* Right — Live Preview */}
        <div
          className={`w-full lg:w-1/2 overflow-y-auto px-8 py-8 ${showPreview ? 'block' : 'hidden'} lg:block`}
          style={{ borderLeft: '1px solid #ede9e3', backgroundColor: '#f5f3f0' }}
        >
          <Preview data={data} />
        </div>
      </div>
    </div>
  )
}