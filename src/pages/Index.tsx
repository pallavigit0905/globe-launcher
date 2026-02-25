import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import EarthGlobe from "@/components/EarthGlobe";
import { appList } from "@/data/apps";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const navigate = useNavigate();
  const [selectedApp, setSelectedApp] = useState<string | null>(null);

  const handleSelectApp = useCallback(async (name: string) => {
    setSelectedApp(name);
    const app = appList.find((a) => a.name === name);
    if (!app) return;

    if (app.apiUrl) {
      try {
        toast.info(`Calling ${app.name} API…`);
        const { data, error } = await supabase.functions.invoke("app-proxy", {
          body: { apiUrl: app.apiUrl, method: "GET" },
        });
        if (error) throw error;
        console.log(`${app.name} API response:`, data);
        toast.success(`${app.name} API responded successfully`);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Unknown error";
        console.error(`${app.name} API error:`, msg);
        toast.error(`${app.name} API failed: ${msg}`);
      } finally {
        setSelectedApp(null);
      }
    } else {
      setTimeout(() => navigate(`/app/${app.slug}`), 600);
    }
  }, [navigate]);

  return (
    <div className="relative min-h-screen bg-background star-field overflow-hidden flex flex-col items-center justify-center">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-glow-secondary/5 blur-[80px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center w-full h-screen"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xs text-muted-foreground mb-1 z-10 pt-6"
        >
          Rotate the globe to find your apps
        </motion.p>

        <div className="flex-1 w-full relative">
          <EarthGlobe
            className="w-full h-full"
            interactive
            onSelectApp={handleSelectApp}
            selectedApp={selectedApp}
          />
        </div>

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

      </motion.div>
    </div>
  );
};

export default Index;
