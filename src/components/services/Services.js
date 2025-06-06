import './services.scss'
import {motion} from 'framer-motion'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function Services() {
  return (
    <motion.div className='services'>
        <motion.div className='TextContainer' initial={{opacity:0, x:100 }} 
        whileInView={{opacity:1, x:0}} 
        transition={{duration:1}}>
            <p>Développer des solutions web fiables, évolutives et optimisées <br/>pour vous aider à atteindre vos ambitions digitales.</p>
            <hr></hr>
        </motion.div>
        <div className='wrapper'>
            <motion.div className='TitleContainer' initial={{opacity:0, x:-500 }} 
        whileInView={{opacity:1, x:0}} 
        transition={{duration:1}}>
                <div className='titre'>
                    <DotLottieReact
                    src="https://lottie.host/f2970d1a-2f4e-4156-9b81-8e776fa0271c/5q0U4WjjPD.lottie"
                    loop
                    autoplay
                    style={{ width: 550, height: 300 }}
                    />
                    <h1>Mes services en <b>développement web</b></h1>
                </div>
            </motion.div>
            <motion.div className='ListContainer' initial={{opacity:0, x:-500 }} 
        whileInView={{opacity:1, x:0}} 
        transition={{duration:1}}>
                <motion.div className='box' initial={{background:"transparent",color:"#fff"}} whileHover={{background:"lightgray",color:"#000"}} transition={{duration: .5}}>
                    <h2>Développement de sites web sur mesure</h2>
                    <ul>
                        <li>Création de sites vitrines et institutionnels</li>
                        <li>Développement de landing pages optimisées pour la conversion</li>
                    </ul>
                    <button>Contact</button>
                </motion.div>
                <motion.div className='box' initial={{background:"transparent",color:"#fff"}} whileHover={{background:"lightgray",color:"#000"}} transition={{duration: .5}}>
                    <h2>Création de sites e-commerce</h2>
                    <ul>
                        <li>Mise en place de boutiques en ligne avec WooCommerce</li>
                        <li>Intégration de systèmes de paiement et de livraison</li>
                        <li>Optimisation UX/UI des parcours d’achat</li>
                    </ul>
                    <button>Contact</button>
                </motion.div>
                <motion.div className='box' initial={{background:"transparent",color:"#fff"}} whileHover={{background:"lightgray",color:"#000"}} transition={{duration: .5}}>
                    <h2>Maintenance & optimisation de sites existants</h2>
                    <ul>
                        <li>Mises à jour de CMS et de plugins/modules</li>
                        <li>Optimisation des performances (vitesse, SEO technique)</li>
                        <li>Sauvegardes, sécurité, corrections de bugs</li>
                    </ul>
                    <button>Contact</button>
                </motion.div>
            </motion.div>
        </div>
    </motion.div>
  )
}
