import React, { useEffect, useState, Suspense } from 'react';
import './hero.scss';
import Profil from '../../assets/profil.webp';
import cv from '../../assets/CV-MBOLA-JEAN-RANAIVOSON.pdf';
import download from '../../assets/download.svg';
import { motion } from 'framer-motion';
const ScrollIndicator = React.lazy(() => import('./ScrollIndicator'));

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    setIsMobile(mediaQuery.matches);
    const handleResize = () => setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleResize);
    return () => mediaQuery.removeEventListener('change', handleResize);
  }, []);

  return (
    <div className='hero'>
      <div className='wrapper'>
        <div className='textContainer'>
          {isMobile ? (
            <>
              <h2>Mbola Jean Ranaivoson</h2>
              <h1>Développeur Web Front-End</h1>
              <div className='buttons'>
                <a href='#Portfolio'>Voir les dernières projets</a>
                <a href={cv} download>
                  Curriculum vitae
                  <img src={download} alt="Télécharger" width="16" height="16" />
                </a>
                <a href='#Contact'>Contact</a>
              </div>
            </>
          ) : (
            <>
              <AnimatedText />
              <AnimatedButtons cv={cv} download={download} />
            </>
          )}

          {!isMobile && (
            <Suspense fallback={null}>
              <ScrollIndicator />
            </Suspense>
          )}
        </div>

        <div className='imageContainer'>
          <img
            src={Profil}
            alt="Mbola Jean"
            width="300"
            height="300"
            loading="lazy"
            style={{ borderRadius: '50%' }}
          />
        </div>
      </div>

      {!isMobile && (
        <motion.div
          className="slidingText"
          initial={{ x: 0 }}
          animate={{ x: "-220%" }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: "linear",
          }}
        >
          React JS - Wordpress - Woocommerce - Bootstrap - Framer Motion - SASS - CSS - HTML - Javascript - jQuery - Tailwind
        </motion.div>
      )}
    </div>
  );
}

function AnimatedText() {
  return (
    <>
      <motion.h2
        initial={{ x: -500, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Mbola Jean Ranaivoson
      </motion.h2>
      <motion.h1
        initial={{ x: -500, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Développeur Web Front-End
      </motion.h1>
    </>
  );
}

function AnimatedButtons({ cv, download }) {
  return (
    <motion.div
      className='buttons'
      initial={{ x: -500, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <a href='#Portfolio'>Voir les dernières projets</a>
      <a href={cv} download>
        Curriculum vitae
        <img src={download} alt="Télécharger" width="16" height="16" />
      </a>
      <a href='#Contact'>Contact</a>
    </motion.div>
  );
}
