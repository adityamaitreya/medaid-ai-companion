import { DashboardCard } from "@/components/medical/dashboard-card";
import { QuickActions } from "@/components/medical/quick-actions";
import { StatusIndicator } from "@/components/medical/status-indicator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import medicalHero from "@/assets/medical-hero.jpg";
import {
  Camera,
  Mic,
  Users,
  Activity,
  Brain,
  Shield,
  Wifi,
  Bell
} from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative bg-gradient-hero text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  <Brain className="h-3 w-3 mr-1" />
                  AI-Powered
                </Badge>
                <StatusIndicator status="online" />
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                Medical Diagnostic
                <span className="block text-secondary">Assistant</span>
              </h1>
              
              <p className="text-lg text-white/90 mb-6 leading-relaxed">
                Advanced AI-powered diagnostic tool for healthcare professionals. 
                Capture, analyze, and diagnose with confidence.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  size="lg"
                  onClick={() => navigate("/diagnosis")}
                  className="bg-white text-primary hover:bg-white/90 font-semibold"
                >
                  <Camera className="mr-2 h-5 w-5" />
                  Start Diagnosis
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  onClick={() => navigate("/voice")}
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  <Mic className="mr-2 h-5 w-5" />
                  Voice Input
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src={medicalHero} 
                alt="Medical AI Assistant" 
                className="rounded-xl shadow-2xl w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Primary Actions */}
            <div className="grid md:grid-cols-2 gap-6">
              <DashboardCard
                title="AI Image Diagnosis"
                description="Capture medical images and receive instant AI-powered analysis with detailed diagnostic suggestions and confidence scores."
                icon={Camera}
                action="Start Diagnosis"
                onClick={() => navigate("/diagnosis")}
                variant="primary"
                badge="YOLOv8"
              />
              
              <DashboardCard
                title="Voice Symptom Input"
                description="Record patient symptoms using voice commands. Our AI converts speech to structured medical data for analysis."
                icon={Mic}
                action="Record Symptoms"
                onClick={() => navigate("/voice")}
                variant="secondary"
              />
            </div>

            {/* Secondary Actions */}
            <div className="grid md:grid-cols-3 gap-4">
              <DashboardCard
                title="Patient Management"
                description="View and manage patient records, medical history, and diagnostic reports in one place."
                icon={Users}
                action="Manage Patients"
                onClick={() => navigate("/patients")}
                variant="primary"
                className="md:col-span-2"
              />
              
              <DashboardCard
                title="Medical Reports"
                description="Generate and review comprehensive medical reports and analytics."
                icon={Activity}
                action="View Reports"
                onClick={() => navigate("/reports")}
                variant="alert"
              />
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { action: "AI Diagnosis completed", patient: "Patient #1234", time: "2 minutes ago", type: "success" },
                    { action: "Voice input recorded", patient: "Patient #1235", time: "15 minutes ago", type: "info" },
                    { action: "New patient registered", patient: "Patient #1236", time: "1 hour ago", type: "success" },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                      <div>
                        <p className="font-medium text-sm">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">{activity.patient}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                        <Badge variant={activity.type === "success" ? "default" : "secondary"} className="text-xs">
                          {activity.type}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <QuickActions />
            
            {/* System Status */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  System Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">AI Engine</span>
                  <StatusIndicator status="online" showText={false} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Database</span>
                  <StatusIndicator status="online" showText={false} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Sync Status</span>
                  <StatusIndicator status="syncing" showText={false} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Connection</span>
                  <div className="flex items-center gap-1">
                    <Wifi className="h-4 w-4 text-green-600" />
                    <span className="text-xs text-green-600">Strong</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Bell className="h-5 w-5 text-primary" />
                  Notifications
                  <Badge variant="secondary" className="ml-auto">3</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="p-2 rounded bg-secondary/10 border border-secondary/20">
                  <p className="text-xs font-medium">AI Model Updated</p>
                  <p className="text-xs text-muted-foreground">New YOLOv8 model available</p>
                </div>
                <div className="p-2 rounded bg-primary/10 border border-primary/20">
                  <p className="text-xs font-medium">5 Pending Reviews</p>
                  <p className="text-xs text-muted-foreground">Diagnostic reports need review</p>
                </div>
                <div className="p-2 rounded bg-alert/10 border border-alert/20">
                  <p className="text-xs font-medium">Storage Warning</p>
                  <p className="text-xs text-muted-foreground">80% capacity reached</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}