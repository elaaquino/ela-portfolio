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
    src: '/photos/google.jpg',
    alt: 'Ela at Google',
    caption: 'amazing visit to Google Cloud (thanks to WiCS!)',
  },
  {
    src: '/photos/wics.jpg',
    alt: 'Ela and WiCS',
    caption: 'representing women in cs at de anza college!',
  },
  {
    src: '/photos/nvidia.jpg',
    alt: 'Ela visiting NVIDIA',
    caption: 'got to explore the insane amount of buildings @ NVIDIA (i thought the zoom pods were cool...)',
  },
  {
    src: '/photos/riot.jpg',
    alt: 'Ela at Riot Games',
    caption: 'me and the killjoy turret @ Riot Games Arena in SoCal',
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
    <div className="about-page page-enter">
      <button className="about-back" onClick={onBack}>
        ← back home
      </button>

      <h1 className="about-title">about me_</h1>

      <div className="about-layout">
        <section className="about-text">
          <div className="about-section">
            <h2> ⋆.ೃ࿔*:･ greetings ^_^ </h2>
            <p>
              I'm Ela! I'm a third-year computer science student, transferring to the University of Southern California
              in the Spring of 2027. Growing up in the bay area, I have always been surrounded by technology and innovation, which is part
              of what inspired me to pursue a career in tech. I hold a deep passion for representing women in tech,
              making a positive impact on the world through technology, and incoporating fun and whimsiness in between!
            </p>
          </div>

          <div className="about-section">
            <h2>*:･ﾟ✧*:･ﾟ living life</h2>
            <p>
                Apart from developing, I love to doodle, sing, and cook medium-rare ribeye steaks! I also enjoy
                playing video games, such as Valorant, League of Legends, and Minesweeper (very competively). I even livestream
                on Twitch sometimes!
            </p>
          </div>

          <div className="about-section">
            <h2>+*:ꔫ:*﹤ thanks for visiting</h2>
            <p>
              My inspiration for this portflio came from my addiction to Monkeytype, a typing game that tracks your words per minute.
              I would try to say you can't beat my typing speed, but I'm not a liar... Hope you enjoy!
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
