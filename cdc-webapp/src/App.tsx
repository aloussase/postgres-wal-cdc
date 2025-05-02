import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./Navbar.tsx";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="*" element={<Navbar />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
