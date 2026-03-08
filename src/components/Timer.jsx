import React, { useState, useEffect, useRef } from 'react';

export default function Timer({ seconds, label }) {
  const [timeLeft, setTimeLeft] = useState(seconds);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeLeft]);

  const toggleTimer = () => setIsRunning(!isRunning);
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(seconds);
  };

  const formatTime = (time) => {
    const mins = Math.floor(time / 60);
    const secs = time % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="surface-card p-4 my-4 font-mono flex flex-col gap-2 w-full max-w-sm">
      <div className="flex justify-between items-center border-b border-[var(--color-border-grid)] pb-2">
        <span className="font-dot text-sm text-[var(--color-accent)] uppercase tracking-wider">
          &gt; {label || 'Timer Module'}
        </span>
        <span className={`text-xl font-bold ${timeLeft === 0 ? 'text-[var(--color-alert)] animate-pulse' : 'text-[#1A202C]'}`}>
          {formatTime(timeLeft)}
        </span>
      </div>
      <div className="flex gap-2 mt-2">
        <button 
          onClick={toggleTimer}
          className="flex-1 border border-[var(--color-border-grid)] px-3 py-1 text-sm bg-transparent hover:bg-[var(--color-accent)] hover:text-white transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={timeLeft === 0 && !isRunning}
        >
          {isRunning ? 'PAUSE' : 'START'}
        </button>
        <button 
          onClick={resetTimer}
          className="flex-1 border border-[var(--color-border-grid)] px-3 py-1 text-sm bg-transparent hover:bg-[var(--color-alert)] hover:text-white transition-colors cursor-pointer"
        >
          RESET
        </button>
      </div>
    </div>
  );
}
