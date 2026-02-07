'use client';

import { useEffect, useState } from 'react';

interface MousePosition {
  x: number;
  y: number;
  ratio: {
    x: number;
    y: number;
  };
}

export const useMousePosition = () => {
  const [position, setPosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    ratio: { x: 0, y: 0 },
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      // Calculate ratio relative to window size (0-1)
      const ratioX = x / window.innerWidth;
      const ratioY = y / window.innerHeight;

      setPosition({
        x,
        y,
        ratio: {
          x: ratioX,
          y: ratioY,
        },
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return position;
};

export const useCursorFollower = (speed: number = 0.15) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setTargetPosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const animateCursor = () => {
      setCursorPosition((prev) => ({
        x: prev.x + (targetPosition.x - prev.x) * speed,
        y: prev.y + (targetPosition.y - prev.y) * speed,
      }));
    };

    const frameId = setInterval(animateCursor, 1000 / 60); // 60fps

    return () => clearInterval(frameId);
  }, [targetPosition, speed]);

  return cursorPosition;
};
