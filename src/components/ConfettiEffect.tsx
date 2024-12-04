import React from 'react';
import { motion } from 'framer-motion';

export const ConfettiEffect: React.FC = () => {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD'];
    const particles = Array.from({ length: 12 });

    return (
        <div className="absolute inset-0 pointer-events-none">
            {particles.map((_, i) => {
                const angle = (i / particles.length) * 360;
                const radius = 40;
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
                            x: x,
                            y: y,
                            scale: 1,
                            opacity: 0
                        }}
                        transition={{
                            duration: 0.8,
                            delay: 0.3,
                            ease: "easeOut"
                        }}
                        className="absolute left-1/2 top-1/2 w-2 h-2 rounded-full"
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