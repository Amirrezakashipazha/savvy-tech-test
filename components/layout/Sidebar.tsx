"use client";

import Link from "next/link";
import { List, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  return (
    <aside
      className={cn(
        "hidden lg:flex fixed left-0 top-0 z-40 h-screen w-64 border-r bg-sidebar transition-transform flex-col",
        className
      )}
    >
      {/* Logo Section */}
      <div className="flex h-16 items-center border-b px-6 bg-sidebar">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground group-hover:bg-primary/90 transition-colors">
            <LayoutDashboard className="h-6 w-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-sidebar-foreground">
              SavvyTech
            </span>
            <span className="text-xs text-sidebar-foreground/70">
              List Manager
            </span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors bg-sidebar-accent text-sidebar-accent-foreground"
        >
          <List className="h-5 w-5" />
          <span>All Items</span>
        </Link>
      </nav>

      {/* Footer */}
      <div className="border-t p-4 bg-sidebar">
        <div className="text-xs text-sidebar-foreground/70">
          <p className="font-medium text-sidebar-foreground">Version 1.0.0</p>
          <p className="mt-1">© 2024 SavvyTech</p>
        </div>
      </div>
    </aside>
  );
}

