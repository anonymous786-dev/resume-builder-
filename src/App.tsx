/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { ResumeForm } from './components/ResumeForm';
import { ResumePreview } from './components/ResumePreview';
import { initialData, ResumeData } from './types';
import { Download, Sparkles, FileText, Smartphone, Eye, Layout, Github } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { cn } from './lib/utils';

export default function App() {
  const [data, setData] = useState<ResumeData>(initialData);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);

  const handleExportPDF = async () => {
    if (!resumeRef.current) return;
    setIsExporting(true);

    try {
      const element = resumeRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width / 2, canvas.height / 2],
      });

      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width / 2, canvas.height / 2);
      pdf.save(`${data.personalInfo.fullName || 'resume'}.pdf`);
    } catch (error) {
      console.error('PDF Export failed', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col selection:bg-indigo-100 selection:text-indigo-900">
      {/* Background Pattern */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]" 
           style={{ backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
              <Sparkles size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">Lumina<span className="text-indigo-600">Resume</span></span>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsPreviewOpen(!isPreviewOpen)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 text-slate-600 font-medium hover:bg-slate-200 transition-all"
            >
              {isPreviewOpen ? <Layout size={18} /> : <Eye size={18} />}
              {isPreviewOpen ? 'Edit' : 'Preview'}
            </button>
            <button
              onClick={handleExportPDF}
              disabled={isExporting}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 disabled:opacity-50"
            >
              <Download size={18} />
              {isExporting ? 'Exporting...' : 'Download PDF'}
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl mx-auto w-full p-6 lg:p-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left Side: Form */}
        <div className={cn(
          "h-[calc(100vh-160px)] sticky top-32 transition-all duration-500",
          isPreviewOpen ? "hidden lg:block" : "block"
        )}>
          <ResumeForm data={data} onChange={setData} />
        </div>

        {/* Right Side: Preview */}
        <div className={cn(
          "lg:block transition-all duration-500",
          isPreviewOpen ? "block" : "hidden lg:block"
        )}>
          <div className="sticky top-32">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-400">
                <FileText size={16} />
                <span className="text-xs font-bold uppercase tracking-widest">Live Preview</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Syncing</span>
              </div>
            </div>
            
            <div className="scale-[0.85] origin-top transform-gpu">
              <ResumePreview data={data} id="resume-to-print" />
            </div>
          </div>
        </div>
      </main>

      {/* Hidden element for PDF generation to ensure full resolution */}
      <div className="fixed left-[-9999px] top-0">
        <div ref={resumeRef}>
          <ResumePreview data={data} />
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm">© 2024 Lumina Resume. Built with precision.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-slate-400 hover:text-slate-600 transition-colors"><Github size={20} /></a>
            <a href="#" className="text-slate-400 hover:text-slate-600 transition-colors text-sm font-medium">Privacy</a>
            <a href="#" className="text-slate-400 hover:text-slate-600 transition-colors text-sm font-medium">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
