"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, X } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
    prompt(): Promise<void>;
    userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function InstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [showBanner, setShowBanner] = useState(false);
    const [dismissed, setDismissed] = useState(false);

    useEffect(() => {
        // Check if already dismissed in this session
        const wasDismissed = sessionStorage.getItem("pwa_install_dismissed");
        if (wasDismissed) {
            setDismissed(true);
            return;
        }

        const handler = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e as BeforeInstallPromptEvent);
            setShowBanner(true);
        };

        window.addEventListener("beforeinstallprompt", handler);
        return () => window.removeEventListener("beforeinstallprompt", handler);
    }, []);

    const handleInstall = async () => {
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === "accepted") {
            setShowBanner(false);
        }
        setDeferredPrompt(null);
    };

    const handleDismiss = () => {
        setShowBanner(false);
        setDismissed(true);
        sessionStorage.setItem("pwa_install_dismissed", "true");
    };

    if (dismissed || !showBanner) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                transition={{ type: "spring", damping: 20 }}
                className="install-banner"
            >
                <div className="glass-card-gold p-4 flex items-center gap-3 glow-gold max-w-lg mx-auto">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold to-gold-light flex items-center justify-center flex-shrink-0">
                        <Download className="w-5 h-5 text-mystic-dark" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gold">Cài Đặt Ứng Dụng</p>
                        <p className="text-xs text-mystic-muted truncate">
                            Thêm vào màn hình chính để trải nghiệm tốt hơn
                        </p>
                    </div>
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={handleInstall}
                        className="btn-shimmer text-mystic-dark font-bold px-4 py-2 rounded-lg text-sm flex-shrink-0 cursor-pointer"
                    >
                        Tải App
                    </motion.button>
                    <button
                        onClick={handleDismiss}
                        className="text-mystic-muted hover:text-white transition-colors cursor-pointer flex-shrink-0"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
