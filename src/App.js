import './App.scss';
import React, { Suspense, lazy } from 'react';
import { Canvas } from '@react-three/fiber';

import Navbar from './components/navbar/Navbar';
import SplashCursor from './components/cursor/SplashCursor';

const Hero = lazy(() => import('./components/hero/Hero'));
const Parallax = lazy(() => import('./components/parallax/Parallax'));
const ParallaxProjet = lazy(() => import('./components/parallax2/ParallaxProjet'));
const Services = lazy(() => import('./components/services/Services'));
const Services2 = lazy(() => import('./components/services/Services2'));
const Portfolio = lazy(() => import('./components/portfolio/Portfolio'));
const Contact = lazy(() => import('./components/contact/Contact'));

function App() {
  return (
    <div>
      <SplashCursor />

      <section id="Home">
        <Navbar />
        <Suspense fallback={<div>Chargement de l’accueil...</div>}>
          <Hero />
        </Suspense>
      </section>

      <section id="Services">
        <Canvas shadowMap camera={{ position: [0, 0, 5], fov: 70 }}>
          <color attach="background" args={['#0c0c1d']} />
          <Suspense fallback={null}>
            <Parallax />
          </Suspense>
          <ambientLight intensity={0.4} />
        </Canvas>
      </section>

      <Suspense fallback={<div>Chargement des services...</div>}>
        <section className="mobile-section"><Services /></section>
        <section className="mobile-section"><Services2 /></section>
      </Suspense>

      <section id="Portfolio">
        <Canvas shadowMap camera={{ position: [0, 0, 5], fov: 70 }}>
          <Suspense fallback={null}>
            <ParallaxProjet />
          </Suspense>
          <ambientLight intensity={0.4} />
        </Canvas>
      </section>
      <Suspense fallback={<div>Chargement des projets...</div>}>
        <Portfolio />
      </Suspense>
      <section id="Contact">
        <Suspense fallback={<div>Chargement du contact...</div>}>
          <Contact />
        </Suspense>
      </section>
    </div>
  );
}

export default App;
