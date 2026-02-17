import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Fingerprint } from "lucide-react";

interface LoginFormProps {
  onLogin: () => void;
}

export default function LoginForm({ onLogin }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="w-full max-w-xs space-y-4"
    >
      <div className="space-y-3">
        <div className="relative">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl glass text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 glow-border transition-all"
          />
        </div>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 pr-12 rounded-xl glass text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 glow-border transition-all"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm glow-box hover:brightness-110 transition-all"
      >
        Sign In
      </motion.button>

      <div className="flex items-center gap-3 px-4">
        <div className="flex-1 h-px bg-border" />
        <span className="text-muted-foreground text-xs">or</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <motion.button
        type="button"
        onClick={onLogin}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-3 rounded-xl glass glow-border text-foreground font-medium text-sm flex items-center justify-center gap-2 hover:bg-secondary/50 transition-all"
      >
        <Fingerprint size={18} className="text-primary" />
        Use Biometrics
      </motion.button>

      <p className="text-center text-muted-foreground text-xs">
        Don't have an account?{" "}
        <button type="button" className="text-primary hover:underline">
          Sign Up
        </button>
      </p>
    </motion.form>
  );
}
