'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'

export default function ReportsPage() {
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
          <h1 className="text-3xl font-bold text-slate-900">Reports & Analytics</h1>
          <p className="mt-2 text-slate-600 font-medium">
            Generate comprehensive reports and view analytics data
          </p>
        </div>

        <div className="card-elegant p-8 text-center">
          <h2 className="text-xl font-semibold text-slate-700 mb-4">
            Reports Module Coming Soon
          </h2>
          <p className="text-slate-500">
            This page will contain reporting functionality including:
          </p>
          <ul className="mt-4 text-left max-w-md mx-auto space-y-2 text-slate-600">
            <li>• Occupancy and demographic reports</li>
            <li>• Security incident analytics</li>
            <li>• Financial and maintenance reports</li>
            <li>• Custom report generation</li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  )
} 