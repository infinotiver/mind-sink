import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import Loading from '@/components/ui/loading';
import ErrorAlert from '@/components/ui/error-alert';
import { useQuery } from '@tanstack/react-query';
import { getUserSinks } from '@/api/sinks';
import type { Sink } from '@/api/sinks';

export default function UserSinksGrid({ userId }: { userId: string }) {
  const {
    data: userSinks,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['userSinks', userId],
    queryFn: () => getUserSinks(userId),
    enabled: !!userId,
  });

  if (isLoading) return <Loading message="Loading sinks..." />;
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
                  {sink._id.slice(0, 6)}
                </span>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}
