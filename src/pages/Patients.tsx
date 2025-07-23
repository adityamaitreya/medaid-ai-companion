import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, UserPlus, Search, Filter, Calendar, Activity, FileText, MoreHorizontal } from "lucide-react";
import { toast } from "sonner";

export default function Patients() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
  // Mock patient data
  const patients = [
    {
      id: "P1234",
      name: "John Doe",
      age: 45,
      gender: "Male",
      lastVisit: "2023-09-15",
      status: "active",
      conditions: ["Hypertension", "Type 2 Diabetes"],
      contactNumber: "+1 (555) 123-4567",
      email: "john.doe@example.com"
    },
    {
      id: "P2345",
      name: "Jane Smith",
      age: 32,
      gender: "Female",
      lastVisit: "2023-09-10",
      status: "active",
      conditions: ["Asthma"],
      contactNumber: "+1 (555) 234-5678",
      email: "jane.smith@example.com"
    },
    {
      id: "P3456",
      name: "Robert Johnson",
      age: 67,
      gender: "Male",
      lastVisit: "2023-08-28",
      status: "critical",
      conditions: ["Coronary Artery Disease", "COPD"],
      contactNumber: "+1 (555) 345-6789",
      email: "robert.johnson@example.com"
    },
    {
      id: "P4567",
      name: "Emily Davis",
      age: 28,
      gender: "Female",
      lastVisit: "2023-09-05",
      status: "active",
      conditions: ["Migraine"],
      contactNumber: "+1 (555) 456-7890",
      email: "emily.davis@example.com"
    },
    {
      id: "P5678",
      name: "Michael Wilson",
      age: 52,
      gender: "Male",
      lastVisit: "2023-07-20",
      status: "inactive",
      conditions: ["Arthritis"],
      contactNumber: "+1 (555) 567-8901",
      email: "michael.wilson@example.com"
    }
  ];

  const filteredPatients = patients.filter(patient => {
    // Filter by search query
    const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         patient.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by tab
    const matchesTab = activeTab === "all" || patient.status === activeTab;
    
    return matchesSearch && matchesTab;
  });

  const handleAddPatient = () => {
    toast.success("Patient added successfully");
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-primary">Patient Management</h1>
          <p className="text-muted-foreground">Manage patient records and medical history</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-medical text-white">
              <UserPlus className="mr-2 h-4 w-4" />
              New Patient
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Patient</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="age" className="text-right">
                  Age
                </Label>
                <Input id="age" type="number" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="gender" className="text-right">
                  Gender
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="contact" className="text-right">
                  Contact
                </Label>
                <Input id="contact" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input id="email" type="email" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="conditions" className="text-right">
                  Conditions
                </Label>
                <Input id="conditions" className="col-span-3" placeholder="Separate with commas" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddPatient}>Add Patient</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search patients by name or ID..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Select defaultValue="name">
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name (A-Z)</SelectItem>
              <SelectItem value="id">ID</SelectItem>
              <SelectItem value="recent">Recent Visit</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="all" className="mb-6" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Patients</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="critical">Critical</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid gap-4">
        {filteredPatients.length > 0 ? (
          filteredPatients.map((patient) => (
            <Card key={patient.id}>
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{patient.name}</h3>
                      <Badge variant="outline">{patient.id}</Badge>
                      {patient.status === "critical" && (
                        <Badge variant="destructive">Critical</Badge>
                      )}
                      {patient.status === "active" && (
                        <Badge variant="default">Active</Badge>
                      )}
                      {patient.status === "inactive" && (
                        <Badge variant="secondary">Inactive</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {patient.age} years • {patient.gender} • Last visit: {new Date(patient.lastVisit).toLocaleDateString()}
                    </p>
                    <div className="mt-2">
                      {patient.conditions.map((condition, i) => (
                        <Badge key={i} variant="outline" className="mr-1 mb-1">
                          {condition}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      Records
                    </Button>
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Schedule
                    </Button>
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Activity className="h-4 w-4" />
                      Vitals
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-1">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">No patients found matching your criteria.</p>
              <Button variant="outline" className="mt-4" onClick={() => {
                setSearchQuery("");
                setActiveTab("all");
              }}>
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}