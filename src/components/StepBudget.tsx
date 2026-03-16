import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Users, Minus, Plus, Calendar, Check } from "lucide-react";
import { budgetRanges } from "@/data/mockData";

interface StepBudgetProps {
  onNext: (budget: number, budgetLabel: string, people: number, days: number) => void;
}

const StepBudget = ({ onNext }: StepBudgetProps) => {
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null);
  const [people, setPeople] = useState(1);
  const [days, setDays] = useState(3);

  const budgetData = budgetRanges.find(b => b.id === selectedBudget);
  const canProceed = selectedBudget && people >= 1 && days >= 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center gap-10"
    >
      <div className="text-center space-y-2">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-display text-foreground">
          Sua viagem começa<br />
          <span className="gradient-text">no seu bolso.</span>
        </h1>
        <p className="text-muted-foreground text-lg">Selecione a faixa de orçamento por pessoa</p>
      </div>

      {/* Budget ranges */}
      <div className="grid gap-3 w-full max-w-lg">
        {budgetRanges.map((b, i) => (
          <motion.button
            key={b.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedBudget(b.id)}
            className={`flex items-center gap-4 p-4 rounded-2xl border text-left transition-all ${
              selectedBudget === b.id
                ? 'border-primary bg-primary/10 shadow-md'
                : 'border-border bg-card hover:border-primary/30'
            }`}
            style={{ boxShadow: selectedBudget === b.id ? undefined : 'var(--card-shadow)' }}
          >
            <span className="text-2xl">{b.emoji}</span>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-foreground">{b.label}</span>
                <span className="text-xs font-semibold text-primary">{b.range}</span>
              </div>
              <span className="text-xs text-muted-foreground">{b.description}</span>
            </div>
            {selectedBudget === b.id && (
              <div className="w-6 h-6 rounded-full gradient-tropical flex items-center justify-center flex-shrink-0">
                <Check size={14} className="text-primary-foreground" />
              </div>
            )}
          </motion.button>
        ))}
      </div>

      {/* People + Days */}
      <div className="flex flex-col sm:flex-row gap-8 items-center">
        <div className="flex flex-col items-center gap-3">
          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Passageiros</span>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setPeople(Math.max(1, people - 1))}
              className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors text-primary"
            >
              <Minus size={18} />
            </button>
            <div className="flex items-center gap-2">
              <Users size={18} className="text-primary" />
              <span className="text-2xl font-extrabold tabular-nums text-foreground">{people}</span>
            </div>
            <button
              onClick={() => setPeople(people + 1)}
              className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors text-primary"
            >
              <Plus size={18} />
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3">
          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Dias de viagem</span>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setDays(Math.max(1, days - 1))}
              className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors text-primary"
            >
              <Minus size={18} />
            </button>
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-primary" />
              <span className="text-2xl font-extrabold tabular-nums text-foreground">{days}</span>
            </div>
            <button
              onClick={() => setDays(days + 1)}
              className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors text-primary"
            >
              <Plus size={18} />
            </button>
          </div>
        </div>
      </div>

      <Button
        disabled={!canProceed}
        onClick={() => budgetData && onNext(budgetData.max, budgetData.label, people, days)}
        className="w-full max-w-xs h-14 rounded-full text-lg font-bold gradient-tropical border-0 shadow-lg"
      >
        Continuar
      </Button>
    </motion.div>
  );
};

export default StepBudget;
