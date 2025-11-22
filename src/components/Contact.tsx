'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import styles from './Contact.module.css';

export default function Contact() {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        gsap.from('.contact-content', {
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 80%',
            },
            y: 30,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
        });
    }, { scope: containerRef });

    return (
        <section id="contact" ref={containerRef} className={`${styles.contact} section-dark`}>
            <div className="container">
                <div className={`${styles.content} contact-content`}>
                    <h2 className={styles.title}>Let&apos;s Build Something Amazing</h2>
                    <p className={styles.text}>
                        I&apos;m always excited to hear about new challenges and opportunities where I can make a difference. Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
                    </p>
                    <div className={styles.actions}>
                        <Link href="mailto:hello@example.com" className={styles.email}>
                            Say Hello
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
