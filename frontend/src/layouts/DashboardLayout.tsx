import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { ModeToggle } from "@/components/mode-toggle";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { getUserSinks } from "@/api/sinks";
import type { Sink } from "@/api/sinks";

export default function DashboardLayout() {
  const { user } = useAuth();
  const { data, isLoading, error } = useQuery<Sink[]>({
    queryKey: ["sinks", user?.id],
    queryFn: () =>
      user?.id
        ? getUserSinks(user.user_id)
        : Promise.reject("User ID is missing. Please login first before trying to access the dashboard"),
  });
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to load item. {error.toString()}</p>;
  console.log("From the navbar", data);
  return (
    <>
      <SidebarProvider>
        <AppSidebar
          data={{
            user: {
              id: user?.user_id || 10000,
              name: user?.username || "Unknown User",
              email: user ? "Discord Login" : "Unknown login method",
              avatar: user?.avatar_url || "",
            },
            projects:
              data?.map((sink) => ({
                name: sink.title,
                url: `/dashboard/sink/${sink._id}`,
                
              })) || [],
          }}
        />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <Outlet />
          </div>
        </SidebarInset>
        <div className="fixed bottom-4 right-4 z-50">
          <ModeToggle />
        </div>
      </SidebarProvider>
    </>
  );
}
