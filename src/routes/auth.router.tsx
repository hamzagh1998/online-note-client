import { Navigate, Route, Routes } from "react-router-dom";

import { LoginPage } from "../features/auth/pages/login/login.page";
import { RegisterPage } from "../features/auth/pages/register/register.page";
import { ResetPasswordPage } from "../features/auth/pages/reset-pwd/reset-pwd.page";
import { NewPasswordPage } from "../features/auth/pages/new-pwd/new-pwd.page";

export function AuthRouter() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/new-password" element={<NewPasswordPage />} />
      <Route path="/auth" element={<Navigate to="/login" />} />
    </Routes>
  );
}
