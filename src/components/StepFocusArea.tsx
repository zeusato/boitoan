"use client";

import { motion } from "framer-motion";
import { usePalmStore, FocusArea } from "@/store/usePalmStore";
import { ArrowLeft, Briefcase, Heart, Activity, Compass, Sparkles } from "lucide-react";

const FOCUS_OPTIONS: { value: FocusArea; label: string; icon: React.ReactNode; desc: string }[] = [
    {
        value: "general",
        label: "Tổng Quan",
        icon: <Compass className="w-6 h-6" />,
        desc: "Xem tất cả các phương diện",
    },
    {
        value: "career",
        label: "Sự Nghiệp",
        icon: <Briefcase className="w-6 h-6" />,
        desc: "Tài chính & Thăng tiến",
    },
    {
        value: "love",
        label: "Tình Duyên",
        icon: <Heart className="w-6 h-6" />,
        desc: "Hôn nhân & Các mối quan hệ",
    },
    {
        value: "health",
        label: "Sức Khỏe",
        icon: <Activity className="w-6 h-6" />,
        desc: "Năng lượng & Thể chất",
    },
];

export default function StepFocusArea() {
    const { setStep, focusArea, setFocusArea, userQuestion, setUserQuestion } =
        usePalmStore();

    const handleContinue = () => {
        setStep(5);
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center py-4"
        >
            <button
                onClick={() => setStep(3)}
                className="self-start mb-4 flex items-center gap-2 text-mystic-muted hover:text-gold transition-colors cursor-pointer"
            >
                <ArrowLeft className="w-4 h-4" /> Quay lại
            </button>

            <Sparkles className="w-8 h-8 text-gold mb-2" />
            <h2 className="font-display text-2xl font-bold text-gold-gradient mb-2">
                Chọn Lĩnh Vực
            </h2>
            <p className="text-mystic-muted text-sm mb-6 text-center max-w-xs">
                Bạn muốn AI tập trung phân tích phương diện nào?
            </p>

            {/* Focus Area Chips */}
            <div className="grid grid-cols-2 gap-3 w-full max-w-sm mb-6">
                {FOCUS_OPTIONS.map((opt) => (
                    <motion.button
                        key={opt.value}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setFocusArea(opt.value)}
                        className={`p-4 rounded-xl flex flex-col items-center gap-2 text-center transition-all cursor-pointer ${focusArea === opt.value
                                ? "glass-card-gold glow-gold text-gold"
                                : "glass-card text-mystic-muted hover:text-white"
                            }`}
                    >
                        {opt.icon}
                        <span className="font-semibold text-sm">{opt.label}</span>
                        <span className="text-xs opacity-70">{opt.desc}</span>
                    </motion.button>
                ))}
            </div>

            {/* Optional Question */}
            <div className="w-full max-w-sm mb-6">
                <label className="text-sm text-mystic-muted mb-2 block">
                    💭 Câu hỏi cụ thể <span className="opacity-50">(tuỳ chọn)</span>
                </label>
                <textarea
                    value={userQuestion}
                    onChange={(e) => setUserQuestion(e.target.value)}
                    placeholder="Ví dụ: Năm nay tôi có thăng tiến không?"
                    className="w-full bg-mystic-deeper/80 border border-mystic-violet/40 rounded-xl px-4 py-3 text-sm text-mystic-text placeholder:text-mystic-muted/50 focus:outline-none focus:border-gold/50 resize-none transition-colors"
                    rows={3}
                />
            </div>

            {/* Continue Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleContinue}
                className="btn-shimmer text-mystic-dark font-bold text-lg px-10 py-4 rounded-full glow-gold cursor-pointer"
            >
                🔮 Bắt Đầu Phân Tích
            </motion.button>
        </motion.div>
    );
}
