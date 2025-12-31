'use client';

import { useEffect, useRef } from 'react';

export function useAutoSnapScroll() {
    const isSnapping = useRef(false);
    const lastScrollY = useRef(0);
    const lastTime = useRef(0);
    const velocity = useRef(0);
    const snapTimeout = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const sections = document.querySelectorAll<HTMLElement>('section[id]');
        if (!sections.length) return;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const currentTime = Date.now();
            const dt = currentTime - lastTime.current;
            const dy = currentScrollY - lastScrollY.current;

            // Calculate velocity (px/ms)
            if (dt > 0) {
                velocity.current = dy / dt;
            }

            lastScrollY.current = currentScrollY;
            lastTime.current = currentTime;

            // If we are currently snapping, ignore scroll events to avoid fighting
            if (isSnapping.current) return;

            // Clear any pending snap check from "scroll end"
            if (snapTimeout.current) clearTimeout(snapTimeout.current);

            // Fast scroll protection: if moving faster than 2.5px/ms, don't snap yet.
            // Just wait until they slow down.
            if (Math.abs(velocity.current) > 2.5) {
                // Check again when they stop/slow down
                snapTimeout.current = setTimeout(checkSnap, 100);
                return;
            }

            // Normal scroll or slow scroll: Check if we crossed the 20% threshold
            checkThresholdSnap();

            // Also set a timeout to snap when scrolling stops completely
            snapTimeout.current = setTimeout(checkSnap, 150);
        };

        const checkThresholdSnap = () => {
            const viewportHeight = window.innerHeight;

            sections.forEach(section => {
                const rect = section.getBoundingClientRect();

                // Logic for "Next Section" (Scrolling Down)
                // If section top is within the bottom 20% area of screen? 
                // No, user said: "when ever atleast 20% of the screen is filled with the next section"
                // This means the section top is at 80% viewport height or higher (smaller y value).
                // rect.top <= viewportHeight * 0.8

                // We also need to ensure we haven't already scrolled PAST it meaningfully.
                // i.e., it's not the "current" section that we are leaving. 
                // It works best if we check if top crossed the 80% line recently.

                // Simple state check: 
                // Is this section entering from bottom? (rect.top > 0)
                // Is it covering > 20% of screen? (rect.top <= viewportHeight * 0.8)
                // Is it NOT already fully visible? (rect.top > 0)

                const isEnteringFromBottom = rect.top > 0 && rect.top <= viewportHeight * 0.8;

                // Logic for "Previous Section" (Scrolling Up)
                // Section enters from top. bottom is > viewportHeight * 0.2
                const isEnteringFromTop = rect.bottom < viewportHeight && rect.bottom >= viewportHeight * 0.2;

                if (velocity.current > 0 && isEnteringFromBottom) {
                    // Scrolling Down + Threshold Met
                    triggerSnap(section);
                } else if (velocity.current < 0 && isEnteringFromTop) {
                    // Scrolling Up + Threshold Met
                    triggerSnap(section);
                }
            });
        };

        const checkSnap = () => {
            // Find the section that takes up the most screen space and snap to it
            // This handles the "stopped scrolling" case
            if (isSnapping.current) return;

            let bestSection: HTMLElement | null = null;
            let maxOverlap = 0;
            const viewportHeight = window.innerHeight;

            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);

                if (visibleHeight > maxOverlap) {
                    maxOverlap = visibleHeight;
                    bestSection = section;
                }
            });

            if (bestSection && maxOverlap > viewportHeight * 0.2) {
                triggerSnap(bestSection);
            }
        };

        const triggerSnap = (target: HTMLElement) => {
            if (isSnapping.current) return;

            // Detect if we are already close enough (e.g. within 10px) to avoid jitter
            const rect = target.getBoundingClientRect();
            if (Math.abs(rect.top) < 10) return;

            isSnapping.current = true;

            // Custom smooth scroll for slower/controlled animation
            const targetY = window.scrollY + rect.top;
            smoothScrollTo(targetY, 1000); // 1000ms duration (slower)
        };

        const smoothScrollTo = (targetY: number, duration: number) => {
            const startY = window.scrollY;
            const distance = targetY - startY;
            let startTime: number | null = null;

            const animation = (currentTime: number) => {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const progress = Math.min(timeElapsed / duration, 1);

                // Easing: easeInOutQuad
                const ease = progress < 0.5
                    ? 2 * progress * progress
                    : 1 - Math.pow(-2 * progress + 2, 2) / 2;

                window.scrollTo(0, startY + distance * ease);

                if (timeElapsed < duration) {
                    requestAnimationFrame(animation);
                } else {
                    isSnapping.current = false;
                }
            };

            requestAnimationFrame(animation);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        lastScrollY.current = window.scrollY; // Init

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (snapTimeout.current) clearTimeout(snapTimeout.current);
        };
    }, []);
}
