import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Contact() {
  const [sent, setSent] = useState(false);
  const glitchRef = useRef(null);

  const onSubmit = (e) => {
    e.preventDefault();
    // Trigger page glitch flash
    const el = glitchRef.current;
    if (el) {
      el.classList.remove('opacity-0');
      el.classList.add('opacity-100');
      setTimeout(() => el.classList.replace('opacity-100', 'opacity-0'), 150);
    }
    setTimeout(() => setSent(true), 350);
  };

  return (
    <section className="relative w-full bg-black py-24 text-white">
      <div ref={glitchRef} className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-150" style={{ backgroundImage: 'repeating-linear-gradient(0deg, rgba(167,139,250,0.15) 0px, rgba(167,139,250,0.15) 1px, transparent 1px, transparent 2px)' }} />
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="text-3xl font-semibold sm:text-4xl">Say hello</h2>
        <p className="mt-2 max-w-xl text-white/70">Minimal form. Liquid borders. A little glitch on send.</p>

        <AnimatePresence mode="wait">
          {!sent ? (
            <motion.form
              key="form"
              onSubmit={onSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 space-y-6"
            >
              <div className="group relative">
                <input
                  type="text"
                  required
                  placeholder="Your name"
                  className="peer w-full rounded-xl bg-transparent px-4 py-3 text-white outline-none ring-1 ring-white/10 transition focus:ring-fuchsia-500/60"
                />
                <div className="pointer-events-none absolute -inset-[1px] rounded-xl bg-gradient-to-r from-fuchsia-500/30 via-violet-500/30 to-purple-500/30 opacity-0 blur transition duration-300 group-focus-within:opacity-100" />
              </div>
              <div className="group relative">
                <input
                  type="email"
                  required
                  placeholder="Email"
                  className="peer w-full rounded-xl bg-transparent px-4 py-3 text-white outline-none ring-1 ring-white/10 transition focus:ring-fuchsia-500/60"
                />
                <div className="pointer-events-none absolute -inset-[1px] rounded-xl bg-gradient-to-r from-fuchsia-500/30 via-violet-500/30 to-purple-500/30 opacity-0 blur transition duration-300 group-focus-within:opacity-100" />
              </div>
              <div className="group relative">
                <textarea
                  rows="5"
                  placeholder="Message"
                  className="peer w-full resize-none rounded-xl bg-transparent px-4 py-3 text-white outline-none ring-1 ring-white/10 transition focus:ring-fuchsia-500/60"
                />
                <div className="pointer-events-none absolute -inset-[1px] rounded-xl bg-gradient-to-r from-fuchsia-500/30 via-violet-500/30 to-purple-500/30 opacity-0 blur transition duration-300 group-focus-within:opacity-100" />
              </div>
              <button
                type="submit"
                className="relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-white/10 px-6 py-3 font-medium text-white backdrop-blur transition hover:bg-white/20"
              >
                <span className="relative z-10">Send & Glitch</span>
                <span className="pointer-events-none absolute inset-0 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-xl transition-all duration-500 group-hover:translate-x-[120%]" />
              </button>
            </motion.form>
          ) : (
            <motion.div
              key="sent"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-8"
            >
              <p className="text-lg">Success. Transmission received.</p>
              <p className="mt-2 text-white/70">Check your console for easter eggs.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
