import { useParams } from "react-router-dom";
import { FiShare } from "react-icons/fi";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const userID = useParams().userID;
  return (
    <div className="flex flex-col items-center p-6">
      <div className="w-32 h-32 bg-muted rounded-lg flex items-center justify-center">
        <span className="text-muted-foreground">No profile photo</span>
      </div>
      {/* <div> */}
      <h1 className="text-xl font-bold mt-4 text-primary">Display Name</h1>
      <a href="#" className="text-secondary-foreground hover:underline text-md">
        @{userID}
      </a>
      {/* </div> */}
      <div className="flex items-center gap-4 text-muted-foreground text-sm mt-2">
        Joined 2025-08-11
        <Button variant={"secondary"}>
                  <FiShare />
                  Share Account
        </Button>
      </div>
      <div className="mt-6 w-full text-center">
        <p className="text-sm font-medium text-muted-foreground">
          All accounts are private by default.
        </p>
      </div>
    </div>
  );
}
