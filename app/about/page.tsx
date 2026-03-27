'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import BrushV from '../components/BrushV';
import {
  TbArrowLeft, TbWorld, TbCode, TbBulb, TbRocket,
  TbShieldCheck, TbTarget,
} from 'react-icons/tb';

const values = [
  {
    icon: TbTarget,
    title: 'Business-First Engineering',
    desc: 'We don\'t implement technology for its own sake. Every architecture decision ties back to a business outcome — revenue, efficiency, or customer experience.',
  },
  {
    icon: TbCode,
    title: 'Multi-Platform Fluency',
    desc: 'Salesforce, Microsoft, SAP — we pick the right tool for your problem. No vendor loyalty, no bias. Just the best fit for your business and budget.',
  },
  {
    icon: TbBulb,
    title: 'Opinionated Architecture',
    desc: 'We\'ve seen what works and what doesn\'t across 20+ enterprise implementations. We come with strong recommendations, backed by experience.',
  },
  {
    icon: TbRocket,
    title: 'Ship Early, Iterate Fast',
    desc: 'Agile isn\'t a buzzword for us. Two-week sprints with working software at the end of each. Stakeholder demos, not slide decks.',
  },
  {
    icon: TbShieldCheck,
    title: 'Production-Grade DevOps',
    desc: 'Every project gets CI/CD from day one. Version control, automated testing, environment management. No midnight deployments.',
  },
  {
    icon: TbWorld,
    title: 'Global by Default',
    desc: 'Multi-currency, multi-language, GDPR-compliant. We architect for international operations from the start — not as an afterthought.',
  },
];

const timeline = [
  { year: '2011', event: 'Started as an application engineer in Germany — built a CRM from scratch in Java' },
  { year: '2016', event: 'Moved into SAP HANA lead management at HILTI India' },
  { year: '2018', event: 'Transitioned to Salesforce consulting for enterprise clients' },
  { year: '2021', event: 'Completed Global MBA at GISMA Business School, Hannover' },
  { year: '2022', event: 'Led multi-cloud Salesforce implementations across European markets' },
  { year: '2024', event: 'Founded Vemer Consulting — combining CRM, BI, and DevOps expertise' },
  { year: '2025', event: 'Expanding into AI-powered enterprise solutions (RAG, LLM, NexIQ)' },
];

export default function AboutPage() {
  return (
    <div className="noise min-h-screen bg-[#050505]">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm">
            <TbArrowLeft className="w-4 h-4" />
            <span className="font-[family-name:var(--font-mono)]">Back</span>
          </Link>
          <Link href="/">
            <BrushV size={24} />
          </Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 pt-28 pb-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <span className="font-[family-name:var(--font-mono)] text-blue-400/60 text-xs tracking-[4px] uppercase">{'// who we are'}</span>
          <h1 className="text-4xl lg:text-6xl mt-4 tracking-tight">
            <span className="font-extralight text-white/60">About </span>
            <span className="font-bold gradient-text">Vemer</span>
          </h1>
        </motion.div>

        {/* Story */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass rounded-2xl p-8 lg:p-12 mb-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            <div className="lg:col-span-3">
              <div className="text-[10px] font-[family-name:var(--font-mono)] text-blue-400/50 uppercase tracking-[2px] mb-4">Our Story</div>
              <div className="space-y-4 text-white/50 text-[15px] leading-relaxed">
                <p>
                  Vemer Consulting was founded on a simple observation: most enterprise CRM implementations fail not because of technology, but because of poor architecture decisions made in week one.
                </p>
                <p>
                  With <span className="text-white/70">10+ years</span> of hands-on experience across <span className="text-white/70">Salesforce, Microsoft Dynamics, and SAP</span>, we&apos;ve seen the patterns that lead to success — and the ones that don&apos;t. We bring that experience to every engagement.
                </p>
                <p>
                  Based in <span className="text-white/70">Hamburg, Germany</span> with delivery capabilities across Europe and India, we serve clients who need enterprise-grade solutions without enterprise-grade timelines.
                </p>
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="text-[10px] font-[family-name:var(--font-mono)] text-blue-400/50 uppercase tracking-[2px] mb-4">At a Glance</div>
              <div className="space-y-4">
                {[
                  { label: 'Founded', value: '2024' },
                  { label: 'Headquarters', value: 'Hamburg, Germany' },
                  { label: 'Delivery', value: 'Germany + India' },
                  { label: 'Experience', value: '10+ Years' },
                  { label: 'Projects', value: '20+ Enterprise' },
                  { label: 'Markets', value: '10+ Countries' },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between items-center border-b border-white/5 pb-3">
                    <span className="text-[11px] font-[family-name:var(--font-mono)] text-white/30 uppercase tracking-[1px]">{item.label}</span>
                    <span className="text-sm text-white/60 font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="text-[10px] font-[family-name:var(--font-mono)] text-blue-400/50 uppercase tracking-[2px] mb-8">How We Work</div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                >
                  <div className="glass rounded-2xl p-7 h-full shadow-[0_0_1px_rgba(255,255,255,0.1)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.06)] transition-all">
                    <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4">
                      <Icon className="w-4.5 h-4.5 text-blue-400/60" />
                    </div>
                    <h3 className="font-semibold text-white text-[15px] mb-2">{v.title}</h3>
                    <p className="text-sm text-white/40 leading-relaxed">{v.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="text-[10px] font-[family-name:var(--font-mono)] text-blue-400/50 uppercase tracking-[2px] mb-8">Journey</div>
          <div className="glass rounded-2xl p-8 lg:p-10">
            <div className="space-y-0">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }}
                  className="flex items-start gap-6 relative"
                >
                  {/* Timeline line */}
                  {i < timeline.length - 1 && (
                    <div className="absolute left-[27px] top-8 w-px h-full bg-gradient-to-b from-blue-500/20 to-transparent" />
                  )}
                  {/* Dot */}
                  <div className="w-[7px] h-[7px] rounded-full bg-blue-400/50 mt-2 shrink-0 relative z-10 ring-4 ring-[#050505]" />
                  {/* Content */}
                  <div className="pb-8">
                    <span className="font-[family-name:var(--font-mono)] text-blue-400/40 text-sm font-bold">{item.year}</span>
                    <p className="text-sm text-white/50 mt-1">{item.event}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <Link href="/#contact" className="inline-block px-8 py-3.5 bg-blue-500 text-white rounded-full text-sm font-medium hover:bg-blue-400 transition-colors">
            Work With Us
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
