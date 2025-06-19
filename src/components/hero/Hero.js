import React, { useEffect, useState } from 'react';
import './hero.scss';
import Profil from '../../assets/profil.webp';
import { motion } from "framer-motion";
import cv from '../../assets/CV-MBOLA-JEAN-RANAIVOSON.pdf';
import download from '../../assets/download.svg';

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  return (
    <div className='hero'>
      <div className='wrapper'>
        <div className='textContainer'>
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

          {!isMobile && (
            <svg
                width="25px"
                viewBox="0 0 247 390"
                style={{
                    fillRule: "evenodd",
                    clipRule: "evenodd",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeMiterlimit: 1.5
                }}
                >
                <path
                    id="wheel"
                    d="M123.359,79.775l0,72.843"
                    style={{ fill: "none", stroke: "#fff", strokeWidth: "20px" }}
                />
                <path
                    id="mouse"
                    d="M236.717,123.359c0,-62.565 -50.794,-113.359 -113.358,-113.359c-62.565,0 -113.359,50.794 -113.359,113.359l0,143.237c0,62.565 50.794,113.359 113.359,113.359c62.564,0 113.358,-50.794 113.358,-113.359l0,-143.237Z"
                    style={{ fill: "none", stroke: "#fff", strokeWidth: "20px" }}
                />
            </svg>
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
