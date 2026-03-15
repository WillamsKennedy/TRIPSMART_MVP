import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Check } from "lucide-react";
import { cuisineTypes, restaurantsByState } from "@/data/mockData";
import type { RestaurantDetail } from "@/types/travel";

interface StepFoodProps {
  stateId: string;
  onNext: (restaurants: RestaurantDetail[]) => void;
}

const StepFood = ({ stateId, onNext }: StepFoodProps) => {
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [selectedRestaurants, setSelectedRestaurants] = useState<RestaurantDetail[]>([]);
  const [showRestaurants, setShowRestaurants] = useState(false);
  const allRestaurants = restaurantsByState[stateId] || [];
  const filteredRestaurants = selectedCuisines.length > 0
    ? allRestaurants.filter(r => selectedCuisines.some(c => r.cuisine.toLowerCase().includes(c.toLowerCase()) || c === 'local'))
    : allRestaurants;

  const toggleCuisine = (id: string) => setSelectedCuisines(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]);
  const toggleRestaurant = (r: RestaurantDetail) => setSelectedRestaurants(prev => prev.find(x => x.id === r.id) ? prev.filter(x => x.id !== r.id) : [...prev, r]);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="flex flex-col items-center gap-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-display text-foreground">O que quer comer?</h2>
        <p className="text-muted-foreground text-lg">{!showRestaurants ? 'Selecione os tipos de comida' : 'Escolha restaurantes próximos'}</p>
      </div>
      {!showRestaurants ? (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full max-w-lg">
            {cuisineTypes.map((c) => (
              <motion.button key={c.id} whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }} onClick={() => toggleCuisine(c.id)}
                className={`p-4 rounded-2xl border text-center transition-all ${selectedCuisines.includes(c.id) ? 'border-primary bg-primary/10' : 'border-border bg-card hover:border-primary/30'}`}>
                <span className="text-2xl block">{c.emoji}</span>
                <span className="text-sm font-bold text-foreground mt-1 block">{c.label}</span>
              </motion.button>
            ))}
          </div>
          <Button onClick={() => setShowRestaurants(true)} disabled={selectedCuisines.length === 0} className="w-full max-w-xs h-14 rounded-full text-lg font-bold gradient-tropical border-0">Ver restaurantes</Button>
        </>
      ) : (
        <>
          <div className="grid gap-3 w-full max-w-lg">
            {filteredRestaurants.length === 0 && <p className="text-center py-8 text-muted-foreground">Restaurantes serão carregados via integração n8n.</p>}
            {filteredRestaurants.map((r, i) => {
              const isSelected = selectedRestaurants.find(x => x.id === r.id);
              return (
                <motion.button key={r.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06, duration: 0.4 }}
                  whileHover={{ y: -4 }} whileTap={{ scale: 0.98 }} onClick={() => toggleRestaurant(r)}
                  className={`p-5 rounded-2xl border text-left transition-all ${isSelected ? 'border-primary bg-primary/10' : 'border-border bg-card hover:border-primary/30'}`}
                  style={{ boxShadow: 'var(--card-shadow)' }}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-foreground">{r.name}</h3>
                      <span className="text-xs font-semibold text-primary">{r.cuisine}</span>
                      <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1"><MapPin size={12} /> {r.address}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                      <span className="flex items-center gap-1 text-sm"><Star size={14} className="text-primary fill-primary" /><span className="font-bold text-foreground">{r.rating}</span></span>
                      <span className="text-sm font-bold text-muted-foreground">{r.priceRange}</span>
                      {isSelected && <div className="w-5 h-5 rounded-full gradient-tropical flex items-center justify-center"><Check size={12} className="text-primary-foreground" /></div>}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
          <div className="flex gap-3 w-full max-w-xs">
            <Button variant="outline" onClick={() => setShowRestaurants(false)} className="flex-1 rounded-full">Voltar</Button>
            <Button onClick={() => onNext(selectedRestaurants)} disabled={selectedRestaurants.length === 0} className="flex-1 rounded-full gradient-tropical border-0 font-bold">Confirmar ({selectedRestaurants.length})</Button>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default StepFood;
