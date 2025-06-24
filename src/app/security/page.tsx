'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'

export default function SecurityPage() {
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
          <h1 className="text-3xl font-bold text-slate-900">Security Center</h1>
          <p className="mt-2 text-slate-600 font-medium">
            Monitor security operations, patrols, and incident management
          </p>
        </div>

        <div className="card-elegant p-8 text-center">
          <h2 className="text-xl font-semibold text-slate-700 mb-4">
            Security Module Coming Soon
          </h2>
          <p className="text-slate-500">
            This page will contain security management functionality including:
          </p>
          <ul className="mt-4 text-left max-w-md mx-auto space-y-2 text-slate-600">
            <li>• Live CCTV monitoring</li>
            <li>• Security patrol scheduling</li>
            <li>• Incident reporting and tracking</li>
            <li>• Access control management</li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  )
} 