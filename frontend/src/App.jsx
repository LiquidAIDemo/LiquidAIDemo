import Home from './components/Home';
import Demo from './components/Demo';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/demo" element={<Demo />} />
      </Routes>
    </Router> 
  );
}
export default App;