'use client'

import React, { useState, useEffect } from 'react'
import { 
  ArrowTrendingUpIcon, 
  ArrowTrendingDownIcon,
  ShieldCheckIcon,
  HomeIcon,
  ExclamationTriangleIcon,
  UserGroupIcon,
  ClockIcon,
  PhoneIcon,
  MapPinIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline'
import { DashboardStats, Activity, Complaint, EstateAlert, InfrastructureReport } from '@/types'

export default function DashboardOverview() {
  const [stats, setStats] = useState<DashboardStats>({
    totalResidents: 247,
    activeComplaints: 12,
    resolvedToday: 8,
    securityIncidents: 3,
    maintenanceRequests: 15,
    visitorsPending: 6,
    emergencyAlerts: 1,
    subscriptionRevenue: 142450,
    recentActivity: []
  })

  const [recentActivity, setRecentActivity] = useState<Activity[]>([
    {
      id: '1',
      type: 'emergency',
      title: 'Emergency Alert Resolved',
      description: 'Medical emergency at Unit 42 - Ambulance dispatched and resident assisted',
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      priority: 'urgent',
      residentName: 'John Doe',
      unitNumber: 'Unit 42',
      location: 'Building A'
    },
    {
      id: '2',
      type: 'complaint',
      title: 'Noise Complaint Filed',
      description: 'Loud music complaint from Unit 15 regarding Unit 16',
      timestamp: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
      priority: 'medium',
      residentName: 'Sarah Johnson',
      unitNumber: 'Unit 15',
      location: 'Building B'
    },
    {
      id: '3',
      type: 'maintenance',
      title: 'Street Lamp Repair Completed',
      description: 'Lighting issue near playground area has been resolved',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      priority: 'low',
      location: 'Playground Area'
    },
    {
      id: '4',
      type: 'visitor',
      title: 'Visitor Access Granted',
      description: 'Delivery personnel granted access to Building C',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
      priority: 'low',
      residentName: 'Michael Chen',
      unitNumber: 'Unit 38',
      location: 'Building C Entrance'
    },
    {
      id: '5',
      type: 'incident',
      title: 'Security Patrol Complete',
      description: 'Evening security round completed - all areas secure',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      priority: 'low',
      location: 'Estate Perimeter'
    },
    {
      id: '6',
      type: 'complaint',
      title: 'Parking Issue Resolved',
      description: 'Unauthorized vehicle removed from visitor parking',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
      priority: 'medium',
      residentName: 'Emma Wilson',
      unitNumber: 'Unit 23',
      location: 'Visitor Parking'
    }
  ])

  // Mock data for current complaints by type (from mobile app structure)
  const complaintsByType = [
    { type: 'noise', label: 'Noise', count: 4, color: 'bg-red-500' },
    { type: 'parking', label: 'Parking', count: 3, color: 'bg-orange-500' },
    { type: 'maintenance', label: 'Maintenance', count: 2, color: 'bg-blue-500' },
    { type: 'security', label: 'Security', count: 2, color: 'bg-purple-500' },
    { type: 'pets', label: 'Pets', count: 1, color: 'bg-green-500' },
  ]

  // Quick stats for today
  const todayStats = [
    { label: 'New Complaints', value: 5, change: +12, icon: ExclamationTriangleIcon },
    { label: 'Resolved Issues', value: 8, change: +15, icon: ShieldCheckIcon },
    { label: 'Emergency Alerts', value: 1, change: -50, icon: PhoneIcon },
    { label: 'Visitor Access', value: 12, change: +8, icon: UserGroupIcon },
  ]

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'emergency': return PhoneIcon
      case 'complaint': return ExclamationTriangleIcon
      case 'incident': return ShieldCheckIcon
      case 'maintenance': return HomeIcon
      case 'visitor': return UserGroupIcon
      default: return ClockIcon
    }
  }

  const getActivityColor = (type: string, priority?: string) => {
    if (priority === 'urgent') return 'text-red-600 bg-red-50'
    if (priority === 'high') return 'text-orange-600 bg-orange-50'
    
    switch (type) {
      case 'emergency': return 'text-red-600 bg-red-50'
      case 'complaint': return 'text-orange-600 bg-orange-50'
      case 'incident': return 'text-purple-600 bg-purple-50'
      case 'maintenance': return 'text-blue-600 bg-blue-50'
      case 'visitor': return 'text-green-600 bg-green-50'
      default: return 'text-slate-600 bg-slate-50'
    }
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(minutes / 60)
    
    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="space-y-8">
      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Residents */}
        <div className="premium-card group hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-sky-500 to-sky-600 shadow-lg">
              <UserGroupIcon className="h-6 w-6 text-white" />
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-slate-600">Total Residents</p>
              <p className="text-3xl font-bold text-slate-900">{stats.totalResidents}</p>
            </div>
          </div>
          <div className="flex items-center text-sm">
            <ArrowTrendingUpIcon className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-600 font-medium">+12 this month</span>
          </div>
        </div>

        {/* Active Complaints */}
        <div className="premium-card group hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg">
              <ExclamationTriangleIcon className="h-6 w-6 text-white" />
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-slate-600">Active Complaints</p>
              <p className="text-3xl font-bold text-slate-900">{stats.activeComplaints}</p>
            </div>
          </div>
          <div className="flex items-center text-sm">
            <ArrowTrendingDownIcon className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-600 font-medium">-3 from yesterday</span>
          </div>
        </div>

        {/* Security Personnel */}
        <div className="premium-card group hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg">
              <ShieldCheckIcon className="h-6 w-6 text-white" />
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-slate-600">Security Personnel</p>
              <p className="text-3xl font-bold text-slate-900">8</p>
            </div>
          </div>
          <div className="flex items-center text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            <span className="text-green-600 font-medium">All on duty</span>
          </div>
        </div>

        {/* Monthly Revenue */}
        <div className="premium-card group hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-green-600 shadow-lg">
              <CurrencyDollarIcon className="h-6 w-6 text-white" />
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-slate-600">Monthly Revenue</p>
              <p className="text-3xl font-bold text-slate-900">R{stats.subscriptionRevenue.toLocaleString()}</p>
            </div>
          </div>
          <div className="flex items-center text-sm">
            <ArrowTrendingUpIcon className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-600 font-medium">+8% from last month</span>
          </div>
        </div>
      </div>

      {/* Today's Activity Summary */}
      <div className="premium-card">
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Today's Activity Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {todayStats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="flex items-center p-4 bg-slate-50 rounded-xl">
                <div className="p-2 rounded-lg bg-white shadow-sm mr-3">
                  <Icon className="h-5 w-5 text-slate-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600">{stat.label}</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-slate-900">{stat.value}</span>
                    <span className={`text-xs font-medium ${stat.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change > 0 ? '+' : ''}{stat.change}%
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Recent Activity Feed */}
      <div className="premium-card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-900">Recent Activity</h3>
          <button className="text-sm font-medium text-sky-600 hover:text-sky-700 transition-colors">
            View All Activity
          </button>
        </div>
        <div className="space-y-4">
          {recentActivity.slice(0, 6).map((activity) => {
            const Icon = getActivityIcon(activity.type)
            const colorClass = getActivityColor(activity.type, activity.priority)
            
            return (
              <div key={activity.id} className="flex items-start space-x-4 p-4 rounded-xl hover:bg-slate-50 transition-colors">
                <div className={`p-2 rounded-lg ${colorClass}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-slate-900 truncate">
                      {activity.title}
                    </p>
                    <span className="text-xs text-slate-500 ml-2">
                      {formatTimeAgo(activity.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mt-1">
                    {activity.description}
                  </p>
                  <div className="flex items-center space-x-4 mt-2 text-xs text-slate-500">
                    {activity.residentName && (
                      <span>👤 {activity.residentName}</span>
                    )}
                    {activity.unitNumber && (
                      <span>🏠 {activity.unitNumber}</span>
                    )}
                    {activity.location && (
                      <span>📍 {activity.location}</span>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Complaints Breakdown */}
      <div className="premium-card">
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Active Complaints by Type</h3>
        <div className="space-y-3">
          {complaintsByType.map((complaint) => (
            <div key={complaint.type} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${complaint.color}`}></div>
                <span className="font-medium text-slate-700">{complaint.label}</span>
              </div>
              <span className="text-2xl font-bold text-slate-900">{complaint.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* System Status */}
      <div className="premium-card">
        <h3 className="text-lg font-semibold text-slate-900 mb-6">System Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
            <div>
              <p className="font-medium text-green-900">Control Room</p>
              <p className="text-sm text-green-600">Operational 24/7</p>
            </div>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
            <div>
              <p className="font-medium text-green-900">Security System</p>
              <p className="text-sm text-green-600">All zones active</p>
            </div>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
            <div>
              <p className="font-medium text-green-900">Emergency Line</p>
              <p className="text-sm text-green-600">Available</p>
            </div>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  )
} 