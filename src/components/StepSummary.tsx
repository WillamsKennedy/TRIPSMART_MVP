import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, RotateCcw } from "lucide-react";
import type { TravelState } from "@/types/travel";

interface StepSummaryProps {
  data: TravelState;
  onRestart: () => void;
}

const StepSummary = ({ data, onRestart }: StepSummaryProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center gap-8"
    >
      <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center">
        <Check size={32} className="text-accent-foreground" />
      </div>

      <div className="text-center space-y-2">
        <h2 className="text-3xl md:text-4xl font-bold tracking-display text-foreground">
          Roteiro pronto!
        </h2>
        <p className="text-muted-foreground text-lg">
          Suas preferências foram enviadas para montagem do itinerário.
        </p>
      </div>

      <div
        className="w-full p-6 rounded-2xl border border-border bg-card space-y-4"
        style={{ boxShadow: 'var(--card-shadow)' }}
      >
        <SummaryRow label="Orçamento" value={`R$ ${data.budget.toLocaleString("pt-BR")}`} />
        <SummaryRow label="Passageiros" value={`${data.people} pessoa${data.people > 1 ? 's' : ''}`} />
        {data.people > 1 && (
          <SummaryRow label="Tipo" value={data.groupType === 'couple' ? 'Casal' : 'Amigos'} />
        )}
        <SummaryRow label="Destino" value={`${data.state}, ${data.country}`} />
        <SummaryRow label="Entretenimento" value={data.entertainment.join(', ')} />
        <SummaryRow label="Gastronomia" value={data.food.join(', ')} />
        {data.accommodation && (
          <SummaryRow label="Hospedagem" value={data.accommodation} />
        )}
      </div>

      <p className="text-sm text-muted-foreground text-center max-w-sm">
        Em breve você receberá sugestões detalhadas de restaurantes, atividades e hospedagem otimizados para seu orçamento.
      </p>

      <Button variant="outline" size="lg" onClick={onRestart} className="gap-2">
        <RotateCcw size={16} />
        Planejar outra viagem
      </Button>
    </motion.div>
  );
};

const SummaryRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between items-baseline">
    <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{label}</span>
    <span className="text-sm font-semibold text-foreground text-right max-w-[60%]">{value}</span>
  </div>
);

export default StepSummary;
