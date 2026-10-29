import { useEffect, useState, useRef } from 'react'
import './App.css'
import AboutMe from './pages/AboutMe'
import Projects from './pages/Projects'
import Experience from './pages/Experience'
import Contact from './pages/Contact'
import ParallaxItem from './components/ParallaxItem'
import { motion, useReducedMotion } from 'motion/react'
import HomeImpact, {
  type ImpactType,
} from './components/HomeImpact'

import Character, {
  pageExpressions,
  type CharacterExpression
} from './components/Character'

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
  const [hoveredPage, setHoveredPage] = useState<Page | null>(null)
  const [showAngry, setShowAngry] = useState(false)
  const reducedMotion = useReducedMotion()
  const [homeImpact, setHomeImpact] = useState<{
    id: number
    type: ImpactType
  } | null>(null)

  const impactId = useRef(0)

  const triggerHomeImpact = (type: ImpactType) => {
    impactId.current += 1

    setHomeImpact({
      id: impactId.current,
      type,
    })
  }

  useEffect(() => {
    if (navigationError === 0 || !selectedPage) return

    setShowAngry(true)

    const timeout = window.setTimeout(() => {
      setShowAngry(false)
    }, 350)

    return () => window.clearTimeout(timeout)
  }, [navigationError, selectedPage])

  const activeExpressionPage = selectedPage ?? hoveredPage

  const characterExpression: CharacterExpression = showAngry
    ? 'angry'
    : activeExpressionPage
      ? pageExpressions[activeExpressionPage]
      : 'neutral'

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
        
        triggerHomeImpact('type')
        
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
        ) : currentPage === 'contact me' ? (
          <Contact onBack={goHome} />
        ) : currentPage === 'experience' ? (
          <Experience onBack={goHome} />
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
            <HomeImpact impact={homeImpact}>
              <div className="home-layout">
                {PAGES.map((page) => {
                  const isSelected = selectedPage === page
                  const isHovered = hoveredPage === page

                  return (
                    <div
                      key={page}
                      className={`home-nav-position home-nav-${page.replace(/\s+/g, '-')}`}
                    >
                      <ParallaxItem
                        strength={
                          page === 'projects' ? 12 :
                          page === 'about me' ? 16 :
                          page === 'experience' ? 14 : 18
                        }
                      >
                        <motion.div
                          className="nav-pop"
                          initial={false}
                          animate={{
                            scale: isSelected
                              ? reducedMotion
                                ? 1.08
                                : [1, 1.14, 1.08]
                              : isHovered
                                ? 1.035
                                : 1,
                          }}
                          transition={
                            reducedMotion
                              ? { duration: 0 }
                              : isSelected
                                ? {
                                    duration: 0.32,
                                    times: [0, 0.55, 1],
                                    ease: 'easeOut',
                                  }
                                : {
                                    type: 'spring',
                                    stiffness: 380,
                                    damping: 19,
                                  }
                          }
                        >
                          <button
                            className={`page-link ${
                              isSelected ? 'page-link-active' : ''
                            }`}
                            onClick={() => {
                            triggerHomeImpact('click')
                            handleNavigation(page)
                          }}
                            onMouseEnter={() => setHoveredPage(page)}
                            onMouseLeave={() => setHoveredPage(null)}
                            onFocus={() => setHoveredPage(page)}
                            onBlur={() => setHoveredPage(null)}
                          >
                            <span
                              key={isSelected ? navigationError : 'idle'}
                              className={[
                                'page-label',
                                isSelected && navigationError > 0
                                  ? 'navigation-error'
                                  : '',
                              ].join(' ')}
                            >
                              {page.split('').map((character, index) => (
                                <span
                                  key={index}
                                  className={[
                                    isSelected
                                      ? index < navigationTyped.length
                                        ? 'correct'
                                        : 'untyped'
                                      : '',
                                    isSelected &&
                                    index === navigationTyped.length
                                      ? 'current'
                                      : '',
                                  ].join(' ')}
                                >
                                  {character === ' ' ? '\u00A0' : character}
                                </span>
                              ))}
                            </span>
                          </button>
                        </motion.div>
                      </ParallaxItem>
                    </div>
                  )
                })}


                <div className="home-character">
                  <ParallaxItem strength={22}>
                    <Character expression={characterExpression} />
                  </ParallaxItem>
                </div>
                </div>
              </HomeImpact>
            </div>
        )}

    </main>
  )
}

export default App
