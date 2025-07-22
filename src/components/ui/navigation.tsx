import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  Camera, 
  Mic, 
  Users, 
  User, 
  Activity,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { 
    icon: Home, 
    label: "Dashboard", 
    path: "/", 
    description: "Overview & Quick Actions" 
  },
  { 
    icon: Camera, 
    label: "AI Diagnosis", 
    path: "/diagnosis", 
    description: "Image Analysis",
    badge: "AI" 
  },
  { 
    icon: Mic, 
    label: "Voice Input", 
    path: "/voice", 
    description: "Symptom Recording" 
  },
  { 
    icon: Users, 
    label: "Patients", 
    path: "/patients", 
    description: "Patient Management" 
  },
  { 
    icon: Activity, 
    label: "Reports", 
    path: "/reports", 
    description: "Medical Reports" 
  },
  { 
    icon: User, 
    label: "Profile", 
    path: "/profile", 
    description: "Settings & Account" 
  },
];

export function MobileNavigation() {
  const location = useLocation();
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-40 lg:hidden">
      <div className="flex items-center justify-around px-2 py-1">
        {navItems.slice(0, 5).map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center p-2 rounded-lg transition-all",
                "min-w-[60px] text-xs",
                isActive 
                  ? "text-primary bg-primary/10" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <div className="relative">
                <item.icon className="h-5 w-5 mb-1" />
                {item.badge && (
                  <Badge 
                    variant="secondary" 
                    className="absolute -top-2 -right-2 h-4 w-4 p-0 text-[10px] bg-secondary text-secondary-foreground"
                  >
                    {item.badge}
                  </Badge>
                )}
              </div>
              <span className="leading-tight">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export function DesktopNavigation() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  return (
    <nav className={cn(
      "hidden lg:flex flex-col bg-card border-r border-border transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div>
              <h2 className="font-bold text-lg text-primary">MediCare+</h2>
              <p className="text-xs text-muted-foreground">AI Diagnostic Tool</p>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 h-8 w-8"
          >
            {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      
      <div className="flex-1 p-3 space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 p-3 rounded-lg transition-all",
                "hover:bg-muted/50 group",
                isActive && "bg-primary text-primary-foreground shadow-medical"
              )}
            >
              <div className="relative">
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {item.badge && !isCollapsed && (
                  <Badge 
                    variant="secondary" 
                    className="absolute -top-2 -right-2 h-4 w-4 p-0 text-[10px]"
                  >
                    {item.badge}
                  </Badge>
                )}
              </div>
              
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <div className="font-medium">{item.label}</div>
                  <div className={cn(
                    "text-xs opacity-70",
                    isActive ? "text-primary-foreground/70" : "text-muted-foreground"
                  )}>
                    {item.description}
                  </div>
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}