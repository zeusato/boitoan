"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePalmStore } from "@/store/usePalmStore";
import { testConnection } from "@/lib/gemini";
import { X, Eye, EyeOff, Loader2, CheckCircle, AlertCircle, Key } from "lucide-react";

export default function SettingsModal() {
    const { apiKey, setApiKey, setShowSettings } = usePalmStore();
    const [inputKey, setInputKey] = useState(apiKey);
    const [showKey, setShowKey] = useState(false);
    const [testing, setTesting] = useState(false);
    const [testResult, setTestResult] = useState<{ success: boolean; model?: string; error?: string } | null>(null);

    const handleSave = () => {
        setApiKey(inputKey.trim());
        setShowSettings(false);
    };

    const handleTest = async () => {
        if (!inputKey.trim()) return;
        setTesting(true);
        setTestResult(null);
        const result = await testConnection(inputKey.trim());
        setTestResult(result);
        setTesting(false);
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                onClick={() => setShowSettings(false)}
            >
                {/* Backdrop */}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

                {/* Modal */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    transition={{ type: "spring", damping: 25 }}
                    className="relative glass-card-gold p-6 w-full max-w-md z-10"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close button */}
                    <button
                        onClick={() => setShowSettings(false)}
                        className="absolute top-4 right-4 text-mystic-muted hover:text-white transition-colors cursor-pointer"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    {/* Header */}
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center">
                            <Key className="w-5 h-5 text-mystic-dark" />
                        </div>
                        <div>
                            <h3 className="font-display text-lg font-bold text-gold">Cài Đặt API Key</h3>
                            <p className="text-xs text-mystic-muted">Nhập Google Gemini API Key của bạn</p>
                        </div>
                    </div>

                    {/* Info */}
                    <div className="bg-mystic-deeper/60 rounded-lg p-3 mb-4 text-xs text-mystic-muted leading-relaxed">
                        <p>
                            🔑 API Key được lưu trữ an toàn trên thiết bị của bạn (mã hóa base64 trong localStorage).
                            Key không bao giờ được gửi đến bất kỳ server nào ngoài Google AI.
                        </p>
                        <a
                            href="https://aistudio.google.com/app/apikey"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gold underline mt-2 inline-block"
                        >
                            👉 Lấy API Key miễn phí tại đây
                        </a>
                    </div>

                    {/* Input */}
                    <div className="relative mb-4">
                        <input
                            type={showKey ? "text" : "password"}
                            value={inputKey}
                            onChange={(e) => {
                                setInputKey(e.target.value);
                                setTestResult(null);
                            }}
                            placeholder="AIzaSy..."
                            className="w-full bg-mystic-deeper/80 border border-mystic-violet/40 rounded-xl px-4 py-3 pr-10 text-sm text-mystic-text placeholder:text-mystic-muted/50 focus:outline-none focus:border-gold/50 transition-colors"
                        />
                        <button
                            onClick={() => setShowKey(!showKey)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-mystic-muted hover:text-white transition-colors cursor-pointer"
                        >
                            {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    </div>

                    {/* Test result */}
                    {testResult && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className={`rounded-lg p-3 mb-4 text-sm flex items-center gap-2 ${testResult.success
                                    ? "bg-green-900/30 border border-green-500/30 text-green-300"
                                    : "bg-red-900/30 border border-red-500/30 text-red-300"
                                }`}
                        >
                            {testResult.success ? (
                                <>
                                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                                    <span>Kết nối thành công! Model: <strong>{testResult.model}</strong></span>
                                </>
                            ) : (
                                <>
                                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                    <span>{testResult.error}</span>
                                </>
                            )}
                        </motion.div>
                    )}

                    {/* Buttons */}
                    <div className="flex gap-3">
                        <button
                            onClick={handleTest}
                            disabled={testing || !inputKey.trim()}
                            className="flex-1 glass-card px-4 py-3 text-sm font-medium text-mystic-muted hover:text-white transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {testing ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                "🧪 Test Kết Nối"
                            )}
                        </button>
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={handleSave}
                            disabled={!inputKey.trim()}
                            className="flex-1 btn-shimmer text-mystic-dark font-bold px-4 py-3 rounded-xl cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            💾 Lưu Key
                        </motion.button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
