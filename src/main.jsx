import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider } from "./utils/auth-context"
import App from "./App"
import Auth from "./components/Auth"
import Dashboard from "./components/Dashboard"
import InfoPage from "./components/InfoPage"
import GenerateWorkouts from "./components/GenerateWorkouts"
import WorkoutSchedule from "./components/WorkoutSchedule"
import ProtectedRoute from "./components/ProtectedRoute"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/auth/:type" element={<Auth />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute requireProfile={true}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/info"
            element={
              <ProtectedRoute requireProfile={false}>
                <InfoPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/generate-workouts"
            element={
              <ProtectedRoute requireProfile={true}>
                <GenerateWorkouts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/workout-schedule"
            element={
              <ProtectedRoute requireProfile={true}>
                <WorkoutSchedule />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
)
