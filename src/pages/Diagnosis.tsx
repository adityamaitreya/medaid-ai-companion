import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { 
  Camera, 
  Upload, 
  Brain, 
  Loader2, 
  CheckCircle, 
  AlertTriangle,
  Eye,
  Scan,
  FileImage
} from "lucide-react";

export default function Diagnosis() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);
  const { toast } = useToast();

  const handleImageCapture = () => {
    // In a real Capacitor app, this would use Camera.getPhoto()
    toast({
      title: "Camera Access",
      description: "Camera functionality will be available when deployed as mobile app with Capacitor.",
    });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setResults(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      setResults({
        confidence: 0.87,
        primaryDiagnosis: "Skin Lesion - Melanocytic Nevus",
        secondaryDiagnoses: [
          { name: "Seborrheic Keratosis", confidence: 0.23 },
          { name: "Atypical Mole", confidence: 0.15 }
        ],
        recommendations: [
          "Monitor for changes in size, shape, or color",
          "Schedule follow-up in 6 months",
          "Consider dermatologist consultation if changes occur"
        ],
        riskLevel: "low",
        annotations: [
          { x: 45, y: 30, width: 20, height: 25, label: "Primary lesion" },
          { x: 70, y: 60, width: 15, height: 18, label: "Secondary finding" }
        ]
      });
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis Complete",
        description: "AI diagnosis has been generated successfully.",
      });
    }, 3000);
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-primary mb-2">AI Image Diagnosis</h1>
        <p className="text-muted-foreground">
          Upload or capture medical images for AI-powered diagnostic analysis
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Image Input Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5 text-primary" />
                Image Input
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!selectedImage ? (
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                    <FileImage className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">
                      Select an image to begin AI analysis
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Button 
                        onClick={handleImageCapture}
                        className="bg-gradient-medical text-white"
                      >
                        <Camera className="mr-2 h-4 w-4" />
                        Take Photo
                      </Button>
                      
                      <label htmlFor="image-upload">
                        <Button variant="outline" asChild>
                          <span>
                            <Upload className="mr-2 h-4 w-4" />
                            Upload Image
                          </span>
                        </Button>
                      </label>
                      <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </div>
                  </div>
                  
                  <Alert>
                    <Eye className="h-4 w-4" />
                    <AlertDescription>
                      Supports skin lesions, eye conditions, wounds, and other visible medical conditions.
                    </AlertDescription>
                  </Alert>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative">
                    <img 
                      src={selectedImage} 
                      alt="Medical image for analysis" 
                      className="w-full rounded-lg shadow-medical"
                    />
                    {results?.annotations && (
                      <div className="absolute inset-0">
                        {results.annotations.map((annotation: any, index: number) => (
                          <div
                            key={index}
                            className="absolute border-2 border-secondary bg-secondary/20"
                            style={{
                              left: `${annotation.x}%`,
                              top: `${annotation.y}%`,
                              width: `${annotation.width}%`,
                              height: `${annotation.height}%`
                            }}
                          >
                            <div className="absolute -top-6 left-0 bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded">
                              {annotation.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-3">
                    <Button 
                      onClick={analyzeImage}
                      disabled={isAnalyzing}
                      className="flex-1 bg-gradient-medical text-white"
                    >
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Brain className="mr-2 h-4 w-4" />
                          Analyze with AI
                        </>
                      )}
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setSelectedImage(null);
                        setResults(null);
                      }}
                    >
                      Clear
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Image Guidelines */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Image Guidelines</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Well-lit, clear images with good focus</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Close-up view of the area of concern</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Include reference objects for scale when possible</span>
                </div>
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span>Avoid blurry or heavily shadowed images</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {results ? (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Scan className="h-5 w-5 text-primary" />
                    AI Analysis Results
                    <Badge 
                      variant={results.riskLevel === "low" ? "default" : "destructive"}
                      className="ml-auto"
                    >
                      {results.riskLevel} risk
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Primary Diagnosis</h3>
                    <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
                      <span className="font-medium">{results.primaryDiagnosis}</span>
                      <Badge variant="secondary">
                        {Math.round(results.confidence * 100)}% confidence
                      </Badge>
                    </div>
                  </div>

                  {results.secondaryDiagnoses.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-2">Alternative Diagnoses</h3>
                      <div className="space-y-2">
                        {results.secondaryDiagnoses.map((diagnosis: any, index: number) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                            <span className="text-sm">{diagnosis.name}</span>
                            <Badge variant="outline" className="text-xs">
                              {Math.round(diagnosis.confidence * 100)}%
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {results.recommendations.map((rec: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <div className="flex gap-3">
                <Button className="flex-1 bg-gradient-medical text-white">
                  Save to Patient Record
                </Button>
                <Button variant="outline">
                  Export Report
                </Button>
              </div>
            </>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <Brain className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold mb-2">AI Analysis Ready</h3>
                <p className="text-muted-foreground text-sm">
                  Upload an image and click "Analyze with AI" to get instant diagnostic insights powered by advanced machine learning models.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}