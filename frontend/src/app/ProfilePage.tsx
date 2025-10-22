import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getUserProfile } from '@/api/profile';
import { FiShare } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import Loading from '@/components/ui/loading';
import ErrorAlert from '@/components/ui/error-alert';
import { Separator } from '@/components/ui/separator';
import { ShareDialog } from '@/components/dialogs/share-dialog';
import UserSinksGrid from '@/components/sinks/UserSinksGrid';

export default function ProfilePage() {
  const { userID } = useParams<{ userID: string }>();
  const {
    data: profile,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['userProfile', userID],
    queryFn: () => (userID ? getUserProfile(userID) : Promise.reject('User ID is missing')),
    enabled: !!userID,
  });

  if (isLoading) return <Loading message="Loading profile…" />;

  if (isError || !profile)
    return (
      <ErrorAlert
        title="Error loading profile"
        details={error instanceof Error ? error.message : String(error)}
      />
    );
  return (
    <div className="flex flex-col items-center p-6 gap-y-2">
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center">
        <span className="text-muted-foreground">
          <img src={profile.avatar_url} alt="No Profile Pic" className="rounded-4xl" />
        </span>
      </div>

      <h1 className="text-2xl font-semibold mt-4 text-primary italic font-lora">
        {profile.username}
      </h1>
      <a href="#" className="text-secondary-foreground hover:underline text-md"></a>
      <div className="flex text-sm gap-2 text-gray-400">
        {'@'}
        {profile.user_id}
        <Separator orientation="vertical" />
        <div className="text-foreground">
          Joined {new Date(profile.created_at).toLocaleDateString()}
        </div>
      </div>

      <ShareDialog
        title="Share profile"
        description="Share this profile with anyone. All profiles are public by default."
        url={`${window.location.origin}/users/${profile.user_id}`}
        trigger={
          <Button variant="secondary">
            <FiShare />
            Share Account
          </Button>
        }
      />
      <div className="mt-6 w-full text-center">
        <p className="text-sm font-medium text-muted-foreground">
          All accounts are public by default.
        </p>
      </div>
      {/* User's sinks */}
      <div className="w-full mt-8">
        <UserSinksGrid userId={profile.user_id} /> {/* Updated to use UserSinksGrid */}
      </div>
    </div>
  );
}

