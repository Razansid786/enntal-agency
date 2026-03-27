import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [pathname])
  return null
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="*" element={<Home />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  useEffect(() => {
    const elements = document.querySelectorAll('.pop-on-scroll')
    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.14 }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <AnimatedRoutes />
      <Footer />
    </BrowserRouter>
  )
}