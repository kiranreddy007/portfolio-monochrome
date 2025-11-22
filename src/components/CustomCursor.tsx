'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function CustomCursor() {
    const cursor = useRef<HTMLDivElement>(null);
    const follower = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const moveCursor = (e: MouseEvent) => {
            gsap.to(cursor.current, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
            });
            gsap.to(follower.current, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.3,
            });
        };

        const onHover = () => {
            gsap.to(cursor.current, { scale: 0.5, duration: 0.2 });
            gsap.to(follower.current, { scale: 3, opacity: 0.5, duration: 0.2 });
        };

        const onLeave = () => {
            gsap.to(cursor.current, { scale: 1, duration: 0.2 });
            gsap.to(follower.current, { scale: 1, opacity: 1, duration: 0.2 });
        };

        document.addEventListener('mousemove', moveCursor);

        const links = document.querySelectorAll('a, button, .magnetic-wrap');
        links.forEach((link) => {
            link.addEventListener('mouseenter', onHover);
            link.addEventListener('mouseleave', onLeave);
        });

        return () => {
            document.removeEventListener('mousemove', moveCursor);
            links.forEach((link) => {
                link.removeEventListener('mouseenter', onHover);
                link.removeEventListener('mouseleave', onLeave);
            });
        };
    }, { scope: cursor }); // Scope to cursor, though we attach to document

    return (
        <>
            <div ref={cursor} className="custom-cursor" />
            <div ref={follower} className="custom-cursor-follower" />
        </>
    );
}
