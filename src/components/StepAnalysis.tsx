"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { usePalmStore } from "@/store/usePalmStore";
import { analyzePalm } from "@/lib/gemini";

export default function StepAnalysis() {
    const {
        apiKey,
        leftHandImage,
        rightHandImage,
        dominantHand,
        focusArea,
        userQuestion,
        setAnalysisResult,
        setIsAnalyzing,
        setStep,
    } = usePalmStore();

    useEffect(() => {
        let cancelled = false;

        async function run() {
            if (!apiKey || !leftHandImage || !rightHandImage || !dominantHand) {
                setStep(0);
                return;
            }
            setIsAnalyzing(true);
            try {
                const result = await analyzePalm(
                    apiKey,
                    leftHandImage,
                    rightHandImage,
                    dominantHand,
                    focusArea,
                    userQuestion
                );
                if (!cancelled) {
                    setAnalysisResult(result);
                    setStep(6);
                }
            } catch (err: unknown) {
                if (!cancelled) {
                    const message = err instanceof Error ? err.message : "Lỗi không xác định";
                    setAnalysisResult(`## ❌ Đã xảy ra lỗi\n\n${message}\n\nVui lòng kiểm tra lại API Key và thử lại.`);
                    setStep(6);
                }
            } finally {
                if (!cancelled) setIsAnalyzing(false);
            }
        }

        run();
        return () => {
            cancelled = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center py-16"
        >
            {/* Mystic loading animation */}
            <div className="relative w-40 h-40 mb-8">
                {/* Outer ring */}
                <motion.div
                    className="absolute inset-0 rounded-full border-2 border-gold/30"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
                {/* Middle ring */}
                <motion.div
                    className="absolute inset-4 rounded-full border-2 border-mystic-glow/40"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                />
                {/* Inner ring */}
                <motion.div
                    className="absolute inset-8 rounded-full border-2 border-gold/50"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
                {/* Center icon */}
                <motion.div
                    className="absolute inset-0 flex items-center justify-center text-5xl"
                    animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    🔮
                </motion.div>
            </div>

            <h2 className="font-display text-2xl font-bold text-gold-gradient mb-3">
                Đang Phân Tích Vận Mệnh...
            </h2>

            {/* Loading steps */}
            <div className="space-y-2">
                {[
                    "Đọc các đường chỉ tay chính...",
                    "Phân tích các Gò bàn tay...",
                    "Tổng hợp kết quả vận mệnh...",
                ].map((text, i) => (
                    <motion.p
                        key={i}
                        className="text-mystic-muted text-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0.5] }}
                        transition={{ delay: i * 2, duration: 2, repeat: Infinity }}
                    >
                        ✨ {text}
                    </motion.p>
                ))}
            </div>
        </motion.div>
    );
}
