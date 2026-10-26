import { useEffect, useState } from 'react'
import './App.css'
import AboutMe from './pages/AboutMe'
import Projects from './pages/Projects'

const NAME = 'ela aquino'
const PAGES = ['about me', 'projects', 'experience', 'contact me'] as const

type Page = (typeof PAGES)[number]


function App() {
  const [typed, setTyped] = useState('')
  const [errorCount, setErrorCount] = useState(0)
  const [entered, setEntered] = useState(false)
  const [typingNavigation, setTypingNavigation] = useState(true)
  const [currentPage, setCurrentPage] = useState<Page | null>(null)
  const [selectedPage, setSelectedPage] = useState<Page | null>(null)
  const [navigationTyped, setNavigationTyped] = useState('')
  const [navigationError, setNavigationError] = useState(0)

  function handleNavigation(page: Page) {
    if (!typingNavigation) {
      setCurrentPage(page)
      return
    }

    if (selectedPage === page) {
      setSelectedPage(null)
      setNavigationTyped('')
      return
    }

    setSelectedPage(page)
    setNavigationTyped('')
    setNavigationError(0)
  }

  function openPage(page: Page) {
    setCurrentPage(page)
    setSelectedPage(null)
    setNavigationTyped('')
  }

  function goHome() {
    setCurrentPage(null)
    setSelectedPage(null)
    setNavigationTyped('')
  }
  
  useEffect(() => {
    if (entered) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.ctrlKey || event.metaKey || event.altKey) return

      if (event.key === 'Backspace') {
        event.preventDefault()
        setTyped(previous => previous.slice(0, -1))
        return
      }

      if (event.key.length !== 1) return

      event.preventDefault()

      const expected = NAME[typed.length]

      if (event.key.toLowerCase() === expected) {
        const next = typed + event.key.toLowerCase()
        setTyped(next)

        if (next === NAME) {
          setEntered(true)
        }
      } else {
        setErrorCount(previous => previous + 1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [typed, entered])

  useEffect(() => {
    if (!selectedPage || !entered) return

    function handleNavigationKeyDown(event: KeyboardEvent) {
      if (event.ctrlKey || event.metaKey || event.altKey) return
      if (event.repeat) return

      if (event.key === 'Escape') {
        setSelectedPage(null)
        setNavigationTyped('')
        return
      }

      if (event.key === 'Backspace') {
        event.preventDefault()
        setNavigationTyped(previous => previous.slice(0, -1))
        return
      }

      if (event.key.length !== 1) return

      event.preventDefault()

      const expected = selectedPage![navigationTyped.length]

      if (event.key.toLowerCase() === expected) {
        const next = navigationTyped + event.key.toLowerCase()
        setNavigationTyped(next)

        if (next === selectedPage) {
          openPage(selectedPage!)
        }
      } else {
        setNavigationError(previous => previous + 1)
      }
    }

  window.addEventListener('keydown', handleNavigationKeyDown)

  return () => {
    window.removeEventListener('keydown', handleNavigationKeyDown)
  }
}, [selectedPage, navigationTyped, entered])

  return (
    <main className="intro">
      {!entered ? (
        <div className="intro-content">
          <p className="intro-prompt">
            type my name to enter
          </p>

          <h1
            key={errorCount}
            className={`intro-name ${errorCount > 0 ? 'name-error' : ''}`}
          >
            {NAME.split('').map((character, index) => (
              <span
                key={index}
                className={[
                  index < typed.length ? 'correct' : 'untyped',
                  index === typed.length ? 'current' : ''
                ].join(' ')}
              >
                {character === ' ' ? '\u00A0' : character}
              </span>
            ))}
          </h1>

          <p className="intro-hint">
            start typing anywhere
          </p>
        </div>
        ) : currentPage === 'about me' ? (
          <AboutMe onBack={goHome} />
        ) : currentPage === 'projects' ? (
          <Projects onBack={goHome} />
        ) : currentPage ? (
          <div className="content-page">
            <button className="back-button" onClick={goHome}>
              ← back home
            </button>

            <h1>{currentPage}</h1>
            <p>coming soon ♡</p>
          </div>
        ) : (
        <div className="homepage">
          <div className="typing-toggle">
            <label htmlFor="typing-navigation">
              typing navigation
            </label>
            <input
              id="typing-navigation"
              type="checkbox"
              checked={typingNavigation}
              onChange={() => setTypingNavigation(!typingNavigation)}
            />
          </div>

          <h1 className="welcome-title">welcome!</h1>

            <div className="homepage-content">
              
            
            <nav className="page-navigation">
              {PAGES.map((page, index) => (
                <button
                  key={page}
                  className={`page-link ${
                    selectedPage === page ? 'page-link-active' : ''
                  }`}
                  onClick={() => handleNavigation(page)}
                >
                  <span className="page-number">
                    0{index + 1}.
                  </span>

                  <span
                    key={selectedPage === page ? navigationError : 'idle'}
                    className={[
                      'page-label',
                      selectedPage === page && navigationError > 0
                        ? 'navigation-error'
                        : ''
                    ].join(' ')}
                  >
                    {page.split('').map((character, characterIndex) => (
                      <span
                        key={characterIndex}
                        className={[
                          selectedPage === page
                            ? characterIndex < navigationTyped.length
                              ? 'correct'
                              : 'untyped'
                            : '',
                          selectedPage === page &&
                          characterIndex === navigationTyped.length
                            ? 'current'
                            : ''
                        ].join(' ')}
                      >
                        {character === ' ' ? '\u00A0' : character}
                      </span>
                    ))}
                  </span>
                </button>
              ))}
            </nav>


              <div className="profile-section">
                <div className="profile-image">
                  <img
                    src="/profile.jpg"
                    alt="Ela Aquino"
                  />
                </div>

                <p className="profile-caption">
                  can you tell my favorite color is red?
                </p>
              </div>
            </div>
          </div>
        )}

    </main>
  )
}

export default App
