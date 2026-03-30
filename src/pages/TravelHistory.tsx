import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { ArrowLeft, Plane, Calendar, Users, MapPin, Trash2, DollarSign, Bus, Hotel, Utensils, Star, Navigation, ChevronRight } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import { budgetRanges, transportOptions, localTransportOptions, monthNames, categoryLabels } from '@/data/mockData';
import type { TouristSpot, AccommodationDetail, ItineraryDay } from '@/types/travel';

interface TravelRecord {
  id: string;
  budget: number;
  people: number;
  group_type: string;
  country: string;
  state: string;
  month: number | null;
  entertainment: string[];
  food: string[];
  accommodation: string | null;
  local_transport: string | null;
  transport_to_destination: string | null;
  tourist_spots: TouristSpot[] | null;
  restaurants: any[] | null;
  created_at: string;
}

const TravelHistory = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [records, setRecords] = useState<TravelRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<TravelRecord | null>(null);

  useEffect(() => {
    if (!user) { navigate('/auth'); return; }
    fetchHistory();
  }, [user]);

  const fetchHistory = async () => {
    const { data } = await supabase
      .from('travel_history')
      .select('*')
      .order('created_at', { ascending: false });
    setRecords((data as unknown as TravelRecord[]) || []);
    setLoading(false);
  };

  const deleteRecord = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await supabase.from('travel_history').delete().eq('id', id);
    setRecords((prev) => prev.filter((r) => r.id !== id));
    if (selected?.id === id) setSelected(null);
  };

  const groupTypeLabel = (t: string) => t === 'couple' ? 'Casal' : t === 'friends' ? 'Amigos' : 'Solo';

  const getBudgetLabel = (budget: number) => {
    const range = budgetRanges.find(r => budget >= r.min && budget <= r.max);
    return range ? `${range.emoji} ${range.label}` : `R$ ${budget.toLocaleString('pt-BR')}`;
  };

  const getTransportLabel = (id: string | null) => {
    if (!id) return null;
    const t = transportOptions.find(o => o.id === id);
    return t ? `${t.emoji} ${t.label}` : id;
  };

  const getLocalTransportLabel = (id: string | null) => {
    if (!id) return null;
    const t = localTransportOptions.find(o => o.id === id);
    return t ? `${t.emoji} ${t.label}` : id;
  };

  const spots = (selected?.tourist_spots || []) as TouristSpot[];
  const restaurants = (selected?.restaurants || []) as any[];

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => navigate('/')} className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 rounded-xl gradient-pe flex items-center justify-center">
              <Navigation size={20} className="text-primary-foreground" />
            </div>
            <span className="text-xl font-black tracking-tight">
              <span className="text-primary">TRIP</span><span className="text-accent">SMART</span>
            </span>
          </button>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="sm" onClick={() => navigate('/')} className="gap-1.5 text-xs font-bold">
              <ArrowLeft size={14} /> Início
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-black tracking-display text-foreground mb-8">Histórico de viagens</h1>

        {loading ? (
          <p className="text-muted-foreground text-center py-12">Carregando...</p>
        ) : records.length === 0 ? (
          <div className="text-center py-20">
            <Plane size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-lg text-muted-foreground">Nenhuma viagem planejada ainda.</p>
            <Button onClick={() => navigate('/planejar')} className="mt-6 gradient-pe border-0 rounded-full px-6 font-bold text-primary-foreground">
              Planejar primeira viagem
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {records.map((r, i) => (
              <motion.button
                key={r.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelected(r)}
                className="p-5 rounded-2xl border border-border bg-card text-left hover:border-primary/40 transition-all group"
                style={{ boxShadow: 'var(--card-shadow)' }}
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="flex items-center gap-1 text-sm font-semibold text-primary">
                        <MapPin size={14} /> {r.state}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar size={12} /> {new Date(r.created_at).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Users size={12} /> {r.people}p · {groupTypeLabel(r.group_type)}
                      </span>
                      {r.month && (
                        <span className="text-xs text-muted-foreground">📅 {monthNames[(r.month || 1) - 1]}</span>
                      )}
                    </div>
                    <p className="text-sm text-foreground font-bold tabular-nums">
                      {getBudgetLabel(r.budget)}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {r.transport_to_destination && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent font-semibold">
                          {getTransportLabel(r.transport_to_destination)}
                        </span>
                      )}
                      {r.accommodation && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-secondary/20 text-secondary font-semibold">🏨 {r.accommodation}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={(e) => deleteRecord(r.id, e)} className="text-muted-foreground hover:text-destructive transition-colors p-1">
                      <Trash2 size={16} />
                    </button>
                    <ChevronRight size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </div>

      {/* Detail Sheet */}
      <Sheet open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto bg-background border-l border-border">
          <SheetHeader>
            <SheetTitle className="text-xl font-black text-foreground flex items-center gap-2">
              <MapPin size={20} className="text-primary" /> {selected?.state}
            </SheetTitle>
          </SheetHeader>

          {selected && (
            <div className="mt-6 space-y-6">
              {/* Selections summary */}
              <div className="p-4 rounded-xl bg-card border border-border space-y-3">
                <h3 className="text-sm font-bold text-card-foreground uppercase tracking-wider">Opções selecionadas</h3>
                <div className="grid grid-cols-2 gap-3">
                  <InfoItem icon={<DollarSign size={14} />} label="Orçamento" value={`R$ ${selected.budget.toLocaleString('pt-BR')}`} sublabel={getBudgetLabel(selected.budget)} />
                  <InfoItem icon={<Users size={14} />} label="Pessoas" value={`${selected.people}`} sublabel={groupTypeLabel(selected.group_type)} />
                  <InfoItem icon={<Calendar size={14} />} label="Mês" value={selected.month ? monthNames[selected.month - 1] : 'Não definido'} />
                  <InfoItem icon={<Bus size={14} />} label="Transporte (ida)" value={getTransportLabel(selected.transport_to_destination) || 'Não definido'} />
                  <InfoItem icon={<Bus size={14} />} label="Transporte local" value={getLocalTransportLabel(selected.local_transport) || 'Não definido'} />
                  <InfoItem icon={<Hotel size={14} />} label="Hospedagem" value={selected.accommodation || 'Não definido'} />
                </div>
              </div>

              {/* Tourist spots */}
              {spots.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
                    <Star size={14} className="text-secondary" /> Pontos turísticos ({spots.length})
                  </h3>
                  <div className="space-y-2">
                    {spots.map((spot: TouristSpot) => (
                      <div key={spot.id} className="p-3 rounded-xl border border-border bg-card flex items-center gap-3">
                        <span className="text-2xl">{spot.imageEmoji}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-card-foreground truncate">{spot.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{spot.description}</p>
                        </div>
                        <div className="text-right">
                          <span className="flex items-center gap-0.5 text-xs">
                            <Star size={10} className="text-secondary fill-secondary" />
                            {spot.rating}
                          </span>
                          <p className="text-[10px] text-muted-foreground">
                            {spot.avgCostPerPerson === 0 ? 'Grátis' : `R$${spot.avgCostPerPerson}`}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Restaurants */}
              {restaurants.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
                    <Utensils size={14} className="text-accent" /> Restaurantes ({restaurants.length})
                  </h3>
                  <div className="space-y-2">
                    {restaurants.map((r: any, idx: number) => (
                      <div key={idx} className="p-3 rounded-xl border border-border bg-card flex items-center gap-3">
                        <span className="text-2xl">🍽️</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-card-foreground truncate">{r.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{r.cuisine || r.address}</p>
                        </div>
                        {r.rating && (
                          <span className="flex items-center gap-0.5 text-xs">
                            <Star size={10} className="text-secondary fill-secondary" />
                            {r.rating}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Entertainment & Food tags */}
              {(selected.entertainment.length > 0 || selected.food.length > 0) && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Tags</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {selected.entertainment.map((tag) => (
                      <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-semibold">🎯 {tag}</span>
                    ))}
                    {selected.food.map((tag) => (
                      <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent font-semibold">🍴 {tag}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Date */}
              <p className="text-xs text-muted-foreground text-center pt-4 border-t border-border">
                Planejado em {new Date(selected.created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
              </p>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

const InfoItem = ({ icon, label, value, sublabel }: { icon: React.ReactNode; label: string; value: string; sublabel?: string }) => (
  <div className="flex items-start gap-2">
    <span className="text-primary mt-0.5">{icon}</span>
    <div>
      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{label}</p>
      <p className="text-sm font-bold text-foreground">{value}</p>
      {sublabel && <p className="text-[10px] text-muted-foreground">{sublabel}</p>}
    </div>
  </div>
);

export default TravelHistory;
