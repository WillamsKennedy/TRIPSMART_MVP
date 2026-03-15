import { motion } from "framer-motion";
import { Star, Shield, MapPin } from "lucide-react";
import { accommodationsByState } from "@/data/mockData";
import type { AccommodationDetail, TouristSpot } from "@/types/travel";

interface StepAccommodationProps {
  stateId: string;
  selectedSpots: TouristSpot[];
  budget: number;
  onNext: (accommodation: AccommodationDetail) => void;
}

const StepAccommodation = ({ stateId, selectedSpots, budget, onNext }: StepAccommodationProps) => {
  const allAccommodations = accommodationsByState[stateId] || [];
  const sorted = [...allAccommodations].sort((a, b) => {
    const aScore = a.distanceToSpots - (a.rating > 4.6 ? 2 : 0);
    const bScore = b.distanceToSpots - (b.rating > 4.6 ? 2 : 0);
    return aScore - bScore;
  });

  const getSafetyLabel = (score: number) => {
    if (score >= 4.5) return { label: 'Muito seguro', color: 'text-secondary' };
    if (score >= 3.5) return { label: 'Seguro', color: 'text-primary' };
    return { label: 'Atenção', color: 'text-destructive' };
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center gap-8"
    >
      <div className="text-center space-y-2">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-display text-foreground">Onde vai ficar?</h2>
        <p className="text-muted-foreground text-lg">Hospedagens próximas aos pontos turísticos</p>
        {selectedSpots.length > 0 && (
          <p className="text-xs text-primary font-semibold">Máximo 5km dos pontos · Exceção para nota &gt; 4.6</p>
        )}
      </div>
      <div className="grid gap-4 w-full max-w-lg">
        {sorted.length === 0 && (
          <p className="text-center py-8 text-muted-foreground">Hospedagens serão carregadas via integração n8n.</p>
        )}
        {sorted.map((acc, i) => {
          const safety = getSafetyLabel(acc.safetyScore);
          return (
            <motion.button
              key={acc.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNext(acc)}
              className="p-5 rounded-2xl border border-border bg-card text-left transition-all hover:shadow-lg hover:border-primary/40"
              style={{ boxShadow: 'var(--card-shadow)' }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <span className="text-xs font-bold uppercase tracking-widest text-primary">{acc.type}</span>
                  <h3 className="text-lg font-bold text-card-foreground mt-1">{acc.name}</h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1"><MapPin size={12} /> {acc.address}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="text-xl font-extrabold text-foreground">R$ {acc.pricePerNight}</span>
                  <span className="text-xs text-muted-foreground block">/noite</span>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3 mt-3">
                <span className="flex items-center gap-1 text-sm"><Star size={14} className="text-primary fill-primary" /><span className="font-bold text-foreground">{acc.rating}</span></span>
                <span className={`flex items-center gap-1 text-sm ${safety.color}`}><Shield size={14} /><span className="font-bold">{safety.label}</span></span>
                <span className="text-xs text-muted-foreground flex items-center gap-1"><MapPin size={12} /> {acc.distanceToSpots}km dos pontos</span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default StepAccommodation;
