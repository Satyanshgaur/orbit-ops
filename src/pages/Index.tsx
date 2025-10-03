import Header from "@/components/Header";
import AQIDashboard from "@/components/AQIDashboard";
import InteractiveMap from "@/components/InteractiveMap";
import ForecastChart from "@/components/ForecastChart";
import AlertPanel from "@/components/AlertPanel";
import HistoricalTrends from "@/components/HistoricalTrends";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <AQIDashboard />
        <InteractiveMap />
        <ForecastChart />
        <AlertPanel />
        <HistoricalTrends />
      </main>
      <Footer />
    </div>
  );
};

export default Index;