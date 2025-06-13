import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { LanguageProvider } from './contexts/LanguageContext'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ConsultationPage from './pages/ConsultationPage'
import SubscriptionPage from './pages/SubscriptionPage'
import AuthPage from './pages/AuthPage'
import DashboardPage from './pages/DashboardPage'
import BoltBadge from './components/BoltBadge'

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex flex-col">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/consultation" element={<ConsultationPage />} />
                <Route path="/subscription" element={<SubscriptionPage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
              </Routes>
            </main>
            <Footer />
            <BoltBadge />
          </div>
        </Router>
      </AuthProvider>
    </LanguageProvider>
  )
}

export default App