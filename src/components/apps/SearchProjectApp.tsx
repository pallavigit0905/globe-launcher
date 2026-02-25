import { useState } from "react";
import { Search, Loader2, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface SearchResult {
  id: string;
  title: string;
  type: string;
  snippet: string;
}

export default function SearchProjectApp() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SearchResult[] | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      toast({ title: "Missing field", description: "Enter a project name to search.", variant: "destructive" });
      return;
    }

    setLoading(true);
    setResults(null);

    try {
      // TODO: Replace with actual edge function call
      await new Promise((r) => setTimeout(r, 1000));
      setResults([
        { id: "1", title: `${query} - Design Spec`, type: "Document", snippet: "Architecture overview and design decisions for the project…" },
        { id: "2", title: `${query} - Sprint Board`, type: "Board", snippet: "Current sprint tasks and backlog items…" },
        { id: "3", title: `${query} - API Docs`, type: "Wiki", snippet: "REST API documentation and endpoint references…" },
      ]);
    } catch {
      toast({ title: "Error", description: "Search failed. Please try again.", variant: "destructive" });
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

        {results && (
          <div className="mt-6 space-y-2">
            {results.length === 0 ? (
              <p className="text-muted-foreground text-sm text-center py-4">No results found.</p>
            ) : (
              results.map((r) => (
                <div key={r.id} className="p-3 rounded-xl bg-secondary/40 border border-border hover:bg-secondary/60 transition-colors cursor-pointer">
                  <div className="flex items-center gap-2 mb-1">
                    <FileText className="w-4 h-4 text-muted-foreground shrink-0" />
                    <span className="text-foreground text-sm font-medium truncate">{r.title}</span>
                    <span className="text-xs text-muted-foreground ml-auto shrink-0">{r.type}</span>
                  </div>
                  <p className="text-muted-foreground text-xs pl-6 line-clamp-2">{r.snippet}</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
