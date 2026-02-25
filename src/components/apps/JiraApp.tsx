import { useState } from "react";
import { Search, Loader2, FolderKanban, Bug, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface JiraProject {
  key: string;
  name: string;
  lead: string;
  issuesCount: number;
  openBugs: number;
  doneCount: number;
}

export default function JiraApp() {
  const [projectKey, setProjectKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState<JiraProject | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectKey.trim()) {
      toast({ title: "Missing field", description: "Enter a Jira project key.", variant: "destructive" });
      return;
    }

    setLoading(true);
    setProject(null);

    try {
      // TODO: Replace with actual edge function call
      await new Promise((r) => setTimeout(r, 1200));
      setProject({
        key: projectKey.toUpperCase(),
        name: `${projectKey.toUpperCase()} Project`,
        lead: "John Doe",
        issuesCount: 142,
        openBugs: 12,
        doneCount: 98,
      });
    } catch {
      toast({ title: "Error", description: "Failed to fetch Jira project.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
      <div className="glass glow-border rounded-2xl p-6 w-full max-w-md">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#0052CC]/20 flex items-center justify-center">
            <FolderKanban className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-foreground font-semibold text-lg">Jira Project Lookup</h2>
            <p className="text-muted-foreground text-xs">Search by project key or name</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="projectKey">Project Key</Label>
            <Input
              id="projectKey"
              placeholder="e.g. PROJ or SPRINT"
              value={projectKey}
              onChange={(e) => setProjectKey(e.target.value)}
              className="bg-secondary/50 border-border"
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
            {loading ? "Searching…" : "Lookup Project"}
          </Button>
        </form>

        {project && (
          <div className="mt-6 space-y-3">
            <div className="p-4 rounded-xl bg-secondary/40 border border-border">
              <h3 className="text-foreground font-semibold text-base mb-1">{project.name}</h3>
              <p className="text-muted-foreground text-xs mb-3">Key: {project.key} · Lead: {project.lead}</p>
              <div className="grid grid-cols-3 gap-3">
                <Stat icon={<FolderKanban className="w-4 h-4" />} label="Total" value={project.issuesCount} />
                <Stat icon={<Bug className="w-4 h-4" />} label="Bugs" value={project.openBugs} />
                <Stat icon={<CheckCircle2 className="w-4 h-4" />} label="Done" value={project.doneCount} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-background/50">
      <span className="text-muted-foreground">{icon}</span>
      <span className="text-foreground font-semibold text-lg">{value}</span>
      <span className="text-muted-foreground text-xs">{label}</span>
    </div>
  );
}
