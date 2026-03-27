export default function Footer() {
  const scrollToSection = (target) => {
    const section = document.getElementById(target)
    if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <footer style={{ background: 'var(--warm)', borderTop: '1px solid var(--bone)' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-1">
          <p className="font-display text-3xl font-normal mb-3" style={{ color: 'var(--ink)' }}>enntal</p>
          <p className="font-ui" style={{ color: 'var(--ash)', fontSize: '0.85rem', lineHeight: 1.7 }}>
            Business automation & systems agency. We build the infrastructure your business runs on.
          </p>
        </div>
        <div>
          <p className="text-label mb-5">Services</p>
          {['Business Automation', 'Custom Development', 'Integrations', 'CMS Solutions', 'SRS Systems'].map(s => (
            <button key={s} onClick={() => scrollToSection('services')} className="block font-ui mb-2" style={{ color: 'var(--ash)', fontSize: '0.85rem', textDecoration: 'none', background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--ink)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--ash)'}
            >{s}</button>
          ))}
        </div>
        <div>
          <p className="text-label mb-5">Company</p>
          {[['Case Studies', 'case-studies'], ['About', 'about'], ['Booking', 'booking']].map(([l, h]) => (
            <button key={h} onClick={() => scrollToSection(h)} className="block font-ui mb-2" style={{ color: 'var(--ash)', fontSize: '0.85rem', textDecoration: 'none', background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--ink)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--ash)'}
            >{l}</button>
          ))}
        </div>
        <div>
          <p className="text-label mb-5">Get in touch</p>
          <p className="font-ui mb-2" style={{ color: 'var(--ash)', fontSize: '0.85rem' }}>hello@enntal.com</p>
          <p className="font-ui" style={{ color: 'var(--ash)', fontSize: '0.85rem' }}>+1 (555) 000-0000</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex justify-between items-center" style={{ borderTop: '1px solid var(--bone)' }}>
        <p className="text-label">© 2026 enntal. All rights reserved.</p>
        <div className="flex gap-6">
          {['Twitter', 'LinkedIn'].map(s => (
            <a key={s} href="#" className="text-label" style={{ textDecoration: 'none' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--ink)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--ash)'}
            >{s}</a>
          ))}
        </div>
      </div>
    </footer>
  )
}