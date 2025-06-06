import React from 'react'
import './hero.scss'
import Profil from '../../assets/profil.png'
import {animate, mirror, motion} from "framer-motion"
import scrolldown from '../../assets/scroll.gif'

export default function Hero() {
  return (
    <div className='hero'>
        <div className='wrapper'>
            <div className='textContainer'>
                <motion.h2 initial={{x:-500,opacity:0}} whileInView={{x:0,opacity:1}} transition={{delay:.5,stagger:.1}}>Mbola Jean Ranaivoson</motion.h2>
                <motion.h1 initial={{x:-500,opacity:0}} whileInView={{x:0,opacity:1}} transition={{delay:.5,stagger:.1}}>Développeur Web Front-End</motion.h1>
                <motion.div className='buttons' initial={{x:-500,opacity:0}} whileInView={{x:0,opacity:1}} transition={{delay:.5,stagger:.1}}>
                    <a href='#Portfolio'>Voir les dernières projets</a>
                    <a href='#Contact'>Contact</a>
                </motion.div>
                <img src={scrolldown} width='25' height='40'></img>
            </div>
            <div className='imageContainer'>
                <img src={Profil}></img>
            </div>
        </div>
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
    </div>
  )
}
