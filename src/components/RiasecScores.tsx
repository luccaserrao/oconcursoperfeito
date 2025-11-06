import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface RiasecScoresProps {
  scores?: {
    Realista: number;
    Investigativo: number;
    Artístico: number;
    Social: number;
    Empreendedor: number;
    Convencional: number;
  };
}

const riasecDescriptions = {
  Realista: "Práticas, objetivas, trabalho manual/técnico",
  Investigativo: "Analíticas, curiosas, resolução de problemas",
  Artístico: "Criativas, expressivas, arte e design",
  Social: "Empáticas, comunicativas, ajudar pessoas",
  Empreendedor: "Persuasivas, líderes, negociação",
  Convencional: "Organizadas, detalhistas, procedimentos"
};

export const RiasecScores = ({ scores }: RiasecScoresProps) => {
  if (!scores) return null;

  // Ordenar scores do maior para o menor
  const sortedScores = Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .map(([type, score]) => ({ type, score }));

  return (
    <Card className="p-6 bg-card border border-border">
      <h4 className="font-semibold mb-4">📊 Seu Perfil RIASEC Completo</h4>
      <p className="text-sm text-muted-foreground mb-6">
        Baseado nas suas respostas, aqui está a distribuição do seu perfil vocacional:
      </p>
      
      <div className="space-y-4">
        {sortedScores.map(({ type, score }, index) => (
          <div key={type}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className={`font-semibold ${index < 2 ? 'text-primary' : 'text-muted-foreground'}`}>
                  {type}
                </span>
                {index < 2 && (
                  <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
                    Dominante
                  </span>
                )}
              </div>
              <span className="text-sm font-medium">{score}%</span>
            </div>
            <Progress value={score} className="h-2 mb-1" />
            <p className="text-xs text-muted-foreground">
              {riasecDescriptions[type as keyof typeof riasecDescriptions]}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-primary/5 rounded-lg">
        <p className="text-sm">
          <strong>💡 O que isso significa?</strong> Seus dois tipos dominantes ({sortedScores[0].type} + {sortedScores[1].type}) 
          indicam que você se encaixa perfeitamente em carreiras que combinam essas características.
        </p>
      </div>
    </Card>
  );
};
