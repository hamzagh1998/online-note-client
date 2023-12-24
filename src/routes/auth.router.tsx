import { Navigate, Route, Routes } from "react-router-dom";

import { LoginPage } from "../features/auth/pages/login/login.page";
import { RegisterPage } from "../features/auth/pages/register/register.page";
import { ResetPasswordPage } from "../features/auth/pages/reset-pwd/reset-pwd.page";
import { NewPasswordPage } from "../features/auth/pages/new-pwd/new-pwd.page";

import { AUTH_ROUTES } from "./_routes-names";

export function AuthRouter() {
  return (
    <Routes>
      <Route path={AUTH_ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={AUTH_ROUTES.REGISTER} element={<RegisterPage />} />
      <Route path={AUTH_ROUTES.RESET_PWD} element={<ResetPasswordPage />} />
      <Route path={AUTH_ROUTES.NEW_PWD} element={<NewPasswordPage />} />
      <Route path="/auth" element={<Navigate to={AUTH_ROUTES.LOGIN} />} />
    </Routes>
  );
}
