import type { AppInfo } from "@/data/apps";

export default function DefaultAppContent({ app }: { app: AppInfo }) {
  return (
    <div className="flex flex-col items-center justify-center flex-1 px-6">
      <div
        className="w-20 h-20 rounded-2xl flex items-center justify-center mb-5 shadow-lg"
        style={{ backgroundColor: app.color + "22", borderColor: app.color + "44", borderWidth: 1 }}
      >
        <span className="text-4xl">{app.emoji}</span>
      </div>
      <h2 className="text-foreground text-xl font-semibold mb-2">{app.name}</h2>
      <p className="text-muted-foreground text-sm text-center max-w-xs mb-8">{app.description}</p>
      <div className="glass glow-border rounded-2xl p-6 w-full max-w-sm text-center">
        <p className="text-muted-foreground text-sm">
          This app is ready for functionality. Connect a backend to bring it to life.
        </p>
      </div>
    </div>
  );
}
