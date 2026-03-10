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

  const toggleTimer = () => {
    if (timeLeft > 0) setIsRunning(!isRunning);
  };
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(seconds);
  };

  const formatTime = (time) => {
    if (time >= 3600) {
      const h = Math.floor(time / 3600);
      const m = Math.floor((time % 3600) / 60);
      const s = time % 60;
      return `${h}h${m.toString().padStart(2, '0')}m${s.toString().padStart(2, '0')}s`;
    }
    const mins = Math.floor(time / 60);
    const secs = time % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (seconds - timeLeft) / seconds; // 0 → 1
  const isDone = timeLeft === 0;

  return (
    <div
      className="inline-flex items-center gap-3 my-3 px-3 py-2 border border-[var(--color-border-grid)] bg-[var(--color-surface)] font-mono text-sm cursor-pointer select-none group hover:border-[var(--color-accent)] transition-colors"
      onClick={isDone ? resetTimer : toggleTimer}
      title={isDone ? 'Réinitialiser' : isRunning ? 'Pause' : 'Démarrer'}
      style={{ userSelect: 'none' }}
    >
      {/* Icon */}
      <span
        className={`text-xs transition-colors ${isDone ? 'text-[var(--color-alert)]' : 'text-[var(--color-accent)]'}`}
      >
        {isDone ? '✓' : isRunning ? '▐▐' : '▶'}
      </span>

      {/* Label */}
      <span className="opacity-70 group-hover:opacity-100 transition-opacity text-xs uppercase tracking-wider max-w-[180px] truncate">
        {label || 'Timer'}
      </span>

      {/* Gauge pill */}
      <div className="relative w-24 h-2 bg-[var(--color-border-grid)] overflow-hidden shrink-0">
        <div
          className={`absolute inset-y-0 left-0 transition-all duration-1000 ${isDone ? 'bg-[var(--color-alert)]' : 'bg-[var(--color-accent)]'}`}
          style={{ width: `${Math.round(progress * 100)}%` }}
        />
      </div>

      {/* Time display */}
      <span
        className={`font-bold tabular-nums shrink-0 transition-colors ${isDone ? 'text-[var(--color-alert)] animate-pulse' : ''}`}
      >
        {formatTime(timeLeft)}
      </span>

      {/* Reset button — only shown when not at full reset */}
      {timeLeft !== seconds && (
        <button
          onClick={(e) => { e.stopPropagation(); resetTimer(); }}
          className="text-xs opacity-70 hover:opacity-100 transition-opacity text-[var(--color-accent)] ml-1 cursor-pointer leading-none"
          title="Réinitialiser"
        >
          ↺
        </button>
      )}
    </div>
  );
}
