import Link from 'next/link';
import Image from 'next/image';
import styles from './Hero.module.css';

export default function Hero() {
    return (
        <section className={styles.hero}>
            <div className={styles.backgroundWrapper}>
                <Image
                    src="/images/mountains.png"
                    alt="Monochrome Mountains"
                    fill
                    priority
                    className={styles.backgroundImage}
                    quality={100}
                />
                <div className={styles.overlay} />
            </div>

            <div className={`container ${styles.content}`}>
                <h1 className={`${styles.title} animate-on-scroll`}>
                    Kiran Ragi
                </h1>
                <h2 className={`${styles.subtitle} animate-on-scroll delay-100`}>
                    I build software that scales, solves problems, and actually makes an impact.
                </h2>
                <p className={`${styles.description} animate-on-scroll delay-200`}>
                    Whether it’s architecting full-stack applications, managing fast-moving projects, or aligning engineering with business goals, I thrive in the space where technology meets execution.
                </p>
                <div className={`${styles.actions} animate-on-scroll delay-300`}>
                    <Link href="#projects" className="btn btn-primary">
                        View Projects
                    </Link>
                    <Link href="#contact" className="btn btn-outline">
                        Contact Me
                    </Link>
                </div>
            </div>
        </section>
    );
}
