import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, TrendingUp } from "lucide-react";

const ForecastChart = () => {
  // Mock forecast data for the next 48 hours
  const forecastData = [
    { time: "00:00", aqi: 82, pm25: 24.1, o3: 65, no2: 38, temp: 22, humidity: 68 },
    { time: "03:00", aqi: 78, pm25: 22.8, o3: 62, no2: 35, temp: 20, humidity: 72 },
    { time: "06:00", aqi: 85, pm25: 25.3, o3: 68, no2: 42, temp: 24, humidity: 65 },
    { time: "09:00", aqi: 92, pm25: 28.1, o3: 75, no2: 48, temp: 28, humidity: 58 },
    { time: "12:00", aqi: 98, pm25: 31.2, o3: 82, no2: 52, temp: 32, humidity: 52 },
    { time: "15:00", aqi: 105, pm25: 33.8, o3: 88, no2: 55, temp: 34, humidity: 48 },
    { time: "18:00", aqi: 95, pm25: 29.5, o3: 78, no2: 45, temp: 30, humidity: 55 },
    { time: "21:00", aqi: 88, pm25: 26.2, o3: 70, no2: 40, temp: 26, humidity: 62 },
    { time: "24:00", aqi: 84, pm25: 24.8, o3: 66, no2: 37, temp: 23, humidity: 68 },
    { time: "27:00", aqi: 80, pm25: 23.1, o3: 63, no2: 34, temp: 21, humidity: 74 },
    { time: "30:00", aqi: 86, pm25: 25.7, o3: 69, no2: 41, temp: 25, humidity: 64 },
    { time: "33:00", aqi: 93, pm25: 29.2, o3: 76, no2: 49, temp: 29, humidity: 57 },
    { time: "36:00", aqi: 100, pm25: 32.1, o3: 84, no2: 53, temp: 33, humidity: 51 },
    { time: "39:00", aqi: 96, pm25: 30.5, o3: 79, no2: 46, temp: 31, humidity: 54 },
    { time: "42:00", aqi: 90, pm25: 27.8, o3: 72, no2: 42, temp: 27, humidity: 60 },
    { time: "45:00", aqi: 87, pm25: 26.1, o3: 68, no2: 39, temp: 24, humidity: 66 },
    { time: "48:00", aqi: 85, pm25: 24.9, o3: 65, no2: 36, temp: 22, humidity: 70 }
  ];

  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return "#22c55e"; // green
    if (aqi <= 100) return "#f59e0b"; // yellow
    if (aqi <= 150) return "#f97316"; // orange
    return "#ef4444"; // red
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-background/95 backdrop-blur border rounded-lg p-3 shadow-lg">
          <p className="font-semibold mb-2">{`Time: ${label}`}</p>
          <div className="space-y-1 text-sm">
            <p className="flex justify-between">
              <span>AQI:</span>
              <span className="font-semibold" style={{ color: getAQIColor(data.aqi) }}>
                {data.aqi}
              </span>
            </p>
            <p className="flex justify-between">
              <span>PM2.5:</span>
              <span>{data.pm25} μg/m³</span>
            </p>
            <p className="flex justify-between">
              <span>O₃:</span>
              <span>{data.o3} ppb</span>
            </p>
            <p className="flex justify-between">
              <span>NO₂:</span>
              <span>{data.no2} ppb</span>
            </p>
            <hr className="my-1" />
            <p className="flex justify-between">
              <span>Temp:</span>
              <span>{data.temp}°C</span>
            </p>
            <p className="flex justify-between">
              <span>Humidity:</span>
              <span>{data.humidity}%</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  const currentTime = new Date();
  const peakAQI = Math.max(...forecastData.map(d => d.aqi));
  const peakTime = forecastData.find(d => d.aqi === peakAQI)?.time;

  return (
    <section id="forecast" className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">48-Hour Air Quality Forecast</h2>
          <p className="text-muted-foreground">Predicted AQI levels with hourly resolution</p>
        </div>

        <div className="max-w-7xl mx-auto space-y-6">
          {/* Forecast Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-orange-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Peak AQI Expected</p>
                    <p className="text-2xl font-bold text-orange-500">{peakAQI}</p>
                    <p className="text-xs text-muted-foreground">at {peakTime}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Best Air Quality</p>
                    <p className="text-2xl font-bold text-green-500">
                      {Math.min(...forecastData.map(d => d.aqi))}
                    </p>
                    <p className="text-xs text-muted-foreground">Early morning hours</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-purple-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Overall Trend</p>
                    <Badge variant="secondary" className="text-orange-500 border-orange-500">
                      Moderate to Unhealthy*
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">Variable conditions</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Forecast Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Air Quality Index Forecast</span>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-0.5 bg-nasa-blue" />
                    <span>AQI Level</span>
                  </div>
                  <span>Updated: {currentTime.toLocaleTimeString()}</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={forecastData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="time" 
                      stroke="hsl(var(--foreground))"
                      fontSize={12}
                    />
                    <YAxis 
                      stroke="hsl(var(--foreground))"
                      fontSize={12}
                      domain={[0, 150]}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    
                    {/* Reference lines for AQI thresholds */}
                    <ReferenceLine y={50} stroke="#22c55e" strokeDasharray="2 2" strokeWidth={1} />
                    <ReferenceLine y={100} stroke="#f59e0b" strokeDasharray="2 2" strokeWidth={1} />
                    <ReferenceLine y={150} stroke="#f97316" strokeDasharray="2 2" strokeWidth={1} />
                    
                    <Line
                      type="monotone"
                      dataKey="aqi"
                      stroke="hsl(var(--nasa-blue))"
                      strokeWidth={3}
                      dot={{ fill: "hsl(var(--nasa-blue))", strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, fill: "hsl(var(--nasa-blue))" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              {/* Chart Legend */}
              <div className="flex justify-center space-x-6 mt-4 text-xs text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-1 bg-green-500" />
                  <span>Good (0-50)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-1 bg-yellow-500" />
                  <span>Moderate (51-100)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-1 bg-orange-500" />
                  <span>Unhealthy for Sensitive (101-150)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ForecastChart;