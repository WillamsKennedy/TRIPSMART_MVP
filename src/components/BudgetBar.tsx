import { motion } from "framer-motion";

interface BudgetBarProps {
  total: number;
  spent: number;
  currency?: string;
}

const BudgetBar = ({ total, spent, currency = "R$" }: BudgetBarProps) => {
  const remaining = total - spent;
  const percentage = total > 0 ? Math.min((spent / total) * 100, 100) : 0;
  const isOver = remaining < 0;

  return (
    <div className="w-full px-1">
      <div className="flex items-baseline justify-between mb-1">
        <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Orçamento</span>
        <motion.span
          key={remaining}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 0.3 }}
          className={`text-sm font-extrabold tabular-nums ${isOver ? "text-destructive" : "text-foreground"}`}
        >
          {currency} {remaining.toLocaleString("pt-BR")}
        </motion.span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-border overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${isOver ? "bg-destructive" : "gradient-pe"}`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
};

export default BudgetBar;
