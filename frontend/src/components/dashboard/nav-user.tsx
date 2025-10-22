'use client';

import { TbUser, TbLogout, TbBrandGithub, TbChevronDown } from 'react-icons/tb';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ConfirmDialog } from '@/components/dialogs/confirm-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthProvider';
import { useEffect } from 'react';
import useShortcuts from '@/components/shortcuts/useShortcuts';

export function NavUser({
  user,
}: {
  user: {
    id: string | number;
    name: string;
    email: string;
    avatar: string;
  };
}) {
  const { isMobile } = useSidebar();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const shortcuts = useShortcuts();

  useEffect(() => {
    const openProfile = () => navigate(`/users/${user.id}`);
    const doLogout = () => {
      logout();
      navigate('/');
    };
    shortcuts.register('p', openProfile, 'Open Profile');
    shortcuts.register('o', doLogout, 'Log out');
    return () => {
      shortcuts.unregister('p', openProfile);
      shortcuts.unregister('o', doLogout);
    };
  }, [shortcuts, navigate, logout, user.id]);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <TbChevronDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link to={`/users/${user.id}`}>
                  <TbUser />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <TbBrandGithub />
                View source code
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <ConfirmDialog
              title="Log out of Mind Sink?"
              description="You'll need to log in again to access your sinks and items."
              confirmText="Log out"
              variant="destructive"
              trigger={
                <DropdownMenuItem onSelect={e => e.preventDefault()}>
                  <TbLogout />
                  Log out
                </DropdownMenuItem>
              }
              onConfirm={() => {
                logout();
                navigate('/');
              }}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
