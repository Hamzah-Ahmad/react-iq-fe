import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./index.css";

import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./domains/auth/context/authProvider";
import App from "./domains/app/app";
import CustomQueryClientProvider from "./shared/wrappers/queryWrapper";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <Link to="/login">Login </Link>
    <Link to="/">Home </Link>
    <Link to="/posts">Posts </Link>

    <AuthProvider>
      <CustomQueryClientProvider>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </CustomQueryClientProvider>
    </AuthProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
