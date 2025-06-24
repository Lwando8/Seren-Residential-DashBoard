'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { 
  UserGroupIcon, 
  MagnifyingGlassIcon,
  FunnelIcon,
  PlusIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  CalendarIcon
} from '@heroicons/react/24/outline'
import { Resident } from '@/types'

// Mock data based on real mobile app structure
const mockResidents: Resident[] = [
  {
    id: '1',
    uid: 'user-001',
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+27 82 123 4567',
    unitNumber: 'Unit 42',
    moveInDate: new Date('2023-01-15'),
    subscriptionStatus: 'active',
    role: 'resident',
    isActive: true,
    createdAt: new Date('2023-01-15'),
    lastLogin: new Date('2024-01-23'),
    emergencyContact: {
      name: 'Jane Doe',
      phone: '+27 83 234 5678',
      relationship: 'Spouse'
    }
  },
  {
    id: '2',
    uid: 'user-002',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+27 84 345 6789',
    unitNumber: 'Unit 15',
    moveInDate: new Date('2023-03-20'),
    subscriptionStatus: 'active',
    role: 'resident',
    isActive: true,
    createdAt: new Date('2023-03-20'),
    lastLogin: new Date('2024-01-22'),
    emergencyContact: {
      name: 'Michael Johnson',
      phone: '+27 85 456 7890',
      relationship: 'Husband'
    }
  },
  {
    id: '3',
    uid: 'user-003',
    name: 'Michael Chen',
    email: 'michael.chen@email.com',
    phone: '+27 86 567 8901',
    unitNumber: 'Unit 38',
    moveInDate: new Date('2023-06-10'),
    subscriptionStatus: 'pending',
    role: 'resident',
    isActive: true,
    createdAt: new Date('2023-06-10'),
    lastLogin: new Date('2024-01-20'),
    emergencyContact: {
      name: 'Lisa Chen',
      phone: '+27 87 678 9012',
      relationship: 'Wife'
    }
  },
  {
    id: '4',
    uid: 'user-004',
    name: 'Emma Wilson',
    email: 'emma.wilson@email.com',
    phone: '+27 88 789 0123',
    unitNumber: 'Unit 23',
    moveInDate: new Date('2022-11-05'),
    subscriptionStatus: 'active',
    role: 'resident',
    isActive: true,
    createdAt: new Date('2022-11-05'),
    lastLogin: new Date('2024-01-23'),
    emergencyContact: {
      name: 'Robert Wilson',
      phone: '+27 89 890 1234',
      relationship: 'Husband'
    }
  },
  {
    id: '5',
    uid: 'user-005',
    name: 'David Miller',
    email: 'david.miller@email.com',
    phone: '+27 90 901 2345',
    unitNumber: 'Unit 31',
    moveInDate: new Date('2023-08-22'),
    subscriptionStatus: 'inactive',
    role: 'resident',
    isActive: false,
    createdAt: new Date('2023-08-22'),
    lastLogin: new Date('2024-01-15'),
    emergencyContact: {
      name: 'Helen Miller',
      phone: '+27 91 012 3456',
      relationship: 'Sister'
    }
  },
  {
    id: '6',
    uid: 'user-006',
    name: 'Lisa Anderson',
    email: 'lisa.anderson@email.com',
    phone: '+27 92 123 4567',
    unitNumber: 'Unit 7',
    moveInDate: new Date('2023-12-01'),
    subscriptionStatus: 'active',
    role: 'resident',
    isActive: true,
    createdAt: new Date('2023-12-01'),
    lastLogin: new Date('2024-01-22')
  }
]

const stats = {
  totalResidents: 247,
  activeSubscriptions: 234,
  pendingRegistrations: 8,
  inactiveAccounts: 5
}

export default function ResidentsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(true) // For demo purposes

  const handleLogout = () => {
    localStorage.removeItem('dashboard_token')
    setIsAuthenticated(false)
    window.location.href = '/'
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircleIcon className="h-3 w-3 mr-1" />
            Active
          </span>
        )
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <ExclamationTriangleIcon className="h-3 w-3 mr-1" />
            Pending
          </span>
        )
      case 'inactive':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            Inactive
          </span>
        )
      default:
        return null
    }
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-ZA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase()
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