import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register-Login/Register";
import Login from "./pages/Register-Login/Login";
import Profile from "./pages/Profile";
import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { MyGlobalPropsProvider } from "./context";

function App() {
  const { myAuth } = MyGlobalPropsProvider();
  console.log(myAuth);
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
