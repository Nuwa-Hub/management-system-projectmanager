import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import { routes } from "./routes";
import ProtectedRoute from "./common/protectedRoute";
import { useSelector } from "react-redux";
import Home from "./pages/home/Home";

function App() {
  const user = useSelector((state) => state.user.currentUser);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={user?.isAdmin ? <ProtectedRoute element={<Home/>}/>:<Login />} />
        {routes.map(({ element, path, name }) => (
          <Route
            key={name}
            path={path}
            element={<ProtectedRoute element={element} />}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
