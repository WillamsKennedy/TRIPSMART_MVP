import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import ThemeToggle from "@/components/ThemeToggle";
import {
  MapPin, Sun, Compass, Star, ArrowRight, LogOut, History,
  Search, Filter, Users, Navigation, ChevronUp, Palmtree, Utensils, Waves, Mountain,
  User,
} from "lucide-react";
import { pernambucoCities, spotsByCity, categoryLabels } from "@/data/mockData";

const featuredDestinations = [
  { name: "Recife", cityId: "recife", image: "🏙️", tag: "Capital", color: "from-primary to-primary/70", desc: "Marco Zero, Brennand e praias urbanas" },
  { name: "Fernando de Noronha", cityId: "noronha", image: "🐢", tag: "Paraíso", color: "from-accent to-accent/70", desc: "As praias mais bonitas do Brasil" },
  { name: "Porto de Galinhas", cityId: "porto-galinhas", image: "🏖️", tag: "Praias", color: "from-secondary to-secondary/70", desc: "Piscinas naturais e jangadas" },
  { name: "Olinda", cityId: "olinda", image: "🎭", tag: "Cultura", color: "from-primary to-accent/70", desc: "Ladeiras históricas e carnaval" },
  { name: "Caruaru", cityId: "caruaru", image: "🎶", tag: "Forró", color: "from-accent to-secondary/70", desc: "Feira, São João e Alto do Moura" },
  { name: "Gravatá", cityId: "gravata", image: "🌄", tag: "Aventura", color: "from-secondary to-primary/70", desc: "Trilhas e rapel na serra" },
];

const travelTips = [
  { icon: Sun, title: "Melhor época", desc: "De setembro a março para praias. Junho para o São João de Caruaru." },
  { icon: Star, title: "Noronha", desc: "Reserve com antecedência. Limite de visitantes e taxa de preservação." },
  { icon: Compass, title: "Gastronomia", desc: "Experimente tapioca, bolo de rolo e caldinho nas praias." },
];

const highlights = [
  { icon: Palmtree, title: "12 cidades", desc: "De Noronha ao sertão" },
  { icon: Waves, title: "50+ atividades", desc: "Praias, trilhas e cultura" },
  { icon: Utensils, title: "Gastronomia", desc: "Sabores pernambucanos" },
  { icon: Mountain, title: "Aventura", desc: "Rapel, surf e mergulho" },
];

const Landing = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [cityFilter, setCityFilter] = useState("");
  const [searchSpot, setSearchSpot] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 600);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const goToPlanner = (cityId?: string) => {
    if (!user) { navigate("/auth"); return; }
    navigate(cityId ? `/planejar?city=${cityId}` : "/planejar");
  };

  const allSpots = useMemo(() => {
    const spots: { spot: (typeof spotsByCity)["recife"][0]; cityId: string; cityName: string }[] = [];
    const citiesToSearch = cityFilter ? pernambucoCities.filter((c) => c.id === cityFilter) : pernambucoCities;
    citiesToSearch.forEach((city) => {
      (spotsByCity[city.id] || []).forEach((spot) => {
        if (!searchSpot || spot.name.toLowerCase().includes(searchSpot.toLowerCase())) {
          spots.push({ spot, cityId: city.id, cityName: city.name });
        }
      });
    });
    return spots;
  }, [cityFilter, searchSpot]);

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); navigate('/'); }} className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 rounded-xl gradient-pe flex items-center justify-center">
              <Navigation size={20} className="text-primary-foreground" />
            </div>
            <span className="text-xl font-black tracking-tight">
              <span className="text-primary">TRIP</span>
              <span className="text-accent">SMART</span>
            </span>
          </button>
          <div className="flex items-center gap-2">
            {user ? (
              <>
                <Button variant="ghost" size="sm" onClick={() => navigate("/historico")} className="gap-1.5 text-xs font-bold">
                  <History size={14} /> Histórico
                </Button>
                <Button variant="ghost" size="sm" onClick={() => navigate("/comunidade")} className="gap-1.5 text-xs font-bold">
                  <Users size={14} /> Comunidade
                </Button>
                <Button variant="ghost" size="sm" onClick={() => navigate("/perfil")} className="gap-1.5 text-xs font-bold">
                  <User size={14} /> Perfil
                </Button>
                <Button variant="ghost" size="sm" onClick={signOut} className="gap-1.5 text-xs font-bold">
                  <LogOut size={14} /> Sair
                </Button>
                <Button onClick={() => goToPlanner()} className="gradient-pe border-0 rounded-full px-5 h-9 text-sm font-bold gap-1.5 text-primary-foreground">
                  <Compass size={14} /> Planejar
                </Button>
              </>
            ) : (
              <Button onClick={() => navigate("/auth")} className="gradient-pe border-0 rounded-full px-6 font-bold gap-2 text-primary-foreground">
                Entrar <ArrowRight size={16} />
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden py-24 md:py-36 px-6 bg-hero-pattern">
        <div className="absolute inset-0 opacity-[0.07]">
          <div className="absolute top-8 left-[10%] text-9xl">🏖️</div>
          <div className="absolute top-16 right-[15%] text-7xl">🐢</div>
          <div className="absolute bottom-16 left-[30%] text-8xl">🎭</div>
          <div className="absolute bottom-8 right-[10%] text-6xl">🌊</div>
        </div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} className="relative max-w-5xl mx-auto text-center">
          <span className="font-script text-3xl md:text-4xl text-accent">Explore Pernambuco</span>
          <h1 className="text-5xl md:text-7xl font-black tracking-display mt-3 text-foreground leading-[1.1]">
            Planeje sua viagem <span className="gradient-text">inteligente</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mt-6 max-w-2xl mx-auto leading-relaxed">
            Roteiros personalizados com IA para cidades pernambucanas. Pontos turísticos, trilhas, praias, hospedagem e rotas — tudo em um só lugar.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <Button onClick={() => goToPlanner()} className="gradient-pe border-0 rounded-full px-10 h-14 text-lg font-bold gap-2 shadow-lg text-primary-foreground hover:opacity-90 transition-opacity">
              <Compass size={22} /> Começar a planejar
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Quick stats */}
      <section className="py-12 px-6 border-b border-border">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {highlights.map((h, i) => (
            <motion.div key={h.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="flex items-center gap-4 p-5 rounded-2xl border border-border bg-card" style={{ boxShadow: 'var(--card-shadow)' }}>
              <div className="w-12 h-12 rounded-xl gradient-pe flex items-center justify-center flex-shrink-0">
                <h.icon size={22} className="text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">{h.title}</h3>
                <p className="text-xs text-muted-foreground">{h.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <MapPin size={26} className="text-primary" />
            <h2 className="text-3xl md:text-4xl font-black tracking-display text-foreground">Destinos em destaque</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredDestinations.map((dest, i) => (
              <motion.button key={dest.cityId} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08, duration: 0.5 }} whileHover={{ y: -8, scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => goToPlanner(dest.cityId)} className="group relative rounded-2xl overflow-hidden border border-border bg-card cursor-pointer hover:shadow-xl transition-all text-left" style={{ boxShadow: "var(--card-shadow)" }}>
                <div className={`h-36 md:h-44 bg-gradient-to-br ${dest.color} flex items-center justify-center text-6xl md:text-7xl`}>{dest.image}</div>
                <div className="p-5">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent">{dest.tag}</span>
                  <h3 className="text-xl font-bold text-card-foreground mt-1.5">{dest.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{dest.desc}</p>
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs font-bold px-3 py-1.5 rounded-full gradient-pe text-primary-foreground">Planejar →</span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Tourist Spots with Filters */}
      <section className="py-20 px-6 bg-card/50 border-y border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Star size={26} className="text-secondary" />
            <h2 className="text-3xl md:text-4xl font-black tracking-display text-foreground">Atividades em Pernambuco</h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex items-center gap-2 px-4 py-3 bg-background rounded-2xl border border-border flex-1 max-w-md">
              <Search size={18} className="text-muted-foreground" />
              <input type="text" placeholder="Buscar atividade..." value={searchSpot} onChange={(e) => setSearchSpot(e.target.value)} className="bg-transparent outline-none text-sm text-foreground w-full placeholder:text-muted-foreground" />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Filter size={16} className="text-muted-foreground" />
              <button onClick={() => setCityFilter("")} className={`text-xs font-bold px-3 py-2 rounded-full transition-all ${!cityFilter ? "gradient-pe text-primary-foreground" : "bg-background border border-border text-muted-foreground hover:border-primary/40"}`}>Todas</button>
              {pernambucoCities.map((c) => (
                <button key={c.id} onClick={() => setCityFilter(c.id === cityFilter ? "" : c.id)} className={`text-xs font-bold px-3 py-2 rounded-full transition-all ${cityFilter === c.id ? "gradient-pe text-primary-foreground" : "bg-background border border-border text-muted-foreground hover:border-primary/40"}`}>{c.name}</button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {allSpots.slice(0, 16).map(({ spot, cityId, cityName }, i) => (
              <motion.button key={`${cityId}-${spot.id}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04, duration: 0.4 }} whileHover={{ y: -4 }} whileTap={{ scale: 0.98 }} onClick={() => navigate(`/atividade/${cityId}/${spot.id}`)} className="rounded-2xl border border-border bg-card text-left overflow-hidden hover:border-primary/40 transition-all" style={{ boxShadow: "var(--card-shadow)" }}>
                {spot.imageUrl ? (
                  <img src={spot.imageUrl} alt={spot.name} className="w-full h-40 object-cover" />
                ) : (
                  <div className="w-full h-40 bg-gradient-to-br from-primary/15 to-accent/15 flex items-center justify-center text-5xl">{spot.imageEmoji}</div>
                )}
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-card-foreground text-sm">{spot.name}</h3>
                    <span className="flex items-center gap-1 text-xs">
                      <Star size={12} className="text-secondary fill-secondary" />
                      <span className="font-bold text-foreground">{spot.rating}</span>
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{cityName}</p>
                  <div className="flex items-center justify-between mt-2.5">
                    <span className="text-xs font-semibold text-accent">{spot.avgCostPerPerson === 0 ? "Gratuito" : spot.avgCostPerPerson ? `~R$ ${spot.avgCostPerPerson}/pessoa` : ""}</span>
                    {spot.category && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">{categoryLabels[spot.category]}</span>}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
          {allSpots.length > 16 && <p className="text-center text-sm text-muted-foreground mt-6">Mostrando 16 de {allSpots.length} atividades · Use os filtros acima</p>}
        </div>
      </section>

      {/* Why TripSmart */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black tracking-display text-foreground">Por que usar o <span className="text-primary">TRIP</span><span className="text-accent">SMART</span>?</h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">Tecnologia e inteligência artificial para transformar seu planejamento de viagem.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { emoji: '🤖', title: 'Roteiros com IA', desc: 'A inteligência artificial cria roteiros personalizados hora a hora, considerando seu orçamento, dias e preferências.' },
              { emoji: '🗺️', title: 'Mapas interativos', desc: 'Visualize hospedagem, atividades e restaurantes no mapa com rotas otimizadas para cada dia.' },
              { emoji: '👥', title: 'Comunidade ativa', desc: 'Compartilhe roteiros, avalie experiências e descubra dicas de outros viajantes.' },
            ].map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="p-8 rounded-2xl border border-border bg-card text-center" style={{ boxShadow: 'var(--card-shadow)' }}>
                <span className="text-5xl block mb-4">{item.emoji}</span>
                <h3 className="text-xl font-bold text-card-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Travel Tips */}
      <section className="py-20 px-6 bg-card/50 border-y border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <Sun size={26} className="text-secondary" />
            <h2 className="text-3xl md:text-4xl font-black tracking-display text-foreground">Dicas para sua viagem</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {travelTips.map((tip, i) => (
              <motion.div key={tip.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1, duration: 0.5 }} className="p-8 rounded-2xl border border-border bg-card" style={{ boxShadow: "var(--card-shadow)" }}>
                <tip.icon size={32} className="text-primary mb-4" />
                <h3 className="text-xl font-bold text-card-foreground">{tip.title}</h3>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{tip.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      {!user && (
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto text-center gradient-pe rounded-3xl p-14 md:p-20">
            <h2 className="text-3xl md:text-5xl font-black text-primary-foreground tracking-display leading-tight">Pronto para explorar Pernambuco?</h2>
            <p className="text-primary-foreground/80 mt-5 text-lg">Crie sua conta e comece a planejar a viagem dos seus sonhos.</p>
            <Button onClick={() => navigate("/auth")} className="mt-10 bg-background text-foreground hover:bg-background/90 rounded-full px-10 h-14 text-lg font-bold gap-2">
              Começar agora <ArrowRight size={20} />
            </Button>
          </div>
        </section>
      )}

      <footer className="text-center py-10 text-sm text-muted-foreground border-t border-border space-y-2">
        <button onClick={() => navigate('/')} className="font-black hover:opacity-80 transition-opacity">
          <span className="text-primary">TRIP</span>
          <span className="text-accent">SMART</span>
        </button>
        <p>Explore Pernambuco com inteligência 🏖️</p>
        <p className="text-xs text-muted-foreground/60">© {new Date().getFullYear()} TripSmart. Todos os direitos reservados.</p>
      </footer>

      {/* Scroll to top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full gradient-pe flex items-center justify-center shadow-lg hover:opacity-90 transition-opacity"
          >
            <ChevronUp size={24} className="text-primary-foreground" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Landing;
