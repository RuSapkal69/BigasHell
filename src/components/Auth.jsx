import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/auth-context";
import AuthForm from "./auth/AuthForm";
import MotivationalQuotes from "./auth/MotivationalQuotes";

export default function Auth() {
  const navigate = useNavigate();
  const params = useParams();
  const { user } = useAuth();
  const [authType, setAuthType] = useState("signin");

  useEffect(() => {
    if (user) {
      navigate("/");
    }

    if (params.type === "signin" || params.type === "signup") {
      setAuthType(params.type);
    } else {
      navigate("/auth/signin");
    }
  }, [user, navigate, params.type]);

  return (
    <div className="min-h-screen bg-black">
      <div className="flex flex-col md:flex-row min-h-screen">
        <div className="w-full md:w-1/2 flex items-center justify-center p-8">
          <AuthForm type={authType} />
        </div>
        <div className="w-full md:w-1/2 bg-gradient-to-br from-red-900 via-red-800 to-black flex items-center justify-center p-8">
          <MotivationalQuotes />
        </div>
      </div>
    </div>
  );
}