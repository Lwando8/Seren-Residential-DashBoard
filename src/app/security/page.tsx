'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { 
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  PhoneIcon,
  EyeIcon,
  UserGroupIcon,
  ClockIcon,
  MapPinIcon,
  SignalIcon,
  CheckCircleIcon,
  XCircleIcon,
  PlayIcon
} from '@heroicons/react/24/outline'
import { EstateAlert, SecurityIncident, Visitor } from '@/types'

// Mock emergency alerts data (from mobile app structure)
const mockEmergencyAlerts: EstateAlert[] = [
  {
    id: 'alert-001',
    uid: 'user-001',
    userName: 'John Doe',
    unitNumber: 'Unit 42',
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    location: { latitude: -26.2041, longitude: 28.0473 },
    type: 'medical',
    status: 'resolved',
    description: 'Medical emergency - chest pain, ambulance dispatched',
    assignedTo: 'Security Team Alpha',
    notes: 'Paramedics arrived, resident transported to hospital safely',
    resolvedAt: new Date(Date.now() - 15 * 60 * 1000),
    priority: 'critical'
  },
  {
    id: 'alert-002',
    uid: 'user-003',
    userName: 'Michael Chen',
    unitNumber: 'Unit 38',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    location: { latitude: -26.2041, longitude: 28.0473 },
    type: 'security',
    status: 'in-progress',
    description: 'Suspicious activity reported near building entrance',
    assignedTo: 'Security Guard Beta',
    priority: 'high'
  },
  {
    id: 'alert-003',
    uid: 'user-002',
    userName: 'Sarah Johnson',
    unitNumber: 'Unit 15',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    location: { latitude: -26.2041, longitude: 28.0473 },
    type: 'emergency',
    status: 'resolved',
    description: 'Break-in attempt reported, security response requested',
    assignedTo: 'Security Team Alpha',
    notes: 'False alarm - wind damage triggered motion sensor',
    resolvedAt: new Date(Date.now() - 4.5 * 60 * 60 * 1000),
    priority: 'high'
  }
]

// Mock security incidents
const mockSecurityIncidents: SecurityIncident[] = [
  {
    id: 'incident-001',
    type: 'suspicious',
    title: 'Unauthorized Vehicle in Visitor Parking',
    description: 'Unregistered vehicle without visitor permit parked overnight',
    location: 'Visitor Parking Bay 12',
    severity: 'medium',
    status: 'investigating',
    reportedBy: 'Security Guard Alpha',
    assignedOfficer: 'Officer Johnson',
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
    actionsTaken: ['Vehicle details recorded', 'Resident notification attempted']
  },
  {
    id: 'incident-002',
    type: 'maintenance',
    title: 'Gate Motor Malfunction',
    description: 'Main entrance gate stuck in open position, security risk',
    location: 'Main Entrance Gate',
    severity: 'high',
    status: 'resolved',
    reportedBy: 'Security Guard Beta',
    assignedOfficer: 'Maintenance Team',
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    resolvedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    actionsTaken: ['Manual security patrol increased', 'Emergency repair completed']
  }
]

// Mock visitor management
const mockVisitors: Visitor[] = [
  {
    id: 'visitor-001',
    name: 'Delivery Service',
    phone: '+27 11 123 4567',
    purpose: 'Package delivery',
    hostResident: 'Emma Wilson',
    hostUnit: 'Unit 23',
    expectedArrival: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes from now
    status: 'expected',
    approvedBy: 'Security Guard Alpha',
    createdAt: new Date(),
    vehicleDetails: {
      make: 'Toyota',
      model: 'Hiace',
      color: 'White',
      licensePlate: 'ABC 123 GP'
    }
  },
  {
    id: 'visitor-002',
    name: 'John Smith',
    phone: '+27 82 987 6543',
    purpose: 'Family visit',
    hostResident: 'David Miller',
    hostUnit: 'Unit 31',
    expectedArrival: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
    actualArrival: new Date(Date.now() - 10 * 60 * 1000),
    status: 'arrived',
    approvedBy: 'Security Guard Beta',
    createdAt: new Date(Date.now() - 60 * 60 * 1000),
    vehicleDetails: {
      make: 'BMW',
      model: 'X3',
      color: 'Black',
      licensePlate: 'XYZ 789 GP'
    }
  }
]

const securityStats = {
  activeAlerts: 1,
  resolvedToday: 3,
  onDutyPersonnel: 8,
  visitorsPending: 5,
  systemsOnline: 12,
  incidentsThisWeek: 7
}

export default function SecurityPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(true) // For demo purposes

  const handleLogout = () => {
    localStorage.removeItem('dashboard_token')
    setIsAuthenticated(false)
    window.location.href = '/'
  }

  const getAlertPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500'
      case 'high': return 'bg-orange-500'
      case 'medium': return 'bg-yellow-500'
      case 'low': return 'bg-green-500'
      default: return 'bg-slate-500'
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return <span className="status-badge status-error">Open</span>
      case 'in-progress':
        return <span className="status-badge status-warning">In Progress</span>
      case 'resolved':
        return <span className="status-badge status-success">Resolved</span>
      case 'investigating':
        return <span className="status-badge status-warning">Investigating</span>
      case 'expected':
        return <span className="status-badge status-info">Expected</span>
      case 'arrived':
        return <span className="status-badge status-success">Arrived</span>
      case 'departed':
        return <span className="status-badge status-neutral">Departed</span>
      default:
        return <span className="status-badge status-neutral">{status}</span>
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