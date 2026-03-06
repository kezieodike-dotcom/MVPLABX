import { Button } from "./button";
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyTitle,
} from "./empty";
import { HomeIcon, CompassIcon } from "lucide-react";
import { Link } from "react-router-dom";

export function NotFound() {
    return (
        <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-black text-white selection:bg-purple-500/30">
            <Empty className="border-white/10 glass">
                <EmptyHeader>
                    <EmptyTitle className="font-extrabold text-9xl tracking-tighter text-purple-400">
                        404
                    </EmptyTitle>
                    <EmptyDescription className="-mt-8 text-neutral-400 font-medium">
                        The page you're looking for might have been <br />
                        moved or doesn't exist.
                    </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                    <div className="flex gap-4 mt-6">
                        <Button asChild className="bg-white text-black hover:bg-gray-200 rounded-full font-bold px-8">
                            <Link to="/">
                                <HomeIcon
                                    className="size-4 mr-2" data-icon="inline-start" />
                                Go Home
                            </Link>
                        </Button>

                        <Button asChild variant="outline" className="bg-transparent text-white border-white/20 hover:bg-white/5 hover:text-white rounded-full font-bold px-8">
                            <Link to="/">
                                <CompassIcon
                                    className="size-4 mr-2"
                                    data-icon="inline-start" />{" "}
                                Explore
                            </Link>
                        </Button>
                    </div>
                </EmptyContent>
            </Empty>
        </div>
    );
}
