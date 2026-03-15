import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Plane, MapPin, Sun, Compass, TrendingUp, Calendar, Star, ArrowRight, LogOut, History } from 'lucide-react';

const featuredDestinations = [
  { name: 'Santorini', country: 'Grécia', countryId: 'GR', image: '🏛️', tag: 'Popular', color: 'from-blue-400 to-cyan-300' },
  { name: 'Bali', country: 'Indonésia', countryId: 'ID', image: '🌴', tag: 'Tendência', color: 'from-green-400 to-emerald-300' },
  { name: 'Machu Picchu', country: 'Peru', countryId: 'PE', image: '🏔️', tag: 'Aventura', color: 'from-amber-400 to-yellow-300' },
  { name: 'Rio de Janeiro', country: 'Brasil', countryId: 'BR', image: '🏖️', tag: 'Clássico', color: 'from-cyan-400 to-blue-300' },
  { name: 'Tóquio', country: 'Japão', countryId: 'JP', image: '🗼', tag: 'Cultura', color: 'from-pink-400 to-rose-300' },
  { name: 'Capadócia', country: 'Turquia', countryId: 'TR', image: '🎈', tag: 'Único', color: 'from-orange-400 to-red-300' },
];

const travelTips = [
  { icon: Calendar, title: 'Melhor época', desc: 'Março a Maio é ideal para Europa e Ásia. Preços mais baixos e menos turistas.' },
  { icon: TrendingUp, title: 'Tendências 2026', desc: 'Turismo sustentável e experiências locais estão em alta.' },
  { icon: Star, title: 'Dica de ouro', desc: 'Reserve com 3 meses de antecedência para as melhores ofertas.' },
];

const touristSpots = [
  { name: 'Cristo Redentor', location: 'Rio de Janeiro, Brasil', emoji: '🇧🇷', demand: 'Alta', countryId: 'BR' },
  { name: 'Torre Eiffel', location: 'Paris, França', emoji: '🇫🇷', demand: 'Alta', countryId: 'FR' },
  { name: 'Grande Muralha', location: 'Pequim, China', emoji: '🇨🇳', demand: 'Moderada', countryId: 'CN' },
  { name: 'Coliseu', location: 'Roma, Itália', emoji: '🇮🇹', demand: 'Alta', countryId: 'IT' },
  { name: 'Taj Mahal', location: 'Agra, Índia', emoji: '🇮🇳', demand: 'Moderada', countryId: 'IN' },
  { name: 'Chichén Itzá', location: 'Yucatán, México', emoji: '🇲🇽', demand: 'Baixa', countryId: 'MX' },
];

const Landing = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const goToPlanner = (countryId?: string) => {
    if (!user) {
      navigate('/auth');
      return;
    }
    navigate(countryId ? `/planejar?country=${countryId}` : '/planejar');
  };

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
          <div className="absolute top-10 left-10 text-8xl">🌍</div>
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
          <span className="font-script text-3xl md:text-4xl text-primary">Explore o mundo</span>
          <h1 className="text-5xl md:text-7xl font-black tracking-display mt-2 text-foreground leading-tight">
            Sua próxima aventura{' '}
            <span className="gradient-text">começa aqui</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mt-6 max-w-2xl mx-auto">
            Descubra destinos incríveis, planeje dentro do seu orçamento e crie memórias inesquecíveis.
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

      {/* Featured Destinations - INTERACTIVE */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <MapPin size={24} className="text-primary" />
            <h2 className="text-3xl font-extrabold tracking-display text-foreground">Destinos em destaque</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {featuredDestinations.map((dest, i) => (
              <motion.button
                key={dest.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => goToPlanner(dest.countryId)}
                className="group relative rounded-2xl overflow-hidden border border-border bg-card cursor-pointer hover:shadow-xl transition-all text-left"
                style={{ boxShadow: 'var(--card-shadow)' }}
              >
                <div className={`h-32 md:h-40 bg-gradient-to-br ${dest.color} flex items-center justify-center text-5xl md:text-6xl`}>
                  {dest.image}
                </div>
                <div className="p-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-primary">{dest.tag}</span>
                  <h3 className="text-lg font-bold text-card-foreground mt-1">{dest.name}</h3>
                  <p className="text-sm text-muted-foreground">{dest.country}</p>
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

      {/* Tourist Spots - INTERACTIVE */}
      <section className="py-16 px-4 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Star size={24} className="text-accent" />
            <h2 className="text-3xl font-extrabold tracking-display text-foreground">Pontos turísticos populares</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {touristSpots.map((spot, i) => (
              <motion.button
                key={spot.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => goToPlanner(spot.countryId)}
                className="flex items-center gap-4 p-4 rounded-2xl border border-border bg-card text-left hover:border-primary/40 transition-all"
                style={{ boxShadow: 'var(--card-shadow)' }}
              >
                <span className="text-3xl">{spot.emoji}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-card-foreground">{spot.name}</h3>
                  <p className="text-sm text-muted-foreground truncate">{spot.location}</p>
                </div>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                  spot.demand === 'Alta' ? 'bg-destructive/10 text-destructive' :
                  spot.demand === 'Moderada' ? 'bg-primary/10 text-primary' :
                  'bg-secondary/20 text-secondary'
                }`}>
                  {spot.demand}
                </span>
              </motion.button>
            ))}
          </div>
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
              Pronto para explorar?
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

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-muted-foreground border-t border-border">
        Viatura · Sua viagem começa no seu bolso 🌎
      </footer>
    </div>
  );
};

export default Landing;
