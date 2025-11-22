'use client';

import { useEffect, useRef, useState } from 'react';

export default function Signature() {
    const [isVisible, setIsVisible] = useState(false);
    const pathRef = useRef<SVGPathElement>(null);

    useEffect(() => {
        setTimeout(() => setIsVisible(true), 500);
    }, []);

    return (
        <div className={`relative w-48 h-24 opacity-0 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : ''}`}>
            <svg
                viewBox="0 0 200 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
            >
                <path
                    ref={pathRef}
                    d="M20,60 C40,50 50,80 70,60 C80,50 90,40 110,50 C130,60 140,30 160,50 C170,60 180,70 190,50"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="300"
                    strokeDashoffset={isVisible ? 0 : 300}
                    className="transition-all duration-[2000ms] ease-out"
                    style={{ transitionDelay: '1000ms' }}
                />
            </svg>
        </div>
    );
}
