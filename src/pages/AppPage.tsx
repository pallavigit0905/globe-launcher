import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { getAppBySlug } from "@/data/apps";
import NotFound from "./NotFound";
import ZoomApp from "@/components/apps/ZoomApp";
import JiraApp from "@/components/apps/JiraApp";
import SearchProjectApp from "@/components/apps/SearchProjectApp";
import DefaultAppContent from "@/components/apps/DefaultAppContent";

const appComponents: Record<string, React.ComponentType> = {
  zoom: ZoomApp,
  jira: JiraApp,
  "search-project": SearchProjectApp,
};

export default function AppPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const app = slug ? getAppBySlug(slug) : undefined;

  if (!app) return <NotFound />;

  const ContentComponent = app.appType ? appComponents[app.appType] : null;

  return (
    <div className="min-h-screen bg-background star-field flex flex-col">
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

      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="flex-1 flex flex-col"
      >
        {ContentComponent ? <ContentComponent /> : <DefaultAppContent app={app} />}
      </motion.main>
    </div>
  );
}
