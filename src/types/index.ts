// User types aligned with mobile app
export interface User {
  uid: string;
  name: string;
  email: string;
  phone?: string;
  estateId: string;
  estateCode: string;
  unitNumber: string;
  subscriptionStatus: 'active' | 'inactive' | 'pending';
  role: 'resident' | 'admin' | 'super_admin' | 'manager' | 'security';
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  avatar?: string;
  createdAt: Date;
  lastLogin?: Date;
  isActive: boolean;
}

// Estate types aligned with mobile app
export interface Estate {
  id: string;
  name: string;
  code: string;
  address: {
    street: string;
    city: string;
    province: string;
    postalCode: string;
    country: string;
  };
  contactInfo: {
    phone: string;
    email: string;
    website?: string;
  };
  subscription: {
    plan: 'basic' | 'premium' | 'enterprise';
    status: 'active' | 'inactive' | 'suspended' | 'cancelled';
    startDate: Date;
    endDate: Date;
    features: string[];
  };
  settings: {
    allowGuestRegistration: boolean;
    requireAdminApproval: boolean;
    maintenanceHours: {
      start: string;
      end: string;
    };
    emergencyContacts: Array<{
      name: string;
      phone: string;
      type: 'security' | 'maintenance' | 'medical' | 'fire';
    }>;
  };
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Alert types aligned with mobile app
export interface EstateAlert {
  id: string;
  uid: string;
  estateId: string;
  userName: string;
  unitNumber: string;
  timestamp: Date;
  location: {
    latitude: number;
    longitude: number;
  };
  type: 'emergency' | 'medical' | 'security';
  status: 'open' | 'in-progress' | 'resolved';
  description?: string;
  assignedTo?: string;
  notes?: string;
  resolvedAt?: Date;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
}

// Complaint types aligned with mobile app
export interface Complaint {
  id: string;
  uid: string;
  estateId: string;
  userName: string;
  unitNumber: string;
  type: ComplaintType;
  title: string;
  description: string;
  category: string;
  status: 'pending' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignedTo?: string;
  timestamp: Date;
  updatedAt: Date;
  resolvedAt?: Date;
  imageURL?: string;
  location?: string;
  adminNotes?: string;
}

export type ComplaintType = 
  | 'noise'
  | 'parking'
  | 'maintenance'
  | 'security'
  | 'pets'
  | 'garbage'
  | 'lighting'
  | 'landscaping'
  | 'infrastructure'
  | 'safety'
  | 'other';

// Visitor types aligned with mobile app
export interface Visitor {
  id: string;
  name: string;
  phone: string;
  purpose: string;
  hostResident: string;
  hostUnitNumber: string;
  vehicleDetails?: {
    make: string;
    model: string;
    color: string;
    licensePlate: string;
  };
  expectedArrival: Date;
  actualArrival?: Date;
  departure?: Date;
  status: 'expected' | 'arrived' | 'departed' | 'denied' | 'checked-in' | 'checked-out';
  securityNotes?: string;
  approvedBy?: string;
  checkInMethod?: 'pin' | 'qr' | 'manual';
  createdAt: Date;
  updatedAt?: Date;
}

// Infrastructure Report types aligned with mobile app (moved up to avoid conflicts)
export interface InfrastructureReport {
  id: string;
  category: 'electrical' | 'plumbing' | 'security' | 'landscaping' | 'roads' | 'amenities';
  title: string;
  description: string;
  location: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'reported' | 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  reportedBy: string;
  assignedTo?: string;
  estimatedCost?: number;
  actualCost?: number;
  scheduledDate?: Date;
  completedDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  imageURLs?: string[];
  contractorInfo?: {
    name: string;
    contact: string;
    company: string;
  };
}



// Community types aligned with mobile app
export interface CommunityClub {
  id: string;
  name: string;
  description: string;
  members: number;
  category: 'fitness' | 'social' | 'hobby' | 'family' | 'business';
  icon: string;
  organizer: string;
  nextMeeting?: string;
}

export interface CommunityEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  attendees: number;
  maxAttendees?: number;
  category: 'fitness' | 'social' | 'hobby' | 'family' | 'business';
  clubId?: string;
  isAttending: boolean;
}

// Dashboard specific types
export interface DashboardStats {
  totalResidents: number;
  activeAlerts: number;
  pendingComplaints: number;
  visitorsToday: number;
  securityIncidents: number;
  maintenanceRequests: number;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Filter and Search types
export interface FilterOptions {
  dateRange?: {
    start: Date;
    end: Date;
  };
  status?: string[];
  priority?: string[];
  type?: string[];
  assignedTo?: string[];
  location?: string[];
}

export interface SearchParams {
  query?: string;
  filters?: FilterOptions;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

// Chat and Messaging types - aligned with mobile app SecurityIncident system
export interface SecurityMessage {
  id: string;
  incidentId: string;
  senderId: string;
  senderName: string;
  senderRole: 'resident' | 'security' | 'management';
  message: string;
  timestamp: Date;
  type: 'message' | 'status_update' | 'system_notification';
  attachments?: string[];
}

export interface SecurityIncident {
  id: string;
  title: string;
  description: string;
  type: 'security_alert' | 'maintenance_request' | 'complaint_follow_up' | 'general_inquiry';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'acknowledged' | 'in_progress' | 'resolved' | 'closed';
  createdAt: Date;
  updatedAt: Date;
  residentId: string;
  residentName: string;
  unitNumber: string;
  estateId: string;
  assignedOfficer?: string;
  estimatedResolution?: Date;
  location?: string;
  lastMessage?: SecurityMessage;
}

// Legacy chat types - keeping for backward compatibility
export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderRole: 'resident' | 'admin' | 'security' | 'maintenance';
  senderUnitNumber?: string;
  message: string;
  timestamp: Date;
  messageType: 'text' | 'image' | 'file' | 'system';
  attachments?: Array<{
    type: 'image' | 'document' | 'audio';
    url: string;
    fileName: string;
    fileSize?: number;
  }>;
  isRead: boolean;
  isEdited?: boolean;
  editedAt?: Date;
  replyTo?: string; // ID of message being replied to
}

export interface ChatConversation {
  id: string;
  estateId: string;
  participants: Array<{
    userId: string;
    userName: string;
    role: 'resident' | 'admin' | 'security' | 'maintenance';
    unitNumber?: string;
    avatar?: string;
    isOnline: boolean;
    lastSeen: Date;
  }>;
  type: 'direct' | 'group' | 'support' | 'emergency';
  title?: string; // For group chats or support tickets
  description?: string;
  lastMessage?: {
    id: string;
    senderId: string;
    senderName: string;
    message: string;
    timestamp: Date;
    messageType: 'text' | 'image' | 'file' | 'system';
  };
  unreadCount: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  tags?: string[]; // For categorizing support conversations
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  status?: 'open' | 'in-progress' | 'resolved' | 'closed'; // For support conversations
}

// Navigation types for dashboard
export type TabType = 'dashboard' | 'alerts' | 'complaints' | 'visitors' | 'community' | 'profile' | 'reports' | 'maintenance' | 'chat';

// Chart and Analytics types
export interface ChartData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    backgroundColor?: string[];
    borderColor?: string[];
    borderWidth?: number;
  }>;
}

export interface TimeSeriesData {
  date: string;
  complaints: number;
  incidents: number;
  maintenance: number;
  visitors: number;
}

// Mobile app navigation alignment
export type RootTabParamList = {
  Home: undefined;
  Reports: undefined;
  PersonalComplaints: undefined;
  Community: undefined;
  Profile: undefined;
};