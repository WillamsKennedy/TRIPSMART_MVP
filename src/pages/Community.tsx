import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Heart, MessageCircle, Bookmark, Star, MapPin, Users, Calendar, Send, Navigation } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { monthNames } from '@/data/mockData';

const Community = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [itineraries, setItineraries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState<Record<string, boolean>>({});
  const [saves, setSaves] = useState<Record<string, boolean>>({});
  const [comments, setComments] = useState<Record<string, any[]>>({});
  const [commentText, setCommentText] = useState<Record<string, string>>({});
  const [expandedComments, setExpandedComments] = useState<Record<string, boolean>>({});
  const [ratings, setRatings] = useState<Record<string, number>>({});

  useEffect(() => {
    if (!user) { navigate('/auth'); return; }
    fetchAll();
  }, [user]);

  const fetchAll = async () => {
    setLoading(true);

    // Fetch itineraries
    const { data: itin } = await supabase.from('shared_itineraries').select('*').order('created_at', { ascending: false });
    const itinList = (itin || []) as any[];

    // Fetch profiles for all user_ids
    const userIds = [...new Set(itinList.map(i => i.user_id))];
    const profilesMap: Record<string, any> = {};
    if (userIds.length > 0) {
      const { data: profiles } = await supabase.from('profiles').select('id, display_name, avatar_url').in('id', userIds);
      (profiles || []).forEach((p: any) => { profilesMap[p.id] = p; });
    }

    // Merge profiles into itineraries
    const enriched = itinList.map(it => ({
      ...it,
      profile: profilesMap[it.user_id] || null,
    }));
    setItineraries(enriched);

    if (user) {
      const { data: userLikes } = await supabase.from('itinerary_likes').select('itinerary_id').eq('user_id', user.id);
      const likesMap: Record<string, boolean> = {};
      (userLikes || []).forEach((l: any) => { likesMap[l.itinerary_id] = true; });
      setLikes(likesMap);

      const { data: userSaves } = await supabase.from('saved_itineraries').select('itinerary_id').eq('user_id', user.id);
      const savesMap: Record<string, boolean> = {};
      (userSaves || []).forEach((s: any) => { savesMap[s.itinerary_id] = true; });
      setSaves(savesMap);

      const { data: userRatings } = await supabase.from('itinerary_ratings').select('itinerary_id, score').eq('user_id', user.id);
      const ratingsMap: Record<string, number> = {};
      (userRatings || []).forEach((r: any) => { ratingsMap[r.itinerary_id] = r.score; });
      setRatings(ratingsMap);
    }
    setLoading(false);
  };

  const toggleLike = async (id: string) => {
    if (!user) return;
    if (likes[id]) {
      await supabase.from('itinerary_likes').delete().eq('user_id', user.id).eq('itinerary_id', id);
      setLikes(prev => ({ ...prev, [id]: false }));
      setItineraries(prev => prev.map(it => it.id === id ? { ...it, likes_count: Math.max(0, (it.likes_count || 0) - 1) } : it));
    } else {
      await supabase.from('itinerary_likes').insert({ user_id: user.id, itinerary_id: id });
      setLikes(prev => ({ ...prev, [id]: true }));
      setItineraries(prev => prev.map(it => it.id === id ? { ...it, likes_count: (it.likes_count || 0) + 1 } : it));
    }
  };

  const toggleSave = async (id: string) => {
    if (!user) return;
    if (saves[id]) {
      await supabase.from('saved_itineraries').delete().eq('user_id', user.id).eq('itinerary_id', id);
      setSaves(prev => ({ ...prev, [id]: false }));
      toast({ title: 'Roteiro removido dos salvos' });
    } else {
      await supabase.from('saved_itineraries').insert({ user_id: user.id, itinerary_id: id });
      setSaves(prev => ({ ...prev, [id]: true }));
      toast({ title: 'Roteiro salvo! 📌' });
    }
  };

  const rateItinerary = async (id: string, score: number) => {
    if (!user) return;
    const existing = ratings[id];
    if (existing) {
      await supabase.from('itinerary_ratings').update({ score }).eq('user_id', user.id).eq('itinerary_id', id);
    } else {
      await supabase.from('itinerary_ratings').insert({ user_id: user.id, itinerary_id: id, score });
    }
    setRatings(prev => ({ ...prev, [id]: score }));
    toast({ title: `Avaliação: ${'⭐'.repeat(score)}` });
  };

  const loadComments = async (id: string) => {
    const { data } = await supabase.from('itinerary_comments').select('*').eq('itinerary_id', id).order('created_at', { ascending: true });
    const commentsList = (data || []) as any[];
    // Fetch profiles for commenters
    const userIds = [...new Set(commentsList.map(c => c.user_id))];
    const profilesMap: Record<string, any> = {};
    if (userIds.length > 0) {
      const { data: profiles } = await supabase.from('profiles').select('id, display_name').in('id', userIds);
      (profiles || []).forEach((p: any) => { profilesMap[p.id] = p; });
    }
    const enriched = commentsList.map(c => ({ ...c, profile: profilesMap[c.user_id] || null }));
    setComments(prev => ({ ...prev, [id]: enriched }));
  };

  const toggleComments = async (id: string) => {
    if (!expandedComments[id]) {
      await loadComments(id);
    }
    setExpandedComments(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const postComment = async (id: string) => {
    if (!user || !commentText[id]?.trim()) return;
    await supabase.from('itinerary_comments').insert({ user_id: user.id, itinerary_id: id, content: commentText[id].trim() });
    setCommentText(prev => ({ ...prev, [id]: '' }));
    await loadComments(id);
    toast({ title: 'Comentário enviado!' });
  };

  const useItinerary = (it: any) => {
    navigate(`/planejar?city=${it.city}`);
  };

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
          <Button variant="ghost" size="sm" onClick={() => navigate('/')} className="gap-1.5 text-xs font-bold">
            <ArrowLeft size={14} /> Início
          </Button>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-black tracking-display text-foreground mb-8">Comunidade</h1>

        {loading ? (
          <p className="text-muted-foreground text-center py-12">Carregando roteiros...</p>
        ) : itineraries.length === 0 ? (
          <div className="text-center py-20">
            <Users size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-lg text-muted-foreground">Nenhum roteiro compartilhado ainda.</p>
            <Button onClick={() => navigate('/planejar')} className="mt-6 gradient-pe border-0 rounded-full px-6 font-bold text-primary-foreground">Criar o primeiro roteiro</Button>
          </div>
        ) : (
          <div className="space-y-6">
            {itineraries.map((it, i) => (
              <motion.div
                key={it.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl border border-border bg-card overflow-hidden"
                style={{ boxShadow: 'var(--card-shadow)' }}
              >
                <div className="p-5">
                  {/* Author */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full gradient-pe flex items-center justify-center text-xs font-bold text-primary-foreground">
                      {(it.profile?.display_name || 'U')[0].toUpperCase()}
                    </div>
                    <div>
                      <span className="text-sm font-bold text-foreground">{it.profile?.display_name || 'Viajante'}</span>
                      <span className="text-xs text-muted-foreground block">{new Date(it.created_at).toLocaleDateString('pt-BR')}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-extrabold text-foreground">{it.title}</h3>
                  {it.description && <p className="text-sm text-muted-foreground mt-1">{it.description}</p>}

                  <div className="flex flex-wrap gap-3 mt-3">
                    <span className="flex items-center gap-1 text-xs text-primary font-semibold"><MapPin size={12} /> {it.city_name}, PE</span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground"><Calendar size={12} /> {it.days} dias</span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground"><Users size={12} /> {it.people}p</span>
                    {it.month && <span className="text-xs text-muted-foreground">{monthNames[it.month - 1]}</span>}
                    <span className="text-xs font-semibold text-accent">{it.budget_label}</span>
                  </div>

                  {/* Spots tags */}
                  {it.selected_spots?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {(it.selected_spots as any[]).slice(0, 5).map((s: any) => (
                        <span key={s.id} className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-semibold">
                          {s.imageEmoji} {s.name}
                        </span>
                      ))}
                      {it.selected_spots.length > 5 && (
                        <span className="text-xs text-muted-foreground">+{it.selected_spots.length - 5}</span>
                      )}
                    </div>
                  )}

                  {/* Rating */}
                  <div className="flex items-center gap-1 mt-3">
                    {[1, 2, 3, 4, 5].map(score => (
                      <button key={score} onClick={() => rateItinerary(it.id, score)}>
                        <Star size={18} className={`transition-colors ${(ratings[it.id] || 0) >= score ? 'text-primary fill-primary' : 'text-muted-foreground'}`} />
                      </button>
                    ))}
                    {it.rating_avg > 0 && <span className="text-xs text-muted-foreground ml-2">{Number(it.rating_avg).toFixed(1)}</span>}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between px-5 py-3 border-t border-border">
                  <div className="flex items-center gap-4">
                    <button onClick={() => toggleLike(it.id)} className="flex items-center gap-1 text-sm">
                      <Heart size={18} className={likes[it.id] ? 'text-accent fill-accent' : 'text-muted-foreground'} />
                      <span className="font-semibold text-foreground">{it.likes_count || 0}</span>
                    </button>
                    <button onClick={() => toggleComments(it.id)} className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MessageCircle size={18} />
                      <span className="font-semibold">{comments[it.id]?.length || 0}</span>
                    </button>
                    <button onClick={() => toggleSave(it.id)}>
                      <Bookmark size={18} className={saves[it.id] ? 'text-primary fill-primary' : 'text-muted-foreground'} />
                    </button>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => useItinerary(it)} className="rounded-full text-xs font-bold gap-1">
                    Usar roteiro →
                  </Button>
                </div>

                {/* Comments */}
                {expandedComments[it.id] && (
                  <div className="px-5 pb-4 border-t border-border pt-3 space-y-2">
                    {(comments[it.id] || []).map((c: any) => (
                      <div key={c.id} className="flex gap-2">
                        <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground flex-shrink-0">
                          {(c.profile?.display_name || 'U')[0].toUpperCase()}
                        </div>
                        <div>
                          <span className="text-xs font-bold text-foreground">{c.profile?.display_name || 'Viajante'}</span>
                          <p className="text-sm text-muted-foreground">{c.content}</p>
                        </div>
                      </div>
                    ))}
                    <div className="flex gap-2 mt-2">
                      <input
                        type="text"
                        value={commentText[it.id] || ''}
                        onChange={e => setCommentText(prev => ({ ...prev, [it.id]: e.target.value }))}
                        onKeyDown={e => e.key === 'Enter' && postComment(it.id)}
                        placeholder="Escrever comentário..."
                        className="flex-1 bg-background border border-border rounded-full px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary"
                      />
                      <Button size="icon" onClick={() => postComment(it.id)} className="rounded-full gradient-pe border-0 h-9 w-9">
                        <Send size={14} className="text-primary-foreground" />
                      </Button>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Community;
