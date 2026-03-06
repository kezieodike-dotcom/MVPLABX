import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const articlesData = [
    {
        category: "AI INFRASTRUCTURE",
        description: "How intelligent automation is redefining scalability for high-growth startups and enterprises alike.",
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2865&auto=format&fit=crop",
        publishDate: "Dec 12, 2025",
        readMoreLink: "/blogs/blog-1",
        title: "Building the Next Generation of AI Microservices",
    },
    {
        category: "VENTURE CAPITAL",
        description: "Why co-building with technical partners is becoming the preferred model over traditional angel investing.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop",
        publishDate: "Nov 24, 2025",
        readMoreLink: "/blogs/blog-2",
        title: "The Rise of Co-Build Venture Ecosystems",
    },
    {
        category: "PRODUCT DESIGN",
        description: "Exploring the intersection of premium aesthetics, glassmorphism, and cognitive load in modern web apps.",
        image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2964&auto=format&fit=crop",
        publishDate: "Oct 18, 2025",
        readMoreLink: "/blogs/blog-3",
        title: "Designing for Impact: Minimalist Web Structures",
    },
];

export default function BlogsShowcase() {
    const navigate = useNavigate();
    return (
        <section id="blog" className="px-4 py-24 bg-[#050505]">
            <div className="mx-auto max-w-7xl">
                <div className="mb-12 text-center sm:mb-16">
                    <p className="mb-3 font-medium text-purple-400 text-xs uppercase tracking-wider">
                        Insights
                    </p>
                    <h2 className="font-bold text-4xl text-white tracking-tight sm:text-5xl Outfit">
                        Explore Our Blog
                    </h2>
                    <p className="text-gray-400 mt-4 max-w-xl mx-auto">Thinking out loud on AI, product-building, and what it means to build for impact.</p>
                </div>
                <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {articlesData.map((article, index) => (
                        <div
                            className="group cursor-pointer border border-white/10 bg-[#0a0a0a] rounded-[24px] overflow-hidden transition-all hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-900/20"
                            key={index}
                            onClick={() => navigate(article.readMoreLink)}
                        >
                            <div className="p-0">
                                <div className="relative mb-4 sm:mb-6 overflow-hidden">
                                    <img
                                        alt={article.title}
                                        className="aspect-video h-64 w-full object-cover sm:h-72 md:h-64 transition-transform duration-700 group-hover:scale-105"
                                        height={1080}
                                        src={article.image || "/placeholder.svg"}
                                        width={1920}
                                    />
                                    <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500"></div>
                                    <p
                                        className="absolute top-4 left-4 rounded-full border border-white/10 bg-black/60 px-3 py-1 font-bold text-[10px] text-white uppercase backdrop-blur-md sm:text-xs"
                                    >
                                        {article.category}
                                    </p>
                                </div>
                                <div className="px-6 pb-6 sm:px-8 sm:pb-8">
                                    <h3 className="mb-4 font-bold text-xl text-white tracking-tight Outfit sm:text-2xl group-hover:text-purple-300 transition-colors">
                                        {article.title}
                                    </h3>
                                    <p className="mb-6 text-gray-400 text-sm leading-relaxed">
                                        {article.description}
                                    </p>

                                    {/* Read More Link and Date */}
                                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pt-6 border-t border-white/10">
                                        <a
                                            className="group/btn relative flex items-center overflow-hidden font-bold text-white text-xs transition-colors hover:text-purple-300 sm:text-sm"
                                            href={article.readMoreLink}
                                        >
                                            <span className="mr-3 overflow-hidden rounded-full border border-white/20 p-2 transition-colors duration-300 ease-in group-hover/btn:bg-white group-hover/btn:text-black">
                                                <ArrowRight className="h-4 w-4 translate-x-0 opacity-100 transition-all duration-500 ease-in group-hover/btn:translate-x-8 group-hover/btn:opacity-0" />
                                                <ArrowRight className="absolute top-1/2 -left-4 h-4 w-4 -translate-y-1/2 transition-all duration-500 ease-in-out group-hover/btn:left-2 text-black" />
                                            </span>
                                            Read more
                                        </a>
                                        <span className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                                            {article.publishDate}
                                            <span className="w-8 border-gray-700 border-t" />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <button onClick={() => navigate('/blogs')} className="px-8 py-3 bg-white/5 border border-white/10 rounded-full font-bold hover:bg-white/10 transition-colors text-sm text-white">
                        View All Articles
                    </button>
                </div>
            </div>
        </section>
    );
}
