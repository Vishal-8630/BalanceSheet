import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App.jsx";
import "./main.scss";

import AllBalanceSheet from "./components/AllBalanceSheet";
import Authentication from "./components/Authentication";
import Profile from "./components/Profile";
import BalanceSheetForm from "./components/BalanceSheetForm";
import ViewBalanceSheet from "./components/ViewBalanceSheet";
import AdminPage from "./components/Admin";
import { AuthProvider } from "./contexts/AuthContext";
import { NotificationProvider } from "./contexts/NotificationContext.jsx";
import { AdminProvider } from './contexts/AdminContext.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<AllBalanceSheet />} />
      <Route path="/auth/login" element={<Authentication />} />
      <Route path="/auth/register" element={<Authentication />} />
      <Route path="/auth/verify-otp" element={<Authentication />} />
      <Route path="/profile/:id" element={<Profile />} />
      <Route path="/add-balance-sheet" element={<BalanceSheetForm />} />
      <Route path="/edit-balance-sheet/:id" element={<BalanceSheetForm />} />
      <Route path="/view-balance-sheet/:id" element={<ViewBalanceSheet />} />
      <Route path="/admin-mode" element={<AdminPage />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AdminProvider>
    <NotificationProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </NotificationProvider>
    </AdminProvider>
  </StrictMode>
);
