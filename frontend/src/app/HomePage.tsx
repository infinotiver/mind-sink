import { useRef, useLayoutEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Navbar from '@/components/common/navbar';
import { Button } from '@/components/ui/button';
import { ButtonGroup, ButtonGroupSeparator } from '@/components/ui/button-group';
import { Separator } from '@/components/ui/separator';
// import DevStatePanel from "@/components/common/DevStatsPanel";
import { ModeToggle } from '@/components/mode-toggle';
import { Link } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa';

export default function HomePage() {
  const scrollRef = useRef(null);
  const { scrollY } = useScroll();

  const [vh, setVh] = useState(1000);
  useLayoutEffect(() => {
    setVh(window.innerHeight);
  }, []);

  const clipPath = useTransform(
    scrollY,
    [0, vh * 0.6],
    ['circle(100% at center)', 'circle(0% at center)']
  );
  const overlayOpacity = useTransform(scrollY, [0, vh * 0.6], [1, 0]);

  const bgOpacity = useTransform(scrollY, [vh * 0.55, vh], [0, 1]);
  const bgScale = useTransform(scrollY, [vh * 0.55, vh], [1.05, 1]);
  // only profile and item previews now; dashboard is shown as hero image
  const [preview, setPreview] = useState<'profile' | 'item'>('profile');

  return (
    <div ref={scrollRef} className="relative bg-background">
      {/* Overlay */}
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-white"
        style={{ clipPath, opacity: overlayOpacity }}
      >
        <h1 className="text-center text-3xl sm:text-5xl font-medium text-black px-4 leading-20">
          Don’t let your thoughts get <span className="font-lora italic">lost</span>
        </h1>
      </motion.div>

      {/* Spacer to push main content down so it's fully visible after overlay */}
      <div style={{ height: vh }} />

      {/* Main content */}
      <motion.div style={{ opacity: bgOpacity, scale: bgScale }}>
        <Navbar />
        <div className="flex flex-col items-center justify-center text-center gap-y-4 min-h-screen px-4 sm:px-8">
          <h2 className="text-[min(12vw,44px)] sm:text-[min(10vw,64px)] md:text-[min(8vw,84px)] font-semibold mt-6 sm:mt-8 mb-2 sm:mb-4 flex items-center justify-center gap-3 md:gap-4 leading-tight">
            Let your thoughts <span className="text-foreground">sink</span>
          </h2>
          <div className="sm:px-8 text-sm sm:text-base md:text-lg text-foreground md:max-w-[60vw] leading-snug sm:leading-normal font-medium">
            Mind Sink is
            <span className="chip">ad-free</span>,<span className="chip">distraction-less</span>,
            <span className="chip">Pinterest-like</span>
            simple image and inspiration organizer with
            <span className="chip">no infinite scroll</span>
            so you focus on what matters
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-4 w-full">
            <Link to={'/dashboard'}>
              <Button
          variant="default"
          size="lg"
          className="font-semibold group flex items-center justify-center"
              >
          Get Started{' '}
          <FaChevronRight className="size-2.5 text-md group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
            </Link>
            <a href="https://github.com/infinotiver/mind-sink">
              <Button variant="outline" size="lg" className="font-semibold">
          Learn More
              </Button>
            </a>
            <Link to={'/manifesto'}>
              <Button variant="secondary" size="lg" className="font-semibold">
          Read Manifesto
              </Button>
            </Link>
          </div>
          <div className="text-muted-foreground text-xs sm:text-sm font-lora italic leading-tight">
            The project is still in alpha phase of development. For a list of{' '}
            <a
              href="https://github.com/infinotiver/mind-sink/issues"
              className="text-muted-foreground underline hover:text-blue-600"
            >
              known issues
            </a>
            , refer to the GitHub Repo.
          </div>
        </div>
        <div className="flex justify-center items-center m-2 md:m-6 lg:m-8">
          <img
            src="/dashboard.png"
            alt="Dashboard Demo"
            className="rounded-lg shadow-lg max-w-[80vw] h-auto object-contain object-center"
          />
        </div>
        <div className="mx-auto max-w-6xl px-4 py-8">
          {/* preview state */}
          <div className="flex justify-center mb-4">
            <ButtonGroup aria-label="Preview selector">
              <Button
                onClick={() => setPreview('profile')}
                variant={preview === 'profile' ? 'default' : 'outline'}
              >
                Profile
              </Button>
              <ButtonGroupSeparator />
              <Button
                onClick={() => setPreview('item')}
                variant={preview === 'item' ? 'default' : 'outline'}
              >
                Item View
              </Button>
            </ButtonGroup>
          </div>

          <div className="relative">
            {/* subtle blurred background behind preview */}
            <div className="absolute inset-0 -z-10 flex items-center justify-center">
              <div className="w-[80%] h-[60%] bg-gradient-to-r from-accent/10 via-transparent to-accent/10 blur-3xl rounded-lg" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                <div
                  className={`lg:col-span-2 ${preview === 'profile' ? 'lg:order-2' : 'lg:order-1'}`}
                >
                  <div className="relative w-full rounded-lg overflow-hidden shadow-lg min-h-[56vh]">
                    <img
                      src={preview === 'profile' ? '/profile.png' : '/itemview.png'}
                      alt={preview}
                      className="absolute inset-0 w-full h-full object-contain"
                    />
                  </div>
                </div>
                <div
                  className={`lg:col-span-1 ${preview === 'profile' ? 'lg:order-1' : 'lg:order-2'}`}
                >
                  <h3 className="text-2xl font-semibold mb-2">
                    {preview === 'profile' ? 'Profile' : 'Item View'}
                  </h3>
                  <p className="text-base text-muted-foreground">
                    {preview === 'profile'
                      ? 'Public profiles showcase your sinks and let others explore your collections. Profiles are simple and shareable.'
                      : 'Inspect items in detail, add tags, and manage content without leaving the flow.'}
                  </p>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {preview === 'profile'
                      ? 'Share or copy a profile link easily using the share dialog.'
                      : 'Item view provides context and tools to update tags or remove items quickly.'}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-4">
          <Separator className="my-6" />
        </div>

        <div className="text-xs text-muted-foreground text-center my-4">
          Built with ❤️ using React, TypeScript, and Framer Motion by{' '}
          <a
            href="https://github.com/infinotiver"
            className="hover:text-accent-foreground underline"
          >
            infinotiver
          </a>
          .&nbsp;Feel free to{' '}
          <a
            href="https://github.com/infinotiver/mind-sink/issues/new"
            className="hover:text-accent-foreground underline"
            id="contact"
          >
            open an issue on GitHub
          </a>
          .
        </div>
        <div className="fixed bottom-4 right-4">
          <ModeToggle />
        </div>
        {/* <DevStatePanel /> */}
      </motion.div>
    </div>
  );
}
