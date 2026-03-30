import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Users, Minus, Plus, Calendar, Check, Heart, Baby, BedDouble } from "lucide-react";
import { budgetRanges } from "@/data/mockData";

interface StepBudgetProps {
  onNext: (budget: number, budgetLabel: string, people: number, days: number, adults: number, children: number, isCouple: boolean, rooms: number) => void;
}

const StepBudget = ({ onNext }: StepBudgetProps) => {
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [isCouple, setIsCouple] = useState(false);
  const [rooms, setRooms] = useState(1);
  const [days, setDays] = useState(3);

  const people = adults + children;
  const budgetData = budgetRanges.find(b => b.id === selectedBudget);
  const canProceed = selectedBudget && adults >= 1 && days >= 1;

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
              <div className="w-6 h-6 rounded-full gradient-pe flex items-center justify-center flex-shrink-0">
                <Check size={14} className="text-primary-foreground" />
              </div>
            )}
          </motion.button>
        ))}
      </div>

      {/* Passengers: Adults, Children, Couple, Rooms */}
      <div className="w-full max-w-lg space-y-6">
        <div className="grid grid-cols-2 gap-6">
          {/* Adults */}
          <div className="flex flex-col items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Adultos</span>
            <div className="flex items-center gap-4">
              <button onClick={() => setAdults(Math.max(1, adults - 1))} className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors text-primary">
                <Minus size={18} />
              </button>
              <div className="flex items-center gap-2">
                <Users size={18} className="text-primary" />
                <span className="text-2xl font-extrabold tabular-nums text-foreground">{adults}</span>
              </div>
              <button onClick={() => setAdults(adults + 1)} className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors text-primary">
                <Plus size={18} />
              </button>
            </div>
          </div>

          {/* Children */}
          <div className="flex flex-col items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Crianças</span>
            <div className="flex items-center gap-4">
              <button onClick={() => setChildren(Math.max(0, children - 1))} className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors text-primary">
                <Minus size={18} />
              </button>
              <div className="flex items-center gap-2">
                <Baby size={18} className="text-primary" />
                <span className="text-2xl font-extrabold tabular-nums text-foreground">{children}</span>
              </div>
              <button onClick={() => setChildren(children + 1)} className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors text-primary">
                <Plus size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Couple toggle */}
        {adults >= 2 && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="flex items-center justify-center">
            <button
              onClick={() => setIsCouple(!isCouple)}
              className={`flex items-center gap-3 px-6 py-3 rounded-full border transition-all ${
                isCouple ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-card text-muted-foreground hover:border-primary/30'
              }`}
            >
              <Heart size={18} className={isCouple ? 'fill-primary' : ''} />
              <span className="font-bold text-sm">Viagem de casal</span>
              {isCouple && <Check size={16} />}
            </button>
          </motion.div>
        )}

        <div className="grid grid-cols-2 gap-6">
          {/* Rooms */}
          <div className="flex flex-col items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Quartos</span>
            <div className="flex items-center gap-4">
              <button onClick={() => setRooms(Math.max(1, rooms - 1))} className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors text-primary">
                <Minus size={18} />
              </button>
              <div className="flex items-center gap-2">
                <BedDouble size={18} className="text-primary" />
                <span className="text-2xl font-extrabold tabular-nums text-foreground">{rooms}</span>
              </div>
              <button onClick={() => setRooms(rooms + 1)} className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors text-primary">
                <Plus size={18} />
              </button>
            </div>
          </div>

          {/* Days */}
          <div className="flex flex-col items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Dias de viagem</span>
            <div className="flex items-center gap-4">
              <button onClick={() => setDays(Math.max(1, days - 1))} className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors text-primary">
                <Minus size={18} />
              </button>
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-primary" />
                <span className="text-2xl font-extrabold tabular-nums text-foreground">{days}</span>
              </div>
              <button onClick={() => setDays(days + 1)} className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors text-primary">
                <Plus size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Summary line */}
        <div className="text-center text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{people}</span> passageiro{people > 1 ? 's' : ''} ({adults} adulto{adults > 1 ? 's' : ''}{children > 0 ? `, ${children} criança${children > 1 ? 's' : ''}` : ''}) · <span className="font-semibold text-foreground">{rooms}</span> quarto{rooms > 1 ? 's' : ''} · <span className="font-semibold text-foreground">{days}</span> dia{days > 1 ? 's' : ''}
          {isCouple && <span className="text-primary font-semibold"> · 💕 Casal</span>}
        </div>
      </div>

      <Button
        disabled={!canProceed}
        onClick={() => budgetData && onNext(budgetData.max, budgetData.label, people, days, adults, children, isCouple, rooms)}
        className="w-full max-w-xs h-14 rounded-full text-lg font-bold gradient-pe border-0 shadow-lg"
      >
        Continuar
      </Button>
    </motion.div>
  );
};

export default StepBudget;
