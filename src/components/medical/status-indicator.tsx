import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { CheckCircle, AlertCircle, Clock, XCircle } from "lucide-react";

interface StatusIndicatorProps {
  status: "online" | "offline" | "syncing" | "error";
  showText?: boolean;
  className?: string;
}

export function StatusIndicator({ status, showText = true, className }: StatusIndicatorProps) {
  const configs = {
    online: {
      icon: CheckCircle,
      label: "Online",
      color: "text-green-600",
      bg: "bg-green-100",
      border: "border-green-200"
    },
    offline: {
      icon: XCircle,
      label: "Offline",
      color: "text-muted-foreground",
      bg: "bg-muted",
      border: "border-border"
    },
    syncing: {
      icon: Clock,
      label: "Syncing",
      color: "text-secondary",
      bg: "bg-secondary/10",
      border: "border-secondary/20"
    },
    error: {
      icon: AlertCircle,
      label: "Error",
      color: "text-alert",
      bg: "bg-alert/10",
      border: "border-alert/20"
    }
  };

  const config = configs[status];
  const Icon = config.icon;

  return (
    <Badge 
      variant="outline" 
      className={cn(
        "gap-1.5 px-2 py-1",
        config.bg,
        config.border,
        className
      )}
    >
      <Icon className={cn("h-3 w-3", config.color, status === "syncing" && "animate-spin")} />
      {showText && (
        <span className={cn("text-xs font-medium", config.color)}>
          {config.label}
        </span>
      )}
    </Badge>
  );
}