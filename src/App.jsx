import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login/Login";
import LoginLayout from "./components/layouts/LoginLayout";

function App() {
    return (
        <Routes>
            <Route element={<LoginLayout />} >
                <Route path="/login" element={<LoginPage />} />
            </Route>
        </Routes>
    );
}

export default App;
