import { Satellite, Globe, Mail, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer id="about" className="bg-nasa-dark text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About NASA TEMPO */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Satellite className="h-6 w-6 text-nasa-blue" />
              <h3 className="text-lg font-semibold">NASA TEMPO</h3>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              The Tropospheric Emissions: Monitoring of Pollution (TEMPO) instrument provides 
              hourly daytime observations of air quality across North America from geostationary orbit.
            </p>
            <Button variant="outline" size="sm" className="text-nasa-blue border-nasa-blue hover:bg-nasa-blue hover:text-white">
              <ExternalLink className="h-4 w-4 mr-2" />
              Learn More
            </Button>
          </div>

          {/* Mission Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Mission</h3>
            <div className="space-y-3 text-sm text-gray-300">
              <div>
                <h4 className="font-medium text-white">Launch:</h4>
                <p>April 7, 2023</p>
              </div>
              <div>
                <h4 className="font-medium text-white">Coverage:</h4>
                <p>North America (Mexico to Canada)</p>
              </div>
              <div>
                <h4 className="font-medium text-white">Resolution:</h4>
                <p>Hourly daytime observations</p>
              </div>
              <div>
                <h4 className="font-medium text-white">Key Pollutants:</h4>
                <p>NO₂, O₃, SO₂, HCHO, Aerosols</p>
              </div>
            </div>
          </div>

          {/* Data Sources */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Data Sources</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-nasa-blue rounded-full" />
                <span>NASA TEMPO Satellite</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <span>EPA Ground Monitoring Network</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full" />
                <span>NOAA Weather Data</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full" />
                <span>State/Local Air Quality Networks</span>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-3">
              Data fusion algorithms combine multiple sources for enhanced accuracy and coverage.
            </p>
          </div>

          {/* Contact & Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Resources</h3>
            <div className="space-y-2">
              <a href="#" className="flex items-center space-x-2 text-sm text-gray-300 hover:text-nasa-blue transition-colors">
                <Globe className="h-4 w-4" />
                <span>NASA Earth Science</span>
              </a>
              <a href="#" className="flex items-center space-x-2 text-sm text-gray-300 hover:text-nasa-blue transition-colors">
                <Mail className="h-4 w-4" />
                <span>Contact Support</span>
              </a>
              <a href="#" className="flex items-center space-x-2 text-sm text-gray-300 hover:text-nasa-blue transition-colors">
                <ExternalLink className="h-4 w-4" />
                <span>API Documentation</span>
              </a>
              <a href="#" className="flex items-center space-x-2 text-sm text-gray-300 hover:text-nasa-blue transition-colors">
                <ExternalLink className="h-4 w-4" />
                <span>Terms of Use</span>
              </a>
            </div>
          </div>
        </div>

        <hr className="border-gray-700 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Satellite className="h-5 w-5 text-nasa-blue" />
              <span className="font-semibold">CleanAir Forecast</span>
            </div>
            <span className="text-sm text-gray-400">
              Powered by NASA TEMPO Mission
            </span>
          </div>
          
          <div className="flex items-center space-y-2 md:space-y-0 md:space-x-6 text-xs text-gray-400 flex-col md:flex-row">
            <span>© 2024 NASA Earth Science Division</span>
            <span className="hidden md:inline">•</span>
            <span>Data updated every hour</span>
            <span className="hidden md:inline">•</span>
            <span>Built for the NASA TEMPO Challenge</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;