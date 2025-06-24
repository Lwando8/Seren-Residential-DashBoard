'use client'

import {
  HomeIcon,
  UsersIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline'

const stats = [
  {
    name: 'Total Residents',
    value: '247',
    change: '+12%',
    changeType: 'positive',
    icon: UsersIcon,
  },
  {
    name: 'Active Security Guards',
    value: '8',
    change: 'On Duty',
    changeType: 'neutral',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Properties',
    value: '156',
    change: '98% Occupied',
    changeType: 'positive',
    icon: HomeIcon,
  },
  {
    name: 'Incidents Today',
    value: '3',
    change: '-2 from yesterday',
    changeType: 'positive',
    icon: ExclamationTriangleIcon,
  },
]

const recentActivity = [
  {
    id: 1,
    type: 'security',
    message: 'Security patrol completed - Block A',
    time: '2 minutes ago',
    status: 'completed',
  },
  {
    id: 2,
    type: 'resident',
    message: 'New resident registration - Unit 204',
    time: '15 minutes ago',
    status: 'pending',
  },
  {
    id: 3,
    type: 'maintenance',
    message: 'Pool maintenance scheduled for tomorrow',
    time: '1 hour ago',
    status: 'scheduled',
  },
  {
    id: 4,
    type: 'security',
    message: 'Visitor access granted - John Doe',
    time: '2 hours ago',
    status: 'completed',
  },
]

export default function DashboardOverview() {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard Overview</h1>
          <p className="mt-2 text-sm text-gray-700">
            Real-time monitoring and management for Seren Residential Estate
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.name}
              className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
            >
              <dt>
                <div className="absolute bg-indigo-500 rounded-md p-3">
                  <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <p className="ml-16 text-sm font-medium text-gray-500 truncate">{stat.name}</p>
              </dt>
              <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                <p
                  className={`ml-2 flex items-baseline text-sm font-semibold ${
                    stat.changeType === 'positive'
                      ? 'text-green-600'
                      : stat.changeType === 'negative'
                      ? 'text-red-600'
                      : 'text-gray-600'
                  }`}
                >
                  {stat.change}
                </p>
              </dd>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Recent Activity</h3>
            <div className="flow-root">
              <ul className="-mb-8">
                {recentActivity.map((activity, activityIdx) => (
                  <li key={activity.id}>
                    <div className="relative pb-8">
                      {activityIdx !== recentActivity.length - 1 ? (
                        <span
                          className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                          aria-hidden="true"
                        />
                      ) : null}
                      <div className="relative flex space-x-3">
                        <div>
                          <span
                            className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${
                              activity.status === 'completed'
                                ? 'bg-green-500'
                                : activity.status === 'pending'
                                ? 'bg-yellow-500'
                                : 'bg-blue-500'
                            }`}
                          >
                            {activity.status === 'completed' ? (
                              <CheckCircleIcon className="h-5 w-5 text-white" />
                            ) : activity.status === 'pending' ? (
                              <ClockIcon className="h-5 w-5 text-white" />
                            ) : (
                              <ClockIcon className="h-5 w-5 text-white" />
                            )}
                          </span>
                        </div>
                        <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                          <div>
                            <p className="text-sm text-gray-500">{activity.message}</p>
                          </div>
                          <div className="text-right text-sm whitespace-nowrap text-gray-500">
                            {activity.time}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Add New Resident
              </button>
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Schedule Security Patrol
              </button>
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Generate Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 