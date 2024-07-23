import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./domains/auth/context/authProvider";
import App from "./domains/app/app";
import CustomQueryClientProvider from "shared/providers/queryWrapper";
import { ThemeProvider } from "shared/providers/theme-provider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
    <BrowserRouter>
      <AuthProvider>
        <CustomQueryClientProvider>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </CustomQueryClientProvider>
      </AuthProvider>
    </BrowserRouter>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
