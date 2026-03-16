import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Plane, MapPin, Sun, Compass, Star, ArrowRight, LogOut, History, Search, Filter } from 'lucide-react';
import { brazilianStates, touristSpotsByState } from '@/data/mockData';

const featuredDestinations = [
  { name: 'Rio de Janeiro', stateId: 'RJ', image: '🏖️', tag: 'Clássico', color: 'from-cyan-400 to-blue-300', desc: 'Praias, samba e Cristo Redentor' },
  { name: 'Bahia', stateId: 'BA', image: '🥁', tag: 'Cultura', color: 'from-amber-400 to-yellow-300', desc: 'Pelourinho, praias e axé' },
  { name: 'Ceará', stateId: 'CE', image: '🏜️', tag: 'Aventura', color: 'from-orange-400 to-red-300', desc: 'Jeri, dunas e kitesurf' },
  { name: 'Santa Catarina', stateId: 'SC', image: '🎡', tag: 'Tendência', color: 'from-green-400 to-emerald-300', desc: 'Floripa e Balneário Camboriú' },
  { name: 'Pernambuco', stateId: 'PE', image: '🐢', tag: 'Paraíso', color: 'from-teal-400 to-cyan-300', desc: 'Fernando de Noronha e Recife' },
  { name: 'Minas Gerais', stateId: 'MG', image: '⛰️', tag: 'História', color: 'from-pink-400 to-rose-300', desc: 'Ouro Preto, Inhotim e queijos' },
];

const travelTips = [
  { icon: Sun, title: 'Nordeste o ano todo', desc: 'Temperaturas acima de 25°C o ano inteiro. Melhor para praia de setembro a março.' },
  { icon: Star, title: 'Sul no inverno', desc: 'Gramado e Serra Gaúcha são mágicos entre junho e agosto.' },
  { icon: Compass, title: 'Reserve com antecedência', desc: 'Fernando de Noronha e Lençóis Maranhenses lotam rápido na alta temporada.' },
];

const Landing = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [stateFilter, setStateFilter] = useState('');
  const [searchSpot, setSearchSpot] = useState('');

  const goToPlanner = (stateId?: string) => {
    if (!user) {
      navigate('/auth');
      return;
    }
    navigate(stateId ? `/planejar?state=${stateId}` : '/planejar');
  };

  const allSpots = useMemo(() => {
    const spots: { spot: typeof touristSpotsByState['RJ'][0]; stateId: string; stateName: string }[] = [];
    const statesToSearch = stateFilter
      ? brazilianStates.filter(s => s.id === stateFilter)
      : brazilianStates;

    statesToSearch.forEach(state => {
      const stateSpots = touristSpotsByState[state.id] || [];
      stateSpots.forEach(spot => {
        if (!searchSpot || spot.name.toLowerCase().includes(searchSpot.toLowerCase())) {
          spots.push({ spot, stateId: state.id, stateName: state.name });
        }
      });
    });
    return spots;
  }, [stateFilter, searchSpot]);

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl gradient-tropical flex items-center justify-center">
              <Plane size={18} className="text-primary-foreground" />
            </div>
            <span className="text-xl font-extrabold gradient-text">Viatura</span>
          </div>
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <Button variant="ghost" size="sm" onClick={() => navigate('/historico')} className="gap-2">
                  <History size={16} /> Histórico
                </Button>
                <Button variant="ghost" size="sm" onClick={signOut} className="gap-2">
                  <LogOut size={16} /> Sair
                </Button>
                <Button onClick={() => goToPlanner()} className="gradient-tropical border-0 rounded-full px-6 font-bold gap-2">
                  <Compass size={16} /> Planejar viagem
                </Button>
              </>
            ) : (
              <Button onClick={() => navigate('/auth')} className="gradient-tropical border-0 rounded-full px-6 font-bold gap-2">
                Entrar <ArrowRight size={16} />
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden py-20 md:py-32 px-4">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-8xl">🇧🇷</div>
          <div className="absolute top-20 right-20 text-6xl">✈️</div>
          <div className="absolute bottom-20 left-1/3 text-7xl">🌴</div>
          <div className="absolute bottom-10 right-10 text-5xl">🏖️</div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-4xl mx-auto text-center"
        >
          <span className="font-script text-3xl md:text-4xl text-primary">Explore o Brasil</span>
          <h1 className="text-5xl md:text-7xl font-black tracking-display mt-2 text-foreground leading-tight">
            Descubra cada canto{' '}
            <span className="gradient-text">do Brasil</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mt-6 max-w-2xl mx-auto">
            Planeje roteiros personalizados para qualquer estado brasileiro, com pontos turísticos, hospedagem e rotas inteligentes.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Button
              onClick={() => goToPlanner()}
              className="gradient-tropical border-0 rounded-full px-8 h-14 text-lg font-bold gap-2 shadow-lg"
            >
              <Compass size={20} /> Começar a planejar
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Featured Destinations */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <MapPin size={24} className="text-primary" />
            <h2 className="text-3xl font-extrabold tracking-display text-foreground">Destinos em destaque</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {featuredDestinations.map((dest, i) => (
              <motion.button
                key={dest.stateId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => goToPlanner(dest.stateId)}
                className="group relative rounded-2xl overflow-hidden border border-border bg-card cursor-pointer hover:shadow-xl transition-all text-left"
                style={{ boxShadow: 'var(--card-shadow)' }}
              >
                <div className={`h-32 md:h-40 bg-gradient-to-br ${dest.color} flex items-center justify-center text-5xl md:text-6xl`}>
                  {dest.image}
                </div>
                <div className="p-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-primary">{dest.tag}</span>
                  <h3 className="text-lg font-bold text-card-foreground mt-1">{dest.name}</h3>
                  <p className="text-sm text-muted-foreground">{dest.desc}</p>
                </div>
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs font-bold px-3 py-1 rounded-full gradient-tropical text-primary-foreground">
                    Planejar →
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Tourist Spots with Filters */}
      <section className="py-16 px-4 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Star size={24} className="text-accent" />
            <h2 className="text-3xl font-extrabold tracking-display text-foreground">Pontos turísticos populares</h2>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="flex items-center gap-2 px-4 py-2.5 bg-background rounded-xl border border-border flex-1 max-w-sm">
              <Search size={16} className="text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar ponto turístico..."
                value={searchSpot}
                onChange={(e) => setSearchSpot(e.target.value)}
                className="bg-transparent outline-none text-sm text-foreground w-full placeholder:text-muted-foreground"
              />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Filter size={16} className="text-muted-foreground" />
              <button
                onClick={() => setStateFilter('')}
                className={`text-xs font-bold px-3 py-1.5 rounded-full transition-all ${
                  !stateFilter ? 'gradient-tropical text-primary-foreground' : 'bg-background border border-border text-muted-foreground hover:border-primary/40'
                }`}
              >
                Todos
              </button>
              {brazilianStates.filter(s => (touristSpotsByState[s.id] || []).length > 0).map(s => (
                <button
                  key={s.id}
                  onClick={() => setStateFilter(s.id === stateFilter ? '' : s.id)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-full transition-all ${
                    stateFilter === s.id ? 'gradient-tropical text-primary-foreground' : 'bg-background border border-border text-muted-foreground hover:border-primary/40'
                  }`}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>

          {/* Spots grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allSpots.slice(0, 12).map(({ spot, stateId, stateName }, i) => (
              <motion.button
                key={`${stateId}-${spot.id}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, duration: 0.4 }}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => goToPlanner(stateId)}
                className="rounded-2xl border border-border bg-card text-left overflow-hidden hover:border-primary/40 transition-all"
                style={{ boxShadow: 'var(--card-shadow)' }}
              >
                {spot.imageUrl ? (
                  <img src={spot.imageUrl} alt={spot.name} className="w-full h-36 object-cover" />
                ) : (
                  <div className="w-full h-36 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-5xl">
                    {spot.imageEmoji}
                  </div>
                )}
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-card-foreground">{spot.name}</h3>
                    <span className="flex items-center gap-1 text-xs">
                      <Star size={12} className="text-primary fill-primary" />
                      <span className="font-bold text-foreground">{spot.rating}</span>
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{stateName}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs font-semibold text-accent">
                      {spot.avgCostPerPerson === 0 ? 'Gratuito' : spot.avgCostPerPerson ? `~R$ ${spot.avgCostPerPerson}/pessoa` : ''}
                    </span>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
          {allSpots.length > 12 && (
            <p className="text-center text-sm text-muted-foreground mt-4">
              Mostrando 12 de {allSpots.length} pontos · Use os filtros acima
            </p>
          )}
        </div>
      </section>

      {/* Travel Tips */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Sun size={24} className="text-primary" />
            <h2 className="text-3xl font-extrabold tracking-display text-foreground">Dicas para sua viagem</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {travelTips.map((tip, i) => (
              <motion.div
                key={tip.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="p-6 rounded-2xl border border-border bg-card"
                style={{ boxShadow: 'var(--card-shadow)' }}
              >
                <tip.icon size={28} className="text-primary mb-3" />
                <h3 className="text-lg font-bold text-card-foreground">{tip.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{tip.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      {!user && (
        <section className="py-20 px-4">
          <div className="max-w-3xl mx-auto text-center gradient-tropical rounded-3xl p-12 md:p-16">
            <h2 className="text-3xl md:text-4xl font-black text-primary-foreground tracking-display">
              Pronto para explorar o Brasil?
            </h2>
            <p className="text-primary-foreground/80 mt-4 text-lg">
              Crie sua conta e comece a planejar a viagem dos seus sonhos.
            </p>
            <Button
              onClick={() => navigate('/auth')}
              className="mt-8 bg-background text-foreground hover:bg-background/90 rounded-full px-8 h-14 text-lg font-bold gap-2"
            >
              Começar agora <ArrowRight size={20} />
            </Button>
          </div>
        </section>
      )}

      <footer className="text-center py-6 text-sm text-muted-foreground border-t border-border">
        Viatura · Sua viagem pelo Brasil começa aqui 🇧🇷
      </footer>
    </div>
  );
};

export default Landing;
