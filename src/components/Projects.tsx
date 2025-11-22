'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
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
    },
];

export default function Projects() {
    const containerRef = useRef<HTMLElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from('.project-title', {
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 80%',
            },
            y: 30,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
        });

        gsap.from('.project-card-wrapper', {
            scrollTrigger: {
                trigger: gridRef.current,
                start: 'top 80%',
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out',
        });
    }, { scope: containerRef });

    return (
        <section id="projects" ref={containerRef} className={`${styles.projects} section-light`}>
            <div className="container">
                <h2 style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '4rem', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--primary)' }} className="project-title">
                    Featured Projects
                </h2>
                <div ref={gridRef} className={`${styles.grid} project-grid`}>
                    {projects.map((project, index) => (
                        <div key={index} className="project-card-wrapper" style={{ height: '100%' }}>
                            <div className={`${styles.card}`}>
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
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
