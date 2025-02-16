import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CardPage from "./pages/CardPage";
import BillPage from "./pages/BillPage";
import CustomersPage from "./pages/CustomersPage";
import StatisticsPage from "./pages/StatisticsPage";
import RegisterPage from "./pages/auth/Register";
import LoginPage from "./pages/auth/Login";
import ProductPage from "./pages/ProductPage";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  const card = useSelector((state) => state.card);
  //console.log(card);

  useEffect(() => {
    localStorage.setItem("card", JSON.stringify(card));
  }, [card]);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <RouteControl>
              <HomePage />
            </RouteControl>
          }
        />
        <Route
          path="/card"
          element={
            <RouteControl>
              <CardPage />
            </RouteControl>
          }
        />
        <Route
          path="/bills"
          element={
            <RouteControl>
              <BillPage />
            </RouteControl>
          }
        />
        <Route
          path="/customers"
          element={
            <RouteControl>
              <CustomersPage />
            </RouteControl>
          }
        />
        <Route
          path="/statistics"
          element={
            <RouteControl>
              <StatisticsPage />
            </RouteControl>
          }
        />
        <Route
          path="/products"
          element={
            <RouteControl>
              <ProductPage />
            </RouteControl>
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

export const RouteControl = ({ children }) => {
  if (localStorage.getItem("posUser")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};
