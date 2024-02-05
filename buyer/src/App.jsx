import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import AuthRoute from "./components/AuthRoute";
import { useSelector } from "react-redux";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import Nego from "./pages/Nego";

function App() {
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    Aos.init({
      duration: 1800,
      offset: 100,
    });
  }, []);
  return (
    <BrowserRouter>
      {/* header */}
      {/* <Nav /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Nego />} />
        <Route element={<AuthRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
