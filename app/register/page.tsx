import AuthForm from "@/components/AuthForm";
import ResponsiveContainer from "@/components/ResponsiveContainer";

export default function RegisterPage() {
  return (
    <ResponsiveContainer>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <AuthForm mode="register" />
      </div>
    </ResponsiveContainer>
  );
}
