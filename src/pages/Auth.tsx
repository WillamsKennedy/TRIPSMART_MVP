import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { Navigation } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = isLogin ? await signIn(email, password) : await signUp(email, password);
    setLoading(false);

    if (error) {
      toast({ title: 'Erro', description: error.message, variant: 'destructive' });
    } else if (!isLogin) {
      toast({ title: 'Conta criada!', description: 'Verifique seu email para confirmar.' });
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-background bg-hero-pattern flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-14 h-14 rounded-2xl gradient-pe flex items-center justify-center">
              <Navigation size={28} className="text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-foreground">
            <span className="text-primary">TRIP</span><span className="text-accent">SMART</span>
          </h1>
          <p className="text-muted-foreground mt-2">
            {isLogin ? 'Entre para planejar sua viagem' : 'Crie sua conta e comece a explorar'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-8 rounded-2xl border border-border bg-card" style={{ boxShadow: 'var(--card-shadow)' }}>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Email</label>
            <Input type="email" placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="h-12 rounded-xl" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Senha</label>
            <Input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} className="h-12 rounded-xl" />
          </div>
          <Button type="submit" disabled={loading} className="w-full h-12 rounded-xl text-base font-bold gradient-pe border-0 text-primary-foreground">
            {loading ? 'Carregando...' : isLogin ? 'Entrar' : 'Criar conta'}
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            {isLogin ? 'Não tem conta?' : 'Já tem conta?'}{' '}
            <button type="button" onClick={() => setIsLogin(!isLogin)} className="font-bold text-primary hover:underline">
              {isLogin ? 'Cadastre-se' : 'Faça login'}
            </button>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Auth;
