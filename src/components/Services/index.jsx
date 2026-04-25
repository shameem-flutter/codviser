import { useInView } from '../../hooks/useInView';
import { servicesConfig as config } from './services.config';
import './services.css';

const SERVICES_DATA = [
  {
    id: 's1',
    num: '01',
    title: 'Website Development',
    desc: 'High-performance, scalable web applications built with modern frameworks to ensure speed and security.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="18" rx="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 8h20M6 5.5h.01M9 5.5h.01M12 5.5h.01" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    id: 's2',
    num: '02',
    title: 'App Development',
    desc: 'Native and cross-platform mobile solutions that combine intuitive UI with robust performance.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="5" y="2" width="14" height="20" rx="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 18h.01M9 5h6" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="11" r="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 13v1" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    id: 's3',
    num: '03',
    title: 'Digital Marketing',
    desc: 'Data-driven marketing strategies designed to maximize your ROI and grow your online presence.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 20v-5l4-3 5 4 9-7" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="3" cy="20" r="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="7" cy="12" r="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="16" r="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="21" cy="9" r="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    id: 's4',
    num: '04',
    title: 'Brand Identity',
    desc: 'Crafting unique visual identities and strategic branding that resonate with your target audience.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2l9 7-9 13-9-13 9-7z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 2v20M3 9h18" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
]

export default function Services() {
  const [headerRef, headerInView] = useInView(0.1)
  
  // Inject configuration as CSS variables
  const sectionStyles = {
    '--services-bg': config.appearance.background,
    '--services-spotlight-color': config.appearance.spotlight.color,
    '--services-spotlight-size': config.appearance.spotlight.size,
    '--services-spotlight-pos': config.appearance.spotlight.position,
    '--services-noise-opacity': config.appearance.noise.opacity,
    '--services-border-color': config.appearance.topBorder.color,
    '--services-glow': config.appearance.accents.glow,
    '--services-heading-gradient': config.appearance.accents.headingGradient,
    '--services-hover-bg': config.appearance.accents.hoverBg,
    '--services-accent-line': config.appearance.accents.accentLine,
    '--services-accent-primary': config.appearance.accents.primary,
    '--services-max-width': config.layout.maxWidth,
    '--services-padding-top': config.layout.paddingTop,
    '--services-padding-bottom': config.layout.paddingBottom,
    
    // New Theme Color Variables
    '--services-text-heading': config.appearance.colors.textHeading,
    '--services-text-subtitle': config.appearance.colors.textSubtitle,
    '--services-eyebrow-color': config.appearance.colors.eyebrow,
    '--services-eyebrow-line': config.appearance.colors.eyebrowLine,
    '--services-card-title': config.appearance.colors.cardTitle,
    '--services-card-title-hover': config.appearance.colors.cardTitleHover,
    '--services-card-desc': config.appearance.colors.cardDesc,
    '--services-card-desc-hover': config.appearance.colors.cardDescHover,
    '--services-card-border': config.appearance.colors.cardBorder,
    '--services-num-color': config.appearance.colors.numColor,
    '--services-num-border': config.appearance.colors.numBorder,
    '--services-num-hover-color': config.appearance.colors.numHoverColor,
    '--services-num-hover-border': config.appearance.colors.numHoverBorder,
    '--services-icon-color': config.appearance.colors.iconColor,
    '--services-icon-box-bg': config.appearance.colors.iconBoxBg,
    '--services-icon-box-border': config.appearance.colors.iconBoxBorder,
    '--services-icon-hover-color': config.appearance.colors.iconHoverColor,
    '--services-icon-box-hover-bg': config.appearance.colors.iconBoxHoverBg,
    '--services-icon-box-hover-border': config.appearance.colors.iconBoxHoverBorder,
    '--services-arrow-color': config.appearance.colors.arrowColor,
    '--services-arrow-bg': config.appearance.colors.arrowBg,
    '--services-arrow-border': config.appearance.colors.arrowBorder,
    '--services-arrow-hover-color': config.appearance.colors.arrowHoverColor,
    '--services-arrow-hover-bg': config.appearance.colors.arrowHoverBg,
    '--services-arrow-hover-border': config.appearance.colors.arrowHoverBorder,
    '--services-cta-text': config.appearance.colors.ctaText,
  };

  return (
    <section 
      className="section provide-section" 
      id="services"
      style={sectionStyles}
    >
      <div className="provide-spotlight" />

      <div className="inner">
        <div 
          ref={headerRef}
          className={`provide-header ${headerInView ? 'reveal-visible' : ''}`}
        >
          <div className="provide-eyebrow-wrap">
            <div className="provide-eyebrow-line" />
            <span className="provide-eyebrow">Our Services</span>
            <div className="provide-eyebrow-line" />
          </div>
          
          <h2 className="provide-title">
            What We <span>Provide</span>
          </h2>
          
          <p className="provide-subtitle">
            Delivering high-impact digital solutions through specialized engineering and creative strategy.
          </p>
        </div>

        <div className="service-stack">
          {SERVICES_DATA.map((s, idx) => (
            <ServiceCard key={s.id} service={s} index={idx} />
          ))}
        </div>

        <div className="provide-cta-strip">
          <p className="cta-text">Ready to build something great?</p>
          <a href="#contact" className="cta-link">Start a project →</a>
        </div>
      </div>
    </section>
  )
}

function ServiceCard({ service, index }) {
  const [cardRef, inView] = useInView(config.animations.revealThreshold)
  const delay = index * config.animations.cardStaggerDelay
  
  return (
    <div
      ref={cardRef}
      className={`service-card ${inView ? 'reveal-visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div 
        className="card-num-badge"
        style={{ transitionDelay: `${delay + config.animations.numberBadgeDelay}ms` }}
      >
        {service.num}
      </div>

      <div className="card-info">
        <h3 className="card-title">{service.title}</h3>
        <p className="card-desc">{service.desc}</p>
      </div>

      <div className="card-icon-box">
        {service.icon}
      </div>

      <div className="card-arrow-btn">
        →
      </div>
    </div>
  )
}
