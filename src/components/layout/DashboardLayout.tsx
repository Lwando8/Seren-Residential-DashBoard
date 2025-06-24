'use client'

import { useState } from 'react'
import {
  HomeIcon,
  UsersIcon,
  ShieldCheckIcon,
  DocumentChartBarIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  BellIcon,
  MagnifyingGlassIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'

interface DashboardLayoutProps {
  children: React.ReactNode
  onLogout: () => void
}

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: HomeIcon, current: true, badge: null },
  { name: 'Residents', href: '/residents', icon: UsersIcon, current: false, badge: '247' },
  { name: 'Security', href: '/security', icon: ShieldCheckIcon, current: false, badge: '8' },
  { name: 'Reports', href: '/reports', icon: DocumentChartBarIcon, current: false, badge: null },
  { name: 'Settings', href: '/settings', icon: Cog6ToothIcon, current: false, badge: null },
]

export default function DashboardLayout({ children, onLogout }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-sky-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 ease-in-out lg:hidden ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex h-full flex-col glass-strong">
          <div className="flex items-center justify-between px-6 py-4">
            <SidebarHeader />
            <button
              type="button"
              className="btn-ghost p-2"
              onClick={() => setSidebarOpen(false)}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <SidebarContent onLogout={onLogout} />
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex flex-1 flex-col glass-strong border-r border-white/20">
          <SidebarContent onLogout={onLogout} showHeader />
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-72">
        {/* Top navigation */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 glass-strong border-b border-white/20 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            className="btn-ghost p-2 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Bars3Icon className="h-6 w-6" />
          </button>

          {/* Separator */}
          <div className="h-6 w-px bg-slate-300 lg:hidden" aria-hidden="true" />

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            {/* Search */}
            <div className="relative flex flex-1 max-w-md">
              <label htmlFor="search-field" className="sr-only">
                Search
              </label>
              <MagnifyingGlassIcon
                className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-slate-400 pl-3"
                aria-hidden="true"
              />
              <input
                id="search-field"
                className="block h-full w-full border-0 bg-transparent py-0 pl-10 pr-0 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm"
                placeholder="Search residents, properties..."
                type="search"
                name="search"
              />
            </div>

            <div className="flex items-center gap-x-4 lg:gap-x-6">
              {/* Notifications button */}
              <button type="button" className="btn-ghost p-2 relative">
                <BellIcon className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full border-2 border-white"></span>
              </button>

              {/* Separator */}
              <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-slate-300" aria-hidden="true" />

              {/* Profile info */}
              <div className="flex items-center gap-x-3">
                <div className="hidden sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm font-semibold leading-6 text-slate-900">Administrator</p>
                  <p className="text-xs leading-5 text-slate-500">Seren Residential</p>
                </div>
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-sky-500 to-sky-600 flex items-center justify-center">
                  <span className="text-xs font-bold text-white">SR</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <main className="py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

function SidebarHeader() {
  return (
    <div className="flex items-center gap-x-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-sky-600 shadow-lg">
        <ShieldCheckIcon className="h-6 w-6 text-white" />
      </div>
      <div>
        <h1 className="text-lg font-bold text-slate-900">Seren</h1>
        <p className="text-xs text-slate-600 font-medium">Residential</p>
      </div>
      <div className="ml-auto">
        <SparklesIcon className="h-4 w-4 text-sky-500" />
      </div>
    </div>
  )
}

function SidebarContent({ onLogout, showHeader = false }: { onLogout: () => void; showHeader?: boolean }) {
  return (
    <>
      {showHeader && (
        <div className="flex flex-col gap-y-5 overflow-y-auto px-6 py-6">
          <SidebarHeader />
        </div>
      )}
      
      <nav className="flex flex-1 flex-col px-6 pb-6">
        <ul className="flex flex-1 flex-col gap-y-2">
          {navigation.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className={`${
                  item.current
                    ? 'sidebar-item-active'
                    : 'sidebar-item'
                } group flex items-center justify-between rounded-xl px-3 py-3`}
              >
                <div className="flex items-center gap-x-3">
                  <item.icon
                    className={`h-5 w-5 ${
                      item.current ? 'text-sky-600' : 'text-slate-500 group-hover:text-slate-700'
                    }`}
                  />
                  <span className={`text-sm font-medium ${
                    item.current ? 'text-sky-700' : 'text-slate-700'
                  }`}>
                    {item.name}
                  </span>
                </div>
                {item.badge && (
                  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                    item.current 
                      ? 'bg-sky-100 text-sky-700' 
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </a>
            </li>
          ))}
        </ul>

        {/* User section */}
        <div className="border-t border-slate-200/60 pt-6 mt-6">
          <div className="flex items-center gap-x-3 px-3 py-3 mb-3">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
              <span className="text-xs font-bold text-slate-700">AD</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate">Admin User</p>
              <p className="text-xs text-slate-500 truncate">admin@seren.com</p>
            </div>
          </div>
          
          <button
            onClick={onLogout}
            className="sidebar-item w-full group flex items-center gap-x-3 rounded-xl px-3 py-3"
          >
            <ArrowRightOnRectangleIcon className="h-5 w-5 text-slate-500 group-hover:text-slate-700" />
            <span className="text-sm font-medium text-slate-700">Sign out</span>
          </button>
        </div>
      </nav>
    </>
  )
} 