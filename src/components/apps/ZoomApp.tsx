import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, Video, Loader2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export default function ZoomApp() {
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("09:00");
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [meetingLink, setMeetingLink] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !topic.trim()) {
      toast({ title: "Missing fields", description: "Please fill in all fields.", variant: "destructive" });
      return;
    }

    setLoading(true);
    setMeetingLink(null);

    try {
      // TODO: Replace with actual edge function call
      // const { data } = await supabase.functions.invoke("app-proxy", {
      //   body: { app: "zoom", action: "create-meeting", topic, date: date.toISOString(), time },
      // });
      await new Promise((r) => setTimeout(r, 1500));
      setMeetingLink("https://zoom.us/j/1234567890?pwd=example");
      toast({ title: "Meeting created!", description: `${topic} scheduled for ${format(date, "PPP")} at ${time}` });
    } catch {
      toast({ title: "Error", description: "Failed to create meeting. Please try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
      <div className="glass glow-border rounded-2xl p-6 w-full max-w-md">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#2D8CFF]/20 flex items-center justify-center">
            <Video className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-foreground font-semibold text-lg">Create Zoom Meeting</h2>
            <p className="text-muted-foreground text-xs">Schedule a new video call</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="topic">Meeting Topic</Label>
            <Input
              id="topic"
              placeholder="e.g. Sprint Planning"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="bg-secondary/50 border-border"
            />
          </div>

          <div className="space-y-2">
            <Label>Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn("w-full justify-start text-left font-normal bg-secondary/50", !date && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(d) => d < new Date()}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="time">Time</Label>
            <Input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="bg-secondary/50 border-border"
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Video className="mr-2 h-4 w-4" />}
            {loading ? "Creating…" : "Create Meeting"}
          </Button>
        </form>

        {meetingLink && (
          <div className="mt-6 p-4 rounded-xl bg-primary/10 border border-primary/20">
            <p className="text-foreground text-sm font-medium mb-2">✅ Meeting Created</p>
            <a
              href={meetingLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary text-sm flex items-center gap-1 hover:underline break-all"
            >
              {meetingLink} <ExternalLink className="w-3 h-3 shrink-0" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
