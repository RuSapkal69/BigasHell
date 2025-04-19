import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/auth-context";
import NavBar from "./NavBar";
import DashboardStats from "./dashboard/DashboardStats";
import WorkoutHistory from "./dashboard/WorkoutHistory";
import MuscleGroupProgress from "./dashboard/MuscleGroupProgress";
import TimeSpent from "./dashboard/TimeSpent";
import UpcomingWorkouts from "./dashboard/UpcomingWorkouts";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth/signin");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-blue-900 to-black text-white">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">
          Welcome to your <span className="text-red-600">HELL</span> Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <DashboardStats />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <WorkoutHistory />
          <MuscleGroupProgress />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <TimeSpent />
          <UpcomingWorkouts />
        </div>
      </div>
    </div>
  );
}