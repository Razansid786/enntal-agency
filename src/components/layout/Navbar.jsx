import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const links = [
  { label: 'Home', target: 'home' },
  { label: 'Services', target: 'services' },
  { label: 'Case Studies', target: 'case-studies' },
  { label: 'About', target: 'about' },
  { label: 'Booking', target: 'booking' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToSection = (target) => {
    const section = document.getElementById(target)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setOpen(false)
    }
  }

  return (
    <header className="fixed left-0 right-0 top-0 z-[9990] pointer-events-none">
      <motion.div
        className="mx-auto mt-3 pointer-events-auto"
        animate={{
          width: scrolled ? 'clamp(560px, 58vw, 780px)' : 'clamp(780px, 86vw, 1220px)',
          height: scrolled ? 56 : 72,
        }}
        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background: scrolled ? 'rgba(255,255,255,0.74)' : 'rgba(255,255,255,0.32)',
          border: scrolled ? '1px solid rgba(17,26,40,0.15)' : '1px solid rgba(17,26,40,0.07)',
          backdropFilter: 'blur(14px)',
          borderRadius: scrolled ? '999px' : '18px',
          boxShadow: scrolled ? '0 16px 34px -26px rgba(17,26,40,0.6)' : 'none',
        }}
      >
        <nav className="flex h-full items-center justify-between px-4 md:px-6">
          <button
            type="button"
            onClick={() => scrollToSection('home')}
            className="relative flex items-center"
            style={{ background: 'none', border: 'none', color: 'var(--ink)', cursor: 'pointer' }}
          >
            <motion.div
              animate={{ opacity: scrolled ? 0 : 1, x: scrolled ? 10 : 0, letterSpacing: scrolled ? '0.18em' : '0.03em' }}
              transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
              style={{ fontSize: '1.2rem', fontWeight: 600, textTransform: 'lowercase' }}
            >
              enntal
            </motion.div>
            <motion.div
              animate={{ opacity: scrolled ? 1 : 0, scale: scrolled ? 1 : 0.7, x: scrolled ? 0 : -10 }}
              transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
              style={{ position: 'absolute', left: 0 }}
            >
              <EnntalLogo />
            </motion.div>
          </button>

          <div className="hidden md:flex items-center gap-5" style={{ transform: scrolled ? 'translateX(-10px)' : 'translateX(0)', transition: 'transform 0.34s ease' }}>
            {links.map(({ label, target }) => (
              <button
                key={target}
                type="button"
                onClick={() => scrollToSection(target)}
                className="font-ui"
                style={{
                  fontSize: '0.66rem',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--ash)',
                  transition: 'color 0.2s ease',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  fontWeight: 600,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--ink)' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--ash)' }}
              >
                {label}
              </button>
            ))}
          </div>

          <button className="md:hidden" style={{ color: 'var(--ink)', background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => setOpen(!open)}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </motion.div>

      {open && (
        <div className="mx-4 mt-2 rounded-2xl border bg-white/95 p-5 backdrop-blur md:hidden" style={{ borderColor: 'rgba(17,26,40,0.14)' }}>
          <div className="flex flex-col gap-4">
            {links.map(({ label, target }) => (
              <button
                type="button"
                key={target}
                onClick={() => scrollToSection(target)}
                style={{ background: 'none', border: 'none', color: 'var(--ink)', textAlign: 'left', fontSize: '1.1rem' }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}

function EnntalLogo() {
  return (
    <div
      style={{
        width: '34px',
        height: '34px',
        borderRadius: '10px',
        border: '1.5px solid var(--ink)',
        display: 'grid',
        placeItems: 'center',
      }}
    >
      <div
        style={{
          width: '15px',
          height: '13px',
          borderTop: '2px solid var(--ink)',
          borderBottom: '2px solid var(--ink)',
          transform: 'skewX(-12deg)',
        }}
      />
    </div>
  )
}
