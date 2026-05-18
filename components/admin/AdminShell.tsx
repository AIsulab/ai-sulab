"use client";

import { useState } from "react";
import Navbar from "@/components/sulab/Navbar";
import { AdminSidebar } from "@/components/admin/AdminApp";

export function AdminShell({
  children,
  activeSidebar = "overview",
}: {
  children: React.ReactNode;
  activeSidebar?: string;
}) {
  const [tab, setTab] = useState(activeSidebar);

  return (
    <div className="min-h-screen">
      <Navbar active="admin" />
      <main className="px-3 lg:px-6 pt-6 pb-12">
        <div className="max-w-[1320px] mx-auto flex gap-5 items-start">
          <AdminSidebar tab={activeSidebar || tab} setTab={setTab} />
          <div className="flex-1 min-w-0">{children}</div>
        </div>
      </main>
    </div>
  );
}
