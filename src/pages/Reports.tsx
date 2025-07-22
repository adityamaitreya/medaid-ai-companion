import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from "lucide-react";

export default function Reports() {
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-primary mb-6">Medical Reports</h1>
      
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Analytics Dashboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Comprehensive medical reports and analytics coming soon.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}