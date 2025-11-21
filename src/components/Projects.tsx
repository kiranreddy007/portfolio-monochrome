import Link from 'next/link';
import styles from './Projects.module.css';

const projects = [
    {
        title: "Cloud-Native E-Commerce Platform",
        description: "A scalable microservices-based e-commerce platform built with Next.js, Node.js, and AWS. Handles high traffic loads with auto-scaling capabilities.",
        tags: ["Next.js", "AWS", "Microservices", "Docker"],
        link: "#"
    },
    {
        title: "AI Data Pipeline Dashboard",
        description: "Real-time data visualization dashboard for monitoring ML training pipelines. Built with React, D3.js, and WebSocket integration.",
        tags: ["React", "Python", "WebSocket", "D3.js"],
        link: "#"
    },
    {
        title: "SaaS Project Management Tool",
        description: "Collaborative project management tool with real-time updates, task tracking, and team analytics. Optimized for performance and usability.",
        tags: ["TypeScript", "PostgreSQL", "GraphQL", "Redis"],
        link: "#"
    }
];

export default function Projects() {
    return (
        <section id="projects" className={`${styles.projects} section-light`}>
            <div className="container">
                <h2 style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '4rem', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--primary)' }} className="animate-on-scroll">
                    Featured Projects
                </h2>
                <div className={styles.grid}>
                    {projects.map((project, index) => (
                        <div key={index} className={`${styles.card} art-frame-double animate-on-scroll delay-${(index % 3) * 100 + 100}`}>
                            <div className={styles.imagePlaceholder}>
                                Project Preview
                            </div>
                            <div className={styles.content}>
                                <h3 className={styles.title}>{project.title}</h3>
                                <p className={styles.description}>{project.description}</p>
                                <div className={styles.tags}>
                                    {project.tags.map(tag => (
                                        <span key={tag} className={styles.tag}>{tag}</span>
                                    ))}
                                </div>
                                <div className={styles.links}>
                                    <Link href={project.link} className={styles.link}>View Project</Link>
                                    <Link href={project.link} className={styles.link}>GitHub</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
