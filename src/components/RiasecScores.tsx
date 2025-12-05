import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RiasecScores as RiasecScoresType } from "@/types/quiz";

interface RiasecScoresProps {
  scores?: RiasecScoresType;
}

const riasecDescriptions: Record<string, string> = {
  Realista: "Execução prática, foco em resultados tangíveis e ambientes concretos.",
  Investigativo: "Análise profunda, curiosidade e busca por causas e dados.",
  Artístico: "Criatividade aplicada, expressão original e pensamento divergente.",
  Social: "Conexão com pessoas, facilitação, ensino e apoio.",
  Empreendedor: "Influência, liderança estratégica e tomada de decisão.",
  Convencional: "Organização, consistência e atenção a processos claros.",
};

export const RiasecScores = ({ scores }: RiasecScoresProps) => {
  if (!scores) return null;

  const sortedScores = Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .map(([type, score]) => ({ type, score }));

  return (
    <Card className="p-6 bg-card border border-border">
      <h4 className="font-semibold mb-4">Seu Perfil RIASEC (30 perguntas iniciais)</h4>
      <p className="text-sm text-muted-foreground mb-6">
        Baseado nas suas respostas, aqui está a distribuição do seu perfil vocacional:
      </p>

      <div className="space-y-4">
        {sortedScores.map(({ type, score }, index) => (
          <div key={type}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className={`font-semibold ${index < 2 ? "text-primary" : "text-muted-foreground"}`}>
                  {type}
                </span>
                {index < 2 && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                    Destaque
                  </span>
                )}
              </div>
              <span className="text-sm font-medium text-foreground">{score}%</span>
            </div>
            <Progress value={score} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {riasecDescriptions[type] || ""}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
};
