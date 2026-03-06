import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronRight } from 'lucide-react'
import { Button } from '../ui/button'
import { AnimatedGroup } from '../ui/animated-group'
import { TextEffect } from '../ui/text-effect'
import { Navbar } from '../layout/Navbar'

const transitionVariants = {
    item: {
        hidden: {
            opacity: 0,
            filter: 'blur(12px)',
            y: 12,
        },
        visible: {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            transition: {
                type: 'spring',
                bounce: 0.3,
                duration: 1.5,
            },
        },
    },
} as const;

export function HeroSection() {
    return (
        <>
            <Navbar />
            <main className="overflow-hidden bg-black text-white min-h-screen">
                <div
                    aria-hidden
                    className="z-[2] absolute inset-0 pointer-events-none isolate opacity-50 contain-strict hidden lg:block">
                    <div className="w-[35rem] h-[80rem] -translate-y-[350px] absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(260,80%,85%,.08)_0,hsla(260,80%,55%,.02)_50%,hsla(260,80%,45%,0)_80%)]" />
                    <div className="h-[80rem] absolute left-0 top-0 w-56 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(260,80%,85%,.06)_0,hsla(260,80%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
                    <div className="h-[80rem] -translate-y-[350px] absolute left-0 top-0 w-56 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(260,80%,85%,.04)_0,hsla(260,80%,45%,.02)_80%,transparent_100%)]" />
                </div>
                <section>
                    <div className="relative pt-24 md:pt-36">
                        <AnimatedGroup
                            variants={{
                                container: {
                                    visible: {
                                        transition: {
                                            delayChildren: 1,
                                        },
                                    },
                                },
                                item: {
                                    hidden: {
                                        opacity: 0,
                                        y: 20,
                                    },
                                    visible: {
                                        opacity: 1,
                                        y: 0,
                                        transition: {
                                            type: 'spring',
                                            bounce: 0.3,
                                            duration: 2,
                                        },
                                    },
                                },
                            }}
                            className="absolute inset-0 -z-20">
                            <img
                                src="https://images.unsplash.com/photo-1620712943543-bcc4628c9757?q=80&w=2832&auto=format&fit=crop"
                                alt="background"
                                className="absolute inset-x-0 top-56 -z-20 hidden lg:top-32 dark:block opacity-30 mix-blend-screen"
                                width="3276"
                                height="4095"
                            />
                        </AnimatedGroup>
                        <div aria-hidden className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,black_75%)]" />
                        <div className="mx-auto max-w-7xl px-6 relative z-10">
                            <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
                                <AnimatedGroup variants={transitionVariants}>
                                    <Link
                                        to="/coming-soon"
                                        className="hover:bg-zinc-900 bg-zinc-900/50 group mx-auto flex w-fit items-center gap-4 rounded-full border border-white/10 p-1 pl-4 shadow-md shadow-black/5 transition-all duration-300">
                                        <span className="text-gray-300 text-sm">Introducing Support for AI Models</span>
                                        <span className="block h-4 w-0.5 bg-zinc-700"></span>

                                        <div className="bg-white/10 group-hover:bg-white/20 size-6 overflow-hidden rounded-full duration-500">
                                            <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                                                <span className="flex size-6">
                                                    <ArrowRight className="m-auto size-3" />
                                                </span>
                                                <span className="flex size-6">
                                                    <ArrowRight className="m-auto size-3" />
                                                </span>
                                            </div>
                                        </div>
                                    </Link>

                                    <div className="mt-8 max-w-4xl mx-auto text-center">
                                        <TextEffect
                                            as="h1"
                                            preset="blur"
                                            per="word"
                                            className="text-balance text-6xl md:text-7xl lg:mt-16 xl:text-[5.25rem] font-bold leading-tight"
                                        >
                                            Invest in the Future of AI Assets
                                        </TextEffect>
                                    </div>
                                    <p
                                        className="mx-auto mt-8 max-w-2xl text-balance text-lg text-gray-400">
                                        Secure your stake in high-growth AI applications built and validated by MVP LAB X. Join a community of forward-thinking investors today.
                                    </p>
                                </AnimatedGroup>

                                <AnimatedGroup
                                    variants={{
                                        container: {
                                            visible: {
                                                transition: {
                                                    staggerChildren: 0.05,
                                                    delayChildren: 0.75,
                                                },
                                            },
                                        },
                                        ...transitionVariants,
                                    }}
                                    className="mt-12 flex flex-col items-center justify-center gap-2 md:flex-row">
                                    <div
                                        key={1}
                                        className="bg-white/10 rounded-[14px] border border-white/10 p-0.5">
                                        <Button
                                            asChild
                                            size="lg"
                                            className="rounded-xl px-8 text-base bg-white text-black hover:bg-gray-200">
                                            <Link to="/coming-soon">
                                                <span className="text-nowrap">Start Investing</span>
                                            </Link>
                                        </Button>
                                    </div>
                                    <Button
                                        key={2}
                                        asChild
                                        size="lg"
                                        variant="ghost"
                                        className="h-10.5 rounded-xl px-8 text-white hover:bg-white/5 border border-white/5">
                                        <Link to="/ai-investment/reviews">
                                            <span className="text-nowrap">View Reviews</span>
                                        </Link>
                                    </Button>
                                    <Button
                                        key={3}
                                        asChild
                                        size="lg"
                                        variant="ghost"
                                        className="h-10.5 rounded-xl px-8 text-white hover:bg-white/5 border border-white/5">
                                        <Link to="/coming-soon">
                                            <span className="text-nowrap">Request a demo</span>
                                        </Link>
                                    </Button>
                                </AnimatedGroup>
                            </div>
                        </div>

                        <AnimatedGroup
                            variants={{
                                container: {
                                    visible: {
                                        transition: {
                                            staggerChildren: 0.05,
                                            delayChildren: 0.75,
                                        },
                                    },
                                },
                                ...transitionVariants,
                            }}>
                            <div className="relative -mr-56 mt-8 overflow-hidden px-2 sm:mr-0 sm:mt-12 md:mt-20">
                                <div
                                    aria-hidden
                                    className="bg-gradient-to-b from-transparent to-black absolute inset-0 z-10 from-35%"
                                />
                                <div className="border border-white/10 bg-zinc-900/10 relative mx-auto max-w-6xl overflow-hidden rounded-2xl p-4 shadow-2xl shadow-purple-500/20 backdrop-blur-sm">
                                    <img
                                        className="aspect-15/8 relative rounded-2xl opacity-90"
                                        src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
                                        alt="investment analytics"
                                        width="2700"
                                        height="1440"
                                    />
                                </div>
                            </div>
                        </AnimatedGroup>
                    </div>
                </section>
                <section className="pb-16 pt-16 md:pb-32 bg-black">
                    <div className="group relative m-auto max-w-5xl px-6">
                        <div className="absolute inset-0 z-10 flex scale-95 items-center justify-center opacity-0 duration-500 group-hover:scale-100 group-hover:opacity-100">
                            <Link
                                to="/"
                                className="block text-sm duration-150 hover:opacity-75 text-purple-400 font-bold px-6 py-3 bg-black/50 backdrop-blur-md border border-white/10 rounded-full">
                                <span> Meet Our Partners</span>

                                <ChevronRight className="ml-1 inline-block size-3" />
                            </Link>
                        </div>
                        <div className="group-hover:blur-sm mx-auto mt-12 grid max-w-2xl grid-cols-4 gap-x-12 gap-y-8 transition-all duration-500 group-hover:opacity-50 sm:gap-x-16 sm:gap-y-14">
                            <div className="flex">
                                <img
                                    className="mx-auto h-5 w-auto invert"
                                    src="https://html.tailus.io/blocks/customers/nvidia.svg"
                                    alt="Nvidia Logo"
                                />
                            </div>

                            <div className="flex">
                                <img
                                    className="mx-auto h-4 w-auto invert"
                                    src="https://html.tailus.io/blocks/customers/column.svg"
                                    alt="Column Logo"
                                />
                            </div>
                            <div className="flex">
                                <img
                                    className="mx-auto h-4 w-auto invert"
                                    src="https://html.tailus.io/blocks/customers/github.svg"
                                    alt="GitHub Logo"
                                />
                            </div>
                            <div className="flex">
                                <img
                                    className="mx-auto h-5 w-auto invert"
                                    src="https://html.tailus.io/blocks/customers/nike.svg"
                                    alt="Nike Logo"
                                />
                            </div>
                            <div className="flex">
                                <img
                                    className="mx-auto h-5 w-auto invert"
                                    src="https://html.tailus.io/blocks/customers/lemonsqueezy.svg"
                                    alt="Lemon Squeezy Logo"
                                />
                            </div>
                            <div className="flex">
                                <img
                                    className="mx-auto h-4 w-auto invert"
                                    src="https://html.tailus.io/blocks/customers/laravel.svg"
                                    alt="Laravel Logo"
                                />
                            </div>
                            <div className="flex">
                                <img
                                    className="mx-auto h-7 w-auto invert"
                                    src="https://html.tailus.io/blocks/customers/lilly.svg"
                                    alt="Lilly Logo"
                                />
                            </div>

                            <div className="flex">
                                <img
                                    className="mx-auto h-6 w-auto invert"
                                    src="https://html.tailus.io/blocks/customers/openai.svg"
                                    alt="OpenAI Logo"
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}
