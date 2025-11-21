import styles from './Experience.module.css';

const experiences = [
    {
        role: "Full Stack Developer / Tech Lead",
        company: "Cognizant",
        date: "Present",
        description: "Leading projects across global teams (US, UK, India). Wearing multiple hats—developer, tech lead, and problem solver. Delivering high-impact solutions and managing production issues."
    },
    {
        role: "Research Assistant",
        company: "Indiana University Bloomington",
        date: "Previous",
        description: "Contributed to research initiatives, leveraging technical expertise to solve complex data and engineering challenges."
    },
    {
        role: "Freelance Full Stack Developer",
        company: "Self-Employed",
        date: "Various",
        description: "Delivering high-impact solutions on tight timelines. Adapting to diverse tech stacks and ensuring rapid delivery for high-stakes projects."
    }
];

export default function Experience() {
    return (
        <section id="experience" className={`${styles.experience} section-dark`}>
            <div className="container">
                <h2 style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '4rem', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--primary)' }} className="animate-on-scroll">
                    Professional Journey
                </h2>
                <div className={styles.timeline}>
                    {experiences.map((exp, index) => (
                        <div key={index} className={`${styles.item} animate-on-scroll delay-${(index % 3) * 100 + 100}`}>
                            <div className={styles.marker}></div>
                            <div className={styles.content}>
                                <span className={styles.date}>{exp.date}</span>
                                <h3 className={styles.role}>{exp.role}</h3>
                                <h4 className={styles.company}>{exp.company}</h4>
                                <p className={styles.description}>{exp.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
