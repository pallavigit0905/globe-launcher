import jiraLogo from "@/assets/jira-logo.svg";
import zoomLogo from "@/assets/zoom-logo.svg";

export interface AppInfo {
  name: string;
  emoji: string;
  icon?: string;
  color: string;
  slug: string;
  description: string;
  apiUrl?: string;
}

export const appList: AppInfo[] = [
  { name: "Messages", emoji: "💬", color: "#22d3ee", slug: "messages", description: "Send and receive messages with your contacts." },
  { name: "Camera", emoji: "📷", color: "#f472b6", slug: "camera", description: "Capture photos and videos instantly." },
  { name: "Music", emoji: "🎵", color: "#a78bfa", slug: "music", description: "Stream and listen to your favorite tracks." },
  { name: "Weather", emoji: "🌤", color: "#fbbf24", slug: "weather", description: "Check forecasts and current conditions." },
  { name: "Maps", emoji: "🗺", color: "#34d399", slug: "maps", description: "Navigate and explore locations worldwide." },
  { name: "Calendar", emoji: "📅", color: "#f87171", slug: "calendar", description: "Manage your events and schedule." },
  { name: "Notes", emoji: "📝", color: "#fb923c", slug: "notes", description: "Write and organize your thoughts." },
  { name: "Health", emoji: "❤️", color: "#ec4899", slug: "health", description: "Track your wellness and activity." },
  { name: "Photos", emoji: "🖼", color: "#60a5fa", slug: "photos", description: "Browse and manage your photo library." },
  { name: "Settings", emoji: "⚙️", color: "#94a3b8", slug: "settings", description: "Customize your device preferences." },
  { name: "Mail", emoji: "✉️", color: "#2dd4bf", slug: "mail", description: "Read and compose your emails." },
  { name: "Clock", emoji: "⏰", color: "#e879f9", slug: "clock", description: "Alarms, timers, and world clocks." },
  { name: "Wallet", emoji: "💳", color: "#4ade80", slug: "wallet", description: "Manage cards and payments." },
  { name: "Store", emoji: "🛍", color: "#38bdf8", slug: "store", description: "Discover and download new apps." },
  { name: "News", emoji: "📰", color: "#f59e0b", slug: "news", description: "Stay updated with latest headlines." },
  { name: "Phone", emoji: "📞", color: "#10b981", slug: "phone", description: "Make and receive phone calls." },
  { name: "Video", emoji: "🎬", color: "#ef4444", slug: "video", description: "Watch and stream video content." },
  { name: "Browser", emoji: "🌐", color: "#6366f1", slug: "browser", description: "Browse the web freely." },
  { name: "Games", emoji: "🎮", color: "#8b5cf6", slug: "games", description: "Play your favorite games." },
  { name: "Fitness", emoji: "🏋️", color: "#14b8a6", slug: "fitness", description: "Track workouts and fitness goals." },
  { name: "Books", emoji: "📚", color: "#f97316", slug: "books", description: "Read ebooks and audiobooks." },
  { name: "Translate", emoji: "🌍", color: "#0ea5e9", slug: "translate", description: "Translate text between languages." },
  { name: "Podcast", emoji: "🎙", color: "#d946ef", slug: "podcast", description: "Listen to your favorite podcasts." },
  { name: "Files", emoji: "📁", color: "#64748b", slug: "files", description: "Manage and organize your files." },
  { name: "Zoom", emoji: "📹", icon: zoomLogo, color: "#2D8CFF", slug: "zoom", description: "Host and join video meetings instantly.", apiUrl: "https://api.zoom.us/v2/users/me/meetings" },
  { name: "Jira", emoji: "🎯", icon: jiraLogo, color: "#0052CC", slug: "jira", description: "Track issues, manage projects, and plan sprints." },
];

export function getAppBySlug(slug: string): AppInfo | undefined {
  return appList.find((a) => a.slug === slug);
}
