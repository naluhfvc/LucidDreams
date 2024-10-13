import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/auth/Login";
import RegisterPage from "./pages/auth/Register";
import LoginLayout from "./components/layouts/LoginLayout";
import { SnackbarProvider } from "./context/SnackbarContext";
import { NotFound } from './pages/statusCode/NotFound'

function App() {
  return (
    <>
      <SnackbarProvider>
        <Routes>
          <Route element={<LoginLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </SnackbarProvider>
    </>
  );
}

export default App;
