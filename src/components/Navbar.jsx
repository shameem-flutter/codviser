import { useState, useEffect } from 'react';

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Why Us',   href: '#why-us'   },
  { label: 'About',    href: '#about'    },
  { label: 'Contact',  href: '#contact'  },
]

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [active,    setActive]    = useState('')
  const [menuOpen,  setMenuOpen]  = useState(false)

  /* ── Scroll-aware shrink ── */
  useEffect(() => {
    const wrapper = document.querySelector('.scroll-wrapper')
    if (!wrapper) return
    const onScroll = () => setScrolled(wrapper.scrollTop > 40)
    wrapper.addEventListener('scroll', onScroll, { passive: true })
    return () => wrapper.removeEventListener('scroll', onScroll)
  }, [])

  /* ── Active link via IntersectionObserver ── */
  useEffect(() => {
    const sectionIds = ['hero', 'services', 'why-us', 'about', 'contact']
    const observers = []

    sectionIds.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { root: document.querySelector('.scroll-wrapper'), threshold: 0.5 }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach(o => o.disconnect())
  }, [])

  const close = () => setMenuOpen(false)

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        {/* Logo */}
        <a href="#hero" className="nav-logo">
          <span className="nav-logo-diamond" />
          <span className="nav-logo-text">Codviser</span>
        </a>

        {/* Right cluster */}
        <div className="nav-right">
          <ul className="nav-links">
            {NAV_LINKS.map(({ label, href }) => {
              const id = href.replace('#', '')
              return (
                <li key={label}>
                  <a
                    href={href}
                    className={active === id ? 'active' : ''}
                  >
                    {label}
                  </a>
                </li>
              )
            })}
          </ul>
          <div className="nav-divider" />
          <button className="nav-cta" onClick={() => document.getElementById('contact')?.scrollIntoView()}>
            Start Project
            <span className="nav-cta-arrow">→</span>
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="nav-hamburger"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(v => !v)}
        >
          <span style={{ transform: menuOpen ? 'rotate(45deg) translateY(6.5px)' : 'none' }} />
          <span style={{ opacity: menuOpen ? 0 : 1 }} />
          <span style={{ transform: menuOpen ? 'rotate(-45deg) translateY(-6.5px)' : 'none' }} />
        </button>
      </nav>

      {/* Mobile overlay */}
      <div className={`mobile-overlay${menuOpen ? ' open' : ''}`}>
        {NAV_LINKS.map(({ label, href }, i) => (
          <a 
            key={label} 
            href={href} 
            onClick={close}
            className={`reveal-up stagger-${i + 1}${menuOpen ? ' reveal-visible' : ''}`}
          >
            {label}
          </a>
        ))}
      </div>
    </>
  )
}
