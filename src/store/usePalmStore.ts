import { create } from "zustand";

export type FocusArea = "general" | "career" | "love" | "health";

interface PalmState {
    // Flow control
    currentStep: number;
    setStep: (step: number) => void;

    // Settings
    apiKey: string;
    setApiKey: (key: string) => void;
    showSettings: boolean;
    setShowSettings: (show: boolean) => void;

    // Hand & Gender selection
    gender: "male" | "female" | null;
    setGender: (gender: "male" | "female") => void;
    dominantHand: "left" | "right" | null;
    setDominantHand: (hand: "left" | "right") => void;

    // Camera captures
    leftHandImage: string | null;
    setLeftHandImage: (img: string | null) => void;
    rightHandImage: string | null;
    setRightHandImage: (img: string | null) => void;

    // Focus area
    focusArea: FocusArea;
    setFocusArea: (area: FocusArea) => void;
    userQuestion: string;
    setUserQuestion: (q: string) => void;

    // Result
    analysisResult: string | null;
    setAnalysisResult: (result: string | null) => void;
    isAnalyzing: boolean;
    setIsAnalyzing: (v: boolean) => void;

    // Reset
    reset: () => void;
}

const getStoredApiKey = (): string => {
    if (typeof window === "undefined") return "";
    try {
        const encrypted = localStorage.getItem("palm_api_key");
        if (!encrypted) return "";
        return atob(encrypted);
    } catch {
        return "";
    }
};

export const usePalmStore = create<PalmState>((set) => ({
    currentStep: 0,
    setStep: (step) => set({ currentStep: step }),

    apiKey: "",
    setApiKey: (key) => {
        if (typeof window !== "undefined") {
            localStorage.setItem("palm_api_key", btoa(key));
        }
        set({ apiKey: key });
    },
    showSettings: false,
    setShowSettings: (show) => set({ showSettings: show }),

    gender: null,
    setGender: (gender) => set({ gender }),
    dominantHand: null,
    setDominantHand: (hand) => set({ dominantHand: hand }),

    leftHandImage: null,
    setLeftHandImage: (img) => set({ leftHandImage: img }),
    rightHandImage: null,
    setRightHandImage: (img) => set({ rightHandImage: img }),

    focusArea: "general",
    setFocusArea: (area) => set({ focusArea: area }),
    userQuestion: "",
    setUserQuestion: (q) => set({ userQuestion: q }),

    analysisResult: null,
    setAnalysisResult: (result) => set({ analysisResult: result }),
    isAnalyzing: false,
    setIsAnalyzing: (v) => set({ isAnalyzing: v }),

    reset: () =>
        set({
            currentStep: 0,
            gender: null,
            dominantHand: null,
            leftHandImage: null,
            rightHandImage: null,
            focusArea: "general",
            userQuestion: "",
            analysisResult: null,
            isAnalyzing: false,
        }),
}));

// Hydrate API key from localStorage on client
if (typeof window !== "undefined") {
    const key = getStoredApiKey();
    if (key) {
        usePalmStore.setState({ apiKey: key });
    }
}
