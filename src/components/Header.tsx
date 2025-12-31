'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';
import gsap from 'gsap';

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("HOME");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);

        // Section Observer for Mobile Title
        const sections = document.querySelectorAll('section[id]');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
                    const id = entry.target.id;
                    const map: Record<string, string> = {
                        'hero': 'HOME',
                        'skills': 'EXPERTISE',
                        'experience': 'JOURNEY',
                        'projects': 'WORKS',
                        'contact': 'CONTACT'
                    };
                    if (map[id]) setActiveSection(map[id]);
                }
            });
        }, { threshold: 0.3 });

        sections.forEach((s) => observer.observe(s));

        // Explicitly set initial state and animate in
        const ctx = gsap.context(() => {
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
            sections.forEach((s) => observer.unobserve(s));
            ctx.revert();
        };
    }, []);

    // Lock scroll when menu is open
    useEffect(() => {
        if (menuOpen) {
            if (window.lenis) window.lenis.stop();
            document.body.style.overflow = 'hidden';
        } else {
            if (window.lenis) window.lenis.start();
            document.body.style.overflow = '';
        }
    }, [menuOpen]);

    const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
        e.preventDefault();
        setMenuOpen(false); // Close menu on click

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Wait a tiny bit for menu to close animation
            setTimeout(() => {
                if (window.lenis) {
                    window.lenis.scrollTo(targetElement as HTMLElement, { duration: 1.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
                } else {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 300);
        }
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
            <div className="container">
                <nav className={styles.nav}>
                    <Link href="/" className={styles.logo}>
                        KR.
                    </Link>

                    {/* Mobile Section Title */}
                    {mounted && (
                        <div key={activeSection} className={styles.mobileTitle}>
                            {activeSection}
                        </div>
                    )}

                    {/* Desktop Links */}
                    <ul className={styles.links}>
                        <li><Link href="#skills" className={`${styles.link} ${activeSection === 'EXPERTISE' ? styles.active : ''}`} onClick={(e) => handleSmoothScroll(e, '#skills')}>Expertise</Link></li>
                        <li><Link href="#experience" className={`${styles.link} ${activeSection === 'JOURNEY' ? styles.active : ''}`} onClick={(e) => handleSmoothScroll(e, '#experience')}>Journey</Link></li>
                        <li><Link href="#projects" className={`${styles.link} ${activeSection === 'WORKS' ? styles.active : ''}`} onClick={(e) => handleSmoothScroll(e, '#projects')}>Works</Link></li>
                        <li><Link href="#contact" className={`${styles.link} ${activeSection === 'CONTACT' ? styles.active : ''}`} onClick={(e) => handleSmoothScroll(e, '#contact')}>Contact</Link></li>
                    </ul>

                    {/* Mobile Toggle */}
                    <div className={`${styles.mobileToggle} ${menuOpen ? styles.open : ''}`} onClick={toggleMenu}>
                        <div className={styles.bar}></div>
                        <div className={styles.bar}></div>
                        <div className={styles.bar}></div>
                    </div>
                </nav>
            </div>

            {/* Mobile Fullscreen Menu */}
            <div className={`${styles.mobileMenu} ${menuOpen ? styles.menuOpen : ''}`}>
                <Link href="#skills" className={styles.mobileLink} onClick={(e) => handleSmoothScroll(e, '#skills')}>Expertise</Link>
                <Link href="#experience" className={styles.mobileLink} onClick={(e) => handleSmoothScroll(e, '#experience')}>Journey</Link>
                <Link href="#projects" className={styles.mobileLink} onClick={(e) => handleSmoothScroll(e, '#projects')}>Works</Link>
                <Link href="#contact" className={styles.mobileLink} onClick={(e) => handleSmoothScroll(e, '#contact')}>Contact</Link>
            </div>
        </header>
    );
}
