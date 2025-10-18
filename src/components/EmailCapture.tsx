import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Sparkles } from "lucide-react";

interface EmailCaptureProps {
  onSubmit: (name: string, email: string) => Promise<void>;
}

export const EmailCapture = ({ onSubmit }: EmailCaptureProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  const validateForm = () => {
    const newErrors: { name?: string; email?: string } = {};

    if (!name.trim()) {
      newErrors.name = "Por favor, informe seu nome";
    }

    if (!email.trim()) {
      newErrors.email = "Por favor, informe seu e-mail";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Por favor, informe um e-mail válido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      await onSubmit(name.trim(), email.trim().toLowerCase());
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center py-8">
      <div className="container mx-auto px-4 max-w-md">
        <Card className="p-8 shadow-[var(--shadow-elevated)] animate-fade-in">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Sua Carreira Ideal Está Pronta!
            </h2>
            <p className="text-muted-foreground">
              Informe seus dados para receber o resultado personalizado
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nome completo</Label>
              <Input
                id="name"
                type="text"
                placeholder="Seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={errors.name ? "border-destructive" : ""}
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-accent"
              size="lg"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                  Gerando sua recomendação...
                </>
              ) : (
                "Ver Minha Carreira Ideal"
              )}
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              🔒 Seus dados estão seguros. Usaremos apenas para enviar seu resultado.
            </p>
          </form>
        </Card>
      </div>
    </div>
  );
};
