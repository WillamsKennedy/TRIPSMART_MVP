import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { monthNames, monthEmojis } from "@/data/mockData";

interface StepMonthProps {
  onNext: (month: number) => void;
}

const currentMonth = new Date().getMonth() + 1;

const StepMonth = ({ onNext }: StepMonthProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center gap-8"
    >
      <div className="text-center space-y-2">
        <Calendar size={32} className="mx-auto text-primary" />
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-display text-foreground">
          Quando quer viajar?
        </h2>
        <p className="text-muted-foreground text-lg">Selecione o mês de partida</p>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-4 gap-3 w-full max-w-lg">
        {monthNames.map((name, i) => {
          const monthNum = i + 1;
          const isCurrent = monthNum === currentMonth;
          return (
            <motion.button
              key={monthNum}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNext(monthNum)}
              className={`relative p-4 rounded-2xl border text-center transition-all ${
                isCurrent
                  ? 'border-primary bg-primary/10 shadow-md'
                  : 'border-border bg-card hover:border-primary/40'
              }`}
              style={{ boxShadow: isCurrent ? undefined : 'var(--card-shadow)' }}
            >
              <span className="text-2xl block">{monthEmojis[i]}</span>
              <span className="text-sm font-bold text-foreground block mt-1">{name}</span>
              {isCurrent && (
                <span className="absolute -top-2 -right-2 text-[10px] font-bold px-2 py-0.5 rounded-full gradient-tropical text-primary-foreground">
                  Atual
                </span>
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default StepMonth;
