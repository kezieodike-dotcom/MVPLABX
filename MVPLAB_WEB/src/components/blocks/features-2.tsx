import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Rocket, ShieldCheck, Zap } from 'lucide-react'
import { ReactNode } from 'react'

export function Features2() {
    return (
        <section className="py-20">
            <div className="mx-auto max-w-7xl px-6">
                <div className="text-left mb-16">
                    <h2 className="text-balance text-4xl font-bold lg:text-5xl Outfit tracking-tight">
                        Our Apps & <span className="gradient-text italic">Internal Projects</span>
                    </h2>
                    <p className="mt-4 text-gray-400 text-lg max-w-2xl">
                        We don't just build for others; we launch our own proprietary AI assets that generate consistent value.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Card className="glass border-white/5 rounded-[32px] hover:border-purple-500/20 transition-all transition-colors">
                        <CardHeader className="pb-3">
                            <CardDecorator>
                                <Rocket className="size-6 text-purple-400" aria-hidden />
                            </CardDecorator>

                            <h3 className="mt-6 text-xl font-bold Outfit">Proprietary Assets</h3>
                        </CardHeader>

                        <CardContent>
                            <p className="text-gray-400">Validated software products owned and operated by the MVPLABX foundation and community.</p>
                        </CardContent>
                    </Card>

                    <Card className="glass border-white/5 rounded-[32px] hover:border-purple-500/20 transition-all transition-colors">
                        <CardHeader className="pb-3">
                            <CardDecorator>
                                <ShieldCheck className="size-6 text-blue-400" aria-hidden />
                            </CardDecorator>

                            <h3 className="mt-6 text-xl font-bold Outfit">Verified Quality</h3>
                        </CardHeader>

                        <CardContent>
                            <p className="text-gray-400">Every project undergoes rigorous testing and market validation before it hits our portal.</p>
                        </CardContent>
                    </Card>

                    <Card className="glass border-white/5 rounded-[32px] hover:border-purple-500/20 transition-all transition-colors">
                        <CardHeader className="pb-3">
                            <CardDecorator>
                                <Zap className="size-6 text-yellow-400" aria-hidden />
                            </CardDecorator>

                            <h3 className="mt-6 text-xl font-bold Outfit">High-Intent Build</h3>
                        </CardHeader>

                        <CardContent>
                            <p className="text-gray-400">We build with velocity. Turn your vision into a revenue-generating asset in record time.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}

const CardDecorator = ({ children }: { children: ReactNode }) => (
    <div aria-hidden className="relative size-32 flex items-center justify-center">
        <div className="absolute inset-0 bg-white/5 rounded-2xl blur-xl"></div>
        <div className="bg-white/5 relative z-10 size-14 items-center justify-center border border-white/10 rounded-2xl flex">{children}</div>
    </div>
)
