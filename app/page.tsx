'use client';

import { motion, useScroll, useSpring, useTransform, useInView } from 'framer-motion';
import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import BrushV from './components/BrushV';
import {
  SiSalesforce, SiSap, SiKubernetes, SiDocker,
  SiGithub, SiDatabricks,
} from 'react-icons/si';
import { VscAzure } from 'react-icons/vsc';
import {
  TbApi, TbCloudComputing, TbMail,
  TbShieldLock, TbGitBranch, TbChartBar, TbUsers,
  TbRocket, TbBulb, TbHeadset,
  TbCheck, TbWorld,
} from 'react-icons/tb';
import { FaCogs } from 'react-icons/fa';
import type { IconType } from 'react-icons';

/* ── Particle Field — same style as vemer.in, blue/cyan palette ── */
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -1000, y: -1000, active: false });
  const scroll = useRef({ velocity: 0, lastY: 0, lastTime: 0 });
  const animFrame = useRef(0);
  const particles = useRef<Array<{
    x: number; y: number;
    vx: number; vy: number;
    radius: number;
    hue: number; alpha: number;
  }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0;

    const MOUSE_RADIUS = 350;
    const REPULSE_FORCE = 25;
    const FRICTION = 0.96;
    const MAX_SPEED = 6;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (particles.current.length === 0) init();
    };

    const init = () => {
      const count = Math.floor((w * h) / 800);
      particles.current = Array.from({ length: count }, () => {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.2 + Math.random() * 0.5;
        const sizeRoll = Math.random();
        const radius = sizeRoll < 0.85
          ? 1 + Math.random() * 2.5
          : sizeRoll < 0.95
          ? 5 + Math.random() * 12
          : 12 + Math.random() * 25;

        return {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius,
          hue: 217 + Math.random() * 20,
          alpha: radius > 10 ? 0.025 + Math.random() * 0.03
            : radius > 4 ? 0.05 + Math.random() * 0.06
            : 0.12 + Math.random() * 0.2,
        };
      });
    };

    const animate = () => {
      scroll.current.velocity *= 0.92;
      ctx.clearRect(0, 0, w, h);

      const mx = mouse.current.x;
      const my = mouse.current.y;
      const mouseActive = mouse.current.active;
      const pts = particles.current;

      // Mouse glow
      if (mouseActive) {
        const g = ctx.createRadialGradient(mx, my, 0, mx, my, MOUSE_RADIUS * 1.4);
        g.addColorStop(0, 'rgba(96, 165, 250, 0.1)');
        g.addColorStop(0.3, 'rgba(56, 189, 248, 0.04)');
        g.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      }

      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];

        // Gentle random drift
        p.vx += (Math.random() - 0.5) * 0.012;
        p.vy += (Math.random() - 0.5) * 0.012;

        // Scroll reaction — particles scatter horizontally and drift opposite to scroll
        const sv = scroll.current.velocity;
        if (Math.abs(sv) > 1) {
          // Push particles sideways (random direction) proportional to scroll speed
          const scrollForce = Math.min(Math.abs(sv) * 0.15, 8);
          const direction = (Math.random() - 0.5) * 2;
          p.vx += direction * scrollForce * 0.6;
          // Push particles opposite to scroll direction
          p.vy -= (sv > 0 ? 1 : -1) * scrollForce * 0.3;
        }

        // Mouse repulsion
        if (mouseActive) {
          const dx = p.x - mx;
          const dy = p.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MOUSE_RADIUS && dist > 0) {
            const force = ((MOUSE_RADIUS - dist) / MOUSE_RADIUS) ** 2;
            p.vx += (dx / dist) * force * REPULSE_FORCE;
            p.vy += (dy / dist) * force * REPULSE_FORCE;
          }
        }

        // Soft edges
        const margin = 60;
        if (p.x < margin) p.vx += (margin - p.x) * 0.01;
        if (p.x > w - margin) p.vx -= (p.x - (w - margin)) * 0.01;
        if (p.y < margin) p.vy += (margin - p.y) * 0.01;
        if (p.y > h - margin) p.vy -= (p.y - (h - margin)) * 0.01;

        p.vx *= FRICTION;
        p.vy *= FRICTION;

        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > MAX_SPEED) {
          p.vx = (p.vx / speed) * MAX_SPEED;
          p.vy = (p.vy / speed) * MAX_SPEED;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Wrap
        if (p.x < -p.radius) p.x = w + p.radius;
        if (p.x > w + p.radius) p.x = -p.radius;
        if (p.y < -p.radius) p.y = h + p.radius;
        if (p.y > h + p.radius) p.y = -p.radius;

        // Mouse proximity boost
        const mDist = mouseActive ? Math.sqrt((mx - p.x) ** 2 + (my - p.y) ** 2) : 9999;
        const mProx = mDist < MOUSE_RADIUS ? (1 - mDist / MOUSE_RADIUS) : 0;
        const dynamicAlpha = p.alpha + mProx * 0.5;
        const dynamicHue = p.hue + mProx * 50;

        // Draw
        if (p.radius > 10) {
          // Large orbs — soft gradient
          const g = ctx.createRadialGradient(
            p.x - p.radius * 0.25, p.y - p.radius * 0.25, 0,
            p.x, p.y, p.radius
          );
          g.addColorStop(0, `hsla(${dynamicHue}, 70%, 70%, ${dynamicAlpha * 1.5})`);
          g.addColorStop(0.5, `hsla(${dynamicHue}, 70%, 55%, ${dynamicAlpha * 0.5})`);
          g.addColorStop(1, `hsla(${dynamicHue}, 70%, 45%, 0)`);
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = g;
          ctx.fill();
        } else if (p.radius > 4) {
          // Medium rings
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.strokeStyle = `hsla(${dynamicHue}, 70%, 65%, ${dynamicAlpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        } else {
          // Small dots
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${dynamicHue}, 80%, 70%, ${dynamicAlpha})`;
          ctx.fill();
          if (mProx > 0.4) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius + 3, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${dynamicHue}, 80%, 70%, ${(mProx - 0.4) * 0.12})`;
            ctx.fill();
          }
        }
      }

      animFrame.current = requestAnimationFrame(animate);
    };

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x >= 0 && x <= w && y >= 0 && y <= h) {
        mouse.current.x = x;
        mouse.current.y = y;
        mouse.current.active = true;
      } else {
        mouse.current.active = false;
      }
    };

    const handleLeave = () => { mouse.current.active = false; };

    const handleScroll = () => {
      const now = performance.now();
      const dt = now - scroll.current.lastTime;
      if (dt > 0) {
        const currentY = window.scrollY;
        scroll.current.velocity = (currentY - scroll.current.lastY) / Math.max(dt, 1) * 16;
        scroll.current.lastY = currentY;
        scroll.current.lastTime = now;
      }
    };

    resize();
    animate();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouse);
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('mouseleave', handleLeave);

    return () => {
      cancelAnimationFrame(animFrame.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouse);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-10"
    />
  );
}

/* ── Wireframe Globe ── */
function WireframeGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const SIZE = 1000;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = SIZE * dpr;
    canvas.height = SIZE * dpr;
    canvas.style.width = `${SIZE}px`;
    canvas.style.height = `${SIZE}px`;
    ctx.scale(dpr, dpr);

    const cx = SIZE / 2;
    const cy = SIZE / 2;
    const R = 420;

    let raf: number;
    const draw = () => {
      frameRef.current++;
      const t = frameRef.current * 0.003;
      ctx.clearRect(0, 0, SIZE, SIZE);

      // Outer glow
      const glow = ctx.createRadialGradient(cx, cy, R * 0.6, cx, cy, R * 1.2);
      glow.addColorStop(0, 'rgba(59, 130, 246, 0.04)');
      glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, SIZE, SIZE);

      // Globe outline
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(96, 165, 250, 0.15)';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Inner atmosphere glow
      const atmo = ctx.createRadialGradient(cx, cy, R * 0.85, cx, cy, R);
      atmo.addColorStop(0, 'rgba(0, 0, 0, 0)');
      atmo.addColorStop(1, 'rgba(59, 130, 246, 0.03)');
      ctx.fillStyle = atmo;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fill();

      const numMeridians = 12;
      const numParallels = 7;

      // Project 3D point to 2D — proper sphere projection
      const project = (latDeg: number, lonDeg: number) => {
        const latR = (latDeg * Math.PI) / 180;
        const lonR = (lonDeg * Math.PI) / 180 + t;
        const x = Math.cos(latR) * Math.sin(lonR);
        const y = Math.sin(latR);
        const z = Math.cos(latR) * Math.cos(lonR);
        return { px: cx + x * R, py: cy - y * R, z };
      };

      // Longitude lines (meridians)
      for (let i = 0; i < numMeridians; i++) {
        const lon = (i / numMeridians) * 360;
        ctx.beginPath();
        let started = false;
        for (let lat = -90; lat <= 90; lat += 2) {
          const { px, py, z } = project(lat, lon);
          // Only draw front-facing points
          if (z < -0.05) { started = false; continue; }
          const alpha = 0.04 + z * 0.12;
          if (!started) {
            ctx.moveTo(px, py);
            started = true;
          } else {
            ctx.lineTo(px, py);
          }
          ctx.strokeStyle = `rgba(96, 165, 250, ${alpha})`;
        }
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      // Latitude lines (parallels)
      for (let j = -numParallels + 1; j < numParallels; j++) {
        const lat = (j / numParallels) * 90;
        ctx.beginPath();
        let started = false;
        for (let lon = 0; lon <= 360; lon += 2) {
          const { px, py, z } = project(lat, lon);
          if (z < -0.05) { started = false; continue; }
          if (!started) {
            ctx.moveTo(px, py);
            started = true;
          } else {
            ctx.lineTo(px, py);
          }
        }
        const isEquator = Math.abs(lat) < 2;
        ctx.strokeStyle = isEquator ? 'rgba(96, 165, 250, 0.2)' : 'rgba(96, 165, 250, 0.08)';
        ctx.lineWidth = isEquator ? 1.2 : 0.7;
        ctx.stroke();
      }

      // Glowing dots at grid intersections
      for (let i = 0; i < numMeridians; i++) {
        const lon = (i / numMeridians) * 360;
        for (let j = -numParallels + 1; j < numParallels; j++) {
          const lat = (j / numParallels) * 90;
          const { px, py, z } = project(lat, lon);
          if (z < 0) continue;
          const alpha = 0.15 + z * 0.35;
          ctx.beginPath();
          ctx.arc(px, py, 1.5 + z * 1, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(96, 165, 250, ${alpha})`;
          ctx.fill();
        }
      }

      // Wireframe continent outlines — accurate simplified coastlines [lon, lat]
      const continents: [number,number][][] = [
        // North America
        [[-168,65],[-162,64],[-153,60],[-148,61],[-138,59],[-136,56],[-130,54],[-126,49],[-124,46],[-123,40],[-118,34],[-117,32],[-110,24],[-105,20],[-97,18],[-96,20],[-92,19],[-88,22],[-85,30],[-82,28],[-81,25],[-80,27],[-78,30],[-76,35],[-74,39],[-72,41],[-70,43],[-67,45],[-64,47],[-60,47],[-56,50],[-55,52],[-60,54],[-64,58],[-68,60],[-76,62],[-84,64],[-92,68],[-100,70],[-110,72],[-120,71],[-130,70],[-140,68],[-152,64],[-160,62],[-168,65]],
        // South America
        [[-80,10],[-77,8],[-73,11],[-72,7],[-70,4],[-67,2],[-60,5],[-52,3],[-45,0],[-40,-3],[-38,-8],[-35,-10],[-37,-14],[-39,-18],[-41,-22],[-43,-23],[-45,-24],[-48,-27],[-49,-29],[-51,-33],[-53,-34],[-55,-36],[-58,-38],[-62,-39],[-65,-41],[-67,-46],[-68,-50],[-69,-52],[-72,-50],[-74,-46],[-73,-40],[-72,-35],[-71,-30],[-70,-25],[-70,-18],[-75,-15],[-76,-10],[-78,-5],[-80,0],[-80,5],[-78,8],[-80,10]],
        // Europe
        [[-10,36],[-9,38],[-9,41],[-8,43],[-2,44],[-1,46],[0,47],[-2,48],[-5,48],[-4,51],[-5,54],[-6,56],[-5,58],[-3,58],[-2,57],[0,56],[3,54],[5,52],[5,50],[4,47],[6,46],[8,44],[10,45],[12,44],[13,46],[14,48],[15,47],[17,46],[19,46],[21,45],[23,43],[25,41],[26,40],[28,41],[29,42],[28,44],[26,46],[24,48],[22,50],[20,52],[18,54],[16,55],[14,54],[13,55],[12,56],[10,58],[11,59],[12,60],[10,63],[12,65],[14,67],[16,69],[18,70],[22,71],[25,71],[28,70],[30,70],[32,68],[30,65],[28,62],[26,60],[24,58],[22,56],[20,54]],
        // UK
        [[-6,50],[-5,51],[-4,53],[-3,55],[-4,56],[-5,57],[-5,58],[-3,58],[-2,57],[0,54],[1,52],[0,51],[-1,50],[-4,50],[-6,50]],
        // Italy
        [[8,44],[10,44],[12,42],[13,41],[15,40],[16,39],[16,38],[15,38],[14,40],[12,42],[10,43],[8,44]],
        // Scandinavia
        [[5,58],[6,60],[8,62],[10,63],[12,64],[14,66],[16,68],[18,69],[20,70],[22,70],[25,71],[28,71],[30,70],[30,68],[28,66],[25,64],[22,62],[20,60],[18,59],[15,58],[12,57],[10,58],[8,58],[5,58]],
        // Africa
        [[-17,15],[-16,18],[-14,22],[-13,28],[-10,32],[-6,35],[-2,36],[3,37],[8,37],[10,34],[12,33],[15,32],[20,32],[25,32],[30,31],[32,30],[33,28],[35,25],[38,20],[42,12],[44,10],[46,8],[48,5],[50,2],[48,-2],[44,-8],[42,-12],[40,-16],[38,-20],[36,-25],[34,-28],[32,-30],[28,-32],[26,-34],[22,-34],[18,-30],[16,-28],[14,-24],[12,-18],[10,-12],[9,-6],[8,0],[6,5],[4,8],[2,6],[0,5],[-5,5],[-8,5],[-10,8],[-15,11],[-17,15]],
        // Asia (mainland)
        [[30,37],[35,37],[40,38],[44,40],[48,42],[52,44],[56,46],[60,45],[65,42],[68,40],[70,37],[72,33],[75,28],[78,22],[80,15],[82,10],[84,14],[86,18],[88,22],[90,24],[92,22],[95,18],[98,12],[100,14],[102,18],[104,22],[106,22],[108,21],[110,20],[112,22],[114,23],[116,25],[118,28],[120,32],[121,34],[122,36],[124,38],[126,38],[128,40],[130,42],[132,44],[135,46],[138,48],[140,50],[142,52],[145,55],[148,58],[152,60],[158,62],[165,64],[170,66],[175,65],[178,63],[180,62],[175,58],[170,55],[165,52],[160,50],[155,48],[150,46],[145,44],[140,42],[138,40],[135,38],[132,36],[130,34],[128,32],[126,30],[124,28],[122,24],[120,20],[118,16],[115,12],[112,8],[110,4],[108,0],[106,-3],[104,-6],[106,-6],[108,-4],[110,-2],[112,0],[114,2],[116,4],[118,6],[120,8],[118,4],[116,0],[114,-4],[112,-6],[110,-7],[108,-6],[106,-4],[104,-2],[102,2],[100,6],[98,8],[96,12],[94,16],[92,20],[90,22],[88,24],[86,24],[84,22],[82,20],[80,22],[78,26],[76,30],[74,32],[72,34],[68,36],[64,38],[60,40],[56,42],[52,44],[48,42],[44,40],[40,38],[35,37],[30,37]],
        // Japan
        [[130,31],[131,33],[132,34],[133,35],[135,36],[137,37],[139,38],[140,40],[141,42],[142,44],[143,45],[145,44],[144,42],[143,40],[141,38],[140,36],[138,34],[136,33],[134,32],[132,31],[130,31]],
        // Korean Peninsula
        [[126,34],[127,36],[128,37],[129,38],[130,38],[129,36],[128,35],[127,34],[126,34]],
        // Southeast Asia / Indonesia
        [[100,6],[102,2],[104,0],[106,-2],[106,-6],[108,-7],[110,-7],[112,-8],[114,-8],[116,-8],[118,-8],[120,-5],[118,-2],[116,0],[114,2],[112,4],[110,6],[108,6],[106,4],[104,4],[102,4],[100,6]],
        // India subcontinent
        [[68,28],[70,25],[72,22],[73,18],[75,15],[76,12],[78,9],[80,12],[82,15],[85,22],[88,22],[88,24],[85,26],[82,27],[78,30],[75,32],[72,33],[68,28]],
        // Australia
        [[114,-22],[115,-26],[116,-30],[117,-33],[118,-35],[121,-34],[125,-33],[128,-32],[131,-33],[134,-35],[136,-35],[138,-36],[140,-38],[142,-38],[145,-39],[148,-38],[150,-36],[152,-34],[153,-28],[152,-24],[149,-20],[146,-18],[145,-15],[142,-12],[140,-12],[137,-14],[135,-15],[133,-14],[130,-13],[128,-15],[126,-18],[124,-20],[121,-20],[118,-21],[116,-21],[114,-22]],
      ];

      continents.forEach(coast => {
        ctx.beginPath();
        let started = false;
        coast.forEach(([lon, lat]) => {
          const { px, py, z } = project(lat, lon);
          if (z < -0.05) { started = false; return; }
          if (!started) { ctx.moveTo(px, py); started = true; }
          else ctx.lineTo(px, py);
        });
        ctx.strokeStyle = 'rgba(96, 165, 250, 0.3)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Subtle fill for front-facing land
        ctx.beginPath();
        started = false;
        coast.forEach(([lon, lat]) => {
          const { px, py, z } = project(lat, lon);
          if (z < 0) return;
          if (!started) { ctx.moveTo(px, py); started = true; }
          else ctx.lineTo(px, py);
        });
        ctx.closePath();
        ctx.fillStyle = 'rgba(96, 165, 250, 0.04)';
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <motion.div
      className="mx-auto"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: [0.25, 0.1, 0, 1] }}
    >
      <canvas ref={canvasRef} className="max-w-none" style={{ width: 1000, height: 1000 }} />
    </motion.div>
  );
}

/* ── GlowCard with 3D tilt ── */
const GlowCard = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const x = ((e.clientY - cy) / (rect.height / 2)) * -6;
    const y = ((e.clientX - cx) / (rect.width / 2)) * 6;
    setTilt({ x, y });
  }, []);

  return (
    <div
      ref={ref}
      className={`card-glow rounded-2xl ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{
        transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(${tilt.x !== 0 ? -4 : 0}px)`,
        transition: 'transform 0.3s ease',
        transformStyle: 'preserve-3d',
      }}
    >
      {children}
    </div>
  );
};

/* ── Animated Counter ── */
function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1500;
    const startTime = Date.now();
    const step = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.round(eased * value);
      setCount(start);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ── Section Reveal — slides up with blur ── */
function SectionReveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 80, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ── Services Data ── */
const services = [
  {
    icon: SiSalesforce,
    title: 'CRM Implementation',
    desc: 'End-to-end Salesforce, Microsoft Dynamics 365, and SAP deployments across Sales, Service, Commerce, and Experience clouds.',
    tags: ['Salesforce', 'Dynamics 365', 'SAP', 'Multi-Cloud'],
    color: 'blue',
  },
  {
    icon: TbChartBar,
    title: 'Business Intelligence & Analytics',
    desc: 'Centralised BI dashboards connecting marketing, sales, and operational data. Data lake architecture with Databricks, Power BI, and custom analytics.',
    tags: ['Power BI', 'Databricks', 'Data Lake', 'Analytics'],
    color: 'cyan',
  },
  {
    icon: TbGitBranch,
    title: 'DevOps & CI/CD',
    desc: 'Salesforce DevOps with SFDX, Hardis, and Gearset. Web DevOps with Docker, Kubernetes, and automated deployment pipelines.',
    tags: ['SFDX', 'Azure DevOps', 'Docker', 'Kubernetes'],
    color: 'indigo',
  },
  {
    icon: TbWorld,
    title: 'Digital Marketing & SEO',
    desc: 'Campaign management, analytics integration, and SEO strategy. Connect Google Ads, Matomo, and social channels into unified reporting.',
    tags: ['Google Ads', 'Matomo', 'SEO', 'Campaigns'],
    color: 'amber',
  },
  {
    icon: TbUsers,
    title: 'Customer Journey Design',
    desc: 'Online-to-Offline (O2O) and Order-to-Cash (O2C) digital journeys. From first touchpoint to loyalty retention across every channel.',
    tags: ['O2O', 'O2C', 'Journey Mapping', 'Loyalty'],
    color: 'purple',
  },
  {
    icon: TbApi,
    title: 'System Integration',
    desc: 'REST/SOAP API design, ETL pipelines, payment gateway integration (Stripe, Adyen, Worldline), and cross-platform data synchronisation.',
    tags: ['REST APIs', 'ETL', 'Stripe', 'Webhooks'],
    color: 'teal',
  },
];

const colorMap: Record<string, { bg: string; icon: string; tag: string; tagBorder: string; border: string }> = {
  blue:   { bg: 'bg-blue-500/10',   icon: 'text-blue-400',   tag: 'bg-blue-500/10 text-blue-300',     tagBorder: 'border-blue-500/20',   border: 'border-blue-500/10' },
  cyan:   { bg: 'bg-cyan-500/10',   icon: 'text-cyan-400',   tag: 'bg-cyan-500/10 text-cyan-300',     tagBorder: 'border-cyan-500/20',   border: 'border-cyan-500/10' },
  indigo: { bg: 'bg-indigo-500/10', icon: 'text-indigo-400', tag: 'bg-indigo-500/10 text-indigo-300', tagBorder: 'border-indigo-500/20', border: 'border-indigo-500/10' },
  amber:  { bg: 'bg-amber-500/10',  icon: 'text-amber-400',  tag: 'bg-amber-500/10 text-amber-300',   tagBorder: 'border-amber-500/20',  border: 'border-amber-500/10' },
  purple: { bg: 'bg-purple-500/10', icon: 'text-purple-400', tag: 'bg-purple-500/10 text-purple-300', tagBorder: 'border-purple-500/20', border: 'border-purple-500/10' },
  teal:   { bg: 'bg-teal-500/10',   icon: 'text-teal-400',   tag: 'bg-teal-500/10 text-teal-300',     tagBorder: 'border-teal-500/20',   border: 'border-teal-500/10' },
};

/* ── Process Steps ── */
const processSteps = [
  { icon: TbBulb, title: 'Discovery', desc: 'We analyse your current systems, pain points, and business goals to define the right architecture.' },
  { icon: FaCogs, title: 'Architecture', desc: 'Solution design with clear technical blueprints, integration maps, and deployment strategy.' },
  { icon: TbRocket, title: 'Implementation', desc: 'Agile delivery with iterative deployments, testing, and stakeholder alignment at every sprint.' },
  { icon: TbHeadset, title: 'Support & Scale', desc: 'Post-launch optimisation, training, and ongoing support to ensure adoption and ROI.' },
];

/* ── Stats ── */
const stats = [
  { value: 10, suffix: '+', label: 'Years Experience' },
  { value: 10, suffix: '+', label: 'Markets Served' },
  { value: 20, suffix: '+', label: 'Projects Delivered' },
  { value: 5, suffix: '+', label: 'Industries' },
];

/* ── Tech Platforms ── */
const platforms = [
  { name: 'Salesforce', icon: SiSalesforce, items: ['Sales Cloud', 'Service Cloud', 'Commerce Cloud', 'Experience Cloud', 'Loyalty Cloud'] },
  { name: 'Microsoft', icon: VscAzure, items: ['Dynamics 365', 'F&O', 'Power BI', 'Power Automate', 'Customer Insights', 'Azure'] },
  { name: 'SAP', icon: SiSap, items: ['SAP HANA', 'Lead Management', 'Territory Mapping', 'BI Reports'] },
  { name: 'DevOps', icon: TbGitBranch, items: ['SFDX', 'Hardis', 'Gearset', 'GitHub', 'Azure DevOps', 'Docker', 'Kubernetes'] },
];

/* ── Industries ── */
const industries = ['Automotive', 'Manufacturing', 'Pharma', 'E-Commerce', 'Retail', 'Energy', 'Real Estate'];

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowBackToTop(window.scrollY > 600);

      // Active section detection
      const sections = ['solutions', 'process', 'platforms', 'contact'];
      let current = '';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) current = id;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="noise">
      {/* Scroll progress */}
      <motion.div className="scroll-progress fixed top-0 left-0 right-0 h-[2px] z-[60]" style={{ scaleX }} />

      {/* ── NAV ── */}
      <nav className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 ${scrolled ? 'bg-[#050505]/80 backdrop-blur-xl border-b border-white/5' : ''}`}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-2">
            <BrushV size={30} />
            <div className="flex flex-col gap-1">
              <span className="text-white font-semibold text-[16px] tracking-tight leading-none">Vemer</span>
              <span className="text-white/35 text-[8px] tracking-[3px] uppercase leading-none">Consulting</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {['Solutions', 'Process', 'Platforms', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className={`text-[11px] transition-colors font-[family-name:var(--font-mono)] uppercase tracking-[3px] ${activeSection === item.toLowerCase() ? 'text-blue-400' : 'text-white/50 hover:text-white'}`}>
                {item}
              </a>
            ))}
            <a href="#contact" className="text-[11px] font-[family-name:var(--font-mono)] uppercase tracking-[2px] px-5 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-400 transition-colors">
              Get in Touch
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-[1.5px] bg-white/60 transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-[4.5px]' : ''}`} />
            <span className={`block w-5 h-[1.5px] bg-white/60 transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-[1.5px] bg-white/60 transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-[4.5px]' : ''}`} />
          </button>
        </div>

        {/* Mobile menu dropdown */}
        <motion.div
          initial={false}
          animate={{ height: mobileMenuOpen ? 'auto' : 0, opacity: mobileMenuOpen ? 1 : 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0, 1] }}
          className="md:hidden overflow-hidden bg-[#050505]/95 backdrop-blur-xl border-b border-white/5"
        >
          <div className="px-6 py-6 flex flex-col gap-5">
            {['Solutions', 'Process', 'Platforms', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMobileMenuOpen(false)}
                className="text-[12px] text-white/60 hover:text-white transition-colors font-[family-name:var(--font-mono)] uppercase tracking-[3px]"
              >
                {item}
              </a>
            ))}
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-[12px] font-[family-name:var(--font-mono)] uppercase tracking-[2px] px-5 py-2.5 bg-blue-500 text-white rounded-full hover:bg-blue-400 transition-colors text-center mt-2">
              Get in Touch
            </a>
          </div>
        </motion.div>
      </nav>

      {/* Global particle background */}
      <ParticleField />

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505] pt-24">

        {/* Animated gradient mesh (#4) */}
        <motion.div
          className="absolute top-0 right-0 w-[700px] h-[700px] bg-gradient-to-bl from-blue-500/8 to-transparent rounded-full blur-3xl"
          animate={{ x: [0, 30, -20, 0], y: [0, -25, 15, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-cyan-500/5 to-transparent rounded-full blur-3xl"
          animate={{ x: [0, -20, 25, 0], y: [0, 20, -15, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-gradient-to-r from-indigo-500/5 to-transparent rounded-full blur-3xl"
          animate={{ x: [0, 15, -25, 0], y: [0, -20, 10, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        />

        <div className="relative z-20 max-w-5xl mx-auto px-6 text-center">

          {/* Floating badge (#2) */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.span
              className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-10"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
              <span className="text-[10px] font-[family-name:var(--font-mono)] text-white/50 tracking-[2px] uppercase">Hamburg, Germany &middot; 10+ Years</span>
            </motion.span>
          </motion.div>

          {/* Tagline — stagger delay 0.3 (#3) */}
          <motion.span
            className="inline-block font-[family-name:var(--font-mono)] text-blue-400/60 text-xs tracking-[4px] uppercase mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Enterprise Solutions
          </motion.span>

          {/* Heading — stagger delay 0.5 */}
          <motion.h1
            className="text-5xl lg:text-7xl tracking-tight leading-[1.1] mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <span className="font-extralight text-white/60">We architect </span>
            <br />
            <span className="font-bold gradient-text">CRM & Digital</span>
            <br />
            <span className="font-extralight text-white/60">systems that </span>
            <span className="font-bold accent-gradient">scale.</span>
          </motion.h1>

          {/* Subtitle — stagger delay 0.7 */}
          <motion.p
            className="text-lg text-white/50 max-w-2xl mx-auto mb-12 font-light leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            End-to-end consulting for <span className="text-white/70">Salesforce</span>, <span className="text-white/70">Microsoft Dynamics</span>, and <span className="text-white/70">SAP</span> — from architecture design to DevOps automation.
          </motion.p>

          {/* Stats — stagger delay 1.0 (#3) */}
          <div className="flex items-center justify-center gap-10 lg:gap-16 mb-14">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 + i * 0.12 }}
              >
                <div className="text-2xl lg:text-3xl font-bold text-white"><AnimatedCounter value={stat.value} suffix={stat.suffix} /></div>
                <div className="text-[10px] font-[family-name:var(--font-mono)] text-white/45 uppercase tracking-[2px] mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* CTAs — stagger delay 1.5 */}
          <motion.div
            className="flex items-center justify-center gap-4 mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.5 }}
          >
            <a href="#contact" className="px-8 py-3.5 bg-blue-500 text-white rounded-full text-sm font-medium hover:bg-blue-400 transition-colors">
              Start a Project
            </a>
            <a href="#solutions" className="px-8 py-3.5 border border-white/10 text-white/50 rounded-full text-sm font-medium hover:border-white/25 hover:text-white/80 transition-colors">
              Our Solutions
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <div className="w-5 h-8 rounded-full border-2 border-white/15 flex items-start justify-center p-1">
            <motion.div
              className="w-1 h-1.5 bg-blue-400/50 rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="border-y border-white/5 py-5 overflow-hidden bg-[#080808]">
        <div className="marquee flex items-center gap-10 whitespace-nowrap">
          {[...Array(2)].map((_, setIdx) => (
            <div key={setIdx} className="flex items-center gap-10 shrink-0">
              {['Salesforce', 'Microsoft Dynamics', 'SAP HANA', 'Power BI', 'Databricks', 'Apex', 'LWC', 'DevOps', 'Docker', 'Kubernetes', 'REST APIs', 'SFDX', 'Gearset'].map((t) => (
                <span key={`${setIdx}-${t}`} className="text-sm text-white/35 font-[family-name:var(--font-mono)] tracking-wide">{t}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── INDUSTRIES ── */}
      <section className="py-16 bg-[#050505]">
        <div className="max-w-6xl mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-10">
              <span className="font-[family-name:var(--font-mono)] text-blue-400/60 text-xs tracking-[3px] uppercase">{'// industries'}</span>
              <h2 className="text-2xl lg:text-3xl mt-3 tracking-tight">
                <span className="font-extralight text-white/60">Sectors we </span>
                <span className="font-bold gradient-text">serve</span>
              </h2>
            </div>
          </SectionReveal>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {industries.map((industry, i) => (
              <motion.span
                key={industry}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="glass rounded-full px-5 py-2.5 text-sm text-white/50 font-[family-name:var(--font-mono)] tracking-wide hover:text-white/80 hover:border-blue-500/20 transition-all cursor-default"
              >
                {industry}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOLUTIONS ── */}
      <section id="solutions" className="py-28 bg-gradient-to-b from-[#050505] to-[#080808]">
        <div className="max-w-6xl mx-auto px-6">
          <SectionReveal className="mb-20">
            <span className="font-[family-name:var(--font-mono)] text-blue-400/60 text-xs tracking-[3px] uppercase">{'// what we do'}</span>
            <h2 className="text-4xl lg:text-5xl mt-4 tracking-tight">
              <span className="font-extralight text-white/60">Our </span>
              <span className="font-bold gradient-text">Solutions</span>
            </h2>
            <p className="text-sm text-white/45 mt-4 max-w-2xl">From CRM architecture to deployment automation — we deliver enterprise-grade solutions that connect your people, processes, and platforms.</p>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" style={{ perspective: '1200px' }}>
            {services.map((service, i) => {
              const colors = colorMap[service.color];
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 60, scale: 0.9, filter: 'blur(8px)' }}
                  whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.7, delay: i * 0.12, ease: [0.25, 0.1, 0, 1] }}
                >
                  <GlowCard className={`h-full glass rounded-2xl ${colors.border} p-7 shadow-[0_0_1px_rgba(255,255,255,0.1)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.06)] transition-all`}>
                    <div className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center mb-5`}>
                      <Icon className={`w-5 h-5 ${colors.icon}`} />
                    </div>
                    <h3 className="font-semibold text-white text-[15px] mb-3">{service.title}</h3>
                    <p className="text-sm text-white/45 leading-relaxed mb-5">{service.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {service.tags.map((tag) => (
                        <span key={tag} className={`text-[10px] font-[family-name:var(--font-mono)] px-2.5 py-1 rounded-lg border ${colors.tag} ${colors.tagBorder}`}>{tag}</span>
                      ))}
                    </div>
                  </GlowCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      {/* Gradient divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

      <section id="process" className="py-28 bg-[#080808]">
        <div className="max-w-6xl mx-auto px-6">
          <SectionReveal className="mb-20">
            <span className="font-[family-name:var(--font-mono)] text-blue-400/60 text-xs tracking-[3px] uppercase">{'// how we work'}</span>
            <h2 className="text-4xl lg:text-5xl mt-4 tracking-tight">
              <span className="font-extralight text-white/60">Our </span>
              <span className="font-bold gradient-text">Process</span>
            </h2>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" style={{ perspective: '1200px' }}>
            {processSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: -40, rotateY: -15, filter: 'blur(6px)' }}
                  whileInView={{ opacity: 1, x: 0, rotateY: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.7, delay: i * 0.15, ease: [0.25, 0.1, 0, 1] }}
                >
                  <GlowCard className="h-full glass rounded-2xl p-7 shadow-[0_0_1px_rgba(255,255,255,0.1)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.06)] transition-all">
                    <div className="flex items-center gap-3 mb-5">
                      <span className="font-[family-name:var(--font-mono)] text-blue-400/30 text-2xl font-bold">0{i + 1}</span>
                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-blue-400/60" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-white mb-2">{step.title}</h3>
                    <p className="text-sm text-white/45 leading-relaxed">{step.desc}</p>
                  </GlowCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── END-TO-END CAPABILITIES ── */}
      <section className="py-28 bg-gradient-to-b from-[#080808] to-[#050505]">
        <div className="max-w-6xl mx-auto px-6">
          <SectionReveal className="mb-20">
            <span className="font-[family-name:var(--font-mono)] text-blue-400/60 text-xs tracking-[3px] uppercase">{'// expertise'}</span>
            <h2 className="text-4xl lg:text-5xl mt-4 tracking-tight">
              <span className="font-extralight text-white/60">End-to-End </span>
              <span className="font-bold gradient-text">Capabilities</span>
            </h2>
            <p className="text-sm text-white/45 mt-4 max-w-2xl">Full-cycle implementation across CRM, ERP, and commerce platforms — from first touchpoint to customer fulfilment.</p>
          </SectionReveal>

          <div className="space-y-4">
            {[
              {
                title: 'Lead Management & Nurturing',
                icon: TbUsers,
                color: 'blue',
                steps: ['Web Form / Ad Click', 'Lead Capture', 'Scoring & Routing', 'Nurture Sequence', 'MQL to SQL', 'Opportunity', 'Won'],
                desc: 'Entry points from web forms, ad campaigns, and analytics-tracked touchpoints. Automated scoring, routing, and stage-based nurturing until conversion.',
                tags: ['Salesforce', 'Dynamics 365', 'Marketing Cloud', 'Google Ads'],
              },
              {
                title: 'Order Management & Fulfilment',
                icon: TbCloudComputing,
                color: 'cyan',
                steps: ['Order Placed', 'Payment Captured', 'ERP Sync', 'Production', 'Shipping', 'Delivery', 'Invoice'],
                desc: 'Customer places order via webshop or sales team. Order syncs to ERP for processing. Stage-based notifications at every milestone — seamless from click to delivery.',
                tags: ['Commerce Cloud', 'F&O', 'SAP HANA', 'Experience Cloud'],
              },
              {
                title: 'Payment Integration',
                icon: TbShieldLock,
                color: 'amber',
                steps: ['Checkout', 'Payment Intent', 'Auth & Capture', 'Webhook', 'CRM Update', 'Invoice Sync'],
                desc: 'End-to-end payment flows with Stripe, Adyen, and Worldline. Webhook-driven status updates, subscription billing, multi-currency processing.',
                tags: ['Stripe', 'Adyen', 'Worldline', 'Webhooks'],
              },
              {
                title: 'DevOps & CI/CD Pipelines',
                icon: TbGitBranch,
                color: 'indigo',
                steps: ['Source Control', 'Branch Strategy', 'CI Pipeline', 'Build', 'Deploy', 'Monitor'],
                desc: 'Salesforce DevOps with SFDX and Hardis CLI. Web DevOps with Docker, Kubernetes, and Git-triggered deployments. Automated pipelines across all environments.',
                tags: ['SFDX', 'Hardis', 'GitHub', 'Docker', 'Kubernetes'],
              },
            ].map((item, i) => {
              const colors = colorMap[item.color];
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60, filter: 'blur(8px)' }}
                  whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: [0.25, 0.1, 0, 1] }}
                >
                  <GlowCard className={`glass rounded-2xl ${colors.border} p-7 shadow-[0_0_1px_rgba(255,255,255,0.1)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.06)] transition-all`}>
                    <div className="flex items-center gap-3 mb-5">
                      <div className={`w-8 h-8 rounded-lg ${colors.bg} flex items-center justify-center`}>
                        <Icon className={`w-4 h-4 ${colors.icon}`} />
                      </div>
                      <h3 className="font-semibold text-white text-[15px]">{item.title}</h3>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 mb-5">
                      {item.steps.map((step, si, arr) => (
                        <div key={step} className="flex items-center gap-2">
                          <span className="text-[11px] font-[family-name:var(--font-mono)] px-3 py-1.5 bg-white/[0.04] rounded-lg text-white/60 border border-white/5 whitespace-nowrap">{step}</span>
                          {si < arr.length - 1 && <span className="text-white/35 text-xs">&rarr;</span>}
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-white/45 leading-relaxed">{item.desc}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {item.tags.map((t) => (
                        <span key={t} className={`text-[10px] font-[family-name:var(--font-mono)] px-2.5 py-1 rounded-lg border ${colors.tag} ${colors.tagBorder}`}>{t}</span>
                      ))}
                    </div>
                  </GlowCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── PLATFORMS ── */}
      {/* Gradient divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

      <section id="platforms" className="py-28 bg-[#080808]">
        <div className="max-w-6xl mx-auto px-6">
          <SectionReveal className="mb-20">
            <span className="font-[family-name:var(--font-mono)] text-blue-400/60 text-xs tracking-[3px] uppercase">{'// platforms'}</span>
            <h2 className="text-4xl lg:text-5xl mt-4 tracking-tight">
              <span className="font-extralight text-white/60">Technology </span>
              <span className="font-bold gradient-text">Ecosystems</span>
            </h2>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4" style={{ perspective: '1200px' }}>
            {platforms.map((platform, i) => {
              const Icon = platform.icon;
              return (
                <motion.div
                  key={platform.name}
                  initial={{ opacity: 0, y: 50, scale: 0.92, filter: 'blur(6px)' }}
                  whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.7, delay: i * 0.12, ease: [0.25, 0.1, 0, 1] }}
                >
                  <GlowCard className="h-full glass rounded-2xl p-8 shadow-[0_0_1px_rgba(255,255,255,0.1)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.06)] transition-all">
                    <div className="flex items-center gap-3 mb-6">
                      <Icon className="w-6 h-6 text-blue-400" />
                      <span className="font-[family-name:var(--font-mono)] text-white font-semibold">{platform.name}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {platform.items.map((item) => (
                        <span key={item} className="text-sm px-3 py-1.5 bg-white/[0.04] rounded-lg text-white/35 border border-white/5 hover:border-blue-500/20 hover:text-white/60 transition-all cursor-default">
                          {item}
                        </span>
                      ))}
                    </div>
                  </GlowCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── WHY VEMER ── */}
      <section className="py-28 bg-gradient-to-b from-[#080808] to-[#050505]">
        <div className="max-w-6xl mx-auto px-6">
          <SectionReveal className="mb-20">
            <span className="font-[family-name:var(--font-mono)] text-blue-400/60 text-xs tracking-[3px] uppercase">{'// why us'}</span>
            <h2 className="text-4xl lg:text-5xl mt-4 tracking-tight">
              <span className="font-extralight text-white/60">Why </span>
              <span className="font-bold gradient-text">Vemer</span>
            </h2>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Multi-Platform Expertise', desc: 'We don\'t lock you into one ecosystem. Salesforce, Dynamics 365, SAP — we pick the right tool for your business, not the other way around.' },
              { title: 'End-to-End Delivery', desc: 'From discovery through architecture, implementation, DevOps, and post-launch support. One partner for the entire journey.' },
              { title: 'Global Reach', desc: 'Delivering across Europe, India, and North America with GDPR-compliant implementations, multi-language support, and localised configurations for every market.' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40, filter: 'blur(6px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, delay: i * 0.15, ease: [0.25, 0.1, 0, 1] }}
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1 w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                    <TbCheck className="w-3.5 h-3.5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-white/45 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="relative py-28 bg-gradient-to-b from-[#050505] to-[#030303] overflow-hidden">
        {/* Globe — centered, large, tilted like Earth (23.5°) */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[5%] pointer-events-none" style={{ transform: 'translateX(-50%) rotate(-23.5deg)' }}>
          <div className="opacity-50">
            <WireframeGlobe />
          </div>
        </div>

        <div className="relative z-20 max-w-5xl mx-auto px-6">
          <SectionReveal className="text-center mb-14">
            <span className="font-[family-name:var(--font-mono)] text-blue-400/60 text-xs tracking-[3px] uppercase">{'// let\'s talk'}</span>
            <h2 className="text-4xl lg:text-5xl mt-4 tracking-tight mb-4">
              <span className="font-extralight text-white/60">Ready to </span>
              <span className="font-bold text-white">transform?</span>
            </h2>
            <p className="text-white/45 max-w-xl mx-auto">
              Tell us about your project. We&apos;ll get back to you within 24 hours with a tailored proposal.
            </p>
          </SectionReveal>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Contact form */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <form
                action={`mailto:info@vemerconsulting.com`}
                method="POST"
                encType="text/plain"
                className="glass rounded-2xl p-8 space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-[10px] font-[family-name:var(--font-mono)] text-white/40 uppercase tracking-[2px] mb-2 block">Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full bg-white/[0.03] border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/40 transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-[family-name:var(--font-mono)] text-white/40 uppercase tracking-[2px] mb-2 block">Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full bg-white/[0.03] border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/40 transition-colors"
                      placeholder="you@company.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-[family-name:var(--font-mono)] text-white/40 uppercase tracking-[2px] mb-2 block">Company</label>
                  <input
                    type="text"
                    name="company"
                    className="w-full bg-white/[0.03] border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/40 transition-colors"
                    placeholder="Company name (optional)"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-[family-name:var(--font-mono)] text-white/40 uppercase tracking-[2px] mb-2 block">Message</label>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    className="w-full bg-white/[0.03] border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/40 transition-colors resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 bg-blue-500 text-white rounded-full text-sm font-medium hover:bg-blue-400 transition-colors flex items-center justify-center gap-2"
                >
                  <TbMail className="w-4 h-4" />
                  Send Message
                </button>
              </form>
            </motion.div>

            {/* Contact info sidebar */}
            <motion.div
              className="lg:col-span-2 flex flex-col gap-6"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <div className="glass rounded-2xl p-7">
                <div className="text-[10px] font-[family-name:var(--font-mono)] text-blue-400/60 uppercase tracking-[2px] mb-4">Email</div>
                <a href="mailto:info@vemerconsulting.com" className="text-white/70 hover:text-white transition-colors text-sm">info@vemerconsulting.com</a>
              </div>

              <div className="glass rounded-2xl p-7">
                <div className="text-[10px] font-[family-name:var(--font-mono)] text-blue-400/60 uppercase tracking-[2px] mb-4">Phone</div>
                <div className="space-y-3">
                  <div>
                    <div className="text-[10px] font-[family-name:var(--font-mono)] text-white/30 uppercase tracking-[1px] mb-1">India</div>
                    <a href="tel:+919959300355" className="text-sm text-white/60 hover:text-white transition-colors">(+91) 9959 300 355</a>
                  </div>
                  <div>
                    <div className="text-[10px] font-[family-name:var(--font-mono)] text-white/30 uppercase tracking-[1px] mb-1">Germany</div>
                    <a href="tel:+4917863196117" className="text-sm text-white/60 hover:text-white transition-colors">(+49) 178 631 9617</a>
                  </div>
                </div>
              </div>

              <div className="glass rounded-2xl p-7">
                <div className="text-[10px] font-[family-name:var(--font-mono)] text-blue-400/60 uppercase tracking-[2px] mb-4">Location</div>
                <div className="flex items-center gap-2">
                  <TbWorld className="w-4 h-4 text-blue-400/40" />
                  <span className="text-sm text-white/60">Hamburg, Germany</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#030303] border-t border-white/5 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
            {/* Logo */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <BrushV size={26} />
                <div className="flex flex-col gap-1">
                  <span className="text-white font-semibold text-[14px] tracking-tight leading-none">Vemer</span>
                  <span className="text-white/30 text-[7px] tracking-[3px] uppercase leading-none">Consulting</span>
                </div>
              </div>
              <p className="text-[12px] text-white/30 leading-relaxed">Enterprise consulting for CRM, BI & Digital Transformation.</p>
            </div>

            {/* Solutions */}
            <div>
              <div className="text-[10px] font-[family-name:var(--font-mono)] text-white/50 uppercase tracking-[2px] mb-4">Solutions</div>
              <div className="space-y-2.5">
                {['CRM Implementation', 'Business Intelligence', 'DevOps & CI/CD', 'System Integration'].map((item) => (
                  <a key={item} href="#solutions" className="block text-[12px] text-white/30 hover:text-white/60 transition-colors">{item}</a>
                ))}
              </div>
            </div>

            {/* Resources */}
            <div>
              <div className="text-[10px] font-[family-name:var(--font-mono)] text-white/50 uppercase tracking-[2px] mb-4">Resources</div>
              <div className="space-y-2.5">
                <Link href="/projects" className="block text-[12px] text-white/30 hover:text-white/60 transition-colors">Projects</Link>
                <Link href="/use-cases" className="block text-[12px] text-white/30 hover:text-white/60 transition-colors">Use Cases</Link>
                <Link href="/insights" className="block text-[12px] text-white/30 hover:text-white/60 transition-colors">Insights</Link>
                <Link href="/about" className="block text-[12px] text-white/30 hover:text-white/60 transition-colors">About</Link>
              </div>
            </div>

            {/* Contact */}
            <div>
              <div className="text-[10px] font-[family-name:var(--font-mono)] text-white/50 uppercase tracking-[2px] mb-4">Contact</div>
              <div className="space-y-2.5">
                <a href="mailto:info@vemerconsulting.com" className="block text-[12px] text-white/30 hover:text-white/60 transition-colors">info@vemerconsulting.com</a>
                <a href="tel:+4917863196117" className="block text-[12px] text-white/30 hover:text-white/60 transition-colors">(+49) 178 631 9617</a>
                <a href="tel:+919959300355" className="block text-[12px] text-white/30 hover:text-white/60 transition-colors">(+91) 9959 300 355</a>
                <span className="block text-[12px] text-white/20">Hamburg, Germany</span>
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 pt-6 flex items-center justify-between">
            <span className="text-[11px] text-white/20 font-[family-name:var(--font-mono)]">vemerconsulting.com</span>
            <span className="text-[11px] text-white/20">&copy; {new Date().getFullYear()} Vemer Consulting</span>
          </div>
        </div>
      </footer>

      {/* ── BACK TO TOP ── */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: showBackToTop ? 1 : 0, scale: showBackToTop ? 1 : 0.8 }}
        transition={{ duration: 0.2 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 z-50 w-11 h-11 glass rounded-full flex items-center justify-center hover:border-blue-500/30 transition-all group"
        style={{ pointerEvents: showBackToTop ? 'auto' : 'none' }}
        aria-label="Back to top"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-white/40 group-hover:text-white/80 transition-colors">
          <path d="M8 12V4M8 4L4 8M8 4L12 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.button>
    </div>
  );
}
