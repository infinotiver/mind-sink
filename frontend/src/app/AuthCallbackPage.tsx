import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";
import { Spinner } from "@/components/ui/spinner";

export default function AuthCallbackPage() {
  const [params] = useSearchParams();
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const token = params.get("token");
      if (token) {
        console.log(`Received token: ${token.slice(0, 6)}...`); // Log clipped token
        login(token);
        console.log("Login successful, navigating to dashboard.");
        navigate("/dashboard"); // or home page
      } else {
        console.warn("No token found in the URL, navigating to login.");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error during authentication callback:", error);
      navigate("/login");
    }
  }, [params, login, navigate]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <Spinner className="h-10 w-10" />
      <p className="text-sm text-muted-foreground">
        Finishing login — redirecting you now…
      </p>
    </div>
  );
}
