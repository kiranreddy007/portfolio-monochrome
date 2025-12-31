'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Hero.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const containerRef = useRef<HTMLElement>(null);
    const [time, setTime] = useState("");

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }));
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    useGSAP(() => {
        const tl = gsap.timeline();

        // 1. Initial State Set
        gsap.set('.hero-word', { yPercent: 120, rotateX: -40, opacity: 0, transformPerspective: 1000 });
        gsap.set('.hero-meta', { opacity: 0, y: 20 });

        // 2. Main Title Entrance
        tl.to('.hero-word', {
            yPercent: 0,
            rotateX: 0,
            opacity: 1,
            duration: 1.5,
            stagger: 0.15,
            ease: 'expo.out',
            delay: 0.2
        });

        // 3. Meta Data Fade In
        tl.to('.hero-meta', {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out'
        }, "-=0.8");

        // 4. Parallax on Scroll
        gsap.to('.aurora-bg', {
            yPercent: 20,
            ease: 'none',
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });

        // Mouse move parallax for orbs
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const xPos = (clientX / window.innerWidth - 0.5) * 40;
            const yPos = (clientY / window.innerHeight - 0.5) * 40;

            gsap.to('.moved-orb', {
                x: xPos,
                y: yPos,
                duration: 2,
                ease: 'power2.out'
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className={styles.hero}>
            {/* Dynamic Background */}
            <div className={`${styles.auroraBackground} aurora-bg`}>
                <div className={`${styles.auroraOrb} ${styles.orb1} moved-orb`} />
                <div className={`${styles.auroraOrb} ${styles.orb2} moved-orb`} />
            </div>
            <div className={styles.grain} />

            <div className={`container ${styles.content}`}>
                <div className={styles.mainTitle}>
                    <div className={styles.line}>
                        <span className={`${styles.word} hero-word`}>KIRAN</span>
                    </div>
                    <div className={styles.line}>
                        <span className={`${styles.word} hero-word`}>RAGI<span className={styles.highlight}>.</span></span>
                    </div>
                </div>

                <div className={`${styles.meta} hero-meta`}>
                    <div className={styles.available}>
                        <span className={styles.statusDot} />
                        Available for Work
                    </div>

                    <div className={styles.scrollHint}>
                        <span>Local Time / {time}</span>
                        <span>Scroll to Explore</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
