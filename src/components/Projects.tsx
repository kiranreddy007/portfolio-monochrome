'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Projects.module.css';

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        title: "E-Commerce\nPlatform",
        category: "System Architecture",
        description: "Architected a microservices platform handling 50k+ concurrent users. 30% cost reduction via auto-scaling.",
        year: "2024",
        link: "#",
        image: "/images/ecommerce_bw.png"
    },
    {
        title: "AI Data\nDashboard",
        category: "Visualization",
        description: "Real-time visualization tool processing 1TB+ daily data. Identifying model drift 10x faster.",
        year: "2023",
        link: "#",
        image: "/images/ai_dashboard_bw.png"
    },
    {
        title: "SaaS\nWorkspace",
        category: "Productivity",
        description: "Collaborative workspace for 500+ teams. achieved sub-100ms latency with optimized WebSockets.",
        year: "2023",
        link: "#",
        image: "/images/saas_workspace_bw.png"
    },
];

export default function Projects() {
    const containerRef = useRef<HTMLElement>(null);
    const projectsRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const sections = gsap.utils.toArray<HTMLElement>('.project-item');

        sections.forEach((section, i) => {
            // Parallax Image
            const image = section.querySelector('.project-image');

            gsap.fromTo(image, {
                yPercent: -20,
                scale: 1.1
            }, {
                yPercent: 20,
                scale: 1.1,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            });

            // Reveal Text
            const text = section.querySelectorAll('.reveal-text-anim');
            gsap.from(text, {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: section,
                    start: 'top 70%',
                    toggleActions: 'play none none reverse'
                }
            });

            // Draw line
            const line = section.querySelector('.separator');
            if (line) {
                gsap.from(line, {
                    scaleX: 0,
                    transformOrigin: 'left',
                    duration: 1.5,
                    ease: 'expo.out',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 80%',
                    }
                });
            }
        });

    }, { scope: containerRef });

    return (
        <section id="projects" ref={containerRef} className={styles.projects}>
            <div className="container">
                <h2 className="text-large mb-12 reveal-text-anim">PROJECTS</h2>

                <div ref={projectsRef} className={styles.projectList}>
                    {projects.map((project, index) => (
                        <div key={index} className={`project-item ${styles.projectItem}`}>
                            <div className={styles.separator} />
                            <div className={styles.projectContent}>
                                <div className={styles.meta}>
                                    <span className="text-body-large reveal-text-anim">{project.category}</span>
                                    <span className="text-body-large reveal-text-anim">{project.year}</span>
                                </div>
                                <div className={styles.mainInfo}>
                                    <h3 className={`${styles.title} text-large reveal-text-anim`}>
                                        <Link href={project.link}>{project.title}</Link>
                                    </h3>
                                    <p className={`${styles.description} reveal-text-anim`}>
                                        {project.description}
                                    </p>
                                    <Link href={project.link} className={`${styles.link} reveal-text-anim`}>
                                        VIEW CASE STUDY
                                    </Link>
                                </div>
                                <div className={styles.imageWrapper}>
                                    <div className={`${styles.imageInner} project-image`}>
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            className="object-cover opacity-80"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className={styles.separator} />
                </div>
            </div>
        </section>
    );
}
