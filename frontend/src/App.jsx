import Welcome from "./components/Welcome";
import Demo from "./components/Demo";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EnergyComponentPage from "./components/EnergyComponentPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Welcome />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/component/:id" element={<EnergyComponentPage/>} />
      </Routes>
    </Router>
  );
}
export default App;
