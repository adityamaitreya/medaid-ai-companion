import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarPlus, Clock, Users } from "lucide-react";
import { toast } from "sonner";

export default function Appointments() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [view, setView] = useState<"calendar" | "list">("calendar");
  
  // Mock appointments data
  const appointments = [
    { id: 1, patientName: "John Doe", time: "09:00 AM", type: "Check-up", status: "confirmed" },
    { id: 2, patientName: "Jane Smith", time: "11:30 AM", type: "Follow-up", status: "confirmed" },
    { id: 3, patientName: "Robert Johnson", time: "02:15 PM", type: "Consultation", status: "pending" },
  ];

  const handleNewAppointment = () => {
    toast.success("Appointment scheduled successfully");
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-primary">Appointments</h1>
          <p className="text-muted-foreground">Schedule and manage patient appointments</p>
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-medical text-white">
                <CalendarPlus className="mr-2 h-4 w-4" />
                New Appointment
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Schedule New Appointment</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="patient">Patient</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select patient" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="patient1">John Doe</SelectItem>
                      <SelectItem value="patient2">Jane Smith</SelectItem>
                      <SelectItem value="patient3">Robert Johnson</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="date">Date</Label>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="time">Time</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="9:00">9:00 AM</SelectItem>
                      <SelectItem value="9:30">9:30 AM</SelectItem>
                      <SelectItem value="10:00">10:00 AM</SelectItem>
                      <SelectItem value="10:30">10:30 AM</SelectItem>
                      <SelectItem value="11:00">11:00 AM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="type">Appointment Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="checkup">Check-up</SelectItem>
                      <SelectItem value="followup">Follow-up</SelectItem>
                      <SelectItem value="consultation">Consultation</SelectItem>
                      <SelectItem value="emergency">Emergency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Input id="notes" placeholder="Additional notes" />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleNewAppointment}>Schedule Appointment</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <div className="flex border rounded-md overflow-hidden">
            <Button 
              variant={view === "calendar" ? "default" : "ghost"} 
              size="sm" 
              onClick={() => setView("calendar")}
              className="rounded-none"
            >
              Calendar
            </Button>
            <Button 
              variant={view === "list" ? "default" : "ghost"} 
              size="sm" 
              onClick={() => setView("list")}
              className="rounded-none"
            >
              List
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        {view === "calendar" ? (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Appointment Calendar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border mx-auto"
              />
              <div className="mt-6 space-y-2">
                <h3 className="font-medium">Appointments for {date?.toLocaleDateString()}</h3>
                {appointments.map((appointment) => (
                  <Card key={appointment.id} className="p-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">{appointment.patientName}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {appointment.time} - {appointment.type}
                        </div>
                      </div>
                      <Badge variant={appointment.status === "confirmed" ? "default" : "outline"}>
                        {appointment.status}
                      </Badge>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Appointment List
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {appointments.map((appointment) => (
                  <Card key={appointment.id} className="p-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">{appointment.patientName}</div>
                        <div className="text-sm text-muted-foreground">
                          {new Date().toLocaleDateString()} - {appointment.time}
                        </div>
                        <div className="text-sm">{appointment.type}</div>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant={appointment.status === "confirmed" ? "default" : "outline"}>
                          {appointment.status}
                        </Badge>
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}