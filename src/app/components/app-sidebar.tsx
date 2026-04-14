import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" className="mt-16">
      <SidebarHeader className="flex-row items-center justify-between px-2 py-2">
        {/* Hide "History" text when collapsed */}
        <span className="group-data-[state=collapsed]:hidden text-sm font-semibold">
          History
        </span>
        <SidebarTrigger />
      </SidebarHeader>

      <SidebarContent>{/* your nav items here */}</SidebarContent>
    </Sidebar>
  );
}
