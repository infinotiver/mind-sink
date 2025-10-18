import { useRef, useLayoutEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "@/components/common/navbar";
import { Button } from "@/components/ui/button";
// import DevStatePanel from "@/components/common/DevStatsPanel";
import { ModeToggle } from "@/components/mode-toggle";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";

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
          <h2 className="text-[min(8vw,84px)] font-medium mt-6 sm:mt-8 mb-3 sm:mb-4 flex items-center justify-center gap-3 md:gap-4">
            Let your thoughts <span className="font-lora italic">sink</span>
          </h2>
          <div className="sm:px-8 text-lg/10 sm:text-md/8 text-foreground md:max-w-[60vw]">
            Mind Sink is
            <span className="chip">ad-free</span>,
            <span className="chip">distraction-less</span>,
            <span className="chip">Pinterest-like</span>
            simple image and inspiration organizer with
            <span className="chip">no infinite scroll</span>
            so you focus on what matters
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-4 w-full">
            <Link to={"/dashboard"}>
              <Button
                variant="default"
                size="lg"
                className="min-w-[20vw] group flex items-center justify-center"
              >
                Get Started{" "}
                <FaChevronRight className="size-2.5 text-md group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
            </Link>
            <a href="https://github.com/infinotiver/mind-sink">
              <Button variant="outline" size="lg">
                Learn More
              </Button>
              <Link to={"/manifesto"}>
                <Button variant="secondary" size="lg">
                  Read Manifesto
                </Button>
              </Link>
            </a>
          </div>
          <div>
            The project is still in alpha phase of development. For a list of{" "}
            <a
              href="https://github.com/infinotiver/mind-sink/issues"
              className="text-muted-foreground underline hover:text-blue-600"
            >
              known issues
            </a>
            , refer to the GitHub Repo.
          </div>
        </div>
        <div className="m-2 md:m-6 lg:m-8">
          <img
            src="/dashboard.png"
            alt="Dashboard Demo"
            className="rounded-lg shadow-lg max-w-full h-auto"
          />
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 m-4 sm:m-6 text-sm text-muted-foreground text-center sm:text-left">
          Built with ❤️ using React, TypeScript, and Framer Motion by{" "}
          <a
            href="https://github.com/infinotiver"
            className="text-muted-foreground hover:text-accent-foreground bg-secondary px-2 py-1 border border-border rounded"
          >
            infinotiver
          </a>
          and feel free to{" "}
          <a
            href="https://github.com/infinotiver/mind-sink/issues/new"
            className="text-muted-foreground hover:text-accent-foreground bg-secondary px-2 py-1 border border-border rounded"
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
