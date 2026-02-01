import { useEffect, useState } from 'react';
import './StarField.css';

interface Star {
  id: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
}

export interface StarFieldProps {
  starCount?: number;
  className?: string;
}

export function StarField({ starCount = 150, className }: StarFieldProps) {
  const [stars, setStars] = useState<Star[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const actualStarCount = isMobile ? Math.floor(starCount / 2) : starCount;
    const newStars: Star[] = [];
    for (let i = 0; i < actualStarCount; i++) {
      newStars.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: 0.5 + Math.random() * 3,
        delay: Math.random() * 2,
      });
    }
    setStars(newStars);
  }, [starCount, isMobile]);

  const classNames = ['ceres-star-field', className].filter(Boolean).join(' ');

  return (
    <div className={classNames}>
      {stars.map((star) => (
        <div
          key={star.id}
          className="ceres-star-field__star"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            animation: `ceres-star-flicker ${star.duration}s ease-in-out infinite`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
