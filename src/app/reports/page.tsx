'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { 
  DocumentChartBarIcon,
  WrenchScrewdriverIcon,
  BoltIcon,
  TruckIcon,
  HomeIcon,
  TreePineIcon,
  LightBulbIcon,
  ShieldCheckIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  FunnelIcon,
  PlusIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'
import { InfrastructureReport, Complaint } from '@/types'

// Mock infrastructure reports data (from mobile app structure)
const mockInfrastructureReports: InfrastructureReport[] = [
  {
    id: 'report-001',
    category: 'lighting',
    title: 'Street Lamp Not Working',
    description: 'Street lamp near Unit 15 has been out for 3 days. Area is very dark at night.',
    location: 'Block A - Near Unit 15',
    status: 'in-progress',
    reportedBy: 'Sarah Johnson',
    reportedByUnit: 'Unit 15',
    assignedTo: 'Electrical Team',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    priority: 'high',
    estimatedCost: 2500,
    contractorInfo: {
      name: 'John Smith',
      contact: '+27 11 123 4567',
      company: 'ElectroFix Solutions'
    }
  },
  {
    id: 'report-002',
    category: 'security',
    title: 'Broken Gate Motor',
    description: 'Main entrance gate motor making unusual noises and opening slowly.',
    location: 'Main Entrance Gate',
    status: 'scheduled',
    reportedBy: 'Michael Chen',
    reportedByUnit: 'Unit 38',
    assignedTo: 'Security Maintenance',
    scheduledDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // Tomorrow
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    priority: 'high',
    estimatedCost: 8500,
    contractorInfo: {
      name: 'Gate Repair Pro',
      contact: '+27 82 234 5678',
      company: 'Automated Access Solutions'
    }
  },
  {
    id: 'report-003',
    category: 'plumbing',
    title: 'Pool Filter System Issue',
    description: 'Pool water appears cloudy. Filter system may need maintenance or replacement.',
    location: 'Recreation Center Pool',
    status: 'completed',
    reportedBy: 'Emma Wilson',
    reportedByUnit: 'Unit 23',
    assignedTo: 'Pool Maintenance',
    completedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    priority: 'medium',
    estimatedCost: 4200,
    actualCost: 3800
  },
  {
    id: 'report-004',
    category: 'landscaping',
    title: 'Garden Sprinkler Malfunction',
    description: 'Sprinkler system in common area garden not working properly. Some areas not receiving water.',
    location: 'Common Garden Area',
    status: 'reported',
    reportedBy: 'Lisa Anderson',
    reportedByUnit: 'Unit 7',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    priority: 'low',
    estimatedCost: 1500
  },
  {
    id: 'report-005',
    category: 'roads',
    title: 'Parking Area Pothole',
    description: 'Large pothole in visitor parking area causing vehicle damage.',
    location: 'Visitor Parking Area',
    status: 'completed',
    reportedBy: 'Robert Brown',
    reportedByUnit: 'Unit 19',
    assignedTo: 'Road Maintenance',
    completedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    priority: 'medium',
    estimatedCost: 3200,
    actualCost: 2950
  },
  {
    id: 'report-006',
    category: 'safety',
    title: 'Damaged Playground Equipment',
    description: 'Swing set chain is broken. Safety concern for children.',
    location: 'Playground Area',
    status: 'in-progress',
    reportedBy: 'David Miller',
    reportedByUnit: 'Unit 31',
    assignedTo: 'Playground Safety Team',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    priority: 'high',
    estimatedCost: 800
  }
]

// Mock personal complaints data (from mobile app structure)
const mockComplaints: Complaint[] = [
  {
    id: 'complaint-001',
    uid: 'user-001',
    userName: 'John Doe',
    unitNumber: 'Unit 42',
    type: 'noise',
    title: 'Loud Music After Hours',
    description: 'Neighbor playing loud music past 10 PM repeatedly',
    status: 'in-progress',
    priority: 'medium',
    assignedTo: 'Security Team Alpha',
    createdAt: new Date(Date.now() - 45 * 60 * 1000),
    updatedAt: new Date(Date.now() - 30 * 60 * 1000),
    timestamp: new Date(Date.now() - 45 * 60 * 1000),
    location: 'Unit 43',
    adminNotes: 'Investigating noise complaint, spoke with Unit 43 resident'
  },
  {
    id: 'complaint-002',
    uid: 'user-002',
    userName: 'Sarah Johnson',
    unitNumber: 'Unit 15',
    type: 'parking',
    title: 'Unauthorized Parking',
    description: 'Visitor parking space blocked by unauthorized vehicle',
    status: 'resolved',
    priority: 'low',
    assignedTo: 'Security Guard Beta',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
    resolvedAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    location: 'Visitor Parking Bay 5',
    adminNotes: 'Vehicle owner contacted and moved car'
  },
  {
    id: 'complaint-003',
    uid: 'user-004',
    userName: 'Emma Wilson',
    unitNumber: 'Unit 23',
    type: 'pets',
    title: 'Unleashed Dog in Common Area',
    description: 'Large dog running unleashed in playground area, concerning for children safety',
    status: 'open',
    priority: 'high',
    createdAt: new Date(Date.now() - 30 * 60 * 1000),
    updatedAt: new Date(Date.now() - 30 * 60 * 1000),
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    location: 'Playground Area'
  }
]

const reportStats = {
  totalReports: 156,
  pendingReports: 23,
  inProgress: 8,
  completedThisMonth: 45,
  totalEstimatedCosts: 127500,
  actualSpend: 89320
}

const categoryStats = [
  { category: 'electrical', label: 'Electrical', count: 12, icon: BoltIcon, color: 'bg-yellow-500' },
  { category: 'plumbing', label: 'Plumbing', count: 8, icon: WrenchScrewdriverIcon, color: 'bg-blue-500' },
  { category: 'security', label: 'Security', count: 15, icon: ShieldCheckIcon, color: 'bg-purple-500' },
  { category: 'landscaping', label: 'Landscaping', count: 6, icon: TreePineIcon, color: 'bg-green-500' },
  { category: 'lighting', label: 'Lighting', count: 9, icon: LightBulbIcon, color: 'bg-orange-500' },
  { category: 'roads', label: 'Roads & Paths', count: 4, icon: TruckIcon, color: 'bg-slate-500' }
]

export default function ReportsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(true) // For demo purposes

  const handleLogout = () => {
    localStorage.removeItem('dashboard_token')
    setIsAuthenticated(false)
    window.location.href = '/'
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'reported':
        return <span className="status-badge status-neutral">Reported</span>
      case 'scheduled':
        return <span className="status-badge status-info">Scheduled</span>
      case 'in-progress':
        return <span className="status-badge status-warning">In Progress</span>
      case 'completed':
        return <span className="status-badge status-success">Completed</span>
      case 'cancelled':
        return <span className="status-badge status-error">Cancelled</span>
      case 'open':
        return <span className="status-badge status-error">Open</span>
      case 'resolved':
        return <span className="status-badge status-success">Resolved</span>
      default:
        return <span className="status-badge status-neutral">{status}</span>
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600'
      case 'medium': return 'text-yellow-600'
      case 'low': return 'text-green-600'
      default: return 'text-slate-600'
    }
  }

  const formatCurrency = (amount: number) => {
    return `R${amount.toLocaleString()}`
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-ZA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
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