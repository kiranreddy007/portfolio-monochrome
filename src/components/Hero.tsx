'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Hero.module.css';
import Signature from './Signature';

export default function Hero() {
    const [offset, setOffset] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setTimeout(() => setIsLoaded(true), 100);
        const handleScroll = () => {
            setOffset(window.scrollY);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
                    style={{
                        transform: `translateY(${offset * 0.5}px) scale(1.1)`, // Parallax effect
                    }}
                />
                <div className={styles.overlay} />
            </div>

            <div className={`container ${styles.content}`}>
                <div className="overflow-hidden">
                    <h1 className={`${styles.title} ${isLoaded ? 'reveal-text' : 'reveal-text-hidden'} animate-float`}>
                        Hi, I&apos;m Kiran.
                    </h1>
                </div>
                <div className="overflow-hidden">
                    <h2 className={`${styles.subtitle} ${isLoaded ? 'reveal-text' : 'reveal-text-hidden'} delay-100`}>
                        I craft digital experiences that feel alive.
                    </h2>
                </div>
                <div className="overflow-hidden">
                    <p className={`${styles.description} ${isLoaded ? 'reveal-text' : 'reveal-text-hidden'} delay-200`}>
                        I’m a Full Stack Developer who believes code should be as human as the people using it. From scalable architectures to pixel-perfect interactions, I build things that matter.
                    </p>
                </div>

                <div className={`${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000 delay-500 mb-8`}>
                    <Signature />
                </div>

                <div className={`${styles.actions} ${isLoaded ? 'reveal-text' : 'reveal-text-hidden'} delay-300`}>
                    <Link href="#projects" className="btn btn-primary">
                        See My Work
                    </Link>
                    <Link href="#contact" className="btn btn-outline">
                        Let&apos;s Talk
                    </Link>
                </div>
            </div>
        </section>
    );
}
