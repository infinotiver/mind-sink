import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { ModeToggle } from "@/components/mode-toggle";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider"; 

export default function DashboardLayout() {
  const {user} = useAuth();
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
            projects: [
              { name: "Blue Board", url: "/dashboard/sink/1" },
              { name: "Aesthetic Project Covers", url: "/dashboard/sink/2" },
            ],
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
        <div className="fixed bottom-4 right-4">
          <ModeToggle />
        </div>
      </SidebarProvider>
    </>
  );
}
