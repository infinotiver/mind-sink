'use client';

import * as React from 'react';
import { NavMain } from '@/components/dashboard/nav-main';
import { NavProjects } from '@/components/dashboard/nav-projects';
import { NavSecondary } from '@/components/dashboard/nav-secondary';
import { NavUser } from '@/components/dashboard/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { TbStar, TbLayoutDashboard, TbSettings, TbList } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import CreateActions from '@/components/dashboard/create-actions';
import { Separator } from '../ui/separator';

const navMain = [
  { title: 'View Sinks', url: '/dashboard/all', icon: () => <TbLayoutDashboard /> },
  { title: 'Favourites', url: '/dashboard/favourites', icon: () => <TbStar /> },
];

const navSecondary = [
  { title: 'Settings', url: '/dashboard/settings', icon: () => <TbSettings /> },
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
  // AppSidebar is now presentation-only; create/add logic lives in CreateActions

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

  // No-op handlers here — CreateActions owns the creation flows

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
        <div className="mx-3 mt-2">
          <CreateActions />
        </div>
        <NavMain items={navMain} />

        <Separator className="mt-1" />
        <NavProjects projects={sidebarData.projects} />
        <Separator className="mt-1" />
        <NavSecondary items={navSecondary} className="mt-auto" />
      </SidebarContent>

      {/* CreateActions contains the dropdown and dialogs */}

      <SidebarFooter>
        <NavUser user={sidebarData.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
