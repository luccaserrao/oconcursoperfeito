import { useEffect, useState } from "react";

const names = [
  "Maria Paula",
  "Ana Beatriz", 
  "João Vitor",
  "Camila S.",
  "Lucas M."
];

export const SocialProofPopup = () => {
  const [currentName, setCurrentName] = useState(names[0]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Primeira exibição após 15 segundos
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
      setTimeout(() => setIsVisible(false), 6000);
    }, 15000);

    // Repetir a cada 60 segundos
    const interval = setInterval(() => {
      const randomName = names[Math.floor(Math.random() * names.length)];
      setCurrentName(randomName);
      setIsVisible(true);
      setTimeout(() => setIsVisible(false), 6000);
    }, 60000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-20 md:bottom-4 left-4 right-4 md:right-auto md:max-w-80 
                    bg-card border-2 border-primary shadow-lg rounded-lg p-4 
                    animate-fade-in z-50">
      <p className="text-sm">
        🎉 <strong>{currentName}</strong> acabou de desbloquear o resultado completo e descobriu o cargo ideal!
      </p>
    </div>
  );
};
