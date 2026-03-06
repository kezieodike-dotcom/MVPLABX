import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronRight, Menu, X } from 'lucide-react';
import { Button } from './button';
import { AnimatedGroup } from './animated-group';
import { cn } from '../../lib/utils';

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
};

interface HeroSectionProps {
  badgeLabel?: string;
  badgeLink?: string;
  badgeHint?: string;
  title: string;
  description: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  primaryLink?: string;
  secondaryLink?: string;
  backgroundImage?: string;
  appScreenshot?: string;
  appScreenshotLight?: string;
  customers?: { name: string; logo: string }[];
  showCustomers?: boolean;
}

export function HeroSection({
  badgeLabel = 'Get started',
  badgeLink = '#link',
  badgeHint = 'Introducing Support for AI Models',
  title = 'Modern Solutions for Customer Engagement',
  description = 'Highly customizable components for building modern websites and applications that look and feel the way you mean it.',
  primaryLabel = 'Start Building',
  secondaryLabel = 'Request a demo',
  primaryLink = '#link',
  secondaryLink = '#link',
  backgroundImage = 'https://ik.imagekit.io/lrigu76hy/tailark/night-background.jpg?updatedAt=1745733451120',
  appScreenshot = 'https://tailark.com//_next/image?url=%2Fmail2.png&w=3840&q=75',
  appScreenshotLight = 'https://tailark.com/_next/image?url=%2Fmail2-light.png&w=3840&q=75',
  customers = [],
  showCustomers = true,
}: HeroSectionProps) {
  const navigate = useNavigate();

  return (
    <>
      <HeroHeader />
      <main className="overflow-hidden">
        <div
          aria-hidden
          className="z-[2] absolute inset-0 pointer-events-none isolate opacity-50 contain-strict hidden lg:block">
          <div className="w-[35rem] h-[80rem] -translate-y-[350px] absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
          <div className="h-[80rem] absolute left-0 top-0 w-56 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
          <div className="h-[80rem] -translate-y-[350px] absolute left-0 top-0 w-56 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
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
                src={backgroundImage}
                alt="background"
                className="absolute inset-x-0 top-56 -z-20 hidden lg:top-32 lg:block"
                width="3276"
                height="4095"
                style={{ display: 'none' }}
              />
            </AnimatedGroup>
            <div aria-hidden className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,#000_75%)]" />
            <div className="mx-auto max-w-7xl px-6">
              <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
                <AnimatedGroup variants={transitionVariants}>
                  <Link
                    to={badgeLink}
                    className="hover:bg-zinc-800 bg-zinc-900/50 group mx-auto flex w-fit items-center gap-4 rounded-full border border-white/10 p-1 pl-4 shadow-md shadow-black/5 transition-all duration-300">
                    <span className="text-gray-300 text-sm">{badgeHint}</span>
                    <span className="block h-4 w-0.5 border-l bg-white/50"></span>

                    <div className="bg-zinc-800 group-hover:bg-zinc-700 size-6 overflow-hidden rounded-full duration-500">
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

                  <h1
                    className="mt-8 max-w-4xl mx-auto text-balance text-6xl md:text-7xl lg:mt-16 xl:text-[5.25rem]">
                    {title}
                  </h1>
                  <p
                    className="mx-auto mt-8 max-w-2xl text-balance text-lg text-gray-400">
                    {description}
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
                    className="bg-purple-600/10 rounded-[14px] border border-purple-500/20 p-0.5">
                    <Button
                      size="lg"
                      onClick={() => navigate(primaryLink)}
                      className="rounded-xl px-5 text-base bg-purple-600 hover:bg-purple-500 text-white">
                      <span className="text-nowrap">{primaryLabel}</span>
                    </Button>
                  </div>
                  <Button
                    key={2}
                    variant="ghost"
                    onClick={() => navigate(secondaryLink)}
                    className="h-10.5 rounded-xl px-5 text-gray-300 hover:text-white hover:bg-white/5">
                    <span className="text-nowrap">{secondaryLabel}</span>
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
                  className="bg-gradient-to-b to-black absolute inset-0 z-10 from-transparent from-35%"
                />
                <div className="inset-shadow-2xs ring-gray-800 bg-zinc-900/50 relative mx-auto max-w-6xl overflow-hidden rounded-2xl border border-white/10 p-4 shadow-lg shadow-zinc-950/15 ring-1">
                  <img
                    className="aspect-15/8 relative rounded-2xl"
                    src={appScreenshot}
                    alt="app screen"
                    width="2700"
                    height="1440"
                  />
                </div>
              </div>
            </AnimatedGroup>
          </div>
        </section>
        {showCustomers && customers.length > 0 && (
          <section className="bg-black pb-16 pt-16 md:pb-32">
            <div className="group relative m-auto max-w-5xl px-6">
              <div className="absolute inset-0 z-10 flex scale-95 items-center justify-center opacity-0 duration-500 group-hover:scale-100 group-hover:opacity-100">
                <Link
                  to="#customers"
                  className="block text-sm duration-150 hover:opacity-75 text-gray-400 hover:text-white">
                  <span> Meet Our Community Partners</span>
                  <ChevronRight className="ml-1 inline-block size-3" />
                </Link>
              </div>
              <div className="group-hover:blur-xs mx-auto mt-12 grid max-w-2xl grid-cols-4 gap-x-12 gap-y-8 transition-all duration-500 group-hover:opacity-50 sm:gap-x-16 sm:gap-y-14">
                {customers.map((customer, index) => (
                  <div key={index} className="flex">
                    <img
                      className="mx-auto h-5 w-fit opacity-50 hover:opacity-100 transition-opacity"
                      src={customer.logo}
                      alt={`${customer.name} Logo`}
                      height="20"
                      width="auto"
                      style={{ filter: 'brightness(0) invert(1)' }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}

const menuItems = [
  { name: 'Home', href: '/' },
  { name: 'Community', href: '/community' },
  { name: 'Products', href: '#apps' },
  { name: 'Invest', href: '#investment' },
];

const HeroHeader = () => {
  const [menuState, setMenuState] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header>
      <nav
        data-state={menuState && 'active'}
        className="fixed z-20 w-full px-2 group">
        <div className={cn('mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12', isScrolled && 'bg-black/80 max-w-4xl rounded-2xl border border-white/10 backdrop-blur-lg lg:px-5')}>
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            <div className="flex w-full justify-between lg:w-auto">
              <Link
                to="/"
                aria-label="home"
                className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-tr from-purple-600 to-blue-500 rounded-lg flex items-center justify-center font-bold text-lg text-white">M</div>
                <span className="font-bold text-xl tracking-tight text-white">MVPLABX</span>
              </Link>

              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState == true ? 'Close Menu' : 'Open Menu'}
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                <Menu className="in-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 m-auto size-6 duration-200 text-white" />
                <X className="group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200 text-white" />
              </button>
            </div>

            <div className="absolute inset-0 m-auto hidden size-fit lg:block">
              <ul className="flex gap-8 text-sm">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      to={item.href}
                      className="text-gray-400 hover:text-white block duration-150">
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-black group-data-[state=active]:block lg:group-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border border-white/10 p-6 shadow-2xl md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none">
              <div className="lg:hidden">
                <ul className="space-y-6 text-base">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <Link
                        to={item.href}
                        className="text-gray-400 hover:text-white block duration-150">
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/coming-soon')}
                  className={cn(isScrolled && 'lg:hidden', 'border-white/20 text-white hover:bg-white/5')}>
                  <span>Login</span>
                </Button>
                <Button
                  size="sm"
                  onClick={() => navigate('/coming-soon')}
                  className={cn(isScrolled && 'lg:hidden', 'bg-purple-600 hover:bg-purple-500 text-white')}>
                  <span>Sign Up</span>
                </Button>
                <Button
                  size="sm"
                  onClick={() => navigate('/coming-soon')}
                  className={cn(isScrolled ? 'lg:inline-flex' : 'hidden', 'bg-purple-600 hover:bg-purple-500 text-white')}>
                  <span>Get Started</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
