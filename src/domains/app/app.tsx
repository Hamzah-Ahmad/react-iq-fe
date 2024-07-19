import { Routes, Route } from "react-router-dom";
import "./app.css";
import Register from "../auth/pages/register.page";
import Login from "../auth/pages/login.page";
import Layout from "./components/Layout";
import PersistLogin from "../auth/components/persistLogin";
import RequireAuth from "../auth/components/requireAuth";
import Posts from "../posts/pages/posts.page";
import useRefreshToken from "../auth/hooks/useRefreshToken";
import useLogout from "../auth/hooks/useLogout";
import Dashboard from "domains/dashboard/pages/dashboard.page";

function App() {
  const refresh = useRefreshToken();
  const logout = useLogout();
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="unauthorized" element={<div>Unauthorized</div>} />

        {/* Private route */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={["user"]} />}>
            <Route
              path="/"
              element={
                <div>
                  <button onClick={refresh}>Refresh</button>
                  <button onClick={logout}>Logout</button>
                </div>
              }
            />
            <Route path="lounge" element={<div>Lounge</div>} />
            <Route path="admin" element={<div>Admin</div>} />
            {/* <Route path="user" element={<Users />} /> */}
            <Route path="posts" element={<Posts />} />
            <Route path="unauthorized" element={<div>Unauthorized</div>} />
          </Route>
        </Route>

        <Route path="*" element={"Missing"} />
      </Route>
    </Routes>
  );
}

export default App;
