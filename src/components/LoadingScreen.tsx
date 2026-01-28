import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Brain, Users, TrendingUp, Sparkles } from "lucide-react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [currentPhrase, setCurrentPhrase] = useState(0);
  
  const phrases = [
    {
      text: "Carregando preferências comportamentais...",
      icon: <Brain className="w-6 h-6 text-primary" />
    },
    {
      text: "Analisando correspondência com carreiras públicas...",
      icon: <TrendingUp className="w-6 h-6 text-primary" />
    },
    {
      text: "Comparando com mais de 128.000 perfis vocacionais...",
      icon: <Users className="w-6 h-6 text-primary" />
    },
    {
      text: "Gerando seu resultado personalizado...",
      icon: <Sparkles className="w-6 h-6 text-primary" />
    }
  ];
  
  useEffect(() => {
    // Progresso de 0 a 100 em 6 segundos (incremento a cada 120ms)
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => onComplete(), 300); // Pequeno delay antes de completar
          return 100;
        }
        return prev + 2;
      });
    }, 120);
    
    // Alternar frases a cada 1.5 segundos
    const phraseInterval = setInterval(() => {
      setCurrentPhrase(prev => (prev + 1) % phrases.length);
    }, 1500);
    
    return () => {
      clearInterval(progressInterval);
      clearInterval(phraseInterval);
    };
  }, [onComplete]);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card className="p-8 md:p-12 shadow-[var(--shadow-elevated)] animate-fade-in">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-primary to-accent mb-4 animate-pulse">
              {phrases[currentPhrase].icon}
            </div>

            <div className="space-y-4">
              <div className="relative">
                <Progress value={progress} className="h-4" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-bold text-primary-foreground mix-blend-difference">
                    {progress}%
                  </span>
                </div>
              </div>
              
              <p className="text-2xl font-bold text-primary">
                {progress}%
              </p>
            </div>

            <div className="min-h-[60px] flex items-center justify-center">
              <p className="text-lg text-muted-foreground animate-pulse">
                {phrases[currentPhrase].text}
              </p>
            </div>

            <div className="pt-4 space-y-2">
              <p className="text-sm font-semibold text-foreground">
                📊 Este teste compara seu perfil com macroareas de concurso
              </p>
              <p className="text-xs text-muted-foreground max-w-lg mx-auto">
                Suas respostas estao sendo analisadas com cuidado para entregar uma direcao inicial clara.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
