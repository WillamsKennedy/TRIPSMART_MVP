import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, RotateCcw, Save, Map, ExternalLink, CalendarDays } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import TravelMap from "@/components/TravelMap";
import { monthNames, transportOptions, localTransportOptions, restaurantsByState } from "@/data/mockData";
import type { TravelState } from "@/types/travel";

interface StepSummaryProps {
  data: TravelState;
  onRestart: () => void;
}

const StepSummary = ({ data, onRestart }: StepSummaryProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const transportLabel = transportOptions.find(t => t.id === data.transportToDestination)?.label || data.transportToDestination;
  const localTransportLabel = localTransportOptions.find(t => t.id === data.localTransport)?.label || data.localTransport;

  // Get all restaurants for the state to show on map
  const stateRestaurants = restaurantsByState[data.state] || [];

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase.from('travel_history').insert({
      user_id: user.id,
      budget: data.budget,
      people: data.people,
      group_type: data.groupType,
      country: 'Brasil',
      state: data.stateName || data.state,
      entertainment: data.selectedSpots.map(s => s.name),
      food: [],
      accommodation: data.accommodation?.name || null,
      month: data.month,
      transport_to_destination: data.transportToDestination,
      tourist_spots: data.selectedSpots as any,
      local_transport: data.localTransport,
      restaurants: stateRestaurants as any,
    });
    setSaving(false);
    if (error) {
      toast({ title: 'Erro ao salvar', description: error.message, variant: 'destructive' });
    } else {
      setSaved(true);
      toast({ title: 'Viagem salva!', description: 'Acesse seu histórico para ver.' });
    }
  };

  const generateMapsUrl = () => {
    const points: string[] = [];
    if (data.accommodation) points.push(`${data.accommodation.lat},${data.accommodation.lng}`);
    data.selectedSpots.forEach(s => points.push(`${s.lat},${s.lng}`));
    stateRestaurants.forEach(r => points.push(`${r.lat},${r.lng}`));
    if (points.length < 2) return '#';
    const origin = points[0];
    const dest = points[points.length - 1];
    const waypoints = points.slice(1, -1).join('|');
    return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${dest}&waypoints=${waypoints}&travelmode=walking`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center gap-8 w-full"
    >
      <div className="w-16 h-16 rounded-full gradient-tropical flex items-center justify-center">
        <Check size={32} className="text-primary-foreground" />
      </div>

      <div className="text-center space-y-2">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-display text-foreground">
          Roteiro pronto! 🎉
        </h2>
        <p className="text-muted-foreground text-lg">
          {data.days} dia{data.days > 1 ? 's' : ''} em {data.stateName}
        </p>
      </div>

      {/* Summary Card */}
      <div className="w-full p-6 rounded-2xl border border-border bg-card space-y-4" style={{ boxShadow: 'var(--card-shadow)' }}>
        <SummaryRow label="Orçamento" value={data.budgetLabel} />
        <SummaryRow label="Passageiros" value={`${data.people} pessoa${data.people > 1 ? 's' : ''}`} />
        <SummaryRow label="Duração" value={`${data.days} dia${data.days > 1 ? 's' : ''}`} />
        {data.people > 1 && <SummaryRow label="Tipo" value={data.groupType === 'couple' ? 'Casal' : 'Amigos'} />}
        {data.month && <SummaryRow label="Mês" value={monthNames[data.month - 1]} />}
        {data.transportToDestination && <SummaryRow label="Transporte ida" value={transportLabel || ''} />}
        <SummaryRow label="Destino" value={`${data.stateName}, Brasil`} />
        
        {data.selectedSpots.length > 0 && (
          <div className="pt-2 border-t border-border">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Pontos Turísticos</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {data.selectedSpots.map(s => (
                <span key={s.id} className="text-xs font-bold px-3 py-1 rounded-full bg-primary/10 text-primary">
                  {s.imageEmoji} {s.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {data.accommodation && (
          <div className="pt-2 border-t border-border">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Hospedagem</span>
            <div className="mt-1">
              <span className="font-bold text-foreground">{data.accommodation.name}</span>
              <span className="text-sm text-muted-foreground block">{data.accommodation.address}</span>
              <span className="text-sm text-primary font-semibold">
                ⭐ {data.accommodation.rating} · R$ {data.accommodation.pricePerNight}/noite · 
                Total: R$ {(data.accommodation.pricePerNight * data.days).toLocaleString('pt-BR')}
              </span>
            </div>
          </div>
        )}

        {data.localTransport && <SummaryRow label="Transporte local" value={localTransportLabel || ''} />}
      </div>

      {/* Map */}
      <div className="w-full space-y-3">
        <div className="flex items-center gap-2">
          <Map size={20} className="text-primary" />
          <span className="font-bold text-foreground">Mapa do roteiro</span>
        </div>
        <TravelMap
          spots={data.selectedSpots}
          accommodation={data.accommodation}
          restaurants={stateRestaurants}
        />
        <div className="flex flex-wrap items-center gap-3">
          <span className="flex items-center gap-1 text-xs"><span className="w-3 h-3 rounded-full" style={{ background: '#FF6B35' }} /> Hospedagem</span>
          <span className="flex items-center gap-1 text-xs"><span className="w-3 h-3 rounded-full" style={{ background: '#00B4D8' }} /> Pontos Turísticos</span>
          <span className="flex items-center gap-1 text-xs"><span className="w-3 h-3 rounded-full" style={{ background: '#E91E63' }} /> Restaurantes</span>
        </div>
      </div>

      {/* Google Maps Link */}
      <a
        href={generateMapsUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-6 py-3 rounded-full border border-primary text-primary font-bold hover:bg-primary/10 transition-colors"
      >
        <ExternalLink size={16} /> Abrir roteiro no Google Maps
      </a>

      {/* N8N Itinerary placeholder */}
      <div className="w-full p-5 rounded-2xl border border-dashed border-primary/40 bg-primary/5">
        <div className="flex items-center gap-2 mb-3">
          <CalendarDays size={20} className="text-primary" />
          <span className="font-bold text-foreground">Roteiro dia a dia</span>
        </div>
        <p className="text-sm text-primary font-semibold">
          🤖 O roteiro diário será gerado pela IA via n8n com base nos seus {data.days} dias de viagem
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Incluirá: o que fazer a cada dia e hora, rotas otimizadas e sugestões personalizadas
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Configure o n8n para ativar este recurso · Webhook: <code className="text-primary">generate-itinerary</code>
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
        {!saved && (
          <Button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 gradient-tropical border-0 rounded-full font-bold gap-2"
          >
            <Save size={16} /> {saving ? 'Salvando...' : 'Salvar no histórico'}
          </Button>
        )}
        <Button variant="outline" size="lg" onClick={onRestart} className="flex-1 rounded-full gap-2">
          <RotateCcw size={16} /> Nova viagem
        </Button>
      </div>
    </motion.div>
  );
};

const SummaryRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between items-baseline">
    <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{label}</span>
    <span className="text-sm font-semibold text-foreground text-right max-w-[60%]">{value}</span>
  </div>
);

export default StepSummary;
