'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import styles from './Contact.module.css';
import { ArrowUpRight, Linkedin, Github, Twitter, Instagram } from 'lucide-react';

export default function Contact() {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        gsap.from('.contact-reveal', {
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 70%',
            },
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: 'power3.out',
        });

        gsap.from('.footer-reveal', {
            scrollTrigger: {
                trigger: '.contact-footer',
                start: 'top 90%',
            },
            y: 20,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            delay: 0.2
        });
        const emailChars = containerRef.current?.querySelectorAll('.email-char');
        if (emailChars) {
            gsap.set(emailChars, { transformOrigin: "50% 50%" });
        }

    }, { scope: containerRef });

    const handleMouseEnter = () => {
        gsap.to('.email-char', {
            rotateX: 360,
            duration: 0.8,
            stagger: 0.03,
            ease: "back.out(1.7)",
        });
    };

    return (
        <section id="contact" ref={containerRef} className={styles.contact}>
            <div className={styles.glow} />
            <div className="container" style={{ height: '100%', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div className={styles.wrapper}>
                    <div className={styles.header}>
                        <h2 className={`${styles.title} contact-reveal`}>
                            What&apos;s Next?
                        </h2>
                    </div>

                    <div className={`${styles.emailContainer} contact-reveal`}>
                        <Link
                            href="mailto:contact@jyothikiran.com"
                            className={styles.emailLink}
                            onMouseEnter={handleMouseEnter}
                        >
                            <span className={styles.srOnly}>contact@jyothikiran.com</span>
                            <span aria-hidden="true" className={styles.flipText}>
                                {"contact@jyothikiran.com".split("").map((char, i) => (
                                    <span key={i} className={`${styles.emailChar} email-char`}>
                                        {char}
                                    </span>
                                ))}
                            </span>
                        </Link>
                    </div>

                    <div className={`${styles.footer} contact-footer footer-reveal`}>
                        <div className={styles.footerCol}>
                            <span className={styles.label}>Socials</span>
                            <div className={styles.socials}>
                                <Link href="#" className={styles.socialLink} aria-label="LinkedIn">
                                    <Linkedin size={20} strokeWidth={1.5} />
                                </Link>
                                <Link href="#" className={styles.socialLink} aria-label="GitHub">
                                    <Github size={20} strokeWidth={1.5} />
                                </Link>
                                <Link href="#" className={styles.socialLink} aria-label="Twitter">
                                    <Twitter size={20} strokeWidth={1.5} />
                                </Link>
                                <Link href="#" className={styles.socialLink} aria-label="Instagram">
                                    <Instagram size={20} strokeWidth={1.5} />
                                </Link>
                            </div>
                        </div>

                        <div className={styles.footerCol}>
                            <span className={styles.label}>Version</span>
                            <span className={styles.copyright}>2024 © Edition</span>
                        </div>

                        <div className={styles.footerCol}>
                            <span className={styles.label}>Local Time</span>
                            {/* Static time for now, or use the same dynamic logic as Hero if needed */}
                            <span className={styles.copyright}>GMT-6</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
