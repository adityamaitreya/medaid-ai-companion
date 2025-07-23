import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { PieChart, LineChart, BarChart, Activity, Heart, Thermometer, Droplets } from "lucide-react";
import { 
  LineChart as ReLineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer,
  BarChart as ReBarChart,
  Bar,
  PieChart as RePieChart,
  Pie,
  Cell
} from "recharts";

export default function Analytics() {
  // Mock data for charts
  const vitalTrendsData = [
    { date: "Jan", heartRate: 72, bloodPressure: 120, temperature: 98.6, oxygenSaturation: 98 },
    { date: "Feb", heartRate: 75, bloodPressure: 122, temperature: 98.4, oxygenSaturation: 97 },
    { date: "Mar", heartRate: 71, bloodPressure: 118, temperature: 98.7, oxygenSaturation: 99 },
    { date: "Apr", heartRate: 73, bloodPressure: 121, temperature: 98.5, oxygenSaturation: 98 },
    { date: "May", heartRate: 70, bloodPressure: 119, temperature: 98.6, oxygenSaturation: 97 },
    { date: "Jun", heartRate: 74, bloodPressure: 123, temperature: 98.8, oxygenSaturation: 98 },
  ];

  const diagnosisDistributionData = [
    { name: "Respiratory", value: 35, color: "#0ea5e9" },
    { name: "Cardiovascular", value: 25, color: "#f43f5e" },
    { name: "Dermatological", value: 20, color: "#8b5cf6" },
    { name: "Neurological", value: 10, color: "#10b981" },
    { name: "Other", value: 10, color: "#f59e0b" },
  ];

  const patientAgeDistributionData = [
    { age: "0-18", count: 15 },
    { age: "19-35", count: 30 },
    { age: "36-50", count: 25 },
    { age: "51-65", count: 20 },
    { age: "65+", count: 10 },
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-primary">Health Analytics</h1>
          <p className="text-muted-foreground">Visualize patient health data and trends</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select patient" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Patients</SelectItem>
              <SelectItem value="patient1">John Doe</SelectItem>
              <SelectItem value="patient2">Jane Smith</SelectItem>
              <SelectItem value="patient3">Robert Johnson</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">Export Data</Button>
        </div>
      </div>

      <Tabs defaultValue="vitals">
        <TabsList className="mb-4">
          <TabsTrigger value="vitals" className="flex items-center gap-1">
            <Heart className="h-4 w-4" /> Vital Trends
          </TabsTrigger>
          <TabsTrigger value="diagnoses" className="flex items-center gap-1">
            <PieChart className="h-4 w-4" /> Diagnosis Distribution
          </TabsTrigger>
          <TabsTrigger value="demographics" className="flex items-center gap-1">
            <BarChart className="h-4 w-4" /> Patient Demographics
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="vitals">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Vital Signs Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center gap-1">
                      <Heart className="h-4 w-4 text-red-500" /> Heart Rate
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                      <ReLineChart data={vitalTrendsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="heartRate" stroke="#f43f5e" activeDot={{ r: 8 }} />
                      </ReLineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center gap-1">
                      <Activity className="h-4 w-4 text-blue-500" /> Blood Pressure
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                      <ReLineChart data={vitalTrendsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="bloodPressure" stroke="#0ea5e9" activeDot={{ r: 8 }} />
                      </ReLineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center gap-1">
                      <Thermometer className="h-4 w-4 text-orange-500" /> Temperature
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                      <ReLineChart data={vitalTrendsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="temperature" stroke="#f59e0b" activeDot={{ r: 8 }} />
                      </ReLineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center gap-1">
                      <Droplets className="h-4 w-4 text-indigo-500" /> Oxygen Saturation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                      <ReLineChart data={vitalTrendsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="oxygenSaturation" stroke="#8b5cf6" activeDot={{ r: 8 }} />
                      </ReLineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="diagnoses">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                Diagnosis Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                <ResponsiveContainer width={300} height={300}>
                  <RePieChart>
                    <Pie
                      data={diagnosisDistributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {diagnosisDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RePieChart>
                </ResponsiveContainer>
                
                <div className="grid grid-cols-1 gap-2">
                  {diagnosisDistributionData.map((entry, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: entry.color }} />
                      <div className="text-sm">{entry.name}: {entry.value}%</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="demographics">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="h-5 w-5" />
                Patient Age Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <ReBarChart data={patientAgeDistributionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="age" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#0ea5e9" />
                </ReBarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}