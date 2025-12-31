'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';
import gsap from 'gsap';

export default function Header() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);

        // Explicitly set initial state and animate in
        const ctx = gsap.context(() => {
            // Kill any existing tweens on the header
            gsap.killTweensOf(`.${styles.header}`);

            gsap.set(`.${styles.header}`, { y: -20, opacity: 0 });
            gsap.to(`.${styles.header}`, {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: 'power3.out',
                delay: 0.5
            });
        });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            ctx.revert();
        };
    }, []);

    const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    };

    return (
        <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
            <div className="container">
                <nav className={styles.nav}>
                    <Link href="/" className={styles.logo}>
                        KR.
                    </Link>
                    <ul className={styles.links}>
                        <li>
                            <Link
                                href="#skills"
                                className={styles.link}
                                onClick={(e) => handleSmoothScroll(e, '#skills')}
                            >
                                Expertise
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="#experience"
                                className={styles.link}
                                onClick={(e) => handleSmoothScroll(e, '#experience')}
                            >
                                Journey
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="#projects"
                                className={styles.link}
                                onClick={(e) => handleSmoothScroll(e, '#projects')}
                            >
                                Works
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="#contact"
                                className={styles.link}
                                onClick={(e) => handleSmoothScroll(e, '#contact')}
                            >
                                Contact
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
