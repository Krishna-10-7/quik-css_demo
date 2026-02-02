import { useState, useEffect } from 'react'
import './styles.css'

function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) return savedTheme
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }
    return 'light'
  })

  const [showBackToTop, setShowBackToTop] = useState(false)
  const [activeSection, setActiveSection] = useState('installation')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e) => {
      const newTheme = e.matches ? 'dark' : 'light'
      setTheme(newTheme)
      document.documentElement.setAttribute('data-theme', newTheme)
      localStorage.setItem('theme', newTheme)
    }
    
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300)
      
      // Update active section based on scroll position
      const sections = document.querySelectorAll('section[id]')
      sections.forEach(section => {
        const rect = section.getBoundingClientRect()
        if (rect.top <= 150 && rect.bottom >= 150) {
          setActiveSection(section.id)
        }
      })
    }
    
    window.addEventListener('scroll', handleScroll)
    mediaQuery.addEventListener('change', handleChange)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Animated Background Orbs */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: -1
      }}>
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(102, 126, 234, 0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(40px)',
          animation: 'float 8s ease-in-out infinite'
        }} />
        <div style={{
          position: 'absolute',
          top: '60%',
          right: '10%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(118, 75, 162, 0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(40px)',
          animation: 'float 6s ease-in-out infinite reverse'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '20%',
          left: '30%',
          width: '250px',
          height: '250px',
          background: 'radial-gradient(circle, rgba(79, 172, 254, 0.12) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(40px)',
          animation: 'float 10s ease-in-out infinite'
        }} />
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(30px, -30px); }
        }
      `}</style>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button onClick={scrollToTop} className="back-to-top">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 15l-6-6-6 6"/>
          </svg>
        </button>
      )}

      {/* Header */}
      <header className="navbar-modern" style={{ padding: '16px 0' }}>
        <nav className="container-modern" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <a href="#" className="logo-text" style={{ textDecoration: 'none' }}>Quik CSS</a>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button 
              className="theme-toggle-modern"
              onClick={toggleTheme}
              aria-label="Toggle Dark Mode"
            >
              {theme === 'light' ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"/>
                  <line x1="12" y1="1" x2="12" y2="3"/>
                  <line x1="12" y1="21" x2="12" y2="23"/>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                  <line x1="1" y1="12" x2="3" y2="12"/>
                  <line x1="21" y1="12" x2="23" y2="12"/>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>
            <a href="https://www.npmjs.com/package/quik-css" target="_blank" className="btn-modern btn-primary-modern" style={{ textDecoration: 'none' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 3H3v18h18V3zm-2 14h-4v-4h-2v4H7V5h12v12z"/>
              </svg>
              Get Started
            </a>
            <a href="https://github.com/Krishna-10-7/quik-css" target="_blank" className="btn-modern btn-glass" style={{ textDecoration: 'none', padding: '12px' }}>
              <svg height="22" viewBox="0 0 16 16" width="22" fill="currentColor">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
              </svg>
            </a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container-modern">
          <span className="badge-modern fade-in" style={{ marginBottom: '24px' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
            v1.0.2 Now Available
          </span>
          <h1 className="hero-title fade-in">Build Beautiful UIs<br />at Lightning Speed</h1>
          <p className="hero-subtitle fade-in">
            A minimal, utility-first CSS framework that helps you build modern interfaces 
            without leaving your HTML. Zero JavaScript, just pure CSS magic.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }} className="fade-in">
            <a href="#installation" className="btn-modern btn-primary-modern" style={{ textDecoration: 'none' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
              </svg>
              Install Now
            </a>
            <a href="https://github.com/Krishna-10-7/quik-css" target="_blank" className="btn-modern btn-secondary-modern" style={{ textDecoration: 'none' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
              </svg>
              View on GitHub
            </a>
          </div>
          
          {/* Stats */}
          <div style={{ 
            display: 'flex', 
            gap: '48px', 
            justifyContent: 'center', 
            marginTop: '64px',
            flexWrap: 'wrap'
          }} className="fade-in">
            {[
              { label: 'File Size', value: '~12KB', icon: '⚡' },
              { label: 'Utility Classes', value: '100+', icon: '🎨' },
              { label: 'Zero Dependencies', value: '0', icon: '📦' }
            ].map((stat, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '4px' }}>{stat.icon}</div>
                <div style={{ 
                  fontSize: '1.75rem', 
                  fontWeight: '800',
                  background: 'var(--gradient-primary)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>{stat.value}</div>
                <div style={{ fontSize: '0.9rem', opacity: 0.7 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container-modern" style={{ paddingTop: '48px', paddingBottom: '48px' }}>
        <div style={{ display: 'flex', gap: '48px' }}>
          {/* Sidebar */}
          <aside className="sidebar-modern" style={{ width: '240px', flexShrink: 0 }}>
            <nav className="sidebar-nav">
              <div className="sidebar-category">Getting Started</div>
              <a href="#installation" className={`sidebar-link ${activeSection === 'installation' ? 'active' : ''}`}>Installation</a>
              <a href="#usage" className={`sidebar-link ${activeSection === 'usage' ? 'active' : ''}`}>Quick Start</a>
              
              <div className="sidebar-category">Layout</div>
              <a href="#container" className={`sidebar-link ${activeSection === 'container' ? 'active' : ''}`}>Container</a>
              <a href="#display" className={`sidebar-link ${activeSection === 'display' ? 'active' : ''}`}>Display</a>
              <a href="#flex" className={`sidebar-link ${activeSection === 'flex' ? 'active' : ''}`}>Flexbox</a>
              <a href="#grid" className={`sidebar-link ${activeSection === 'grid' ? 'active' : ''}`}>Grid</a>
              
              <div className="sidebar-category">Spacing</div>
              <a href="#margin" className={`sidebar-link ${activeSection === 'margin' ? 'active' : ''}`}>Margin</a>
              <a href="#padding" className={`sidebar-link ${activeSection === 'padding' ? 'active' : ''}`}>Padding</a>
              
              <div className="sidebar-category">Sizing</div>
              <a href="#width" className={`sidebar-link ${activeSection === 'width' ? 'active' : ''}`}>Width</a>
              <a href="#height" className={`sidebar-link ${activeSection === 'height' ? 'active' : ''}`}>Height</a>
              
              <div className="sidebar-category">Typography</div>
              <a href="#fonts" className={`sidebar-link ${activeSection === 'fonts' ? 'active' : ''}`}>Font Size</a>
              <a href="#font-weight" className={`sidebar-link ${activeSection === 'font-weight' ? 'active' : ''}`}>Font Weight</a>
              <a href="#text-align" className={`sidebar-link ${activeSection === 'text-align' ? 'active' : ''}`}>Text Align</a>
              
              <div className="sidebar-category">Components</div>
              <a href="#buttons" className={`sidebar-link ${activeSection === 'buttons' ? 'active' : ''}`}>Buttons</a>
              <a href="#forms" className={`sidebar-link ${activeSection === 'forms' ? 'active' : ''}`}>Forms</a>
              <a href="#tables" className={`sidebar-link ${activeSection === 'tables' ? 'active' : ''}`}>Tables</a>
              <a href="#alerts" className={`sidebar-link ${activeSection === 'alerts' ? 'active' : ''}`}>Alerts</a>
              <a href="#colors" className={`sidebar-link ${activeSection === 'colors' ? 'active' : ''}`}>Colors</a>
              <a href="#animations" className={`sidebar-link ${activeSection === 'animations' ? 'active' : ''}`}>Animations</a>
            </nav>
          </aside>

          {/* Main Content */}
          <main style={{ flex: 1, minWidth: 0 }}>
            {/* Installation Section */}
            <section id="installation" style={{ marginBottom: '64px' }}>
              <div className="section-header">
                <div className="section-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                  </svg>
                </div>
                <h2 className="section-title">Installation</h2>
              </div>
              
              <div className="card-modern" style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#cb3837' }}>
                      <path d="M0 7.33v9.33h6.67v1.56h4.89V17.9H24V7.33z M11.56 16.34H8.44v-1.56H5.33v1.56H1.56V8.89h10z M22.44 16.34h-9.33V8.89h9.33z M12.44 15.56h1.78v-5h1.56v5h1.78v-5h1.56v5h1.56V10.44h-8.24z"/>
                    </svg>
                    NPM Installation
                  </h3>
                  <span className="badge-modern badge-success" style={{ fontSize: '0.7rem' }}>Recommended</span>
                </div>
                <div className="code-block">
                  <code>npm install quik-css</code>
                </div>
              </div>

              <div className="card-modern">
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                  </svg>
                  CDN Link
                </h3>
                <div className="code-block">
                  <code>&lt;link rel="stylesheet" href="https://Krishna-10-7.github.io/quik-css/styles.css"&gt;</code>
                </div>
              </div>
            </section>

            <div className="section-divider" />

            {/* Layout Section */}
            <section id="container" style={{ marginBottom: '64px' }}>
              <div className="section-header">
                <div className="section-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  </svg>
                </div>
                <h2 className="section-title">Layout</h2>
              </div>

              <div className="card-modern" style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '20px' }}>Container</h3>
                <div className="demo-box demo-box-primary" style={{ marginBottom: '12px' }}>
                  <code>.container</code> - Default responsive container
                </div>
                <div className="demo-box demo-box-accent">
                  <code>.container-lg</code> - Large container variant
                </div>
              </div>

              <div id="flex" className="card-modern" style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '20px' }}>Flexbox</h3>
                <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
                  <div className="demo-box demo-box-primary">Flex Item 1</div>
                  <div className="demo-box demo-box-primary">Flex Item 2</div>
                  <div className="demo-box demo-box-primary">Flex Item 3</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div className="demo-box demo-box-success">Column Item 1</div>
                  <div className="demo-box demo-box-success">Column Item 2</div>
                </div>
                <div style={{ marginTop: '20px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <code className="code-inline">.flex</code>
                  <code className="code-inline">.flex-col</code>
                  <code className="code-inline">.space-between</code>
                  <code className="code-inline">.align-center</code>
                </div>
              </div>

              <div id="grid" className="card-modern">
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '20px' }}>Grid</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '16px' }}>
                  <div className="demo-box demo-box-warning">Grid 1</div>
                  <div className="demo-box demo-box-warning">Grid 2</div>
                  <div className="demo-box demo-box-warning">Grid 3</div>
                </div>
                <code className="code-inline">.grid</code>
              </div>
            </section>

            <div className="section-divider" />

            {/* Typography Section */}
            <section id="fonts" style={{ marginBottom: '64px' }}>
              <div className="section-header">
                <div className="section-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="4 7 4 4 20 4 20 7"/>
                    <line x1="9" y1="20" x2="15" y2="20"/>
                    <line x1="12" y1="4" x2="12" y2="20"/>
                  </svg>
                </div>
                <h2 className="section-title">Typography</h2>
              </div>
              
              <div className="card-modern" style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '24px' }}>Font Sizes</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.75rem' }}>Tiny Font</span>
                    <code className="code-inline">.tiny-font</code>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '1rem' }}>Normal Font</span>
                    <code className="code-inline">.normal-font</code>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '1.25rem' }}>Big Font</span>
                    <code className="code-inline">.big-font</code>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '1.5rem', fontWeight: '600' }}>Small Heading</span>
                    <code className="code-inline">.small-heading</code>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '1.875rem', fontWeight: '700' }}>Medium Heading</span>
                    <code className="code-inline">.medium-heading</code>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '2.25rem', fontWeight: '800' }}>Main Heading</span>
                    <code className="code-inline">.main-heading</code>
                  </div>
                </div>
              </div>

              <div id="font-weight" className="card-modern" style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '24px' }}>Font Weights</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                  {[
                    { weight: 300, name: 'Thin', class: '.fw-thin' },
                    { weight: 400, name: 'Normal', class: '.fw-normal' },
                    { weight: 600, name: 'Thick', class: '.fw-thick' },
                    { weight: 800, name: 'Extra Thick', class: '.fw-extra-thick' }
                  ].map((item, i) => (
                    <div key={i} className="demo-box demo-box-primary" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: item.weight }}>{item.name}</span>
                      <code style={{ fontSize: '0.75rem', opacity: 0.8 }}>{item.class}</code>
                    </div>
                  ))}
                </div>
              </div>

              <div id="text-align" className="card-modern">
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '24px' }}>Text Alignment</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                  <div className="demo-box demo-box-accent" style={{ textAlign: 'left' }}>
                    Left <code style={{ fontSize: '0.7rem', display: 'block', opacity: 0.8 }}>.font-left</code>
                  </div>
                  <div className="demo-box demo-box-accent" style={{ textAlign: 'center' }}>
                    Center <code style={{ fontSize: '0.7rem', display: 'block', opacity: 0.8 }}>.font-center</code>
                  </div>
                  <div className="demo-box demo-box-accent" style={{ textAlign: 'right' }}>
                    Right <code style={{ fontSize: '0.7rem', display: 'block', opacity: 0.8 }}>.font-right</code>
                  </div>
                </div>
              </div>
            </section>

            <div className="section-divider" />

            {/* Spacing Section */}
            <section id="margin" style={{ marginBottom: '64px' }}>
              <div className="section-header">
                <div className="section-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 3H3v18h18V3zM9 9h6v6H9V9z"/>
                  </svg>
                </div>
                <h2 className="section-title">Spacing</h2>
              </div>

              <div className="card-modern" style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '24px' }}>Margin Classes</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
                  <div>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '12px', opacity: 0.7 }}>All Sides (m-*)</h4>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {[0, 1, 2, 3, 4].map(n => (
                        <code key={n} className="code-inline">.m-{n}</code>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '12px', opacity: 0.7 }}>Horizontal (mx-*)</h4>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {[0, 1, 2, 3, 4].map(n => (
                        <code key={n} className="code-inline">.mx-{n}</code>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '12px', opacity: 0.7 }}>Vertical (my-*)</h4>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {[0, 1, 2, 3, 4].map(n => (
                        <code key={n} className="code-inline">.my-{n}</code>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '12px', opacity: 0.7 }}>Individual</h4>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      <code className="code-inline">.mt-*</code>
                      <code className="code-inline">.mb-*</code>
                      <code className="code-inline">.ml-*</code>
                      <code className="code-inline">.mr-*</code>
                    </div>
                  </div>
                </div>
              </div>

              <div id="padding" className="card-modern">
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '24px' }}>Padding Classes</h3>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
                  {[0, 1, 2, 3, 4].map(n => (
                    <div key={n} className="demo-box demo-box-success" style={{ padding: `${n * 8 + 8}px ${n * 8 + 12}px` }}>
                      .p-{n}
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <code className="code-inline">.p-*</code>
                  <code className="code-inline">.px-*</code>
                  <code className="code-inline">.py-*</code>
                  <code className="code-inline">.pt-*</code>
                  <code className="code-inline">.pb-*</code>
                  <code className="code-inline">.pl-*</code>
                  <code className="code-inline">.pr-*</code>
                </div>
              </div>
            </section>

            <div className="section-divider" />

            {/* Sizing Section */}
            <section id="width" style={{ marginBottom: '64px' }}>
              <div className="section-header">
                <div className="section-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 21l-6-6m6 6v-4.8m0 4.8h-4.8M3 16.2V21m0 0h4.8M3 21l6-6M21 7.8V3m0 0h-4.8M21 3l-6 6M3 7.8V3m0 0h4.8M3 3l6 6"/>
                  </svg>
                </div>
                <h2 className="section-title">Sizing</h2>
              </div>

              <div className="card-modern" style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '24px' }}>Width Utilities</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[100, 80, 60, 40, 20].map(w => (
                    <div key={w} className="demo-box demo-box-primary" style={{ width: `${w}%` }}>
                      .w-{w}p ({w}%)
                    </div>
                  ))}
                </div>
              </div>

              <div id="height" className="card-modern">
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '24px' }}>Height Utilities</h3>
                <div style={{ display: 'flex', gap: '12px', height: '200px', alignItems: 'flex-end' }}>
                  {[100, 80, 60, 40, 20].map(h => (
                    <div key={h} className="demo-box demo-box-warning" style={{ height: `${h}%`, display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '80px' }}>
                      .h-{h}p
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: '20px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <code className="code-inline">.h-screen</code>
                  <code className="code-inline">.h-100p</code>
                  <code className="code-inline">.w-100p</code>
                </div>
              </div>
            </section>

            <div className="section-divider" />

            {/* Components Section */}
            <section id="buttons" style={{ marginBottom: '64px' }}>
              <div className="section-header">
                <div className="section-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="6" width="20" height="12" rx="2"/>
                  </svg>
                </div>
                <h2 className="section-title">Components</h2>
              </div>

              <div className="card-modern" style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '24px' }}>Buttons</h3>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '20px' }}>
                  <button className="btn-modern btn-primary-modern">Primary Button</button>
                  <button className="btn-modern btn-secondary-modern">Secondary Button</button>
                  <button className="btn-modern btn-glass">Glass Button</button>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <code className="code-inline">.btn</code>
                  <code className="code-inline">.btn-primary</code>
                  <code className="code-inline">.btn-secondary</code>
                </div>
              </div>

              <div id="forms" className="card-modern" style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '24px' }}>Forms</h3>
                <form style={{ maxWidth: '400px' }}>
                  <div style={{ marginBottom: '20px' }}>
                    <label className="label-modern">Email Address</label>
                    <input type="email" className="input-modern" placeholder="you@example.com" />
                  </div>
                  <div style={{ marginBottom: '20px' }}>
                    <label className="label-modern">Message</label>
                    <textarea className="input-modern" placeholder="Your message..." rows={4} style={{ resize: 'vertical' }} />
                  </div>
                  <button type="submit" className="btn-modern btn-primary-modern">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="22" y1="2" x2="11" y2="13"/>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                    Send Message
                  </button>
                </form>
              </div>

              <div id="tables" className="card-modern" style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '24px' }}>Tables</h3>
                <table className="table-modern">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Status</th>
                      <th>Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>John Doe</td>
                      <td><span className="badge-modern badge-success">Active</span></td>
                      <td>Developer</td>
                    </tr>
                    <tr>
                      <td>Jane Smith</td>
                      <td><span className="badge-modern">Pending</span></td>
                      <td>Designer</td>
                    </tr>
                    <tr>
                      <td>Bob Wilson</td>
                      <td><span className="badge-modern badge-accent">Review</span></td>
                      <td>Manager</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div id="alerts" className="card-modern" style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '24px' }}>Alerts</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div className="alert-modern alert-success">
                    <div className="alert-icon">✓</div>
                    <span>Success! Your changes have been saved.</span>
                  </div>
                  <div className="alert-modern alert-danger">
                    <div className="alert-icon">!</div>
                    <span>Error! Something went wrong. Please try again.</span>
                  </div>
                  <div className="alert-modern alert-info">
                    <div className="alert-icon">i</div>
                    <span>Info: This is an informational message.</span>
                  </div>
                </div>
              </div>

              <div id="colors" className="card-modern" style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '24px' }}>Color Palette</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                  {[
                    { name: 'Light Blue', class: 'bg-light-blue', bg: 'linear-gradient(135deg, rgba(79, 172, 254, 0.3), rgba(0, 242, 254, 0.3))' },
                    { name: 'Deep Blue', class: 'bg-deep-blue', bg: 'linear-gradient(135deg, #667eea, #764ba2)' },
                    { name: 'Light Green', class: 'bg-light-green', bg: 'linear-gradient(135deg, rgba(17, 153, 142, 0.3), rgba(56, 239, 125, 0.3))' },
                    { name: 'Deep Green', class: 'bg-deep-green', bg: 'linear-gradient(135deg, #11998e, #38ef7d)' },
                    { name: 'Light Red', class: 'bg-light-red', bg: 'linear-gradient(135deg, rgba(240, 147, 251, 0.3), rgba(245, 87, 108, 0.3))' },
                    { name: 'Deep Red', class: 'bg-deep-red', bg: 'linear-gradient(135deg, #f093fb, #f5576c)' },
                    { name: 'White', class: 'bg-white', bg: '#ffffff' },
                    { name: 'Black', class: 'bg-black', bg: 'linear-gradient(135deg, #1a1a2e, #16213e)' }
                  ].map((color, i) => (
                    <div 
                      key={i}
                      style={{ 
                        background: color.bg,
                        padding: '20px 16px',
                        borderRadius: '12px',
                        textAlign: 'center',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        color: ['Deep Blue', 'Deep Green', 'Deep Red', 'Black'].includes(color.name) ? 'white' : 'inherit',
                        border: color.name === 'White' ? '1px solid rgba(0,0,0,0.1)' : 'none'
                      }}
                    >
                      {color.name}
                      <div style={{ fontSize: '0.7rem', opacity: 0.8, marginTop: '4px' }}>.{color.class}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div id="animations" className="card-modern">
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '24px' }}>Animations</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
                  {[
                    { name: 'Fade In', class: 'animate-fade-in', animation: 'fadeIn 1s ease infinite' },
                    { name: 'Slide In', class: 'animate-slide-in', animation: 'slideIn 1s ease infinite' },
                    { name: 'Bounce', class: 'animate-bounce', animation: 'bounce 1s ease infinite' },
                    { name: 'Pulse', class: 'animate-pulse', animation: 'pulse 1.5s ease infinite' },
                    { name: 'Spin', class: 'animate-spin', animation: 'spin 2s linear infinite' },
                    { name: 'Shake', class: 'animate-shake', animation: 'shake 0.5s ease infinite' }
                  ].map((anim, i) => (
                    <div 
                      key={i}
                      className="demo-box demo-box-primary"
                      style={{ textAlign: 'center' }}
                    >
                      <div style={{ fontSize: '0.9rem', fontWeight: '600' }}>{anim.name}</div>
                      <code style={{ fontSize: '0.7rem', opacity: 0.8 }}>.{anim.class}</code>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <code className="code-inline">.animate-duration-fast</code>
                  <code className="code-inline">.animate-duration-normal</code>
                  <code className="code-inline">.animate-duration-slow</code>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer-modern">
        <div className="container-modern">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '24px' }}>
            <div>
              <span className="logo-text" style={{ fontSize: '1.25rem' }}>Quik CSS</span>
              <p className="footer-copy" style={{ marginTop: '8px' }}>© 2025 Quik CSS. All rights reserved.</p>
            </div>
            <div style={{ display: 'flex', gap: '32px' }}>
              <a href="https://github.com/Krishna-10-7/quik-css" target="_blank" className="footer-link">GitHub</a>
              <a href="https://www.npmjs.com/package/quik-css" target="_blank" className="footer-link">NPM</a>
              <a href="#installation" className="footer-link">Documentation</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
