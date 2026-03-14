import { motion } from "framer-motion";
import { Building2, Home, BedDouble } from "lucide-react";
import type { AccommodationOption } from "@/types/travel";

interface StepAccommodationProps {
  budget: number;
  onNext: (id: string) => void;
}

// Mock data — will be replaced by n8n
const mockAccommodations: AccommodationOption[] = [
  { id: "h1", name: "Pousada Sol Nascente", type: "pousada", pricePerNight: 280, budgetMatch: 92, location: "Centro histórico", description: "Charme rústico a 5 min das atrações principais." },
  { id: "h2", name: "Hostel Mochileiro", type: "hostel", pricePerNight: 85, budgetMatch: 98, location: "Beira-mar", description: "Econômico e social. Café da manhã incluso." },
  { id: "h3", name: "Hotel Marina Premium", type: "hotel", pricePerNight: 450, budgetMatch: 67, location: "Orla principal", description: "Conforto completo com piscina e spa." },
  { id: "h4", name: "Pousada do Mangue", type: "pousada", pricePerNight: 190, budgetMatch: 88, location: "Área ecológica", description: "Silêncio e natureza. Ideal para descanso." },
];

const typeIcons = {
  hotel: Building2,
  hostel: Home,
  pousada: BedDouble,
};

const typeLabels = {
  hotel: "Hotel",
  hostel: "Hostel",
  pousada: "Pousada",
};

const StepAccommodation = ({ budget, onNext }: StepAccommodationProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center gap-8"
    >
      <div className="text-center space-y-2">
        <h2 className="text-3xl md:text-4xl font-bold tracking-display text-foreground">
          Onde descansar?
        </h2>
        <p className="text-muted-foreground text-lg">
          Hospedagens próximas das suas escolhas.
        </p>
      </div>

      <div className="w-full grid gap-3">
        {mockAccommodations.map((acc, i) => {
          const Icon = typeIcons[acc.type];
          return (
            <motion.button
              key={acc.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNext(acc.id)}
              className="p-6 rounded-2xl border border-border bg-card text-left transition-shadow hover:shadow-lg"
              style={{ boxShadow: 'var(--card-shadow)' }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon size={16} className="text-primary" />
                    <span className="text-xs font-bold uppercase tracking-widest text-primary">
                      {typeLabels[acc.type]}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-card-foreground">{acc.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{acc.description}</p>
                  <p className="text-xs text-muted-foreground mt-2">{acc.location}</p>
                </div>
                <div className="text-right ml-4 flex-shrink-0">
                  <div className="text-2xl font-bold tabular-nums text-foreground">
                    {acc.budgetMatch}%
                  </div>
                  <div className="text-xs text-muted-foreground">match</div>
                  <div className="text-sm font-semibold tabular-nums mt-2 text-foreground">
                    R$ {acc.pricePerNight}
                  </div>
                  <div className="text-xs text-muted-foreground">/noite</div>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default StepAccommodation;
