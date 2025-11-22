'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import styles from './Hero.module.css';
import Signature from './Signature';

export default function Hero() {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline();

        tl.from('.hero-text', {
            y: 50,
            opacity: 0,
            duration: 1.2,
            stagger: 0.15,
            ease: 'power3.out',
        })
            .from('.hero-signature', {
                opacity: 0,
                scale: 0.9,
                duration: 1,
                ease: 'power2.out'
            }, "-=0.6")
            .from('.hero-btn', {
                y: 20,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power3.out',
            }, "-=0.6");

        gsap.to('.hero-bg', {
            yPercent: 30,
            ease: 'none',
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top top',
                end: 'bottom top',
                scrub: true,
            }
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className={styles.hero}>
            <div className={styles.backgroundWrapper}>
                <Image
                    src="/images/mountains.png"
                    alt="Monochrome Mountains"
                    fill
                    priority
                    className={`${styles.backgroundImage} hero-bg`}
                    quality={100}
                />
                <div className={styles.overlay} />
            </div>

            <div className={`container ${styles.content}`}>
                <div className="overflow-hidden">
                    <h1 className={`${styles.title} hero-text`}>
                        Hi, I&apos;m Kiran.
                    </h1>
                </div>
                <div className="overflow-hidden">
                    <h2 className={`${styles.subtitle} hero-text`}>
                        I craft digital experiences that feel alive.
                    </h2>
                </div>
                <div className="overflow-hidden">
                    <p className={`${styles.description} hero-text`}>
                        I’m a Full Stack Developer who believes code should be as human as the people using it. From scalable architectures to pixel-perfect interactions, I build things that matter.
                    </p>
                </div>

                <div className="hero-signature mb-8">
                    <Signature />
                </div>

                <div className={styles.actions}>
                    <Link href="#projects" className="btn btn-primary hero-btn">
                        See My Work
                    </Link>
                    <Link href="#contact" className="btn btn-outline hero-btn">
                        Let&apos;s Talk
                    </Link>
                </div>
            </div>
        </section>
    );
}
