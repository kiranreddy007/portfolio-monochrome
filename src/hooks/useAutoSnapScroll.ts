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
                // Low pass filter velocity slightly to reduce noise
                const instantVelocity = dy / dt;
                velocity.current = 0.8 * velocity.current + 0.2 * instantVelocity;
            }

            lastScrollY.current = currentScrollY;
            lastTime.current = currentTime;

            // 1. If we are currently snapping, DO NOTHING.
            // This prevents fighting.
            if (isSnapping.current) return;

            // 2. Fast scroll protection
            // If moving faster than 2px/ms, don't initiate a snap.
            // We want to let the user scroll freely if they are moving fast.
            if (Math.abs(velocity.current) > 2) {
                if (snapTimeout.current) clearTimeout(snapTimeout.current);
                return;
            }

            // 3. Debounce the threshold check slightly
            if (snapTimeout.current) clearTimeout(snapTimeout.current);
            snapTimeout.current = setTimeout(checkThresholdSnap, 50);
        };

        const checkThresholdSnap = () => {
            if (isSnapping.current) return;

            const viewportHeight = window.innerHeight;

            sections.forEach(section => {
                const rect = section.getBoundingClientRect();

                // --- SNAP LOGIC ---
                // We only care about crossing the threshold.

                // Scrolling DOWN: 
                // Target is the section below us. 
                // Trigger: Its TOP edge is within the viewport, high enough to cover 20%.
                // Condition: rect.top <= viewportHeight * 0.8
                // AND it shouldn't be "above" the viewport (rect.top > 0)
                const isNextSection = rect.top > 10 && rect.top <= viewportHeight * 0.8;

                // Scrolling UP:
                // Target is the section above us.
                // Trigger: Its BOTTOM edge is visible and covers > 20% from top.
                // Condition: rect.bottom >= viewportHeight * 0.2
                // AND it shouldn't be "below" the viewport completely
                const isPrevSection = rect.bottom < viewportHeight - 10 && rect.bottom >= viewportHeight * 0.2;

                if (velocity.current > 0.1 && isNextSection) {
                    // Moving Down -> Snap to this next section
                    triggerSnap(section);
                } else if (velocity.current < -0.1 && isPrevSection) {
                    // Moving Up -> Snap to this previous section
                    triggerSnap(section);
                }
            });
        };

        const triggerSnap = (target: HTMLElement) => {
            if (isSnapping.current) return;

            // Allow Lenis to handle the scroll
            if (window.lenis) {
                isSnapping.current = true;

                window.lenis.scrollTo(target, {
                    offset: 0,
                    duration: 1.2, // 1.2s duration (slower/smoother)
                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Same easing
                    lock: true, // Optional: lock scroll while snapping to prevent fighting? 
                    // Better not to lock hard, but 'immediate' usually overrides.
                    // Lenis 'lock' might prevent user interruption which can be bad.
                    // Let's keep it unlocked but set flag.
                    onComplete: () => {
                        isSnapping.current = false;
                    }
                });

                // Fail-safe unlock
                setTimeout(() => {
                    isSnapping.current = false;
                }, 1300);
            } else {
                // Fallback if Lenis isn't ready
                target.scrollIntoView({ behavior: 'smooth' });
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        lastScrollY.current = window.scrollY; // Init

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (snapTimeout.current) clearTimeout(snapTimeout.current);
        };
    }, []);
}
