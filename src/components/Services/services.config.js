/**
 * Configuration for the "What We Provide" (Services) Section
 * Centralizes background colors, gradients, noise, and other visual parameters.
 */

export const servicesConfig = {
  appearance: {
    // Light Theme
    background: '#ffffff',
    
    // Top radial spotlight gradient
    spotlight: {
      color: 'rgba(120, 80, 255, 0.06)',
      size: '60% 40%',
      position: '50% 0%'
    },
    
    // Noise/grain texture overlay
    noise: {
      opacity: 0.02
    },
    
    // Border at the top edge of the section
    topBorder: {
      color: 'rgba(0, 0, 0, 0.05)'
    },
    
    // Typography Colors
    colors: {
      textHeading: '#000000',
      textSubtitle: 'rgba(0, 0, 0, 0.5)',
      eyebrow: 'rgba(0, 0, 0, 0.6)',
      eyebrowLine: 'rgba(0, 0, 0, 0.1)',
      cardTitle: '#1a1a1a',
      cardTitleHover: '#000000',
      cardDesc: 'rgba(0, 0, 0, 0.5)',
      cardDescHover: 'rgba(0, 0, 0, 0.7)',
      cardBorder: 'rgba(0, 0, 0, 0.06)',
      numColor: 'rgba(0, 0, 0, 0.2)',
      numBorder: 'rgba(0, 0, 0, 0.1)',
      numHoverColor: '#1a1a1a',
      numHoverBorder: 'rgba(0, 0, 0, 0.2)',
      iconColor: 'rgba(0, 0, 0, 0.4)',
      iconBoxBg: 'rgba(0, 0, 0, 0.03)',
      iconBoxBorder: 'rgba(0, 0, 0, 0.05)',
      iconHoverColor: '#1a1a1a',
      iconBoxHoverBg: 'rgba(0, 0, 0, 0.05)',
      iconBoxHoverBorder: 'rgba(0, 0, 0, 0.1)',
      arrowColor: 'rgba(0, 0, 0, 0.3)',
      arrowBg: 'rgba(0, 0, 0, 0.03)',
      arrowBorder: 'rgba(0, 0, 0, 0.08)',
      arrowHoverColor: '#ffffff',
      arrowHoverBg: '#1a1a1a',
      arrowHoverBorder: '#1a1a1a',
      ctaText: 'rgba(0, 0, 0, 0.4)'
    },
    
    // Accent colors and gradients
    accents: {
      primary: '#8b5cf6',
      secondary: '#3b82f6',
      glow: 'transparent',
      headingGradient: 'linear-gradient(90deg, #000000, #000000)',
      hoverBg: 'rgba(0, 0, 0, 0.04)',
      accentLine: 'linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.15), transparent)'
    }
  },
  
  // Animation settings
  animations: {
    cardStaggerDelay: 120,
    numberBadgeDelay: 200,
    revealThreshold: 0.2
  },
  
  // Layout constraints
  layout: {
    maxWidth: '860px',
    paddingTop: '80px',
    paddingBottom: '40px'
  }
};
