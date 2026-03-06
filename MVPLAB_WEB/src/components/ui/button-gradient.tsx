import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface ButtonGradientProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
}

export const ButtonGradient: React.FC<ButtonGradientProps> = ({ children, className, ...props }) => {
    return (
        <button
            className={cn(
                "relative group px-6 py-2 rounded-full font-bold text-white transition-all duration-300",
                className
            )}
            {...props}
        >
            {/* Animated gradient border background */}
            <div className="absolute -inset-[1px] bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-400 rounded-full opacity-70 group-hover:opacity-100 blur-[2px] group-hover:blur-[4px] transition-all duration-500 animate-tilt"></div>

            {/* Main button surface */}
            <div className="relative bg-black rounded-full h-full w-full flex items-center justify-center px-6 py-2 border border-white/10 group-hover:border-transparent transition-colors">
                {children}
            </div>
        </button>
    );
};
