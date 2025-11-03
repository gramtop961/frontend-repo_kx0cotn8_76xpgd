import React from 'react';
import Hero from './components/Hero';
import ParticleIntro from './components/ParticleIntro';
import Projects from './components/Projects';
import Contact from './components/Contact';

export default function App() {
  return (
    <div className="min-h-screen w-full bg-black text-white">
      {/* Hero with Spline + glitch typography + cursor trail */}
      <Hero />

      {/* Particle field intro with magnetic motion */}
      <ParticleIntro />

      {/* Projects: holographic tilt cards in 3D space */}
      <Projects />

      {/* Contact: liquid borders + glitch submit */}
      <Contact />

      <footer className="border-t border-white/10 bg-black/40 py-10 text-center text-sm text-white/50">
        © {new Date().getFullYear()} • Built like a living interface
      </footer>
    </div>
  );
}
