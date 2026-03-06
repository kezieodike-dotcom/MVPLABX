import { User, Sparkles, Code, Globe, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";

function Feature() {
    return (
        <div className="w-full py-20 lg:py-40">
            <div className="container mx-auto px-6">
                <div className="flex flex-col gap-10">
                    <div className="flex gap-4 flex-col items-start">
                        <div>
                            <Badge variant="outline" className="border-purple-500/30 text-purple-400">Featured Services</Badge>
                        </div>
                        <div className="flex gap-2 flex-col">
                            <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-bold text-left Outfit">
                                Core Ecosystem <span className="gradient-text italic">Features</span>
                            </h2>
                            <p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-gray-400 text-left">
                                MVPLABX isn't just a development studio; it's a circular value system designed to build, scale, and reward.
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="glass rounded-[32px] h-full lg:col-span-2 p-8 flex justify-between flex-col min-h-[400px] group hover:border-purple-500/30 transition-all">
                            <div className="w-12 h-12 rounded-2xl bg-purple-600/10 border border-purple-500/20 flex items-center justify-center">
                                <Sparkles className="w-6 h-6 text-purple-400" />
                            </div>
                            <div className="flex flex-col">
                                <h3 className="text-2xl font-bold mb-4 Outfit">AI Investment Portal</h3>
                                <p className="text-gray-400 max-w-md text-lg leading-relaxed">
                                    Earn ROI through real-world AI traction. Our assets are validated by market demand and backed by revenue, not just hype.
                                </p>
                            </div>
                        </div>
                        <div className="glass rounded-[32px] p-8 flex justify-between flex-col min-h-[400px] group hover:border-purple-500/30 transition-all">
                            <div className="w-12 h-12 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center">
                                <Globe className="w-6 h-6 text-blue-400" />
                            </div>
                            <div className="flex flex-col">
                                <h3 className="text-2xl font-bold mb-4 Outfit">Global Community</h3>
                                <p className="text-gray-400 text-lg leading-relaxed">
                                    Join a shared ownership republic where developers, creators, and students build the future together.
                                </p>
                            </div>
                        </div>

                        <div className="glass rounded-[32px] p-8 flex justify-between flex-col min-h-[400px] group hover:border-purple-500/30 transition-all">
                            <div className="w-12 h-12 rounded-2xl bg-cyan-600/10 border border-cyan-500/20 flex items-center justify-center">
                                <Code className="w-6 h-6 text-cyan-400" />
                            </div>
                            <div className="flex flex-col">
                                <h3 className="text-2xl font-bold mb-4 Outfit">Custom AI Build</h3>
                                <p className="text-gray-400 text-lg leading-relaxed">
                                    Zero-to-one development for visionaries. We build scalable, battle-tested apps that dominate your market.
                                </p>
                            </div>
                        </div>
                        <div className="glass rounded-[32px] h-full lg:col-span-2 p-8 flex justify-between flex-col min-h-[400px] group hover:border-purple-500/30 transition-all">
                            <div className="w-12 h-12 rounded-2xl bg-yellow-600/10 border border-yellow-500/20 flex items-center justify-center">
                                <MessageSquare className="w-6 h-6 text-yellow-400" />
                            </div>
                            <div className="flex flex-col">
                                <h3 className="text-2xl font-bold mb-4 Outfit">Developer Forum</h3>
                                <p className="text-gray-400 max-w-md text-lg leading-relaxed">
                                    The Upwork for the AI era. A vetted talent marketplace where developers find high-growth projects and equity opportunities.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export { Feature };
