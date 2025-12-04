import {
  NavigationMenu,
  NavigationMenuIndicator,
  NavigationMenuItem,
  // NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuViewport,
} from '@/components/ui/navigation-menu';

import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthProvider';
import StaggeredMenu from '@/components/StaggeredMenu';

export default function Navbar() {
  const { user } = useAuth();
  const isLoggedIn = !!user;

  const menuItems = [
    { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
    { label: 'About', ariaLabel: 'Learn about us', link: '/about' },
    { label: 'Services', ariaLabel: 'View our services', link: '/services' },
    { label: 'Contact', ariaLabel: 'Get in touch', link: '/contact' },
  ];

  const socialItems = [
    { label: 'GitHub', link: 'https://github.com/infinotiver/mind-sink' },
  ];

  // no-op: keyboard registrations handled elsewhere
  return (
    <header
      role="navigation"
      aria-label="Main navigation"
      className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[80%] max-w-4xl"
    >
      <div className="flex items-center p-1 rounded-2xl">
        {/* Mobile: hamburger left + auth button right */}
        {/* Mobile: hamburger left, logo center, auth right */}
        <div className="flex w-full items-center justify-between md:hidden">
          <div>
            <StaggeredMenu
              position="right"
              items={menuItems}
              socialItems={socialItems}
              isFixed={true}
              displaySocials={true}
              displayItemNumbering={true}
              menuButtonColor="#fff"
              openMenuButtonColor="#fff"
              changeMenuColorOnOpen={true}
              colors={['#B19EEF', '#5227FF']}
              logoUrl="/ms.png"
              accentColor="#ff6b6b"
              onMenuOpen={() => console.log('Menu opened')}
              onMenuClose={() => console.log('Menu closed')}
            />
          </div>

          <Link to="/" className="mx-auto">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-accent/90">
              <img src="/ms.png" alt="Logo" className="h-7 w-7 rounded-full" />
            </div>
          </Link>

          <Link to={isLoggedIn ? '/dashboard' : '/login'}>
            <Button className="rounded-full px-3 py-2" variant="default">
              {isLoggedIn ? 'Open' : 'Login'}
            </Button>
          </Link>
        </div>

        {/* Desktop: left links + centered logo + right auth button */}
        <div className="hidden md:flex items-center w-full justify-center">
          <div className="rounded-3xl bg-white/6 backdrop-blur-xl p-1 shadow-sm border border-white/10 flex items-center space-x-4">
            <Link
              to="/"
              className="flex items-center gap-3 bg-white/25 px-3 py-2 rounded-3xl hover:bg-white/10 transition-colors"
            >
              <img src="/ms.png" alt="Logo" className="h-7 w-7 rounded-full" />
              <span className="font-semibold text-foreground">Mind Sink</span>
            </Link>

            <NavigationMenu>
              <NavigationMenuList className="flex items-center space-x-1">
                <NavigationMenuItem asChild>
                  <Link
                    to="/"
                    className="hover:bg-primary/10 hover:text-primary transition-colors duration-200 rounded-3xl px-4 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
                  >
                    Home
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem asChild>
                  <Link
                    to="/manifesto"
                    className="hover:bg-primary/10 hover:text-primary transition-colors duration-200 rounded-3xl px-4 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
                  >
                    Manifesto
                  </Link>
                </NavigationMenuItem>
                
              </NavigationMenuList>
              <NavigationMenuIndicator />
              <NavigationMenuViewport />
            </NavigationMenu>
            <Link
              to={isLoggedIn ? '/dashboard' : '/login'}
              className="flex items-center"
              aria-label={isLoggedIn ? 'Open dashboard' : 'Login'}
            >
              {' '}
              <Button size={'lg'} className="rounded-full font-medium ">
                <span className="font-medium">{isLoggedIn ? 'Open Dashboard' : 'Login'}</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
