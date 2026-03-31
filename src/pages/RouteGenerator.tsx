import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ThemeToggle from "@/components/ThemeToggle";
import {
  Navigation, ArrowLeft, Compass, AlertTriangle, Lock,
  Sun, Moon, Coffee, MapPin, Star, Sparkles, Crown, CreditCard,
} from "lucide-react";
import { pernambucoCities } from "@/data/mockData";

const months = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

interface ItinerarySlot {
  period: string;
  icon: typeof Sun;
  activity: string;
  location: string;
  estimatedCost: number;
}

interface ItineraryDay {
  day: number;
  title: string;
  slots: ItinerarySlot[];
}

const generateMockItinerary = (cityName: string, month: number, budget: number): ItineraryDay[] | null => {
  if (!cityName || !month || !budget) return null;

  const days = budget < 2000 ? 2 : budget < 5000 ? 3 : 5;
  const dailyBudget = Math.floor(budget / days);

  const activities: Record<string, string[]> = {
    manha: [
      `Café da manhã regional no centro de ${cityName}`,
      `Visita ao museu histórico de ${cityName}`,
      `Trilha ecológica nos arredores`,
      `Passeio de barco pelo rio`,
      `Tour guiado pelo centro histórico`,
    ],
    tarde: [
      `Almoço com culinária pernambucana típica`,
      `Visita às praias urbanas`,
      `Compras no mercado de artesanato`,
      `Passeio pelas igrejas barrocas`,
      `Mergulho nas piscinas naturais`,
    ],
    noite: [
      `Jantar em restaurante local com frutos do mar`,
      `Show de forró ao vivo`,
      `Caminhada pelo calçadão noturno`,
      `Passeio cultural com música ao vivo`,
      `Degustação de drinks regionais`,
    ],
  };

  const result: ItineraryDay[] = [];
  for (let d = 1; d <= days; d++) {
    result.push({
      day: d,
      title: d === 1 ? "Chegada e Exploração" : d === days ? "Último dia e Despedida" : `Dia ${d} — Aventura`,
      slots: [
        {
          period: "Manhã",
          icon: Coffee,
          activity: activities.manha[(d - 1) % activities.manha.length],
          location: cityName,
          estimatedCost: Math.floor(dailyBudget * 0.25),
        },
        {
          period: "Tarde",
          icon: Sun,
          activity: activities.tarde[(d - 1) % activities.tarde.length],
          location: cityName,
          estimatedCost: Math.floor(dailyBudget * 0.4),
        },
        {
          period: "Noite",
          icon: Moon,
          activity: activities.noite[(d - 1) % activities.noite.length],
          location: cityName,
          estimatedCost: Math.floor(dailyBudget * 0.35),
        },
      ],
    });
  }
  return result;
};

const RouteGenerator = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [selectedCity, setSelectedCity] = useState("");
  const [selectedMonth, setSelectedMonth] = useState<number>(0);
  const [budget, setBudget] = useState("");
  const [itinerary, setItinerary] = useState<ItineraryDay[] | null>(null);
  const [showPaywall, setShowPaywall] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  const isFestive = selectedMonth === 2 || selectedMonth === 6;
  const festiveName = selectedMonth === 2 ? "Carnaval" : "São João";

  const handleGenerate = () => {
    const cityObj = pernambucoCities.find((c) => c.id === selectedCity);
    if (!cityObj || !selectedMonth || !budget) return;
    const result = generateMockItinerary(cityObj.name, selectedMonth, Number(budget));
    setItinerary(result);
    setShowPaywall(true);
    setUnlocked(false);
  };

  const handleUnlock = (type: "single" | "vip") => {
    setUnlocked(true);
    setShowPaywall(false);
  };

  const isFormValid = selectedCity && selectedMonth > 0 && Number(budget) > 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-pe-navy border-b border-pe-blue/20">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => navigate("/")} className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 rounded-xl bg-pe-gold flex items-center justify-center">
              <Navigation size={20} className="text-pe-navy" />
            </div>
            <span className="text-xl font-black tracking-tight text-white">
              TRIP<span className="text-pe-gold">SMART</span>
            </span>
          </button>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="gap-1.5 text-xs font-bold text-white/80 hover:text-white hover:bg-white/10">
              <ArrowLeft size={14} /> Início
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-12 space-y-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-pe-blue flex items-center justify-center mx-auto">
            <Sparkles size={28} className="text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-foreground">
            Gerador de <span className="text-primary">Roteiros</span>
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Preencha o formulário e gere um roteiro personalizado para sua viagem em Pernambuco.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="p-6 rounded-2xl border border-border bg-card space-y-6" style={{ boxShadow: "var(--card-shadow)" }}>
          {/* City */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Destino em PE</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {pernambucoCities.map((city) => (
                <button
                  key={city.id}
                  onClick={() => setSelectedCity(city.id)}
                  className={`p-3 rounded-xl text-sm font-bold text-left transition-all border ${
                    selectedCity === city.id
                      ? "bg-pe-blue text-white border-pe-blue"
                      : "bg-background border-border text-foreground hover:border-pe-blue/40"
                  }`}
                >
                  <MapPin size={14} className="inline mr-1.5" />
                  {city.name}
                </button>
              ))}
            </div>
          </div>

          {/* Month */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Mês da viagem</Label>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {months.map((m, i) => (
                <button
                  key={m}
                  onClick={() => setSelectedMonth(i + 1)}
                  className={`p-2.5 rounded-xl text-xs font-bold transition-all border ${
                    selectedMonth === i + 1
                      ? "bg-pe-gold text-pe-navy border-pe-gold"
                      : "bg-background border-border text-foreground hover:border-pe-gold/40"
                  } ${(i + 1 === 2 || i + 1 === 6) ? "ring-1 ring-pe-red/30" : ""}`}
                >
                  {m}
                  {(i + 1 === 2 || i + 1 === 6) && <span className="block text-[10px] text-pe-red mt-0.5">🎉 Festivo</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Budget */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Orçamento (R$)</Label>
            <Input
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="Ex: 3000"
              className="h-12 rounded-xl text-lg font-bold"
              min={100}
            />
          </div>

          {/* Festive Alert */}
          <AnimatePresence>
            {isFestive && selectedMonth > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="p-4 rounded-xl bg-pe-red/10 border border-pe-red/30 flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-pe-red flex items-center justify-center flex-shrink-0">
                    <AlertTriangle size={20} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-sm">🎊 Alerta de Ciclo Festivo — {festiveName}</h4>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      {selectedMonth === 2
                        ? "Fevereiro é mês de Carnaval em Pernambuco! Espere preços 30-60% mais elevados em hospedagem, transporte e alimentação. Reserve com antecedência para garantir disponibilidade."
                        : "Junho é mês de São João em Pernambuco! Os festejos juninos elevam os preços em 20-50%, especialmente em Caruaru e Recife. Planeje com antecedência e aproveite o melhor forró do Brasil!"}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Generate button */}
          <Button
            onClick={handleGenerate}
            disabled={!isFormValid}
            className="w-full h-14 bg-pe-blue hover:bg-pe-blue/90 text-white border-0 rounded-full text-lg font-bold gap-2"
          >
            <Compass size={22} /> Gerar Roteiro
          </Button>
        </motion.div>

        {/* Itinerary Result */}
        <AnimatePresence>
          {itinerary && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <h2 className="text-2xl font-black text-foreground text-center">
                Seu Roteiro em {pernambucoCities.find((c) => c.id === selectedCity)?.name}
              </h2>

              <div className={`relative space-y-4 ${showPaywall && !unlocked ? "" : ""}`}>
                {/* Itinerary days */}
                <div className={`space-y-4 transition-all ${showPaywall && !unlocked ? "blur-md pointer-events-none select-none" : ""}`}>
                  {itinerary?.map((day) => (
                    <motion.div
                      key={day.day}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: day.day * 0.1 }}
                      className="p-5 rounded-2xl border border-border bg-card"
                      style={{ boxShadow: "var(--card-shadow)" }}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-pe-gold flex items-center justify-center text-pe-navy font-black text-sm">
                          D{day.day}
                        </div>
                        <h3 className="text-lg font-bold text-foreground">{day.title}</h3>
                      </div>
                      <div className="space-y-3">
                        {day.slots?.map((slot, si) => (
                          <div key={si} className="flex items-start gap-3 p-3 rounded-xl bg-background border border-border/50">
                            <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                              slot.period === "Manhã" ? "bg-pe-gold/20 text-pe-gold" : slot.period === "Tarde" ? "bg-pe-blue/20 text-pe-blue" : "bg-pe-navy/20 text-pe-navy dark:text-pe-cream"
                            }`}>
                              <slot.icon size={16} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-muted-foreground uppercase">{slot.period}</span>
                                <span className="text-xs font-bold text-primary">~R$ {slot.estimatedCost}</span>
                              </div>
                              <p className="text-sm font-semibold text-foreground mt-0.5">{slot.activity}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Paywall overlay */}
                {showPaywall && !unlocked && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="p-8 rounded-2xl bg-card border-2 border-pe-gold shadow-2xl max-w-md mx-auto text-center space-y-5">
                      <div className="w-16 h-16 rounded-full bg-pe-gold/20 flex items-center justify-center mx-auto">
                        <Lock size={28} className="text-pe-gold" />
                      </div>
                      <h3 className="text-xl font-black text-foreground">Roteiro Gerado com Sucesso!</h3>
                      <p className="text-sm text-muted-foreground">
                        Desbloqueie o roteiro completo com horários, custos estimados e dicas exclusivas.
                      </p>
                      <div className="space-y-3">
                        <Button
                          onClick={() => handleUnlock("single")}
                          className="w-full h-12 bg-pe-blue hover:bg-pe-blue/90 text-white border-0 rounded-full font-bold gap-2"
                        >
                          <CreditCard size={18} /> Liberar este roteiro — R$ 12
                        </Button>
                        <Button
                          onClick={() => handleUnlock("vip")}
                          className="w-full h-12 bg-pe-gold hover:bg-pe-gold/90 text-pe-navy border-0 rounded-full font-bold gap-2"
                        >
                          <Crown size={18} /> Assinar VIP — R$ 20/mês
                        </Button>
                        <p className="text-[10px] text-muted-foreground">Acesso ilimitado a roteiros personalizados com IA</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Total estimado (visible when unlocked) */}
              {unlocked && itinerary && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-5 rounded-2xl bg-pe-gold/10 border border-pe-gold/30 text-center">
                  <p className="text-sm font-bold text-muted-foreground">Custo total estimado</p>
                  <p className="text-3xl font-black text-foreground mt-1">
                    R$ {itinerary.reduce((acc, day) => acc + day.slots.reduce((a, s) => a + s.estimatedCost, 0), 0).toLocaleString("pt-BR")}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">para {itinerary.length} dias em {pernambucoCities.find((c) => c.id === selectedCity)?.name}</p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RouteGenerator;
