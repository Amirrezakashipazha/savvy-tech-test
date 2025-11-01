"use client";

import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden lg:ml-64">
        <Header />
        <main className="flex-1 overflow-y-auto bg-background">
          <div className="container mx-auto p-4 sm:p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}

