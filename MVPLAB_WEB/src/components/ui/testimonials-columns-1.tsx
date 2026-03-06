"use client";
import React from "react";
import { motion } from "framer-motion";

export const TestimonialsColumn = (props: {
    className?: string;
    testimonials: { text: string; image: string; name: string; role: string }[];
    duration?: number;
}) => {
    return (
        <div className={props.className}>
            <motion.div
                animate={{
                    translateY: "-50%",
                }}
                transition={{
                    duration: props.duration || 10,
                    repeat: Infinity,
                    ease: "linear",
                    repeatType: "loop",
                }}
                className="flex flex-col gap-6 pb-6"
            >
                {[
                    ...new Array(2).fill(0).map((_, index) => (
                        <React.Fragment key={index}>
                            {props.testimonials.map(({ text, image, name, role }, i) => (
                                <div className="p-10 rounded-3xl border border-white/10 shadow-lg shadow-primary/10 max-w-xs w-full glass bg-[#050505]" key={i}>
                                    <div className="text-gray-300 italic text-sm">"{text}"</div>
                                    <div className="flex items-center gap-4 mt-8 pt-6 border-t border-white/5">
                                        <img
                                            width={48}
                                            height={48}
                                            src={image}
                                            alt={name}
                                            className="h-12 w-12 rounded-full border border-white/10 object-cover"
                                        />
                                        <div className="flex flex-col">
                                            <div className="font-bold tracking-tight text-white mb-1">{name}</div>
                                            <div className="text-xs text-purple-400 font-semibold uppercase tracking-widest">{role}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </React.Fragment>
                    )),
                ]}
            </motion.div>
        </div>
    );
};
