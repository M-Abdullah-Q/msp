import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Video, Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

const Navigation: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [isLanding, setIsLanding] = useState(true);
  const [visible, setVisible] = useState(true);

  const isActive = (path: string) => location.pathname === path;

  // Set up intersection observer for scroll-based highlighting
  useEffect(() => {
    // Only run on home page
    if (location.pathname.startsWith("/call")) {
      setVisible(false);
      setActiveSection("");
      return;
    }
    if (location.pathname !== "/") {
      setIsLanding(false);
      setActiveSection("");
      return;
    }

    setIsLanding(true);

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px", // Trigger when section is 20% from top
      threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    // Observe the sections
    const heroSection = document.getElementById("hero");
    const featuresSection = document.getElementById("features");
    const howItWorksSection = document.getElementById("how-it-works");

    if (heroSection) observer.observe(heroSection);
    if (featuresSection) observer.observe(featuresSection);
    if (howItWorksSection) observer.observe(howItWorksSection);

    // Clnup
    return () => {
      if (heroSection) observer.unobserve(heroSection);
      if (featuresSection) observer.unobserve(featuresSection);
      if (howItWorksSection) observer.unobserve(howItWorksSection);
      observer.disconnect();
    };
  }, [location.pathname]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    setIsMobileMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isHeroSectionActive =
    location.pathname === "/" && activeSection === "hero";
  const isFeaturesSectionActive =
    location.pathname === "/" && activeSection === "features";
  const isHowItWorksSectionActive =
    location.pathname === "/" && activeSection === "how-it-works";

  return (
    <>
      {visible && (
        <nav className="fixed top-0 left-0 right-0 m-4 z-50 bg-white/80 dark:bg-primary-900/80 backdrop-blur-md border rounded-3xl border-gray-200 dark:border-primary-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-14 sm:h-16">
              {/* Logo */}
              <Link
                to="/"
                className="flex items-center space-x-2 group"
                onClick={closeMobileMenu}
              >
                <div className="p-1.5 sm:p-2 bg-primary-500 rounded-lg group-hover:bg-primary-600 transition-colors duration-200">
                  <Video className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
                <span className="font-happy text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                  ConnectSpace
                </span>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
                <Link
                  to="/"
                  onClick={() => scrollToSection("hero")}
                  className={`font-inter text-sm font-medium transition-colors duration-200 ${
                    isHeroSectionActive
                      ? "text-primary-600 dark:text-primary-400"
                      : "text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                  }`}
                >
                  Home
                </Link>
                {isLanding && (
                  <>
                    <button
                      onClick={() => scrollToSection("features")}
                      className={`font-inter text-sm font-medium transition-colors duration-200 ${
                        isFeaturesSectionActive
                          ? "text-primary-600 dark:text-primary-400"
                          : "text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                      }`}
                    >
                      Features
                    </button>
                    <button
                      onClick={() => scrollToSection("how-it-works")}
                      className={`font-inter text-sm font-medium transition-colors duration-200 ${
                        isHowItWorksSectionActive
                          ? "text-primary-600 dark:text-primary-400"
                          : "text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                      }`}
                    >
                      How It Works
                    </button>
                  </>
                )}
                <Link
                  to="/join"
                  className={`font-inter text-sm font-medium transition-colors duration-200 ${
                    isActive("/join")
                      ? "text-primary-600 dark:text-primary-400"
                      : "text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                  }`}
                >
                  Join Room
                </Link>
              </div>

              {/* Theme Toggle & CTA */}
              <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-primary-800 hover:bg-gray-200 dark:hover:bg-primary-700 transition-colors duration-200"
                  aria-label="Toggle theme"
                >
                  {isDark ? (
                    <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
                  ) : (
                    <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                  )}
                </button>
                <Link
                  to="/call"
                  className="px-3 sm:px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-inter font-medium text-sm sm:text-base transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
                >
                  Start a Call
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-primary-800 hover:bg-gray-200 dark:hover:bg-primary-700 transition-colors duration-200"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 dark:text-gray-300" />
                ) : (
                  <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 dark:text-gray-300" />
                )}
              </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
              <div className="md:hidden py-4 border-t border-gray-200 dark:border-primary-800">
                <div className="flex flex-col space-y-3">
                  <Link
                    to="/"
                    onClick={() => scrollToSection("hero")}
                    className={`font-inter text-sm font-medium py-2 transition-colors duration-200 ${
                      isHeroSectionActive
                        ? "text-primary-600 dark:text-primary-400"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    Home
                  </Link>
                  <button
                    onClick={() => scrollToSection("features")}
                    className={`font-inter text-sm font-medium py-2 text-left transition-colors duration-200 ${
                      isFeaturesSectionActive
                        ? "text-primary-600 dark:text-primary-400"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    Features
                  </button>
                  <button
                    onClick={() => scrollToSection("how-it-works")}
                    className={`font-inter text-sm font-medium py-2 text-left transition-colors duration-200 ${
                      isHowItWorksSectionActive
                        ? "text-primary-600 dark:text-primary-400"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    How It Works
                  </button>
                  <Link
                    to="/join"
                    onClick={closeMobileMenu}
                    className={`font-inter text-sm font-medium py-2 transition-colors duration-200 ${
                      isActive("/join")
                        ? "text-primary-600 dark:text-primary-400"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    Join Room
                  </Link>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-primary-800">
                    <button
                      onClick={toggleTheme}
                      className="p-2 rounded-lg bg-gray-100 dark:bg-primary-800 hover:bg-gray-200 dark:hover:bg-primary-700 transition-colors duration-200"
                    >
                      {isDark ? (
                        <Sun className="w-5 h-5 text-yellow-500" />
                      ) : (
                        <Moon className="w-5 h-5 text-gray-600" />
                      )}
                    </button>
                    <Link
                      to="/call"
                      onClick={closeMobileMenu}
                      className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-inter font-medium text-sm transition-all duration-200"
                    >
                      Start a Call
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </nav>
      )}
    </>
  );
};

export default Navigation;
