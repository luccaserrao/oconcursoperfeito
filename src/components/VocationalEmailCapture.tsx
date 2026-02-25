import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, ShieldCheck, User } from "lucide-react";

interface VocationalEmailCaptureProps {
  onSubmit: (name: string, email: string) => Promise<void>;
  onBack?: () => void;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const getSuggestedNameFromEmail = (value: string) => {
  const localPart = value.trim().split("@")[0] || "";
  const cleaned = localPart.replace(/[\._\-\+]+/g, " ").trim();
  const firstWord = cleaned.split(" ")[0] || "";
  if (firstWord.length < 2) return "Pessoa";
  return firstWord.charAt(0).toUpperCase() + firstWord.slice(1);
};

export const VocationalEmailCapture = ({ onSubmit, onBack }: VocationalEmailCaptureProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; terms?: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedEmail = email.trim().toLowerCase();
    const finalName = name.trim().length >= 2 ? name.trim() : getSuggestedNameFromEmail(trimmedEmail);

    const newErrors: { name?: string; email?: string; terms?: string } = {};
    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      newErrors.email = "Informe um email valido para receber o relatorio.";
    }
    if (!acceptedTerms) {
      newErrors.terms = "Aceite os termos para continuar.";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    try {
      await onSubmit(finalName, trimmedEmail);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center py-10 px-4">
      <div className="container mx-auto max-w-2xl">
        <Card className="p-8 shadow-[var(--shadow-elevated)] animate-fade-in">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div className="text-left">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-primary to-accent mb-3">
                <Mail className="w-7 h-7 text-white" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-primary">
                Envie o relatorio completo
              </p>
              <h2 className="text-2xl md:text-3xl font-bold leading-snug">
                Receba o relatorio completo da sua carreira ideal
              </h2>
              <p className="text-muted-foreground mt-2">
                O resultado gratis ja esta pronto. Informe seu email para liberar o relatorio completo e guardar tudo em PDF.
              </p>
            </div>
            <div className="hidden md:flex items-center gap-2 rounded-full bg-primary/10 text-primary px-3 py-1 text-sm font-semibold">
              <ShieldCheck className="w-4 h-4" />
              LGPD ok
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Seu email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`pl-10 ${errors.email ? "border-destructive" : ""}`}
                  />
                </div>
                {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="name">Nome (opcional)</Label>
                  <span className="text-xs text-muted-foreground">
                    Sugerido: {getSuggestedNameFromEmail(email || "seu@email.com")}
                  </span>
                </div>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Como gostaria de ser chamado"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`pl-10 ${errors.name ? "border-destructive" : ""}`}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Checkbox
                id="terms"
                checked={acceptedTerms}
                onCheckedChange={(checked) => setAcceptedTerms(!!checked)}
                className="mt-1"
              />
              <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer leading-tight">
                Concordo com os{" "}
                <a href="/terms" target="_blank" className="text-primary underline hover:text-primary/80">
                  Termos de Uso
                </a>{" "}
                e a{" "}
                <a href="/privacy" target="_blank" className="text-primary underline hover:text-primary/80">
                  Politica de Privacidade
                </a>. Pode cancelar a qualquer momento.
              </label>
            </div>
            {errors.terms && <p className="text-sm text-destructive">{errors.terms}</p>}

            <div className="flex flex-col md:flex-row gap-3">
              {onBack && (
                <Button type="button" variant="outline" className="md:w-40" onClick={onBack} disabled={loading}>
                  Voltar
                </Button>
              )}
              <Button type="submit" className="w-full bg-gradient-to-r from-primary to-accent" size="lg" disabled={loading}>
                {loading ? "Enviando..." : "Liberar relatorio completo"}
              </Button>
            </div>

            <p className="text-xs text-center text-muted-foreground">
              Usamos seu email apenas para enviar o relatorio e conteudos relacionados. Nada de spam.
            </p>
          </form>
        </Card>
      </div>
    </div>
  );
};
