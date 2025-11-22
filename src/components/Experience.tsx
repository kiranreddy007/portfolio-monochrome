import styles from './Experience.module.css';

const experiences = [
    {
        company: "Hertz",
        role: "Full Stack Developer",
        period: "2025 - Present",
        description: "Architecting enterprise-scale cloud solutions and managing complex database architectures. Leading a team of junior developers to modernize legacy systems using Next.js and PostgreSQL.",
        impact: "Streamlined cloud resource management and established DevOps pipelines, increasing deployment velocity by 50%."
    },
    {
        company: "Cognizant",
        role: "Programmer Analyst",
        period: "2021 - 2023",
        description: "Leading full-stack development for enterprise clients, focusing on scalable microservices and cloud-native architectures.",
        impact: "Reduced system latency by 40% through optimized API design."
    },
    {
        company: "Indiana University Bloomington",
        role: "Research Assistant",
        period: "2024 - 2025",
        description: "Collaborated on ML-driven data analysis tools, building intuitive dashboards for complex datasets.",
        impact: "Enabled real-time visualization of terabyte-scale datasets."
    },
    {
        company: "Freelance",
        role: "Product Engineer & Consultant",
        period: "2019 - Present",
        description: "Partnered with founders to turn abstract ideas into launched products. Owned the entire lifecycle—from product strategy and UI/UX design to architecture and deployment.",
        impact: "Delivered end-to-end solutions for early-stage startups."
    }
];

export default function Experience() {
    return (
        <section id="experience" className={`${styles.experience} section-dark`}>
            <div className="container">
                <h2 className={`${styles.heading} animate-on-scroll`}>
                    My Journey
                </h2>
                <div className={styles.timeline}>
                    {experiences.map((exp, index) => (
                        <div key={index} className={`${styles.item} animate-on-scroll delay-${index * 100}`}>
                            <div className={styles.marker} />
                            <div className={styles.content}>
                                <span className={styles.period}>{exp.period}</span>
                                <h3 className={styles.role}>{exp.role}</h3>
                                <h4 className={styles.company}>{exp.company}</h4>
                                <p className={styles.description}>{exp.description}</p>
                                <p className={styles.impact}>
                                    <span className={styles.impactLabel}>Key Impact:</span> {exp.impact}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
