import { useRef } from 'react'
import './Portfolio.scss'
import projet1 from './projet-1.jpg'
import projet2 from './projet-2.jpg'
import projet3 from './projet-3.jpg'
import projet4 from './projet-4.png'
import projet5 from './projet-5.jpg'
import {motion, useScroll, useSpring, useTransform} from 'framer-motion'


const items = [
    {
        id: 1,
        title: 'Conception et développement <br>de mon site portfolio',
        img: projet4,
        desc: `
            <ul>
                <li>Développé from scratch avec <strong>React</strong></li>
                <li>Le site est responsive (desktop & mobile) et intègre des animations fluides avec <strong>Framer Motion</strong></li>
                <li>Utilisation de <strong>SCSS</strong> pour le style, <strong>React Three Fiber</strong> pour l'intégration 3D (Inspiration dans Tympanus), et <strong>EmailJS</strong> pour le formulaire de contact.</li>
                <li>Déploiement sur <strong>Vercel</strong></li>
            </ul>
        `,
    },
    {
        id: 2,
        title: 'Gestion de projet,<br>React dashboard template',
        img: projet4,
        desc: `
            <ul>
                <li><strong>Front-end :</strong> mise en relation des API (Axios) par rapport à l’interface</li>
                <li><strong>Gestion de version :</strong> Git</li>
                <li>Customisation des <strong>components prédéfinis</strong> du template</li>
            </ul>
        `,
    },
    {
        id: 3,
        title: 'Site vitrine – Secteur Paysagisme <br><span>(Projet en agence)</span>',
        img: projet5,
        desc: `
            <ul>
                <li>Intégration HTML5/CSS3 à partir de maquettes XD avec <strong>Bootstrap</strong> et <strong>jQuery</strong></li>
                <li>Développement de blocs Gutenberg personnalisés avec <strong>WordPress (PHP + ACF Pro)</strong></li>
                <li>Plugins : <strong>Contact Form 7</strong> et outils personnalisés</li>
                <li>Responsive design multi-support (desktop, tablette, mobile)</li>
                <li>Structure SEO optimisée (titres, hiérarchie sémantique)</li>
            </ul>
        `,
    },
    {
        id: 4,
        title: 'Site e-commerce – Vente de produits CBD <br><span>(Projet en agence)</span>',
        img: projet1,
        desc: `
            <ul>
                <li>Intégration from scratch en HTML/CSS/JS à partir de maquettes XD (avec <strong>Bootstrap</strong> et <strong>jQuery</strong>)</li>
                <li>Développement <strong>WordPress + WooCommerce</strong> : gestion produits, panier, tunnel d’achat</li>
                <li>ACF Pro, Contact Form 7, plugins personnalisés</li>
                <li>Responsive design pour toutes résolutions</li>
                <li>Optimisation SEO (structure & performance)</li>
            </ul>
        `,
    },
    {
        id: 5,
        title: 'Site vitrine multilingue – Industrie papier <br><span>(Projet en agence)</span>',
        img: projet2,
        desc: `
            <ul>
                <li>Intégration HTML5/CSS3 avec <strong>Bootstrap</strong> et <strong>jQuery</strong> depuis maquettes XD</li>
                <li>Thème WordPress personnalisé avec <strong>ACF Pro</strong>, <strong>Contact Form 7</strong> et <strong>WPML</strong> (gestion multilingue)</li>
                <li>Respect des normes d’accessibilité et SEO</li>
                <li>Design responsive (desktop, tablette, mobile)</li>
            </ul>
        `,
    },
    {
        id: 6,
        title: 'Refonte WordPress – Produit anti-nuisibles <br><span>(Projet en agence)</span>',
        img: projet3,
        desc: `
            <ul>
                <li>Refonte graphique et structurelle sous <strong>WordPress + Elementor</strong></li>
                <li>Gestion e-commerce avec <strong>WooCommerce</strong> intégré à Elementor</li>
                <li>Amélioration SEO (titres, hiérarchie, rapidité)</li>
                <li>Responsive design tous supports</li>
            </ul>
        `,
    }
];


const Single = ({item}) => {
    const ref=useRef();
    const {scrollYProgress} = useScroll({
        target:ref,
    })
    const y = useTransform(scrollYProgress,[0,1],[-300,300])
    return <section>
        <div className='container'>
            <div className='wrapper'>
                <div className='imgContainer' ref={ref}><img src={item.img}></img></div>
                <motion.div className='textContainer' style={{y}}>
                    <h2 dangerouslySetInnerHTML={{ __html: item.title }}/>
                    <div dangerouslySetInnerHTML={{ __html: item.desc }} />
                </motion.div>
            </div>
        </div>
    </section>
}

export default function Portfolio() {
    const ref=useRef()
    const {scrollYProgress} = useScroll({target:ref, offset:["end end","start start"]})
    const scaleX = useSpring(scrollYProgress,{
        stiffness:100,
        damping:30,
    })
  return (
    <div className='portfolio' ref={ref}>
        <div className='progress'>
            <h1>Listes Projets</h1>
            <motion.div style={{scaleX}} className='progressBar'></motion.div>
        </div>
        {items.map((item)=>(
            <Single item={item} key={item.id}></Single>
        ))}
    </div>
  )
}
