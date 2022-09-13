import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.esm";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register-Login/Register";
import Login from "./pages/Register-Login/Login";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import ErrorPage from "./pages/ErrorPage";
import { Routes, Route } from "react-router-dom";
import { MyGlobalPropsProvider } from "./context";


function App() {
  const { myAuth, loading } = MyGlobalPropsProvider();
  console.log(myAuth);
  if (myAuth === null && loading) {
    return <h1>This page is loading...</h1>;
  }
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />
        <Route
          path="/register"
          element={
            <>
              <Navbar />
              <Register />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Navbar />
              <Login />
            </>
          }
        />
        {myAuth ? (
          myAuth.isAdmin ? (
            <Route
              path="/admin"
              element={
                <>
                  <Navbar />
                  <Admin />
                </>
              }
            />
          ) : null
        ) : null}
        <Route
          path="/profile"
          element={
            <>
              <Navbar />
              <Profile />
            </>
          }
        />


        {/* {myAuth ? (
          <Route
            path="/profile"
            element={
              <>
                <Navbar />
                <Profile />
              </>
            }
          />
        ) : null} */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
