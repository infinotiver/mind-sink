import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { FaDiscord } from "react-icons/fa";
export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-8", className)} {...props}>
      <form>
        <div className="flex flex-col items-center gap-4">
          <a href="#" className="flex flex-col items-center gap-2 font-medium">
            <div className="flex size-8 items-center justify-center rounded-md">
            </div>
            <span className="sr-only">Mind Sink</span>
          </a>
          <h1 className="text-xl font-bold">Welcome to Mind Sink</h1>
          
        </div>
        <div className="flex flex-col gap-4 mt-4" >
          <Button
            type="button"
            className="w-full"
          >
            <FaDiscord />
            Login with Discord
          </Button>
        </div>
      </form>
    </div>
  );
}
