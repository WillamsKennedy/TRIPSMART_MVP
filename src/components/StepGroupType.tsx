import { motion } from "framer-motion";
import { Heart, Users } from "lucide-react";

interface StepGroupTypeProps {
  people: number;
  onNext: (type: 'couple' | 'friends') => void;
}

const StepGroupType = ({ people, onNext }: StepGroupTypeProps) => {
  const options = [
    {
      type: 'couple' as const,
      label: 'Casal',
      description: 'Viagem romântica a dois',
      icon: Heart,
    },
    {
      type: 'friends' as const,
      label: 'Amigos',
      description: `Aventura com ${people} pessoas`,
      icon: Users,
    },
  ];

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
          Quem vai junto?
        </h2>
        <p className="text-muted-foreground text-lg">
          Isso nos ajuda a personalizar as recomendações.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
        {options.map((opt) => (
          <motion.button
            key={opt.type}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNext(opt.type)}
            className="p-8 rounded-2xl border border-border bg-card text-left transition-shadow hover:shadow-lg"
            style={{ boxShadow: 'var(--card-shadow)' }}
          >
            <opt.icon size={28} className="text-primary mb-4" />
            <h3 className="text-xl font-bold text-card-foreground">{opt.label}</h3>
            <p className="text-sm text-muted-foreground mt-1">{opt.description}</p>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default StepGroupType;
