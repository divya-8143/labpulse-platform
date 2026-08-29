import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/shared/Navbar';
import { Footer } from './components/shared/Footer';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { PatientDashboard } from './pages/patient/PatientDashboard';
import { UploadReportPage } from './pages/patient/UploadReportPage';
import { ReportDetailsPage } from './pages/patient/ReportDetailsPage';
import { ReportHistoryPage } from './pages/patient/ReportHistoryPage';
import { AnalyticsPage } from './pages/patient/AnalyticsPage';
import { DoctorDashboard } from './pages/doctor/DoctorDashboard';
import { DoctorPatientReportsPage } from './pages/doctor/DoctorPatientReportsPage';
import { DoctorReportReviewPage } from './pages/doctor/DoctorReportReviewPage';

const ProtectedRoute: React.FC<{ children: React.ReactNode; allowedRole?: 'PATIENT' | 'DOCTOR' }> = ({
  children,
  allowedRole,
}) => {
  const { user, isLoading } = useAuth();
  if (isLoading) return <div className="p-16 text-center text-xs text-slate-500">Checking authentication...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to={user.role === 'PATIENT' ? '/patient/dashboard' : '/doctor/dashboard'} replace />;
  }
  return <>{children}</>;
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Patient Protected Routes */}
              <Route
                path="/patient/dashboard"
                element={
                  <ProtectedRoute allowedRole="PATIENT">
                    <PatientDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/patient/upload"
                element={
                  <ProtectedRoute allowedRole="PATIENT">
                    <UploadReportPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/patient/reports"
                element={
                  <ProtectedRoute allowedRole="PATIENT">
                    <ReportHistoryPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/patient/reports/:id"
                element={
                  <ProtectedRoute>
                    <ReportDetailsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/patient/analytics"
                element={
                  <ProtectedRoute allowedRole="PATIENT">
                    <AnalyticsPage />
                  </ProtectedRoute>
                }
              />

              {/* Doctor Protected Routes */}
              <Route
                path="/doctor/dashboard"
                element={
                  <ProtectedRoute allowedRole="DOCTOR">
                    <DoctorDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/doctor/patients"
                element={
                  <ProtectedRoute allowedRole="DOCTOR">
                    <DoctorDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/doctor/patients/:patientId/reports"
                element={
                  <ProtectedRoute allowedRole="DOCTOR">
                    <DoctorPatientReportsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/doctor/reviews/:reportId"
                element={
                  <ProtectedRoute allowedRole="DOCTOR">
                    <DoctorReportReviewPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/doctor/reports/:id"
                element={
                  <ProtectedRoute allowedRole="DOCTOR">
                    <DoctorReportReviewPage />
                  </ProtectedRoute>
                }
              />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
