'use client'

import {
  HomeIcon,
  UsersIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ArrowRightIcon,
  EyeIcon,
  CalendarIcon
} from '@heroicons/react/24/outline'

const stats = [
  {
    name: 'Total Residents',
    value: '247',
    change: '+12',
    changeType: 'positive' as const,
    changeLabel: 'from last month',
    icon: UsersIcon,
    color: 'sky' as const
  },
  {
    name: 'Security Personnel',
    value: '8',
    change: 'All Active',
    changeType: 'neutral' as const,
    changeLabel: 'on duty now',
    icon: ShieldCheckIcon,
    color: 'emerald' as const
  },
  {
    name: 'Properties',
    value: '156',
    change: '98%',
    changeType: 'positive' as const,
    changeLabel: 'occupancy rate',
    icon: HomeIcon,
    color: 'purple' as const
  },
  {
    name: 'Security Incidents',
    value: '3',
    change: '-2',
    changeType: 'negative' as const,
    changeLabel: 'from yesterday',
    icon: ExclamationTriangleIcon,
    color: 'amber' as const
  },
]

const recentActivity = [
  {
    id: 1,
    type: 'security',
    title: 'Security Patrol Completed',
    description: 'Block A perimeter check completed successfully',
    time: '2 minutes ago',
    status: 'completed',
    user: 'Security Team Alpha',
    location: 'Block A'
  },
  {
    id: 2,
    type: 'resident',
    title: 'New Resident Registration',
    description: 'John Smith registered for Unit 204-B',
    time: '15 minutes ago',
    status: 'pending',
    user: 'Reception Desk',
    location: 'Unit 204-B'
  },
  {
    id: 3,
    type: 'maintenance',
    title: 'Pool Maintenance Scheduled',
    description: 'Weekly cleaning and chemical balance check',
    time: '1 hour ago',
    status: 'scheduled',
    user: 'Maintenance Team',
    location: 'Recreation Center'
  },
  {
    id: 4,
    type: 'security',
    title: 'Visitor Access Granted',
    description: 'Jane Doe authorized for Unit 301-A',
    time: '2 hours ago',
    status: 'completed',
    user: 'Security Guard',
    location: 'Main Gate'
  },
]

const quickActions = [
  {
    name: 'Add New Resident',
    description: 'Register a new resident profile',
    icon: UsersIcon,
    href: '/residents/new',
    color: 'sky'
  },
  {
    name: 'Security Patrol',
    description: 'Schedule or start a security round',
    icon: ShieldCheckIcon,
    href: '/security/patrol',
    color: 'emerald'
  },
  {
    name: 'Generate Report',
    description: 'Create comprehensive analytics report',
    icon: CalendarIcon,
    href: '/reports/new',
    color: 'purple'
  },
]

export default function DashboardOverview() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard Overview</h1>
          <p className="mt-2 text-slate-600 font-medium">
            Real-time monitoring and management for Seren Residential Estate
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-secondary">
            <EyeIcon className="w-4 h-4 mr-2" />
            View Details
          </button>
          <button className="btn-primary">
            <CalendarIcon className="w-4 h-4 mr-2" />
            Generate Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const colorClasses = {
            sky: 'from-sky-500 to-sky-600 shadow-sky-500/20',
            emerald: 'from-emerald-500 to-emerald-600 shadow-emerald-500/20',
            purple: 'from-purple-500 to-purple-600 shadow-purple-500/20',
            amber: 'from-amber-500 to-amber-600 shadow-amber-500/20'
          }
          
          return (
            <div key={stat.name} className="metric-card group">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${colorClasses[stat.color]} shadow-lg mb-4`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <p className="text-sm font-semibold text-slate-600 mb-1">{stat.name}</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                    <div className={`flex items-center text-sm font-medium ${
                      stat.changeType === 'positive' 
                        ? 'text-emerald-600' 
                        : stat.changeType === 'negative'
                        ? 'text-red-600'
                        : 'text-slate-600'
                    }`}>
                      {stat.changeType === 'positive' && <ArrowTrendingUpIcon className="w-4 h-4 mr-1" />}
                      {stat.changeType === 'negative' && <ArrowTrendingDownIcon className="w-4 h-4 mr-1" />}
                      <span>{stat.change}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{stat.changeLabel}</p>
                </div>
                <ArrowRightIcon className="w-5 h-5 text-slate-400 group-hover:text-slate-600 transition-colors" />
              </div>
            </div>
          )
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className="card-elegant">
            <div className="card-header">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">Recent Activity</h3>
                <span className="text-sm text-slate-500">Last 24 hours</span>
              </div>
            </div>
            <div className="card-content">
              <div className="flow-root">
                <ul className="-mb-8 space-y-4">
                  {recentActivity.map((activity, activityIdx) => (
                    <li key={activity.id} className="relative">
                      {activityIdx !== recentActivity.length - 1 && (
                        <span
                          className="absolute left-5 top-10 -ml-px h-full w-0.5 bg-slate-200"
                          aria-hidden="true"
                        />
                      )}
                      <div className="relative flex items-start space-x-4">
                        <div className="relative">
                          <span className={`h-10 w-10 rounded-xl flex items-center justify-center ring-8 ring-white ${
                            activity.status === 'completed'
                              ? 'bg-emerald-500'
                              : activity.status === 'pending'
                              ? 'bg-amber-500'
                              : 'bg-sky-500'
                          }`}>
                            {activity.status === 'completed' ? (
                              <CheckCircleIcon className="h-5 w-5 text-white" />
                            ) : activity.status === 'pending' ? (
                              <ClockIcon className="h-5 w-5 text-white" />
                            ) : (
                              <CalendarIcon className="h-5 w-5 text-white" />
                            )}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-semibold text-slate-900">{activity.title}</p>
                            <time className="text-xs text-slate-500 whitespace-nowrap">{activity.time}</time>
                          </div>
                          <p className="text-sm text-slate-600 mt-1">{activity.description}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-xs text-slate-500">
                              <span className="font-medium">By:</span> {activity.user}
                            </span>
                            <span className="text-xs text-slate-500">
                              <span className="font-medium">Location:</span> {activity.location}
                            </span>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200/60">
                <button className="btn-ghost w-full">
                  View All Activity
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <div className="card-elegant">
            <div className="card-header">
              <h3 className="text-lg font-bold text-slate-900">Quick Actions</h3>
            </div>
            <div className="card-content space-y-4">
              {quickActions.map((action) => {
                const colorClasses = {
                  sky: 'from-sky-500 to-sky-600',
                  emerald: 'from-emerald-500 to-emerald-600',
                  purple: 'from-purple-500 to-purple-600'
                }
                
                return (
                  <button
                    key={action.name}
                    className="w-full p-4 rounded-xl border border-slate-200 hover:border-slate-300 bg-white/50 hover:bg-white/80 transition-all duration-200 group text-left"
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`flex-shrink-0 p-2 rounded-lg bg-gradient-to-br ${colorClasses[action.color]}`}>
                        <action.icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-slate-900 group-hover:text-slate-700">
                          {action.name}
                        </p>
                        <p className="text-xs text-slate-500 mt-1">{action.description}</p>
                      </div>
                      <ArrowRightIcon className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* System Status */}
          <div className="card-elegant">
            <div className="card-header">
              <h3 className="text-lg font-bold text-slate-900">System Status</h3>
            </div>
            <div className="card-content space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">Security System</span>
                <span className="status-online">Online</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">CCTV Network</span>
                <span className="status-online">Active</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">Access Control</span>
                <span className="status-online">Operational</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">Fire Safety</span>
                <span className="status-warning">Maintenance</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 