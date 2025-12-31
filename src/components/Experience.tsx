'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import styles from './Experience.module.css';

const experiences = [
    {
        company: "Hertz",
        role: "Full Stack Developer",
        period: "2025 - Present",
        description: "Architecting enterprise-scale cloud solutions and managing complex database architectures. Modernizing legacy systems using Next.js to improve performance by 40%.",
        tags: ["Next.js", "AWS", "PostgreSQL", "System Design"]
    },
    {
        company: "Cognizant",
        role: "Programmer Analyst",
        period: "2021 - 2023",
        description: "Led development of microservices for Fortune 500 clients. Implemented CI/CD pipelines that reduced deployment time by 60%.",
        tags: ["Java", "Spring Boot", "Docker", "Kubernetes"]
    },
    {
        company: "Indiana University",
        role: "Research Assistant",
        period: "2024 - 2025",
        description: "Developed ML-driven visualization tools for terabyte-scale datasets. Assisted in publishing research on efficient data processing algorithms.",
        tags: ["Python", "Machine Learning", "D3.js", "Data Viz"]
    },
    {
        company: "Freelance",
        role: "Product Engineer",
        period: "2019 - Present",
        description: "Partnering with early-stage founders to build MVPs from scratch. Delivered 10+ successful products across various verticals.",
        tags: ["Full Stack", "Product Strategy", "UI/UX"]
    }
];

export default function Experience() {
    const containerRef = useRef<HTMLElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Header Reveal
        gsap.from('.exp-header', {
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 80%',
            },
            y: 30,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
        });

        // Line Progress Animation
        gsap.to(lineRef.current, {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
                trigger: '.experience-list',
                start: 'top 60%',
                end: 'bottom 80%',
                scrub: true
            }
        });

        // Items Reveal
        const items = gsap.utils.toArray('.experience-item');
        items.forEach((item: any, i) => {
            gsap.from(item, {
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%',
                },
                x: 30,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
            });

            // Dot glow up
            const dot = item.querySelector(`.${styles.dot}`);
            if (dot) {
                gsap.from(dot, {
                    scale: 0,
                    duration: 0.5,
                    ease: 'back.out(1.7)',
                    scrollTrigger: {
                        trigger: item,
                        start: 'top 85%',
                    }
                });
            }
        });

    }, { scope: containerRef });

    return (
        <section id="experience" ref={containerRef} className={styles.experience}>
            <div className="container">
                <div className={`${styles.header} exp-header`}>
                    <div className={styles.sectionLabel}>
                        <div className={styles.sectionLine} />
                        <span>03 — Experience</span>
                    </div>
                    <h2 className={styles.title}>
                        A journey defined by <br />
                        continuous <span style={{ color: '#888' }}>evolution</span>.
                    </h2>
                </div>

                <div className={`${styles.timeline} experience-list`}>
                    <div className={styles.timelineLine} />
                    <div ref={lineRef} className={styles.timelineProgress} />

                    {experiences.map((exp, index) => (
                        <div key={index} className={`${styles.item} experience-item`}>
                            <div className={styles.dot} />
                            <div className={styles.content}>
                                <h3 className={styles.role}>{exp.role}</h3>
                                <div className={styles.company}>
                                    <span>{exp.company}</span>
                                    <span className={styles.period}>{exp.period}</span>
                                </div>
                                <p className={styles.description}>{exp.description}</p>
                                <div className={styles.tags}>
                                    {exp.tags.map(tag => (
                                        <span key={tag} className={styles.tag}>{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
