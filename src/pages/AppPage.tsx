import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { getAppBySlug } from "@/data/apps";
import NotFound from "./NotFound";

export default function AppPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const app = slug ? getAppBySlug(slug) : undefined;

  if (!app) return <NotFound />;

  return (
    <div className="min-h-screen bg-background star-field flex flex-col">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 px-5 py-4 z-10"
      >
        <button
          onClick={() => navigate("/")}
          className="w-9 h-9 rounded-full glass glow-border flex items-center justify-center hover:bg-secondary/50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-foreground" />
        </button>
        <div className="flex items-center gap-2">
          <span className="text-xl">{app.emoji}</span>
          <h1 className="text-foreground font-semibold text-lg">{app.name}</h1>
        </div>
      </motion.header>

      {/* Content */}
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="flex-1 flex flex-col items-center justify-center px-6"
      >
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center mb-5 shadow-lg"
          style={{ backgroundColor: app.color + "22", borderColor: app.color + "44", borderWidth: 1 }}
        >
          <span className="text-4xl">{app.emoji}</span>
        </div>

        <h2 className="text-foreground text-xl font-semibold mb-2">{app.name}</h2>
        <p className="text-muted-foreground text-sm text-center max-w-xs mb-8">
          {app.description}
        </p>

        <div className="glass glow-border rounded-2xl p-6 w-full max-w-sm text-center">
          <p className="text-muted-foreground text-sm">
            This app is ready for functionality. Connect a backend to bring it to life.
          </p>
        </div>
      </motion.main>
    </div>
  );
}
