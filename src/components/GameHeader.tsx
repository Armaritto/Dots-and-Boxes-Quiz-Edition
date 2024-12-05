import { FC, useEffect, useState } from 'react';
import { Box, Sparkles } from 'lucide-react';

interface GameHeaderProps {
    adminName: string;
}

export const GameHeader: FC<GameHeaderProps> = ({ adminName }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [sparklePosition, setSparklePosition] = useState(0);

    useEffect(() => {
        setIsVisible(true);
        const interval = setInterval(() => {
            setSparklePosition((prev) => (prev + 1) % 3);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full max-w-4xl mb-8">
            <div className="relative overflow-hidden rounded-2xl bg-white p-1">
                <div className="relative bg-white rounded-xl p-8">
                    {/* Animated sparkles */}
                    <div className="absolute top-4 right-4 flex gap-4">
                        {[0, 1, 2].map((i) => (
                            <Sparkles
                                key={i}
                                className={`w-6 h-6 transition-all duration-500 ${
                                    sparklePosition === i
                                        ? 'text-yellow-400 scale-125 rotate-12'
                                        : 'text-gray-300 scale-100 rotate-0'
                                }`}
                            />
                        ))}
                    </div>

                    {/* Title */}
                    <div
                        className={`transform transition-all duration-1000 ${
                            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                        }`}
                    >
                        <div className="flex items-center justify-center gap-4 mb-4">
                            <Box className="w-10 h-10 text-purple-500 animate-bounce mb-10"  />
                            <h1 className="text-4xl font-bold text-gray-800">
                                Dots and Boxes
                            </h1>
                            <Box className="w-10 h-10 text-orange-500 animate-bounce mt-10" style={{ animationDelay: '0.5s'  }} />
                        </div>
                    </div>

                    {/* Admin name */}
                    <div
                        className={`transform transition-all duration-1000 delay-300 ${
                            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                        }`}
                    >
                        <div className="flex items-center justify-center gap-2">
                            <span className="font-semibold text-lg text-gray-800">
                                {adminName}
                            </span>
                        </div>
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute -left-4 -top-4 w-24 h-24 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
                        <div className="absolute -right-4 -top-4 w-24 h-24 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
                        <div className="absolute -bottom-4 left-1/2 w-24 h-24 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
                    </div>
                </div>
            </div>
        </div>
    );
};