'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import BrushV from '../components/BrushV';
import {
  SiSalesforce, SiSap,
} from 'react-icons/si';
import { VscAzure } from 'react-icons/vsc';
import {
  TbArrowLeft, TbWorld, TbUsers, TbShieldLock, TbGitBranch,
  TbCloudComputing, TbChartBar,
} from 'react-icons/tb';
import type { IconType } from 'react-icons';

const projects = [
  {
    title: 'Multi-Cloud CRM for European Automotive OEM',
    industry: 'Automotive',
    region: 'Germany, France, Netherlands',
    platforms: ['Salesforce Sales Cloud', 'Experience Cloud', 'Commerce Cloud', 'Loyalty Cloud', 'Service Cloud'],
    icon: SiSalesforce,
    color: 'blue',
    challenge: 'A fast-growing European EV manufacturer needed a unified CRM to manage their online-to-offline (O2O) customer journey across three markets — from web configurator to dealer handover.',
    solution: 'Implemented five Salesforce clouds with unified customer profiles, Commerce Cloud webshop with Stripe/Adyen payment integrations, dealer portals on Experience Cloud, and Loyalty Cloud for retention.',
    results: ['Unified customer journey across 3 markets', 'Dealer portal adoption > 85%', 'Payment integration supporting 4 currencies', 'GitHub + Gearset DevOps pipeline'],
    tags: ['O2O Journey', 'Multi-Market', 'Payment Integration'],
  },
  {
    title: 'Enterprise BI & Analytics Platform',
    industry: 'Automotive',
    region: '10 European Markets',
    platforms: ['Microsoft Dynamics 365', 'F&O', 'Power BI', 'Databricks'],
    icon: VscAzure,
    color: 'cyan',
    challenge: 'An electric vehicle company needed centralised BI across 10 European markets, integrating marketing spend data (Google Ads, Bing, Matomo) with CRM and ERP data for executive reporting.',
    solution: 'Built a Databricks data lake ingesting from multiple sources. Created Power BI dashboards for C-suite with real-time pipeline visibility, marketing attribution, and operational KPIs. Migrated from legacy ERP to Dynamics F&O.',
    results: ['10 markets consolidated into single BI view', 'Real-time marketing attribution dashboards', 'ERP migration with zero downtime', 'Executive reporting cadence reduced from weekly to real-time'],
    tags: ['Data Lake', 'Marketing Attribution', 'ERP Migration'],
  },
  {
    title: 'SAP HANA Lead Management System',
    industry: 'Manufacturing',
    region: 'India, APAC',
    platforms: ['SAP HANA', 'Territory Mapping', 'BI Reports'],
    icon: SiSap,
    color: 'amber',
    challenge: 'A global construction tools manufacturer needed automated lead scoring, routing, and territory mapping for their India operations — replacing manual spreadsheet-based processes.',
    solution: 'Designed lead management workflows on SAP HANA with automated scoring models, territory-based routing rules, and stage-based nurture sequences. Built BI reports for regional performance tracking.',
    results: ['Lead response time reduced by 60%', 'Automated territory assignment for 200+ reps', 'Performance tracking across regions', 'Awarded "Fire Campaign" for excellence'],
    tags: ['Lead Scoring', 'Territory Mapping', 'Automation'],
  },
  {
    title: 'Salesforce DevOps & CI/CD Pipeline',
    industry: 'Manufacturing',
    region: 'Global',
    platforms: ['SFDX', 'Hardis CLI', 'Azure DevOps', 'Salesforce B2B Commerce'],
    icon: TbGitBranch,
    color: 'indigo',
    challenge: 'A global pump manufacturer with multi-org Salesforce deployments needed automated metadata deployments, replacing error-prone manual change sets.',
    solution: 'Implemented SFDX-based DevOps with Hardis CLI on Azure DevOps. Automated CI pipelines for metadata validation, apex test execution, and environment-specific deployments across sandbox and production orgs.',
    results: ['Deployment time reduced from days to minutes', 'Zero manual change sets', 'Automated test coverage enforcement', 'Multi-org deployment orchestration'],
    tags: ['SFDX', 'CI/CD', 'Automated Deployments'],
  },
  {
    title: 'Custom CRM — Ground-Up Build',
    industry: 'Pharma',
    region: 'Germany',
    platforms: ['Java', 'Custom Database', 'REST APIs'],
    icon: TbCloudComputing,
    color: 'purple',
    challenge: 'A pharmaceutical machinery manufacturer needed a purpose-built CRM that tracked complex machine configurations, service histories, and spare parts — requirements too specific for off-the-shelf solutions.',
    solution: 'Designed and built a Java-based CRM from ground up — database schema, UI, workflow automation, and reporting. Integrated with existing production systems for real-time machine status tracking.',
    results: ['Bespoke CRM serving 5+ years', 'Full lifecycle tracking per machine', 'Service scheduling automation', 'Custom reporting for management'],
    tags: ['Bespoke CRM', 'Java', 'Full-Stack'],
  },
  {
    title: 'Enterprise Partner Onboarding',
    industry: 'E-Commerce',
    region: 'Europe',
    platforms: ['Salesforce', 'Data Validation', 'Automation Frameworks'],
    icon: TbUsers,
    color: 'teal',
    challenge: 'A leading European fashion marketplace needed to streamline partner onboarding — reducing manual data validation and accelerating time-to-first-sale for new brand partners.',
    solution: 'Built automated data validation pipelines for partner onboarding, implemented business logic rules for quality checks, and designed sales process optimisation frameworks for partner management teams.',
    results: ['Onboarding time reduced significantly', 'Automated quality validation', 'Scalable framework for 100s of partners', 'Sales process standardisation'],
    tags: ['Partner Management', 'Data Quality', 'Process Automation'],
  },
];

const colorMap: Record<string, { bg: string; border: string; icon: string; tag: string; tagBorder: string }> = {
  blue:   { bg: 'bg-blue-500/10',   border: 'border-blue-500/10',   icon: 'text-blue-400',   tag: 'text-blue-300/60',   tagBorder: 'border-blue-500/15' },
  cyan:   { bg: 'bg-cyan-500/10',   border: 'border-cyan-500/10',   icon: 'text-cyan-400',   tag: 'text-cyan-300/60',   tagBorder: 'border-cyan-500/15' },
  amber:  { bg: 'bg-amber-500/10',  border: 'border-amber-500/10',  icon: 'text-amber-400',  tag: 'text-amber-300/60',  tagBorder: 'border-amber-500/15' },
  indigo: { bg: 'bg-indigo-500/10', border: 'border-indigo-500/10', icon: 'text-indigo-400', tag: 'text-indigo-300/60', tagBorder: 'border-indigo-500/15' },
  purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/10', icon: 'text-purple-400', tag: 'text-purple-300/60', tagBorder: 'border-purple-500/15' },
  teal:   { bg: 'bg-teal-500/10',   border: 'border-teal-500/10',   icon: 'text-teal-400',   tag: 'text-teal-300/60',   tagBorder: 'border-teal-500/15' },
};

export default function ProjectsPage() {
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
          className="mb-16"
        >
          <span className="font-[family-name:var(--font-mono)] text-blue-400/60 text-xs tracking-[4px] uppercase">{'// case studies'}</span>
          <h1 className="text-4xl lg:text-6xl mt-4 tracking-tight">
            <span className="font-extralight text-white/60">Our </span>
            <span className="font-bold gradient-text">Projects</span>
          </h1>
          <p className="text-white/45 mt-4 max-w-2xl text-lg font-light">
            Real implementations across CRM, BI, and enterprise platforms. Names anonymized to protect client confidentiality.
          </p>
        </motion.div>

        {/* Project cards */}
        <div className="space-y-6">
          {projects.map((project, i) => {
            const colors = colorMap[project.color];
            const Icon = project.icon;
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 40, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div className={`glass rounded-2xl p-8 lg:p-10 shadow-[0_0_1px_rgba(255,255,255,0.1)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.06)] transition-all`}>
                  {/* Header row */}
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center`}>
                        <Icon className={`w-5 h-5 ${colors.icon}`} />
                      </div>
                      <div>
                        <h2 className="font-semibold text-white text-lg">{project.title}</h2>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-[10px] font-[family-name:var(--font-mono)] text-white/35 uppercase tracking-[1px]">{project.industry}</span>
                          <span className="text-white/15">|</span>
                          <span className="text-[10px] font-[family-name:var(--font-mono)] text-white/35 flex items-center gap-1"><TbWorld className="w-3 h-3" /> {project.region}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span key={tag} className={`text-[10px] font-[family-name:var(--font-mono)] px-2.5 py-1 rounded-lg border ${colors.tag} ${colors.tagBorder}`}>{tag}</span>
                      ))}
                    </div>
                  </div>

                  {/* Content grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div>
                      <div className="text-[10px] font-[family-name:var(--font-mono)] text-blue-400/50 uppercase tracking-[2px] mb-2">Challenge</div>
                      <p className="text-sm text-white/45 leading-relaxed">{project.challenge}</p>
                    </div>
                    <div>
                      <div className="text-[10px] font-[family-name:var(--font-mono)] text-blue-400/50 uppercase tracking-[2px] mb-2">Solution</div>
                      <p className="text-sm text-white/45 leading-relaxed">{project.solution}</p>
                    </div>
                    <div>
                      <div className="text-[10px] font-[family-name:var(--font-mono)] text-blue-400/50 uppercase tracking-[2px] mb-2">Results</div>
                      <ul className="space-y-1.5">
                        {project.results.map((r) => (
                          <li key={r} className="text-sm text-white/50 flex items-start gap-2">
                            <span className="w-1 h-1 bg-blue-400/50 rounded-full mt-2 shrink-0" />
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Platforms */}
                  <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-white/5">
                    {project.platforms.map((p) => (
                      <span key={p} className="text-[10px] font-[family-name:var(--font-mono)] px-3 py-1.5 bg-white/[0.03] rounded-lg text-white/35 border border-white/5">{p}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
