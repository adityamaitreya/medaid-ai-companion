import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Mic, 
  MicOff, 
  Play, 
  Pause, 
  Save, 
  Trash2,
  Heart,
  Thermometer,
  Activity,
  Gauge
} from "lucide-react";

export default function Voice() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [vitals, setVitals] = useState({
    temperature: "",
    bloodPressure: "",
    heartRate: "",
    oxygenSaturation: "",
    weight: "",
    height: ""
  });
  const [symptoms, setSymptoms] = useState("");
  const { toast } = useToast();

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    
    if (!isRecording) {
      toast({
        title: "Recording Started",
        description: "Speak clearly into the microphone. Recording will be processed automatically.",
      });
      
      // Simulate voice recording and transcription
      setTimeout(() => {
        setTranscription("Patient reports mild headache for the past 2 days, occasional dizziness, and difficulty sleeping. No fever, no nausea. Pain level is 4 out of 10.");
        setIsRecording(false);
        toast({
          title: "Recording Complete",
          description: "Voice input has been transcribed successfully.",
        });
      }, 5000);
    }
  };

  const handleVitalChange = (field: string, value: string) => {
    setVitals(prev => ({ ...prev, [field]: value }));
  };

  const saveRecord = () => {
    toast({
      title: "Record Saved",
      description: "Patient data has been saved successfully.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-primary mb-2">Voice Input & Vitals</h1>
        <p className="text-muted-foreground">
          Record patient symptoms and vital signs using voice commands
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Voice Recording Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mic className="h-5 w-5 text-primary" />
                Voice Recording
                {isRecording && (
                  <Badge variant="destructive" className="ml-auto animate-pulse">
                    Recording
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center py-8">
                <Button
                  size="lg"
                  onClick={toggleRecording}
                  className={`h-24 w-24 rounded-full ${
                    isRecording 
                      ? "bg-alert hover:bg-alert/90 animate-pulse-medical" 
                      : "bg-gradient-medical"
                  } text-white`}
                >
                  {isRecording ? (
                    <MicOff className="h-8 w-8" />
                  ) : (
                    <Mic className="h-8 w-8" />
                  )}
                </Button>
                <p className="mt-4 text-sm text-muted-foreground">
                  {isRecording 
                    ? "Recording in progress... Tap to stop" 
                    : "Tap to start recording patient symptoms"
                  }
                </p>
              </div>

              {transcription && (
                <div className="space-y-3">
                  <Label htmlFor="transcription">Transcribed Text</Label>
                  <Textarea
                    id="transcription"
                    value={transcription}
                    onChange={(e) => setTranscription(e.target.value)}
                    placeholder="Voice transcription will appear here..."
                    className="min-h-[120px]"
                  />
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Play className="h-4 w-4 mr-1" />
                      Replay
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4 mr-1" />
                      Clear
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Additional Symptoms */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Label htmlFor="symptoms">Manual Symptom Input</Label>
                <Textarea
                  id="symptoms"
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  placeholder="Add any additional symptoms or observations..."
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Vital Signs Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Vital Signs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="temperature" className="flex items-center gap-1">
                    <Thermometer className="h-4 w-4 text-primary" />
                    Temperature (°C)
                  </Label>
                  <Input
                    id="temperature"
                    type="number"
                    placeholder="36.5"
                    value={vitals.temperature}
                    onChange={(e) => handleVitalChange("temperature", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="heartRate" className="flex items-center gap-1">
                    <Heart className="h-4 w-4 text-primary" />
                    Heart Rate (bpm)
                  </Label>
                  <Input
                    id="heartRate"
                    type="number"
                    placeholder="72"
                    value={vitals.heartRate}
                    onChange={(e) => handleVitalChange("heartRate", e.target.value)}
                  />
                </div>

                <div className="space-y-2 col-span-2">
                  <Label htmlFor="bloodPressure" className="flex items-center gap-1">
                    <Gauge className="h-4 w-4 text-primary" />
                    Blood Pressure (mmHg)
                  </Label>
                  <Input
                    id="bloodPressure"
                    placeholder="120/80"
                    value={vitals.bloodPressure}
                    onChange={(e) => handleVitalChange("bloodPressure", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="oxygenSaturation">O2 Saturation (%)</Label>
                  <Input
                    id="oxygenSaturation"
                    type="number"
                    placeholder="98"
                    value={vitals.oxygenSaturation}
                    onChange={(e) => handleVitalChange("oxygenSaturation", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="70"
                    value={vitals.weight}
                    onChange={(e) => handleVitalChange("weight", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>AI Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              {transcription || Object.values(vitals).some(v => v) ? (
                <div className="space-y-3">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <h4 className="font-medium mb-1">Preliminary Assessment</h4>
                    <p className="text-sm text-muted-foreground">
                      Based on reported symptoms: mild tension headache with stress-related sleep disturbance. 
                      Vital signs within normal range.
                    </p>
                  </div>
                  
                  <div className="p-3 bg-secondary/10 rounded-lg">
                    <h4 className="font-medium mb-1">Recommendations</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Consider stress management techniques</li>
                      <li>• Monitor sleep patterns</li>
                      <li>• Follow up if symptoms persist &gt; 7 days</li>
                    </ul>
                  </div>

                  <div className="p-3 bg-alert/10 rounded-lg">
                    <h4 className="font-medium mb-1">Red Flags</h4>
                    <p className="text-sm text-muted-foreground">
                      None detected. Continue monitoring.
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground text-sm text-center py-4">
                  Enter symptoms and vital signs to see AI analysis
                </p>
              )}
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button 
              onClick={saveRecord}
              className="flex-1 bg-gradient-medical text-white"
            >
              <Save className="mr-2 h-4 w-4" />
              Save Record
            </Button>
            <Button variant="outline">
              Export
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}