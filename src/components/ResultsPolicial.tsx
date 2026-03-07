import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PoliceResult } from "@/types/quiz";
import { MercadoPagoButton } from "@/components/MercadoPagoButton";
import { trackEvent, trackCupomWhatsappClick } from "@/lib/analytics";
import { trackJourneyStep } from "@/lib/quizTracking";
import { AlertTriangle, Lock, Shield, Share2, Target, Zap } from "lucide-react";

interface ResultsPolicialProps {
  userName: string;
  userEmail: string;
  quizResponseId?: string;
  policeResult: PoliceResult;
}

const corpLabels: Record<string, string> = {
  PF: "Polícia Federal",
  PRF: "Polícia Rodoviária Federal",
  PM: "Polícia Militar",
  PC: "Polícia Civil",
  PENAL: "Polícia Penal",
};

export const ResultsPolicial = ({ userName, userEmail, quizResponseId, policeResult }: ResultsPolicialProps) => {
  const firstName = userName?.split(" ")[0] || "Você";
  const alerts = policeResult.tapAlerts.length ? policeResult.tapAlerts : ["Atenção aos gatilhos de estresse no TAP."];

  useEffect(() => {
    trackEvent("results_policial_viewed", {
      principal: policeResult.principal,
      secundario: policeResult.secundario,
    });
    trackJourneyStep({
      step: "results_viewed",
      quiz_version: "policial",
      quiz_response_id: quizResponseId || null,
    });
  }, [policeResult.principal, policeResult.secundario, quizResponseId]);

  const shareText = encodeURIComponent(
    `Meu perfil policial aponta para ${corpLabels[policeResult.principal]} (alerta TAP: ${alerts[0] || "melhorar controle emocional"}). Veja o teste em futuroperfeito.com.br/policial`
  );
  const shareUrl = `https://wa.me/?text=${shareText}`;

  const handleShare = () => {
    trackEvent("results_policial_share_click", { principal: policeResult.principal });
    window.open(shareUrl, "_blank");
  };

  const handleWhatsAppCoupon = () => {
    trackCupomWhatsappClick();
    window.open("https://wa.me/5591984233672?text=Quero%20meu%20relat%C3%B3rio%20policial%20com%20cupom", "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-slate-50 pb-16">
      <div className="container mx-auto max-w-5xl px-4 pt-16 space-y-8">
        <Card className="bg-slate-900/70 border border-primary/30 shadow-2xl p-8 space-y-6">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-primary font-semibold">
            <Target className="w-4 h-4" /> Prévia gratuita (20% liberado)
          </div>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight">
            {firstName}, sua rota mais aderente é {corpLabels[policeResult.principal]}.
          </h1>
          <p className="text-base text-slate-200/80 max-w-3xl">
            Baseado em TAP/TAF, risco aceito e preferência de rotina. Você está vendo apenas uma prévia – o relatório completo explica o PORQUÊ e entrega plano de 30 dias.
          </p>

          <div className="grid gap-4 md:grid-cols-3">
            <Card className="bg-slate-900/50 border border-primary/30 p-4 space-y-2">
              <p className="text-xs uppercase tracking-wide text-primary font-semibold">Direção principal</p>
              <p className="text-lg font-bold">{corpLabels[policeResult.principal]}</p>
              <p className="text-sm text-slate-400">Compatível com seu nível de disciplina e tolerância a risco.</p>
            </Card>
            <Card className="bg-slate-900/40 border border-emerald-300/30 p-4 space-y-2">
              <p className="text-xs uppercase tracking-wide text-emerald-300 font-semibold">Plano B</p>
              <p className="text-lg font-bold text-emerald-200">{corpLabels[policeResult.secundario]}</p>
              <p className="text-sm text-slate-400">Opção secundária sem perder aderência.</p>
            </Card>
            <Card className="bg-slate-900/40 border border-amber-300/30 p-4 space-y-2">
              <p className="text-xs uppercase tracking-wide text-amber-300 font-semibold">Evitar</p>
              <p className="text-lg font-bold text-amber-100">{corpLabels[policeResult.evitar]}</p>
              <p className="text-sm text-slate-400">Menor encaixe considerando TAP, rotina ou perfil.</p>
            </Card>
          </div>
        </Card>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="bg-slate-900/60 border border-red-300/30 p-5 space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-red-200">
              <AlertTriangle className="w-4 h-4" /> Alertas TAP
            </div>
            <ul className="space-y-2 text-sm text-slate-100">
              {alerts.map((item, idx) => (
                <li key={idx} className="flex gap-2">
                  <Badge variant="outline" className="border-red-300/40 text-red-100">{idx + 1}</Badge>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="bg-slate-900/60 border border-primary/25 p-5 space-y-4 md:col-span-2">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-primary font-semibold">
              <Shield className="w-4 h-4" /> O que destrava no relatório pago (R$25)
            </div>
            <ul className="space-y-2 text-sm text-slate-100 list-disc list-inside">
              <li>Ajustes psicológicos específicos para o TAP da {corpLabels[policeResult.principal]}.</li>
              <li>Plano de treino TAF 30 dias + metas semanais.</li>
              <li>Simulação de rotina real (plantões, turnos, deslocamento) por corporação.</li>
              <li>Checklist de investigação social e documentos críticos.</li>
            </ul>
            <div className="max-w-md">
              <MercadoPagoButton
                userName={userName}
                userEmail={userEmail}
                quizResponseId={quizResponseId}
                amount={25}
                location="results_policial"
                quizVersion="policial"
              />
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-2">
              <Lock className="w-4 h-4" /> Oferta garantida por 5 minutos após esta página.
            </p>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="bg-slate-900/60 border border-primary/25 p-5 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-primary font-semibold">
              <Share2 className="w-4 h-4" /> Compartilhar resultado
            </div>
            <p className="text-sm text-slate-200">Mostre sua direção para amigos (gera prova social e confiança).</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline" onClick={handleShare} className="flex-1 border-primary text-primary">
                Enviar no WhatsApp
              </Button>
              <Button variant="secondary" onClick={handleWhatsAppCoupon} className="flex-1 bg-emerald-600 text-white">
                Falar e ganhar cupom R$5
              </Button>
            </div>
          </Card>

          <Card className="bg-slate-900/60 border border-accent/25 p-5 space-y-3">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-accent font-semibold">
              <Zap className="w-4 h-4" /> Próximos 10 minutos
            </div>
            <ol className="list-decimal list-inside space-y-2 text-sm text-slate-100">
              <li>Confirme o pagamento via PIX seguro (R$25).</li>
              <li>Receba o relatório completo no e-mail informado.</li>
              <li>Siga o checklist TAP + TAF e reduza risco de reprovação.</li>
            </ol>
          </Card>
        </div>
      </div>
    </div>
  );
};
