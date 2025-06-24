'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'

export default function ResidentsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(true) // For demo purposes

  const handleLogout = () => {
    localStorage.removeItem('dashboard_token')
    setIsAuthenticated(false)
    window.location.href = '/'
  }

  return (
    <DashboardLayout onLogout={handleLogout}>
      <div className="space-y-8 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Residents Management</h1>
          <p className="mt-2 text-slate-600 font-medium">
            Manage resident profiles, registrations, and property assignments
          </p>
        </div>

        <div className="card-elegant p-8 text-center">
          <h2 className="text-xl font-semibold text-slate-700 mb-4">
            Residents Module Coming Soon
          </h2>
          <p className="text-slate-500">
            This page will contain resident management functionality including:
          </p>
          <ul className="mt-4 text-left max-w-md mx-auto space-y-2 text-slate-600">
            <li>• Resident registration and profiles</li>
            <li>• Property assignments</li>
            <li>• Contact information management</li>
            <li>• Move-in/move-out tracking</li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  )
} 