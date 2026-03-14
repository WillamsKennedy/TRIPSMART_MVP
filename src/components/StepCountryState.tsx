import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MapPin, ChevronDown } from "lucide-react";
import type { StateRecommendation } from "@/types/travel";

interface StepCountryStateProps {
  onNext: (country: string, state: string) => void;
}

const countries = [
  { id: "BR", name: "Brasil" },
  { id: "PT", name: "Portugal" },
  { id: "AR", name: "Argentina" },
  { id: "CO", name: "Colômbia" },
  { id: "MX", name: "México" },
];

const currentMonth = new Date().toLocaleString("pt-BR", { month: "long" });

// Mock data — will be replaced by n8n webhook
const mockStates: Record<string, StateRecommendation[]> = {
  BR: [
    { id: "BA", name: "Bahia", country: "BR", seasonLabel: "Clima ameno", seasonType: "moderate", description: "Praias tranquilas e cultura vibrante. Ideal para casais.", avgCostPerPerson: 2500 },
    { id: "SC", name: "Santa Catarina", country: "BR", seasonLabel: "Baixa temporada", seasonType: "low", description: "Preços acessíveis e trilhas incríveis na serra.", avgCostPerPerson: 1800 },
    { id: "RJ", name: "Rio de Janeiro", country: "BR", seasonLabel: "Clima seco", seasonType: "moderate", description: "Cultura, gastronomia e paisagens icônicas.", avgCostPerPerson: 3200 },
    { id: "CE", name: "Ceará", country: "BR", seasonLabel: "Alta temporada", seasonType: "high", description: "Ventos fortes para kite e sol constante.", avgCostPerPerson: 2200 },
  ],
  PT: [
    { id: "LIS", name: "Lisboa", country: "PT", seasonLabel: "Primavera", seasonType: "moderate", description: "Clima agradável e menos turistas.", avgCostPerPerson: 4500 },
    { id: "ALG", name: "Algarve", country: "PT", seasonLabel: "Pré-verão", seasonType: "low", description: "Praias douradas com preços de baixa temporada.", avgCostPerPerson: 3800 },
  ],
  AR: [
    { id: "BAS", name: "Buenos Aires", country: "AR", seasonLabel: "Outono", seasonType: "moderate", description: "Tango, carne e cultura portenha.", avgCostPerPerson: 2000 },
  ],
  CO: [
    { id: "BOG", name: "Bogotá", country: "CO", seasonLabel: "Seco", seasonType: "low", description: "Arte, história e café de altitude.", avgCostPerPerson: 1500 },
  ],
  MX: [
    { id: "QR", name: "Quintana Roo", country: "MX", seasonLabel: "Temporada seca", seasonType: "low", description: "Riviera Maya com preços amigáveis.", avgCostPerPerson: 2800 },
  ],
};

const seasonColors: Record<string, string> = {
  high: "text-destructive",
  moderate: "text-primary",
  low: "text-accent",
};

const StepCountryState = ({ onNext }: StepCountryStateProps) => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [showCountrySelect, setShowCountrySelect] = useState(false);

  const states = selectedCountry ? mockStates[selectedCountry] || [] : [];

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
          De onde você parte?
        </h2>
        <p className="text-muted-foreground text-lg">
          Recomendações para <span className="font-semibold capitalize">{currentMonth}</span>
        </p>
      </div>

      {/* Country selector */}
      <div className="w-full max-w-md">
        <button
          onClick={() => setShowCountrySelect(!showCountrySelect)}
          className="w-full flex items-center justify-between p-4 rounded-2xl border border-border bg-card transition-shadow hover:shadow-md"
          style={{ boxShadow: 'var(--card-shadow)' }}
        >
          <div className="flex items-center gap-3">
            <MapPin size={20} className="text-primary" />
            <span className={selectedCountry ? "font-semibold text-foreground" : "text-muted-foreground"}>
              {selectedCountry
                ? countries.find((c) => c.id === selectedCountry)?.name
                : "Selecione seu país"}
            </span>
          </div>
          <ChevronDown size={18} className={`text-muted-foreground transition-transform ${showCountrySelect ? 'rotate-180' : ''}`} />
        </button>

        {showCountrySelect && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-2 rounded-2xl border border-border bg-card overflow-hidden"
            style={{ boxShadow: 'var(--card-shadow)' }}
          >
            {countries.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  setSelectedCountry(c.id);
                  setShowCountrySelect(false);
                }}
                className="w-full text-left px-5 py-3 hover:bg-secondary transition-colors text-foreground font-medium"
              >
                {c.name}
              </button>
            ))}
          </motion.div>
        )}
      </div>

      {/* State cards */}
      {states.length > 0 && (
        <div className="w-full space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground px-1">
            Estados recomendados
          </span>
          <div className="grid gap-3">
            {states.map((state, i) => (
              <motion.button
                key={state.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onNext(selectedCountry, state.id)}
                className="p-6 rounded-2xl border border-border bg-card text-left transition-shadow hover:shadow-lg"
                style={{ boxShadow: 'var(--card-shadow)' }}
              >
                <span className={`text-xs font-bold tracking-widest uppercase ${seasonColors[state.seasonType]}`}>
                  {state.seasonLabel} · Recomendado para {currentMonth}
                </span>
                <h3 className="text-2xl font-bold mt-1 text-card-foreground">{state.name}</h3>
                <p className="text-muted-foreground text-sm mt-1">{state.description}</p>
                <p className="text-xs text-muted-foreground mt-3 tabular-nums">
                  Média: R$ {state.avgCostPerPerson.toLocaleString("pt-BR")} /pessoa
                </p>
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default StepCountryState;
