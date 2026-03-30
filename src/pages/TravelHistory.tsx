import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { ArrowLeft, Plane, Calendar, Users, MapPin, Trash2, DollarSign, Bus, Hotel, Utensils, Star, Navigation, ChevronRight } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import { budgetRanges, transportOptions, localTransportOptions, monthNames } from '@/data/mockData';
import type { TouristSpot } from '@/types/travel';

interface TravelRecord {
  id: string; budget: number; people: number; group_type: string; country: string; state: string;
  month: number | null; entertainment: string[]; food: string[]; accommodation: string | null;
  local_transport: string | null; transport_to_destination: string | null;
  tourist_spots: TouristSpot[] | null; restaurants: any[] | null; created_at: string;
}

const TravelHistory = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [records, setRecords] = useState<TravelRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<TravelRecord | null>(null);

  useEffect(() => { if (!user) { navigate('/auth'); return; } fetchHistory(); }, [user]);

  const fetchHistory = async () => {
    const { data } = await supabase.from('travel_history').select('*').order('created_at', { ascending: false });
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
  const getBudgetLabel = (budget: number) => { const range = budgetRanges.find(r => budget >= r.min && budget <= r.max); return range ? `${range.emoji} ${range.label}` : `R$ ${budget.toLocaleString('pt-BR')}`; };
  const getTransportLabel = (id: string | null) => { if (!id) return null; const t = transportOptions.find(o => o.id === id); return t ? `${t.emoji} ${t.label}` : id; };
  const getLocalTransportLabel = (id: string | null) => { if (!id) return null; const t = localTransportOptions.find(o => o.id === id); return t ? `${t.emoji} ${t.label}` : id; };

  const spots = (selected?.tourist_spots || []) as TouristSpot[];
  const restaurants = (selected?.restaurants || []) as any[];

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-pe-navy border-b border-pe-blue/20">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => navigate('/')} className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 rounded-xl bg-pe-gold flex items-center justify-center">
              <Navigation size={20} className="text-pe-navy" />
            </div>
            <span className="text-xl font-black tracking-tight text-white">
              TRIP<span className="text-pe-gold">SMART</span>
            </span>
          </button>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="sm" onClick={() => navigate('/')} className="gap-1.5 text-xs font-bold text-white/80 hover:text-white hover:bg-white/10">
              <ArrowLeft size={14} /> Início
            </Button>
          </div>
        </div>
      </nav>

      {/* Header banner */}
      <div className="bg-pe-blue px-6 py-10">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-black tracking-display text-white">Histórico de viagens</h1>
          <p className="text-white/70 mt-2">Todas as suas viagens planejadas</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        {loading ? (
          <p className="text-muted-foreground text-center py-12">Carregando...</p>
        ) : records.length === 0 ? (
          <div className="text-center py-20">
            <Plane size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-lg text-muted-foreground">Nenhuma viagem planejada ainda.</p>
            <Button onClick={() => navigate('/planejar')} className="mt-6 bg-pe-gold hover:bg-pe-gold/90 text-pe-navy border-0 rounded-full px-6 font-bold">
              Planejar primeira viagem
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {records.map((r, i) => (
              <motion.button key={r.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} onClick={() => setSelected(r)} className="rounded-2xl border border-border bg-card text-left hover:border-pe-blue/40 transition-all group overflow-hidden" style={{ boxShadow: 'var(--card-shadow)' }}>
                {/* Colored strip */}
                <div className="h-1.5 bg-pe-gold" />
                <div className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="flex items-center gap-1 text-sm font-semibold px-2 py-1 rounded-full bg-pe-blue/10 text-primary"><MapPin size={14} /> {r.state}</span>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground"><Calendar size={12} /> {new Date(r.created_at).toLocaleDateString('pt-BR')}</span>
                      </div>
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="flex items-center gap-1 text-xs text-muted-foreground"><Users size={12} /> {r.people}p · {groupTypeLabel(r.group_type)}</span>
                        {r.month && <span className="text-xs px-2 py-0.5 rounded-full bg-pe-gold/10 text-pe-gold font-semibold">📅 {monthNames[(r.month || 1) - 1]}</span>}
                      </div>
                      <p className="text-sm text-foreground font-bold tabular-nums">{getBudgetLabel(r.budget)}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {r.transport_to_destination && <span className="text-xs px-2 py-0.5 rounded-full bg-pe-red/10 text-pe-red font-semibold">{getTransportLabel(r.transport_to_destination)}</span>}
                        {r.accommodation && <span className="text-xs px-2 py-0.5 rounded-full bg-pe-blue/10 text-primary font-semibold">🏨 {r.accommodation}</span>}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={(e) => deleteRecord(r.id, e)} className="text-muted-foreground hover:text-destructive transition-colors p-1"><Trash2 size={16} /></button>
                      <ChevronRight size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
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
              <div className="w-8 h-8 rounded-lg bg-pe-blue flex items-center justify-center"><MapPin size={16} className="text-white" /></div>
              {selected?.state}
            </SheetTitle>
          </SheetHeader>
          {selected && (
            <div className="mt-6 space-y-6">
              <div className="p-4 rounded-xl bg-section-blue border border-pe-blue/10 space-y-3">
                <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Opções selecionadas</h3>
                <div className="grid grid-cols-2 gap-3">
                  <InfoItem icon={<DollarSign size={14} />} label="Orçamento" value={`R$ ${selected.budget.toLocaleString('pt-BR')}`} sublabel={getBudgetLabel(selected.budget)} color="text-pe-gold" />
                  <InfoItem icon={<Users size={14} />} label="Pessoas" value={`${selected.people}`} sublabel={groupTypeLabel(selected.group_type)} color="text-primary" />
                  <InfoItem icon={<Calendar size={14} />} label="Mês" value={selected.month ? monthNames[selected.month - 1] : 'Não definido'} color="text-pe-red" />
                  <InfoItem icon={<Bus size={14} />} label="Transporte (ida)" value={getTransportLabel(selected.transport_to_destination) || 'Não definido'} color="text-primary" />
                  <InfoItem icon={<Bus size={14} />} label="Transporte local" value={getLocalTransportLabel(selected.local_transport) || 'Não definido'} color="text-pe-gold" />
                  <InfoItem icon={<Hotel size={14} />} label="Hospedagem" value={selected.accommodation || 'Não definido'} color="text-pe-red" />
                </div>
              </div>

              {spots.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
                    <Star size={14} className="text-pe-gold" /> Pontos turísticos ({spots.length})
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
                          <span className="flex items-center gap-0.5 text-xs"><Star size={10} className="text-pe-gold fill-pe-gold" />{spot.rating}</span>
                          <p className="text-[10px] text-muted-foreground">{spot.avgCostPerPerson === 0 ? 'Grátis' : `R$${spot.avgCostPerPerson}`}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {restaurants.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
                    <Utensils size={14} className="text-pe-red" /> Restaurantes ({restaurants.length})
                  </h3>
                  <div className="space-y-2">
                    {restaurants.map((r: any, idx: number) => (
                      <div key={idx} className="p-3 rounded-xl border border-border bg-card flex items-center gap-3">
                        <span className="text-2xl">🍽️</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-card-foreground truncate">{r.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{r.cuisine || r.address}</p>
                        </div>
                        {r.rating && <span className="flex items-center gap-0.5 text-xs"><Star size={10} className="text-pe-gold fill-pe-gold" />{r.rating}</span>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {(selected.entertainment.length > 0 || selected.food.length > 0) && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Tags</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {selected.entertainment.map((tag) => <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-pe-blue/10 text-primary font-semibold">🎯 {tag}</span>)}
                    {selected.food.map((tag) => <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-pe-red/10 text-pe-red font-semibold">🍴 {tag}</span>)}
                  </div>
                </div>
              )}

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

const InfoItem = ({ icon, label, value, sublabel, color = "text-primary" }: { icon: React.ReactNode; label: string; value: string; sublabel?: string; color?: string }) => (
  <div className="flex items-start gap-2">
    <span className={`${color} mt-0.5`}>{icon}</span>
    <div>
      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{label}</p>
      <p className="text-sm font-bold text-foreground">{value}</p>
      {sublabel && <p className="text-[10px] text-muted-foreground">{sublabel}</p>}
    </div>
  </div>
);

export default TravelHistory;
