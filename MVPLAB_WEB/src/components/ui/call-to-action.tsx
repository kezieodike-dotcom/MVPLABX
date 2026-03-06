import { MoveRight, PhoneCall } from "lucide-react";
import { Badge } from "./badge";
import { Button } from "./button";

interface CTAProps {
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  primaryLabel?: string;
  secondaryLabel?: string;
  title?: string;
  description?: string;
  badgeLabel?: string;
}

function CTA({
  onPrimaryClick,
  onSecondaryClick,
  primaryLabel = "Start Building Today",
  secondaryLabel = "Invest With Us",
  title = "Ready to Build or Invest?",
  description = "Whether you want to fully own your next digital product or co-build an AI venture with others — we're ready.",
  badgeLabel = "Get started"
}: CTAProps) {
  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto px-6">
        <div className="flex flex-col text-center bg-zinc-900/50 border border-white/10 rounded-3xl p-8 lg:p-14 gap-8 items-center backdrop-blur-sm">
          <div>
            <Badge variant="default" className="bg-purple-600 border-purple-600 text-white">
              {badgeLabel}
            </Badge>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-bold Outfit">
              {title}
            </h3>
            <p className="text-lg leading-relaxed tracking-tight text-gray-400 max-w-2xl">
              {description}
            </p>
          </div>
          <div className="flex flex-row gap-4 flex-col sm:flex-row">
            <Button 
              className="gap-4 h-12 px-8 rounded-full font-bold"
              onClick={onPrimaryClick}
            >
              {primaryLabel} <MoveRight className="w-4 h-4" />
            </Button>
            <Button 
              className="gap-4 h-12 px-8 rounded-full font-bold border border-white/20 bg-transparent hover:bg-white/5"
              variant="outline"
              onClick={onSecondaryClick}
            >
              {secondaryLabel} <PhoneCall className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { CTA };
