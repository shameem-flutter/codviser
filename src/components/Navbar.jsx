import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import CodviserLogo from './CodviserLogo';

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const progressRef = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()

  /* ── Scroll-aware shrink & Progress ── */
  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    const wrapper = document.querySelector('.scroll-wrapper');
    
    // On non-home pages, we might not have a .scroll-wrapper
    const scroller = isMobile ? window : (wrapper || window);
    
    if (!scroller) return;

    const onScroll = () => {
      const scrollPos = isMobile ? window.scrollY : (wrapper ? wrapper.scrollTop : window.scrollY);
      const scrollMax = isMobile 
        ? document.documentElement.scrollHeight - window.innerHeight 
        : (wrapper ? wrapper.scrollHeight - wrapper.clientHeight : document.documentElement.scrollHeight - window.innerHeight);
      
      setScrolled(scrollPos > 40);

      // Update progress bar
      if (progressRef.current && scrollMax > 0) {
        const progress = (scrollPos / scrollMax) * 100;
        progressRef.current.style.width = `${progress}%`;
      }
    }

    scroller.addEventListener('scroll', onScroll, { passive: true });
    return () => scroller.removeEventListener('scroll', onScroll);
  }, [location.pathname]);

  /* ── Active link via IntersectionObserver ── */
  useEffect(() => {
    if (location.pathname !== '/') {
      setActive('');
      return;
    }

    const isMobile = window.innerWidth <= 768;
    const wrapper = document.querySelector('.scroll-wrapper');
    const sectionIds = ['hero', 'services', 'about', 'contact'];
    const observers = [];

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { 
          root: isMobile ? null : wrapper, 
          threshold: 0.3 
        }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach(o => o.disconnect());
  }, [location.pathname]);

  const close = () => setMenuOpen(false)

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const id = href.replace('#', '');
    
    if (location.pathname !== '/') {
      navigate('/' + href);
      close();
      return;
    }

    const el = document.getElementById(id);
    if (el) {
      const isMobile = window.innerWidth <= 768;
      const wrapper = document.querySelector('.scroll-wrapper');
      
      if (isMobile) {
        window.scrollTo({
          top: el.offsetTop - 56,
          behavior: 'smooth'
        });
      } else if (wrapper) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({
          top: el.offsetTop - 56,
          behavior: 'smooth'
        });
      }
      close();
    }
  };

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        {/* Progress Bar */}
        <div className="nav-progress-bar" ref={progressRef} />

        {/* Logo */}
        <Link to="/" className="nav-logo" onClick={(e) => handleNavClick(e, '#hero')}>
          <CodviserLogo width={120} color="#000000" />
        </Link>

        {/* Links (Centered) */}
        <ul className="nav-links">
          {NAV_LINKS.map(({ label, href }) => {
            const id = href.replace('#', '')
            return (
              <li key={label}>
                <a
                  href={href}
                  className={active === id ? 'active' : ''}
                  onClick={(e) => handleNavClick(e, href)}
                >
                  {label}
                </a>
              </li>
            )
          })}
        </ul>

        {/* Right side */}
        <div className="nav-right-actions">
          <button className="nav-cta" onClick={(e) => handleNavClick(e, '#contact')}>
            Start Project
          </button>

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
        </div>
      </nav>

      {/* Mobile overlay */}
      <div className={`mobile-overlay${menuOpen ? ' open' : ''}`}>
        {NAV_LINKS.map(({ label, href }, i) => (
          <a
            key={label}
            href={href}
            onClick={(e) => handleNavClick(e, href)}
            className={`reveal-up stagger-${i + 1}${menuOpen ? ' reveal-visible' : ''}`}
          >
            {label}
          </a>
        ))}
      </div>
    </>
  )
}
