import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plane, Calendar, Users, MapPin, Trash2 } from 'lucide-react';

interface TravelRecord {
  id: string;
  budget: number;
  people: number;
  group_type: string;
  country: string;
  state: string;
  entertainment: string[];
  food: string[];
  accommodation: string | null;
  created_at: string;
}

const TravelHistory = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [records, setRecords] = useState<TravelRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { navigate('/auth'); return; }
    fetchHistory();
  }, [user]);

  const fetchHistory = async () => {
    const { data } = await supabase
      .from('travel_history')
      .select('*')
      .order('created_at', { ascending: false });
    setRecords((data as TravelRecord[]) || []);
    setLoading(false);
  };

  const deleteRecord = async (id: string) => {
    await supabase.from('travel_history').delete().eq('id', id);
    setRecords((prev) => prev.filter((r) => r.id !== id));
  };

  const groupTypeLabel = (t: string) => t === 'couple' ? 'Casal' : t === 'friends' ? 'Amigos' : 'Solo';

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-3xl font-extrabold tracking-display text-foreground">Histórico de viagens</h1>
        </div>

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
          <div className="space-y-4">
            {records.map((r, i) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-5 rounded-2xl border border-border bg-card"
                style={{ boxShadow: 'var(--card-shadow)' }}
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="flex items-center gap-1 text-sm font-semibold text-primary">
                        <MapPin size={14} /> {r.state}, {r.country}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar size={12} /> {new Date(r.created_at).toLocaleDateString('pt-BR')}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Users size={12} /> {r.people}p · {groupTypeLabel(r.group_type)}
                      </span>
                    </div>
                    <p className="text-sm text-foreground font-bold tabular-nums">
                      R$ {Number(r.budget).toLocaleString('pt-BR')}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {[...r.entertainment, ...r.food].map((tag) => (
                        <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-semibold">{tag}</span>
                      ))}
                      {r.accommodation && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-secondary/20 text-secondary font-semibold">{r.accommodation}</span>
                      )}
                    </div>
                  </div>
                  <button onClick={() => deleteRecord(r.id)} className="text-muted-foreground hover:text-destructive transition-colors p-1">
                    <Trash2 size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TravelHistory;
