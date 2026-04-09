import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, RotateCcw, Save, Map, ExternalLink, CalendarDays, Share2, MapPin, Clock, DollarSign, Lightbulb, AlertTriangle, ChevronDown, ChevronUp, Navigation, Info, Instagram, Phone, MessageSquare, FileDown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import TravelMap from "@/components/TravelMap";
import StarRating from "@/components/StarRating";
import { monthNames, transportOptions, localTransportOptions } from "@/data/mockData";
import type { TravelState } from "@/types/travel";
import type { RichItinerary, RichDay, RichActivity, AttractionZone, AttractionHighlight } from "@/types/richItinerary";

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
  const [richItinerary, setRichItinerary] = useState<RichItinerary | null>(null);
  const [expandedZones, setExpandedZones] = useState<Record<number, boolean>>({});
  const [expandedHighlights, setExpandedHighlights] = useState<Record<string, boolean>>({});
  const [exportingPdf, setExportingPdf] = useState(false);
  const itineraryRef = useRef<HTMLDivElement>(null);
  // Review state
  const [activityRatings, setActivityRatings] = useState<Record<string, number>>({});
  const [activityComments, setActivityComments] = useState<Record<string, string>>({});
  const [accommodationRating, setAccommodationRating] = useState(0);
  const [accommodationComment, setAccommodationComment] = useState("");
  const [savingReview, setSavingReview] = useState<string | null>(null);

  const transportLabel =
    transportOptions.find((t) => t.id === data.transportToDestination)?.label || data.transportToDestination;
  const localTransportLabel =
    localTransportOptions.find((t) => t.id === data.localTransport)?.label || data.localTransport;

  const toggleZone = (i: number) => setExpandedZones((p) => ({ ...p, [i]: !p[i] }));
  const toggleHighlight = (key: string) => setExpandedHighlights((p) => ({ ...p, [key]: !p[key] }));

  // Real cost calculation
  const realAccommodationCost = data.accommodation ? data.accommodation.pricePerNight * data.days : 0;
  const realActivitiesCost = data.selectedSpots.reduce((sum, s) => sum + (s.avgCostPerPerson || 0), 0) * data.people;

  const computedCostBreakdown = richItinerary?.costBreakdown
    ? {
        accommodation: realAccommodationCost || richItinerary.costBreakdown.accommodation,
        food: richItinerary.costBreakdown.food,
        transport: richItinerary.costBreakdown.transport,
        activities: realActivitiesCost || richItinerary.costBreakdown.activities,
        extras: richItinerary.costBreakdown.extras,
      }
    : null;

  const computedTotal = computedCostBreakdown
    ? Object.values(computedCostBreakdown).reduce((a, b) => a + b, 0)
    : richItinerary?.estimatedTotalCost || 0;

  // Save review helpers
  const saveActivityReview = async (activityName: string) => {
    if (!user) return;
    const score = activityRatings[activityName];
    if (!score) return;
    setSavingReview(activityName);
    const { error } = await supabase.from("activity_reviews" as any).upsert(
      {
        user_id: user.id,
        activity_name: activityName,
        city_id: data.city,
        score,
        comment: activityComments[activityName] || null,
      } as any,
      { onConflict: "user_id,activity_name,city_id" }
    );
    setSavingReview(null);
    if (error) {
      toast({ title: "Erro ao salvar avaliação", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Avaliação salva! ⭐" });
    }
  };

  const saveAccommodationReview = async () => {
    if (!user || !data.accommodation || !accommodationRating) return;
    setSavingReview("accommodation");
    const { error } = await supabase.from("accommodation_reviews" as any).upsert(
      {
        user_id: user.id,
        accommodation_name: data.accommodation.name,
        city_id: data.city,
        score: accommodationRating,
        comment: accommodationComment || null,
      } as any,
      { onConflict: "user_id,accommodation_name,city_id" }
    );
    setSavingReview(null);
    if (error) {
      toast({ title: "Erro ao salvar avaliação", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Avaliação salva! ⭐" });
    }
  };

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
      itinerary_data: richItinerary as any,
    } as any);
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
        const raw = Array.isArray(result.data) ? result.data[0] : result.data;
        setRichItinerary(raw as RichItinerary);
        toast({ title: "Roteiro gerado! 🤖" });
      } else {
        toast({
          title: "Não foi possível gerar o roteiro",
          description: "Tente novamente mais tarde.",
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
    if (data.accommodation && data.accommodation.id !== "undecided") points.push(`${data.accommodation.lat},${data.accommodation.lng}`);
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

  const exportToPdf = async () => {
    if (!itineraryRef.current) return;
    setExportingPdf(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");
      const element = itineraryRef.current;
      const canvas = await html2canvas(element, { scale: 2, useCORS: true, backgroundColor: "#ffffff" });
      const imgData = canvas.toDataURL("image/jpeg", 0.95);
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pdfWidth - 20;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 10;
      pdf.addImage(imgData, "JPEG", 10, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight - 20;
      while (heightLeft > 0) {
        position = heightLeft - imgHeight + 10;
        pdf.addPage();
        pdf.addImage(imgData, "JPEG", 10, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight - 20;
      }
      pdf.save(`roteiro-${data.cityName.toLowerCase().replace(/\s/g, "-")}-${data.days}dias.pdf`);
      toast({ title: "PDF exportado! 📄" });
    } catch (e: any) {
      toast({ title: "Erro ao exportar PDF", description: e.message, variant: "destructive" });
    }
    setExportingPdf(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center gap-8 w-full"
      role="main"
      aria-label="Resumo do roteiro"
    >
      <div ref={itineraryRef} className="flex flex-col items-center gap-8 w-full">
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
      <div className="w-full p-6 rounded-2xl border border-border bg-card space-y-4" style={{ boxShadow: "var(--card-shadow)" }}>
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
        {data.month && data.month > 0 && <SummaryRow label="Mês" value={monthNames[data.month - 1]} />}
        {data.month === 0 && <SummaryRow label="Mês" value="Ainda não definido" />}
        {data.transportToDestination && data.transportToDestination !== "undecided" && <SummaryRow label="Transporte ida" value={transportLabel || ""} />}
        {data.transportToDestination === "undecided" && <SummaryRow label="Transporte ida" value="Ainda não definido" />}
        <SummaryRow label="Destino" value={`${data.cityName}, Pernambuco`} />

        {data.selectedSpots.length > 0 && (
          <div className="pt-2 border-t border-border">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Atividades Selecionadas</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {data.selectedSpots.map((s) => (
                <span key={s.id} className="text-xs font-bold px-3 py-1 rounded-full bg-primary/10 text-primary">
                  {s.imageEmoji} {s.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {data.accommodation && data.accommodation.id !== "undecided" && (
          <div className="pt-2 border-t border-border space-y-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Hospedagem</span>
            <div className="mt-1">
              <span className="font-bold text-foreground">{data.accommodation.name}</span>
              <span className="text-sm text-muted-foreground block">{data.accommodation.address}</span>
              <span className="text-sm text-primary font-semibold">
                ⭐ {data.accommodation.rating} · R$ {data.accommodation.pricePerNight}/noite · Total: R${" "}
                {(data.accommodation.pricePerNight * data.days).toLocaleString("pt-BR")}
              </span>
            </div>
            {/* Accommodation review */}
            {user && (
              <div className="p-3 rounded-xl bg-muted/30 space-y-2">
                <span className="text-xs font-bold text-muted-foreground">Avaliar hospedagem</span>
                <StarRating value={accommodationRating} onChange={setAccommodationRating} size={20} />
                <textarea
                  placeholder="Comentário (opcional)"
                  value={accommodationComment}
                  onChange={(e) => setAccommodationComment(e.target.value)}
                  className="w-full bg-background border border-border rounded-lg p-2 text-sm text-foreground placeholder:text-muted-foreground resize-none h-16"
                />
                <Button
                  size="sm"
                  disabled={!accommodationRating || savingReview === "accommodation"}
                  onClick={saveAccommodationReview}
                  className="rounded-full text-xs gap-1"
                >
                  <MessageSquare size={12} /> {savingReview === "accommodation" ? "Salvando..." : "Enviar avaliação"}
                </Button>
              </div>
            )}
          </div>
        )}

        {data.localTransport && data.localTransport !== "undecided" && <SummaryRow label="Transporte local" value={localTransportLabel || ""} />}
        {data.localTransport === "undecided" && <SummaryRow label="Transporte local" value="Ainda não definido" />}
        {data.accommodation?.id === "undecided" && <SummaryRow label="Hospedagem" value="Ainda não definida" />}
      </div>

      {/* Map */}
      <div className="w-full space-y-3">
        <div className="flex items-center gap-2">
          <Map size={20} className="text-primary" />
          <span className="font-bold text-foreground">Mapa do roteiro</span>
        </div>
        <TravelMap spots={data.selectedSpots} accommodation={data.accommodation} restaurants={[]} />
        <div className="flex flex-wrap items-center gap-3">
          <span className="flex items-center gap-1 text-xs"><span className="w-3 h-3 rounded-full" style={{ background: "#FF6B35" }} /> Hospedagem</span>
          <span className="flex items-center gap-1 text-xs"><span className="w-3 h-3 rounded-full" style={{ background: "#00B4D8" }} /> Atividades</span>
          <span className="flex items-center gap-1 text-xs"><span className="w-3 h-3 rounded-full" style={{ background: "#E91E63" }} /> Restaurantes</span>
        </div>
      </div>

      {/* Google Maps Link */}
      <button
        onClick={openGoogleMaps}
        className="flex items-center gap-2 px-6 py-3 rounded-full border border-primary text-primary font-bold hover:bg-primary/10 transition-colors"
      >
        <ExternalLink size={16} /> Abrir roteiro no Google Maps
      </button>

      {/* ===== RICH ITINERARY SECTION ===== */}
      <div className="w-full space-y-6">
        <div className="flex items-center gap-2">
          <CalendarDays size={20} className="text-primary" />
          <span className="font-bold text-lg text-foreground">Roteiro dia a dia</span>
        </div>

        {richItinerary ? (
          <div className="space-y-8">
            {/* Introduction */}
            <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20">
              <h3 className="text-2xl md:text-3xl font-extrabold text-foreground mb-2">{richItinerary.city}</h3>
              <p className="text-muted-foreground leading-relaxed">{richItinerary.introduction}</p>
            </div>

            {/* Festive Alert */}
            {richItinerary.festiveAlert && (
              <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex gap-3">
                <AlertTriangle size={24} className="text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-foreground">🎉 {richItinerary.festiveAlert.name}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{richItinerary.festiveAlert.description}</p>
                  <span className="inline-block mt-2 text-xs font-bold px-3 py-1 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300">
                    Preços ~{richItinerary.festiveAlert.priceIncrease} acima do normal
                  </span>
                </div>
              </div>
            )}

            {/* Day-by-day summary cards */}
            <div className="space-y-3">
              {richItinerary.days?.map((day: RichDay) => (
                <div key={day.day} className="p-5 rounded-2xl border border-border bg-card" style={{ boxShadow: "var(--card-shadow)" }}>
                  <h4 className="font-extrabold text-foreground text-lg mb-1">Dia {day.day}</h4>
                  <p className="text-primary font-semibold text-sm mb-1">{day.title}</p>
                  <p className="text-muted-foreground text-sm">{day.summary}</p>

                  {/* Activities timeline */}
                  <div className="mt-4 space-y-3 border-l-2 border-primary/20 pl-4 ml-2">
                    {day.activities?.map((act: RichActivity, j: number) => {
                      const actKey = `${act.title}-${day.day}`;
                      return (
                        <div key={j} className="relative">
                          <div className="absolute -left-[22px] top-1 w-3 h-3 rounded-full bg-primary border-2 border-background" />
                          <div className="flex flex-col gap-0.5">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-xs font-bold px-2 py-0.5 rounded bg-primary/10 text-primary">{act.time}</span>
                              <span className="text-xs text-muted-foreground">{act.period}</span>
                              {act.duration && <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock size={10} />{act.duration}</span>}
                            </div>
                            <h5 className="font-bold text-foreground text-sm">{act.title}</h5>
                            <p className="text-xs text-muted-foreground leading-relaxed">{act.description}</p>
                            <div className="flex flex-wrap gap-3 mt-1">
                              {act.location && (
                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                  <MapPin size={10} className="text-primary" /> {act.location}
                                </span>
                              )}
                              {act.transport && (
                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                  <Navigation size={10} className="text-primary" /> {act.transport}
                                </span>
                              )}
                              {act.estimatedCost > 0 && (
                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                  <DollarSign size={10} className="text-primary" /> R$ {act.estimatedCost}
                                </span>
                              )}
                            </div>
                            {act.tips && (
                              <p className="text-xs text-primary/80 mt-1 flex items-start gap-1">
                                <Lightbulb size={10} className="mt-0.5 shrink-0" /> {act.tips}
                              </p>
                            )}
                            {/* Activity rating */}
                            {user && (
                              <div className="mt-2 p-2 rounded-lg bg-muted/20 space-y-1">
                                <StarRating
                                  value={activityRatings[act.title] || 0}
                                  onChange={(v) => setActivityRatings((p) => ({ ...p, [act.title]: v }))}
                                  size={14}
                                />
                                <div className="flex gap-2">
                                  <input
                                    type="text"
                                    placeholder="Comentário..."
                                    value={activityComments[act.title] || ""}
                                    onChange={(e) => setActivityComments((p) => ({ ...p, [act.title]: e.target.value }))}
                                    className="flex-1 bg-background border border-border rounded px-2 py-1 text-xs text-foreground placeholder:text-muted-foreground"
                                  />
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    disabled={!activityRatings[act.title] || savingReview === act.title}
                                    onClick={() => saveActivityReview(act.title)}
                                    className="text-xs h-7 px-2"
                                  >
                                    {savingReview === act.title ? "..." : "Avaliar"}
                                  </Button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* ===== ATTRACTION ZONES ("Polos de Atrações") ===== */}
            {richItinerary.attractionZones && richItinerary.attractionZones.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl md:text-2xl font-extrabold text-foreground flex items-center gap-2">
                  <MapPin size={22} className="text-primary" />
                  O que fazer em {richItinerary.city}: os polos de atrações
                </h3>

                {richItinerary.attractionZones.map((zone: AttractionZone, zi: number) => {
                  const isOpen = expandedZones[zi] ?? true;
                  return (
                    <div key={zi} className="rounded-2xl border border-border bg-card overflow-hidden" style={{ boxShadow: "var(--card-shadow)" }}>
                      <button
                        onClick={() => toggleZone(zi)}
                        className="w-full flex items-center justify-between p-5 text-left hover:bg-accent/50 transition-colors"
                      >
                        <h4 className="font-extrabold text-foreground text-lg">{zone.name}</h4>
                        {isOpen ? <ChevronUp size={20} className="text-muted-foreground" /> : <ChevronDown size={20} className="text-muted-foreground" />}
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-5 space-y-5">
                          <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">{zone.description}</p>

                          {/* Recommended itinerary */}
                          {zone.recommendedItinerary && (
                            <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 space-y-2">
                              <h5 className="font-bold text-primary text-sm flex items-center gap-2">
                                <Navigation size={14} /> {zone.recommendedItinerary.title}
                              </h5>
                              <p className="text-xs text-muted-foreground">{zone.recommendedItinerary.arrivalTime}</p>
                              <ol className="list-decimal list-inside space-y-1">
                                {zone.recommendedItinerary.steps.map((step: string, si: number) => (
                                  <li key={si} className="text-sm text-foreground">{step}</li>
                                ))}
                              </ol>
                            </div>
                          )}

                          {/* Highlights */}
                          {zone.highlights?.map((hl: AttractionHighlight, hi: number) => {
                            const hlKey = `${zi}-${hi}`;
                            const hlOpen = expandedHighlights[hlKey] ?? false;
                            return (
                              <div key={hi} className="rounded-xl border border-border overflow-hidden">
                                <button
                                  onClick={() => toggleHighlight(hlKey)}
                                  className="w-full flex items-center justify-between p-4 text-left hover:bg-accent/30 transition-colors"
                                >
                                  <div className="flex items-center gap-2">
                                    <MapPin size={14} className="text-primary shrink-0" />
                                    <span className="font-bold text-foreground text-sm">{hl.name}</span>
                                  </div>
                                  {hlOpen ? <ChevronUp size={16} className="text-muted-foreground" /> : <ChevronDown size={16} className="text-muted-foreground" />}
                                </button>
                                {hlOpen && (
                                  <div className="px-4 pb-4 space-y-3">
                                    <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{hl.description}</p>
                                    {hl.practicalInfo && (
                                      <div className="p-3 rounded-lg bg-muted/50 space-y-1">
                                        <h6 className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1">
                                          <Info size={10} /> Informações práticas
                                        </h6>
                                        {hl.practicalInfo.address && <p className="text-xs text-foreground flex items-center gap-1"><MapPin size={10} className="text-primary" /> {hl.practicalInfo.address}</p>}
                                        {hl.practicalInfo.hours && <p className="text-xs text-foreground flex items-center gap-1"><Clock size={10} className="text-primary" /> {hl.practicalInfo.hours}</p>}
                                        {hl.practicalInfo.price && <p className="text-xs text-foreground flex items-center gap-1"><DollarSign size={10} className="text-primary" /> {hl.practicalInfo.price}</p>}
                                        {hl.practicalInfo.phone && <p className="text-xs text-foreground flex items-center gap-1"><Phone size={10} className="text-primary" /> {hl.practicalInfo.phone}</p>}
                                        {hl.practicalInfo.instagram && <p className="text-xs text-foreground flex items-center gap-1"><Instagram size={10} className="text-primary" /> {hl.practicalInfo.instagram}</p>}
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Practical Tips */}
            {richItinerary.practicalTips && richItinerary.practicalTips.length > 0 && (
              <div className="p-5 rounded-2xl border border-border bg-card space-y-3" style={{ boxShadow: "var(--card-shadow)" }}>
                <h4 className="font-extrabold text-foreground flex items-center gap-2">
                  <Lightbulb size={18} className="text-primary" /> Dicas práticas
                </h4>
                <div className="space-y-2">
                  {richItinerary.practicalTips.map((tip, i) => (
                    <div key={i} className="flex gap-2 items-start">
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-primary/10 text-primary shrink-0 mt-0.5">{tip.category}</span>
                      <p className="text-sm text-muted-foreground">{tip.tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Cost Breakdown – real values */}
            {computedCostBreakdown && (
              <div className="p-5 rounded-2xl border border-border bg-card space-y-3" style={{ boxShadow: "var(--card-shadow)" }}>
                <h4 className="font-extrabold text-foreground flex items-center gap-2">
                  <DollarSign size={18} className="text-primary" /> Estimativa de custos
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <CostRow label="Hospedagem" value={computedCostBreakdown.accommodation} />
                  <CostRow label="Alimentação" value={computedCostBreakdown.food} />
                  <CostRow label="Transporte" value={computedCostBreakdown.transport} />
                  <CostRow label="Atividades" value={computedCostBreakdown.activities} />
                  <CostRow label="Extras" value={computedCostBreakdown.extras} />
                </div>
                <div className="pt-3 border-t border-border flex justify-between">
                  <span className="font-bold text-foreground">Total estimado</span>
                  <span className="font-extrabold text-primary text-lg">R$ {computedTotal.toLocaleString("pt-BR")}</span>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="p-5 rounded-2xl border border-dashed border-primary/40 bg-primary/5">
            <p className="text-sm text-primary font-semibold">🤖 Gere o roteiro personalizado pela IA</p>
            <Button
              onClick={generateItinerary}
              disabled={loadingItinerary}
              className="mt-3 gradient-pe border-0 rounded-full font-bold gap-2"
            >
              <CalendarDays size={16} /> {loadingItinerary ? "Gerando roteiro..." : "Gerar roteiro com IA"}
            </Button>
          </div>
        )}
      </div>

      </div>{/* close itineraryRef wrapper */}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md" role="group" aria-label="Ações do roteiro">
        {richItinerary && (
          <Button onClick={exportToPdf} disabled={exportingPdf} variant="outline" className="flex-1 rounded-full font-bold gap-2">
            <FileDown size={16} /> {exportingPdf ? "Exportando..." : "Exportar PDF"}
          </Button>
        )}
        {!saved && !shared && (
          <Button onClick={handleSave} disabled={saving} className="flex-1 gradient-pe border-0 rounded-full font-bold gap-2">
            <Save size={16} /> {saving ? "Salvando..." : "Salvar no histórico"}
          </Button>
        )}
        {!shared && (
          <Button onClick={handleShare} disabled={sharing} variant="outline" className="flex-1 rounded-full font-bold gap-2">
            <Share2 size={16} /> {sharing ? "Compartilhando..." : "Compartilhar roteiro"}
          </Button>
        )}
        {(saved || shared) && (
          <p className="text-sm text-center text-muted-foreground w-full" role="status">
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

const CostRow = ({ label, value }: { label: string; value: number }) => (
  <div className="flex justify-between items-baseline p-2 rounded-lg bg-muted/30">
    <span className="text-xs text-muted-foreground">{label}</span>
    <span className="text-sm font-bold text-foreground">R$ {value?.toLocaleString("pt-BR")}</span>
  </div>
);

export default StepSummary;
