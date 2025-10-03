import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingDown, TrendingUp, Satellite, MapPin } from "lucide-react";
import { useState } from "react";

const HistoricalTrends = () => {
  const [timeRange, setTimeRange] = useState("7days");
  const [dataSource, setDataSource] = useState("both");

  // Mock historical data for the past 7 days
  const historicalData = [
    {
      date: "Jan 8",
      satellite: 78,
      ground: 82,
      combined: 80,
      pm25: 22.1,
      o3: 65,
      no2: 38
    },
    {
      date: "Jan 9", 
      satellite: 85,
      ground: 88,
      combined: 87,
      pm25: 25.3,
      o3: 70,
      no2: 42
    },
    {
      date: "Jan 10",
      satellite: 92,
      ground: 89,
      combined: 91,
      pm25: 28.7,
      o3: 75,
      no2: 45
    },
    {
      date: "Jan 11",
      satellite: 105,
      ground: 98,
      combined: 102,
      pm25: 32.1,
      o3: 88,
      no2: 52
    },
    {
      date: "Jan 12",
      satellite: 95,
      ground: 102,
      combined: 98,
      pm25: 29.8,
      o3: 82,
      no2: 48
    },
    {
      date: "Jan 13",
      satellite: 88,
      ground: 91,
      combined: 90,
      pm25: 26.4,
      o3: 74,
      no2: 44
    },
    {
      date: "Jan 14",
      satellite: 82,
      ground: 85,
      combined: 84,
      pm25: 24.2,
      o3: 68,
      no2: 40
    }
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background/95 backdrop-blur border rounded-lg p-3 shadow-lg">
          <p className="font-semibold mb-2">{`Date: ${label}`}</p>
          <div className="space-y-1 text-sm">
            {payload.map((entry, index) => (
              <p key={index} className="flex justify-between">
                <span>{entry.name}:</span>
                <span style={{ color: entry.color }} className="font-semibold">
                  {entry.value}
                </span>
              </p>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  const averageAQI = Math.round(historicalData.reduce((sum, day) => sum + day.combined, 0) / historicalData.length);
  const trend = historicalData[historicalData.length - 1].combined - historicalData[0].combined;
  const maxAQI = Math.max(...historicalData.map(d => d.combined));
  const minAQI = Math.min(...historicalData.map(d => d.combined));

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Historical Air Quality Trends</h2>
          <p className="text-muted-foreground">Compare satellite vs ground sensor data over time</p>
        </div>

        <div className="max-w-7xl mx-auto space-y-6">
          {/* Controls */}
          <Card>
            <CardHeader>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <CardTitle>Trend Analysis</CardTitle>
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">Time Range:</span>
                    {["7days", "30days", "90days"].map((range) => (
                      <Button
                        key={range}
                        size="sm"
                        variant={timeRange === range ? "default" : "outline"}
                        onClick={() => setTimeRange(range)}
                      >
                        {range === "7days" ? "7 Days" : range === "30days" ? "30 Days" : "90 Days"}
                      </Button>
                    ))}
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">Data Source:</span>
                    {[
                      { key: "both", label: "Combined" },
                      { key: "satellite", label: "Satellite" },
                      { key: "ground", label: "Ground" }
                    ].map((source) => (
                      <Button
                        key={source.key}
                        size="sm"
                        variant={dataSource === source.key ? "default" : "outline"}
                        onClick={() => setDataSource(source.key)}
                      >
                        {source.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Average AQI</p>
                    <p className="text-2xl font-bold">{averageAQI}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant={averageAQI <= 50 ? "secondary" : averageAQI <= 100 ? "outline" : "destructive"}>
                      {averageAQI <= 50 ? "Good" : averageAQI <= 100 ? "Moderate" : "Unhealthy*"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">7-Day Trend</p>
                    <div className="flex items-center space-x-2">
                      {trend > 0 ? (
                        <TrendingUp className="h-5 w-5 text-red-500" />
                      ) : (
                        <TrendingDown className="h-5 w-5 text-green-500" />
                      )}
                      <p className="text-2xl font-bold">{Math.abs(trend)}</p>
                    </div>
                  </div>
                  <Badge variant={trend > 0 ? "destructive" : "secondary"}>
                    {trend > 0 ? "Worsening" : "Improving"}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div>
                  <p className="text-sm text-muted-foreground">Peak AQI</p>
                  <p className="text-2xl font-bold text-orange-500">{maxAQI}</p>
                  <p className="text-xs text-muted-foreground">Highest this week</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div>
                  <p className="text-sm text-muted-foreground">Best AQI</p>
                  <p className="text-2xl font-bold text-green-500">{minAQI}</p>
                  <p className="text-xs text-muted-foreground">Lowest this week</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Historical Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Air Quality Trends - Past 7 Days</span>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Satellite className="h-4 w-4 text-nasa-blue" />
                    <span>TEMPO Satellite</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-green-500" />
                    <span>Ground Sensors</span>
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={historicalData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="date" stroke="hsl(var(--foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--foreground))" fontSize={12} domain={[0, 150]} />
                    <Tooltip content={<CustomTooltip />} />
                    
                    {(dataSource === "both" || dataSource === "satellite") && (
                      <Line
                        type="monotone"
                        dataKey="satellite"
                        stroke="hsl(var(--nasa-blue))"
                        strokeWidth={2}
                        name="TEMPO Satellite"
                        dot={{ fill: "hsl(var(--nasa-blue))", strokeWidth: 2, r: 4 }}
                        strokeDasharray={dataSource === "satellite" ? "0" : "5 5"}
                      />
                    )}
                    
                    {(dataSource === "both" || dataSource === "ground") && (
                      <Line
                        type="monotone"
                        dataKey="ground"
                        stroke="#22c55e"
                        strokeWidth={2}
                        name="Ground Sensors"
                        dot={{ fill: "#22c55e", strokeWidth: 2, r: 4 }}
                        strokeDasharray={dataSource === "ground" ? "0" : "5 5"}
                      />
                    )}
                    
                    {dataSource === "both" && (
                      <Line
                        type="monotone"
                        dataKey="combined"
                        stroke="#8b5cf6"
                        strokeWidth={3}
                        name="Combined Data"
                        dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 5 }}
                      />
                    )}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Data Comparison Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Satellite vs Ground Sensor Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-muted/20 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Satellite className="h-5 w-5 text-nasa-blue" />
                      <div>
                        <p className="font-semibold">TEMPO Satellite</p>
                        <p className="text-sm text-muted-foreground">Wide area coverage</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold">
                        {Math.round(historicalData.reduce((sum, day) => sum + day.satellite, 0) / historicalData.length)}
                      </p>
                      <p className="text-xs text-muted-foreground">Avg AQI</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-muted/20 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="font-semibold">Ground Sensors</p>
                        <p className="text-sm text-muted-foreground">Localized measurements</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold">
                        {Math.round(historicalData.reduce((sum, day) => sum + day.ground, 0) / historicalData.length)}
                      </p>
                      <p className="text-xs text-muted-foreground">Avg AQI</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                  <p className="text-sm">
                    <span className="font-semibold text-blue-700 dark:text-blue-300">Fusion Advantage:</span>
                    <span className="text-blue-600 dark:text-blue-400 ml-2">
                      Combining satellite and ground data provides more accurate and comprehensive air quality monitoring, 
                      especially in areas with limited ground sensor coverage.
                    </span>
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 border-l-4 border-orange-500 bg-orange-50 dark:bg-orange-950/20">
                  <h4 className="font-semibold text-orange-700 dark:text-orange-300">Peak Pollution Period</h4>
                  <p className="text-sm text-orange-600 dark:text-orange-400">
                    Highest AQI levels occurred on Jan 11 (102), likely due to weather conditions and increased emissions.
                  </p>
                </div>
                
                <div className="p-3 border-l-4 border-green-500 bg-green-50 dark:bg-green-950/20">
                  <h4 className="font-semibold text-green-700 dark:text-green-300">Improving Trend</h4>
                  <p className="text-sm text-green-600 dark:text-green-400">
                    Air quality has been improving over the past 3 days, with AQI dropping from 102 to 84.
                  </p>
                </div>
                
                <div className="p-3 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950/20">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-300">Data Accuracy</h4>
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    Satellite and ground sensor data show good correlation (±5 AQI), validating the fusion approach.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HistoricalTrends;