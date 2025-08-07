import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Shield, 
  Wrench, 
  Heart, 
  Bell, 
  Home, 
  Settings, 
  Megaphone, 
  DoorOpen, 
  Camera, 
  UserPlus, 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  RefreshCw, 
  Clock, 
  Activity, 
  Zap, 
  Monitor, 
  Wifi,
  Database,
  Phone,
  Flame,
  Circle,
  X,
  Send,
  BarChart3,
  TrendingUp,
  Moon,
  User,
  FileText as DocumentIcon,
  Users as GroupIcon,
  Eye,
  MessageSquare,
  Calendar,
  MapPin,
  Sparkles,
  ArrowUpRight,
  ChevronRight,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Phone as PhoneIcon,
  Mail,
  MapPin as LocationIcon,
  Clock as TimeIcon,
  Star,
  ThumbsUp,
  MessageCircle,
  Share2,
  Download,
  Upload,
  Eye as ViewIcon,
  Lock,
  Unlock,
  Camera as CameraIcon,
  QrCode,
  CreditCard,
  Settings as SettingsIcon,
  LogOut,
  HelpCircle,
  Info,
  ArrowLeft
} from 'lucide-react';

// Import aligned types
import { 
  DashboardStats, 
  EstateAlert, 
  Complaint, 
  Visitor, 
  TabType,
  User as UserType,
  Estate,
  SecurityIncident,
  SecurityMessage
} from './types';
import ChatService from './services/ChatService';

// Using imported types from ./types

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [showComplaintModal, setShowComplaintModal] = useState(false);

  const [stats, setStats] = useState<DashboardStats>({
    totalResidents: 156,
    activeAlerts: 2,
    pendingComplaints: 8,
    visitorsToday: 12,
    securityIncidents: 5,
    maintenanceRequests: 3
  });

  const [alerts, setAlerts] = useState<EstateAlert[]>([
    {
      id: '1',
      uid: 'user-12a',
      estateId: 'estate-seren-001',
      userName: 'Sarah Johnson',
      unitNumber: '12A',
      type: 'security',
      status: 'open',
      description: 'Suspicious activity reported near Unit 12A',
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      location: { latitude: -26.2041, longitude: 28.0473 },
      priority: 'high'
    },
    {
      id: '2',
      uid: 'user-3b',
      estateId: 'estate-seren-001',
      userName: 'Michael Chen',
      unitNumber: '3B',
      type: 'emergency',
      status: 'in-progress',
      description: 'Fire alarm triggered in Building 3',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      location: { latitude: -26.2041, longitude: 28.0473 },
      priority: 'urgent'
    }
  ]);

  const [complaints, setComplaints] = useState<Complaint[]>([
    {
      id: '1',
      uid: 'user-8b',
      estateId: 'estate-seren-001',
      userName: 'Emma Wilson',
      unitNumber: '8B',
      type: 'maintenance',
      title: 'Water Leak in Kitchen',
      description: 'Water leaking from ceiling in kitchen area',
      category: 'Plumbing',
      status: 'resolved',
      priority: 'high',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 30 * 60 * 1000),
      resolvedAt: new Date(Date.now() - 30 * 60 * 1000)
    },
    {
      id: '2',
      uid: 'user-15c',
      estateId: 'estate-seren-001',
      userName: 'David Miller',
      unitNumber: '15C',
      type: 'security',
      title: 'Broken Gate',
      description: 'Main entrance gate not closing properly',
      category: 'Security',
      status: 'in-progress',
      priority: 'medium',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 60 * 60 * 1000)
    }
  ]);

  const [visitors, setVisitors] = useState<Visitor[]>([
    {
      id: '1',
      name: 'John Smith',
      phone: '+27 81 234 5678',
      hostResident: 'Lisa Anderson',
      hostUnitNumber: '15C',
      purpose: 'Family visit',
      expectedArrival: new Date(Date.now() - 60 * 60 * 1000),
      actualArrival: new Date(Date.now() - 60 * 60 * 1000),
      status: 'arrived',
      checkInMethod: 'pin',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      phone: '+27 81 987 6543',
      hostResident: 'Michael Chen',
      hostUnitNumber: '8B',
      purpose: 'Delivery',
      expectedArrival: new Date(Date.now() - 2 * 60 * 60 * 1000),
      actualArrival: new Date(Date.now() - 2 * 60 * 60 * 1000),
      departure: new Date(Date.now() - 30 * 60 * 1000),
      status: 'departed',
      checkInMethod: 'qr',
      createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000)
    }
  ]);

  // Chat state - aligned with mobile app SecurityIncident system
  const [incidents, setIncidents] = useState<SecurityIncident[]>([]);
  const [selectedIncident, setSelectedIncident] = useState<SecurityIncident | null>(null);
  const [messages, setMessages] = useState<SecurityMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  
  // Initialize ChatService
  const chatService = ChatService.getInstance();

  // Demo user and estate data for chat functionality
  const demoUser = {
    uid: 'demo-user-123',
    name: 'Demo User',
    role: 'resident' as const
  };
  const demoEstate = {
    id: 'estate-demo-001'
  };
  
  // Legacy chat data for mock display
  const [conversations, setConversations] = useState<any[]>([
    {
      id: '1',
      estateId: 'estate-seren-001',
      participants: [
        {
          userId: 'user-12a',
          userName: 'Sarah Johnson',
          role: 'resident',
          unitNumber: '12A',
          isOnline: true,
          lastSeen: new Date()
        },
        {
          userId: 'admin-1',
          userName: 'Estate Manager',
          role: 'admin',
          isOnline: true,
          lastSeen: new Date()
        }
      ],
      type: 'support',
      title: 'Security Concern - Unit 12A',
      lastMessage: {
        id: 'msg-1',
        senderId: 'user-12a',
        senderName: 'Sarah Johnson',
        message: 'Can someone please check the security lighting near Building A?',
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        messageType: 'text'
      },
      unreadCount: 1,
      isActive: true,
      createdAt: new Date(Date.now() - 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 5 * 60 * 1000),
      priority: 'medium',
      status: 'open'
    },
    {
      id: '2',
      estateId: 'estate-seren-001',
      participants: [
        {
          userId: 'user-8b',
          userName: 'Michael Chen',
          role: 'resident',
          unitNumber: '8B',
          isOnline: false,
          lastSeen: new Date(Date.now() - 30 * 60 * 1000)
        },
        {
          userId: 'maintenance-1',
          userName: 'Maintenance Team',
          role: 'maintenance',
          isOnline: true,
          lastSeen: new Date()
        }
      ],
      type: 'support',
      title: 'Water Pressure Issue',
      lastMessage: {
        id: 'msg-2',
        senderId: 'maintenance-1',
        senderName: 'Maintenance Team',
        message: 'We\'ve fixed the water pressure issue. Please test and let us know if there are any problems.',
        timestamp: new Date(Date.now() - 45 * 60 * 1000),
        messageType: 'text'
      },
      unreadCount: 0,
      isActive: true,
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 45 * 60 * 1000),
      priority: 'high',
      status: 'resolved'
    }
  ]);



  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Simulate connection
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsConnected(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };

  const formatRelativeTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      case 'high': return 'text-orange-600 bg-orange-100 dark:bg-orange-900/20';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'low': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      default: return 'text-slate-600 bg-slate-100 dark:bg-slate-900/20';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      case 'pending': return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      case 'in-progress': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'resolved': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'closed': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'expected': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
      case 'arrived': return 'text-emerald-600 bg-emerald-100 dark:bg-emerald-900/20';
      case 'departed': return 'text-slate-600 bg-slate-100 dark:bg-slate-900/20';
      case 'denied': return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      case 'checked-in': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
      case 'checked-out': return 'text-slate-600 bg-slate-100 dark:bg-slate-900/20';
      default: return 'text-slate-600 bg-slate-100 dark:bg-slate-900/20';
    }
  };

  // Load incidents when component mounts
  useEffect(() => {
    loadIncidents();
  }, []);

  // Load messages when incident is selected
  useEffect(() => {
    if (selectedIncident) {
      loadMessages(selectedIncident.id);
      // Set up real-time listener for new messages
      const unsubscribe = chatService.subscribeToIncidentMessages(selectedIncident.id, (newMessages) => {
        setMessages(newMessages);
      });
      return unsubscribe;
    }
  }, [selectedIncident]);

  // Chat service methods
  const loadIncidents = async () => {
    try {
      const userIncidents = await chatService.getUserIncidents(demoUser.uid, demoEstate.id);
      setIncidents(userIncidents);
    } catch (error) {
      console.error('Error loading incidents:', error);
    }
  };

  const loadMessages = async (incidentId: string) => {
    try {
      const incidentMessages = await chatService.getIncidentMessages(incidentId);
      setMessages(incidentMessages);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedIncident) return;
    
    try {
      await chatService.sendMessage(
        selectedIncident.id,
        demoUser.uid,
        demoUser.name,
        'resident',
        newMessage.trim()
      );
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const createNewIncident = async (title: string, description: string, type: SecurityIncident['type'], priority: SecurityIncident['priority']) => {
    try {
      const incidentId = await chatService.createIncident({
        title,
        description,
        type,
        priority,
        residentId: demoUser.uid,
        residentName: demoUser.name,
        unitNumber: 'A-101',
        estateId: demoEstate.id,
      });
      
      await loadIncidents();
      
      // Select the newly created incident
      const newIncident = incidents.find(inc => inc.id === incidentId);
      if (newIncident) {
        setSelectedIncident(newIncident);
      }
    } catch (error) {
      console.error('Error creating incident:', error);
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  const getIncidentIcon = (type: string) => {
    switch (type) {
      case 'security_alert': return Shield;
      case 'maintenance_request': return Wrench;
      case 'complaint_follow_up': return DocumentIcon;
      case 'general_inquiry': return HelpCircle;
      default: return AlertTriangle;
    }
  };

  const getIncidentPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      case 'high': return 'text-orange-600 bg-orange-100 dark:bg-orange-900/20';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'low': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      default: return 'text-slate-600 bg-slate-100 dark:bg-slate-900/20';
    }
  };

  const getIncidentStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      case 'acknowledged': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'in_progress': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
      case 'resolved': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'closed': return 'text-slate-600 bg-slate-100 dark:bg-slate-900/20';
      default: return 'text-slate-600 bg-slate-100 dark:bg-slate-900/20';
    }
  };

  const tabs = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'alerts', label: 'Alerts', icon: AlertTriangle, badge: alerts.filter(a => a.status === 'open').length },
    { id: 'complaints', label: 'Reports', icon: DocumentIcon, badge: complaints.filter(c => c.status === 'pending').length },
    { id: 'visitors', label: 'Visitors', icon: UserPlus },
    { id: 'chat', label: 'Live Chat', icon: MessageSquare, badge: incidents.filter(inc => inc.status === 'open' || inc.status === 'acknowledged').length },
    { id: 'community', label: 'Community', icon: Users },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-4 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-white/40 dark:border-slate-700/40 text-center shadow-lg">
          <div className="w-8 h-8 mx-auto mb-2 rounded-lg bg-blue-500/10 flex items-center justify-center">
            <User className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-xl font-bold text-slate-900 dark:text-white mb-1">{stats.totalResidents}</p>
          <p className="text-slate-600 dark:text-slate-300 text-xs">Residents</p>
        </div>

        <div className="glass-card p-4 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-white/40 dark:border-slate-700/40 text-center shadow-lg">
          <div className="w-8 h-8 mx-auto mb-2 rounded-lg bg-red-500/10 flex items-center justify-center">
            <AlertTriangle className="w-4 h-4 text-red-500" />
          </div>
          <p className="text-xl font-bold text-slate-900 dark:text-white mb-1">{stats.activeAlerts}</p>
          <p className="text-slate-600 dark:text-slate-300 text-xs">Alerts</p>
        </div>

        <div className="glass-card p-4 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-white/40 dark:border-slate-700/40 text-center shadow-lg">
          <div className="w-8 h-8 mx-auto mb-2 rounded-lg bg-orange-500/10 flex items-center justify-center">
            <DocumentIcon className="w-4 h-4 text-orange-500" />
          </div>
          <p className="text-xl font-bold text-slate-900 dark:text-white mb-1">{stats.pendingComplaints}</p>
          <p className="text-slate-600 dark:text-slate-300 text-xs">Complaints</p>
        </div>

        <div className="glass-card p-4 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-white/40 dark:border-slate-700/40 text-center shadow-lg">
          <div className="w-8 h-8 mx-auto mb-2 rounded-lg bg-emerald-500/10 flex items-center justify-center">
            <GroupIcon className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-xl font-bold text-slate-900 dark:text-white mb-1">{stats.visitorsToday}</p>
          <p className="text-slate-600 dark:text-slate-300 text-xs">Visitors</p>
        </div>
      </div>

      {/* Quick Actions - Circular Buttons */}
      <div className="glass-card p-6 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-white/40 dark:border-slate-700/40 shadow-lg">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Quick Actions</h3>
        <div className="flex items-center justify-center gap-6">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAlertModal(true)}
            className="flex flex-col items-center gap-2 group"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-red-500/10 to-red-600/10 border-2 border-red-500/20 flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg">
              <AlertTriangle className="w-6 h-6 text-red-500" />
            </div>
            <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Send Alert</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowComplaintModal(true)}
            className="flex flex-col items-center gap-2 group"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500/10 to-blue-600/10 border-2 border-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg">
              <DocumentIcon className="w-6 h-6 text-blue-500" />
            </div>
            <span className="text-xs font-medium text-slate-700 dark:text-slate-300">New Complaint</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab('visitors')}
            className="flex flex-col items-center gap-2 group"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 border-2 border-emerald-500/20 flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg">
              <UserPlus className="w-6 h-6 text-emerald-500" />
            </div>
            <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Visitor Check-in</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab('community')}
            className="flex flex-col items-center gap-2 group"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500/10 to-purple-600/10 border-2 border-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg">
              <Users className="w-6 h-6 text-purple-500" />
            </div>
            <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Community</span>
          </motion.button>
        </div>
      </div>

      {/* Recent Activity - Thin Carousel */}
      <div className="glass-card p-4 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-white/40 dark:border-slate-700/40 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Recent Activity</h3>
          <button className="text-sm text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors duration-200">
            View All
          </button>
        </div>
        
        <div className="space-y-3">
          {alerts.slice(0, 3).map((alert) => (
            <div key={alert.id} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50">
              <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 text-red-500" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-slate-900 dark:text-white truncate">{alert.type.charAt(0).toUpperCase() + alert.type.slice(1)} Alert</h4>
                <p className="text-slate-600 dark:text-slate-300 text-xs truncate">{alert.description}</p>
              </div>
              <div className="text-right">
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(alert.status)}`}>
                  {alert.status}
                </span>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{formatRelativeTime(alert.timestamp)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAlerts = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Security Alerts</h2>
        <button
          onClick={() => setShowAlertModal(true)}
          className="px-3 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg text-sm font-medium hover:from-red-600 hover:to-red-700 transition-all duration-300 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          New Alert
        </button>
      </div>

      <div className="space-y-3">
        {alerts.map((alert) => (
          <div key={alert.id} className="glass-card p-4 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-white/40 dark:border-slate-700/40 shadow-lg">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                </div>
                <div>
                  <h3 className="font-medium text-slate-900 dark:text-white text-sm">{alert.type.charAt(0).toUpperCase() + alert.type.slice(1)} Alert</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300">Unit {alert.unitNumber}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${getPriorityColor(alert.priority || 'low')}`}>
                  {alert.priority || 'low'}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(alert.status)}`}>
                  {alert.status}
                </span>
              </div>
            </div>
            
            <p className="text-slate-700 dark:text-slate-300 text-sm mb-3">{alert.description}</p>
            
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 dark:text-slate-400">{formatRelativeTime(alert.timestamp)}</span>
              <div className="flex items-center gap-2">
                <button className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors duration-200">
                  <Eye className="w-3 h-3 text-slate-600 dark:text-slate-300" />
                </button>
                <button className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors duration-200">
                  <Edit className="w-3 h-3 text-slate-600 dark:text-slate-300" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderComplaints = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Complaints & Issues</h2>
        <button
          onClick={() => setShowComplaintModal(true)}
          className="px-3 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg text-sm font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-300 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          New Complaint
        </button>
      </div>

      <div className="space-y-3">
        {complaints.map((complaint) => (
          <div key={complaint.id} className="glass-card p-4 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-white/40 dark:border-slate-700/40 shadow-lg">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <DocumentIcon className="w-4 h-4 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-medium text-slate-900 dark:text-white text-sm">{complaint.title}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300">{complaint.category} • Unit {complaint.unitNumber}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${getPriorityColor(complaint.priority)}`}>
                  {complaint.priority}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(complaint.status)}`}>
                  {complaint.status}
                </span>
              </div>
            </div>
            
            <p className="text-slate-700 dark:text-slate-300 text-sm mb-3">{complaint.description}</p>
            
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 dark:text-slate-400">{formatRelativeTime(complaint.timestamp)}</span>
              <div className="flex items-center gap-2">
                <button className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors duration-200">
                  <Eye className="w-3 h-3 text-slate-600 dark:text-slate-300" />
                </button>
                <button className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors duration-200">
                  <Edit className="w-3 h-3 text-slate-600 dark:text-slate-300" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderVisitors = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Visitor Management</h2>
        <button className="px-3 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg text-sm font-medium hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Check-in Visitor
        </button>
      </div>

      <div className="space-y-3">
        {visitors.map((visitor) => (
          <div key={visitor.id} className="glass-card p-4 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-white/40 dark:border-slate-700/40 shadow-lg">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <UserPlus className="w-4 h-4 text-emerald-500" />
                </div>
                <div>
                  <h3 className="font-medium text-slate-900 dark:text-white text-sm">{visitor.name}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300">Host: {visitor.hostResident} • Unit {visitor.hostUnitNumber}</p>
                </div>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(visitor.status)}`}>
                {visitor.status}
              </span>
            </div>
            
            <div className="space-y-2 mb-3">
              {visitor.actualArrival && (
                <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                  <Clock className="w-3 h-3" />
                  <span>Arrived: {visitor.actualArrival.toLocaleTimeString()}</span>
                </div>
              )}
              {visitor.departure && (
                <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                  <Clock className="w-3 h-3" />
                  <span>Departed: {visitor.departure.toLocaleTimeString()}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                <Info className="w-3 h-3" />
                <span>Purpose: {visitor.purpose}</span>
              </div>
              {visitor.checkInMethod && (
                <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                  {visitor.checkInMethod === 'pin' ? <QrCode className="w-3 h-3" /> : <CameraIcon className="w-3 h-3" />}
                  <span>Method: {visitor.checkInMethod.toUpperCase()}</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 dark:text-slate-400">{formatRelativeTime(visitor.createdAt)}</span>
              <div className="flex items-center gap-2">
                <button className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors duration-200">
                  <Eye className="w-3 h-3 text-slate-600 dark:text-slate-300" />
                </button>
                <button className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors duration-200">
                  <Edit className="w-3 h-3 text-slate-600 dark:text-slate-300" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCommunity = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Community Hub</h2>
        <button className="px-3 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg text-sm font-medium hover:from-purple-600 hover:to-purple-700 transition-all duration-300 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          New Post
        </button>
      </div>

      <div className="glass-card p-4 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-white/40 dark:border-slate-700/40 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-slate-900 dark:text-white text-sm">Community Announcement</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300">Welcome to Seren Residential Estate!</p>
          </div>
        </div>
        
        <p className="text-slate-700 dark:text-slate-300 text-sm mb-4">
          We're excited to welcome all residents to our beautiful estate. Please take a moment to familiarize yourself with our community guidelines and amenities.
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1 text-xs text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200">
              <ThumbsUp className="w-3 h-3" />
              Like
            </button>
            <button className="flex items-center gap-1 text-xs text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200">
              <MessageCircle className="w-3 h-3" />
              Comment
            </button>
            <button className="flex items-center gap-1 text-xs text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200">
              <Share2 className="w-3 h-3" />
              Share
            </button>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400">2 hours ago</span>
        </div>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-4">
      <div className="glass-card p-6 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-white/40 dark:border-slate-700/40 shadow-lg">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Admin User</h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm">Estate Management</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">admin@serenresidential.co.za</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">Contact Information</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <PhoneIcon className="w-4 h-4 text-slate-500" />
                <span className="text-sm text-slate-700 dark:text-slate-300">+27 11 234 5678</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-500" />
                <span className="text-sm text-slate-700 dark:text-slate-300">admin@serenresidential.co.za</span>
              </div>
              <div className="flex items-center gap-2">
                <LocationIcon className="w-4 h-4 text-slate-500" />
                <span className="text-sm text-slate-700 dark:text-slate-300">Seren Residential Estate</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full flex items-center gap-2 p-2 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors duration-200">
                <SettingsIcon className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                <span className="text-sm text-slate-700 dark:text-slate-300">Settings</span>
              </button>
              <button className="w-full flex items-center gap-2 p-2 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors duration-200">
                <HelpCircle className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                <span className="text-sm text-slate-700 dark:text-slate-300">Help & Support</span>
              </button>
              <button className="w-full flex items-center gap-2 p-2 rounded-lg bg-red-100 dark:bg-red-900/20 hover:bg-red-200 dark:hover:bg-red-900/30 transition-colors duration-200">
                <LogOut className="w-4 h-4 text-red-600" />
                <span className="text-sm text-red-600">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderChat = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-250px)]">
        {/* Incidents List - aligned with mobile app */}
        <div className="lg:col-span-1">
          <div className="p-4 rounded-xl bg-white/70 dark:bg-slate-800/70 border border-white/30 dark:border-slate-700/30 backdrop-blur-xl shadow-lg h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Security Chat</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  // Mock creating a new incident
                  createNewIncident(
                    'General Inquiry',
                    'I need assistance with something.',
                    'general_inquiry',
                    'medium'
                  );
                }}
                className="p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200"
              >
                <Plus className="w-4 h-4" />
              </motion.button>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-2">
              {incidents.length === 0 ? (
                <div className="text-center py-8">
                  <Shield className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-600 dark:text-slate-300 text-sm">No active incidents</p>
                  <p className="text-slate-500 dark:text-slate-400 text-xs">Click + to report a new issue</p>
                </div>
              ) : (
                incidents.map((incident) => {
                  const Icon = getIncidentIcon(incident.type);
                  return (
                    <motion.div
                      key={incident.id}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setSelectedIncident(incident)}
                      className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                        selectedIncident?.id === incident.id
                          ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'
                          : 'bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getIncidentPriorityColor(incident.priority).replace('text-', 'bg-').replace('dark:bg-', '').split(' ')[0].replace('bg-', 'bg-') + '/10'}`}>
                            <Icon className={`w-4 h-4 ${getIncidentPriorityColor(incident.priority).split(' ')[0]}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-slate-900 dark:text-white text-sm truncate">
                              {incident.title}
                            </h3>
                            <p className="text-xs text-slate-600 dark:text-slate-300">
                              {incident.type.replace('_', ' ')} • {incident.assignedOfficer || 'Unassigned'}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${getIncidentPriorityColor(incident.priority)}`}>
                          {incident.priority}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${getIncidentStatusColor(incident.status)}`}>
                          {incident.status}
                        </span>
                      </div>
                      
                      {incident.lastMessage && (
                        <div>
                          <p className="text-xs text-slate-600 dark:text-slate-300 truncate mb-1">
                            {incident.lastMessage.message}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {formatTimestamp(incident.lastMessage.timestamp)}
                          </p>
                        </div>
                      )}
                    </motion.div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="lg:col-span-2">
          <div className="p-4 rounded-xl bg-white/70 dark:bg-slate-800/70 border border-white/30 dark:border-slate-700/30 backdrop-blur-xl shadow-lg h-full flex flex-col">
            {selectedIncident ? (
              <>
                {/* Chat Header */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-200 dark:border-slate-600">
                  <div className="flex items-center gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedIncident(null)}
                      className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors duration-200 lg:hidden"
                    >
                      <ArrowLeft className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                    </motion.button>
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getIncidentPriorityColor(selectedIncident.priority).replace('text-', 'bg-').replace('dark:bg-', '').split(' ')[0].replace('bg-', 'bg-') + '/20'}`}>
                      {React.createElement(getIncidentIcon(selectedIncident.type), {
                        className: `w-5 h-5 ${getIncidentPriorityColor(selectedIncident.priority).split(' ')[0]}`
                      })}
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-900 dark:text-white">
                        {selectedIncident.title}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        {selectedIncident.assignedOfficer || 'Awaiting assignment'} • {selectedIncident.type.replace('_', ' ')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getIncidentStatusColor(selectedIncident.status)}`}>
                      {selectedIncident.status}
                    </span>
                  </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex items-start gap-3 ${
                        message.senderId === demoUser.uid ? 'justify-end' : ''
                      }`}
                    >
                      {message.senderId !== demoUser.uid && (
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          message.senderRole === 'security' ? 'bg-blue-500' :
                          message.senderRole === 'management' ? 'bg-green-500' : 'bg-slate-500'
                        }`}>
                          <span className="text-white text-xs font-medium">
                            {message.senderName.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div className={`flex-1 ${message.senderId === demoUser.uid ? 'flex justify-end' : ''}`}>
                        <div className={`rounded-lg p-3 max-w-xs ${
                          message.type === 'system_notification' ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800' :
                          message.type === 'status_update' ? 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800' :
                          message.senderId === demoUser.uid ? 'bg-blue-500 text-white' : 'bg-slate-100 dark:bg-slate-700'
                        }`}>
                          {message.type !== 'message' && (
                            <div className="flex items-center gap-2 mb-2">
                              <Info className={`w-3 h-3 ${
                                message.type === 'system_notification' ? 'text-blue-600' : 'text-yellow-600'
                              }`} />
                              <span className={`text-xs font-medium ${
                                message.type === 'system_notification' ? 'text-blue-600' : 'text-yellow-600'
                              }`}>
                                {message.type === 'system_notification' ? 'System' : 'Status Update'}
                              </span>
                            </div>
                          )}
                          <p className={`text-sm ${
                            message.senderId === demoUser.uid ? 'text-white' : 'text-slate-900 dark:text-white'
                          }`}>
                            {message.message}
                          </p>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          {formatTimestamp(message.timestamp)}
                        </p>
                      </div>
                      {message.senderId === demoUser.uid && (
                        <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center">
                          <span className="text-white text-xs font-medium">
                            {demoUser.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="w-full p-3 rounded-lg bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && newMessage.trim()) {
                          sendMessage();
                        }
                      }}
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={sendMessage}
                    disabled={!newMessage.trim()}
                    className="p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                  </motion.button>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <Shield className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">Select an incident</h3>
                  <p className="text-slate-600 dark:text-slate-300">Choose an incident from the list to start the conversation</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'alerts':
        return renderAlerts();
      case 'complaints':
        return renderComplaints();
      case 'visitors':
        return renderVisitors();
      case 'chat':
        return renderChat();
      case 'community':
        return renderCommunity();
      case 'profile':
        return renderProfile();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
      
      <div className="container mx-auto px-4 py-4 space-y-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden"
        >
          <div className="glass-card p-4 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-white/40 dark:border-slate-700/40 backdrop-blur-xl shadow-lg">
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 rounded-2xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-slate-600 dark:text-slate-300 text-sm font-medium">Control Room Active</span>
            </div>
                <div className="flex items-center gap-2">
                  <div className="bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 text-emerald-600 dark:text-emerald-400 px-2 py-1 rounded-full text-xs font-semibold border border-emerald-500/20 backdrop-blur-sm">
                24/7
              </div>
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                    className="p-2 rounded-xl bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 hover:from-slate-200 hover:to-slate-300 dark:hover:from-slate-600 dark:hover:to-slate-500 transition-all duration-300 shadow-sm"
              >
                    <Moon className="w-4 h-4 text-slate-600 dark:text-slate-300" />
              </button>
            </div>
          </div>
          
          <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 bg-clip-text text-transparent mb-1">
              {getGreeting()}, Admin
            </h1>
                <h2 className="text-sm text-slate-600 dark:text-slate-300 font-medium">
              Seren Residential Estate Management
            </h2>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Unified Navigation Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-3 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-white/40 dark:border-slate-700/40 shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as TabType)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm whitespace-nowrap transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                    {tab.badge && tab.badge > 0 && (
                      <span className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs px-1.5 py-0.5 rounded-full font-semibold">
                        {tab.badge}
                      </span>
                    )}
          </button>
                );
              })}
            </div>

        {/* Time Display */}
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
              <Clock className="w-4 h-4" />
              {formatTime(currentTime)}
              </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {renderContent()}
        </motion.div>

        {/* Connection Status */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`fixed top-4 right-4 px-3 py-2 rounded-full font-medium z-50 flex items-center gap-2 text-sm shadow-lg backdrop-blur-xl ${
            isConnected 
              ? 'bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20' 
              : 'bg-gradient-to-r from-red-500/10 to-red-600/10 text-red-600 dark:text-red-400 border border-red-500/20'
          }`}
        >
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`}></div>
          {isConnected ? 'Connected' : 'Disconnected'}
        </motion.div>
      </div>
    </div>
  );
}

export default App; 