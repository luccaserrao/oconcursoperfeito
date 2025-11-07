import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

interface CountdownTimerProps {
  initialMinutes?: number;
}

export const CountdownTimer = ({ initialMinutes = 120 }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  const isUrgent = timeLeft < 600; // Last 10 minutes

  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-mono text-lg font-bold ${
      isUrgent 
        ? "bg-destructive/30 text-destructive animate-pulse" 
        : "bg-primary/30 text-primary"
    }`}>
      <Clock className="w-5 h-5" />
      <span>
        {hours > 0 && `${String(hours).padStart(2, '0')}:`}
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
    </div>
  );
};
