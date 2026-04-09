import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, MapPin, Navigation, HelpCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import StarRating from "@/components/StarRating";
import type { AccommodationDetail, TouristSpot } from "@/types/travel";

interface StepAccommodationProps {
  cityId: string;
  cityName: string;
  selectedSpots: TouristSpot[];
  budget: number;
  budgetLabel: string;
  people: number;
  days: number;
  month: number | null;
  transportToDestination: string | null;
  onNext: (accommodation: AccommodationDetail) => void;
}

// Haversine distance in km
const haversineKm = (lat1: number, lng1: number, lat2: number, lng2: number) => {
  const toRad = (v: number) => (v * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

const StepAccommodation = ({
  cityId,
  cityName,
  selectedSpots,
  budget,
  budgetLabel,
  people,
  days,
  month,
  transportToDestination,
  onNext,
}: StepAccommodationProps) => {
  const { toast } = useToast();
  const [accommodations, setAccommodations] = useState<AccommodationDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [avgRatings, setAvgRatings] = useState<Record<string, { avg: number; count: number }>>({});

  useEffect(() => {
    fetchAccommodations();
    fetchAvgRatings();
  }, [cityId]);

  const fetchAccommodations = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("n8n-webhook", {
        body: {
          action: "get-accommodations",
          params: {
            city: cityId,
            cityName,
            budget,
            budgetLabel,
            people,
            days,
            month,
            transportToDestination,
            spots: selectedSpots.map((s) => ({ name: s.name, lat: s.lat, lng: s.lng, category: s.category })),
          },
        },
      });
      if (data?.data && Array.isArray(data.data)) {
        setAccommodations(data.data);
      } else {
        setAccommodations([]);
      }
    } catch {
      setAccommodations([]);
    }
    setLoading(false);
  };

  const fetchAvgRatings = async () => {
    const { data } = await supabase.from("accommodation_reviews" as any).select("accommodation_name, score").eq("city_id", cityId);
    if (data && Array.isArray(data)) {
      const map: Record<string, number[]> = {};
      (data as any[]).forEach((r: any) => {
        if (!map[r.accommodation_name]) map[r.accommodation_name] = [];
        map[r.accommodation_name].push(r.score);
      });
      const result: Record<string, { avg: number; count: number }> = {};
      Object.entries(map).forEach(([name, scores]) => {
        result[name] = { avg: scores.reduce((a, b) => a + b, 0) / scores.length, count: scores.length };
      });
      setAvgRatings(result);
    }
  };

  // Calculate distance from accommodation to the main (first) selected spot
  const getDistanceToMainSpot = (acc: AccommodationDetail) => {
    if (!selectedSpots.length || !acc.lat || !acc.lng) return null;
    const main = selectedSpots[0];
    return haversineKm(acc.lat, acc.lng, main.lat, main.lng);
  };

  // Spent so far estimate (spots avg cost)
  const spotsCost = selectedSpots.reduce((sum, s) => sum + (s.avgCostPerPerson || 0), 0) * people;
  const remainingBudget = budget - spotsCost;

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
        <p className="text-muted-foreground text-lg">Hospedagens em {cityName}</p>
      </div>

      {/* Budget remaining */}
      <div className="w-full max-w-lg p-3 rounded-xl bg-primary/5 border border-primary/20 text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
          Orçamento restante estimado
        </span>
        <p className="text-lg font-extrabold text-primary">
          R$ {remainingBudget.toLocaleString("pt-BR")}
          <span className="text-xs text-muted-foreground font-normal ml-2">
            (R$ {spotsCost.toLocaleString("pt-BR")} em atividades)
          </span>
        </p>
      </div>

      <div className="grid gap-4 w-full max-w-lg">
        {/* Ainda não sei */}
        <motion.button
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onNext({ id: "undecided", name: "Ainda não definida", type: "Indefinido", address: "", pricePerNight: 0, rating: 0, lat: 0, lng: 0, safetyScore: 0, distanceToSpots: 0 })}
          aria-label="Ainda não sei onde vou ficar"
          className="p-5 rounded-2xl border border-dashed border-muted-foreground/40 bg-muted/30 text-left hover:border-primary/40 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <div className="flex items-center gap-4">
            <HelpCircle size={28} className="text-muted-foreground" />
            <div>
              <span className="font-bold text-muted-foreground block">Ainda não sei</span>
              <span className="text-sm text-muted-foreground">Decido a hospedagem depois</span>
            </div>
          </div>
        </motion.button>

        {loading ? (
          <div className="text-center py-8" role="status" aria-live="polite">
            <p className="text-muted-foreground">Buscando hospedagens...</p>
          </div>
        ) : accommodations.length === 0 ? (
          <div className="text-center py-8" role="alert">
            <p className="text-muted-foreground mb-4">Não foi possível encontrar hospedagens. Tente novamente.</p>
          </div>
        ) : (
          accommodations.map((acc, i) => {
            const distKm = getDistanceToMainSpot(acc);
            const totalCost = acc.pricePerNight * days;
            const withinBudget = totalCost <= remainingBudget;
            const userRating = avgRatings[acc.name];
            return (
              <motion.button
                key={acc.id || i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onNext(acc)}
                className={`p-5 rounded-2xl border text-left transition-all hover:shadow-lg hover:border-primary/40 ${
                  withinBudget ? "border-border bg-card" : "border-destructive/30 bg-destructive/5"
                }`}
                style={{ boxShadow: "var(--card-shadow)" }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <span className="text-xs font-bold uppercase tracking-widest text-primary">{acc.type}</span>
                    <h3 className="text-lg font-bold text-card-foreground mt-1">{acc.name}</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                      <MapPin size={12} /> {acc.address}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="text-xl font-extrabold text-foreground">R$ {acc.pricePerNight}</span>
                    <span className="text-xs text-muted-foreground block">/noite</span>
                    <span className="text-xs font-semibold text-primary block">
                      Total: R$ {totalCost.toLocaleString("pt-BR")}
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3 mt-3">
                  {acc.rating && (
                    <span className="flex items-center gap-1 text-sm">
                      <Star size={14} className="text-primary fill-primary" />
                      <span className="font-bold text-foreground">{acc.rating}</span>
                    </span>
                  )}
                  {distKm !== null && (
                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Navigation size={14} />
                      <span className="font-bold">{distKm.toFixed(1)}km</span>
                      <span className="text-xs">da atividade principal</span>
                    </span>
                  )}
                  {!withinBudget && <span className="text-xs font-bold text-destructive">⚠ Acima do orçamento</span>}
                  {userRating && (
                    <span className="flex items-center gap-1 text-sm">
                      <StarRating value={userRating.avg} readOnly size={12} showValue />
                      <span className="text-xs text-muted-foreground">({userRating.count})</span>
                    </span>
                  )}
                </div>
              </motion.button>
            );
          })
        )}
      </div>
    </motion.div>
  );
};

export default StepAccommodation;
