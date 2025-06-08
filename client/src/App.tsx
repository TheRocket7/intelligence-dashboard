// App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LogIn from "./pages/LogIn";
import NotFound from "./pages/NotFound";
import { useEffect, useState } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import { DataProvider } from "./context/reportsDataContext";
import { ToastContainer, Bounce } from "react-toastify";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <DataProvider>
                <Dashboard />

                <ToastContainer
                  position="top-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick={false}
                  rtl={false}
                  pauseOnFocusLoss={false}
                  draggable
                  pauseOnHover
                  theme="light"
                  transition={Bounce}
                />
              </DataProvider>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
