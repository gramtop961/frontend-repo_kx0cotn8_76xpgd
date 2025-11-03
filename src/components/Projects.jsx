import React, { useState } from 'react';
import { motion } from 'framer-motion';

const projects = [
  {
    title: 'Neural Horizon',
    subtitle: 'WebGL + Physics UI',
    href: '#',
    gradient: 'from-fuchsia-500 via-purple-500 to-indigo-500',
  },
  {
    title: 'Echo Grid',
    subtitle: 'Audio-reactive Visuals',
    href: '#',
    gradient: 'from-cyan-500 via-sky-500 to-blue-500',
  },
  {
    title: 'Ghost Forms',
    subtitle: 'Liquid Inputs',
    href: '#',
    gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
  },
];

function TiltCard({ title, subtitle, href, gradient }) {
  const [style, setStyle] = useState({ transform: 'rotateX(0deg) rotateY(0deg)' });
  const [shine, setShine] = useState({ background: 'transparent' });

  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0-1
    const py = (e.clientY - rect.top) / rect.height; // 0-1
    const rx = (py - 0.5) * -12;
    const ry = (px - 0.5) * 14;
    setStyle({ transform: `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)` });

    const gx = px * 100;
    const gy = py * 100;
    setShine({
      background: `radial-gradient(240px 160px at ${gx}% ${gy}%, rgba(255,255,255,0.35), rgba(255,255,255,0))`,
    });
  };

  const onLeave = () => {
    setStyle({ transform: 'rotateX(0deg) rotateY(0deg)' });
    setShine({ background: 'transparent' });
  };

  return (
    <a
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="group relative block h-72 w-[22rem] origin-center [perspective:900px]"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <motion.div
        className={`relative h-full w-full rounded-2xl bg-gradient-to-br ${gradient} p-[2px] shadow-[0_20px_60px_rgba(0,0,0,0.35)]`}
        whileHover={{ scale: 1.03 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        style={style}
      >
        <div className="relative h-full w-full overflow-hidden rounded-2xl bg-black">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.06),rgba(0,0,0,0))]" />
          <div className="absolute inset-0 opacity-70 mix-blend-color-dodge" style={shine} />
          <div className="absolute -left-24 -top-24 h-56 w-56 animate-pulse rounded-full bg-white/10 blur-3xl" />

          <div className="relative z-10 flex h-full flex-col justify-end p-6">
            <h3 className="text-2xl font-semibold text-white">{title}</h3>
            <p className="mt-1 text-sm text-white/70">{subtitle}</p>
          </div>
        </div>
      </motion.div>
    </a>
  );
}

export default function Projects() {
  return (
    <section className="relative w-full bg-black py-24 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-semibold sm:text-4xl">Projects as Portals</h2>
            <p className="mt-2 max-w-xl text-white/70">Hover to tilt and reveal a holographic shine. Click to enter.</p>
          </div>
          <div className="hidden text-white/60 sm:block">Scroll →</div>
        </div>

        <div className="flex w-full gap-8 overflow-x-auto pb-4 [scroll-snap-type:x_mandatory]">
          {projects.map((p) => (
            <div key={p.title} className="[scroll-snap-align:start]">
              <TiltCard {...p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
