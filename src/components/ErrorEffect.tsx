import React from 'react';
import { motion } from 'framer-motion';

export const ErrorEffect: React.FC = () => {
  const colors = ['#FF6B6B', '#FF8787', '#FFA5A5', '#FFB8B8', '#FFCCCC'];
  const particles = Array.from({ length: 8 });

  return (
    <div className="absolute inset-0 pointer-events-none">
      {particles.map((_, i) => {
        const angle = (i / particles.length) * 360;
        const radius = 35;
        const x = Math.cos((angle * Math.PI) / 180) * radius;
        const y = Math.sin((angle * Math.PI) / 180) * radius;

        return (
          <motion.div
            key={i}
            initial={{
              x: 0,
              y: 0,
              scale: 0,
              opacity: 1
            }}
            animate={{
              x: [0, x * 0.5, x],
              y: [0, y * 0.5, y],
              scale: [0, 1, 0],
              opacity: [1, 1, 0]
            }}
            transition={{
              duration: 0.6,
              delay: 0.2,
              ease: "easeOut",
              times: [0, 0.5, 1]
            }}
            className="absolute left-1/2 top-1/2 w-1.5 h-1.5 rounded-full"
            style={{
              backgroundColor: colors[i % colors.length],
              transform: 'translate(-50%, -50%)'
            }}
          />
        );
      })}
    </div>
  );
};