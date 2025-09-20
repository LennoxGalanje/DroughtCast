import { Droplet } from 'lucide-react';
import { Sidebar, SidebarContent, SidebarHeader, SidebarInset, SidebarProvider, SidebarGroup, SidebarGroupLabel, SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { MapLegend } from '@/components/map-legend';
import { RiskAlerts } from '@/components/risk-alerts';
import { DroughtMap } from '@/components/drought-map';
import { regionsData } from '@/lib/data';

export default function Home() {
  const highRiskRegions = regionsData.filter(r => r.riskLevel >= 3);

  return (
    <SidebarProvider>
      <Sidebar variant="sidebar" collapsible="icon">
        <SidebarHeader className="items-center justify-center p-4">
          <div className="flex items-center gap-2 text-xl font-headline font-bold text-primary group-data-[collapsible=icon]:hidden">
            <Droplet />
            <span>DroughtCast</span>
          </div>
          <Droplet className="hidden text-primary group-data-[collapsible=icon]:block" size={28} />
        </SidebarHeader>
        <SidebarContent className="p-0">
          <SidebarGroup>
            <SidebarGroupLabel>Severity Scale</SidebarGroupLabel>
            <MapLegend />
          </SidebarGroup>
          <Separator />
          <SidebarGroup>
            <SidebarGroupLabel>High-Risk Alerts</SidebarGroupLabel>
            <RiskAlerts regions={highRiskRegions} />
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <main className="flex h-screen flex-col">
          <header className="flex h-14 items-center gap-4 border-b bg-background/60 px-6 backdrop-blur-sm">
            <SidebarTrigger className="md:hidden"/>
            <h1 className="text-lg font-semibold md:text-xl font-headline">Drought Risk Assessment Map</h1>
          </header>
          <div className="flex-1 overflow-hidden relative">
            <DroughtMap regions={regionsData} />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
