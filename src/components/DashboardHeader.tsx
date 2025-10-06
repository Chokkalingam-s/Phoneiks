import React from 'react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from './ui/dropdown-menu';
import { 
  Bell, 
  Settings, 
  User, 
  LogOut, 
  Home,
  Search,
  HelpCircle
} from 'lucide-react';

interface DashboardHeaderProps {
  userProfile: {
    name: string;
    udid: string;
    disability: string;
    grade: string;
  };
  onLogout: () => void;
}

export function DashboardHeader({ userProfile, onLogout }: DashboardHeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-[#F77F00] to-[#FF9500] rounded-lg flex items-center justify-center">
                <span className="text-white font-semibold">P</span>
              </div>
              <span className="text-xl text-[#F77F00]">Phoeniks</span>
            </div>
            
            {/* Navigation Links */}
            <nav className="hidden md:flex items-center space-x-6 ml-8">
              <Button variant="ghost" className="text-gray-600 hover:text-[#F77F00]">
                <Home className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
              <Button variant="ghost" className="text-gray-600 hover:text-[#F77F00]">
                <Search className="h-4 w-4 mr-2" />
                Explore
              </Button>
              <Button variant="ghost" className="text-gray-600 hover:text-[#F77F00]">
                <HelpCircle className="h-4 w-4 mr-2" />
                Support
              </Button>
            </nav>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <Button
              variant="ghost"
              size="sm"
              className="relative text-gray-600 hover:text-[#F77F00]"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs flex items-center justify-center">
                <span className="sr-only">3 notifications</span>
              </span>
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-avatar.png" alt={userProfile.name} />
                    <AvatarFallback className="bg-[#F77F00] text-white">
                      {userProfile.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm leading-none">{userProfile.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      UDID: {userProfile.udid}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}