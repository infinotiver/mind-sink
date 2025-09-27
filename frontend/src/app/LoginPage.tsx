import Navbar from "@/components/common/navbar";
import { Button } from "@/components/ui/button";
import { FaDiscord } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <div className="h-screen flex flex-col items-center justify-center">
        <Button
          variant="outline"
          size="lg"
          className="flex items-center gap-2"
          asChild
        >
          <Link to={`${import.meta.env.VITE_API_URL}/auth/login`}>
            <FaDiscord />
            Login with Discord
          </Link>
        </Button>
      </div>
    </>
  );
}
