import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";

export default function AuthCallbackPage() {
  const [params] = useSearchParams();
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const token = params.get("token");
      console.log(token);
      if (token) {
        console.log("Calling API Client Login Function")
        login(token);
        navigate("/dashboard"); // or home page
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error during authentication callback:", error);
      navigate("/login");
    }
  }, [params, login, navigate]);

  return <p>Finishing login...</p>;
}
