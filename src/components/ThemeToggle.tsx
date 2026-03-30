import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="gap-1.5 text-xs font-bold text-white/80 hover:text-white hover:bg-white/10"
    >
      {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
    </Button>
  );
};

export default ThemeToggle;
