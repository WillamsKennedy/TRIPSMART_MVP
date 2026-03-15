import { motion } from "framer-motion";
import { transportOptions } from "@/data/mockData";

interface StepTransportArrivalProps {
  onNext: (transport: string) => void;
}

const StepTransportArrival = ({ onNext }: StepTransportArrivalProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center gap-8"
    >
      <div className="text-center space-y-2">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-display text-foreground">
          Como vai chegar lá?
        </h2>
        <p className="text-muted-foreground text-lg">Selecione o transporte até o destino</p>
      </div>

      <div className="grid gap-3 w-full max-w-md">
        {transportOptions.map((t, i) => (
          <motion.button
            key={t.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNext(t.id)}
            className="flex items-center gap-4 p-5 rounded-2xl border border-border bg-card text-left hover:border-primary/40 transition-all"
            style={{ boxShadow: 'var(--card-shadow)' }}
          >
            <span className="text-3xl">{t.emoji}</span>
            <div>
              <span className="font-bold text-foreground block">{t.label}</span>
              <span className="text-sm text-muted-foreground">{t.desc}</span>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default StepTransportArrival;
