'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        gsap.from('.footer-content', {
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 90%',
            },
            y: 20,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
        });
    }, { scope: containerRef });

    return (
        <footer ref={containerRef} className={styles.footer}>
            <div className={`container ${styles.container} footer-content`}>
                <div className={styles.column}>
                    <h3 className={styles.logo}>Kiran Ragi</h3>
                    <p className={styles.tagline}>
                        Building digital experiences that matter.
                    </p>
                </div>

                <div className={styles.column}>
                    <h4 className={styles.heading}>Navigation</h4>
                    <nav className={styles.nav}>
                        <Link href="#about" className={styles.link}>About</Link>
                        <Link href="#experience" className={styles.link}>Experience</Link>
                        <Link href="#projects" className={styles.link}>Projects</Link>
                        <Link href="#contact" className={styles.link}>Contact</Link>
                    </nav>
                </div>

                <div className={styles.column}>
                    <h4 className={styles.heading}>Connect</h4>
                    <div className={styles.socials}>
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                            <Github size={20} />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                            <Linkedin size={20} />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                            <Twitter size={20} />
                        </a>
                        <a href="mailto:hello@example.com" className={styles.socialLink}>
                            <Mail size={20} />
                        </a>
                    </div>
                </div>
            </div>
            <div className={styles.bottom}>
                <p className={styles.copyright}>
                    © {new Date().getFullYear()} Kiran Ragi. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
