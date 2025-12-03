import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, Sparkles } from "lucide-react";
import { trackConversion } from "@/lib/analytics";

interface EmailCaptureProps {
  onSubmit: (name: string, email: string) => Promise<void>;
}

export const EmailCapture = ({ onSubmit }: EmailCaptureProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; terms?: string }>({});

  const validateForm = () => {
    const newErrors: { name?: string; email?: string; terms?: string } = {};

    const trimmedName = name.trim();
    if (!trimmedName) {
      newErrors.name = "Por favor, informe seu nome";
    } else if (trimmedName.length < 2) {
      newErrors.name = "Nome muito curto (mín. 2 caracteres)";
    }

    if (!email.trim()) {
      newErrors.email = "Por favor, informe seu e-mail";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Por favor, informe um e-mail válido";
    }

    if (!acceptedTerms) {
      newErrors.terms = "Você precisa aceitar os termos para continuar";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      // Track Google Ads Lead Conversion
      trackConversion('AW-400922729/LFG4CLCi_7IbEOmwlr8B');
      console.log("✅ Google Ads: Lead conversion tracked");
      
      // Track Facebook Pixel Lead
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'Lead', {
          content_name: 'Quiz Email Capture'
        });
        console.log("✅ Facebook Pixel: Lead tracked");
      }
      
      await onSubmit(
        name.trim(), 
        email.trim().toLowerCase()
      );
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
              🔒 Último passo para liberar sua recomendação
            </h2>
            <p className="text-muted-foreground">
              Liberamos seu resultado na tela e enviamos no e-mail para você não perder.
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">✅ 100% gratuito</span>
              <span className="flex items-center gap-1">✅ Protegido pela LGPD</span>
              <span className="flex items-center gap-1">✅ Pode cancelar quando quiser</span>
            </div>
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

            {/* LGPD Checkbox */}
            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <Checkbox 
                  id="terms" 
                  checked={acceptedTerms}
                  onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                  className="mt-1"
                />
                <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer leading-tight">
                  Li e concordo com os{" "}
                  <a href="/terms" target="_blank" className="text-primary underline hover:text-primary/80">
                    Termos de Uso
                  </a>
                  {" "}e a{" "}
                  <a href="/privacy" target="_blank" className="text-primary underline hover:text-primary/80">
                    Política de Privacidade
                  </a>.
                </label>
              </div>
              {errors.terms && (
                <p className="text-sm text-destructive">{errors.terms}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-accent"
              size="lg"
              disabled={loading || !acceptedTerms}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                  Gerando sua recomendação...
                </>
              ) : (
                "Gerar meu resultado com IA"
              )}
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              🔐 Seus dados são usados só para gerar e enviar seu resultado.
            </p>
          </form>
        </Card>
      </div>
    </div>
  );
};
