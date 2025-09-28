import { useQuery } from "@tanstack/react-query";
import { getUserSinks } from "@/api/sinks";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useAuth } from "@/context/AuthProvider";
import type { Sink } from "@/api/sinks";
import { Link } from "react-router-dom";
export default function ViewSinksPage() {
  const { user } = useAuth();
  const {
    data: userSinks,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["userSinks"],
    queryFn: () => getUserSinks(user ? user.user_id : ""),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading sinks.</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {userSinks.map((sink: Sink) => (
        <Link to={`/dashboard/sink/${sink._id}`}>
          <Card key={sink._id} className="shadow-md">
            <CardHeader>
              <CardTitle>{sink.title}</CardTitle>
            </CardHeader>
            <CardContent>
                      <p>{sink.description}</p>
                      
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
