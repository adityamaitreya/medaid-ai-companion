import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, UserPlus, Search } from "lucide-react";

export default function Patients() {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-primary">Patient Management</h1>
          <p className="text-muted-foreground">Manage patient records and medical history</p>
        </div>
        <Button className="bg-gradient-medical text-white">
          <UserPlus className="mr-2 h-4 w-4" />
          New Patient
        </Button>
      </div>

      <div className="grid gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Patient #{i}234</h3>
                  <p className="text-sm text-muted-foreground">Last visit: 2 days ago</p>
                </div>
                <Badge variant="default">Active</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}