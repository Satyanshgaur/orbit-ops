import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Area, AreaChart } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, TrendingUp } from "lucide-react";

const ForecastChart = () => {
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
    if (aqi <= 50) return "#22c55e";
    if (aqi <= 100) return "#f59e0b";
    if (aqi <= 150) return "#f97316";
    return "#ef4444";
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white/95 backdrop-blur-sm border-2 border-blue-200 rounded-xl p-4 shadow-2xl animate-in fade-in zoom-in duration-200">
          <p className="font-bold mb-3 text-blue-600 text-base">{`Time: ${label}`}</p>
          <div className="space-y-2 text-sm">
            <p className="flex justify-between gap-4">
              <span className="text-gray-600">AQI:</span>
              <span className="font-bold text-lg" style={{ color: getAQIColor(data.aqi) }}>
                {data.aqi}
              </span>
            </p>
            <p className="flex justify-between gap-4">
              <span className="text-gray-600">PM2.5:</span>
              <span className="font-semibold">{data.pm25} μg/m³</span>
            </p>
            <p className="flex justify-between gap-4">
              <span className="text-gray-600">O₃:</span>
              <span className="font-semibold">{data.o3} ppb</span>
            </p>
            <p className="flex justify-between gap-4">
              <span className="text-gray-600">NO₂:</span>
              <span className="font-semibold">{data.no2} ppb</span>
            </p>
            <hr className="my-2 border-blue-100" />
            <p className="flex justify-between gap-4">
              <span className="text-gray-600">Temp:</span>
              <span className="font-semibold text-orange-600">{data.temp}°C</span>
            </p>
            <p className="flex justify-between gap-4">
              <span className="text-gray-600">Humidity:</span>
              <span className="font-semibold text-blue-600">{data.humidity}%</span>
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
  const minAQI = Math.min(...forecastData.map(d => d.aqi));

  return (
    <section id="forecast" className="py-12 bg-gradient-to-b from-blue-50 to-white">
      <style>{`
        .stat-card {
          transition: all 0.3s ease;
        }
        
        .stat-card:hover {
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }
      `}</style>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Predicts Pollutants for Next 48 Hours
          </h2>
          <p className="text-gray-600 text-lg">Predicted Pollutants levels with hourly resolution</p>
        </div>

        <div className="max-w-7xl mx-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="stat-card border-orange-200 bg-gradient-to-br from-orange-50 to-white">
              <CardContent className="pt-6">
                <div className="flex items-start space-x-3">
                  <div className="p-3 bg-orange-100 rounded-full">
                    <TrendingUp className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium mb-1">Total Pollutants Expected</p>
                    <p className="text-3xl font-bold text-orange-600">{peakAQI}</p>
                    <p className="text-xs text-gray-500 mt-1">at {peakTime}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="stat-card border-green-200 bg-gradient-to-br from-green-50 to-white">
              <CardContent className="pt-6">
                <div className="flex items-start space-x-3">
                  <div className="p-3 bg-green-100 rounded-full">
                    <Clock className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium mb-1">Best Air Quality</p>
                    <p className="text-3xl font-bold text-green-600">{minAQI}</p>
                    <p className="text-xs text-gray-500 mt-1">Early morning hours</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="stat-card border-purple-200 bg-gradient-to-br from-purple-50 to-white">
              <CardContent className="pt-6">
                <div className="flex items-start space-x-3">
                  <div className="p-3 bg-purple-100 rounded-full">
                    <Calendar className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium mb-1">Overall Trend</p>
                    <Badge variant="secondary" className="text-orange-600 border-orange-400 bg-orange-50 text-sm px-3 py-1">
                      Moderate to Unhealthy
                    </Badge>
                    <p className="text-xs text-gray-500 mt-2">Variable conditions</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="chart-container border-2 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
              <CardTitle className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                <span className="text-2xl font-bold text-gray-800">Predicted Pollutant Throughout The Day</span>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-2 bg-white px-3 py-1 rounded-full">
                    <div className="w-4 h-1 bg-blue-600 rounded-full" />
                    <span className="font-medium">Total Pollutant</span>
                  </div>
                  <span className="text-xs">Updated: {currentTime.toLocaleTimeString()}</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-[450px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={forecastData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                    <defs>
                      <linearGradient id="colorAqi" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                        <stop offset="50%" stopColor="#8b5cf6" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" strokeWidth={1} />
                    <XAxis 
                      dataKey="time" 
                      stroke="#6b7280"
                      fontSize={13}
                      fontWeight={500}
                      tickMargin={10}
                    />
                    <YAxis 
                      stroke="#6b7280"
                      fontSize={13}
                      fontWeight={500}
                      domain={[0, 150]}
                      tickMargin={10}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#3b82f6', strokeWidth: 2, strokeDasharray: '5 5' }} />
                    
                    <ReferenceLine y={50} stroke="#22c55e" strokeDasharray="4 4" strokeWidth={2} opacity={0.6} />
                    <ReferenceLine y={100} stroke="#f59e0b" strokeDasharray="4 4" strokeWidth={2} opacity={0.6} />
                    <ReferenceLine y={150} stroke="#f97316" strokeDasharray="4 4" strokeWidth={2} opacity={0.6} />
                    
                    <Area
                      type="monotone"
                      dataKey="aqi"
                      stroke="none"
                      fill="url(#colorAqi)"
                      animationDuration={2000}
                      animationEasing="ease-in-out"
                    />
                    
                    <Line
                      type="monotone"
                      dataKey="aqi"
                      stroke="#3b82f6"
                      strokeWidth={4}
                      dot={{ 
                        fill: "#3b82f6", 
                        strokeWidth: 3,
                        stroke: "#fff",
                        r: 6,
                        className: "recharts-dot"
                      }}
                      activeDot={{ 
                        r: 10, 
                        fill: "#3b82f6",
                        stroke: "#fff",
                        strokeWidth: 3,
                        filter: "drop-shadow(0 0 8px rgba(59, 130, 246, 0.6))"
                      }}
                      animationDuration={2500}
                      animationEasing="ease-in-out"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              
              <div className="flex flex-wrap justify-center gap-6 mt-6 pt-4 border-t">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-3 bg-green-500 rounded" />
                  <span className="text-sm font-medium text-gray-700">Good (0-50)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-3 bg-yellow-500 rounded" />
                  <span className="text-sm font-medium text-gray-700">Moderate (51-100)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-3 bg-orange-500 rounded" />
                  <span className="text-sm font-medium text-gray-700">Unhealthy for Sensitive (101-150)</span>
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