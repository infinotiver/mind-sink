import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "@/api/profile";
import { FiShare } from "react-icons/fi";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const { userID } = useParams<{ userID: string }>();
  const {
    data: profile,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["userProfile", userID],
    queryFn: () =>
      userID ? getUserProfile(userID) : Promise.reject("User ID is missing"),
    enabled: !!userID,
  });

  if (isLoading) {
    return <div className="p-6 text-center">Loading profile...</div>;
  }

  if (isError || !profile) {
    return (
      <div className="p-6 text-center">
        Error loading profile
        {error instanceof Error && (
          <div className="text-red-500 mt-2">{error.message}</div>
        )}
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center p-6">
      <div className="w-32 h-32 bg-muted rounded-lg flex items-center justify-center">
        <span className="text-muted-foreground"><img src={profile.avatar_url} alt="No Profile Pic"/></span>
      </div>
      {/* <div> */}
      <h1 className="text-xl font-bold mt-4 text-primary">
        {profile.username}
      </h1>
      <a
        href="#"
        className="text-secondary-foreground hover:underline text-md"
      ></a>
      <div className="flex">
        <div className="text-gray-400">@</div>
        {profile.user_id}
      </div>
      <div className="flex items-center gap-4 text-muted-foreground text-sm m-2">
        Joined {new Date(profile.created_at).toLocaleDateString()}
      </div>
      <Button variant="secondary">
        <FiShare />
        Share Account
      </Button>
      <div className="mt-6 w-full text-center">
        <p className="text-sm font-medium text-muted-foreground">
          All accounts are public by default.
        </p>
      </div>
    </div>
  );
}
