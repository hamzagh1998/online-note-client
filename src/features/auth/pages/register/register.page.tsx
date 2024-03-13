import { AuthLayout } from "../../components/auth-layout";
import { RegisterFormComponent } from "./components/register-form.component";

export function RegisterPage() {
  return (
    <div className="h-screen overflow-x-hidden">
      <AuthLayout>
        <RegisterFormComponent />
      </AuthLayout>
    </div>
  );
}
