'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import DashboardOverview from '@/screens/dashboard/DashboardOverview'

export default function DashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(true) // For demo purposes

  const handleLogout = () => {
    localStorage.removeItem('dashboard_token')
    setIsAuthenticated(false)
    window.location.href = '/'
  }

  return (
    <DashboardLayout onLogout={handleLogout}>
      <DashboardOverview />
    </DashboardLayout>
  )
} 