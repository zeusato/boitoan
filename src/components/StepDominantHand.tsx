"use client";

import { motion } from "framer-motion";
import { usePalmStore } from "@/store/usePalmStore";
import { ArrowLeft } from "lucide-react";

export default function StepDominantHand() {
    const { setStep, setDominantHand, setGender, gender, dominantHand } = usePalmStore();

    const handleSelectHand = (hand: "left" | "right") => {
        setDominantHand(hand);
        // Only advance if both are selected
        if (gender) {
            setStep(2);
        }
    };

    const handleSelectGender = (g: "male" | "female") => {
        setGender(g);
        // If hand is already selected, can advance
        if (dominantHand) {
            setStep(2);
        }
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
                Thông Tin Cơ Bản
            </h2>
            <p className="text-mystic-muted text-sm mb-6 max-w-xs">
                Vui lòng chọn giới tính và tay thuận để phân tích chuẩn xác nhất ("Nam tả nữ hữu").
            </p>

            {/* Gender Selection */}
            <h3 className="text-gold font-medium mb-3">1. Giới tính của bạn</h3>
            <div className="flex gap-4 mb-8">
                {/* Male */}
                <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSelectGender("male")}
                    className={`glass-card-gold p-4 flex flex-col items-center gap-2 w-28 cursor-pointer transition-all ${gender === "male" ? "border-gold bg-gold/10 glow-gold" : "opacity-70 hover:opacity-100"}`}
                >
                    <span className="text-4xl">👨</span>
                    <span className="text-gold font-medium text-sm">Nam</span>
                </motion.button>

                {/* Female */}
                <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSelectGender("female")}
                    className={`glass-card-gold p-4 flex flex-col items-center gap-2 w-28 cursor-pointer transition-all ${gender === "female" ? "border-gold bg-gold/10 glow-gold" : "opacity-70 hover:opacity-100"}`}
                >
                    <span className="text-4xl">👩</span>
                    <span className="text-gold font-medium text-sm">Nữ</span>
                </motion.button>
            </div>

            {/* Hand Selection */}
            <h3 className="text-gold font-medium mb-3">2. Bạn thuận tay nào?</h3>
            <div className="flex gap-6 mb-8">
                {/* Left hand */}
                <motion.button
                    whileHover={{ scale: 1.05, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSelectHand("left")}
                    className={`glass-card-gold p-6 flex flex-col items-center gap-3 w-36 cursor-pointer transition-all ${dominantHand === "left" ? "border-gold bg-gold/10 glow-gold" : "opacity-70 hover:opacity-100 hover:glow-gold"}`}
                >
                    <span className="text-5xl" style={{ transform: "scaleX(-1)", display: "inline-block" }}>🤚</span>
                    <span className="text-gold font-semibold">Tay trái</span>
                    <span className="text-xs text-mystic-muted">Thuận tay trái</span>
                </motion.button>

                {/* Right hand */}
                <motion.button
                    whileHover={{ scale: 1.05, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSelectHand("right")}
                    className={`glass-card-gold p-6 flex flex-col items-center gap-3 w-36 cursor-pointer transition-all ${dominantHand === "right" ? "border-gold bg-gold/10 glow-gold" : "opacity-70 hover:opacity-100 hover:glow-gold"}`}
                >
                    <span className="text-5xl">🤚</span>
                    <span className="text-gold font-semibold">Tay phải</span>
                    <span className="text-xs text-mystic-muted">Thuận tay phải</span>
                </motion.button>
            </div>

            {/* Continue Button */}
            <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: gender && dominantHand ? 1 : 0, scale: gender && dominantHand ? 1 : 0.9 }}
                className={`btn-mystic px-8 py-3 rounded-full font-medium ${!(gender && dominantHand) && "pointer-events-none"}`}
                onClick={() => setStep(2)}
            >
                Tiếp tục
            </motion.button>
        </motion.div>
    );
}
