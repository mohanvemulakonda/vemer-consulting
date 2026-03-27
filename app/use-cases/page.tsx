'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import BrushV from '../components/BrushV';
import {
  TbArrowLeft, TbUsers, TbShoppingCart, TbCreditCard,
  TbGitBranch, TbChartBar, TbBuildingStore,
} from 'react-icons/tb';
import type { IconType } from 'react-icons';

const useCases = [
  {
    icon: TbUsers,
    title: 'Lead-to-Revenue Pipeline',
    subtitle: 'CRM + Marketing Automation',
    audience: 'Sales & Marketing Teams',
    problem: 'Leads fall through cracks. Marketing can\'t prove ROI. Sales blames marketing for bad leads. No single source of truth.',
    how: [
      'Unified lead capture from web forms, ads, events',
      'Automated scoring based on engagement + firmographics',
      'Territory-based routing to the right rep in real-time',
      'Stage-based nurture sequences (email, SMS, retargeting)',
      'Full-funnel attribution from first touch to closed deal',
    ],
    platforms: ['Salesforce Sales Cloud', 'Marketing Cloud', 'Pardot', 'Google Ads', 'Power BI'],
    outcome: 'Marketing proves pipeline contribution. Sales gets qualified leads. Revenue is predictable.',
  },
  {
    icon: TbShoppingCart,
    title: 'Online-to-Offline (O2O) Commerce',
    subtitle: 'Digital Showroom → Dealer Handover',
    audience: 'D2C / Automotive / Retail',
    problem: 'Customer configures a product online but must visit a dealer to purchase. The handover is clunky — customer has to repeat everything.',
    how: [
      'Commerce Cloud webshop with product configurator',
      'Customer profile syncs to dealer portal in real-time',
      'Experience Cloud dealer portal with full customer context',
      'Automated appointment booking and notifications',
      'Post-sale follow-up via Service Cloud',
    ],
    platforms: ['Salesforce Commerce Cloud', 'Experience Cloud', 'Service Cloud', 'Stripe', 'Adyen'],
    outcome: 'Seamless handover. Customer never repeats info. Dealer closes faster. NPS increases.',
  },
  {
    icon: TbCreditCard,
    title: 'Subscription & Payment Management',
    subtitle: 'Recurring Billing + Dunning',
    audience: 'SaaS / Subscription Businesses',
    problem: 'Failed payments cause silent churn. No automated dunning. Finance team manually reconciles invoices. Multi-currency is a nightmare.',
    how: [
      'Stripe/Adyen integration with webhook-driven status updates',
      'Automated dunning sequences for failed payments',
      'Multi-currency billing with automatic FX handling',
      'CRM-synced subscription lifecycle (trial → active → churned)',
      'Revenue recognition dashboards for finance',
    ],
    platforms: ['Stripe', 'Adyen', 'Salesforce Billing', 'Dynamics F&O', 'Power BI'],
    outcome: 'Involuntary churn drops. Finance gets real-time revenue visibility. Scaling to new markets is trivial.',
  },
  {
    icon: TbChartBar,
    title: 'Centralised BI & Executive Dashboards',
    subtitle: 'Data Lake → Actionable Insights',
    audience: 'C-Suite / Revenue Operations',
    problem: 'Data lives in 10 systems. Nobody trusts the numbers. Building a report takes a week. Marketing and sales tell different stories.',
    how: [
      'Databricks/Azure data lake ingesting from all sources',
      'Automated ETL pipelines (CRM, ERP, ad platforms, analytics)',
      'Power BI dashboards with role-based access',
      'Real-time pipeline, attribution, and operational KPIs',
      'Self-service reporting for business users',
    ],
    platforms: ['Databricks', 'Power BI', 'Azure', 'Google Ads', 'Matomo', 'Salesforce'],
    outcome: 'One source of truth. C-suite has real-time visibility. Data-driven decisions replace gut feelings.',
  },
  {
    icon: TbGitBranch,
    title: 'Salesforce DevOps & Automation',
    subtitle: 'From Change Sets to CI/CD',
    audience: 'Salesforce Admins / Architects',
    problem: 'Change sets are slow and error-prone. No version control. Sandbox conflicts. Deployments happen at midnight and still break.',
    how: [
      'Git-based source control for all Salesforce metadata',
      'SFDX project structure with modular packages',
      'CI pipeline: validate → test → deploy on every push',
      'Environment strategy: dev → QA → UAT → prod',
      'Automated test coverage enforcement (75%+ gate)',
    ],
    platforms: ['SFDX', 'Hardis CLI', 'Gearset', 'GitHub Actions', 'Azure DevOps'],
    outcome: 'Deployments in minutes, not days. Zero surprise breakages. Full audit trail. Developers ship with confidence.',
  },
  {
    icon: TbBuildingStore,
    title: 'Dealer & Partner Portal',
    subtitle: 'Self-Service Channel Management',
    audience: 'Brands with Dealer/Partner Networks',
    problem: 'Dealers rely on email and phone calls to get customer info, check inventory, or submit orders. HQ has no visibility into dealer performance.',
    how: [
      'Experience Cloud portal with branded dealer login',
      'Real-time customer handover with full journey context',
      'Inventory visibility and order submission',
      'Performance dashboards per dealer / region',
      'Knowledge base and training resources',
    ],
    platforms: ['Salesforce Experience Cloud', 'Sales Cloud', 'Service Cloud', 'CMS'],
    outcome: 'Dealers self-serve. HQ gets visibility. Customer experience improves. Channel scales without adding headcount.',
  },
];

export default function UseCasesPage() {
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
          <span className="font-[family-name:var(--font-mono)] text-blue-400/60 text-xs tracking-[4px] uppercase">{'// scenarios'}</span>
          <h1 className="text-4xl lg:text-6xl mt-4 tracking-tight">
            <span className="font-extralight text-white/60">Use </span>
            <span className="font-bold gradient-text">Cases</span>
          </h1>
          <p className="text-white/45 mt-4 max-w-2xl text-lg font-light">
            Common business challenges we solve. Each use case is a proven pattern we&apos;ve implemented across multiple clients and industries.
          </p>
        </motion.div>

        {/* Use case cards */}
        <div className="space-y-6">
          {useCases.map((uc, i) => {
            const Icon = uc.icon;
            return (
              <motion.div
                key={uc.title}
                initial={{ opacity: 0, y: 40, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
              >
                <div className="glass rounded-2xl p-8 lg:p-10 shadow-[0_0_1px_rgba(255,255,255,0.1)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.06)] transition-all">
                  {/* Header */}
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <h2 className="font-semibold text-white text-lg">{uc.title}</h2>
                        <div className="text-[11px] font-[family-name:var(--font-mono)] text-white/35 mt-0.5">{uc.subtitle}</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-[family-name:var(--font-mono)] text-blue-400/50 uppercase tracking-[2px] bg-blue-500/5 px-3 py-1.5 rounded-lg border border-blue-500/10">{uc.audience}</span>
                  </div>

                  {/* Problem */}
                  <div className="mb-6">
                    <div className="text-[10px] font-[family-name:var(--font-mono)] text-amber-400/50 uppercase tracking-[2px] mb-2">The Problem</div>
                    <p className="text-sm text-white/45 leading-relaxed">{uc.problem}</p>
                  </div>

                  {/* How we solve it */}
                  <div className="mb-6">
                    <div className="text-[10px] font-[family-name:var(--font-mono)] text-blue-400/50 uppercase tracking-[2px] mb-3">How We Solve It</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                      {uc.how.map((step, si) => (
                        <div key={si} className="flex items-start gap-2">
                          <span className="text-[10px] font-[family-name:var(--font-mono)] text-blue-400/30 mt-0.5 shrink-0">0{si + 1}</span>
                          <span className="text-sm text-white/50">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Outcome */}
                  <div className="bg-white/[0.02] rounded-xl p-4 mb-6">
                    <div className="text-[10px] font-[family-name:var(--font-mono)] text-green-400/50 uppercase tracking-[2px] mb-1">Outcome</div>
                    <p className="text-sm text-white/60 font-medium">{uc.outcome}</p>
                  </div>

                  {/* Platforms */}
                  <div className="flex flex-wrap gap-2">
                    {uc.platforms.map((p) => (
                      <span key={p} className="text-[10px] font-[family-name:var(--font-mono)] px-3 py-1.5 bg-white/[0.03] rounded-lg text-white/35 border border-white/5">{p}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-white/40 mb-6">Have a similar challenge?</p>
          <Link href="/#contact" className="inline-block px-8 py-3.5 bg-blue-500 text-white rounded-full text-sm font-medium hover:bg-blue-400 transition-colors">
            Start a Conversation
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
