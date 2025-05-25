'use client';

import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/components/ui/button';
import { Sun, Moon, Users, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { signOut, useSession } from 'next-auth/react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

export function Header() {
  const { theme, setTheme } = useTheme();
  const { data: session } = useSession();

  return (
    <header className="h-16 border-b sticky top-0 z-30 bg-background animate-in fade-in-50 duration-500">
      <div className="h-full container flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold">HR Dashboard</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                {theme === 'dark' ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme('light')}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('system')}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src={session?.user?.image || "https://github.com/shadcn.png"} alt={session?.user?.name || "User"} />
                <AvatarFallback>{session?.user?.name?.[0] || "U"}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => signOut()}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}