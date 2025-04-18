import { useState, useEffect } from 'react'

function App() {
  const [theme, setTheme] = useState(() => {
    // Check localStorage first
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) return savedTheme
    
    // Then check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }
    
    // Default to light
    return 'light'
  })

  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    // Set initial theme
    document.documentElement.setAttribute('data-theme', theme)
    
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e) => {
      const newTheme = e.matches ? 'dark' : 'light'
      setTheme(newTheme)
      document.documentElement.setAttribute('data-theme', newTheme)
      localStorage.setItem('theme', newTheme)
    }
    
    // Add scroll listener
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300)
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
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <div className="bg-white">
      {/* Back to Top Button */}
      {showBackToTop && (
        <button 
          onClick={scrollToTop}
          style={{ 
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            width: '40px',
            height: '40px',
            backgroundColor: '#0000ff',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}
        >
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 16 16" 
            fill="currentColor"
          >
            <path d="M8 4.5l6 6H2z"/>
          </svg>
        </button>
      )}

      {/* Header */}
      <header className="navbar p-2 border-b-thin sticky">
        <nav className="container flex space-between align-center">
          <a href="#" className="nav-link font-black fw-thick big-font">Quik CSS</a>
          <div className="flex align-center">
            <button 
              className="theme-toggle mr-2" 
              id="themeToggle" 
              aria-label="Toggle Dark Mode" 
              onClick={toggleTheme}
              style={{
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px'
              }}
            >
              <svg className={`sun-icon ${theme === 'light' ? 'opacity-100' : 'opacity-0'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
              <svg className={`moon-icon ${theme === 'dark' ? 'opacity-100' : 'opacity-0'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            </button>
            <a href="#" className="btn btn-primary" style={{ borderRadius: theme === 'dark' ? '0.25rem' : 'inherit' }}>Download</a>
            <a href="https://github.com/Krishna-10-7/quik-css" className="nav-link ml-2 hide-mobile">
              <svg height="24" viewBox="0 0 16 16" width="24" className="ml-2">
                <path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
              </svg>
        </a>
      </div>
        </nav>
      </header>

      <div className="container py-4">
        <div className="flex flex-mobile-col">
          {/* Sidebar */}
          <aside className="w-20p w-100p-mobile pr-4 pr-0-mobile">
            <nav className="sticky">
              <ul className="flex-col row-gap-2">
                <li className="fw-thick text-white">Getting Started</li>
                <li><a href="#installation" className="nav-link" style={{ color: theme === 'dark' ? '#e0e0e0' : 'inherit' }}>Installation</a></li>
                <li><a href="#usage" className="nav-link" style={{ color: theme === 'dark' ? '#e0e0e0' : 'inherit' }}>Usage</a></li>
                
                <li className="fw-thick mt-4" style={{ color: theme === 'dark' ? '#e0e0e0' : 'inherit' }}>Layout</li>
                <li><a href="#container" className="nav-link" style={{ color: theme === 'dark' ? '#e0e0e0' : 'inherit' }}>Container</a></li>
                <li><a href="#display" className="nav-link" style={{ color: theme === 'dark' ? '#e0e0e0' : 'inherit' }}>Display</a></li>
                <li><a href="#flex" className="nav-link" style={{ color: theme === 'dark' ? '#e0e0e0' : 'inherit' }}>Flexbox</a></li>
                <li><a href="#grid" className="nav-link" style={{ color: theme === 'dark' ? '#e0e0e0' : 'inherit' }}>Grid</a></li>
                
                <li className="fw-thick mt-4" style={{ color: theme === 'dark' ? '#e0e0e0' : 'inherit' }}>Spacing</li>
                <li><a href="#margin" className="nav-link" style={{ color: theme === 'dark' ? '#e0e0e0' : 'inherit' }}>Margin</a></li>
                <li><a href="#padding" className="nav-link" style={{ color: theme === 'dark' ? '#e0e0e0' : 'inherit' }}>Padding</a></li>
                
                <li className="fw-thick mt-4" style={{ color: theme === 'dark' ? '#e0e0e0' : 'inherit' }}>Sizing</li>
                <li><a href="#width" className="nav-link" style={{ color: theme === 'dark' ? '#e0e0e0' : 'inherit' }}>Width</a></li>
                <li><a href="#height" className="nav-link" style={{ color: theme === 'dark' ? '#e0e0e0' : 'inherit' }}>Height</a></li>
                
                <li className="fw-thick mt-4" style={{ color: theme === 'dark' ? '#e0e0e0' : 'inherit' }}>Typography</li>
                <li><a href="#fonts" className="nav-link" style={{ color: theme === 'dark' ? '#e0e0e0' : 'inherit' }}>Font Size</a></li>
                <li><a href="#font-weight" className="nav-link" style={{ color: theme === 'dark' ? '#e0e0e0' : 'inherit' }}>Font Weight</a></li>
                <li><a href="#text-align" className="nav-link" style={{ color: theme === 'dark' ? '#e0e0e0' : 'inherit' }}>Text Align</a></li>
                
                <li className="fw-thick mt-4" style={{ color: theme === 'dark' ? '#e0e0e0' : 'inherit' }}>Borders</li>
                <li><a href="#border-width" className="nav-link" style={{ color: theme === 'dark' ? '#e0e0e0' : 'inherit' }}>Border Width</a></li>
                <li><a href="#border-style" className="nav-link" style={{ color: theme === 'dark' ? '#e0e0e0' : 'inherit' }}>Border Style</a></li>
                
                <li className="fw-thick mt-4" style={{ color: theme === 'dark' ? '#e0e0e0' : 'inherit' }}>Components</li>
                <li><a href="#buttons" className="nav-link" style={{ color: theme === 'dark' ? '#e0e0e0' : 'inherit' }}>Buttons</a></li>
                <li><a href="#forms" className="nav-link" style={{ color: theme === 'dark' ? '#e0e0e0' : 'inherit' }}>Forms</a></li>
                <li><a href="#tables" className="nav-link" style={{ color: theme === 'dark' ? '#e0e0e0' : 'inherit' }}>Tables</a></li>
                <li><a href="#alerts" className="nav-link" style={{ color: theme === 'dark' ? '#e0e0e0' : 'inherit' }}>Alerts</a></li>
              </ul>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="w-80p w-100p-mobile">
            {/* Getting Started */}
            <section id="installation" className="mb-4">
              <h1 className="main-heading mb-4">Getting Started with Quik CSS</h1>
              
              <div className="card p-4 mb-4">
                <h2 id="npm" className="medium-heading mb-2">NPM Installation</h2>
                <div className="bg-light-blue p-2 border-thin">
                  <code>npm install quik-css</code>
                </div>
              </div>

              <div className="card p-4">
                <h2 id="link" className="medium-heading mb-2">CDN Link</h2>
                <div className="bg-light-blue p-2 border-thin">
                  <code>&lt;link rel="stylesheet" href="https://Krishna-10-7.github.io/quik-css/styles.css"&gt;</code>
                </div>
              </div>
            </section>

            {/* Layout Section */}
            <section id="layout" className="mb-4">
              <h2 className="main-heading mb-4">Layout</h2>

              {/* Container */}
              <div id="container" className="card p-4 mb-4">
                <h3 className="medium-heading mb-2">Container</h3>
                <div className="bg-light-blue p-2 border-thin mb-2">
                  <div className="container border-thin p-2">
                    <p>Default Container</p>
                  </div>
                </div>
                <div className="bg-light-blue p-2 border-thin">
                  <div className="container-lg border-thin p-2">
                    <p>Large Container</p>
                  </div>
                </div>
              </div>

              {/* Flexbox */}
              <div id="flex" className="card p-4 mb-4">
                <h3 className="medium-heading mb-2">Flexbox</h3>
                <div className="flex space-between mb-2">
                  <div className="p-2 bg-light-blue border-thin">Flex Item 1</div>
                  <div className="p-2 bg-light-blue border-thin">Flex Item 2</div>
                  <div className="p-2 bg-light-blue border-thin">Flex Item 3</div>
                </div>
                <div className="flex-col">
                  <div className="p-2 bg-light-green border-thin mb-1">Column Item 1</div>
                  <div className="p-2 bg-light-green border-thin">Column Item 2</div>
                </div>
              </div>

              {/* Grid */}
              <div id="grid" className="card p-4">
                <h3 className="medium-heading mb-2">Grid</h3>
                <div className="grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                  <div className="p-2 bg-light-red border-thin">Grid Item 1</div>
                  <div className="p-2 bg-light-red border-thin">Grid Item 2</div>
                  <div className="p-2 bg-light-red border-thin">Grid Item 3</div>
                </div>
              </div>
            </section>

            {/* Typography Section */}
            <section id="typography" className="mb-4">
              <h2 className="main-heading mb-4">Typography</h2>
              
              <div className="card p-4">
                <h3 id="fonts" className="medium-heading mb-2">Font Sizes</h3>
                <div className="flex-col row-gap-2">
                  <p className="tiny-font">Tiny Font (.tiny-font)</p>
                  <p className="normal-font">Normal Font (.normal-font)</p>
                  <p className="big-font">Big Font (.big-font)</p>
                  <p className="small-heading">Small Heading (.small-heading)</p>
                  <p className="medium-heading">Medium Heading (.medium-heading)</p>
                  <p className="main-heading">Main Heading (.main-heading)</p>
                </div>

                <h3 id="font-weight" className="medium-heading mb-2 mt-4">Font Weights</h3>
                <div className="flex space-between">
                  <p className="fw-thin">Thin Weight</p>
                  <p className="fw-normal">Normal Weight</p>
                  <p className="fw-thick">Thick Weight</p>
                  <p className="fw-extra-thick">Extra Thick</p>
                </div>

                <h3 id="text-align" className="medium-heading mb-2 mt-4">Text Alignment</h3>
                <div className="grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                  <p className="font-left bg-light-blue p-2">Left Aligned</p>
                  <p className="font-center bg-light-blue p-2">Center Aligned</p>
                  <p className="font-right bg-light-blue p-2">Right Aligned</p>
                </div>
              </div>
            </section>

            {/* Colors Section */}
            <section id="colors" className="mb-4">
              <h2 className="main-heading mb-4">Colors</h2>
              
              <div className="card p-4">
                <h3 className="medium-heading mb-4">Background Colors</h3>
                <div className="grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                  <div className="p-2 bg-white border-thin">White</div>
                  <div className="p-2 bg-black font-white">Black</div>
                  <div className="p-2 bg-light-red">Light Red</div>
                  <div className="p-2 bg-deep-red font-white">Deep Red</div>
                  <div className="p-2 bg-light-green">Light Green</div>
                  <div className="p-2 bg-deep-green font-white">Deep Green</div>
                  <div className="p-2 bg-light-blue">Light Blue</div>
                  <div className="p-2 bg-deep-blue font-white">Deep Blue</div>
                </div>

                <h3 className="medium-heading mb-2 mt-4">Text Colors</h3>
                <div className="grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                  <p className="font-black">Black Text</p>
                  <p className="font-red">Red Text</p>
                  <p className="font-green">Green Text</p>
                  <p className="font-blue">Blue Text</p>
                </div>
              </div>
            </section>

            {/* Spacing Section */}
            <section id="spacing" className="mb-4">
              <h2 className="main-heading mb-4">Spacing</h2>
              
              {/* Margin */}
              <div id="margin" className="card p-4 mb-4">
                <h3 className="medium-heading mb-4">Margin</h3>
                
                <h4 className="normal-font fw-thick mb-4">Top</h4>
                <div className="flex space-between mb-4" style={{ width: '100%', background: 'var(--card-bg)', padding: '20px' }}>
                  <div className="flex-col">
                    <span style={{ textAlign: 'center' }}>↑</span>
                    <div className="bg-light-blue p-2 mt-4">.mt-4</div>
                  </div>
                  <div className="flex-col">
                    <span style={{ textAlign: 'center' }}>↑</span>
                    <div className="bg-light-blue p-2 mt-3">.mt-3</div>
                  </div>
                  <div className="flex-col">
                    <span style={{ textAlign: 'center' }}>↑</span>
                    <div className="bg-light-blue p-2 mt-2">.mt-2</div>
                  </div>
                  <div className="flex-col">
                    <span style={{ textAlign: 'center' }}>↑</span>
                    <div className="bg-light-blue p-2 mt-1">.mt-1</div>
                  </div>
                  <div className="flex-col">
                    <span style={{ textAlign: 'center' }}>↑</span>
                    <div className="bg-light-blue p-2 mt-0">.mt-0</div>
                  </div>
                </div>

                <h4 className="normal-font fw-thick mb-4 mt-4">Bottom</h4>
                <div className="flex space-between mb-4" style={{ width: '100%', background: 'var(--card-bg)', padding: '20px' }}>
                  <div className="flex-col">
                    <div className="bg-light-blue p-2 mb-4">.mb-4</div>
                    <span style={{ textAlign: 'center' }}>↓</span>
                  </div>
                  <div className="flex-col">
                    <div className="bg-light-blue p-2 mb-3">.mb-3</div>
                    <span style={{ textAlign: 'center' }}>↓</span>
                  </div>
                  <div className="flex-col">
                    <div className="bg-light-blue p-2 mb-2">.mb-2</div>
                    <span style={{ textAlign: 'center' }}>↓</span>
                  </div>
                  <div className="flex-col">
                    <div className="bg-light-blue p-2 mb-1">.mb-1</div>
                    <span style={{ textAlign: 'center' }}>↓</span>
                  </div>
                  <div className="flex-col">
                    <div className="bg-light-blue p-2 mb-0">.mb-0</div>
                    <span style={{ textAlign: 'center' }}>↓</span>
                  </div>
                </div>

                <h4 className="normal-font fw-thick mb-4 mt-4">Left</h4>
                <div style={{ width: '100%', background: 'var(--card-bg)', padding: '20px' }}>
                  <div className="flex-col row-gap-2">
                    <div className="flex">
                      <span className="mr-2">←</span>
                      <div className="bg-light-blue p-2 ml-4">.ml-4</div>
                    </div>
                    <div className="flex">
                      <span className="mr-2">←</span>
                      <div className="bg-light-blue p-2 ml-3">.ml-3</div>
                    </div>
                    <div className="flex">
                      <span className="mr-2">←</span>
                      <div className="bg-light-blue p-2 ml-2">.ml-2</div>
                    </div>
                    <div className="flex">
                      <span className="mr-2">←</span>
                      <div className="bg-light-blue p-2 ml-1">.ml-1</div>
                    </div>
                    <div className="flex">
                      <span className="mr-2">←</span>
                      <div className="bg-light-blue p-2 ml-0">.ml-0</div>
                    </div>
                  </div>
                </div>

                <h4 className="normal-font fw-thick mb-4 mt-4">Right</h4>
                <div style={{ width: '100%', background: 'var(--card-bg)', padding: '20px' }}>
                  <div className="flex-col row-gap-2">
                    <div className="flex">
                      <div className="bg-light-blue p-2 mr-4">.mr-4</div>
                      <span className="ml-2">→</span>
                    </div>
                    <div className="flex">
                      <div className="bg-light-blue p-2 mr-3">.mr-3</div>
                      <span className="ml-2">→</span>
                    </div>
                    <div className="flex">
                      <div className="bg-light-blue p-2 mr-2">.mr-2</div>
                      <span className="ml-2">→</span>
                    </div>
                    <div className="flex">
                      <div className="bg-light-blue p-2 mr-1">.mr-1</div>
                      <span className="ml-2">→</span>
                    </div>
                    <div className="flex">
                      <div className="bg-light-blue p-2 mr-0">.mr-0</div>
                      <span className="ml-2">→</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Padding */}
              <div id="padding" className="card p-4">
                <h3 className="medium-heading mb-4">Padding</h3>
                
                <h4 className="normal-font fw-thick mb-2">All Sides (p-*)</h4>
                <div className="flex space-between mb-4">
                  <div className="bg-light-blue border-thin p-0">p-0</div>
                  <div className="bg-light-blue border-thin p-1">p-1</div>
                  <div className="bg-light-blue border-thin p-2">p-2</div>
                  <div className="bg-light-blue border-thin p-3">p-3</div>
                  <div className="bg-light-blue border-thin p-4">p-4</div>
                </div>

                <h4 className="normal-font fw-thick mb-2">Vertical Padding (py-*)</h4>
                <div className="flex-col mb-4">
                  <div className="bg-light-green border-thin py-1 w-100p">py-1</div>
                  <div className="bg-light-green border-thin py-2 w-100p">py-2</div>
                  <div className="bg-light-green border-thin py-3 w-100p">py-3</div>
                </div>

                <h4 className="normal-font fw-thick mb-2">Horizontal Padding (px-*)</h4>
                <div className="flex mb-4">
                  <div className="bg-light-red border-thin px-1">px-1</div>
                  <div className="bg-light-red border-thin px-2">px-2</div>
                  <div className="bg-light-red border-thin px-3">px-3</div>
                </div>

                <h4 className="normal-font fw-thick mb-2">Individual Sides</h4>
                <div className="grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                  <div className="bg-light-blue border-thin pt-2">pt-2 (top)</div>
                  <div className="bg-light-blue border-thin pb-2">pb-2 (bottom)</div>
                  <div className="bg-light-blue border-thin pl-2">pl-2 (left)</div>
                  <div className="bg-light-blue border-thin pr-2">pr-2 (right)</div>
                </div>
              </div>
            </section>

            {/* Sizing Section */}
            <section id="sizing" className="mb-4">
              <h2 className="main-heading mb-4">Sizing</h2>

              {/* Width */}
              <div id="width" className="card p-4 mb-4">
                <h3 className="medium-heading mb-4">Width</h3>
                
                <h4 className="normal-font fw-thick mb-2">Percentage Widths</h4>
                <div className="flex-col row-gap-2">
                  <div className="bg-light-blue p-2 w-100p">w-100p (100%)</div>
                  <div className="bg-light-blue p-2 w-90p">w-90p (90%)</div>
                  <div className="bg-light-blue p-2 w-80p">w-80p (80%)</div>
                  <div className="bg-light-blue p-2 w-70p">w-70p (70%)</div>
                  <div className="bg-light-blue p-2 w-60p">w-60p (60%)</div>
                  <div className="bg-light-blue p-2 w-50p">w-50p (50%)</div>
                  <div className="bg-light-blue p-2 w-40p">w-40p (40%)</div>
                  <div className="bg-light-blue p-2 w-30p">w-30p (30%)</div>
                  <div className="bg-light-blue p-2 w-20p">w-20p (20%)</div>
                  <div className="bg-light-blue p-2 w-10p">w-10p (10%)</div>
                </div>

                <h4 className="normal-font fw-thick mb-2">Fixed Widths</h4>
                <div className="flex-col row-gap-2" style={{ width: '100%', background: 'var(--card-bg)', padding: '20px' }}>
                  <div className="bg-light-green p-2 w-1 border-thin" style={{ display: 'inline-block' }}>w-1 </div>
                  <div className="bg-light-green p-2 w-2 border-thin" style={{ display: 'inline-block' }}>w-2 </div>
                  <div className="bg-light-green p-2 w-3 border-thin" style={{ display: 'inline-block' }}>w-3 </div>
                  <div className="bg-light-green p-2 w-4 border-thin" style={{ display: 'inline-block' }}>w-4 </div>
                </div>
              </div>

              {/* Height */}
              <div id="height" className="card p-4">
                <h3 className="medium-heading mb-4">Height</h3>
                
                <h4 className="normal-font fw-thick mb-2">Percentage Heights</h4>
                <div className="flex space-between" style={{ height: '300px', background: 'var(--card-bg)', padding: '20px' }}>
                  <div className="bg-light-red p-2 w-10p h-100p">h-100p</div>
                  <div className="bg-light-red p-2 w-10p h-80p">h-80p</div>
                  <div className="bg-light-red p-2 w-10p h-60p">h-60p</div>
                  <div className="bg-light-red p-2 w-10p h-40p">h-40p</div>
                  <div className="bg-light-red p-2 w-10p h-20p">h-20p</div>
                </div>

                <h4 className="normal-font fw-thick mb-2 mt-4">Fixed Heights</h4>
                <div className="flex space-between" style={{ width: '100%', background: 'var(--card-bg)', padding: '20px' }}>
                  <div className="bg-light-green p-2 h-1 border-thin w-20p">h-1 (10px)</div>
                  <div className="bg-light-green p-2 h-2 border-thin w-20p">h-2 (50px)</div>
                  <div className="bg-light-green p-2 h-3 border-thin w-20p">h-3 (100px)</div>
                  <div className="bg-light-green p-2 h-4 border-thin w-20p">h-4 (200px)</div>
                </div>

                <h4 className="normal-font fw-thick mb-2 mt-4">Special Heights</h4>
                <div className="bg-light-green p-2 mb-2">h-screen (100vh)</div>
              </div>
            </section>

            {/* Components Section */}
            <section id="components" className="mb-4">
              <h2 className="main-heading mb-4">Components</h2>

              {/* Buttons */}
              <div id="buttons" className="card p-4 mb-4">
                <h3 className="medium-heading mb-2">Buttons</h3>
                <div className="flex space-between">
                  <button className="btn btn-primary">Primary Button</button>
                  <button className="btn btn-secondary">Secondary Button</button>
                  <button className="btn" disabled>Disabled Button</button>
                </div>
              </div>

              {/* Forms */}
              <div id="forms" className="card p-4 mb-4">
                <h3 className="medium-heading mb-2">Forms</h3>
                <form className="form-group">
                  <div className="mb-2">
                    <label className="form-label">Text Input</label>
                    <input type="text" className="form-control" placeholder="Enter text" />
                  </div>
                  
                  <div className="mb-2">
                    <label className="form-label">Textarea</label>
                    <textarea className="form-control" placeholder="Enter message"></textarea>
                  </div>
                  
                  <button type="submit" className="btn btn-primary">Submit</button>
                </form>
              </div>

              {/* Tables */}
              <div id="tables" className="card p-4 mb-4">
                <h3 className="medium-heading mb-2">Tables</h3>
                <table className="normal-table w-100p">
                  <thead>
                    <tr>
                      <th>Header 1</th>
                      <th>Header 2</th>
                      <th>Header 3</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Row 1, Cell 1</td>
                      <td>Row 1, Cell 2</td>
                      <td>Row 1, Cell 3</td>
                    </tr>
                    <tr>
                      <td>Row 2, Cell 1</td>
                      <td>Row 2, Cell 2</td>
                      <td>Row 2, Cell 3</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Alerts */}
              <div id="alerts" className="card p-4 mb-4">
                <h3 className="medium-heading mb-2">Alerts</h3>
                <div className="alert bg-light-red mb-2">This is a danger alert</div>
                <div className="alert bg-light-green mb-2">This is a success alert</div>
                <div className="alert bg-light-blue">This is an info alert</div>
              </div>

              {/* Dark Mode */}
              <div id="dark-mode" className="card p-4">
                <h3 className="medium-heading mb-2">Dark Mode</h3>
                <div className="flex space-between mb-4">
                  <button className="btn btn-primary" id="darkModeToggle" onClick={toggleTheme}>Toggle Dark Mode</button>
                  <div className="flex">
                    <span className="mr-2">Light</span>
                    <div className="toggle-switch">
                      <input type="checkbox" id="darkModeCheckbox" checked={theme === 'dark'} onChange={toggleTheme} />
                      <label htmlFor="darkModeCheckbox"></label>
                    </div>
                    <span className="ml-2">Dark</span>
                  </div>
                </div>
                
                <div className="dark-mode-demo p-4 border-thin">
                  <h4 className="normal-font mb-2">Dark Mode Demo</h4>
                  <p>This section shows how components look in dark mode.</p>
                  <div className="flex space-between mt-4">
                    <button className="btn btn-primary">Primary Button</button>
                    <button className="btn btn-secondary">Secondary Button</button>
                  </div>
                  <div className="alert bg-light-red mt-4">Dark Mode Alert</div>
                </div>
              </div>

              {/* Animations */}
              <div id="animations" className="card p-4 mb-4">
                <h3 className="medium-heading mb-4">Animations</h3>
                
                {/* Basic Animations */}
                <div className="mb-6">
                  <h4 className="normal-font fw-thick mb-4">Basic Animations</h4>
                  <div className="grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                    <div className="card p-4 text-center animate-fade-in">
                      <h5 className="mb-2">Fade In</h5>
                      <div className="bg-light-blue p-4 rounded">.animate-fade-in</div>
                    </div>
                    <div className="card p-4 text-center animate-slide-in">
                      <h5 className="mb-2">Slide In</h5>
                      <div className="bg-light-green p-4 rounded">.animate-slide-in</div>
                    </div>
                    <div className="card p-4 text-center animate-bounce">
                      <h5 className="mb-2">Bounce</h5>
                      <div className="bg-light-red p-4 rounded">.animate-bounce</div>
                    </div>
                    <div className="card p-4 text-center animate-pulse">
                      <h5 className="mb-2">Pulse</h5>
                      <div className="bg-light-blue p-4 rounded">.animate-pulse</div>
                    </div>
                    <div className="card p-4 text-center animate-spin">
                      <h5 className="mb-2">Spin</h5>
                      <div className="bg-light-green p-4 rounded">.animate-spin</div>
                    </div>
                    <div className="card p-4 text-center animate-shake">
                      <h5 className="mb-2">Shake</h5>
                      <div className="bg-light-red p-4 rounded">.animate-shake</div>
                    </div>
                  </div>
                </div>

                {/* Animation Properties */}
                <div className="mb-6">
                  <h4 className="normal-font fw-thick mb-4">Animation Properties</h4>
                  <div className="grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                    <div className="card p-4">
                      <h5 className="mb-2">Duration</h5>
                      <div className="flex-col row-gap-2">
                        <div className="bg-light-blue p-2 animate-fade-in animate-duration-fast">.animate-duration-fast (0.3s)</div>
                        <div className="bg-light-blue p-2 animate-fade-in animate-duration-normal">.animate-duration-normal (0.5s)</div>
                        <div className="bg-light-blue p-2 animate-fade-in animate-duration-slow">.animate-duration-slow (1s)</div>
                      </div>
                    </div>
                    <div className="card p-4">
                      <h5 className="mb-2">Timing Functions</h5>
                      <div className="flex-col row-gap-2">
                        <div className="bg-light-green p-2 animate-fade-in animate-ease">.animate-ease</div>
                        <div className="bg-light-green p-2 animate-fade-in animate-ease-in">.animate-ease-in</div>
                        <div className="bg-light-green p-2 animate-fade-in animate-ease-out">.animate-ease-out</div>
                        <div className="bg-light-green p-2 animate-fade-in animate-ease-in-out">.animate-ease-in-out</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Animation Combinations */}
                <div>
                  <h4 className="normal-font fw-thick mb-4">Animation Combinations</h4>
                  <div className="grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                    <div className="card p-4">
                      <h5 className="mb-2">Fade + Slide</h5>
                      <div className="bg-light-blue p-4 rounded animate-fade-in animate-slide-in animate-duration-normal">
                        .animate-fade-in.animate-slide-in
                      </div>
                    </div>
                    <div className="card p-4">
                      <h5 className="mb-2">Bounce + Pulse</h5>
                      <div className="bg-light-green p-4 rounded animate-bounce animate-pulse animate-duration-slow">
                        .animate-bounce.animate-pulse
                      </div>
                    </div>
                    <div className="card p-4">
                      <h5 className="mb-2">Spin + Shake</h5>
                      <div className="bg-light-red p-4 rounded animate-spin animate-shake animate-duration-fast">
                        .animate-spin.animate-shake
                      </div>
                    </div>
                    <div className="card p-4">
                      <h5 className="mb-2">Custom Combination</h5>
                      <div className="bg-light-blue p-4 rounded animate-fade-in animate-slide-in animate-bounce animate-duration-normal animate-ease-in-out">
                        Multiple Animations
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="p-4 bg-black font-white mt-4">
        <div className="container">
          <div className="flex space-between">
            <p>© 2025 Quik CSS. All rights reserved.</p>
            <div className="flex">
              <a href="#" className="nav-link font-white">Documentation</a>
              <a href="#" className="nav-link font-white ml-2">GitHub</a>
              <a href="#" className="nav-link font-white ml-2">NPM</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
