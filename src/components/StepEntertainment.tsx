import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Waves, Mountain, Landmark, Music, Camera, Compass, TreePine, Palette } from "lucide-react";

interface StepEntertainmentProps {
  onNext: (selected: string[]) => void;
}

const entertainmentOptions = [
  { id: "praias", label: "Praias", icon: Waves },
  { id: "trilhas", label: "Trilhas", icon: Mountain },
  { id: "historia", label: "História", icon: Landmark },
  { id: "musica", label: "Música ao vivo", icon: Music },
  { id: "fotografia", label: "Fotografia", icon: Camera },
  { id: "aventura", label: "Aventura", icon: Compass },
  { id: "natureza", label: "Ecoturismo", icon: TreePine },
  { id: "arte", label: "Arte & Cultura", icon: Palette },
];

const StepEntertainment = ({ onNext }: StepEntertainmentProps) => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center gap-10"
    >
      <div className="text-center space-y-2">
        <h2 className="text-3xl md:text-4xl font-bold tracking-display text-foreground">
          O que te atrai?
        </h2>
        <p className="text-muted-foreground text-lg">
          Selecione os tipos de entretenimento.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3 max-w-lg">
        {entertainmentOptions.map((opt) => {
          const isActive = selected.includes(opt.id);
          return (
            <motion.button
              key={opt.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggle(opt.id)}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold border transition-all ${
                isActive
                  ? "bg-foreground text-background border-foreground shadow-sm"
                  : "bg-secondary text-muted-foreground border-border hover:bg-border"
              }`}
            >
              <opt.icon size={16} />
              {opt.label}
            </motion.button>
          );
        })}
      </div>

      <Button
        variant="stepper"
        size="xl"
        disabled={selected.length === 0}
        onClick={() => onNext(selected)}
        className="w-full max-w-xs"
      >
        Continuar
      </Button>
    </motion.div>
  );
};

export default StepEntertainment;
