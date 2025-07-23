import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Camera, 
  Mic, 
  UserPlus, 
  MessageSquare, 
  Heart,
  Thermometer,
  Calendar,
  PieChart
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    {
      icon: Camera,
      label: "Take Photo",
      description: "Capture image for AI analysis",
      onClick: () => navigate("/diagnosis"),
      variant: "default" as const
    },
    {
      icon: Mic,
      label: "Record Symptoms",
      description: "Voice input for patient data",
      onClick: () => navigate("/voice"),
      variant: "secondary" as const
    },
    {
      icon: UserPlus,
      label: "New Patient",
      description: "Register new patient",
      onClick: () => navigate("/patients"),
      variant: "outline" as const
    },
    {
      icon: Calendar,
      label: "Appointments",
      description: "Schedule patient visits",
      onClick: () => navigate("/appointments"),
      variant: "outline" as const
    },
    {
      icon: Heart,
      label: "Vital Signs",
      description: "Record patient vitals",
      onClick: () => navigate("/voice"),
      variant: "outline" as const
    },
    {
      icon: PieChart,
      label: "Health Analytics",
      description: "View patient health trends",
      onClick: () => navigate("/analytics"),
      variant: "outline" as const
    },
    {
      icon: MessageSquare,
      label: "Consult Specialist",
      description: "Connect with expert doctor",
      onClick: () => {}, // Will implement telemedicine later
      variant: "outline" as const
    },
    {
      icon: Thermometer,
      label: "Emergency",
      description: "Quick assessment mode",
      onClick: () => navigate("/diagnosis"),
      variant: "destructive" as const
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant}
              size="sm"
              onClick={action.onClick}
              className="h-auto p-3 flex flex-col items-center gap-2 text-center"
            >
              <action.icon className="h-5 w-5" />
              <div>
                <div className="font-medium text-xs">{action.label}</div>
                <div className="text-[10px] opacity-70 leading-tight">
                  {action.description}
                </div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}