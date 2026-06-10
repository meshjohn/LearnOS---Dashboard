import { Sidebar } from "@/components/dashboard/Sidebar";
import { MobileNav } from "@/components/dashboard/MobileNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#0a0a0f]">
      <Sidebar />

      <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
        {children}
      </main>

      <MobileNav />
    </div>
  );
}
