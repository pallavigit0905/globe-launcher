import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EarthGlobe from "@/components/EarthGlobe";
import LoginForm from "@/components/LoginForm";
import AppGrid from "@/components/AppGrid";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="relative min-h-screen bg-background star-field overflow-hidden flex flex-col items-center justify-center">
      {/* Ambient glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-glow-secondary/5 blur-[80px] pointer-events-none" />

      <AnimatePresence mode="wait">
        {!isLoggedIn ? (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center w-full max-w-sm px-6"
          >
            {/* Globe */}
            <EarthGlobe className="w-64 h-64 mb-2" />

            {/* Title */}
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

            {/* Login Form */}
            <LoginForm onLogin={() => setIsLoggedIn(true)} />
          </motion.div>
        ) : (
          <motion.div
            key="home"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center w-full max-w-sm px-4"
          >
            {/* Status bar area */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full flex items-center justify-between px-2 py-3"
            >
              <span className="text-xs text-muted-foreground font-medium">9:41</span>
              <div className="flex items-center gap-1">
                <div className="w-4 h-2.5 rounded-sm border border-foreground/40 relative">
                  <div className="absolute inset-0.5 bg-primary rounded-[1px]" />
                </div>
              </div>
            </motion.div>

            {/* Globe smaller on home */}
            <EarthGlobe className="w-48 h-48 mb-4" />

            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg font-semibold text-foreground glow-text mb-4"
            >
              Your Apps
            </motion.h2>

            {/* App Grid */}
            <AppGrid />

            {/* Bottom bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="fixed bottom-6 left-1/2 -translate-x-1/2 glass rounded-2xl px-6 py-3 flex items-center gap-6 glow-border"
            >
              <button className="text-primary text-xl">📱</button>
              <button className="text-muted-foreground text-xl hover:text-primary transition-colors">🔍</button>
              <button className="text-muted-foreground text-xl hover:text-primary transition-colors">⚙️</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
