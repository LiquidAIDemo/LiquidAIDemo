import Welcome from "./components/Welcome";
import Demo from "./components/Demo";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Welcome />} />
        <Route path="/demo" element={<Demo />} />
      </Routes>
    </Router>
  );
}
export default App;
