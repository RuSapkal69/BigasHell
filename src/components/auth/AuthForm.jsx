import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/auth-context";
import { FaGoogle, FaFacebook, FaTwitter } from "react-icons/fa";

export default function AuthForm({ type }) {
  const navigate = useNavigate();
  const { signIn, signUp, signInWithGoogle, signInWithFacebook, signInWithTwitter } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (type === "signup") {
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords don't match");
          setIsLoading(false);
          return;
        }
        await signUp(formData.name, formData.email, formData.password);
      } else {
        await signIn(formData.email, formData.password);
      }
      navigate("/");
    } catch (error) {
      console.error("Authentication error:", error);
      setError("Authentication failed. Please check your credentials and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignIn = async (provider) => {
    setIsLoading(true);
    setError("");
    try {
      if (provider === "google") {
        await signInWithGoogle();
      } else if (provider === "facebook") {
        await signInWithFacebook();
      } else if (provider === "twitter") {
        await signInWithTwitter();
      }
      navigate("/");
    } catch (error) {
      console.error(`${provider} sign-in error:`, error);
      setError(`Could not sign in with ${provider}. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-6 bg-black bg-opacity-70 p-8 rounded-lg border border-gray-800">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-white">{type === "signin" ? "Sign In" : "Create Account"}</h1>
        <p className="text-gray-400">
          {type === "signin"
            ? "Enter your credentials to access your account"
            : "Join us and start your fitness journey"}
        </p>
      </div>

      {error && <div className="bg-red-900 text-white p-3 rounded-md text-sm">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {type === "signup" && (
          <div className="space-y-2">
            <label htmlFor="name" className="text-white">
              Name
            </label>
            <input
              id="name"
              name="name"
              placeholder="FirstName LastName"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-gray-900 border border-gray-700 text-white rounded-md"
            />
          </div>
        )}

        <div className="space-y-2">
          <label htmlFor="email" className="text-white">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-gray-900 border border-gray-700 text-white rounded-md"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-white">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-gray-900 border border-gray-700 text-white rounded-md"
          />
        </div>

        {type === "signup" && (
          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-white">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-gray-900 border border-gray-700 text-white rounded-md"
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : type === "signin" ? "Sign In" : "Create Account"}
        </button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-700"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-black px-2 text-gray-400">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <button
          className="flex items-center justify-center py-2 px-4 bg-gray-900 border border-gray-700 text-white rounded-md hover:bg-gray-800 transition-colors"
          onClick={() => handleSocialSignIn("google")}
          disabled={isLoading}
        >
          <FaGoogle className="mr-2" />
          Google
        </button>
        <button
          className="flex items-center justify-center py-2 px-4 bg-gray-900 border border-gray-700 text-white rounded-md hover:bg-gray-800 transition-colors"
          onClick={() => handleSocialSignIn("facebook")}
          disabled={isLoading}
        >
          <FaFacebook className="mr-2" />
          Facebook
        </button>
        <button
          className="flex items-center justify-center py-2 px-4 bg-gray-900 border border-gray-700 text-white rounded-md hover:bg-gray-800 transition-colors"
          onClick={() => handleSocialSignIn("twitter")}
          disabled={isLoading}
        >
          <FaTwitter className="mr-2" />X
        </button>
      </div>

      <div className="text-center text-sm text-gray-400">
        {type === "signin" ? (
          <>
            Don't have an account?{" "}
            <a href="/auth/signup" className="text-red-500 hover:text-red-400 font-semibold">
              Sign Up
            </a>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <a href="/auth/signin" className="text-red-500 hover:text-red-400 font-semibold">
              Sign In
            </a>
          </>
        )}
      </div>
    </div>
  );
}