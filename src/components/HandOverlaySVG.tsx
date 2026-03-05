"use client";

export default function HandOverlaySVG({ mirrored = false }: { mirrored?: boolean }) {
    return (
        <svg
            viewBox="0 0 300 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ transform: mirrored ? "scaleX(-1)" : "none" }}
        >
            {/* Open palm outline */}
            <path
                d="M 60 400
                   C 60 360, 65 310, 65 260
                   C 65 240, 50 200, 35 150
                   C 30 130, 45 120, 55 135
                   C 65 150, 75 190, 85 220
                   C 75 160, 60 80, 50 30
                   C 45 10, 65 0, 75 25
                   C 85 50, 105 130, 115 180
                   C 105 110, 95 30, 95 -5
                   C 95 -25, 120 -25, 125 0
                   C 130 30, 140 120, 150 170
                   C 145 110, 145 40, 150 10
                   C 155 -10, 180 -5, 175 20
                   C 170 50, 160 140, 165 190
                   C 180 150, 210 100, 230 80
                   C 250 60, 275 80, 255 110
                   C 235 140, 205 190, 195 240
                   C 185 290, 200 340, 200 400
                   Z"
                stroke="rgba(212, 175, 55, 0.6)"
                strokeWidth="2.5"
                strokeDasharray="8 4"
                fill="none"
            />
            {/* Palm lines hints */}
            <path
                d="M 80 200 Q 150 180 220 195"
                stroke="rgba(212, 175, 55, 0.25)"
                strokeWidth="1.5"
                strokeDasharray="4 3"
                fill="none"
            />
            <path
                d="M 85 230 Q 140 215 200 225"
                stroke="rgba(212, 175, 55, 0.25)"
                strokeWidth="1.5"
                strokeDasharray="4 3"
                fill="none"
            />
            <path
                d="M 130 195 Q 120 260 110 320"
                stroke="rgba(212, 175, 55, 0.25)"
                strokeWidth="1.5"
                strokeDasharray="4 3"
                fill="none"
            />
        </svg>
    );
}
