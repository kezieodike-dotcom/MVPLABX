"use client"

import React from "react"
import { Warp } from "@paper-design/shaders-react"
import { Shield, Smartphone, Terminal, Users } from "lucide-react"
import { Link } from "react-router-dom"

interface Feature {
    title: string
    description: string
    icon: React.ReactNode
    href: string
}

const features: Feature[] = [
    {
        title: "AI INVESTMENT",
        description: "Co-build and co-own validated AI products. Participate in structured revenue distribution.",
        icon: <Shield className="w-12 h-12 text-white" />,
        href: "/ai-investment"
    },
    {
        title: "OUR APPS",
        description: "Explore our portfolio of scalable digital solutions from SaaS platforms to enterprise tools.",
        icon: <Smartphone className="w-12 h-12 text-white" />,
        href: "/our-apps"
    },
    {
        title: "DEVELOPERS",
        description: "Join an elite ecosystem. Collaborate on live projects, sharpen your skills, or hire vetted talent.",
        icon: <Terminal className="w-12 h-12 text-white" />,
        href: "/developers"
    },
    {
        title: "COMMUNITY",
        description: "A network supporting collaboration, growth, and opportunity sharing for founders and creators.",
        icon: <Users className="w-12 h-12 text-white" />,
        href: "/community"
    }
]

export default function FeaturesCards() {
    const getShaderConfig = (index: number) => {
        const configs = [
            {
                proportion: 0.3,
                softness: 0.8,
                distortion: 0.15,
                swirl: 0.6,
                swirlIterations: 8,
                shape: "checks" as const,
                shapeScale: 0.08,
                colors: ["hsl(280, 100%, 30%)", "hsl(320, 100%, 60%)", "hsl(340, 90%, 40%)", "hsl(300, 100%, 70%)"],
            },
            {
                proportion: 0.4,
                softness: 1.2,
                distortion: 0.2,
                swirl: 0.9,
                swirlIterations: 12,
                shape: "dots" as const,
                shapeScale: 0.12,
                colors: ["hsl(200, 100%, 25%)", "hsl(180, 100%, 65%)", "hsl(160, 90%, 35%)", "hsl(190, 100%, 75%)"],
            },
            {
                proportion: 0.35,
                softness: 0.9,
                distortion: 0.18,
                swirl: 0.7,
                swirlIterations: 10,
                shape: "checks" as const,
                shapeScale: 0.1,
                colors: ["hsl(120, 100%, 25%)", "hsl(140, 100%, 60%)", "hsl(100, 90%, 30%)", "hsl(130, 100%, 70%)"],
            },
            {
                proportion: 0.45,
                softness: 1.1,
                distortion: 0.22,
                swirl: 0.8,
                swirlIterations: 15,
                shape: "dots" as const,
                shapeScale: 0.09,
                colors: ["hsl(30, 100%, 35%)", "hsl(50, 100%, 65%)", "hsl(40, 90%, 40%)", "hsl(45, 100%, 75%)"],
            }
        ]
        return configs[index % configs.length]
    }

    return (
        <section className="py-24 px-6 bg-[#030303]">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 uppercase tracking-widest Outfit">Features</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => {
                        const shaderConfig = getShaderConfig(index)
                        return (
                            <Link
                                key={index}
                                to={feature.href}
                                className="relative h-80 group block font-normal text-left"
                            >
                                <div className="absolute inset-0 rounded-[32px] overflow-hidden transition-transform duration-500 group-hover:scale-[1.02] pointer-events-none">
                                    <Warp
                                        style={{ height: "100%", width: "100%" }}
                                        proportion={shaderConfig.proportion}
                                        softness={shaderConfig.softness}
                                        distortion={shaderConfig.distortion}
                                        swirl={shaderConfig.swirl}
                                        swirlIterations={shaderConfig.swirlIterations}
                                        shape={shaderConfig.shape}
                                        shapeScale={shaderConfig.shapeScale}
                                        scale={1}
                                        rotation={0}
                                        speed={0.8}
                                        colors={shaderConfig.colors}
                                    />
                                </div>

                                <div className="relative z-10 p-8 rounded-[32px] h-full flex flex-col bg-black/60 hover:bg-black/40 transition-colors border border-white/10 backdrop-blur-sm">
                                    <div className="mb-6 filter drop-shadow-lg">{feature.icon}</div>

                                    <h3 className="text-2xl font-bold mb-4 text-white tracking-tight Outfit">{feature.title}</h3>

                                    <p className="leading-relaxed flex-grow text-gray-200 font-medium text-sm">{feature.description}</p>

                                    <div className="mt-6 flex items-center text-sm font-bold text-white group-hover:gap-4 transition-all gap-2">
                                        <span>Explore</span>
                                        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
