import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  action: string;
  onClick: () => void;
  variant?: "primary" | "secondary" | "alert";
  badge?: string;
  className?: string;
}

export function DashboardCard({
  title,
  description,
  icon: Icon,
  action,
  onClick,
  variant = "primary",
  badge,
  className
}: DashboardCardProps) {
  const variants = {
    primary: "border-primary/20 hover:border-primary/40 hover:shadow-medical",
    secondary: "border-secondary/20 hover:border-secondary/40 hover:shadow-glow",
    alert: "border-alert/20 hover:border-alert/40 hover:shadow-[0_8px_32px_hsl(12,75%,61%/0.15)]"
  };

  const iconVariants = {
    primary: "text-primary bg-primary/10",
    secondary: "text-secondary bg-secondary/10", 
    alert: "text-alert bg-alert/10"
  };

  const buttonVariants = {
    primary: "bg-gradient-medical hover:opacity-90",
    secondary: "bg-gradient-secondary hover:opacity-90",
    alert: "bg-alert hover:bg-alert/90"
  };

  return (
    <Card className={cn(
      "transition-all duration-300 cursor-pointer group animate-fade-in-medical",
      variants[variant],
      className
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className={cn(
            "p-3 rounded-xl transition-all group-hover:scale-110",
            iconVariants[variant]
          )}>
            <Icon className="h-6 w-6" />
          </div>
          {badge && (
            <Badge variant="secondary" className="text-xs">
              {badge}
            </Badge>
          )}
        </div>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
          {description}
        </p>
        
        <Button 
          onClick={onClick}
          className={cn(
            "w-full text-white font-medium transition-all",
            buttonVariants[variant]
          )}
        >
          {action}
        </Button>
      </CardContent>
    </Card>
  );
}