import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, RotateCcw, MousePointerClick, Globe } from "lucide-react";

const steps = [
  {
    icon: Globe,
    title: "Your App Globe",
    description: "All your apps live on this 3D globe. It's your personal launcher.",
  },
  {
    icon: RotateCcw,
    title: "Rotate to Explore",
    description: "Click and drag to spin the globe and discover apps on every side.",
  },
  {
    icon: MousePointerClick,
    title: "Tap to Launch",
    description: "Click any app icon on the globe to open it. That's it — you're ready!",
  },
];

interface OnboardingTourProps {
  onComplete: () => void;
}

export default function OnboardingTour({ onComplete }: OnboardingTourProps) {
  const [step, setStep] = useState(0);
  const current = steps[step];
  const Icon = current.icon;
  const isLast = step === steps.length - 1;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end justify-center pb-28 pointer-events-none"
    >
      {/* Dim overlay */}
      <div className="absolute inset-0 bg-background/40 backdrop-blur-sm pointer-events-auto" />

      {/* Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -15, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="relative z-10 glass glow-border rounded-2xl px-7 py-6 max-w-xs w-full text-center pointer-events-auto"
        >
          {/* Icon */}
          <div className="mx-auto mb-3 w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center">
            <Icon className="w-6 h-6 text-primary" />
          </div>

          <h3 className="text-foreground font-semibold text-base mb-1">{current.title}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-5">{current.description}</p>

          {/* Progress dots + button */}
          <div className="flex items-center justify-between">
            <div className="flex gap-1.5">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === step ? "w-5 bg-primary" : "w-1.5 bg-muted-foreground/30"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => (isLast ? onComplete() : setStep(step + 1))}
              className="flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              {isLast ? "Get Started" : "Next"}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Skip */}
          {!isLast && (
            <button
              onClick={onComplete}
              className="mt-3 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Skip tour
            </button>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
