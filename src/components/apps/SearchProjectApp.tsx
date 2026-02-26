import { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function SearchProjectApp() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<Record<string, unknown> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      toast({ title: "Missing field", description: "Enter a project name to search.", variant: "destructive" });
      return;
    }

    setLoading(true);
    setResponse(null);
    setError(null);

    try {
      const res = await fetch(
        `http://127.0.0.1:8000/datapath_power?params=${encodeURIComponent(query.trim())}`
      );
      if (!res.ok) {
        throw new Error(`Server responded with ${res.status}`);
      }
      const data = await res.json();
      setResponse(data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Search failed. Please try again.";
      setError(message);
      toast({ title: "Error", description: message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
      <div className="glass glow-border rounded-2xl p-6 w-full max-w-md">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#F39C12]/20 flex items-center justify-center">
            <Search className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-foreground font-semibold text-lg">Search the Project</h2>
            <p className="text-muted-foreground text-xs">Find resources across all projects</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="projectName">Project Name</Label>
            <Input
              id="projectName"
              placeholder="e.g. Phoenix, Atlas"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-secondary/50 border-border"
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
            {loading ? "Searching…" : "Search"}
          </Button>
        </form>

        {error && !loading && (
          <div className="mt-6 p-4 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive text-sm">
            {error}
          </div>
        )}

        {response && (
          <div className="mt-6 space-y-2">
            <h3 className="text-foreground text-sm font-semibold">Results</h3>
            <div className="p-4 rounded-xl bg-secondary/40 border border-border overflow-auto max-h-80">
              {typeof response === "object" ? (
                <dl className="space-y-2 text-sm">
                  {Object.entries(response).map(([key, value]) => (
                    <div key={key} className="flex gap-2">
                      <dt className="text-muted-foreground font-medium min-w-[120px] shrink-0">{key}:</dt>
                      <dd className="text-foreground break-all">
                        {typeof value === "object" ? JSON.stringify(value, null, 2) : String(value)}
                      </dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <pre className="text-foreground text-xs whitespace-pre-wrap">{JSON.stringify(response, null, 2)}</pre>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
