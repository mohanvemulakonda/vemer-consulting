'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import BrushV from '../components/BrushV';
import { TbArrowLeft, TbClock, TbTag } from 'react-icons/tb';

const articles = [
  {
    category: 'CRM Strategy',
    title: 'Why Multi-Cloud CRM Beats Single-Vendor Lock-In',
    excerpt: 'Most enterprises start with one CRM. Then they need a dealer portal (Experience Cloud), marketing automation (Marketing Cloud), and suddenly they\'re locked into a single vendor\'s roadmap. Here\'s a smarter approach.',
    readTime: '6 min',
    date: 'Mar 2026',
    topics: ['Salesforce', 'Microsoft Dynamics', 'Architecture'],
  },
  {
    category: 'Data & BI',
    title: 'Building a Marketing Attribution Model That Actually Works',
    excerpt: 'First-touch vs last-touch is a false choice. Modern attribution requires a data lake, cross-platform tracking, and a model that accounts for the messy reality of B2B buying journeys.',
    readTime: '8 min',
    date: 'Feb 2026',
    topics: ['Databricks', 'Power BI', 'Google Ads', 'Attribution'],
  },
  {
    category: 'DevOps',
    title: 'Salesforce DevOps in 2026: Beyond Change Sets',
    excerpt: 'SFDX, Hardis CLI, and Gearset have made Salesforce deployments as reliable as web deployments. Here\'s how to set up a CI/CD pipeline that your team will actually use.',
    readTime: '7 min',
    date: 'Feb 2026',
    topics: ['SFDX', 'CI/CD', 'Azure DevOps', 'Hardis'],
  },
  {
    category: 'Industry Trends',
    title: 'The Rise of AI Agents in Enterprise CRM',
    excerpt: 'Salesforce Einstein, Copilot in Dynamics 365, and custom RAG-powered agents are changing how sales teams interact with their CRM. But most implementations fail. Here\'s why — and what to do instead.',
    readTime: '9 min',
    date: 'Jan 2026',
    topics: ['AI Agents', 'RAG', 'LLM', 'Salesforce Einstein'],
  },
  {
    category: 'Payment Integration',
    title: 'Stripe vs Adyen vs Worldline: A Technical Comparison for Enterprise',
    excerpt: 'Choosing a payment provider isn\'t just about fees. Webhook reliability, multi-currency support, recurring billing, and CRM integration complexity vary wildly. Here\'s what we\'ve learned across 10+ implementations.',
    readTime: '10 min',
    date: 'Jan 2026',
    topics: ['Stripe', 'Adyen', 'Worldline', 'Payments'],
  },
  {
    category: 'White Paper',
    title: 'The O2O Playbook: Online-to-Offline Customer Journeys',
    excerpt: 'A comprehensive guide to designing digital-to-physical customer handovers — from web configurator to dealer showroom. Covers architecture, data flow, dealer adoption, and measurement.',
    readTime: '15 min',
    date: 'Dec 2025',
    topics: ['O2O', 'Commerce Cloud', 'Dealer Portal', 'Architecture'],
  },
];

const categoryColors: Record<string, string> = {
  'CRM Strategy': 'text-blue-400/60 bg-blue-500/5 border-blue-500/10',
  'Data & BI': 'text-cyan-400/60 bg-cyan-500/5 border-cyan-500/10',
  'DevOps': 'text-indigo-400/60 bg-indigo-500/5 border-indigo-500/10',
  'Industry Trends': 'text-purple-400/60 bg-purple-500/5 border-purple-500/10',
  'Payment Integration': 'text-amber-400/60 bg-amber-500/5 border-amber-500/10',
  'White Paper': 'text-teal-400/60 bg-teal-500/5 border-teal-500/10',
};

export default function InsightsPage() {
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
          <span className="font-[family-name:var(--font-mono)] text-blue-400/60 text-xs tracking-[4px] uppercase">{'// knowledge'}</span>
          <h1 className="text-4xl lg:text-6xl mt-4 tracking-tight">
            <span className="font-extralight text-white/60">Insights & </span>
            <span className="font-bold gradient-text">Trends</span>
          </h1>
          <p className="text-white/45 mt-4 max-w-2xl text-lg font-light">
            Technical deep-dives, industry analysis, and lessons learned from enterprise implementations.
          </p>
        </motion.div>

        {/* Articles grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {articles.map((article, i) => (
            <motion.article
              key={article.title}
              initial={{ opacity: 0, y: 40, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <div className="glass rounded-2xl p-8 h-full shadow-[0_0_1px_rgba(255,255,255,0.1)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.06)] transition-all group cursor-pointer">
                {/* Category + meta */}
                <div className="flex items-center justify-between mb-5">
                  <span className={`text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-[2px] px-3 py-1.5 rounded-lg border ${categoryColors[article.category] || 'text-white/40 bg-white/5 border-white/10'}`}>
                    {article.category}
                  </span>
                  <div className="flex items-center gap-3 text-[10px] font-[family-name:var(--font-mono)] text-white/30">
                    <span className="flex items-center gap-1"><TbClock className="w-3 h-3" /> {article.readTime}</span>
                    <span>{article.date}</span>
                  </div>
                </div>

                {/* Title + excerpt */}
                <h2 className="font-semibold text-white text-lg mb-3 group-hover:text-blue-300 transition-colors leading-snug">{article.title}</h2>
                <p className="text-sm text-white/40 leading-relaxed mb-6">{article.excerpt}</p>

                {/* Topics */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {article.topics.map((topic) => (
                    <span key={topic} className="text-[10px] font-[family-name:var(--font-mono)] px-2.5 py-1 bg-white/[0.03] rounded-lg text-white/30 border border-white/5 flex items-center gap-1">
                      <TbTag className="w-2.5 h-2.5" /> {topic}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Coming soon note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="glass rounded-2xl inline-block px-8 py-5">
            <p className="text-white/40 text-sm font-[family-name:var(--font-mono)]">Full articles coming soon. Subscribe to get notified.</p>
            <div className="flex items-center gap-2 mt-4 justify-center">
              <input
                type="email"
                placeholder="your@email.com"
                className="bg-white/[0.03] border border-white/8 rounded-lg px-4 py-2 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/40 transition-colors w-56"
              />
              <button className="px-5 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-400 transition-colors">
                Notify Me
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
