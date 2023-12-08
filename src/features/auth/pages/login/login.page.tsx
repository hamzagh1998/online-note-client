import { AuthLayout } from "../../components/auth-layout";
import { LoginFormComponent } from "./components/login-form.component";

export function LoginPage() {
  return (
    <div className="h-screen overflow-y-auto">
      <AuthLayout>
        <LoginFormComponent />
      </AuthLayout>
    </div>
  );
}
