import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import CalculatorPage from "./pages/calculator/CalculatorPage";
import ReflectionsPage from "./pages/reflections/ReflectionsPage";
import HistoryPage from "./pages/history/HistoryPage";

function App() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f2f5f5" }}>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/calculator" replace />} />
        <Route path="/calculator" element={<CalculatorPage />} />
        <Route path="/reflections" element={<ReflectionsPage />} />
        <Route path="/history" element={<HistoryPage />} />
      </Routes>
    </div>
  );
}

export default App;
