import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Features from "./pages/Features";
import HowItWorks from "./pages/HowItWorks";
import JoinRoom from "./pages/JoinRoom";
import VideoCall from "./pages/VideoCall";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-white dark:bg-primary-950 transition-colors duration-500">
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/join" element={<JoinRoom />} />
            <Route path="/call" element={<VideoCall />} />
            <Route path="/room/:roomId" element={<VideoCall />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
