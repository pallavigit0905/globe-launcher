import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut } from "lucide-react";
import EarthGlobe from "@/components/EarthGlobe";
import LoginForm from "@/components/LoginForm";
import OnboardingTour from "@/components/OnboardingTour";
import { useAuth } from "@/contexts/AuthContext";
import { appList } from "@/data/apps";

const Index = () => {
  const navigate = useNavigate();
  const { user, loading, signOut } = useAuth();
  const [selectedApp, setSelectedApp] = useState<string | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(true);

  const handleSelectApp = useCallback((name: string) => {
    setSelectedApp(name);
    const app = appList.find((a) => a.name === name);
    if (app) {
      setTimeout(() => navigate(`/app/${app.slug}`), 600);
    }
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background star-field flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-background star-field overflow-hidden flex flex-col items-center justify-center">
      {/* Ambient glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-glow-secondary/5 blur-[80px] pointer-events-none" />

      <AnimatePresence mode="wait">
        {!user ? (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center w-full max-w-sm px-6"
          >
            <EarthGlobe className="w-64 h-64 mb-2" />

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-bold text-foreground glow-text mb-1"
            >
              Welcome Back
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="text-muted-foreground text-sm mb-6"
            >
              Your world, at your fingertips
            </motion.p>

            <LoginForm />
          </motion.div>
        ) : (
          <motion.div
            key="home"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center w-full h-screen"
          >
            {/* Status bar with logout */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full flex items-center justify-between px-6 py-3 z-10"
            >
              <span className="text-xs text-muted-foreground font-medium">9:41</span>
              <button
                onClick={signOut}
                className="w-8 h-8 rounded-full glass glow-border flex items-center justify-center hover:bg-secondary/50 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5 text-muted-foreground" />
              </button>
            </motion.div>

            {/* Instruction */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xs text-muted-foreground mb-1 z-10"
            >
              Rotate the globe to find your apps
            </motion.p>

            {/* Globe */}
            <div className="flex-1 w-full relative">
              <EarthGlobe
                className="w-full h-full"
                interactive
                onSelectApp={handleSelectApp}
                selectedApp={selectedApp}
              />
            </div>

            {/* Selected app toast */}
            <AnimatePresence>
              {selectedApp && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="fixed bottom-8 left-1/2 -translate-x-1/2 glass rounded-2xl px-6 py-3 glow-border z-20"
                >
                  <p className="text-foreground text-sm font-medium">
                    Opening <span className="text-primary">{selectedApp}</span>…
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Onboarding tour */}
            <AnimatePresence>
              {showOnboarding && (
                <OnboardingTour onComplete={() => setShowOnboarding(false)} />
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
