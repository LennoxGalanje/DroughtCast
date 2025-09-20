import { severityLevels } from '@/lib/data';

export function MapLegend() {
  return (
    <div className="p-2 space-y-2">
      {severityLevels.map(({ level, label, color }) => (
        <div key={level} className="flex items-center gap-3">
          <div className="w-4 h-4 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
          <span className="text-sm text-sidebar-foreground">{label}</span>
        </div>
      ))}
    </div>
  );
}
