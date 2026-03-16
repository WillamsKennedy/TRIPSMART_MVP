import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Search, Star, Check, MapPin, Filter } from "lucide-react";
import { brazilianStates, touristSpotsByState, monthNames } from "@/data/mockData";
import type { TouristSpot, StateData } from "@/types/travel";

interface StepStateProps {
  month: number | null;
  preSelectedState?: string;
  onNext: (state: string, stateName: string, spots: TouristSpot[]) => void;
}

const regions = ['Todos', 'Nordeste', 'Sudeste', 'Sul', 'Norte', 'Centro-Oeste'];

const demandColors: Record<string, string> = {
  high: 'bg-destructive/10 text-destructive',
  moderate: 'bg-primary/10 text-primary',
  low: 'bg-secondary/20 text-secondary',
};

const StepState = ({ month, preSelectedState, onNext }: StepStateProps) => {
  const [search, setSearch] = useState("");
  const [regionFilter, setRegionFilter] = useState("Todos");
  const [selectedState, setSelectedState] = useState<StateData | null>(
    preSelectedState ? brazilianStates.find(s => s.id === preSelectedState) || null : null
  );
  const [sheetOpen, setSheetOpen] = useState(!!preSelectedState);
  const [selectedSpots, setSelectedSpots] = useState<TouristSpot[]>([]);

  const filteredStates = useMemo(() => {
    return brazilianStates.filter(s => {
      const matchSearch = s.name.toLowerCase().includes(search.toLowerCase());
      const matchRegion = regionFilter === 'Todos' || s.region === regionFilter;
      return matchSearch && matchRegion;
    });
  }, [search, regionFilter]);

  const spots = selectedState ? touristSpotsByState[selectedState.id] || [] : [];

  const toggleSpot = (spot: TouristSpot) => {
    setSelectedSpots(prev =>
      prev.find(s => s.id === spot.id)
        ? prev.filter(s => s.id !== spot.id)
        : [...prev, spot]
    );
  };

  const isSpotInSeason = (spot: TouristSpot) => month ? spot.peakMonths.includes(month) : true;

  const getBestMonth = (spot: TouristSpot) => {
    if (!spot.peakMonths.length) return '';
    return monthNames[spot.peakMonths[0] - 1];
  };

  const handleStateClick = (state: StateData) => {
    setSelectedState(state);
    setSelectedSpots([]);
    setSheetOpen(true);
  };

  const handleConfirmSpots = () => {
    if (!selectedState) return;
    setSheetOpen(false);
    onNext(selectedState.id, selectedState.name, selectedSpots);
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
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-display text-foreground">
          Para onde no <span className="gradient-text">Brasil?</span>
        </h2>
        <p className="text-muted-foreground text-lg">
          Selecione o estado e os pontos turísticos
          {month && <> · <span className="font-semibold">{monthNames[month - 1]}</span></>}
        </p>
      </div>

      {/* Search */}
      <div className="w-full max-w-md flex items-center gap-2 px-4 py-3 bg-card rounded-2xl border border-border" style={{ boxShadow: 'var(--card-shadow)' }}>
        <Search size={18} className="text-muted-foreground" />
        <input
          type="text"
          placeholder="Buscar estado..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent outline-none text-sm text-foreground w-full placeholder:text-muted-foreground"
        />
      </div>

      {/* Region filter */}
      <div className="flex flex-wrap gap-2 justify-center">
        {regions.map(r => (
          <button
            key={r}
            onClick={() => setRegionFilter(r)}
            className={`text-xs font-bold px-4 py-1.5 rounded-full transition-all ${
              regionFilter === r
                ? 'gradient-tropical text-primary-foreground'
                : 'bg-card border border-border text-muted-foreground hover:border-primary/40'
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      {/* State cards */}
      <div className="w-full grid gap-3">
        {filteredStates.map((state, i) => {
          const stateSpots = touristSpotsByState[state.id] || [];
          return (
            <motion.button
              key={state.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03, duration: 0.4 }}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleStateClick(state)}
              className="p-4 rounded-2xl border border-border bg-card text-left transition-shadow hover:shadow-lg hover:border-primary/40"
              style={{ boxShadow: 'var(--card-shadow)' }}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{state.imageEmoji}</span>
                  <div>
                    <h3 className="text-lg font-bold text-card-foreground">{state.name}</h3>
                    <p className="text-muted-foreground text-xs mt-0.5">{state.description}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${demandColors[state.demand]}`}>
                    {state.demandLabel}
                  </span>
                  <span className="text-xs text-primary font-semibold">
                    📍 {stateSpots.length} pontos
                  </span>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Tourist Spots Sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="text-2xl font-extrabold tracking-display">
              {selectedState?.imageEmoji} {selectedState?.name}
            </SheetTitle>
            <p className="text-sm text-muted-foreground">
              Selecione os pontos turísticos
              {month && <> · Viagem em <span className="font-semibold">{monthNames[month - 1]}</span></>}
            </p>
          </SheetHeader>

          <div className="mt-6 space-y-3">
            {spots.length === 0 && (
              <p className="text-muted-foreground text-center py-8">
                Pontos turísticos serão carregados via n8n.
              </p>
            )}
            {spots.map((spot) => {
              const inSeason = isSpotInSeason(spot);
              const isSelected = selectedSpots.find(s => s.id === spot.id);
              return (
                <button
                  key={spot.id}
                  onClick={() => toggleSpot(spot)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all ${
                    isSelected
                      ? 'border-primary bg-primary/10'
                      : 'border-border bg-card hover:border-primary/30'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1">
                      {spot.imageUrl ? (
                        <img
                          src={spot.imageUrl}
                          alt={spot.name}
                          className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                        />
                      ) : (
                        <span className="text-2xl mt-0.5 flex-shrink-0">{spot.imageEmoji}</span>
                      )}
                      <div>
                        <h4 className="font-bold text-foreground">{spot.name}</h4>
                        <p className="text-sm text-muted-foreground mt-0.5">{spot.description}</p>
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          <span className="flex items-center gap-1 text-xs">
                            <Star size={12} className="text-primary fill-primary" />
                            <span className="font-bold text-foreground">{spot.rating}</span>
                          </span>
                          {spot.avgCostPerPerson !== undefined && (
                            <span className="text-xs font-semibold text-accent">
                              {spot.avgCostPerPerson === 0 ? 'Gratuito' : `~R$ ${spot.avgCostPerPerson}/pessoa`}
                            </span>
                          )}
                          {inSeason ? (
                            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-secondary/20 text-secondary">
                              🔥 Em alta
                            </span>
                          ) : (
                            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-muted/20 text-muted-foreground">
                              Melhor em {getBestMonth(spot)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="w-6 h-6 rounded-full gradient-tropical flex items-center justify-center flex-shrink-0">
                        <Check size={14} className="text-primary-foreground" />
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {spots.length > 0 && (
            <div className="mt-6 sticky bottom-0 bg-background pt-4 pb-2">
              <Button
                onClick={handleConfirmSpots}
                disabled={selectedSpots.length === 0}
                className="w-full h-14 rounded-full text-lg font-bold gradient-tropical border-0"
              >
                Confirmar {selectedSpots.length} ponto{selectedSpots.length !== 1 ? 's' : ''}
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </motion.div>
  );
};

export default StepState;
