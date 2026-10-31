import './Contact.css'

type ContactProps = {
  onBack: () => void
}

const socialLinks = [
  {
    name: 'GitHub',
    icon: 'GH',
    url: 'https://github.com/elaaquino',
  },
  {
    name: 'LinkedIn',
    icon: 'in',
    url: 'https://www.linkedin.com/in/elaaaquino/',
  },
  {
    name: 'Email',
    icon: '@',
    url: 'mailto:eluhkeeno@gmail.com',
  },
]

function Contact({ onBack }: ContactProps) {
  return (
    <div className="contact-page page-enter">
      <button className="contact-back" onClick={onBack}>
        ← back home
      </button>

      <div className="contact-content">
        <header className="contact-header">
          <h1>contact me_</h1>
          <p>i'd love to hear from you ♡</p>
        </header>

        <div className="contact-layout">
          {/* Social media links */}
          <section
            className="contact-socials"
            aria-label="Social media"
          >
            {socialLinks.map(social => (
              <a
                className="contact-item"
                key={social.name}
                href={social.url}
                target={social.url.startsWith('http') ? '_blank' : undefined}
                rel={social.url.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                <span className="contact-icon" aria-hidden="true">
                  {social.icon}
                </span>
                <span>{social.name}</span>
              </a>
            ))}
          </section>

          {/* Email and resume */}
          <section
            className="contact-actions"
            aria-label="Contact options"
          >
            <a
              className="contact-item"
              href="mailto:eluhkeeno@gmail.com"
            >
              <span className="contact-icon" aria-hidden="true">
                @
              </span>
              <span>email me</span>
            </a>

            <a
              className="contact-item"
              href="/resume.pdf"
              download
            >
              <span className="contact-icon" aria-hidden="true">
                ↓
              </span>
              <span>download résumé</span>
            </a>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Contact
