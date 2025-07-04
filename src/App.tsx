import { About } from "./components/About";
import { FAQ } from "./components/FAQ";
import { Features } from "./components/Features";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { HowItWorks } from "./components/HowItWorks";
import { Navbar } from "./components/Navbar";
import { Pricing } from "./components/Pricing";
import { ScrollToTop } from "./components/ScrollToTop";
import { Team } from "./components/Team";
import { Upload } from "./pages/Upload";
import { Profile } from "./pages/Profile";
import { Auth } from "@/components/Auth";
import MapPage from "./pages/MapPage";
import { AdminModerationPanel } from "./pages/AdminModerationPanel";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Supporters } from "./components/Supporters";
import { AuthProvider, useAuth } from "./context/AuthContext"; // <-- обязательно
import "./App.css";

function PrivateRoute({ children }: { children: JSX.Element }) {
  const { user, loading } = useAuth();

  if (loading) return <div className="text-white p-8">Загрузка...</div>;
  if (!user) return <Navigate to="/auth" replace />;
  return children;
}

// ✅ Новая обёртка для защиты админов
function AdminRoute({ children }: { children: JSX.Element }) {
  const { user, userData, loading } = useAuth();

  // Пока идёт загрузка или userData ещё не загружено — просто ждём
  if (loading || userData === null) {
    return <div className="text-white p-8">Загрузка...</div>;
  }

  // Если нет пользователя или роль не admin — редирект на главную
  if (!user || userData.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <About />
                <HowItWorks />
                <Features />
                <Supporters />
                <Team />
                <Pricing />
                <FAQ />
                <Footer />
                <ScrollToTop />
              </>
            }
          />
          <Route path="/upload" element={<Upload />} />
          <Route path="/map" element={<MapPage />} />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminModerationPanel />
              </AdminRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
