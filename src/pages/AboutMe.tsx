import { useEffect, useState } from 'react'
import './AboutMe.css'

type AboutMeProps = {
  onBack: () => void
}

const photos = [
  {
    src: '/photos/headshot.jpg',
    alt: 'Portrait of Ela',
    caption: 'hello, world! ♡',
  },
  {
    src: '/photos/hackathon.jpg',
    alt: 'Ela attending a hackathon',
    caption: 'building things at hackathons',
  },
  {
    src: '/photos/google.jpg',
    alt: 'Ela visiting Google',
    caption: 'a little adventure at Google',
  },
  {
    src: '/photos/nvidia.jpg',
    alt: 'Ela visiting NVIDIA',
    caption: 'exploring the world of tech',
  },
]

function AboutMe({ onBack }: AboutMeProps) {
  const [currentPhoto, setCurrentPhoto] = useState(0)
  const [paused, setPaused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(media.matches)

    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (paused || reducedMotion) return

    const interval = window.setInterval(() => {
      setCurrentPhoto(previous => (previous + 1) % photos.length)
    }, 5000)

    return () => window.clearInterval(interval)
  }, [paused, reducedMotion])

  function nextPhoto() {
    setCurrentPhoto(previous => (previous + 1) % photos.length)
  }

  function previousPhoto() {
    setCurrentPhoto(previous =>
      (previous - 1 + photos.length) % photos.length
    )
  }

  return (
    <div className="about-page">
      <button className="about-back" onClick={onBack}>
        ← back home
      </button>

      <h1 className="about-title">about me_</h1>

      <div className="about-layout">
        <section className="about-text">
          <div className="about-section">
            <h2>01 / my story</h2>
            <p>
              Write about yourself here! Introduce your background,
              your experiences, and what originally sparked your
              interest in technology.
            </p>
          </div>

          <div className="about-section">
            <h2>02 / what drives me</h2>
            <p>
              Talk about your goals, what you hope to accomplish,
              and the kinds of opportunities or projects you're
              excited to pursue.
            </p>
          </div>

          <div className="about-section">
            <h2>03 / beyond the screen</h2>
            <p>
              Share your hobbies, interests, and the things you
              enjoy doing outside of programming.
            </p>
          </div>

          <div className="about-section">
            <h2>04 / one last thing</h2>
            <p>
              Add a short closing statement here. This could be
              something personal, funny, or memorable!
            </p>
          </div>
        </section>

        <section
          className="about-gallery"
          aria-label="About me photo gallery"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={event => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setPaused(false)
            }
          }}
        >
          <div className="about-photo-frame">
            <img
              key={currentPhoto}
              src={photos[currentPhoto].src}
              alt={photos[currentPhoto].alt}
              className={`about-photo ${reducedMotion ? '' : 'photo-enter'}`}
            />
          </div>

          <p className="about-photo-caption" aria-live="off">
            {photos[currentPhoto].caption}
          </p>

          <div className="about-carousel-controls">
            <button
              className="carousel-arrow"
              onClick={previousPhoto}
              aria-label="Previous photo"
            >
              ‹
            </button>

            <div className="carousel-dots">
              {photos.map((photo, index) => (
                <button
                  key={photo.src}
                  className={`carousel-dot ${
                    currentPhoto === index ? 'active' : ''
                  }`}
                  onClick={() => setCurrentPhoto(index)}
                  aria-label={`Show photo ${index + 1}`}
                  aria-current={currentPhoto === index ? 'true' : undefined}
                />
              ))}
            </div>

            <button
              className="carousel-arrow"
              onClick={nextPhoto}
              aria-label="Next photo"
            >
              ›
            </button>
          </div>

          <button
            className="carousel-pause"
            onClick={() => setPaused(previous => !previous)}
          >
            {paused ? 'resume slideshow' : 'pause slideshow'}
          </button>
        </section>
      </div>
    </div>
  )
}

export default AboutMe
