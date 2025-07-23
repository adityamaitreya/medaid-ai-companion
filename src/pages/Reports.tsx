import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Activity, FileText, Download, Share2, Filter, Calendar, Clock, Search } from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";

export default function Reports() {
  const [activeTab, setActiveTab] = useState("recent");
  const [dateRange, setDateRange] = useState("week");
  
  // Mock data for reports
  const recentReports = [
    { id: "R1001", patientName: "John Doe", patientId: "P1234", type: "Diagnosis", date: "2023-09-15", status: "completed" },
    { id: "R1002", patientName: "Jane Smith", patientId: "P2345", type: "Lab Results", date: "2023-09-14", status: "pending" },
    { id: "R1003", patientName: "Robert Johnson", patientId: "P3456", type: "Medication", date: "2023-09-12", status: "completed" },
    { id: "R1004", patientName: "Emily Davis", patientId: "P4567", type: "Diagnosis", date: "2023-09-10", status: "completed" },
    { id: "R1005", patientName: "Michael Wilson", patientId: "P5678", type: "Follow-up", date: "2023-09-08", status: "completed" },
  ];

  // Mock data for activity chart
  const activityData = [
    { date: "Mon", diagnoses: 5, labResults: 3, medications: 2 },
    { date: "Tue", diagnoses: 7, labResults: 4, medications: 3 },
    { date: "Wed", diagnoses: 4, labResults: 6, medications: 2 },
    { date: "Thu", diagnoses: 6, labResults: 2, medications: 4 },
    { date: "Fri", diagnoses: 8, labResults: 5, medications: 3 },
    { date: "Sat", diagnoses: 3, labResults: 1, medications: 1 },
    { date: "Sun", diagnoses: 2, labResults: 0, medications: 1 },
  ];

  // Mock data for report types
  const reportTypesData = [
    { name: "Diagnoses", count: 35 },
    { name: "Lab Results", count: 21 },
    { name: "Medications", count: 16 },
    { name: "Follow-ups", count: 12 },
    { name: "Referrals", count: 8 },
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-primary">Medical Reports</h1>
          <p className="text-muted-foreground">View and manage patient medical reports</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" className="flex items-center gap-1">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
          <Button className="bg-gradient-medical text-white">
            <FileText className="mr-2 h-4 w-4" />
            New Report
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search reports by ID, patient name, or type..."
            className="pl-8"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Select defaultValue={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="recent" className="mb-6" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="recent" className="flex items-center gap-1">
            <Clock className="h-4 w-4" /> Recent Reports
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex items-center gap-1">
            <Activity className="h-4 w-4" /> Activity
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-1">
            <FileText className="h-4 w-4" /> Report Types
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="recent">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Recent Reports
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[150px] h-8">
                    <SelectValue placeholder="Report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="diagnosis">Diagnosis</SelectItem>
                    <SelectItem value="lab">Lab Results</SelectItem>
                    <SelectItem value="medication">Medication</SelectItem>
                    <SelectItem value="followup">Follow-up</SelectItem>
                  </SelectContent>
                </Select>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReports.map((report) => (
                  <Card key={report.id}>
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{report.patientName}</h3>
                            <Badge variant="outline">{report.patientId}</Badge>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary">{report.type}</Badge>
                            <span className="text-sm text-muted-foreground">
                              {report.id} • {new Date(report.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {report.status === "completed" ? (
                            <Badge variant="default">Completed</Badge>
                          ) : (
                            <Badge variant="secondary">Pending</Badge>
                          )}
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-center border-t p-4">
              <Button variant="outline">Load More</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Report Activity ({dateRange === "week" ? "This Week" : dateRange === "month" ? "This Month" : dateRange === "quarter" ? "This Quarter" : dateRange === "year" ? "This Year" : "Today"})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="diagnoses" stroke="#0ea5e9" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="labResults" stroke="#8b5cf6" />
                  <Line type="monotone" dataKey="medications" stroke="#f43f5e" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Report Types Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={reportTypesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#0ea5e9" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}