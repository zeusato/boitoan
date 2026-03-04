"use client";

import { useEffect, useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import { usePalmStore } from "@/store/usePalmStore";
import StepWelcome from "@/components/StepWelcome";
import StepDominantHand from "@/components/StepDominantHand";
import StepCamera from "@/components/StepCamera";
import StepFocusArea from "@/components/StepFocusArea";
import StepAnalysis from "@/components/StepAnalysis";
import StepResult from "@/components/StepResult";
import SettingsModal from "@/components/SettingsModal";
import InstallPrompt from "@/components/InstallPrompt";
import StarsBackground from "@/components/StarsBackground";

export default function Home() {
  const { currentStep, showSettings, setShowSettings } = usePalmStore();

  // Show settings on first visit if no key stored
  useEffect(() => {
    const encryptedKey = localStorage.getItem("palm_api_key");
    if (!encryptedKey) {
      setShowSettings(true);
    }
  }, [setShowSettings]);

  const stepComponent = useMemo(() => {
    switch (currentStep) {
      case 0:
        return <StepWelcome key="welcome" />;
      case 1:
        return <StepDominantHand key="hand" />;
      case 2:
        return <StepCamera key="cam-left" hand="left" />;
      case 3:
        return <StepCamera key="cam-right" hand="right" />;
      case 4:
        return <StepFocusArea key="focus" />;
      case 5:
        return <StepAnalysis key="analysis" />;
      case 6:
        return <StepResult key="result" />;
      default:
        return <StepWelcome key="welcome-default" />;
    }
  }, [currentStep]);

  return (
    <main className="relative min-h-dvh flex flex-col items-center justify-center p-4">
      <StarsBackground />
      <div className="relative z-10 w-full max-w-lg mx-auto">
        <AnimatePresence mode="wait">
          {stepComponent}
        </AnimatePresence>
      </div>

      {showSettings && <SettingsModal />}
      <InstallPrompt />
    </main>
  );
}
