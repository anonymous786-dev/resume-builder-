import React, { useState } from 'react';
import { ResumeData, Experience, Education, Skill, Project } from '../types';
import { Plus, Trash2, Sparkles, ChevronRight, ChevronLeft, User, Briefcase, GraduationCap, Code, Layout, Send } from 'lucide-react';
import { cn } from '../lib/utils';
import { generateResumeContent } from '../services/ai';

interface ResumeFormProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

export const ResumeForm: React.FC<ResumeFormProps> = ({ data, onChange }) => {
  const [activeTab, setActiveTab] = useState<'personal' | 'experience' | 'education' | 'skills' | 'projects' | 'template'>('personal');
  const [isGenerating, setIsGenerating] = useState(false);

  const updatePersonalInfo = (field: string, value: string) => {
    onChange({
      ...data,
      personalInfo: { ...data.personalInfo, [field]: value },
    });
  };

  const addExperience = () => {
    const newExp: Experience = {
      id: crypto.randomUUID(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    };
    onChange({ ...data, experiences: [...data.experiences, newExp] });
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    onChange({
      ...data,
      experiences: data.experiences.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    });
  };

  const removeExperience = (id: string) => {
    onChange({
      ...data,
      experiences: data.experiences.filter((exp) => exp.id !== id),
    });
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: crypto.randomUUID(),
      school: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      current: false,
    };
    onChange({ ...data, educations: [...data.educations, newEdu] });
  };

  const updateEducation = (id: string, field: keyof Education, value: any) => {
    onChange({
      ...data,
      educations: data.educations.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    });
  };

  const removeEducation = (id: string) => {
    onChange({
      ...data,
      educations: data.educations.filter((edu) => edu.id !== id),
    });
  };

  const addSkill = () => {
    const newSkill: Skill = { id: crypto.randomUUID(), name: '', level: 'Intermediate' };
    onChange({ ...data, skills: [...data.skills, newSkill] });
  };

  const updateSkill = (id: string, name: string) => {
    onChange({
      ...data,
      skills: data.skills.map((s) => (s.id === id ? { ...s, name } : s)),
    });
  };

  const removeSkill = (id: string) => {
    onChange({
      ...data,
      skills: data.skills.filter((s) => s.id !== id),
    });
  };

  const handleAIGenerate = async (type: 'summary' | 'experience', id?: string) => {
    setIsGenerating(true);
    try {
      let prompt = '';
      if (type === 'summary') {
        prompt = `Write a professional resume summary for a ${data.personalInfo.jobTitle}. My background includes: ${data.personalInfo.summary}. Make it impactful and concise.`;
      } else if (type === 'experience' && id) {
        const exp = data.experiences.find(e => e.id === id);
        prompt = `Write 3-4 professional bullet points for a resume for the position of ${exp?.position} at ${exp?.company}. Focus on achievements and use action verbs.`;
      }

      const result = await generateResumeContent(prompt);
      if (result) {
        if (type === 'summary') {
          updatePersonalInfo('summary', result);
        } else if (type === 'experience' && id) {
          updateExperience(id, 'description', result);
        }
      }
    } catch (error) {
      console.error('AI Generation failed', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const tabs = [
    { id: 'personal', label: 'Personal', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'projects', label: 'Projects', icon: Layout },
    { id: 'template', label: 'Design', icon: Layout },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden flex flex-col h-full">
      {/* Sidebar Tabs */}
      <div className="flex border-b border-slate-100 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={cn(
              "flex items-center gap-2 px-6 py-4 text-sm font-medium transition-all relative min-w-fit",
              activeTab === tab.id ? "text-indigo-600" : "text-slate-500 hover:text-slate-700"
            )}
          >
            <tab.icon size={18} />
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600" />
            )}
          </button>
        ))}
      </div>

      <div className="p-8 overflow-y-auto flex-1">
        {activeTab === 'personal' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Full Name</label>
                <input
                  type="text"
                  value={data.personalInfo.fullName}
                  onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Job Title</label>
                <input
                  type="text"
                  value={data.personalInfo.jobTitle}
                  onChange={(e) => updatePersonalInfo('jobTitle', e.target.value)}
                  placeholder="Senior Software Engineer"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Email</label>
                <input
                  type="email"
                  value={data.personalInfo.email}
                  onChange={(e) => updatePersonalInfo('email', e.target.value)}
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Phone</label>
                <input
                  type="text"
                  value={data.personalInfo.phone}
                  onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Professional Summary</label>
                <button
                  onClick={() => handleAIGenerate('summary')}
                  disabled={isGenerating}
                  className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-indigo-600 hover:text-indigo-700 transition-colors"
                >
                  <Sparkles size={12} />
                  {isGenerating ? 'Generating...' : 'AI Improve'}
                </button>
              </div>
              <textarea
                value={data.personalInfo.summary}
                onChange={(e) => updatePersonalInfo('summary', e.target.value)}
                placeholder="Briefly describe your professional background and key achievements..."
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none"
              />
            </div>
          </div>
        )}

        {activeTab === 'experience' && (
          <div className="space-y-8">
            {data.experiences.map((exp) => (
              <div key={exp.id} className="p-6 rounded-2xl border border-slate-100 bg-slate-50/50 space-y-4 relative group">
                <button
                  onClick={() => removeExperience(exp.id)}
                  className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Company</label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Position</label>
                    <input
                      type="text"
                      value={exp.position}
                      onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Start Date</label>
                    <input
                      type="text"
                      value={exp.startDate}
                      onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                      placeholder="Jan 2020"
                      className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">End Date</label>
                    <input
                      type="text"
                      value={exp.endDate}
                      disabled={exp.current}
                      onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                      placeholder="Present"
                      className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none disabled:bg-slate-100"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Description</label>
                    <button
                      onClick={() => handleAIGenerate('experience', exp.id)}
                      disabled={isGenerating}
                      className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-indigo-600 hover:text-indigo-700 transition-colors"
                    >
                      <Sparkles size={12} />
                      {isGenerating ? 'Generating...' : 'AI Bullet Points'}
                    </button>
                  </div>
                  <textarea
                    value={exp.description}
                    onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                  />
                </div>
              </div>
            ))}
            <button
              onClick={addExperience}
              className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 hover:text-indigo-600 hover:border-indigo-600 transition-all flex items-center justify-center gap-2 font-medium"
            >
              <Plus size={20} />
              Add Experience
            </button>
          </div>
        )}

        {activeTab === 'education' && (
          <div className="space-y-8">
            {data.educations.map((edu) => (
              <div key={edu.id} className="p-6 rounded-2xl border border-slate-100 bg-slate-50/50 space-y-4 relative">
                <button
                  onClick={() => removeEducation(edu.id)}
                  className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">School / University</label>
                  <input
                    type="text"
                    value={edu.school}
                    onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Degree</label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                      placeholder="Bachelor's"
                      className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Field of Study</label>
                    <input
                      type="text"
                      value={edu.field}
                      onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                      placeholder="Computer Science"
                      className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={addEducation}
              className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 hover:text-indigo-600 hover:border-indigo-600 transition-all flex items-center justify-center gap-2 font-medium"
            >
              <Plus size={20} />
              Add Education
            </button>
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="space-y-6">
            <div className="flex flex-wrap gap-3">
              {data.skills.map((skill) => (
                <div key={skill.id} className="flex items-center gap-2 bg-indigo-50 text-indigo-700 px-3 py-2 rounded-xl group">
                  <input
                    type="text"
                    value={skill.name}
                    onChange={(e) => updateSkill(skill.id, e.target.value)}
                    className="bg-transparent border-none outline-none text-sm font-medium w-24"
                  />
                  <button onClick={() => removeSkill(skill.id)} className="text-indigo-300 hover:text-red-500">
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
              <button
                onClick={addSkill}
                className="flex items-center gap-2 px-4 py-2 border border-dashed border-slate-300 rounded-xl text-slate-400 hover:text-indigo-600 hover:border-indigo-600 transition-all text-sm font-medium"
              >
                <Plus size={16} />
                Add Skill
              </button>
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="space-y-8">
            {data.projects.map((proj) => (
              <div key={proj.id} className="p-6 rounded-2xl border border-slate-100 bg-slate-50/50 space-y-4 relative">
                <button
                  onClick={() => {
                    onChange({ ...data, projects: data.projects.filter(p => p.id !== proj.id) });
                  }}
                  className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Project Name</label>
                  <input
                    type="text"
                    value={proj.name}
                    onChange={(e) => {
                      onChange({
                        ...data,
                        projects: data.projects.map(p => p.id === proj.id ? { ...p, name: e.target.value } : p)
                      });
                    }}
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Description</label>
                  <textarea
                    value={proj.description}
                    onChange={(e) => {
                      onChange({
                        ...data,
                        projects: data.projects.map(p => p.id === proj.id ? { ...p, description: e.target.value } : p)
                      });
                    }}
                    rows={3}
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                  />
                </div>
              </div>
            ))}
            <button
              onClick={() => {
                const newProj: Project = { id: crypto.randomUUID(), name: '', description: '' };
                onChange({ ...data, projects: [...data.projects, newProj] });
              }}
              className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 hover:text-indigo-600 hover:border-indigo-600 transition-all flex items-center justify-center gap-2 font-medium"
            >
              <Plus size={20} />
              Add Project
            </button>
          </div>
        )}

        {activeTab === 'template' && (
          <div className="grid grid-cols-1 gap-4">
            {(['modern', 'classic', 'minimal'] as const).map((t) => (
              <button
                key={t}
                onClick={() => onChange({ ...data, template: t })}
                className={cn(
                  "p-6 rounded-2xl border-2 transition-all text-left flex items-center justify-between",
                  data.template === t ? "border-indigo-600 bg-indigo-50/50" : "border-slate-100 hover:border-slate-200"
                )}
              >
                <div>
                  <h3 className="font-bold capitalize">{t}</h3>
                  <p className="text-sm text-slate-500">
                    {t === 'modern' && 'Clean, professional, and bold.'}
                    {t === 'classic' && 'Traditional, elegant serif design.'}
                    {t === 'minimal' && 'Spacious, artistic, and modern.'}
                  </p>
                </div>
                <div className={cn(
                  "w-6 h-6 rounded-full border-2 flex items-center justify-center",
                  data.template === t ? "border-indigo-600 bg-indigo-600" : "border-slate-200"
                )}>
                  {data.template === t && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
