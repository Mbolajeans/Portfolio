import './App.scss';
import React, { Suspense } from 'react'
import Hero from './components/hero/Hero';
import Navbar from './components/navbar/Navbar';
import { Canvas } from '@react-three/fiber';
import Parallax from './components/parallax/Parallax';
import ParallaxProjet from './components/parallax2/ParallaxProjet';
import Services from './components/services/Services';
import Services2 from './components/services/Services2';
import Portfolio from './components/portfolio/Portfolio';
import Contact from './components/contact/Contact';
import SplashCursor from './components/cursor/SplashCursor';


function App() {
  return <div>
    <SplashCursor />
   <section id='Home'>
    <Navbar></Navbar>
    <Hero></Hero>
   </section>
   <section id='Services'>
    <Canvas shadowMap camera={{ position: [0, 0, 5], fov: 70 }}>
      <color attach="background" args={['#0c0c1d']} />
        <Suspense fallback={null}><Parallax></Parallax></Suspense>
      <ambientLight intensity={0.4} />
    </Canvas>
  </section>
   <section className="mobile-section"><Services></Services></section>
   <section className="mobile-section"><Services2></Services2></section>
   <section id='Portfolio'>
    <Canvas shadowMap camera={{ position: [0, 0, 5], fov: 70 }}>
        <Suspense fallback={null}>
          <ParallaxProjet></ParallaxProjet>
        </Suspense>
      <ambientLight intensity={0.4} />
    </Canvas>
    </section>
   <Portfolio></Portfolio>
   <section id='Contact'>
    <Contact></Contact>
   </section>
  </div>;
}

export default App;
