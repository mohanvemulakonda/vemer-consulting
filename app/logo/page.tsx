'use client';

export default function LogoConcepts() {
  return (
    <div className="min-h-screen bg-[#0a1628] text-white p-12">
      <h1 className="text-3xl font-bold mb-2">Logo — HTML Tag Concept</h1>
      <p className="text-white/30 mb-20 text-sm">The name IS the logo. Styled as code.</p>

      <div className="space-y-24">

        {/* ── 1: Clean Mono ── */}
        <div>
          <h2 className="text-sm font-semibold text-blue-400 font-mono mb-8">01 — Clean Mono</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Large */}
            <div className="flex items-center justify-center bg-white/[0.02] border border-white/5 rounded-2xl p-16">
              <div className="font-mono text-4xl tracking-tight">
                <span className="text-blue-400">&lt;</span>
                <span className="text-white font-semibold">Vemer</span>
                <span className="text-blue-400/40"> /</span>
                <span className="text-blue-400">&gt;</span>
              </div>
            </div>
            {/* With subtitle */}
            <div className="flex items-center justify-center bg-white/[0.02] border border-white/5 rounded-2xl p-16">
              <div className="text-center">
                <div className="font-mono text-3xl tracking-tight">
                  <span className="text-blue-400">&lt;</span>
                  <span className="text-white font-semibold">Vemer</span>
                  <span className="text-blue-400/40"> /</span>
                  <span className="text-blue-400">&gt;</span>
                </div>
                <div className="text-[11px] text-white/20 tracking-[6px] uppercase mt-2 font-mono">Consulting</div>
              </div>
            </div>
          </div>
          {/* Dark / Light */}
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="flex items-center justify-center bg-[#060e1a] rounded-xl p-6">
              <span className="font-mono text-lg"><span className="text-blue-400">&lt;</span><span className="text-white font-semibold">Vemer</span><span className="text-blue-400/40"> /</span><span className="text-blue-400">&gt;</span></span>
            </div>
            <div className="flex items-center justify-center bg-white rounded-xl p-6">
              <span className="font-mono text-lg"><span className="text-blue-600">&lt;</span><span className="text-gray-900 font-semibold">Vemer</span><span className="text-blue-600/40"> /</span><span className="text-blue-600">&gt;</span></span>
            </div>
            <div className="flex items-center justify-center bg-[#1e293b] rounded-xl p-6">
              <span className="font-mono text-lg"><span className="text-cyan-400">&lt;</span><span className="text-white font-semibold">Vemer</span><span className="text-cyan-400/40"> /</span><span className="text-cyan-400">&gt;</span></span>
            </div>
          </div>
        </div>

        {/* ── 2: Gradient Brackets ── */}
        <div>
          <h2 className="text-sm font-semibold text-blue-400 font-mono mb-8">02 — Gradient Brackets</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="flex items-center justify-center bg-white/[0.02] border border-white/5 rounded-2xl p-16">
              <div className="font-mono text-4xl tracking-tight">
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">&lt;</span>
                <span className="text-white font-bold">Vemer</span>
                <span className="bg-gradient-to-r from-cyan-400/40 to-blue-400/40 bg-clip-text text-transparent"> /</span>
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">&gt;</span>
              </div>
            </div>
            <div className="flex items-center justify-center bg-white/[0.02] border border-white/5 rounded-2xl p-16">
              <div className="text-center">
                <div className="font-mono text-3xl tracking-tight">
                  <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">&lt;</span>
                  <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent font-bold">Vemer</span>
                  <span className="bg-gradient-to-r from-cyan-400/40 to-blue-400/40 bg-clip-text text-transparent"> /</span>
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">&gt;</span>
                </div>
                <div className="text-[11px] text-white/20 tracking-[6px] uppercase mt-2 font-mono">Consulting</div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="flex items-center justify-center bg-[#060e1a] rounded-xl p-6">
              <span className="font-mono text-lg"><span className="text-blue-400">&lt;</span><span className="text-white font-bold">Vemer</span><span className="text-cyan-400/40"> /</span><span className="text-cyan-400">&gt;</span></span>
            </div>
            <div className="flex items-center justify-center bg-white rounded-xl p-6">
              <span className="font-mono text-lg"><span className="text-blue-600">&lt;</span><span className="text-gray-900 font-bold">Vemer</span><span className="text-cyan-600/40"> /</span><span className="text-cyan-600">&gt;</span></span>
            </div>
            <div className="flex items-center justify-center bg-[#1e293b] rounded-xl p-6">
              <span className="font-mono text-lg"><span className="text-emerald-400">&lt;</span><span className="text-white font-bold">Vemer</span><span className="text-emerald-400/40"> /</span><span className="text-emerald-400">&gt;</span></span>
            </div>
          </div>
        </div>

        {/* ── 3: Component Style with Props ── */}
        <div>
          <h2 className="text-sm font-semibold text-blue-400 font-mono mb-8">03 — Component with Prop</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="flex items-center justify-center bg-white/[0.02] border border-white/5 rounded-2xl p-16">
              <div className="font-mono text-3xl tracking-tight">
                <span className="text-blue-400">&lt;</span>
                <span className="text-white font-bold">Vemer</span>
                <span className="text-purple-400/70"> consulting</span>
                <span className="text-blue-400/40"> /</span>
                <span className="text-blue-400">&gt;</span>
              </div>
            </div>
            <div className="flex items-center justify-center bg-white/[0.02] border border-white/5 rounded-2xl p-16">
              <div className="font-mono text-3xl tracking-tight">
                <span className="text-blue-400">&lt;</span>
                <span className="text-white font-bold">Vemer</span>
                <span className="text-purple-400/60"> type</span>
                <span className="text-white/30">=</span>
                <span className="text-amber-300/70">&quot;consulting&quot;</span>
                <span className="text-blue-400/40"> /</span>
                <span className="text-blue-400">&gt;</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="flex items-center justify-center bg-[#060e1a] rounded-xl p-6">
              <span className="font-mono text-sm"><span className="text-blue-400">&lt;</span><span className="text-white font-bold">Vemer</span><span className="text-purple-400/70"> consulting</span><span className="text-blue-400/40"> /</span><span className="text-blue-400">&gt;</span></span>
            </div>
            <div className="flex items-center justify-center bg-white rounded-xl p-6">
              <span className="font-mono text-sm"><span className="text-blue-600">&lt;</span><span className="text-gray-900 font-bold">Vemer</span><span className="text-purple-600/70"> consulting</span><span className="text-blue-600/40"> /</span><span className="text-blue-600">&gt;</span></span>
            </div>
            <div className="flex items-center justify-center bg-[#1e293b] rounded-xl p-6">
              <span className="font-mono text-sm"><span className="text-cyan-400">&lt;</span><span className="text-white font-bold">Vemer</span><span className="text-pink-400/70"> consulting</span><span className="text-cyan-400/40"> /</span><span className="text-cyan-400">&gt;</span></span>
            </div>
          </div>
        </div>

        {/* ── 4: Minimal — just the tag icon + wordmark ── */}
        <div>
          <h2 className="text-sm font-semibold text-blue-400 font-mono mb-8">04 — Icon + Wordmark</h2>
          <p className="text-xs text-white/30 mb-6">The brackets become the icon mark. Standalone &lt;V/&gt; as favicon, full name for lockup.</p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Icon only */}
            <div className="flex items-center justify-center bg-white/[0.02] border border-white/5 rounded-2xl p-16">
              <div className="font-mono text-5xl tracking-tight font-bold">
                <span className="text-blue-400">&lt;</span>
                <span className="text-white">V</span>
                <span className="text-blue-400/40">/</span>
                <span className="text-blue-400">&gt;</span>
              </div>
            </div>
            {/* Lockup horizontal */}
            <div className="flex items-center justify-center bg-white/[0.02] border border-white/5 rounded-2xl p-16">
              <div className="flex items-center gap-4">
                <span className="font-mono text-2xl font-bold"><span className="text-blue-400">&lt;</span><span className="text-white">V</span><span className="text-blue-400/40">/</span><span className="text-blue-400">&gt;</span></span>
                <div className="w-px h-8 bg-white/10"></div>
                <div>
                  <div className="text-lg font-semibold tracking-tight">Vemer</div>
                  <div className="text-[10px] text-white/25 tracking-[4px] uppercase">Consulting</div>
                </div>
              </div>
            </div>
            {/* Lockup stacked */}
            <div className="flex items-center justify-center bg-white/[0.02] border border-white/5 rounded-2xl p-16">
              <div className="text-center">
                <div className="font-mono text-4xl font-bold mb-2">
                  <span className="text-blue-400">&lt;</span>
                  <span className="text-white">V</span>
                  <span className="text-blue-400/40">/</span>
                  <span className="text-blue-400">&gt;</span>
                </div>
                <div className="text-sm font-semibold tracking-[3px] uppercase text-white/60">Vemer</div>
                <div className="text-[9px] text-white/20 tracking-[5px] uppercase">Consulting</div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4 mt-4">
            <div className="flex items-center justify-center bg-[#060e1a] rounded-xl p-6">
              <span className="font-mono text-xl font-bold"><span className="text-blue-400">&lt;</span><span className="text-white">V</span><span className="text-blue-400/40">/</span><span className="text-blue-400">&gt;</span></span>
            </div>
            <div className="flex items-center justify-center bg-white rounded-xl p-6">
              <span className="font-mono text-xl font-bold"><span className="text-blue-600">&lt;</span><span className="text-gray-900">V</span><span className="text-blue-600/40">/</span><span className="text-blue-600">&gt;</span></span>
            </div>
            <div className="flex items-center justify-center bg-[#1e293b] rounded-xl p-6">
              <span className="font-mono text-xl font-bold"><span className="text-cyan-400">&lt;</span><span className="text-white">V</span><span className="text-cyan-400/40">/</span><span className="text-cyan-400">&gt;</span></span>
            </div>
            <div className="flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-6">
              <span className="font-mono text-xl font-bold"><span className="text-white/80">&lt;</span><span className="text-white">V</span><span className="text-white/40">/</span><span className="text-white/80">&gt;</span></span>
            </div>
          </div>
        </div>

        {/* ── 5: Opening + Closing tag wrapping "consulting" ── */}
        <div>
          <h2 className="text-sm font-semibold text-blue-400 font-mono mb-8">05 — Wrapping Tag</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="flex items-center justify-center bg-white/[0.02] border border-white/5 rounded-2xl p-16">
              <div className="font-mono text-2xl tracking-tight">
                <span className="text-blue-400">&lt;</span>
                <span className="text-white font-bold">Vemer</span>
                <span className="text-blue-400">&gt;</span>
                <span className="text-white/40 font-light mx-1">consulting</span>
                <span className="text-blue-400">&lt;/</span>
                <span className="text-white font-bold">Vemer</span>
                <span className="text-blue-400">&gt;</span>
              </div>
            </div>
            <div className="flex items-center justify-center bg-white/[0.02] border border-white/5 rounded-2xl p-16">
              <div className="text-center">
                <div className="font-mono text-2xl tracking-tight">
                  <span className="text-blue-400">&lt;</span>
                  <span className="text-white font-bold">Vemer</span>
                  <span className="text-blue-400">&gt;</span>
                </div>
                <div className="text-white/30 font-mono text-sm my-1 pl-6 text-left">consulting</div>
                <div className="font-mono text-2xl tracking-tight">
                  <span className="text-blue-400">&lt;/</span>
                  <span className="text-white font-bold">Vemer</span>
                  <span className="text-blue-400">&gt;</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Favicon row */}
      <div className="mt-20 border-t border-white/5 pt-10 mb-12">
        <h2 className="text-sm font-semibold mb-6 text-white/40">Favicon (16 / 32)</h2>
        <div className="flex items-center gap-12">
          <div className="text-center space-y-2">
            <p className="text-[10px] text-white/20 font-mono">&lt;V/&gt;</p>
            <div className="flex items-center gap-3">
              <div className="bg-[#060e1a] border border-white/10 rounded p-1"><span className="font-mono text-[10px] font-bold"><span className="text-blue-400">&lt;</span><span className="text-white">V</span><span className="text-blue-400">&gt;</span></span></div>
              <div className="bg-blue-600 rounded p-1.5"><span className="font-mono text-[11px] font-bold text-white">&lt;V/&gt;</span></div>
              <div className="bg-[#060e1a] border border-white/10 rounded p-1.5"><span className="font-mono text-[14px] font-bold"><span className="text-blue-400">&lt;</span><span className="text-white">V</span><span className="text-blue-400/40">/</span><span className="text-blue-400">&gt;</span></span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
