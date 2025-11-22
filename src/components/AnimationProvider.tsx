'use client';

import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function AnimationProvider({ children }: { children: React.ReactNode }) {
    useLayoutEffect(() => {
        // Refresh ScrollTrigger on mount to ensure correct positioning
        ScrollTrigger.refresh();
    }, []);

    return <>{children}</>;
}
