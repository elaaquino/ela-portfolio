
import './Experience.css'

type ExperienceProps = {
  onBack: () => void
}

const techStack = [
  {
    category: 'Languages',
    items: ['Python', 'TypeScript', 'JavaScript', 'C++'],
  },
  {
    category: 'Frameworks & Libraries',
    items: ['React', 'React Native', 'OpenCV', 'MediaPipe'],
  },
  {
    category: 'Tools & Platforms',
    items: ['Git', 'GitHub', 'Supabase', 'Vercel'],
  },
]

function Experience({ onBack }: ExperienceProps) {
  return (
    <div className="experience-page">
      <button className="experience-back" onClick={onBack}>
        ← back home
      </button>

      <h1 className="experience-title">experience_</h1>

      <div className="experience-timeline">
        {/* Tech stack */}
        <section className="experience-category">
          <h2>my tech stack</h2>

          <div className="experience-category-content">
            {techStack.map(group => (
              <div className="experience-item" key={group.category}>
                <h3>{group.category}</h3>
                <p>{group.items.join(' · ')}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Work */}
        <section className="experience-category">
          <h2>work</h2>

          <div className="experience-category-content">
            <article className="experience-item">
              <h3>LEGOLAND Discovery Center</h3>

              <span className="experience-role">
                Guest Experience Host · 2024–Present
              </span>

              <p>
                Add a description of your responsibilities,
                accomplishments, and experiences here.
              </p>
            </article>
          </div>
        </section>

        {/* Leadership */}
        <section className="experience-category">
          <h2>leadership</h2>

          <div className="experience-category-content">
            <article className="experience-item">
              <h3>Women in Computer Science</h3>

              <span className="experience-role">
                Vice President
              </span>

              <p>
                Add a description of your leadership responsibilities,
                involvement, and contributions here.
              </p>
            </article>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Experience
