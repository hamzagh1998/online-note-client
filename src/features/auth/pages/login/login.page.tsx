import { AuthLayout } from "../../components/auth-layout";
import { LoginFormComponent } from "./components/login-form.component";

export function LoginPage() {
  return (
    <div className="h-screen overflow-x-hidden">
      <AuthLayout>
        <LoginFormComponent />
      </AuthLayout>
    </div>
  );
}
