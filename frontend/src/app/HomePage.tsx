import Navbar from '@/components/common/navbar';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import { Link } from 'react-router-dom';
import ColorBends from '@/components/ColorBends';
import CircularGallery from '@/components/CircularGallery';

export default function HomePage() {
  const galleryItems: Array<{ image: string; text: string }> = [
    {
      image: 'https://cdn.cosmos.so/a809f001-191c-402f-ba04-4e7ce29a0255?format=jpeg',
      text: 'The North American XB-70A',
    },
    {
      image: 'https://cdn.cosmos.so/10a65136-ee1e-42a8-965d-2556d8b43e3e?format=jpeg',
      text: 'Divers in Sicily',
    },
    {
      image: 'https://cdn.cosmos.so/a1014620-5489-4041-91e1-4c3346d83aca?format=jpeg',
      text: 'Desk Setup',
    },
    {
      image: 'https://cdn.cosmos.so/a50a4847-8a43-4cfe-8487-b2e264b9d40b?format=jpeg',
      text: 'Numbers',
    },
    {
      image: 'https://cdn.cosmos.so/d47f004b-7db7-4549-8fc2-5b8331d68da7?format=jpeg',
      text: 'Poster',
    },
  ];
  return (
    <div className="relative min-h-screen overflow-hidden bg-transparent flex flex-col">
      {/* Fullscreen animated background (ColorBends) */}
      <div className="absolute inset-0 -z-10 w-full h-full pointer-events-none" aria-hidden="true">
        <ColorBends
          className="w-full h-full opacity-90"
          colors={['#1f025dff', '#8a5cff', '#01496dff']}
          rotation={0}
          speed={0.12}
          scale={1.18}
          frequency={1.5}
          warpStrength={1.1}
          mouseInfluence={0.8}
          parallax={0.6}
          noise={1}
        />
      </div>

      {/* Transparent navbar so ColorBends shows through */}
      <header className="relative z-20 bg-transparent">
        <Navbar />
      </header>

      {/* Simple professional hero */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 pt-24 pb-12 lg:pt-28 lg:pb-20">
        <h1 className="text-5xl sm:text-6xl md:text-[4.5rem] font-bold leading-[0.9] tracking-tight max-w-3xl">
          Let your thoughts <span className="text-foreground">sink</span>
        </h1>

        <p className="mt-4 text-base sm:text-lg text-foreground max-w-2xl">
          Ad-free, focused image organizer — no infinite scroll.
        </p>

        <div className="mt-6 flex gap-4 justify-center">
          <Link to="/dashboard">
            <Button
              size="default"
              className="font-semibold rounded-full px-8 py-3 bg-white text-black shadow-lg"
            >
              Get Started
            </Button>
          </Link>

          <a href="https://github.com/infinotiver/mind-sink">
            <Button
              variant="outline"
              size="default"
              className="font-semibold rounded-full px-6 py-3"
            >
              Learn More
            </Button>
          </a>
        </div>

        {/* Circular gallery showcase */}
        <div
          style={{ height: '600px', position: 'relative' }}
          className="w-full max-w-6xl mx-auto mt-12"
        >
          <CircularGallery
            bend={1.5}
            textColor="#ffffff"
            borderRadius={0.02}
            scrollEase={0.02}
            items={galleryItems}
          />
        </div>
      </main>

      <div className="fixed bottom-4 right-4 z-30">
        <ModeToggle />
      </div>
      {/* Small disclaimer bubble */}
      <div className="fixed left-4 bottom-6 z-30">
        <div className="max-w-xs bg-black/50 backdrop-blur-sm text-xs text-white px-3 py-2 rounded-md shadow-md">
          Images are property of their owners — collected from Pinterest, are.na, workspace.so, and
          similar services (via cosmos.so).
        </div>
      </div>
    </div>
  );
}
