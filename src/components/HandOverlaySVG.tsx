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
                d="
          M 150 380
          C 90 380 55 340 50 290
          L 45 230
          C 42 210 40 195 38 180
          L 30 140
          C 25 115 30 100 42 95
          C 54 90 65 100 68 120
          L 75 155
          L 72 100
          L 65 55
          C 62 35 70 20 85 18
          C 100 16 108 30 110 50
          L 118 105
          L 115 50
          L 112 25
          C 110 8 120 -5 135 -5
          C 150 -5 158 8 156 25
          L 150 80
          L 152 50
          L 158 20
          C 160 2 172 -8 187 -5
          C 202 -2 208 12 205 30
          L 195 85
          L 200 65
          L 210 40
          C 215 22 228 18 240 25
          C 252 32 255 48 248 68
          L 225 135
          L 240 180
          C 245 200 248 220 250 240
          L 252 290
          C 250 340 215 380 150 380
          Z
        "
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
