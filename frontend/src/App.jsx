import WelcomePage from "./components/WelcomePage";
import Demo from "./components/Demo";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EnergyComponentPage from "./components/EnergyComponentPage";
import NotFoundPage from "./components/NotFoundPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<WelcomePage />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/component/:id" element={<EnergyComponentPage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}
export default App;
