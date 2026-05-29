import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/shared/Header/Header";
import Footer from "./components/shared/Footer/Footer";
import CalculatorPage from "./pages/calculator/CalculatorPage";
import ReflectionsPage from "./pages/reflections/ReflectionsPage";
import HistoryPage from "./pages/history/HistoryPage";

const App = () => {
  return (
    <div className="flex min-h-screen flex-col bg-paper text-ink">
      <Header />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Navigate to="/calculator" replace />} />
          <Route path="/calculator" element={<CalculatorPage />} />
          <Route path="/reflections" element={<ReflectionsPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="*" element={<Navigate to="/calculator" replace />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
