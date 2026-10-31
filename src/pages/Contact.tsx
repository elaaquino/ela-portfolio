import './Contact.css'

type ContactProps = {
  onBack: () => void
}

const socialLinks = [
  { name: 'GitHub', icon: 'GH' },
  { name: 'LinkedIn', icon: 'in' },
  { name: 'Instagram', icon: 'IG' },
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
              <div className="contact-item" key={social.name}>
                <span className="contact-icon" aria-hidden="true">
                  {social.icon}
                </span>
                <span>{social.name}</span>
              </div>
            ))}
          </section>

          {/* Email and resume */}
          <section
            className="contact-actions"
            aria-label="Contact options"
          >
            <div className="contact-item">
              <span className="contact-icon" aria-hidden="true">
                @
              </span>
              <span>email me</span>
            </div>

            <div className="contact-item">
              <span className="contact-icon" aria-hidden="true">
                ↓
              </span>
              <span>download résumé</span>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Contact
