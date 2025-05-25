'use client';

import Link from 'next/link';
import { 
  LayoutDashboard, 
  BookmarkIcon, 
  BarChart4, 
  Users,
  Menu,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface SideNavigationProps {
  currentPath: string;
}

export function SideNavigation({ currentPath }: SideNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    {
      label: 'Dashboard',
      href: '/',
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      label: 'Employees',
      href: '/employees',
      icon: <Users className="h-5 w-5" />,
    },
    {
      label: 'Bookmarks',
      href: '/bookmarks',
      icon: <BookmarkIcon className="h-5 w-5" />,
    },
    {
      label: 'Analytics',
      href: '/analytics',
      icon: <BarChart4 className="h-5 w-5" />,
    },
  ];

  return (
    <>
      <div className="md:hidden p-4">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleMenu}
          className="md:hidden"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      <nav
        className={cn(
          "bg-card border-r fixed md:static h-[calc(100vh-64px)] md:h-auto w-64 z-40 transition-transform md:transform-none",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-4">
          <div className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center px-4 py-3 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors",
                  currentPath === item.href
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground"
                )}
              >
                {item.icon}
                <span className="ml-3">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Overlay to close menu when clicked outside */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}