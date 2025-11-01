"use client";

import { Bell, Search, User, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {

  return (
    <header
      className={cn(
        "sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6",
        className
      )}
    >
      {/* Mobile Logo */}
      <div className="flex lg:hidden items-center gap-2 mr-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <LayoutDashboard className="h-5 w-5" />
        </div>
        <span className="text-lg font-bold">SavvyTech</span>
      </div>

      <div className="flex flex-1 items-center gap-4">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md hidden sm:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search items..."
            className="w-full rounded-md border border-input bg-background px-9 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          />
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative hidden sm:flex">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
        <Button variant="ghost" size="icon">
          <User className="h-5 w-5" />
          <span className="sr-only">User menu</span>
        </Button>
      </div>
    </header>
  );
}

