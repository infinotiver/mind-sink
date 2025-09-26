import { useRef, useLayoutEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "@/components/common/navbar";
import { Button } from "@/components/ui/button";
// import DevStatePanel from "@/components/common/DevStatsPanel";
import { ModeToggle } from "@/components/mode-toggle";
import { Link } from "react-router-dom";

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
    ["circle(100% at center)", "circle(0% at center)"]
  );
  const overlayOpacity = useTransform(scrollY, [0, vh * 0.6], [1, 0]);

  const bgOpacity = useTransform(scrollY, [vh * 0.55, vh], [0, 1]);
  const bgScale = useTransform(scrollY, [vh * 0.55, vh], [1.05, 1]);

  return (
    <div ref={scrollRef} className="relative bg-background">
      {/* Overlay */}
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-white"
        style={{ clipPath, opacity: overlayOpacity }}
      >
        <h1 className="text-center text-3xl sm:text-5xl font-medium text-black px-4 leading-20">
          Don’t let your thoughts get{" "}
          <span className="font-lora italic">lost</span>
        </h1>
      </motion.div>

      {/* Spacer to push main content down so it's fully visible after overlay */}
      <div style={{ height: vh }} />

      {/* Main content */}
      <motion.div style={{ opacity: bgOpacity, scale: bgScale }}>
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-screen text-center gap-y-4 px-4 sm:px-8">
          <h1 className="text-[min(8vw,84px)] font-medium mt-6 sm:mt-8 mb-3 sm:mb-4 flex flex-wrap items-center justify-center gap-3 md:gap-4">
            Let your thoughts <span className="font-lora italic">sink</span>.
          </h1>
          <div className="sm:px-8 text-lg/10 sm:text-md/8 text-foreground md:max-w-[60vw]">
            Mind Sink is
            <span className="chip">ad-free</span>,
            <span className="chip">distraction-less</span>,
            <span className="chip">Pinterest-like</span>
            simple image and inspiration organizer with
            <span className="chip">no infinite scroll</span>
            so you focus on what matters
          </div>
          <div className="mt-8 flex flex-wrap space-x-4 w-full justify-center">
            <Link to={"/dashboard"}>
              <Button variant="default" size="lg" className="min-w-[20vw]">
                Get Started
              </Button>
            </Link>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </div>
        <div className="fixed bottom-4 right-4">
          <ModeToggle />
        </div>
        {/* <DevStatePanel /> */}
      </motion.div>
    </div>
  );
}
