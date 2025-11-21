import Link from 'next/link';
import styles from './Projects.module.css';

const projects = [
    {
        title: "Cloud-Native E-Commerce Platform",
        description: "Architected a microservices platform that handled 50k+ concurrent users during peak sales. Reduced infrastructure costs by 30% via auto-scaling optimization.",
        tags: ["Next.js", "AWS", "Microservices", "Docker"],
        link: "#"
    },
    {
        title: "AI Data Pipeline Dashboard",
        description: "Built a real-time visualization tool processing 1TB+ of daily data. Empowered data scientists to identify model drift 10x faster than previous methods.",
        tags: ["React", "Python", "WebSocket", "D3.js"],
        link: "#"
    },
    {
        title: "SaaS Project Management Tool",
        description: "Developed a collaborative workspace used by 500+ teams. Achieved sub-100ms latency for real-time updates using optimized WebSocket connections.",
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
                        <div key={index} className={`${styles.card} animate-on-scroll delay-${(index % 3) * 100 + 100}`}>
                            <div className="overflow-hidden rounded-t-lg"> {/* Wrapper for zoom */}
                                <div className={styles.imagePlaceholder}>
                                    Project Preview
                                </div>
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
