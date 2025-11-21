import Link from 'next/link';
import styles from './Contact.module.css';

export default function Contact() {
    return (
        <section id="contact" className={`${styles.contact} section-dark`}>
            <div className="container">
                <div className={`${styles.content} animate-on-scroll`}>
                    <h2 className={styles.title}>Let&apos;s Build Something Great</h2>
                    <p className={styles.text}>
                        I&apos;m looking for my next opportunity as an SDE/FSD. If you&apos;re looking for someone who can solve complex problems and ship impactful solutions, let&apos;s talk.
                    </p>
                    <Link href="mailto:hello@example.com" className={styles.email}>
                        Get in Touch
                    </Link>
                </div>
            </div>
        </section>
    );
}
