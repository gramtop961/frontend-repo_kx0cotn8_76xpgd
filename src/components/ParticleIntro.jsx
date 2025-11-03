import React, { useEffect, useRef } from 'react';

export default function ParticleIntro() {
  const canvasRef = useRef(null);
  const requestRef = useRef(0);
  const mouse = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * DPR;
    canvas.height = height * DPR;
    ctx.scale(DPR, DPR);

    const COUNT = Math.min(300, Math.floor((width * height) / 8000));
    const particles = new Array(COUNT).fill(0).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      r: Math.random() * 1.6 + 0.6,
    }));

    const onResize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * DPR;
      canvas.height = height * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.current.x = -9999;
      mouse.current.y = -9999;
    };

    const tick = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'lighter';
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        // Magnetic attraction/repulsion
        const dx = mouse.current.x - p.x;
        const dy = mouse.current.y - p.y;
        const d2 = Math.max(dx * dx + dy * dy, 0.001);
        const force = Math.min(60 / d2, 0.05);
        const direction = 1; // 1: attract, -1: repel
        p.vx += direction * force * dx;
        p.vy += direction * force * dy;

        // Dampening
        p.vx *= 0.96;
        p.vy *= 0.96;

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around
        if (p.x < -10) p.x = width + 10;
        if (p.y < -10) p.y = height + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y > height + 10) p.y = -10;

        // Draw
        const r = p.r;
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 8);
        grd.addColorStop(0, 'rgba(168,85,247,0.7)');
        grd.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 2, 0, Math.PI * 2);
        ctx.fill();
      }
      requestRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener('resize', onResize);
    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseleave', onLeave);
    tick();

    return () => {
      cancelAnimationFrame(requestRef.current);
      window.removeEventListener('resize', onResize);
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <section className="relative h-[80vh] w-full overflow-hidden bg-black">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="relative z-10 mx-auto flex h-full max-w-4xl items-center px-6">
        <div>
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">
            Particles that feel alive
          </h2>
          <p className="mt-3 max-w-xl text-white/70">
            Move your cursor. The field responds like a digital organism — subtle, curious, and a little bit weird.
          </p>
        </div>
      </div>
    </section>
  );
}
