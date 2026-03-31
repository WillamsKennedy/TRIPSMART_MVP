import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, RotateCcw, Save, Map, ExternalLink, CalendarDays, Share2, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import TravelMap from "@/components/TravelMap";
import { monthNames, transportOptions, localTransportOptions } from "@/data/mockData";
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
  const [shared, setShared] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [loadingItinerary, setLoadingItinerary] = useState(false);
  const [itineraryData, setItineraryData] = useState<any[] | null>(null);

  const transportLabel =
    transportOptions.find((t) => t.id === data.transportToDestination)?.label || data.transportToDestination;
  const localTransportLabel =
    localTransportOptions.find((t) => t.id === data.localTransport)?.label || data.localTransport;

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase.from("travel_history").insert({
      user_id: user.id,
      budget: data.budget,
      people: data.people,
      group_type: data.groupType,
      country: "Brasil",
      state: `${data.cityName}, PE`,
      entertainment: data.selectedSpots.map((s) => s.name),
      food: [],
      accommodation: data.accommodation?.name || null,
      month: data.month,
      transport_to_destination: data.transportToDestination,
      tourist_spots: data.selectedSpots as any,
      local_transport: data.localTransport,
    });
    setSaving(false);
    if (error) {
      toast({ title: "Erro ao salvar", description: error.message, variant: "destructive" });
    } else {
      setSaved(true);
      toast({ title: "Viagem salva!", description: "Acesse seu histórico para ver." });
    }
  };

  const handleShare = async () => {
    if (!user) return;
    setSharing(true);

    // Save to community
    const { error: shareError } = await supabase.from("shared_itineraries").insert({
      user_id: user.id,
      title: `${data.days} dias em ${data.cityName}`,
      description: `Roteiro de ${data.days} dias em ${data.cityName}, PE · ${data.adults} adulto${data.adults > 1 ? "s" : ""}${data.children > 0 ? ` + ${data.children} criança${data.children > 1 ? "s" : ""}` : ""} · ${data.rooms} quarto${data.rooms > 1 ? "s" : ""}${data.isCouple ? " · Casal" : ""} · ${data.selectedSpots.length} atividades.`,
      budget: data.budget,
      budget_label: data.budgetLabel,
      people: data.people,
      days: data.days,
      group_type: data.groupType,
      month: data.month,
      transport_to_destination: data.transportToDestination,
      city: data.city,
      city_name: data.cityName,
      selected_spots: data.selectedSpots as any,
      accommodation: data.accommodation as any,
      local_transport: data.localTransport,
      itinerary_data: itineraryData,
    } as any);

    // Also save to history if not already saved
    if (!saved) {
      await supabase.from("travel_history").insert({
        user_id: user.id,
        budget: data.budget,
        people: data.people,
        group_type: data.groupType,
        country: "Brasil",
        state: `${data.cityName}, PE`,
        entertainment: data.selectedSpots.map((s) => s.name),
        food: [],
        accommodation: data.accommodation?.name || null,
        month: data.month,
        transport_to_destination: data.transportToDestination,
        tourist_spots: data.selectedSpots as any,
        local_transport: data.localTransport,
      });
      setSaved(true);
    }

    setSharing(false);
    if (shareError) {
      toast({ title: "Erro ao compartilhar", description: shareError.message, variant: "destructive" });
    } else {
      setShared(true);
      toast({ title: "Roteiro compartilhado e salvo! 🎉", description: "Visível na comunidade e no seu histórico." });
    }
  };

  const generateItinerary = async () => {
    if (!user) return;
    setLoadingItinerary(true);
    try {
      const { data: result, error } = await supabase.functions.invoke("n8n-webhook", {
        body: {
          action: "generate-itinerary",
          params: {
            budget: data.budget,
            budgetLabel: data.budgetLabel,
            people: data.people,
            adults: data.adults,
            children: data.children,
            isCouple: data.isCouple,
            rooms: data.rooms,
            days: data.days,
            month: data.month,
            transportToDestination: data.transportToDestination,
            city: data.cityName,
            selectedSpots: data.selectedSpots.map((s) => ({
              name: s.name,
              category: s.category,
              lat: s.lat,
              lng: s.lng,
            })),
            accommodation: data.accommodation
              ? { name: data.accommodation.name, lat: data.accommodation.lat, lng: data.accommodation.lng }
              : null,
            localTransport: data.localTransport,
          },
        },
      });
      if (error) throw error;
      if (result?.data) {
        setItineraryData(result.data);
        toast({ title: "Roteiro gerado! 🤖" });
      } else {
        toast({
          title: "Erro: Não foi possivel formular o roteiro",
          description: "Configure o webhook generate-itinerary no n8n.",
          variant: "destructive",
        });
      }
    } catch (e: any) {
      toast({ title: "Erro ao gerar roteiro", description: e.message, variant: "destructive" });
    }
    setLoadingItinerary(false);
  };

  const openGoogleMaps = () => {
    const points: string[] = [];
    if (data.accommodation) points.push(`${data.accommodation.lat},${data.accommodation.lng}`);
    data.selectedSpots.forEach((s) => points.push(`${s.lat},${s.lng}`));
    if (points.length === 0) return;
    if (points.length === 1) {
      window.open(`https://www.google.com/maps/search/?api=1&query=${points[0]}`, '_blank', 'noopener,noreferrer');
      return;
    }
    const origin = points[0];
    const dest = points[points.length - 1];
    const waypoints = points.slice(1, -1).join("|");
    window.open(`https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${dest}&waypoints=${waypoints}&travelmode=walking`, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center gap-8 w-full"
    >
      <div className="w-16 h-16 rounded-full gradient-pe flex items-center justify-center">
        <Check size={32} className="text-primary-foreground" />
      </div>

      <div className="text-center space-y-2">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-display text-foreground">Roteiro pronto! 🎉</h2>
        <p className="text-muted-foreground text-lg">
          {data.days} dia{data.days > 1 ? "s" : ""} em {data.cityName}, PE
        </p>
      </div>

      {/* Summary Card */}
      <div
        className="w-full p-6 rounded-2xl border border-border bg-card space-y-4"
        style={{ boxShadow: "var(--card-shadow)" }}
      >
        <SummaryRow label="Orçamento" value={data.budgetLabel} />
        <SummaryRow label="Adultos" value={`${data.adults}`} />
        {data.children > 0 && <SummaryRow label="Crianças" value={`${data.children}`} />}
        <SummaryRow label="Total passageiros" value={`${data.people} pessoa${data.people > 1 ? "s" : ""}`} />
        {data.isCouple && <SummaryRow label="Tipo" value="💕 Casal" />}
        {data.people > 1 && !data.isCouple && (
          <SummaryRow label="Tipo" value={data.groupType === "couple" ? "Casal" : "Amigos"} />
        )}
        <SummaryRow label="Quartos" value={`${data.rooms}`} />
        <SummaryRow label="Duração" value={`${data.days} dia${data.days > 1 ? "s" : ""}`} />
        {data.month && <SummaryRow label="Mês" value={monthNames[data.month - 1]} />}
        {data.transportToDestination && <SummaryRow label="Transporte ida" value={transportLabel || ""} />}
        <SummaryRow label="Destino" value={`${data.cityName}, Pernambuco`} />

        {data.selectedSpots.length > 0 && (
          <div className="pt-2 border-t border-border">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Atividades Selecionadas
            </span>
            <div className="flex flex-wrap gap-2 mt-2">
              {data.selectedSpots.map((s) => (
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
                ⭐ {data.accommodation.rating} · R$ {data.accommodation.pricePerNight}/noite · Total: R${" "}
                {(data.accommodation.pricePerNight * data.days).toLocaleString("pt-BR")}
              </span>
            </div>
          </div>
        )}

        {data.localTransport && <SummaryRow label="Transporte local" value={localTransportLabel || ""} />}
      </div>

      {/* Map */}
      <div className="w-full space-y-3">
        <div className="flex items-center gap-2">
          <Map size={20} className="text-primary" />
          <span className="font-bold text-foreground">Mapa do roteiro</span>
        </div>
        <TravelMap spots={data.selectedSpots} accommodation={data.accommodation} restaurants={[]} />
        <div className="flex flex-wrap items-center gap-3">
          <span className="flex items-center gap-1 text-xs">
            <span className="w-3 h-3 rounded-full" style={{ background: "#FF6B35" }} /> Hospedagem
          </span>
          <span className="flex items-center gap-1 text-xs">
            <span className="w-3 h-3 rounded-full" style={{ background: "#00B4D8" }} /> Atividades
          </span>
          <span className="flex items-center gap-1 text-xs">
            <span className="w-3 h-3 rounded-full" style={{ background: "#E91E63" }} /> Restaurantes
          </span>
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

      {/* Generate itinerary via n8n */}
      <div className="w-full p-5 rounded-2xl border border-dashed border-primary/40 bg-primary/5">
        <div className="flex items-center gap-2 mb-3">
          <CalendarDays size={20} className="text-primary" />
          <span className="font-bold text-foreground">Roteiro dia a dia</span>
        </div>
        {itineraryData ? (
          <div className="space-y-4">
            {itineraryData.map((day: any, i: number) => (
              <div key={i} className="p-3 rounded-xl bg-card border border-border">
                <h4 className="font-bold text-foreground">
                  Dia {day.day}: {day.title}
                </h4>
                <div className="mt-2 space-y-1">
                  {day.activities?.map((act: any, j: number) => (
                    <p key={j} className="text-sm text-muted-foreground">
                      <span className="font-semibold text-primary">{act.time}</span> — {act.description}
                      {act.location && <span className="text-xs"> · 📍 {act.location}</span>}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <p className="text-sm text-primary font-semibold">🤖 Gere o roteiro personalizado pela IA</p>
            <Button
              onClick={generateItinerary}
              disabled={loadingItinerary}
              className="mt-3 gradient-pe border-0 rounded-full font-bold gap-2"
            >
              <CalendarDays size={16} /> {loadingItinerary ? "Gerando roteiro..." : "Gerar roteiro com IA"}
            </Button>
          </>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
        {!saved && !shared && (
          <Button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 gradient-pe border-0 rounded-full font-bold gap-2"
          >
            <Save size={16} /> {saving ? "Salvando..." : "Salvar no histórico"}
          </Button>
        )}
        {!shared && (
          <Button
            onClick={handleShare}
            disabled={sharing}
            variant="outline"
            className="flex-1 rounded-full font-bold gap-2"
          >
            <Share2 size={16} /> {sharing ? "Compartilhando..." : "Compartilhar roteiro"}
          </Button>
        )}
        {(saved || shared) && (
          <p className="text-sm text-center text-muted-foreground w-full">
            ✅ {shared ? "Compartilhado na comunidade e salvo no histórico" : "Salvo no histórico"}
          </p>
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
