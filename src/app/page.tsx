'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import LoginScreen from '@/screens/auth/LoginScreen'
import DashboardLayout from '@/components/layout/DashboardLayout'
import DashboardOverview from '@/screens/dashboard/DashboardOverview'

export default function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check authentication status
    // This would typically check for a valid JWT token or session
    const checkAuth = async () => {
      try {
        // For now, we'll simulate authentication check
        const token = localStorage.getItem('dashboard_token')
        if (token) {
          setIsAuthenticated(true)
        }
      } catch (error) {
        console.error('Auth check failed:', error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const handleLogin = (token: string) => {
    localStorage.setItem('dashboard_token', token)
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    localStorage.removeItem('dashboard_token')
    setIsAuthenticated(false)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} />
  }

  return (
    <DashboardLayout onLogout={handleLogout}>
      <DashboardOverview />
    </DashboardLayout>
  )
} 