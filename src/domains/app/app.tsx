import { Navigate, Routes, Route } from "react-router-dom";
import "./app.css";
import Register from "../auth/pages/register.page";
import Login from "../auth/pages/login.page";
import Layout from "./components/Layout";
import PersistLogin from "../auth/components/persistLogin";
// import RequireAuth from "../auth/components/requireAuth";
// import useRefreshToken from "../auth/hooks/useRefreshToken";
// import useLogout from "../auth/hooks/useLogout";
import Homepage from "domains/homepage/pages/homepage.page";
import { Toaster } from "sonner";

function App() {
  // const refresh = useRefreshToken();
  // const logout = useLogout();

  return (
    <>
      <Toaster richColors />
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public Routes */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="unauthorized" element={<div>Unauthorized</div>} />

          {/* Private route */}
          <Route element={<PersistLogin />}>
            <Route path="/homepage" element={<Homepage />} />
            {/* <Route element={<RequireAuth allowedRoles={["user"]} />}> */}
            <Route
              path="/"
              element={
                <Navigate
                  to={{
                    pathname: "/homepage",
                  }}
                />
              }
            />
            {/* </Route> */}
          </Route>

          <Route path="*" element={"Missing"} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
