'use client';

import React, { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import styles from './Skills.module.css';
import { Code2, Cloud, Users, Zap, Layers, LucideProps } from 'lucide-react';

const offerings = [
    {
        title: "Adaptive Engineering",
        description: "TypeScript, Java, React.js, Angular, AWS. I don't just use tools; I master them to build resilient systems.",
        icon: <Code2 size={28} />
    },
    {
        title: "Cloud Architecture",
        description: "Building scalable infrastructure that handles millions of requests without breaking a sweat.",
        icon: <Cloud size={28} />
    },
    {
        title: "Human-Centric",
        description: "Bridging the gap between complex code and user needs. I speak both tech and business.",
        icon: <Users size={28} />
    },
    {
        title: "Rapid Execution",
        description: "High-stakes delivery under tight deadlines. Zero compromise on quality or performance.",
        icon: <Zap size={28} />
    },
    {
        title: "Technical Leadership",
        description: "Guiding teams through the fog of development to clear, successful product launches.",
        icon: <Layers size={28} />
    }
];

export default function Skills() {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        gsap.from('.skill-header', {
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 80%',
            },
            y: 30,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
        });

        gsap.fromTo('.skill-card',
            { y: 50, opacity: 0 },
            {
                scrollTrigger: {
                    trigger: '.skill-grid',
                    start: 'top 85%',
                },
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power3.out',
            }
        );
    }, { scope: containerRef });

    // Mouse Tracking for Spotlight Effect
    useEffect(() => {
        const cards = document.querySelectorAll<HTMLElement>(`.${styles.card}`);

        const handleMouseMove = (e: MouseEvent) => {
            cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            });
        };

        if (containerRef.current) {
            containerRef.current.addEventListener('mousemove', handleMouseMove);
        }

        return () => {
            if (containerRef.current) {
                containerRef.current.removeEventListener('mousemove', handleMouseMove);
            }
        };
    }, []);

    return (
        <section id="skills" ref={containerRef} className={styles.skills}>
            <div className={`container ${styles.content}`}>
                <div className={`${styles.header} skill-header`}>
                    <div className={styles.sectionLabel}>
                        <div className={styles.sectionLine} />
                        <span>02 — Expertise</span>
                    </div>
                    <h2 className={styles.title}>
                        Technical <span className={styles.highlight}>Expertise</span>
                    </h2>
                </div>

                <div className={`${styles.grid} skill-grid`}>
                    {offerings.map((item, index) => (
                        <div key={index} className={`${styles.card} skill-card`}>
                            <span className={styles.number}>{(index + 1).toString().padStart(2, '0')}</span>

                            <div className={styles.cardContent}>
                                <div className={styles.iconWrapper}>
                                    {React.cloneElement(item.icon as React.ReactElement<LucideProps>, { strokeWidth: 1 })}
                                </div>
                                <h3 className={styles.cardTitle}>{item.title}</h3>
                                <p className={styles.cardDesc}>
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
