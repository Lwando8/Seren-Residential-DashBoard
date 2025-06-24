// ================================
// SEREN RESIDENTIAL DASHBOARD TYPES
// Mirroring main mobile app structure
// ================================

// User and Authentication Types
export interface DashboardUser {
  id: string
  email: string
  name: string
  role: 'admin' | 'security' | 'manager'
  permissions: string[]
  lastLogin: Date
  avatar?: string
}

export interface AuthState {
  user: DashboardUser | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

// ================================
// RESIDENT TYPES (FROM MOBILE APP)
// ================================

export interface Resident {
  id: string
  uid: string
  name: string
  email: string
  phone: string
  unitNumber: string
  moveInDate: Date
  subscriptionStatus: 'active' | 'inactive' | 'pending'
  role: 'resident' | 'admin'
  emergencyContact?: {
    name: string
    phone: string
    relationship: string
  }
  avatar?: string
  isActive: boolean
  createdAt: Date
  lastLogin?: Date
}

// ================================
// COMPLAINT TYPES (FROM MOBILE APP)
// ================================

export type ComplaintType = 
  | 'noise'
  | 'parking'
  | 'maintenance'
  | 'security'
  | 'pets'
  | 'garbage'
  | 'other'

export interface Complaint {
  id: string
  uid: string
  userName: string
  unitNumber: string
  type: ComplaintType
  title: string
  description: string
  status: 'open' | 'in-progress' | 'resolved' | 'closed'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  assignedTo?: string
  createdAt: Date
  updatedAt: Date
  resolvedAt?: Date
  timestamp: Date
  imageURL?: string
  location?: string
  adminNotes?: string
  notes?: string
}

// ================================
// SECURITY & EMERGENCY TYPES
// ================================

export interface EstateAlert {
  id: string
  uid: string
  userName: string
  unitNumber: string
  timestamp: Date
  location: {
    latitude: number
    longitude: number
  }
  type: 'emergency' | 'medical' | 'security'
  status: 'open' | 'in-progress' | 'resolved'
  description?: string
  assignedTo?: string
  notes?: string
  resolvedAt?: Date
  priority?: 'low' | 'medium' | 'high' | 'critical'
}

export interface SecurityIncident {
  id: string
  type: 'breach' | 'suspicious' | 'emergency' | 'maintenance' | 'visitor'
  title: string
  description: string
  location: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  status: 'open' | 'investigating' | 'resolved' | 'closed'
  reportedBy: string
  assignedOfficer?: string
  createdAt: Date
  updatedAt: Date
  resolvedAt?: Date
  evidence?: {
    type: 'image' | 'video' | 'document'
    url: string
    description?: string
  }[]
  witnesses?: string[]
  actionsTaken?: string[]
}

// ================================
// INFRASTRUCTURE REPORTS
// ================================

export interface InfrastructureReport {
  id: string
  category: 'electrical' | 'plumbing' | 'security' | 'landscaping' | 'roads' | 'amenities' | 'lighting' | 'safety'
  title: string
  description: string
  location: string
  status: 'reported' | 'scheduled' | 'in-progress' | 'completed' | 'cancelled'
  reportedBy: string
  reportedByUnit: string
  assignedTo?: string
  estimatedCost?: number
  actualCost?: number
  scheduledDate?: Date
  completedDate?: Date
  createdAt: Date
  updatedAt: Date
  timestamp: Date
  priority: 'low' | 'medium' | 'high'
  imageURLs?: string[]
  contractorInfo?: {
    name: string
    contact: string
    company: string
  }
}

// ================================
// COMMUNITY & EVENTS
// ================================

export interface CommunityClub {
  id: string
  name: string
  description: string
  members: number
  category: 'fitness' | 'social' | 'hobby' | 'family' | 'business'
  icon: string
  organizer: string
  nextMeeting?: string
}

export interface CommunityEvent {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  organizer: string
  attendees: number
  maxAttendees?: number
  category: 'fitness' | 'social' | 'hobby' | 'family' | 'business'
  clubId?: string
  isAttending: boolean
}

// ================================
// SUBSCRIPTION & PAYMENTS
// ================================

export interface Subscription {
  uid: string
  residentId: string
  status: 'active' | 'inactive' | 'cancelled' | 'pending'
  amount: number
  currency: 'ZAR'
  startDate: Date
  nextBillingDate: Date
  stripeCustomerId?: string
  stripeSubscriptionId?: string
}

// ================================
// VISITOR MANAGEMENT
// ================================

export interface Visitor {
  id: string
  name: string
  phone: string
  purpose: string
  hostResident: string
  hostUnit: string
  vehicleDetails?: {
    make: string
    model: string
    color: string
    licensePlate: string
  }
  expectedArrival: Date
  actualArrival?: Date
  departure?: Date
  status: 'expected' | 'arrived' | 'departed' | 'denied'
  securityNotes?: string
  approvedBy?: string
  createdAt: Date
}

// ================================
// DASHBOARD ANALYTICS & STATS
// ================================

export interface DashboardStats {
  totalResidents: number
  activeComplaints: number
  resolvedToday: number
  securityIncidents: number
  maintenanceRequests: number
  visitorsPending: number
  emergencyAlerts: number
  subscriptionRevenue: number
  recentActivity: Activity[]
}

export interface Activity {
  id: string
  type: 'complaint' | 'incident' | 'maintenance' | 'visitor' | 'emergency' | 'system'
  title: string
  description: string
  timestamp: Date
  priority?: 'low' | 'medium' | 'high' | 'urgent'
  residentName?: string
  unitNumber?: string
  location?: string
}

// ================================
// CHART & ANALYTICS DATA
// ================================

export interface ChartData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    backgroundColor?: string[]
    borderColor?: string[]
    borderWidth?: number
  }[]
}

export interface TimeSeriesData {
  date: string
  complaints: number
  incidents: number
  maintenance: number
  visitors: number
  emergencyAlerts: number
}

// ================================
// API & RESPONSE TYPES
// ================================

export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  error?: string
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface FilterOptions {
  dateRange?: {
    start: Date
    end: Date
  }
  status?: string[]
  priority?: string[]
  type?: string[]
  assignedTo?: string[]
  location?: string[]
  unitNumber?: string[]
}

export interface SearchParams {
  query?: string
  filters?: FilterOptions
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  page?: number
  limit?: number
}

// ================================
// ASSIGNMENT & WORKFLOW
// ================================

export interface Assignment {
  id: string
  alertId?: string
  complaintId?: string
  reportId?: string
  assignedTo: string
  assignedBy: string
  timestamp: Date
  status: 'assigned' | 'accepted' | 'completed'
  notes?: string
}

// ================================
// NAVIGATION TYPES
// ================================

export type RootTabParamList = {
  Home: undefined
  Reports: undefined
  PersonalComplaints: undefined
  Community: undefined
  Profile: undefined
} 