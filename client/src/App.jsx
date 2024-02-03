import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import AuthRoute from "./components/AuthRoute";
import { useSelector } from "react-redux";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <BrowserRouter>
      {/* header */}
      {/* <Nav /> */}
      <Routes>
        <Route path="/" element={<Home />} />
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
