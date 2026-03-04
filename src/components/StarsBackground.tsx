"use client";

import { useState, useEffect, useMemo } from "react";

export default function StarsBackground() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const stars = useMemo(() => {
        if (!mounted) return null;
        return Array.from({ length: 50 }).map((_, i) => (
            <div
                key={i}
                className="star"
                style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 4}s`,
                    animationDuration: `${3 + Math.random() * 4}s`,
                    opacity: 0.3 + Math.random() * 0.7,
                    width: `${1 + Math.random() * 2}px`,
                    height: `${1 + Math.random() * 2}px`,
                }}
            />
        ));
    }, [mounted]);

    if (!mounted) return <div className="stars" />;

    return <div className="stars">{stars}</div>;
}
