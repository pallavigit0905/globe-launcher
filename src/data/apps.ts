import zoomLogo from "@/assets/zoom-logo.svg";

export interface AppInfo {
  name: string;
  emoji: string;
  icon?: string;
  color: string;
  slug: string;
  description: string;
}

export const appList: AppInfo[] = [
  { name: "Outlook", emoji: "📧", color: "#0078D4", slug: "outlook", description: "Manage your emails and calendar." },
  { name: "Gmail", emoji: "✉️", color: "#EA4335", slug: "gmail", description: "Send and receive emails with Gmail." },
  { name: "Workchat", emoji: "💬", color: "#7B83EB", slug: "workchat", description: "Chat and collaborate with your team." },
  { name: "Sharepoint", emoji: "📂", color: "#038387", slug: "sharepoint", description: "Share and manage documents across teams." },
  { name: "Zoom", emoji: "📹", icon: zoomLogo, color: "#2D8CFF", slug: "zoom", description: "Host and join video meetings instantly." },
  { name: "Foundry Select", emoji: "🔧", color: "#6C5CE7", slug: "foundry-select", description: "Select and configure foundry tools." },
  { name: "Search-the-Project", emoji: "🔍", color: "#F39C12", slug: "search-the-project", description: "Search across all project resources." },
  { name: "Schedules", emoji: "📅", color: "#27AE60", slug: "schedules", description: "View and manage project schedules." },
  { name: "Regressions", emoji: "📉", color: "#E74C3C", slug: "regressions", description: "Track and analyze regression data." },
  { name: "PPA Trends", emoji: "📊", color: "#8E44AD", slug: "ppa-trends", description: "Monitor PPA trend analytics." },
];

export function getAppBySlug(slug: string): AppInfo | undefined {
  return appList.find((a) => a.slug === slug);
}
