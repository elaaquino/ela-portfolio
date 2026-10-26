
import { useState } from 'react'
import './Projects.css'

type ProjectsProps = {
  onBack: () => void
}

type Project = {
  id: string
  name: string
  description: string
  details: string
  technologies: string[]
  github?: string
  demo?: string
}

const personalProjects: Project[] = [
  {
    id: 'scavenger-hunt',
    name: 'Scavenger Hunt Web App',
    description: 'An interactive scavenger hunt platform.',
    details:
      'A full-stack application designed to digitize an in-person scavenger hunt. Includes guest progress tracking, photo submissions, bonus hunts, and an authenticated admin dashboard.',
    technologies: ['React', 'TypeScript', 'Supabase', 'Vercel'],
  },
  {
    id: 'handtune',
    name: 'HandTune',
    description: 'Control music and audio effects using hand gestures.',
    details:
      'A real-time computer vision application that translates hand movements into audio controls, including volume and pitch-correction effects.',
    technologies: ['Python', 'MediaPipe', 'OpenCV', 'PySide6'],
  },
]

const hackathonProjects: Project[] = [
  {
    id: 'walk2feed',
    name: 'Walk2Feed',
    description: 'A mobile walking experience with virtual pets.',
    details:
      'A hackathon project combining physical activity, virtual pet progression, and AI-powered interactions.',
    technologies: ['React Native', 'Expo'],
  },
  {
    id: 'blowfish',
    name: 'Blowfish Budgeting',
    description: 'A web application for managing personal finances.',
    details:
      'A budgeting application built with React, Node.js, and TypeScript.',
    technologies: ['React', 'Node.js', 'TypeScript'],
  },
  {
    id: 'herspective',
    name: 'Herspective',
    description: 'An interactive experience built in Unity.',
    details:
      'A hackathon project developed using Unity and deployed through WebGL.',
    technologies: ['Unity', 'WebGL'],
  },
]

function Projects({ onBack }: ProjectsProps) {
  const [expandedProject, setExpandedProject] = useState<string | null>(null)

  function toggleProject(id: string) {
    setExpandedProject(previous => previous === id ? null : id)
  }

  function renderProject(project: Project) {
    const expanded = expandedProject === project.id

    return (
      <article className="project-item" key={project.id}>
        <button
          className="project-trigger"
          onClick={() => toggleProject(project.id)}
          aria-expanded={expanded}
          aria-controls={`project-details-${project.id}`}
        >
          <span className="project-summary">
            <span className="project-name">{project.name}</span>
            <span className="project-description">
              {project.description}
            </span>
          </span>

          <span className="project-symbol" aria-hidden="true">
            {expanded ? '−' : '+'}
          </span>
        </button>

        <div
          id={`project-details-${project.id}`}
          className={`project-details ${expanded ? 'expanded' : ''}`}
          inert={!expanded}
        >
          
        <div className="project-details-inner">
        <p>{project.details}</p>

        {/* Image / GIF placeholder */}
        <div className="project-media-placeholder">
            <div className="media-placeholder-content">
            <span className="media-placeholder-icon">▧</span>
            <span>project preview</span>
            <span className="media-placeholder-hint">
                image / gif coming soon
            </span>
            </div>
        </div>

        <div className="project-technologies">
            {project.technologies.map(tech => (
            <span key={tech}>{tech}</span>
            ))}
        </div>

        {/* Link placeholders */}
        <div className="project-links">
            <span className="project-link-placeholder">
            GitHub ↗
            </span>

            <span className="project-link-placeholder">
            Live Demo ↗
            </span>
        </div>
        </div>

        </div>
      </article>
    )
  }

  return (
    <div className="projects-page">
      <button className="projects-back" onClick={onBack}>
        ← back home
      </button>

      <h1 className="projects-title">projects_</h1>

      <div className="projects-timeline">
        <section className="project-category">
          <h2>personal</h2>

          <div className="project-category-content">
            {personalProjects.map(renderProject)}
          </div>
        </section>

        <section className="project-category">
          <h2>hackathons</h2>

          <div className="project-category-content">
            {hackathonProjects.map(renderProject)}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Projects
