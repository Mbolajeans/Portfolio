import './navbar.scss'
import {motion} from 'framer-motion'
import Linkedin from '../../assets/linkedin.png'
import Whatsapp from '../../assets/whatsapp.png'
import Team from '../../assets/team.svg'
import Sidebar from '../sidebar/Sidebar'

export default function Navbar() {
  return (
    <div className='navbar'>
        <Sidebar></Sidebar>
      <div className='wrapper'>
        <motion.span 
        initial={{opacity:0, scale:.5}} 
        whileInView={{opacity:1, scale:1}} 
        transition={{duration:.5}}>
            PAPAYA DEV
        </motion.span>
        <motion.div className='social' initial={{opacity:0, scale:.5}} 
        whileInView={{opacity:1, scale:1}} 
        transition={{duration:.5}}>
            <a href='https://www.linkedin.com/in/mbola-jean-0282ab197/' target='_blank' rel="noopener noreferrer"><img src={Linkedin} /></a>
            <a href='https://wa.me/261387287592' target='_blank' rel="noopener noreferrer"><img src={Whatsapp} /></a>
            <a href='https://teams.microsoft.com/l/chat/0/0?users=mbolajeans' target='_blank' rel="noopener noreferrer"><img src={Team} /></a>
        </motion.div>
      </div>
    </div>
  )
}
