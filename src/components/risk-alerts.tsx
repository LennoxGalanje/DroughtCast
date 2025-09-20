import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CloudRainWind } from "lucide-react";
import type { RegionData } from "@/lib/types";

interface RiskAlertsProps {
  regions: RegionData[];
}

export function RiskAlerts({ regions }: RiskAlertsProps) {
  if (regions.length === 0) {
    return <p className="text-sm text-muted-foreground p-2">No high-risk alerts.</p>;
  }

  return (
    <div className="space-y-2 p-2">
      {regions.map(region => (
        <Alert key={region.id} className="bg-accent/30 border-accent/50">
          <CloudRainWind className="h-4 w-4 text-primary" />
          <AlertTitle className="font-headline text-sm font-bold">{region.name}</AlertTitle>
          <AlertDescription className="text-xs">
            High drought risk detected. Proactive measures are advised.
          </AlertDescription>
        </Alert>
      ))}
    </div>
  );
}
