import { Satellite, Menu } from "lucide-react";
import { Satellite as SatelliteIcon } from "lucide-react";

const Header = () => {
  const navItems = [
    { label: "Home", href: "#home", active: true },
    { label: "Live Map", href: "#map" },
    { label: "Forecast", href: "#forecast" },
    { label: "Alerts", href: "#alerts" },
    { label: "About", href: "#about" },
    { label: "Profile", href: "#profile" }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/90">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <SatelliteIcon className="h-8 w-8 text-nasa-blue" />
              <div>
                <h1 className="text-xl font-bold text-neutral-900">CleanAir Forecast</h1>
                <p className="text-xs text-nasa-light-blue">Powered by NASA TEMPO</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap items-center justify-end gap-2 text-neutral-900">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`flex items-center justify-center gap-2 rounded-md px-3 h-9 text-sm font-medium underline transition-colors hover:text-neutral-900 ${
                  item.active ? "text-neutral-900" : "text-neutral-900/80"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
