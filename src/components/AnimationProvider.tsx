'use client';

import useScrollAnimation from '@/hooks/useScrollAnimation';

export default function AnimationProvider({ children }: { children: React.ReactNode }) {
    useScrollAnimation();
    return <>{children}</>;
}
