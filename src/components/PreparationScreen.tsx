import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Brain, Target } from "lucide-react";

interface PreparationScreenProps {
  onStart: () => void;
}

export const PreparationScreen = ({ onStart }: PreparationScreenProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <Card className="p-8 md:p-12 shadow-[var(--shadow-elevated)] animate-fade-in">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-primary to-accent mb-6 animate-scale-in">
              <Brain className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Antes de Começar, Foque.
            </h1>
          </div>

          <div className="space-y-6 text-center mb-8">
            <p className="text-lg md:text-xl text-muted-foreground">
              Este teste foi desenvolvido com base na <strong className="text-foreground">metodologia científica RIASEC de John Holland</strong>.
            </p>
            
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 text-left">
              <div className="flex items-start gap-3 mb-4">
                <Target className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Por que este teste é diferente?</h3>
                  <p className="text-sm text-muted-foreground">
                    A metodologia RIASEC é usada em processos seletivos e orientações profissionais 
                    em mais de 40 países. Ela analisa 6 dimensões da sua personalidade para encontrar 
                    a carreira ideal no serviço público.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-lg font-medium">Para resultados precisos:</p>
              <div className="grid md:grid-cols-3 gap-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground bg-background border rounded-lg p-3">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>Local silencioso</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground bg-background border rounded-lg p-3">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>Sem distrações</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground bg-background border rounded-lg p-3">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>Respostas sinceras</span>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <p className="text-lg md:text-xl font-semibold text-foreground">
                Leve a sério: <span className="text-primary">este teste pode definir sua rota ideal no serviço público.</span>
              </p>
            </div>
          </div>

          <div className="text-center">
            <Button 
              onClick={onStart}
              size="lg"
              className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
            >
              Estou Pronto, Começar Teste
            </Button>
            <p className="text-xs text-muted-foreground mt-4">
              ⏱️ Tempo estimado: 7-10 minutos • 25 perguntas
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};
