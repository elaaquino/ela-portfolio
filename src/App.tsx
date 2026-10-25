import { useEffect, useState } from 'react'
import './App.css'

const NAME = 'ela aquino'

function App() {
  const [typed, setTyped] = useState('')
  const [errorCount, setErrorCount] = useState(0)
  const [entered, setEntered] = useState(false)
  const [typingNavigation, setTypingNavigation] = useState(true)

  function handleNavigation(page: string) {
    if (typingNavigation) {
      // We'll implement the typing prompt next.
      console.log('Type to navigate:', page)
    } else {
      // We'll implement the actual pages next.
      console.log('Navigate to:', page)
    }
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
                {['about me', 'projects', 'experience', 'contact me'].map(
                  (page, index) => (
                    <button
                      key={page}
                      className="page-link"
                      onClick={() => handleNavigation(page)}
                    >
                      <span className="page-number">
                        0{index + 1}.
                      </span>
                      <span>{page}</span>
                    </button>
                  )
                )}
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
