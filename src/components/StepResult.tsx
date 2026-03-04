"use client";

import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { usePalmStore } from "@/store/usePalmStore";
import { Download, RotateCcw, Share2 } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { QRCodeSVG } from "qrcode.react";
const PLACEHOLDER_URL = "https://boitoan.vercel.app";
export default function StepResult() {
    const { analysisResult, leftHandImage, rightHandImage, dominantHand, focusArea, reset } =
        usePalmStore();
    const pdfRef = useRef<HTMLDivElement>(null);

    const focusLabels: Record<string, string> = {
        general: "Tổng Quan",
        career: "Sự Nghiệp & Tiền Tài",
        love: "Tình Duyên & Hôn Nhân",
        health: "Sức Khỏe & Năng Lượng",
    };

    const exportPDF = useCallback(async () => {
        if (!pdfRef.current) return;
        const el = pdfRef.current;
        el.style.display = "block";

        await new Promise((r) => setTimeout(r, 300));

        try {
            const canvas = await html2canvas(el, {
                scale: 4, // Tăng nét cho PDF
                backgroundColor: "#0f0520",
                useCORS: true,
                logging: false,
            });

            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = pdfWidth;
            const imgHeight = (canvas.height * pdfWidth) / canvas.width;

            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
            heightLeft -= pdfHeight;

            while (heightLeft > 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
                heightLeft -= pdfHeight;
            }

            pdf.save("ban-do-van-menh.pdf");
        } finally {
            el.style.display = "none";
        }
    }, []);

    const handleShare = async () => {
        if ('share' in navigator) {
            try {
                await navigator.share({
                    title: "Bói Chỉ Tay AI - Kết Quả Phân Tích",
                    text: "Xem kết quả phân tích vận mệnh qua đường chỉ tay của tôi!",
                    url: PLACEHOLDER_URL,
                });
            } catch {
                // User cancelled
            }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center py-4 w-full"
        >
            {/* Header */}
            <div className="text-center mb-6">
                <h2 className="font-display text-2xl font-bold text-gold-gradient mb-1">
                    🔮 Bản Đồ Vận Mệnh
                </h2>
                <p className="text-mystic-muted text-sm">
                    Trọng tâm: {focusLabels[focusArea] || "Tổng Quan"}
                </p>
            </div>

            {/* Hand images */}
            <div className="flex gap-3 mb-6 w-full">
                <div className="flex-1 glass-card-gold overflow-hidden">
                    <div className="aspect-[3/4] relative">
                        {leftHandImage && (
                            <img src={leftHandImage} alt="Tay trái" className="w-full h-full object-cover" />
                        )}
                    </div>
                    <p className="text-center text-xs text-gold py-2 font-display">
                        {dominantHand === "left" ? "✋ Nỗ lực thực tại" : "✋ Vận mệnh bẩm sinh"}
                    </p>
                </div>
                <div className="flex-1 glass-card-gold overflow-hidden">
                    <div className="aspect-[3/4] relative">
                        {rightHandImage && (
                            <img src={rightHandImage} alt="Tay phải" className="w-full h-full object-cover" />
                        )}
                    </div>
                    <p className="text-center text-xs text-gold py-2 font-display">
                        {dominantHand === "right" ? "✋ Nỗ lực thực tại" : "✋ Vận mệnh bẩm sinh"}
                    </p>
                </div>
            </div>

            {/* Analysis Content */}
            <div className="glass-card p-5 w-full mb-6 analysis-content">
                <ReactMarkdown>{analysisResult || ""}</ReactMarkdown>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 flex-wrap justify-center mb-6">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={exportPDF}
                    className="glass-card-gold px-5 py-3 flex items-center gap-2 text-gold font-semibold cursor-pointer hover:glow-gold transition-shadow"
                >
                    <Download className="w-4 h-4" /> Xuất PDF
                </motion.button>

                {typeof navigator !== "undefined" && 'share' in navigator && (
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleShare}
                        className="glass-card px-5 py-3 flex items-center gap-2 text-mystic-muted cursor-pointer hover:text-white transition-colors"
                    >
                        <Share2 className="w-4 h-4" /> Chia sẻ
                    </motion.button>
                )}

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={reset}
                    className="glass-card px-5 py-3 flex items-center gap-2 text-mystic-muted cursor-pointer hover:text-white transition-colors"
                >
                    <RotateCcw className="w-4 h-4" /> Bói lại
                </motion.button>
            </div>

            {/* Hidden PDF Layout */}
            <div
                ref={pdfRef}
                style={{ display: "none", position: "absolute", left: "-9999px" }}
                className="pdf-layout"
            >
                {/* PDF Header */}
                <div style={{ textAlign: "center", marginBottom: "30px" }}>
                    <h1 style={{ fontSize: "28px", color: "#d4af37", marginBottom: "5px", fontFamily: "'Playfair Display', serif" }}>
                        🔮 BẢN ĐỒ VẬN MỆNH QUA CHỈ TAY
                    </h1>
                    <p style={{ color: "#9f8cb8", fontSize: "14px" }}>
                        Trọng tâm: {focusLabels[focusArea] || "Tổng Quan"}
                    </p>
                    <div
                        style={{
                            width: "100px",
                            height: "2px",
                            background: "linear-gradient(90deg, transparent, #d4af37, transparent)",
                            margin: "15px auto",
                        }}
                    />
                </div>

                {/* PDF Images */}
                <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
                    <div style={{ flex: 1, textAlign: "center" }}>
                        <div
                            style={{
                                border: "2px solid rgba(212, 175, 55, 0.3)",
                                borderRadius: "12px",
                                overflow: "hidden",
                                marginBottom: "8px",
                            }}
                        >
                            {leftHandImage && (
                                <img src={leftHandImage} alt="Tay trái" style={{ width: "100%", height: "280px", objectFit: "cover" }} />
                            )}
                        </div>
                        <p style={{ color: "#d4af37", fontSize: "13px", fontFamily: "'Playfair Display', serif" }}>
                            {dominantHand === "left" ? "✋ Nỗ lực thực tại" : "✋ Vận mệnh bẩm sinh"}
                        </p>
                    </div>
                    <div style={{ flex: 1, textAlign: "center" }}>
                        <div
                            style={{
                                border: "2px solid rgba(212, 175, 55, 0.3)",
                                borderRadius: "12px",
                                overflow: "hidden",
                                marginBottom: "8px",
                            }}
                        >
                            {rightHandImage && (
                                <img src={rightHandImage} alt="Tay phải" style={{ width: "100%", height: "280px", objectFit: "cover" }} />
                            )}
                        </div>
                        <p style={{ color: "#d4af37", fontSize: "13px", fontFamily: "'Playfair Display', serif" }}>
                            {dominantHand === "right" ? "✋ Nỗ lực thực tại" : "✋ Vận mệnh bẩm sinh"}
                        </p>
                    </div>
                </div>

                {/* PDF Analysis */}
                <div
                    style={{
                        background: "rgba(26, 11, 46, 0.6)",
                        border: "1px solid rgba(139, 92, 246, 0.2)",
                        borderRadius: "12px",
                        padding: "24px",
                        marginBottom: "30px",
                    }}
                    className="analysis-content"
                >
                    <ReactMarkdown>{analysisResult || ""}</ReactMarkdown>
                </div>

                {/* PDF Footer */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderTop: "1px solid rgba(212, 175, 55, 0.2)",
                        paddingTop: "20px",
                    }}
                >
                    <div>
                        <p style={{ color: "#d4af37", fontSize: "13px", fontFamily: "'Playfair Display', serif", marginBottom: "4px" }}>
                            ✨ Chúc bạn gặp nhiều may mắn và an lành ✨
                        </p>
                        <p style={{ color: "#9f8cb8", fontSize: "11px" }}>
                            Kết quả chỉ mang tính tham khảo. Hãy sống tích cực và chủ động tạo lập tương lai tươi sáng.
                        </p>
                    </div>
                    <div style={{ textAlign: "center" }}>
                        <QRCodeSVG
                            value={PLACEHOLDER_URL}
                            size={80}
                            bgColor="transparent"
                            fgColor="#d4af37"
                            level="M"
                        />
                        <p style={{ color: "#9f8cb8", fontSize: "9px", marginTop: "4px" }}>Quét để trải nghiệm</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
