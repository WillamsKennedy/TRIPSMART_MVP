import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { MapPin, ChevronDown, Search, TrendingUp, Star, Check, X } from "lucide-react";
import { allCountries, demandColors } from "@/data/countries";
import { statesByCountry, touristSpotsByState, monthNames } from "@/data/mockData";
import type { TouristSpot, StateData } from "@/types/travel";

interface StepCountryStateProps {
  month: number | null;
  onNext: (country: string, countryName: string, state: string, stateName: string, spots: TouristSpot[]) => void;
}

const StepCountryState = ({ month, onNext }: StepCountryStateProps) => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [showCountrySelect, setShowCountrySelect] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedState, setSelectedState] = useState<StateData | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [selectedSpots, setSelectedSpots] = useState<TouristSpot[]>([]);

  const filteredCountries = allCountries.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const states = selectedCountry ? statesByCountry[selectedCountry] || [] : [];
  const selectedCountryData = allCountries.find((c) => c.id === selectedCountry);
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
    if (!selectedState || !selectedCountryData) return;
    setSheetOpen(false);
    onNext(selectedCountry, selectedCountryData.name, selectedState.id, selectedState.name, selectedSpots);
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
          Para onde vamos?
        </h2>
        <p className="text-muted-foreground text-lg">
          Selecione o país e depois o estado
          {month && <> · <span className="font-semibold">{monthNames[month - 1]}</span></>}
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
            {selectedCountryData ? (
              <span className="font-semibold text-foreground flex items-center gap-2">
                {selectedCountryData.flag} {selectedCountryData.name}
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${demandColors[selectedCountryData.demand]}`}>
                  {selectedCountryData.demandLabel}
                </span>
              </span>
            ) : (
              <span className="text-muted-foreground">Selecione um país</span>
            )}
          </div>
          <ChevronDown size={18} className={`text-muted-foreground transition-transform ${showCountrySelect ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {showCountrySelect && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-2 rounded-2xl border border-border bg-card overflow-hidden"
              style={{ boxShadow: 'var(--card-shadow)' }}
            >
              <div className="p-3 border-b border-border">
                <div className="flex items-center gap-2 px-3 py-2 bg-background rounded-xl">
                  <Search size={16} className="text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Buscar país..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="bg-transparent outline-none text-sm text-foreground w-full placeholder:text-muted-foreground"
                    autoFocus
                  />
                </div>
              </div>
              <div className="max-h-60 overflow-y-auto">
                {filteredCountries.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      setSelectedCountry(c.id);
                      setShowCountrySelect(false);
                      setSearch("");
                    }}
                    className="w-full text-left px-5 py-3 hover:bg-primary/5 transition-colors flex items-center justify-between"
                  >
                    <span className="flex items-center gap-3 text-foreground font-medium">
                      <span className="text-lg">{c.flag}</span>{c.name}
                    </span>
                    <div className="flex items-center gap-2">
                      <TrendingUp size={12} className={c.demand === 'high' ? 'text-destructive' : c.demand === 'moderate' ? 'text-primary' : 'text-secondary'} />
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${demandColors[c.demand]}`}>{c.demandLabel}</span>
                    </div>
                  </button>
                ))}
                {filteredCountries.length === 0 && (
                  <p className="text-center py-4 text-sm text-muted-foreground">Nenhum país encontrado</p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* State cards */}
      {states.length > 0 && (
        <div className="w-full space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground px-1">
            Estados em {selectedCountryData?.name} · Clique para ver pontos turísticos
          </span>
          <div className="grid gap-3">
            {states.map((state, i) => (
              <motion.button
                key={state.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleStateClick(state)}
                className="p-5 rounded-2xl border border-border bg-card text-left transition-shadow hover:shadow-lg hover:border-primary/40"
                style={{ boxShadow: 'var(--card-shadow)' }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-card-foreground">{state.name}</h3>
                    <p className="text-muted-foreground text-sm mt-1">{state.description}</p>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap ${demandColors[state.demand]}`}>
                    {state.demandLabel}
                  </span>
                </div>
                {touristSpotsByState[state.id] && (
                  <p className="text-xs text-primary mt-2 font-semibold">
                    📍 {touristSpotsByState[state.id].length} pontos turísticos
                  </p>
                )}
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {selectedCountry && states.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Estados para {selectedCountryData?.name} serão carregados via integração n8n.</p>
        </div>
      )}

      {/* Tourist Spots Sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="text-2xl font-extrabold tracking-display">
              📍 {selectedState?.name}
            </SheetTitle>
            <p className="text-sm text-muted-foreground">
              Selecione os pontos turísticos que deseja visitar
              {month && <> em <span className="font-semibold">{monthNames[month - 1]}</span></>}
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
                    <div className="flex items-start gap-3">
                      <span className="text-2xl mt-0.5">{spot.imageEmoji}</span>
                      <div>
                        <h4 className="font-bold text-foreground">{spot.name}</h4>
                        <p className="text-sm text-muted-foreground mt-0.5">{spot.description}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="flex items-center gap-1 text-xs">
                            <Star size={12} className="text-primary fill-primary" />
                            <span className="font-bold text-foreground">{spot.rating}</span>
                          </span>
                          {inSeason ? (
                            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-secondary/20 text-secondary">
                              🔥 Em alta em {month ? monthNames[month - 1] : 'agora'}
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
                Confirmar {selectedSpots.length} ponto{selectedSpots.length !== 1 ? 's' : ''} selecionado{selectedSpots.length !== 1 ? 's' : ''}
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </motion.div>
  );
};

export default StepCountryState;
