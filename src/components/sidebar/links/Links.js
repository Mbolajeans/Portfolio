import {motion, scale} from 'framer-motion'
export default function Links({ closeSidebar }) {
    const items = [
        "Home",
        "Services",
        "Projets",
        "Contact"
    ]
  return (
    <div className="links">
        {items.map(item=>(
            <motion.a href={`#${item}`} key={item} whileHover={{scale:1.1}} whileTap={{scale:.9}} onClick={closeSidebar}>{item}</motion.a>
        ))}
    </div>
  )
}
