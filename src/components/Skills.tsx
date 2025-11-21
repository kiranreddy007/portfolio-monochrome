import React from 'react';
import Image from 'next/image';
import styles from './Skills.module.css';
import { Code2, Cloud, Users, Zap, Layers, LucideProps } from 'lucide-react';

const offerings = [
    {
        title: "Tech-Agnostic & Fast Learner",
        description: "TypeScript, Java, React.js, Angular, AWS, DevOps, Microservices? Sure. Need something new? Give me a day.",
        icon: <Code2 size={24} />
    },
    {
        title: "Full-Stack & Cloud Expertise",
        description: "Built & deployed scalable systems with modern web architectures.",
        icon: <Cloud size={24} />
    },
    {
        title: "Strong Communicator",
        description: "I speak both code and business, ensuring smooth collaboration between teams.",
        icon: <Users size={24} />
    },
    {
        title: "Freelancing & Rapid Delivery",
        description: "Executed high-stakes projects under tight deadlines with no room for failure.",
        icon: <Zap size={24} />
    },
    {
        title: "Team Player & Leader",
        description: "Worked with cross-functional global teams, led initiatives, and kept the momentum high.",
        icon: <Layers size={24} />
    }
];

export default function Skills() {
    return (
        <section id="skills" className={`${styles.skills} section-light`}>
            {/* Clean background, no patterns */}
            <div className={`container ${styles.content}`}>
                <h2 style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '4rem', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--primary)' }} className="animate-on-scroll">
                    What I Bring to the Table
                </h2>
                <div className={styles.grid}>
                    {offerings.map((item, index) => (
                        <div key={index} className={`${styles.card} art-frame animate-on-scroll delay-${(index % 3) * 100 + 100}`}>
                            <div className={styles.iconWrapper}>
                                {/* Thinner stroke width for classier look */}
                                {React.cloneElement(item.icon as React.ReactElement<LucideProps>, { strokeWidth: 1.5 })}
                            </div>
                            <h3 className={styles.category}>{item.title}</h3>
                            <p className={styles.description} style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
