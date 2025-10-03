import { Thermometer, Droplets, Wind, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const AQIDashboard = () => {
  const currentAQI = 85;
  const location = "Washington, DC";

  const getAQIStatus = (aqi: number) => {
    if (aqi <= 50) return { label: "Good", color: "aqi-good", textColor: "text-aqi-good" };
    if (aqi <= 100) return { label: "Moderate", color: "aqi-moderate", textColor: "text-aqi-moderate" };
    if (aqi <= 150) return { label: "Unhealthy for Sensitive", color: "aqi-unhealthy-sensitive", textColor: "text-aqi-unhealthy-sensitive" };
    return { label: "Unhealthy", color: "aqi-unhealthy", textColor: "text-aqi-unhealthy" };
  };

  const aqiStatus = getAQIStatus(currentAQI);

  const pollutants = [
    { name: "PM2.5", value: "25.3", unit: "μg/m³", status: "moderate" },
    { name: "O₃", value: "68", unit: "ppb", status: "good" },
    { name: "NO₂", value: "42", unit: "ppb", status: "moderate" },
    { name: "SO₃", value: "35.8", unit: "μg/m³", status: "good" }
  ];

  const weatherData = [
    { icon: Thermometer, label: "Temperature", value: "24°C", color: "text-orange-400" },
    { icon: Droplets, label: "Humidity", value: "65%", color: "text-blue-400" },
    { icon: Wind, label: "Wind Speed", value: "12 km/h", color: "text-green-400" },
    { icon: Activity, label: "UV Index", value: "6", color: "text-yellow-400" }
  ];

  return (
    <section id="home" className="py-12 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Current Air Quality</h2>
          <p className="text-muted-foreground">Real-time data from {location}</p>
        </div>

        {/* Main AQI Display */}
        <div className="max-w-4xl mx-auto mb-8">
          <Card className="text-center bg-gradient-to-r from-card to-muted/10 border-2">
            <CardHeader>
              <CardTitle className="text-lg text-muted-foreground">Air Quality Index</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className={`text-8xl font-bold ${aqiStatus.textColor}`}>
                  {currentAQI}
                </div>
                <Badge variant="secondary" className={`text-lg px-6 py-2 bg-${aqiStatus.color}/20 text-${aqiStatus.color} border-${aqiStatus.color}`}>
                  {aqiStatus.label}
                </Badge>
                <p className="text-sm text-muted-foreground mt-4">
                  Last updated: {new Date().toLocaleTimeString()} • Data from TEMPO + Ground Sensors
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pollutant Levels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {pollutants.map((pollutant) => (
            <Card key={pollutant.name} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-muted-foreground">{pollutant.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{pollutant.value}</div>
                <div className="text-xs text-muted-foreground">{pollutant.unit}</div>
                <Badge 
                  variant="outline" 
                  className={`mt-2 text-xs ${
                    pollutant.status === 'good' ? 'border-aqi-good text-aqi-good' : 'border-aqi-moderate text-aqi-moderate'
                  }`}
                >
                  {pollutant.status === 'good' ? 'Good' : 'Moderate'}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Weather Conditions */}
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-lg">Weather Conditions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {weatherData.map((item, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/20">
                  <item.icon className={`h-5 w-5 ${item.color}`} />
                  <div>
                    <div className="font-semibold">{item.value}</div>
                    <div className="text-xs text-muted-foreground">{item.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AQIDashboard;
