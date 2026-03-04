"use client";

import { motion } from "framer-motion";
import { usePalmStore } from "@/store/usePalmStore";
import { Sparkles, Settings, Hand } from "lucide-react";

export default function StepWelcome() {
    const { setStep, setShowSettings, apiKey } = usePalmStore();

    const handleStart = () => {
        if (!apiKey) {
            setShowSettings(true);
            return;
        }
        setStep(1);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center py-8"
        >
            {/* Settings button */}
            <button
                onClick={() => setShowSettings(true)}
                className="absolute top-4 right-4 p-2 rounded-full glass-card hover:border-gold/40 transition-all cursor-pointer z-20"
                aria-label="Cài đặt"
            >
                <Settings className="w-5 h-5 text-mystic-muted" />
            </button>

            {/* Logo / Icon */}
            <motion.div
                className="relative w-32 h-32 mb-6"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-mystic-violet to-mystic-accent opacity-40 blur-xl animate-pulse-glow" />
                <div className="relative w-full h-full flex items-center justify-center rounded-full glass-card-gold glow-gold">
                    <Hand className="w-16 h-16 text-gold" />
                </div>
            </motion.div>

            {/* Title */}
            <h1 className="font-display text-3xl md:text-4xl font-bold text-gold-gradient mb-3">
                Bói Chỉ Tay AI
            </h1>
            <p className="text-lg text-mystic-muted font-display italic mb-2">
                Khám Phá Vận Mệnh Qua Đường Chỉ Tay
            </p>

            {/* Description */}
            <div className="glass-card p-6 mb-8 max-w-sm">
                <div className="flex items-center gap-2 mb-3 justify-center">
                    <Sparkles className="w-4 h-4 text-gold" />
                    <span className="text-sm text-gold font-medium">Trí tuệ nhân tạo kết hợp tướng số học</span>
                    <Sparkles className="w-4 h-4 text-gold" />
                </div>
                <p className="text-sm text-mystic-muted leading-relaxed">
                    Chụp ảnh 2 bàn tay của bạn, AI sẽ phân tích đường Sinh Đạo, Trí Đạo,
                    Tâm Đạo và các gò bàn tay để tiết lộ bí mật vận mệnh của bạn.
                </p>
            </div>

            {/* CTA Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStart}
                className="btn-shimmer text-mystic-dark font-bold text-lg px-10 py-4 rounded-full glow-gold cursor-pointer"
            >
                🔮 Bắt Đầu Khám Phá
            </motion.button>

            {!apiKey && (
                <p className="text-xs text-mystic-muted mt-4 opacity-70">
                    Bạn cần nhập API Key trước khi bắt đầu
                </p>
            )}
        </motion.div>
    );
}
