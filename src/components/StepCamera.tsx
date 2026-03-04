"use client";

import { useRef, useCallback, useState } from "react";
import Webcam from "react-webcam";
import { motion } from "framer-motion";
import { usePalmStore } from "@/store/usePalmStore";
import { Camera, RotateCcw, ArrowLeft, ArrowRight } from "lucide-react";
import HandOverlaySVG from "./HandOverlaySVG";

interface StepCameraProps {
    hand: "left" | "right";
}

export default function StepCamera({ hand }: StepCameraProps) {
    const webcamRef = useRef<Webcam>(null);
    const { setStep, setLeftHandImage, setRightHandImage, leftHandImage, rightHandImage } =
        usePalmStore();
    const [captured, setCaptured] = useState<string | null>(
        hand === "left" ? leftHandImage : rightHandImage
    );
    const [facingMode, setFacingMode] = useState<"user" | "environment">("environment");

    const isLeft = hand === "left";
    const prevStep = isLeft ? 1 : 2;
    const nextStep = isLeft ? 3 : 4;

    const videoConstraints = {
        width: 720,
        height: 960,
        facingMode,
    };

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current?.getScreenshot();
        if (imageSrc) {
            setCaptured(imageSrc);
            if (isLeft) {
                setLeftHandImage(imageSrc);
            } else {
                setRightHandImage(imageSrc);
            }
        }
    }, [isLeft, setLeftHandImage, setRightHandImage]);

    const retake = () => {
        setCaptured(null);
        if (isLeft) {
            setLeftHandImage(null);
        } else {
            setRightHandImage(null);
        }
    };

    const toggleCamera = () => {
        setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
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
                onClick={() => setStep(prevStep)}
                className="self-start mb-4 flex items-center gap-2 text-mystic-muted hover:text-gold transition-colors cursor-pointer"
            >
                <ArrowLeft className="w-4 h-4" /> Quay lại
            </button>

            <h2 className="font-display text-xl font-bold text-gold-gradient mb-1">
                Chụp Ảnh {isLeft ? "Tay Trái" : "Tay Phải"}
            </h2>
            <p className="text-mystic-muted text-sm mb-4 text-center">
                {isLeft
                    ? "Đặt bàn tay trái vào khung hình, xòe rộng các ngón tay"
                    : "Đặt bàn tay phải vào khung hình, xòe rộng các ngón tay"}
            </p>

            {/* Camera / Preview */}
            <div className="camera-container glass-card overflow-hidden mb-4">
                {captured ? (
                    <img
                        src={captured}
                        alt={`Ảnh ${isLeft ? "tay trái" : "tay phải"}`}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <>
                        <Webcam
                            ref={webcamRef}
                            audio={false}
                            screenshotFormat="image/jpeg"
                            screenshotQuality={0.85}
                            videoConstraints={videoConstraints}
                            mirrored={facingMode === "user"}
                            className="w-full h-full object-cover"
                        />
                        <div className="hand-overlay">
                            <HandOverlaySVG mirrored={!isLeft} />
                        </div>
                    </>
                )}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4">
                {captured ? (
                    <>
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={retake}
                            className="glass-card px-5 py-3 flex items-center gap-2 text-mystic-muted hover:text-white transition-colors cursor-pointer"
                        >
                            <RotateCcw className="w-4 h-4" /> Chụp lại
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setStep(nextStep)}
                            className="btn-shimmer text-mystic-dark font-bold px-6 py-3 rounded-full cursor-pointer flex items-center gap-2"
                        >
                            Tiếp tục <ArrowRight className="w-4 h-4" />
                        </motion.button>
                    </>
                ) : (
                    <>
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={toggleCamera}
                            className="glass-card p-3 rounded-full text-mystic-muted hover:text-white transition-colors cursor-pointer"
                            aria-label="Đổi camera"
                        >
                            <RotateCcw className="w-5 h-5" />
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={capture}
                            className="w-16 h-16 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center glow-gold cursor-pointer"
                        >
                            <Camera className="w-7 h-7 text-mystic-dark" />
                        </motion.button>
                    </>
                )}
            </div>

            {/* Step indicator */}
            <div className="flex gap-2 mt-6">
                {[1, 2, 3, 4].map((s) => (
                    <div
                        key={s}
                        className={`w-2 h-2 rounded-full transition-colors ${s <= (isLeft ? 2 : 3) ? "bg-gold" : "bg-mystic-violet"
                            }`}
                    />
                ))}
            </div>
        </motion.div>
    );
}
