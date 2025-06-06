import './services.scss'
import {motion} from 'framer-motion'

export default function Services2() {
  return (
    <motion.div className='services'>
        <motion.div className='TextContainer' initial={{opacity:0, x:100 }} 
        whileInView={{opacity:1, x:0}} 
        transition={{duration:1}}>
            <p>Développer des solutions web fiables, évolutives et optimisées <br/>pour vous aider à atteindre vos ambitions digitales.</p>
            <hr></hr>
        </motion.div>
        <div className='wrapper'>
            <motion.div className='ListContainer' initial={{opacity:0, x:-500 }} 
        whileInView={{opacity:1, x:0}} 
        transition={{duration:1}}>
                <motion.div className='box' initial={{background:"transparent",color:"#fff"}} whileHover={{background:"lightgray",color:"#000"}} transition={{duration: .5}}>
                    <h2>Intégration CMS personnalisée</h2>
                    <ul>
                        <li>Création de thèmes WordPress sur mesure avec les constructeurs Elementor, DIVI, ou via Gutenberg (blocs personnalisés)</li>
                        <li>Adaptation du design selon les maquettes du client (Figma, XD, etc.)</li>
                        <li>Optimisation du back-office WordPress pour qu’il soit clair, organisé et facilement utilisable par des administrateurs non techniciens</li>
                        <li>Configuration des rôles, des menus, des champs personnalisés (avec ACF par exemple) pour une gestion simple du contenu</li>
                    </ul>
                    <button>Contact</button>
                </motion.div>
                <motion.div className='box' initial={{background:"transparent",color:"#fff"}} whileHover={{background:"lightgray",color:"#000"}} transition={{duration: .5}}>
                    <h2>Intégration web pixel perfect</h2>
                    <ul>
                        <li>Conversion de maquettes PSD/XD/Figma en HTML/CSS</li>
                        <li>Responsive design avec Bootstrap, SASS, jQuery</li>
                        <li>Compatibilité multi-navigateurs et accessibilité</li>
                    </ul>
                    <button>Contact</button>
                </motion.div>
                <motion.div className='box' initial={{background:"transparent",color:"#fff"}} whileHover={{background:"lightgray",color:"#000"}} transition={{duration: .5}}>
                    <h2>Développement d’interfaces dynamiques avec React JS</h2>
                    <ul>
                        <li>Création de composants réutilisables</li>
                        <li>Intégration d’animations</li>
                        <li>Connexion à des APIs pour créer des applications interactives</li>
                    </ul>
                    <button>Contact</button>
                </motion.div>
            </motion.div>
        </div>
    </motion.div>
  )
}
