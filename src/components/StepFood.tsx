import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { UtensilsCrossed, Fish, Beef, Salad, IceCreamCone, Coffee, Pizza, Soup } from "lucide-react";

interface StepFoodProps {
  onNext: (selected: string[]) => void;
}

const foodOptions = [
  { id: "frutos-mar", label: "Frutos do Mar", icon: Fish },
  { id: "churrasco", label: "Churrasco", icon: Beef },
  { id: "vegano", label: "Vegano", icon: Salad },
  { id: "doces", label: "Doces & Sobremesas", icon: IceCreamCone },
  { id: "cafe", label: "Cafeterias", icon: Coffee },
  { id: "fast-food", label: "Fast Food", icon: Pizza },
  { id: "regional", label: "Comida Regional", icon: Soup },
  { id: "fine-dining", label: "Fine Dining", icon: UtensilsCrossed },
];

const StepFood = ({ onNext }: StepFoodProps) => {
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
          E para comer?
        </h2>
        <p className="text-muted-foreground text-lg">
          Que sabores combinam com sua viagem?
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3 max-w-lg">
        {foodOptions.map((opt) => {
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

export default StepFood;
