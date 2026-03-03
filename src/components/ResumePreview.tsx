import React from 'react';
import { ResumeData } from '../types';
import { cn } from '../lib/utils';
import { Mail, Phone, MapPin, Globe, Briefcase, GraduationCap, Code, Layout } from 'lucide-react';

interface ResumePreviewProps {
  data: ResumeData;
  id?: string;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ data, id }) => {
  const { personalInfo, experiences, educations, skills, projects, template } = data;

  const renderModern = () => (
    <div className="bg-white p-12 min-h-[1120px] font-sans text-slate-800">
      {/* Header */}
      <header className="border-b-2 border-slate-900 pb-8 mb-8">
        <h1 className="text-5xl font-bold tracking-tight mb-2 uppercase">{personalInfo.fullName || 'Your Name'}</h1>
        <p className="text-xl text-slate-500 font-medium mb-4">{personalInfo.jobTitle || 'Professional Title'}</p>
        <div className="flex flex-wrap gap-4 text-sm text-slate-600">
          {personalInfo.email && <span className="flex items-center gap-1"><Mail size={14} /> {personalInfo.email}</span>}
          {personalInfo.phone && <span className="flex items-center gap-1"><Phone size={14} /> {personalInfo.phone}</span>}
          {personalInfo.location && <span className="flex items-center gap-1"><MapPin size={14} /> {personalInfo.location}</span>}
          {personalInfo.website && <span className="flex items-center gap-1"><Globe size={14} /> {personalInfo.website}</span>}
        </div>
      </header>

      <div className="grid grid-cols-12 gap-12">
        {/* Main Column */}
        <div className="col-span-8 space-y-8">
          {personalInfo.summary && (
            <section>
              <h2 className="text-lg font-bold uppercase tracking-widest border-b border-slate-200 pb-2 mb-4">Summary</h2>
              <p className="text-slate-700 leading-relaxed">{personalInfo.summary}</p>
            </section>
          )}

          {experiences.length > 0 && (
            <section>
              <h2 className="text-lg font-bold uppercase tracking-widest border-b border-slate-200 pb-2 mb-4">Experience</h2>
              <div className="space-y-6">
                {experiences.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-lg">{exp.position}</h3>
                      <span className="text-sm text-slate-500 font-mono">{exp.startDate} — {exp.current ? 'Present' : exp.endDate}</span>
                    </div>
                    <p className="text-slate-600 font-medium mb-2">{exp.company}</p>
                    <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {projects.length > 0 && (
            <section>
              <h2 className="text-lg font-bold uppercase tracking-widest border-b border-slate-200 pb-2 mb-4">Projects</h2>
              <div className="space-y-4">
                {projects.map((proj) => (
                  <div key={proj.id}>
                    <h3 className="font-bold">{proj.name}</h3>
                    <p className="text-slate-700 text-sm leading-relaxed">{proj.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="col-span-4 space-y-8">
          {skills.length > 0 && (
            <section>
              <h2 className="text-lg font-bold uppercase tracking-widest border-b border-slate-200 pb-2 mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span key={skill.id} className="bg-slate-100 px-2 py-1 text-xs font-medium rounded text-slate-700">
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}

          {educations.length > 0 && (
            <section>
              <h2 className="text-lg font-bold uppercase tracking-widest border-b border-slate-200 pb-2 mb-4">Education</h2>
              <div className="space-y-4">
                {educations.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-bold text-sm">{edu.degree}</h3>
                    <p className="text-xs text-slate-600">{edu.school}</p>
                    <p className="text-[10px] text-slate-400 font-mono uppercase mt-1">{edu.startDate} — {edu.current ? 'Present' : edu.endDate}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );

  const renderClassic = () => (
    <div className="bg-white p-12 min-h-[1120px] font-serif text-slate-900">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">{personalInfo.fullName || 'Your Name'}</h1>
        <div className="flex justify-center gap-4 text-sm italic text-slate-600">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
      </header>

      <div className="space-y-8">
        {personalInfo.summary && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest border-b border-slate-300 pb-1 mb-3">Professional Summary</h2>
            <p className="text-slate-800 leading-relaxed text-sm">{personalInfo.summary}</p>
          </section>
        )}

        {experiences.length > 0 && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest border-b border-slate-300 pb-1 mb-3">Experience</h2>
            <div className="space-y-6">
              {experiences.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-base">{exp.company}</h3>
                    <span className="text-xs italic text-slate-600">{exp.startDate} — {exp.current ? 'Present' : exp.endDate}</span>
                  </div>
                  <p className="italic text-sm mb-2">{exp.position}</p>
                  <p className="text-slate-800 text-sm leading-relaxed whitespace-pre-line">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {educations.length > 0 && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest border-b border-slate-300 pb-1 mb-3">Education</h2>
            <div className="space-y-4">
              {educations.map((edu) => (
                <div key={edu.id} className="flex justify-between items-baseline">
                  <div>
                    <h3 className="font-bold text-sm">{edu.school}</h3>
                    <p className="text-sm italic">{edu.degree} in {edu.field}</p>
                  </div>
                  <span className="text-xs italic text-slate-600">{edu.startDate} — {edu.current ? 'Present' : edu.endDate}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {skills.length > 0 && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest border-b border-slate-300 pb-1 mb-3">Skills</h2>
            <p className="text-sm text-slate-800">
              <span className="font-bold">Technical Skills: </span>
              {skills.map(s => s.name).join(', ')}
            </p>
          </section>
        )}
      </div>
    </div>
  );

  const renderMinimal = () => (
    <div className="bg-white p-16 min-h-[1120px] font-sans text-slate-900">
      <div className="max-w-3xl mx-auto">
        <header className="mb-16">
          <h1 className="text-6xl font-light tracking-tighter mb-4">{personalInfo.fullName || 'Your Name'}</h1>
          <p className="text-lg text-slate-500 font-light tracking-wide">{personalInfo.jobTitle || 'Professional Title'}</p>
          <div className="mt-8 flex gap-6 text-xs text-slate-400 uppercase tracking-widest">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.location && <span>{personalInfo.location}</span>}
          </div>
        </header>

        <div className="space-y-16">
          {personalInfo.summary && (
            <section className="grid grid-cols-4 gap-8">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">About</h2>
              <div className="col-span-3">
                <p className="text-lg font-light leading-relaxed text-slate-700">{personalInfo.summary}</p>
              </div>
            </section>
          )}

          {experiences.length > 0 && (
            <section className="grid grid-cols-4 gap-8">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Experience</h2>
              <div className="col-span-3 space-y-12">
                {experiences.map((exp) => (
                  <div key={exp.id}>
                    <div className="mb-4">
                      <h3 className="text-xl font-medium">{exp.position}</h3>
                      <p className="text-slate-400 text-sm mt-1">{exp.company} / {exp.startDate} — {exp.current ? 'Present' : exp.endDate}</p>
                    </div>
                    <p className="text-slate-600 leading-relaxed text-sm whitespace-pre-line">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {educations.length > 0 && (
            <section className="grid grid-cols-4 gap-8">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Education</h2>
              <div className="col-span-3 space-y-8">
                {educations.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="text-lg font-medium">{edu.school}</h3>
                    <p className="text-slate-500 text-sm">{edu.degree} in {edu.field}</p>
                    <p className="text-slate-400 text-xs mt-1">{edu.startDate} — {edu.current ? 'Present' : edu.endDate}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div id={id} className="resume-preview-container w-full max-w-[800px] mx-auto overflow-hidden">
      {template === 'modern' && renderModern()}
      {template === 'classic' && renderClassic()}
      {template === 'minimal' && renderMinimal()}
    </div>
  );
};
