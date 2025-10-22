import Navbar from '@/components/common/navbar';
import { Button } from '@/components/ui/button';
import { FaDiscord } from 'react-icons/fa';
import { TbBrandGoogle, TbBrandGithub } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <div className="h-screen flex flex-col items-center justify-center gap-4 px-4 ">
        <div className="w-full max-w-xs text-center">
          <div className="rounded-2xl border-2 bg-accent/25 backdrop-blur-3xl shadow-md py-6 px-5">
            <div className="flex items-center justify-center gap-3">
              <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
                Login or Create an Account
              </h1>
            </div>
          </div>
        </div>
        <Button
          variant="default"
          size="lg"
          className="flex items-center gap-2 w-full max-w-xs"
          asChild
          shortcut="Ctrl+L"
        >
          <Link to={`${import.meta.env.VITE_API_URL}/auth/login`}>
            <FaDiscord />
            Login with Discord
          </Link>
        </Button>

        <div className="w-full max-w-xs">
          <Separator className="my-2" />
        </div>

        <div className="flex flex-col gap-2 w-full max-w-xs">
          <Button
            variant="outline"
            size="lg"
            className="w-full flex items-center justify-center gap-3"
            disabled
          >
            <TbBrandGoogle />
            Login with Google
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="w-full flex items-center justify-center gap-3"
            disabled
          >
            <TbBrandGithub />
            Login withGitHub
          </Button>
        </div>
      </div>
    </>
  );
}
