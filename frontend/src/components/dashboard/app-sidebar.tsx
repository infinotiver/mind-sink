"use client";

import * as React from "react";
import { NavMain } from "@/components/dashboard/nav-main";
import { NavProjects } from "@/components/dashboard/nav-projects";
import { NavSecondary } from "@/components/dashboard/nav-secondary";
import { NavUser } from "@/components/dashboard/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {FiHome, FiStar, FiGrid, FiPlus, FiSettings, FiList } from "react-icons/fi";
import { Link } from "react-router-dom";

const navMain = [
  { title: "Home", url: "/dashboard", isActive: true, icon: () => <FiHome /> },
  { title: "View Sinks", url: "/dashboard/all", icon: () => <FiGrid /> },
  { title: "Favourites", url: "/dashboard/favourites", icon: () => <FiStar /> },
  { title: "Create Sink", url: "/dashboard/create-sink", icon: () => <FiPlus /> },
  { title: "Add Image", url: "/dashboard/add-item", icon: () => <FiPlus /> },
];
const navSecondary = [
  { title: "Settings", url: "/dashboard/settings", icon: () => <FiSettings /> },
];

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  data: {
    user: {
      id: string | number;
      name: string;
      email: string;
      avatar: string;
    };
    projects: { name: string; url: string }[];
  };
}

export function AppSidebar({ data, ...props }: AppSidebarProps) {
  const sidebarData = {
    user: {
      id: data.user.id,
      name: data.user.name,
      email: data.user.email,
      avatar: data.user.avatar,
    },
    projects: data.projects.map(({ name, url }) => ({
      name,
      url,
      icon: () => <FiList />, // Default icon for projects
    })),
  };

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <img src="/ms.png" alt="" className="rounded" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Mind Sink</span>
                  <span className="truncate text-xs">FREE</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
        <NavProjects projects={sidebarData.projects} />
        <NavSecondary items={navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={sidebarData.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
