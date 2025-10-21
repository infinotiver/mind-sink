import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getUserProfile } from '@/api/profile';
import { getUserSinks } from '@/api/sinks';
import { FiShare } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import Loading from '@/components/ui/loading';
import ErrorAlert from '@/components/ui/error-alert';
import { Separator } from '@/components/ui/separator';
import { ShareDialog } from '@/components/ui/share-dialog';
import { Card } from '@/components/ui/card';
import type { Sink } from '@/api/sinks';

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
        <UserSinksGrid userId={profile.user_id} />
      </div>
    </div>
  );
}

function UserSinksGrid({ userId }: { userId: string }) {
  const {
    data: userSinks,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['userSinks', userId],
    queryFn: () => getUserSinks(userId),
    enabled: !!userId,
  });

  if (isLoading) return <Loading message="Loading sinks…" />;
  if (isError) return <ErrorAlert title="Error loading sinks" />;
  if (!userSinks || userSinks.length === 0) {
    return (
      <div className="rounded border border-dashed border-muted p-6 text-center">
        <h3 className="text-lg font-semibold">No sinks yet</h3>
        <p className="text-sm text-muted-foreground mt-2">
          This user hasn't created any sinks yet.
        </p>
        <div className="mt-4">
          <Link to="/dashboard" className="text-sm font-medium underline">
            Go to dashboard to create one
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-6 justify-center">
      {userSinks.map((sink: Sink) => (
        <Link key={sink._id} to={`/dashboard/sink/${sink._id}`} className="no-underline">
          <Card className="w-72 shadow-md hover:shadow-lg transition-shadow duration-150">
            <div className="p-4">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-lg font-semibold text-foreground truncate">{sink.title}</h3>
                <div className="text-xs text-muted-foreground px-2 py-1 rounded-md border border-input">
                  {sink.visibility}
                </div>
              </div>

              <p className="text-sm text-muted-foreground mt-2 h-14 overflow-hidden">
                {sink.description || 'No description'}
              </p>

              <div className="flex flex-wrap gap-2 mt-3">
                {(sink.tags || []).slice(0, 6).map(t => (
                  <span
                    key={t}
                    className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-3 text-xs text-muted-foreground flex items-center justify-between">
                <span>
                  {sink.created_at
                    ? `Created ${new Date(sink.created_at).toLocaleDateString()}`
                    : ''}
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  {sink._id.slice(0, 8)}
                </span>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}
