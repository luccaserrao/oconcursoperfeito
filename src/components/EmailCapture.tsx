import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, ChevronRight, Loader2, Mail, ShieldCheck, Sparkles, User } from "lucide-react";
import { trackConversion } from "@/lib/analytics";

interface EmailCaptureProps {
  onSubmit: (name: string, email: string) => Promise<void>;
}

type Step = "email" | "details";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const getSuggestedNameFromEmail = (value: string) => {
  const localPart = value.trim().split("@")[0] || "";
  const cleaned = localPart.replace(/[\.\_\-\+]+/g, " ").trim();
  const firstWord = cleaned.split(" ")[0] || "";
  if (firstWord.length < 2) return "Concurseiro";
  return firstWord.charAt(0).toUpperCase() + firstWord.slice(1);
};

export const EmailCapture = ({ onSubmit }: EmailCaptureProps) => {
  const [step, setStep] = useState<Step>("email");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; terms?: string }>({});

  const validateEmailStep = () => {
    const newErrors: { email?: string } = {};
    if (!email.trim()) {
      newErrors.email = "Informe seu email para liberar o resultado";
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = "Use um email valido";
    }
    setErrors((prev) => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const handleEmailStepSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmailStep()) return;
    if (!name.trim()) {
      setName(getSuggestedNameFromEmail(email));
    }
    setErrors({});
    setStep("details");
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { email?: string; terms?: string } = {};
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      newErrors.email = "Confirme um email valido para receber o relatorio";
    }
    if (!acceptedTerms) {
      newErrors.terms = "Aceite os termos (pode cancelar a qualquer momento)";
    }

    const finalName = name.trim().length >= 2 ? name.trim() : getSuggestedNameFromEmail(trimmedEmail);

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    try {
      trackConversion("AW-400922729/LFG4CLCi_7IbEOmwlr8B");
      console.log("Google Ads: lead conversion tracked");

      if (typeof window !== "undefined" && (window as any).fbq) {
        (window as any).fbq("track", "Lead", {
          content_name: "Quiz Email Capture",
        });
        console.log("Facebook Pixel: lead tracked");
      }

      await onSubmit(finalName, trimmedEmail);
    } catch (error) {
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
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-primary">
                {step === "email" ? "Etapa 1 de 2" : "Etapa 2 de 2"}
              </p>
              <h2 className="text-2xl md:text-3xl font-bold leading-snug">
                Ultimo passo para liberar seu relatorio
              </h2>
              <p className="text-muted-foreground mt-2">
                Mostramos o resultado agora e enviamos no email para voce ter acesso depois.
              </p>
            </div>
            <div className="hidden md:flex items-center gap-2 rounded-full bg-primary/10 text-primary px-3 py-1 text-sm font-semibold">
              <ShieldCheck className="w-4 h-4" />
              Protegido pela LGPD
            </div>
          </div>

          {step === "email" ? (
            <form onSubmit={handleEmailStepSubmit} className="space-y-6">
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

              <div className="flex items-start gap-3 rounded-lg border bg-muted/50 p-3">
                <ShieldCheck className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="font-semibold text-sm">Dados seguros</p>
                  <p className="text-xs text-muted-foreground">
                    Aceite pre-marcado. Voce pode cancelar quando quiser e seguimos a LGPD.
                  </p>
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

              <Button type="submit" className="w-full bg-gradient-to-r from-primary to-accent" size="lg" disabled={loading}>
                Continuar para liberar resultado
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                Receba seu relatorio parcial gratis agora. Sem spam.
              </p>
            </form>
          ) : (
            <form onSubmit={handleFinalSubmit} className="space-y-6">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email-confirm">Confirme seu email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email-confirm"
                      type="email"
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
                    <span className="text-xs text-muted-foreground">Sugerido: {getSuggestedNameFromEmail(email)}</span>
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
                  {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                  <p className="text-xs text-muted-foreground">
                    Opcional, usamos apenas para personalizar seu plano de estudos.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs text-muted-foreground bg-muted/40 border rounded-lg p-3">
                <ShieldCheck className="w-4 h-4 text-primary mt-0.5" />
                <p>Enviamos um relatorio parcial gratis e voce pode cancelar o recebimento a qualquer momento.</p>
              </div>

              <div className="flex flex-col md:flex-row gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="md:w-40"
                  onClick={() => {
                    setErrors({});
                    setStep("email");
                  }}
                  disabled={loading}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar
                </Button>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-accent"
                  size="lg"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                      Gerando sua recomendacao...
                    </>
                  ) : (
                    "Liberar meu resultado agora"
                  )}
                </Button>
              </div>

              {errors.terms && (
                <p className="text-sm text-destructive text-center">
                  Use Voltar para marcar o aceite de LGPD e concluir (pode cancelar depois).
                </p>
              )}

              <p className="text-xs text-center text-muted-foreground">
                Receba seu relatorio parcial gratis agora. Sem spam e com saida garantida.
              </p>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
};
