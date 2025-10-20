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
import { TbStar, TbLayoutDashboard, TbPlus, TbSettings, TbList, TbUpload } from "react-icons/tb";
import { Link } from "react-router-dom";
import { Separator } from "../ui/separator";
const navMain = [
  // { title: "Home", url: "/dashboard", isActive: true, icon: () => <TbHome /> },
  { title: "View Sinks", url: "/dashboard/all", icon: () => <TbLayoutDashboard /> },
  { title: "Favourites", url: "/dashboard/favourites", icon: () => <TbStar /> },
  { title: "Create Sink", url: "/dashboard/create-sink", icon: () => <TbPlus /> },
  { title: "Add Image", url: "/dashboard/add-item", icon: () => <TbUpload /> },
];
const navSecondary = [
  { title: "Settings", url: "/dashboard/settings", icon: () => <TbSettings /> },
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
      icon: () => <TbList />, // Default icon for projects
    })),
  };

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/dashboard">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <img src="/ms.png" alt="" className="rounded" />
                </div>
                <div className="grid flex-1 text-left text-lg leading-tight">
                  <span className="truncate font-semibold">Mind Sink</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
        <Separator className="mt-1" />
        <NavProjects projects={sidebarData.projects} />
        <Separator className="mt-1" />
        <NavSecondary items={navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={sidebarData.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
