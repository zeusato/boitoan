"use client";

import { motion } from "framer-motion";
import { usePalmStore } from "@/store/usePalmStore";
import { ArrowLeft } from "lucide-react";

export default function StepDominantHand() {
    const { setStep, setDominantHand } = usePalmStore();

    const handleSelect = (hand: "left" | "right") => {
        setDominantHand(hand);
        setStep(2);
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center text-center py-8"
        >
            <button
                onClick={() => setStep(0)}
                className="self-start mb-6 flex items-center gap-2 text-mystic-muted hover:text-gold transition-colors cursor-pointer"
            >
                <ArrowLeft className="w-4 h-4" /> Quay lại
            </button>

            <h2 className="font-display text-2xl font-bold text-gold-gradient mb-2">
                Chọn Tay Thuận
            </h2>
            <p className="text-mystic-muted text-sm mb-8 max-w-xs">
                Tay thuận của bạn phản ánh thực tại và nỗ lực hiện tại. Tay còn lại phản ánh vận mệnh bẩm sinh.
            </p>

            <div className="flex gap-6">
                {/* Left hand */}
                <motion.button
                    whileHover={{ scale: 1.05, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSelect("left")}
                    className="glass-card-gold p-6 flex flex-col items-center gap-3 w-36 cursor-pointer hover:glow-gold transition-shadow"
                >
                    <span className="text-5xl" style={{ transform: "scaleX(-1)", display: "inline-block" }}>🤚</span>
                    <span className="text-gold font-semibold">Tay trái</span>
                    <span className="text-xs text-mystic-muted">Thuận tay trái</span>
                </motion.button>

                {/* Right hand */}
                <motion.button
                    whileHover={{ scale: 1.05, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSelect("right")}
                    className="glass-card-gold p-6 flex flex-col items-center gap-3 w-36 cursor-pointer hover:glow-gold transition-shadow"
                >
                    <span className="text-5xl">🤚</span>
                    <span className="text-gold font-semibold">Tay phải</span>
                    <span className="text-xs text-mystic-muted">Thuận tay phải</span>
                </motion.button>
            </div>
        </motion.div>
    );
}
