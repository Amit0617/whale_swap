import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import HowItWorks from "./pages/HowItWorks";
import Benefits from "./pages/Benefits";
import Comparison from "./pages/Comparison";
import UseCases from "./pages/UseCases";
import Roadmap from "./pages/Roadmap";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
function App() {
  return (
    // Add the Routes and Route components here
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/benefits" element={<Benefits />} />
        <Route path="/comparison" element={<Comparison />} />
        <Route path="/use-cases" element={<UseCases />} />
        <Route path="/roadmap" element={<Roadmap />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
