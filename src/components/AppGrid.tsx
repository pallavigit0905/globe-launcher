import { motion } from "framer-motion";

const apps = [
  { name: "Messages", emoji: "💬", gradient: "from-cyan-500 to-blue-500" },
  { name: "Camera", emoji: "📷", gradient: "from-pink-500 to-rose-500" },
  { name: "Music", emoji: "🎵", gradient: "from-violet-500 to-purple-500" },
  { name: "Weather", emoji: "🌤", gradient: "from-amber-400 to-yellow-500" },
  { name: "Maps", emoji: "🗺", gradient: "from-emerald-400 to-green-500" },
  { name: "Calendar", emoji: "📅", gradient: "from-red-400 to-rose-500" },
  { name: "Notes", emoji: "📝", gradient: "from-orange-400 to-amber-500" },
  { name: "Health", emoji: "❤️", gradient: "from-pink-500 to-fuchsia-500" },
];

export default function AppGrid() {
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {apps.map((app, i) => (
        <motion.button
          key={app.name}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 + i * 0.05, type: "spring", stiffness: 200 }}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          className="flex flex-col items-center gap-1.5"
        >
          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${app.gradient} flex items-center justify-center text-2xl shadow-lg glow-box`}>
            {app.emoji}
          </div>
          <span className="text-[10px] text-foreground/70 font-medium">{app.name}</span>
        </motion.button>
      ))}
    </div>
  );
}
