import React, { useEffect, useRef } from 'react';
import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';

// Accent color: electric purple
const ACCENT = 'from-fuchsia-500/40 via-violet-500/30 to-purple-500/20';

export default function Hero() {
  const cursorRef = useRef(null);
  const trailRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const trail = trailRef.current;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;

    const onMove = (e) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    const animate = () => {
      // Smooth follow
      x += (tx - x) * 0.15;
      y += (ty - y) * 0.15;
      if (cursor) {
        cursor.style.transform = `translate3d(${x - 8}px, ${y - 8}px, 0)`;
      }
      if (trail) {
        trail.style.background = `radial-gradient(120px 120px at ${x}px ${y}px, rgba(168,85,247,0.25), rgba(0,0,0,0))`;
      }
      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove);
    const id = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(id);
    };
  }, []);

  const headline = 'Crafting Digital Impossibilities';

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black text-white">
      {/* Spline 3D scene */}
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/EF7JOSsHLk16Tlw9/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Glow gradient overlay (non-blocking) */}
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-b ${ACCENT} opacity-50 mix-blend-screen`} />

      {/* Content */}
      <div className="relative z-10 flex h-full w-full items-center justify-center">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            <h1 className="select-none text-5xl font-black tracking-tight text-white sm:text-6xl md:text-7xl">
              <span className="relative inline-block">
                <span className="glitch block" data-text={headline}>{headline}</span>
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-balance text-lg text-white/70">
              A hyper-minimal, physics-bent portfolio that blurs interface and experience.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Cursor bloom + trail */}
      <div ref={trailRef} className="pointer-events-none absolute inset-0" />
      <div
        ref={cursorRef}
        className="pointer-events-none absolute z-20 h-4 w-4 rounded-full bg-fuchsia-400/80 blur-[1px] will-change-transform"
        style={{ mixBlendMode: 'screen' }}
      />

      <style>{`
        .glitch {
          position: relative;
          text-shadow: 0 0 18px rgba(168,85,247,0.35);
          animation: glow 3s ease-in-out infinite;
        }
        .glitch::before, .glitch::after {
          content: attr(data-text);
          position: absolute;
          left: 0; top: 0;
          width: 100%;
          clip-path: inset(0 0 0 0);
          opacity: .7;
          filter: drop-shadow(0 0 6px rgba(59,130,246,0.35));
          mix-blend-mode: screen;
        }
        .glitch::before { transform: translate3d(-2px, 0, 0); color: #22d3ee; }
        .glitch::after { transform: translate3d(2px, 0, 0); color: #a78bfa; }
        @keyframes glow {
          0%,100% { text-shadow: 0 0 12px rgba(168,85,247,0.25), 0 0 32px rgba(168,85,247,0.15); }
          50% { text-shadow: 0 0 24px rgba(168,85,247,0.45), 0 0 52px rgba(168,85,247,0.25); }
        }
      `}</style>
    </section>
  );
}
