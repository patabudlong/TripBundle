'use client';

import { useState } from 'react';
import Link from 'next/link';

interface MaintenanceService {
  id: string;
  name: string;
  type: 'residential' | 'commercial' | 'hotel' | 'office' | 'deep-cleaning' | 'maintenance';
  status: 'active' | 'inactive' | 'busy' | 'pending';
  location: string;
  address: string;
  rating: number;
  services: string[];
  images: string[];
  pricing: {
    hourly: number;
    daily: number;
    weekly: number;
    monthly: number;
  };
  availability: {
    days: string[];
    startTime: string;
    endTime: string;
    emergencyService: boolean;
  };
  contact: {
    phone: string;
    email: string;
    supervisor: string;
  };
  team: {
    totalStaff: number;
    availableStaff: number;
    equipment: string[];
  };
  documents: {
    businessPermit: { uploaded: boolean; expiry: string };
    insurance: { uploaded: boolean; expiry: string };
    healthCertificates: { uploaded: boolean; expiry: string };
  };
  earnings: {
    today: number;
    thisWeek: number;
    thisMonth: number;
  };
  bookings: {
    total: number;
    completed: number;
    cancelled: number;
    pending: number;
    todayBookings: number;
  };
  performance: {
    completionRate: number;
    averageRating: number;
    responseTime: number; // in minutes
  };
}

export default function FacilityMaintenanceManagement() {
  const [activeTab, setActiveTab] = useState<'overview' | 'services' | 'bookings' | 'staff' | 'analytics' | 'earnings'>('overview');
  const [showAddService, setShowAddService] = useState(false);
  const [selectedService, setSelectedService] = useState<MaintenanceService | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive' | 'busy' | 'pending'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'residential' | 'commercial' | 'hotel' | 'office' | 'deep-cleaning' | 'maintenance'>('all');
  const [showServiceDetails, setShowServiceDetails] = useState(false);
  const [showBookingDetails, setShowBookingDetails] = useState(false);
  const [showAssignStaff, setShowAssignStaff] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [showAddStaff, setShowAddStaff] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<any>(null);
  const [showStaffDetails, setShowStaffDetails] = useState(false);
  const [showContactStaff, setShowContactStaff] = useState(false);
  const [showAssignToJob, setShowAssignToJob] = useState(false);
  const [showViewSchedule, setShowViewSchedule] = useState(false);

  // Mock data
  const ownerInfo = {
    name: "Boracay Maintenance Solutions",
    email: "owner@boracaymaintenance.com",
    phone: "+63 917 123 4567",
    address: "123 Service Street, Boracay, Aklan",
    license: "BCS-2024-001",
    rating: 4.8,
    totalServices: 8,
    totalBookings: 2150
  };

  const maintenanceServices: MaintenanceService[] = [
    {
      id: 'FM001',
      name: 'Premium Hotel Maintenance',
      type: 'hotel',
      status: 'active',
      location: 'Station 1-3, Boracay',
      address: 'Multiple Hotel Locations, White Beach, Boracay',
      rating: 4.9,
      services: ['Room Maintenance', 'HVAC Service', 'Plumbing', 'Electrical', 'Facility Cleaning'],
      images: [
        'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop'
      ],
      pricing: {
        hourly: 500,
        daily: 3500,
        weekly: 20000,
        monthly: 75000
      },
      availability: {
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        startTime: '06:00',
        endTime: '22:00',
        emergencyService: true
      },
      contact: {
        phone: '+63 917 111 1111',
        email: 'hotel@boracaymaintenance.com',
        supervisor: 'Maria Santos'
      },
      team: {
        totalStaff: 15,
        availableStaff: 12,
        equipment: ['Power Tools', 'HVAC Equipment', 'Plumbing Tools', 'Electrical Supplies', 'Cleaning Equipment']
      },
      documents: {
        businessPermit: { uploaded: true, expiry: '2025-12-31' },
        insurance: { uploaded: true, expiry: '2025-06-30' },
        healthCertificates: { uploaded: true, expiry: '2024-12-31' }
      },
      earnings: {
        today: 12500,
        thisWeek: 87500,
        thisMonth: 350000
      },
      bookings: {
        total: 245,
        completed: 235,
        cancelled: 10,
        pending: 8,
        todayBookings: 12
      },
      performance: {
        completionRate: 95.9,
        averageRating: 4.9,
        responseTime: 15
      }
    },
    {
      id: 'FM002',
      name: 'Residential Deep Clean',
      type: 'residential',
      status: 'active',
      location: 'Boracay Island',
      address: 'Various Residential Areas, Boracay',
      rating: 4.7,
      services: ['House Cleaning', 'Kitchen Deep Clean', 'Bathroom Sanitization', 'Floor Polishing', 'Appliance Cleaning'],
      images: [
        'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=300&fit=crop'
      ],
      pricing: {
        hourly: 350,
        daily: 2500,
        weekly: 15000,
        monthly: 55000
      },
      availability: {
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        startTime: '08:00',
        endTime: '18:00',
        emergencyService: false
      },
      contact: {
        phone: '+63 917 222 2222',
        email: 'residential@boracaymaintenance.com',
        supervisor: 'Juan Rodriguez'
      },
      team: {
        totalStaff: 8,
        availableStaff: 6,
        equipment: ['Vacuum Cleaners', 'Mops & Buckets', 'Cleaning Chemicals', 'Microfiber Cloths', 'Floor Polishers']
      },
      documents: {
        businessPermit: { uploaded: true, expiry: '2025-12-31' },
        insurance: { uploaded: true, expiry: '2025-06-30' },
        healthCertificates: { uploaded: true, expiry: '2024-12-31' }
      },
      earnings: {
        today: 8750,
        thisWeek: 61250,
        thisMonth: 245000
      },
      bookings: {
        total: 189,
        completed: 182,
        cancelled: 7,
        pending: 5,
        todayBookings: 8
      },
      performance: {
        completionRate: 96.3,
        averageRating: 4.7,
        responseTime: 25
      }
    },
    {
      id: 'FM003',
      name: 'Commercial Office Cleaning',
      type: 'commercial',
      status: 'active',
      location: 'D\'Mall & Business District',
      address: 'Commercial Areas, Boracay',
      rating: 4.6,
      services: ['Office Cleaning', 'Restroom Maintenance', 'Floor Care', 'Trash Removal', 'Window Cleaning'],
      images: [
        'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&h=300&fit=crop'
      ],
      pricing: {
        hourly: 400,
        daily: 3000,
        weekly: 18000,
        monthly: 65000
      },
      availability: {
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        startTime: '18:00',
        endTime: '06:00',
        emergencyService: true
      },
      contact: {
        phone: '+63 917 333 3333',
        email: 'commercial@boracaymaintenance.com',
        supervisor: 'Ana Dela Cruz'
      },
      team: {
        totalStaff: 10,
        availableStaff: 8,
        equipment: ['Industrial Vacuums', 'Floor Scrubbers', 'Cleaning Chemicals', 'Safety Equipment', 'Trash Bins']
      },
      documents: {
        businessPermit: { uploaded: true, expiry: '2025-12-31' },
        insurance: { uploaded: true, expiry: '2025-06-30' },
        healthCertificates: { uploaded: true, expiry: '2024-12-31' }
      },
      earnings: {
        today: 9500,
        thisWeek: 66500,
        thisMonth: 266000
      },
      bookings: {
        total: 156,
        completed: 148,
        cancelled: 8,
        pending: 6,
        todayBookings: 6
      },
      performance: {
        completionRate: 94.9,
        averageRating: 4.6,
        responseTime: 30
      }
    }
  ];

  // Calculate totals
  const totalEarnings = maintenanceServices.reduce((sum, service) => sum + service.earnings.thisMonth, 0);
  const totalBookings = maintenanceServices.reduce((sum, service) => sum + service.bookings.total, 0);
  const averageRating = maintenanceServices.reduce((sum, service) => sum + service.rating, 0) / maintenanceServices.length;
  const todayBookings = maintenanceServices.reduce((sum, service) => sum + service.bookings.todayBookings, 0);
  const totalStaff = maintenanceServices.reduce((sum, service) => sum + service.team.totalStaff, 0);
  const availableStaff = maintenanceServices.reduce((sum, service) => sum + service.team.availableStaff, 0);

  // Helper functions for styling
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'inactive': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      case 'busy': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'pending': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'residential': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'commercial': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'hotel': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'office': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'deep-cleaning': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  // Filter services
  const filteredServices = maintenanceServices.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.contact.supervisor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.services.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || service.status === statusFilter;
    const matchesType = typeFilter === 'all' || service.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const renderBookings = () => (
    <div className="space-y-6">
      {/* Bookings Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Bookings Today</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">28</p>
              <p className="text-sm text-green-600">+15% from yesterday</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Pending Assignments</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">8</p>
              <p className="text-sm text-orange-600">Awaiting staff assignment</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">In Progress</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">12</p>
              <p className="text-sm text-green-600">Currently being serviced</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Today's Revenue</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">₱18,750</p>
              <p className="text-sm text-purple-600">From completed services</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search by client, service type, or booking ID..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex gap-4">
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            
            <select 
              value={typeFilter} 
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Services</option>
              <option value="hvac">HVAC Service</option>
              <option value="plumbing">Plumbing</option>
              <option value="electrical">Electrical</option>
              <option value="cleaning">Facility Cleaning</option>
              <option value="maintenance">General Maintenance</option>
            </select>
            
            <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="this-week">This Week</option>
              <option value="this-month">This Month</option>
              <option value="custom">Custom Range</option>
            </select>
            
            <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2z" />
              </svg>
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Booking Details</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Client</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Service</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Staff Assigned</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Schedule</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {[
                {
                  id: "FM-2024-001",
                  bookingTime: "09:30 AM",
                  scheduledTime: "2:00 PM",
                  client: {
                    name: "Boracay Regency Beach Resort",
                    contact: "+63 917 123 4567",
                    type: "Hotel",
                    rating: 4.8
                  },
                  service: {
                    type: "HVAC Service",
                    description: "Air conditioning unit maintenance - Lobby area",
                    priority: "High",
                    estimatedDuration: "3 hours"
                  },
                  staff: {
                    name: "Carlos Mendoza",
                    phone: "+63 918 987 6543",
                    specialization: "HVAC Technician"
                  },
                  location: "Station 1, White Beach",
                  amount: 2500,
                  paymentMethod: "Bank Transfer",
                  status: "in-progress"
                },
                {
                  id: "FM-2024-002",
                  bookingTime: "08:15 AM",
                  scheduledTime: "10:00 AM",
                  client: {
                    name: "Discovery Shores Boracay",
                    contact: "+63 922 555 7890",
                    type: "Resort",
                    rating: 4.9
                  },
                  service: {
                    type: "Plumbing",
                    description: "Bathroom fixture repair - Room 205",
                    priority: "Medium",
                    estimatedDuration: "2 hours"
                  },
                  staff: {
                    name: "Roberto Santos",
                    phone: "+63 919 444 3333",
                    specialization: "Plumber"
                  },
                  location: "Station 1, White Beach",
                  amount: 1800,
                  paymentMethod: "Cash",
                  status: "completed"
                },
                {
                  id: "FM-2024-003",
                  bookingTime: "07:45 AM",
                  scheduledTime: "1:00 PM",
                  client: {
                    name: "Shangri-La Boracay",
                    contact: "+63 917 888 9999",
                    type: "Resort",
                    rating: 4.7
                  },
                  service: {
                    type: "Electrical",
                    description: "Lighting system maintenance - Pool area",
                    priority: "High",
                    estimatedDuration: "4 hours"
                  },
                  staff: null,
                  location: "Station 1, Bulabog Beach",
                  amount: 3200,
                  paymentMethod: "Credit Card",
                  status: "pending"
                },
                {
                  id: "FM-2024-004",
                  bookingTime: "10:20 AM",
                  scheduledTime: "3:30 PM",
                  client: {
                    name: "Henann Regency Resort",
                    contact: "+63 918 777 6666",
                    type: "Resort",
                    rating: 4.6
                  },
                  service: {
                    type: "Facility Cleaning",
                    description: "Deep cleaning - Conference room",
                    priority: "Low",
                    estimatedDuration: "2.5 hours"
                  },
                  staff: {
                    name: "Maria Garcia",
                    phone: "+63 920 333 2222",
                    specialization: "Cleaning Supervisor"
                  },
                  location: "Station 2, White Beach",
                  amount: 1500,
                  paymentMethod: "Bank Transfer",
                  status: "confirmed"
                },
                {
                  id: "FM-2024-005",
                  bookingTime: "11:00 AM",
                  scheduledTime: "4:00 PM",
                  client: {
                    name: "Astoria Boracay",
                    contact: "+63 917 666 5555",
                    type: "Hotel",
                    rating: 4.5
                  },
                  service: {
                    type: "General Maintenance",
                    description: "Door lock repair - Multiple rooms",
                    priority: "Medium",
                    estimatedDuration: "3 hours"
                  },
                  staff: {
                    name: "Juan Dela Cruz",
                    phone: "+63 919 222 1111",
                    specialization: "General Maintenance"
                  },
                  location: "Station 2, White Beach",
                  amount: 2200,
                  paymentMethod: "Cash",
                  status: "confirmed"
                }
              ].map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{booking.id}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Booked: {booking.bookingTime}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{booking.client.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{booking.client.contact}</div>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className={`w-3 h-3 ${i < Math.floor(booking.client.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">{booking.client.rating}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{booking.service.type}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 max-w-xs truncate">{booking.service.description}</div>
                      <div className="flex items-center mt-1">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          booking.service.priority === 'High' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                          booking.service.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                          'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        }`}>
                          {booking.service.priority}
                        </span>
                        <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">{booking.service.estimatedDuration}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {booking.staff ? (
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{booking.staff.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{booking.staff.phone}</div>
                        <div className="text-xs text-blue-600 dark:text-blue-400">{booking.staff.specialization}</div>
                      </div>
                    ) : (
                      <span className="text-sm text-orange-600 dark:text-orange-400">Unassigned</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{booking.scheduledTime}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{booking.location}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      booking.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      booking.status === 'in-progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                      booking.status === 'confirmed' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                      booking.status === 'pending' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' :
                      'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {booking.status === 'in-progress' ? 'In Progress' : 
                       booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">₱{booking.amount.toLocaleString()}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{booking.paymentMethod}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => {
                          setSelectedBooking(booking);
                          setShowBookingDetails(true);
                        }}
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        View
                      </button>
                      {booking.status === 'pending' && (
                        <button 
                          onClick={() => {
                            setSelectedBooking(booking);
                            setShowAssignStaff(true);
                          }}
                          className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                        >
                          Assign
                        </button>
                      )}
                      {(booking.status === 'pending' || booking.status === 'confirmed') && (
                        <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                          Cancel
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of{' '}
            <span className="font-medium">28</span> results
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700">
              Previous
            </button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded-md">1</button>
            <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700">
              2
            </button>
            <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700">
              3
            </button>
            <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStaff = () => (
    <div className="space-y-6">
      {/* Staff Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Staff</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">48</p>
              <p className="text-sm text-blue-600">+3 this month</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Available Now</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">32</p>
              <p className="text-sm text-green-600">67% availability</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">On Active Jobs</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">16</p>
              <p className="text-sm text-yellow-600">Currently working</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Average Rating</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">4.6</p>
              <p className="text-sm text-purple-600">Excellent performance</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search staff by name, specialization, or ID..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex gap-4">
            <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
              <option value="all">All Status</option>
              <option value="available">Available</option>
              <option value="busy">On Job</option>
              <option value="off-duty">Off Duty</option>
            </select>
            
            <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
              <option value="all">All Specializations</option>
              <option value="hvac">HVAC Technician</option>
              <option value="plumbing">Plumbing Specialist</option>
              <option value="electrical">Electrical Technician</option>
              <option value="cleaning">Cleaning Supervisor</option>
              <option value="maintenance">General Maintenance</option>
            </select>
            
            <button 
              onClick={() => setShowAddStaff(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>Add Staff</span>
            </button>
          </div>
        </div>
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[
          {
            id: "ST001",
            name: "Carlos Mendoza",
            phone: "+63 918 987 6543",
            email: "carlos.mendoza@boracaymaintenance.com",
            specialization: "HVAC Technician",
            rating: 4.8,
            status: "available",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
            joinDate: "2023-01-15",
            completedJobs: 156,
            currentLocation: "Station 1",
            certifications: ["HVAC Certified", "Safety Training"],
            earnings: {
              today: 2800,
              thisWeek: 18500,
              thisMonth: 75000
            },
            schedule: {
              shift: "Day Shift",
              hours: "8:00 AM - 5:00 PM"
            }
          },
          {
            id: "ST002",
            name: "Roberto Silva",
            phone: "+63 919 555 4444",
            email: "roberto.silva@boracaymaintenance.com",
            specialization: "Plumbing Specialist",
            rating: 4.9,
            status: "busy",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
            joinDate: "2022-08-20",
            completedJobs: 203,
            currentLocation: "Station 2",
            certifications: ["Master Plumber", "Emergency Response"],
            earnings: {
              today: 3200,
              thisWeek: 22000,
              thisMonth: 89000
            },
            schedule: {
              shift: "Day Shift",
              hours: "7:00 AM - 4:00 PM"
            }
          },
          {
            id: "ST003",
            name: "Ana Rodriguez",
            phone: "+63 920 777 8888",
            email: "ana.rodriguez@boracaymaintenance.com",
            specialization: "Electrical Technician",
            rating: 4.7,
            status: "available",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
            joinDate: "2023-03-10",
            completedJobs: 134,
            currentLocation: "Station 3",
            certifications: ["Licensed Electrician", "Solar Installation"],
            earnings: {
              today: 2400,
              thisWeek: 16800,
              thisMonth: 68000
            },
            schedule: {
              shift: "Day Shift",
              hours: "8:00 AM - 5:00 PM"
            }
          },
          {
            id: "ST004",
            name: "Maria Garcia",
            phone: "+63 920 333 2222",
            email: "maria.garcia@boracaymaintenance.com",
            specialization: "Cleaning Supervisor",
            rating: 4.6,
            status: "available",
            avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
            joinDate: "2022-11-05",
            completedJobs: 189,
            currentLocation: "Station 1",
            certifications: ["Cleaning Management", "Chemical Safety"],
            earnings: {
              today: 2000,
              thisWeek: 14000,
              thisMonth: 58000
            },
            schedule: {
              shift: "Night Shift",
              hours: "10:00 PM - 6:00 AM"
            }
          },
          {
            id: "ST005",
            name: "Juan Dela Cruz",
            phone: "+63 919 222 1111",
            email: "juan.delacruz@boracaymaintenance.com",
            specialization: "General Maintenance",
            rating: 4.8,
            status: "busy",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
            joinDate: "2023-02-28",
            completedJobs: 167,
            currentLocation: "Station 2",
            certifications: ["Multi-Trade Certified", "Equipment Operation"],
            earnings: {
              today: 2600,
              thisWeek: 17200,
              thisMonth: 71000
            },
            schedule: {
              shift: "Day Shift",
              hours: "8:00 AM - 5:00 PM"
            }
          },
          {
            id: "ST006",
            name: "Lisa Chen",
            phone: "+63 917 444 5555",
            email: "lisa.chen@boracaymaintenance.com",
            specialization: "HVAC Technician",
            rating: 4.9,
            status: "off-duty",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
            joinDate: "2022-06-12",
            completedJobs: 198,
            currentLocation: "Off Duty",
            certifications: ["HVAC Master", "Refrigeration Specialist"],
            earnings: {
              today: 0,
              thisWeek: 19500,
              thisMonth: 82000
            },
            schedule: {
              shift: "Day Shift",
              hours: "8:00 AM - 5:00 PM"
            }
          }
        ].map((staff) => (
          <div key={staff.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              {/* Staff Header */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="relative">
                  <img src={staff.avatar} alt={staff.name} className="w-16 h-16 rounded-full object-cover" />
                  <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white dark:border-gray-800 ${
                    staff.status === 'available' ? 'bg-green-500' :
                    staff.status === 'busy' ? 'bg-yellow-500' : 'bg-gray-500'
                  }`}></div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{staff.name}</h3>
                  <p className="text-sm text-blue-600 dark:text-blue-400">{staff.specialization}</p>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`w-3 h-3 ${i < Math.floor(staff.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">{staff.rating}</span>
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <div className="mb-4">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  staff.status === 'available' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                  staff.status === 'busy' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                  'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                }`}>
                  {staff.status === 'available' ? 'Available' :
                   staff.status === 'busy' ? 'On Job' : 'Off Duty'}
                </span>
              </div>

              {/* Staff Details */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">ID:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{staff.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Jobs:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{staff.completedJobs}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Location:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{staff.currentLocation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Shift:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{staff.schedule.shift}</span>
                </div>
              </div>

              {/* Earnings */}
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="text-sm">
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-600 dark:text-gray-400">Today:</span>
                    <span className="font-medium text-green-600">₱{staff.earnings.today.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">This Month:</span>
                    <span className="font-medium text-green-600">₱{staff.earnings.thisMonth.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 flex space-x-2">
                <button 
                  onClick={() => {
                    setSelectedStaff(staff);
                    setShowStaffDetails(true);
                  }}
                  className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg font-medium transition-colors"
                >
                  View Details
                </button>
                <button 
                  onClick={() => {
                    setSelectedStaff(staff);
                    setShowContactStaff(true);
                  }}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      {/* Analytics Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">₱2.4M</p>
              <p className="text-sm text-green-600">+18% from last month</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Services Completed</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">1,247</p>
              <p className="text-sm text-blue-600">+12% completion rate</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Customer Satisfaction</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">4.8/5</p>
              <p className="text-sm text-purple-600">Excellent rating</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Avg Response Time</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">18 min</p>
              <p className="text-sm text-orange-600">-5 min improvement</p>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue and Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Revenue Trends</h3>
            <select className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
              <option>Last 6 Months</option>
              <option>Last 12 Months</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="h-64 flex items-end justify-between space-x-2">
            {[
              { month: 'Jul', amount: 180000, height: 45 },
              { month: 'Aug', amount: 220000, height: 55 },
              { month: 'Sep', amount: 195000, height: 49 },
              { month: 'Oct', amount: 285000, height: 71 },
              { month: 'Nov', amount: 310000, height: 78 },
              { month: 'Dec', amount: 340000, height: 85 }
            ].map((data, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-t-lg relative group cursor-pointer">
                  <div 
                    className="bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg transition-all duration-300 hover:from-blue-700 hover:to-blue-500"
                    style={{ height: `${data.height}%` }}
                  ></div>
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    ₱{(data.amount / 1000).toFixed(0)}K
                  </div>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400 mt-2">{data.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Service Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Service Distribution</h3>
          <div className="space-y-4">
            {[
              { service: 'HVAC Maintenance', percentage: 35, amount: 840000, color: 'bg-blue-500' },
              { service: 'Emergency Repairs', percentage: 28, amount: 672000, color: 'bg-red-500' },
              { service: 'Preventive Service', percentage: 22, amount: 528000, color: 'bg-green-500' },
              { service: 'Electrical Work', percentage: 10, amount: 240000, color: 'bg-yellow-500' },
              { service: 'Plumbing', percentage: 5, amount: 120000, color: 'bg-purple-500' }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3 flex-1">
                  <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                  <span className="text-sm text-gray-900 dark:text-white">{item.service}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${item.color}`}
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white w-12 text-right">{item.percentage}%</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400 w-20 text-right">₱{(item.amount / 1000).toFixed(0)}K</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Analytics Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Staff */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Top Performing Staff</h3>
          <div className="space-y-4">
            {[
              { name: 'Carlos Rodriguez', specialization: 'HVAC Specialist', jobs: 45, earnings: 125000, rating: 4.9, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
              { name: 'Maria Santos', specialization: 'Electrical Technician', jobs: 38, earnings: 98000, rating: 4.8, avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face' },
              { name: 'Roberto Cruz', specialization: 'General Maintenance', jobs: 42, earnings: 89000, rating: 4.7, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
              { name: 'Ana Reyes', specialization: 'Plumbing Specialist', jobs: 35, earnings: 76000, rating: 4.6, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face' }
            ].map((staff, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <img src={staff.avatar} alt={staff.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{staff.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{staff.specialization}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{staff.jobs} jobs</p>
                  <p className="text-sm text-green-600">₱{(staff.earnings / 1000).toFixed(0)}K</p>
                  <div className="flex items-center">
                    <svg className="w-3 h-3 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-xs text-gray-600 dark:text-gray-400">{staff.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Clients */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Top Clients</h3>
          <div className="space-y-4">
            {[
              { name: 'Paradise Resort', type: 'Hotel', bookings: 28, revenue: 485000, growth: '+15%' },
              { name: 'Ocean View Hotel', type: 'Hotel', bookings: 22, revenue: 380000, growth: '+8%' },
              { name: 'Beachfront Villa', type: 'Resort', bookings: 18, revenue: 295000, growth: '+22%' },
              { name: 'Sunset Restaurant', type: 'Restaurant', bookings: 15, revenue: 185000, growth: '+5%' },
              { name: 'Marina Bay Resort', type: 'Resort', bookings: 12, revenue: 165000, growth: '+18%' }
            ].map((client, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{client.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{client.type} • {client.bookings} bookings</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-green-600">₱{(client.revenue / 1000).toFixed(0)}K</p>
                  <p className="text-sm text-blue-600">{client.growth}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Earnings Breakdown */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Monthly Earnings Breakdown</h3>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg">2024</button>
            <button className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">2023</button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Month</th>
                <th className="text-right py-3 px-4 font-medium text-gray-900 dark:text-white">Services</th>
                <th className="text-right py-3 px-4 font-medium text-gray-900 dark:text-white">Revenue</th>
                <th className="text-right py-3 px-4 font-medium text-gray-900 dark:text-white">Staff Costs</th>
                <th className="text-right py-3 px-4 font-medium text-gray-900 dark:text-white">Net Profit</th>
                <th className="text-right py-3 px-4 font-medium text-gray-900 dark:text-white">Growth</th>
              </tr>
            </thead>
            <tbody>
              {[
                { month: 'December 2024', services: 156, revenue: 340000, costs: 204000, profit: 136000, growth: '+18%' },
                { month: 'November 2024', services: 142, revenue: 310000, costs: 186000, profit: 124000, growth: '+12%' },
                { month: 'October 2024', services: 138, revenue: 285000, costs: 171000, profit: 114000, growth: '+8%' },
                { month: 'September 2024', services: 125, revenue: 195000, costs: 117000, profit: 78000, growth: '-5%' },
                { month: 'August 2024', services: 134, revenue: 220000, costs: 132000, profit: 88000, growth: '+15%' },
                { month: 'July 2024', services: 118, revenue: 180000, costs: 108000, profit: 72000, growth: '+3%' }
              ].map((data, index) => (
                <tr key={index} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="py-3 px-4 text-gray-900 dark:text-white">{data.month}</td>
                  <td className="py-3 px-4 text-right text-gray-900 dark:text-white">{data.services}</td>
                  <td className="py-3 px-4 text-right text-gray-900 dark:text-white">₱{data.revenue.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right text-gray-900 dark:text-white">₱{data.costs.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right font-medium text-green-600">₱{data.profit.toLocaleString()}</td>
                  <td className={`py-3 px-4 text-right font-medium ${
                    data.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {data.growth}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderEarnings = () => (
    <div className="space-y-6">
      {/* Earnings Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Today's Earnings</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">₱28,450</p>
              <p className="text-sm text-green-600">+12% from yesterday</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">This Week</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">₱185,200</p>
              <p className="text-sm text-blue-600">+8% from last week</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">This Month</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">₱742,800</p>
              <p className="text-sm text-purple-600">+15% from last month</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Average Per Job</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">₱2,850</p>
              <p className="text-sm text-orange-600">+5% increase</p>
            </div>
          </div>
        </div>
      </div>

      {/* Earnings Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date Range</label>
              <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                <option>Today</option>
                <option>This Week</option>
                <option>This Month</option>
                <option>Last 3 Months</option>
                <option>This Year</option>
                <option>Custom Range</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Service Type</label>
              <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                <option>All Services</option>
                <option>HVAC Maintenance</option>
                <option>Emergency Repairs</option>
                <option>Preventive Service</option>
                <option>Electrical Work</option>
                <option>Plumbing</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Staff Member</label>
              <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                <option>All Staff</option>
                <option>Carlos Rodriguez</option>
                <option>Maria Santos</option>
                <option>Roberto Cruz</option>
                <option>Ana Reyes</option>
              </select>
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
              Apply Filters
            </button>
            <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Daily Earnings Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Daily Earnings Trend</h3>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg">7 Days</button>
            <button className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">30 Days</button>
          </div>
        </div>
        <div className="h-64 flex items-end justify-between space-x-1">
          {[
            { day: 'Mon', amount: 22500, height: 60 },
            { day: 'Tue', amount: 18200, height: 48 },
            { day: 'Wed', amount: 31800, height: 85 },
            { day: 'Thu', amount: 26400, height: 70 },
            { day: 'Fri', amount: 35200, height: 94 },
            { day: 'Sat', amount: 28900, height: 77 },
            { day: 'Sun', amount: 22450, height: 60 }
          ].map((data, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-t-lg relative group cursor-pointer">
                <div 
                  className="bg-gradient-to-t from-green-600 to-green-400 rounded-t-lg transition-all duration-300 hover:from-green-700 hover:to-green-500"
                  style={{ height: `${data.height}%` }}
                ></div>
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  ₱{data.amount.toLocaleString()}
                </div>
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400 mt-2">{data.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Earnings by Service Type and Staff Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Earnings by Service Type */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Earnings by Service Type</h3>
          <div className="space-y-4">
            {[
              { service: 'HVAC Maintenance', earnings: 285000, percentage: 38, jobs: 45, avgPrice: 6333, color: 'bg-blue-500' },
              { service: 'Emergency Repairs', earnings: 220000, percentage: 30, jobs: 32, avgPrice: 6875, color: 'bg-red-500' },
              { service: 'Preventive Service', earnings: 165000, percentage: 22, jobs: 28, avgPrice: 5893, color: 'bg-green-500' },
              { service: 'Electrical Work', earnings: 52000, percentage: 7, jobs: 12, avgPrice: 4333, color: 'bg-yellow-500' },
              { service: 'Plumbing', earnings: 20800, percentage: 3, jobs: 8, avgPrice: 2600, color: 'bg-purple-500' }
            ].map((item, index) => (
              <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                    <span className="font-medium text-gray-900 dark:text-white">{item.service}</span>
                  </div>
                  <span className="text-lg font-bold text-green-600">₱{item.earnings.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                  <span>{item.jobs} jobs completed</span>
                  <span>Avg: ₱{item.avgPrice.toLocaleString()}/job</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${item.color}`}
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Staff Earnings Performance */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Staff Earnings Performance</h3>
          <div className="space-y-4">
            {[
              { name: 'Carlos Rodriguez', specialization: 'HVAC Specialist', earnings: 125000, jobs: 45, commission: 18750, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
              { name: 'Maria Santos', specialization: 'Electrical Technician', earnings: 98000, jobs: 32, commission: 14700, avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face' },
              { name: 'Roberto Cruz', specialization: 'General Maintenance', earnings: 89000, jobs: 42, commission: 13350, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
              { name: 'Ana Reyes', specialization: 'Plumbing Specialist', earnings: 76000, jobs: 28, commission: 11400, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face' },
              { name: 'Luis Garcia', specialization: 'Emergency Technician', earnings: 68000, jobs: 25, commission: 10200, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face' }
            ].map((staff, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <img src={staff.avatar} alt={staff.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{staff.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{staff.specialization}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-green-600">₱{staff.earnings.toLocaleString()}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{staff.jobs} jobs • ₱{staff.commission.toLocaleString()} commission</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Earnings Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Earnings Transactions</h3>
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Search transactions..."
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
            <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors">
              Download CSV
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Date & Time</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Service</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Client</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Staff</th>
                <th className="text-right py-3 px-4 font-medium text-gray-900 dark:text-white">Amount</th>
                <th className="text-right py-3 px-4 font-medium text-gray-900 dark:text-white">Commission</th>
                <th className="text-center py-3 px-4 font-medium text-gray-900 dark:text-white">Payment</th>
                <th className="text-center py-3 px-4 font-medium text-gray-900 dark:text-white">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { date: 'Dec 16, 2024 2:30 PM', service: 'HVAC Maintenance', client: 'Paradise Resort', staff: 'Carlos Rodriguez', amount: 8500, commission: 1275, payment: 'Credit Card', status: 'Paid' },
                { date: 'Dec 16, 2024 11:15 AM', service: 'Emergency AC Repair', client: 'Ocean View Hotel', staff: 'Maria Santos', amount: 6200, commission: 930, payment: 'Cash', status: 'Paid' },
                { date: 'Dec 16, 2024 9:45 AM', service: 'Preventive Service', client: 'Beachfront Villa', staff: 'Roberto Cruz', amount: 4800, commission: 720, payment: 'Bank Transfer', status: 'Paid' },
                { date: 'Dec 15, 2024 4:20 PM', service: 'Plumbing Repair', client: 'Sunset Restaurant', staff: 'Ana Reyes', amount: 3200, commission: 480, payment: 'Credit Card', status: 'Paid' },
                { date: 'Dec 15, 2024 1:10 PM', service: 'Electrical Work', client: 'Marina Bay Resort', staff: 'Luis Garcia', amount: 5500, commission: 825, payment: 'Cash', status: 'Pending' }
              ].map((transaction, index) => (
                <tr key={index} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="py-3 px-4 text-gray-900 dark:text-white">{transaction.date}</td>
                  <td className="py-3 px-4 text-gray-900 dark:text-white">{transaction.service}</td>
                  <td className="py-3 px-4 text-gray-900 dark:text-white">{transaction.client}</td>
                  <td className="py-3 px-4 text-gray-900 dark:text-white">{transaction.staff}</td>
                  <td className="py-3 px-4 text-right font-medium text-green-600">₱{transaction.amount.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right text-gray-900 dark:text-white">₱{transaction.commission.toLocaleString()}</td>
                  <td className="py-3 px-4 text-center">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      {transaction.payment}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      transaction.status === 'Paid' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }`}>
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Earnings Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-md p-6 text-white">
          <h4 className="text-lg font-semibold mb-2">Total Revenue</h4>
          <p className="text-3xl font-bold mb-1">₱742,800</p>
          <p className="text-green-100">This month</p>
        </div>
        
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-md p-6 text-white">
          <h4 className="text-lg font-semibold mb-2">Staff Commissions</h4>
          <p className="text-3xl font-bold mb-1">₱111,420</p>
          <p className="text-blue-100">15% of revenue</p>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-md p-6 text-white">
          <h4 className="text-lg font-semibold mb-2">Net Profit</h4>
          <p className="text-3xl font-bold mb-1">₱631,380</p>
          <p className="text-purple-100">85% profit margin</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Facility Maintenance Management</h1>
              <p className="text-gray-600 dark:text-gray-400">Manage maintenance services, staff, and operations</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600 dark:text-gray-400">{ownerInfo.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-500">{ownerInfo.rating} ⭐ • {maintenanceServices.length} Services</p>
              </div>
              <Link href="/dashboard" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', name: 'Overview', icon: '📊' },
              { id: 'services', name: 'Services', icon: '🧹' },
              { id: 'bookings', name: 'Bookings', icon: '📅' },
              { id: 'staff', name: 'Staff', icon: '👥' },
              { id: 'earnings', name: 'Earnings', icon: '💰' },
              { id: 'analytics', name: 'Analytics', icon: '📈' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m0 0h2M7 7h10M7 11h10M7 15h10" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Services</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">{maintenanceServices.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                    <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Monthly Revenue</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">₱{totalEarnings.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                    <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Bookings</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">{totalBookings}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                    <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Available Staff</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">{availableStaff}/{totalStaff}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Today's Summary */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Today's Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">{todayBookings}</p>
                  <p className="text-sm text-blue-800 dark:text-blue-400">Bookings Today</p>
                </div>
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">₱{maintenanceServices.reduce((sum, s) => sum + s.earnings.today, 0).toLocaleString()}</p>
                  <p className="text-sm text-green-800 dark:text-green-400">Today's Revenue</p>
                </div>
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">{maintenanceServices.filter(s => s.status === 'active').length}</p>
                  <p className="text-sm text-purple-800 dark:text-purple-400">Active Services</p>
                </div>
                <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <p className="text-2xl font-bold text-orange-600">{averageRating.toFixed(1)} ⭐</p>
                  <p className="text-sm text-orange-800 dark:text-orange-400">Average Rating</p>
                </div>
              </div>
            </div>

            {/* Service Performance */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Service Performance</h3>
              <div className="space-y-4">
                {maintenanceServices.slice(0, 3).map((service) => (
                  <div key={service.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <img src={service.images[0]} alt={service.name} className="w-16 h-16 object-cover rounded-lg" />
                      <div>
                        <h4 className="font-medium">{service.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{service.location}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${service.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'}`}>
                            {service.status}
                          </span>
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                            {service.type}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₱{service.earnings.thisMonth.toLocaleString()}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{service.bookings.total} bookings</p>
                      <p className="text-sm text-yellow-600">{service.rating} ⭐ • {service.performance.completionRate}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Services Tab */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            {/* Search and Filter Bar */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                <div className="flex-1 max-w-md">
                  <div className="relative">
                    <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                      type="text"
                      placeholder="Search services by name, location, supervisor, or service type..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  {/* Status Filter */}
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as any)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="busy">Busy</option>
                    <option value="pending">Pending</option>
                  </select>

                  {/* Type Filter */}
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value as any)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Types</option>
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="hotel">Hotel</option>
                    <option value="office">Office</option>
                    <option value="deep-cleaning">Deep Cleaning</option>
                    <option value="maintenance">Maintenance</option>
                  </select>

                  {/* Add Service Button */}
                  <button 
                    onClick={() => setShowAddService(true)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center space-x-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Add Service</span>
                  </button>
                </div>
              </div>

              {/* Search Results Info */}
              {searchQuery && (
                <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                  Found {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''} matching "{searchQuery}"
                </div>
              )}
            </div>

            {/* Services Grid */}
            {filteredServices.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredServices.map((service) => (
                  <div key={service.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <img src={service.images[0]} alt={service.name} className="w-full h-48 object-cover" />
                      <div className="absolute top-4 left-4 flex space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(service.status)}`}>
                          {service.status}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(service.type)}`}>
                          {service.type}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-lg px-2 py-1">
                        <div className="flex items-center space-x-1">
                          <span className="text-yellow-400">⭐</span>
                          <span className="text-sm font-medium">{service.rating}</span>
                        </div>
                      </div>
                      {service.availability.emergencyService && (
                        <div className="absolute bottom-4 right-4 bg-red-500 text-white rounded-lg px-2 py-1 text-xs font-medium">
                          24/7 Emergency
                        </div>
                      )}
                    </div>
                    
                    <div className="p-6">
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold mb-1">{service.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{service.location}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {service.services.slice(0, 3).map((serviceType, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs">
                              {serviceType}
                            </span>
                          ))}
                          {service.services.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs">
                              +{service.services.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">Staff Available</p>
                          <p className="font-medium">{service.team.availableStaff}/{service.team.totalStaff}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">Completion Rate</p>
                          <p className="font-medium text-green-600">{service.performance.completionRate}%</p>
                        </div>
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">Supervisor</p>
                          <p className="font-medium">{service.contact.supervisor}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">Response Time</p>
                          <p className="font-medium">{service.performance.responseTime} min</p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Pricing (Starting from)</p>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="text-center p-2 bg-green-50 dark:bg-green-900/20 rounded">
                            <p className="font-medium text-green-600">₱{service.pricing.hourly}</p>
                            <p className="text-xs text-green-800 dark:text-green-400">Hourly</p>
                          </div>
                          <div className="text-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                            <p className="font-medium text-blue-600">₱{service.pricing.daily.toLocaleString()}</p>
                            <p className="text-xs text-blue-800 dark:text-blue-400">Daily</p>
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Today's Performance</p>
                        <div className="flex justify-between text-sm">
                          <span>Bookings: <span className="font-medium text-blue-600">{service.bookings.todayBookings}</span></span>
                          <span>Revenue: <span className="font-medium text-green-600">₱{service.earnings.today.toLocaleString()}</span></span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Availability</p>
                        <div className="text-sm">
                          <p className="font-medium">{service.availability.startTime} - {service.availability.endTime}</p>
                          <p className="text-gray-600 dark:text-gray-400">
                            {service.availability.days.length === 7 ? 'Daily' : `${service.availability.days.length} days/week`}
                          </p>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <button 
                          onClick={() => setSelectedService(service)}
                          className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                        >
                          View Details
                        </button>
                        <button className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg text-sm font-medium transition-colors">
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m0 0h2M7 7h10M7 11h10M7 15h10" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  {searchQuery ? 'No services found' : 'No services available'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {searchQuery 
                    ? 'Try adjusting your search criteria or filters' 
                    : 'Add your first maintenance service to get started'
                  }
                </p>
                {!searchQuery && (
                  <button 
                    onClick={() => setShowAddService(true)}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Add Your First Service
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* Add Service Modal */}
        {showAddService && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold">Add New Maintenance Service</h3>
                  <button 
                    onClick={() => setShowAddService(false)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Service Name</label>
                      <input 
                        type="text" 
                        placeholder="e.g., Premium Hotel Maintenance"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Service Type</label>
                      <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option value="">Select Type</option>
                        <option value="residential">Residential</option>
                        <option value="commercial">Commercial</option>
                        <option value="hotel">Hotel</option>
                        <option value="office">Office</option>
                        <option value="deep-cleaning">Deep Cleaning</option>
                        <option value="maintenance">Maintenance</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Location</label>
                      <input 
                        type="text" 
                        placeholder="e.g., Station 1-3, Boracay"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Status</label>
                      <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="busy">Busy</option>
                        <option value="pending">Pending</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Full Address</label>
                    <textarea 
                      rows={3}
                      placeholder="Complete address where service is provided"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Hourly Rate (₱)</label>
                      <input 
                        type="number" 
                        placeholder="e.g., 500"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Daily Rate (₱)</label>
                      <input 
                        type="number" 
                        placeholder="e.g., 3500"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Weekly Rate (₱)</label>
                      <input 
                        type="number" 
                        placeholder="e.g., 20000"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Monthly Rate (₱)</label>
                      <input 
                        type="number" 
                        placeholder="e.g., 75000"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Total Staff</label>
                      <input 
                        type="number" 
                        placeholder="e.g., 15"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Available Staff</label>
                      <input 
                        type="number" 
                        placeholder="e.g., 12"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Start Time</label>
                      <input 
                        type="time" 
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">End Time</label>
                      <input 
                        type="time" 
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Supervisor Name</label>
                      <input 
                        type="text" 
                        placeholder="e.g., Maria Santos"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Contact Phone</label>
                      <input 
                        type="tel" 
                        placeholder="e.g., +63 917 111 1111"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email Address</label>
                      <input 
                        type="email" 
                        placeholder="e.g., service@maintenance.com"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Services Offered</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {['Room Maintenance', 'HVAC Service', 'Plumbing', 'Electrical', 'Facility Cleaning', 'Kitchen Deep Clean', 'Bathroom Sanitization', 'Floor Polishing', 'Appliance Cleaning'].map((service) => (
                        <label key={service} className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500" />
                          <span className="text-sm">{service}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Equipment Available</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {['Power Tools', 'HVAC Equipment', 'Plumbing Tools', 'Electrical Supplies', 'Cleaning Equipment'].map((equipment) => (
                        <label key={equipment} className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500" />
                          <span className="text-sm">{equipment}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Working Days</label>
                    <div className="flex flex-wrap gap-3">
                      {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                        <label key={day} className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500" />
                          <span className="text-sm">{day}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500" />
                      <span className="text-sm font-medium">24/7 Emergency Service Available</span>
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Service Images</label>
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                      <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <p className="text-gray-600 dark:text-gray-400 mb-2">Upload service images</p>
                      <button type="button" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
                        Choose Files
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <button 
                      type="button"
                      onClick={() => setShowAddService(false)}
                      className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                    >
                      Add Service
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Service Details Modal */}
        {selectedService && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold">{selectedService.name}</h3>
                  <button 
                    onClick={() => setSelectedService(null)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column - Service Information */}
                  <div className="space-y-6">
                    <div>
                      <img src={selectedService.images[0]} alt={selectedService.name} className="w-full h-64 object-cover rounded-lg" />
                      <div className="flex space-x-2 mt-4">
                        {selectedService.images.slice(1).map((image, index) => (
                          <img key={index} src={image} alt={`${selectedService.name} ${index + 2}`} className="w-20 h-20 object-cover rounded-lg" />
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Service Information</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Type:</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(selectedService.type)}`}>
                            {selectedService.type}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Status:</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedService.status)}`}>
                            {selectedService.status}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Location:</span>
                          <span className="font-medium">{selectedService.location}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Rating:</span>
                          <span className="font-medium">{selectedService.rating} ⭐</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Supervisor:</span>
                          <span className="font-medium">{selectedService.contact.supervisor}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Services Offered</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedService.services.map((service, index) => (
                          <span key={index} className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Equipment</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedService.team.equipment.map((equipment, index) => (
                          <span key={index} className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm">
                            {equipment}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Availability</h4>
                      <div className="space-y-2">
                        <p><span className="text-gray-600 dark:text-gray-400">Hours:</span> {selectedService.availability.startTime} - {selectedService.availability.endTime}</p>
                        <p><span className="text-gray-600 dark:text-gray-400">Days:</span> {selectedService.availability.days.join(', ')}</p>
                        {selectedService.availability.emergencyService && (
                          <span className="inline-block px-3 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-full text-sm font-medium">
                            24/7 Emergency Service
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Statistics and Performance */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-4">Revenue Overview</h4>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <p className="text-lg font-bold text-green-600">₱{selectedService.earnings.today.toLocaleString()}</p>
                          <p className="text-sm text-green-800 dark:text-green-400">Today</p>
                        </div>
                        <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <p className="text-lg font-bold text-blue-600">₱{selectedService.earnings.thisWeek.toLocaleString()}</p>
                          <p className="text-sm text-blue-800 dark:text-blue-400">This Week</p>
                        </div>
                        <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                          <p className="text-lg font-bold text-purple-600">₱{selectedService.earnings.thisMonth.toLocaleString()}</p>
                          <p className="text-sm text-purple-800 dark:text-purple-400">This Month</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-4">Booking Statistics</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <p className="text-lg font-bold">{selectedService.bookings.total}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Total Bookings</p>
                        </div>
                        <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <p className="text-lg font-bold text-green-600">{selectedService.bookings.completed}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
                        </div>
                        <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <p className="text-lg font-bold text-red-600">{selectedService.bookings.cancelled}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Cancelled</p>
                        </div>
                        <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <p className="text-lg font-bold text-orange-600">{selectedService.bookings.pending}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-4">Performance Metrics</h4>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <span className="font-medium">Completion Rate</span>
                          <span className="text-lg font-bold text-green-600">{selectedService.performance.completionRate}%</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <span className="font-medium">Average Rating</span>
                          <span className="text-lg font-bold text-yellow-600">{selectedService.performance.averageRating} ⭐</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <span className="font-medium">Response Time</span>
                          <span className="text-lg font-bold text-blue-600">{selectedService.performance.responseTime} min</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-4">Today's Activity</h4>
                      <div className="text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <p className="text-3xl font-bold text-blue-600">{selectedService.bookings.todayBookings}</p>
                        <p className="text-sm text-blue-800 dark:text-blue-400">Bookings Today</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-4">Pricing Structure</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <span className="font-medium">Hourly Rate</span>
                          <span className="text-lg font-bold text-green-600">₱{selectedService.pricing.hourly}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <span className="font-medium">Daily Rate</span>
                          <span className="text-lg font-bold text-blue-600">₱{selectedService.pricing.daily.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <span className="font-medium">Weekly Rate</span>
                          <span className="text-lg font-bold text-purple-600">₱{selectedService.pricing.weekly.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <span className="font-medium">Monthly Rate</span>
                          <span className="text-lg font-bold text-orange-600">₱{selectedService.pricing.monthly.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-4">Team Information</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <p className="text-2xl font-bold text-blue-600">{selectedService.team.totalStaff}</p>
                          <p className="text-sm text-blue-800 dark:text-blue-400">Total Staff</p>
                        </div>
                        <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <p className="text-2xl font-bold text-green-600">{selectedService.team.availableStaff}</p>
                          <p className="text-sm text-green-800 dark:text-green-400">Available</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-4">Documents Status</h4>
                      <div className="space-y-3">
                        {Object.entries(selectedService.documents).map(([doc, info]) => (
                          <div key={doc} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <span className="capitalize font-medium">{doc.replace(/([A-Z])/g, ' $1').trim()}</span>
                            <div className="flex items-center space-x-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${info.uploaded ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`}>
                                {info.uploaded ? 'Valid' : 'Missing'}
                              </span>
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                {new Date(info.expiry).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-4 pt-6 mt-6 border-t border-gray-200 dark:border-gray-700">
                  <button className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    Edit Service
                  </button>
                  <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                    Manage Staff
                  </button>
                  <button className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors">
                    View Bookings
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other tabs placeholders */}
        {activeTab !== 'overview' && activeTab !== 'services' && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} section coming soon...</p>
          </div>
        )}

        {activeTab === 'bookings' && renderBookings()}

        {/* Booking Details Modal */}
        {showBookingDetails && selectedBooking && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Service Booking Details</h3>
                  <button 
                    onClick={() => {
                      setShowBookingDetails(false);
                      setSelectedBooking(null);
                    }}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Booking Information */}
                  <div className="space-y-6">
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Booking Information</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Booking ID:</span>
                          <span className="font-medium text-gray-900 dark:text-white">{selectedBooking.id}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Status:</span>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            selectedBooking.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                            selectedBooking.status === 'in-progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                            selectedBooking.status === 'confirmed' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                            selectedBooking.status === 'pending' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' :
                            'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          }`}>
                            {selectedBooking.status === 'in-progress' ? 'In Progress' : 
                             selectedBooking.status.charAt(0).toUpperCase() + selectedBooking.status.slice(1)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Booking Time:</span>
                          <span className="font-medium text-gray-900 dark:text-white">{selectedBooking.bookingTime}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Scheduled Time:</span>
                          <span className="font-medium text-gray-900 dark:text-white">{selectedBooking.scheduledTime}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Amount:</span>
                          <span className="font-medium text-green-600">₱{selectedBooking.amount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Payment Method:</span>
                          <span className="font-medium text-gray-900 dark:text-white">{selectedBooking.paymentMethod}</span>
                        </div>
                      </div>
                    </div>

                    {/* Client Information */}
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Client Information</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Name:</span>
                          <span className="font-medium text-gray-900 dark:text-white">{selectedBooking.client.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Contact:</span>
                          <span className="font-medium text-gray-900 dark:text-white">{selectedBooking.client.contact}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Type:</span>
                          <span className="font-medium text-gray-900 dark:text-white">{selectedBooking.client.type}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 dark:text-gray-400">Rating:</span>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <svg key={i} className={`w-4 h-4 ${i < Math.floor(selectedBooking.client.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                            <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">{selectedBooking.client.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Service and Staff Information */}
                  <div className="space-y-6">
                    {/* Service Details */}
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Service Details</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Service Type:</span>
                          <span className="font-medium text-gray-900 dark:text-white">{selectedBooking.service.type}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Priority:</span>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            selectedBooking.service.priority === 'High' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                            selectedBooking.service.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                            'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          }`}>
                            {selectedBooking.service.priority}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Duration:</span>
                          <span className="font-medium text-gray-900 dark:text-white">{selectedBooking.service.estimatedDuration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Location:</span>
                          <span className="font-medium text-gray-900 dark:text-white">{selectedBooking.location}</span>
                        </div>
                        <div className="mt-3">
                          <span className="text-gray-600 dark:text-gray-400">Description:</span>
                          <p className="mt-1 text-gray-900 dark:text-white">{selectedBooking.service.description}</p>
                        </div>
                      </div>
                    </div>

                    {/* Staff Information */}
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Assigned Staff</h4>
                      {selectedBooking.staff ? (
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Name:</span>
                            <span className="font-medium text-gray-900 dark:text-white">{selectedBooking.staff.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Phone:</span>
                            <span className="font-medium text-gray-900 dark:text-white">{selectedBooking.staff.phone}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Specialization:</span>
                            <span className="font-medium text-blue-600 dark:text-blue-400">{selectedBooking.staff.specialization}</span>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-4">
                          <svg className="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <p className="text-gray-500 dark:text-gray-400">No staff assigned yet</p>
                          <button 
                            onClick={() => {
                              setShowBookingDetails(false);
                              setShowAssignStaff(true);
                            }}
                            className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors"
                          >
                            Assign Staff
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Location Map Placeholder */}
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Location</h4>
                      <div className="h-32 bg-gray-200 dark:bg-gray-600 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Map View</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700 mt-6">
                  <button 
                    onClick={() => {
                      setShowBookingDetails(false);
                      setSelectedBooking(null);
                    }}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Close
                  </button>
                  {!selectedBooking.staff && (
                    <button 
                      onClick={() => {
                        setShowBookingDetails(false);
                        setShowAssignStaff(true);
                      }}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                    >
                      Assign Staff
                    </button>
                  )}
                  <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors">
                    Contact Client
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Assign Staff Modal */}
        {showAssignStaff && selectedBooking && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Assign Staff to Service</h3>
                  <button 
                    onClick={() => {
                      setShowAssignStaff(false);
                      setSelectedBooking(null);
                    }}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Service Summary */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Service Details</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Service:</span>
                      <span className="ml-2 font-medium text-gray-900 dark:text-white">{selectedBooking.service.type}</span>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Client:</span>
                      <span className="ml-2 font-medium text-gray-900 dark:text-white">{selectedBooking.client.name}</span>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Time:</span>
                      <span className="ml-2 font-medium text-gray-900 dark:text-white">{selectedBooking.scheduledTime}</span>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Location:</span>
                      <span className="ml-2 font-medium text-gray-900 dark:text-white">{selectedBooking.location}</span>
                    </div>
                  </div>
                </div>

                {/* Available Staff */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Available Staff</h4>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {[
                      {
                        id: 1,
                        name: "Carlos Mendoza",
                        phone: "+63 918 987 6543",
                        specialization: "HVAC Technician",
                        rating: 4.8,
                        availability: "Available now",
                        distance: "2.1 km away",
                        completedJobs: 156,
                        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                      },
                      {
                        id: 2,
                        name: "Roberto Silva",
                        phone: "+63 919 555 4444",
                        specialization: "Plumbing Specialist",
                        rating: 4.9,
                        availability: "Available in 30 min",
                        distance: "1.8 km away",
                        completedJobs: 203,
                        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
                      },
                      {
                        id: 3,
                        name: "Ana Rodriguez",
                        phone: "+63 920 777 8888",
                        specialization: "Electrical Technician",
                        rating: 4.7,
                        availability: "Available now",
                        distance: "3.2 km away",
                        completedJobs: 134,
                        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
                      },
                      {
                        id: 4,
                        name: "Maria Garcia",
                        phone: "+63 920 333 2222",
                        specialization: "Cleaning Supervisor",
                        rating: 4.6,
                        availability: "Available in 1 hour",
                        distance: "2.8 km away",
                        completedJobs: 189,
                        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
                      },
                      {
                        id: 5,
                        name: "Juan Dela Cruz",
                        phone: "+63 919 222 1111",
                        specialization: "General Maintenance",
                        rating: 4.8,
                        availability: "Available now",
                        distance: "1.5 km away",
                        completedJobs: 167,
                        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
                      }
                    ].map((staff) => (
                      <div key={staff.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <img src={staff.avatar} alt={staff.name} className="w-12 h-12 rounded-full object-cover" />
                            <div>
                              <h5 className="font-medium text-gray-900 dark:text-white">{staff.name}</h5>
                              <p className="text-sm text-blue-600 dark:text-blue-400">{staff.specialization}</p>
                              <div className="flex items-center mt-1">
                                {[...Array(5)].map((_, i) => (
                                  <svg key={i} className={`w-3 h-3 ${i < Math.floor(staff.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                                <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">{staff.rating}</span>
                                <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">({staff.completedJobs} jobs)</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-green-600 dark:text-green-400">{staff.availability}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{staff.distance}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{staff.phone}</p>
                            <button className="mt-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors">
                              Assign
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <button 
                    onClick={() => {
                      setShowAssignStaff(false);
                      setSelectedBooking(null);
                    }}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors">
                    Auto Assign Best Match
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'staff' && renderStaff()}

        {/* Add Staff Modal */}
        {showAddStaff && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Add New Staff Member</h3>
                  <button 
                    onClick={() => setShowAddStaff(false)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <form className="space-y-6">
                  {/* Personal Information */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Personal Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                          placeholder="Enter full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                          placeholder="+63 9XX XXX XXXX"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                          placeholder="email@example.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Address
                        </label>
                        <textarea
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                          placeholder="Complete address"
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  {/* Professional Information */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Professional Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Specialization *
                        </label>
                        <select
                          required
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                        >
                          <option value="">Select specialization</option>
                          <option value="hvac">HVAC Technician</option>
                          <option value="plumbing">Plumbing Specialist</option>
                          <option value="electrical">Electrical Technician</option>
                          <option value="cleaning">Cleaning Supervisor</option>
                          <option value="maintenance">General Maintenance</option>
                          <option value="security">Security Personnel</option>
                          <option value="landscaping">Landscaping</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Experience Level
                        </label>
                        <select
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                        >
                          <option value="">Select experience level</option>
                          <option value="entry">Entry Level (0-2 years)</option>
                          <option value="intermediate">Intermediate (2-5 years)</option>
                          <option value="experienced">Experienced (5-10 years)</option>
                          <option value="expert">Expert (10+ years)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Hourly Rate (₱)
                        </label>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                          placeholder="0.00"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Start Date *
                        </label>
                        <input
                          type="date"
                          required
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Work Schedule */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Work Schedule</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Shift Type
                        </label>
                        <select
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                        >
                          <option value="day">Day Shift</option>
                          <option value="night">Night Shift</option>
                          <option value="rotating">Rotating Shift</option>
                          <option value="flexible">Flexible</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Start Time
                        </label>
                        <input
                          type="time"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          End Time
                        </label>
                        <input
                          type="time"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                        />
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Working Days
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                          <label key={day} className="flex items-center">
                            <input
                              type="checkbox"
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                              defaultChecked={!['Saturday', 'Sunday'].includes(day)}
                            />
                            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{day}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Certifications & Skills */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Certifications & Skills</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Certifications
                        </label>
                        <textarea
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                          placeholder="List relevant certifications (e.g., HVAC Certified, Safety Training, etc.)"
                        ></textarea>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Additional Skills
                        </label>
                        <textarea
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                          placeholder="List additional skills and competencies"
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  {/* Emergency Contact */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Emergency Contact</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Contact Name
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                          placeholder="Emergency contact name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Contact Phone
                        </label>
                        <input
                          type="tel"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                          placeholder="+63 9XX XXX XXXX"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Relationship
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                          placeholder="e.g., Spouse, Parent, Sibling"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Profile Photo Upload */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Profile Photo</h4>
                    <div className="flex items-center space-x-4">
                      <div className="w-20 h-20 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          id="profile-photo"
                        />
                        <label
                          htmlFor="profile-photo"
                          className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                          Upload Photo
                        </label>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          JPG, PNG up to 5MB
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <button 
                      type="button"
                      onClick={() => setShowAddStaff(false)}
                      className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                    >
                      Add Staff Member
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Staff Details Modal */}
        {showStaffDetails && selectedStaff && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Staff Details</h3>
                  <button 
                    onClick={() => {
                      setShowStaffDetails(false);
                      setSelectedStaff(null);
                    }}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left Column - Profile & Basic Info */}
                  <div className="space-y-6">
                    {/* Profile Card */}
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 text-center">
                      <div className="relative inline-block mb-4">
                        <img 
                          src={selectedStaff.avatar} 
                          alt={selectedStaff.name} 
                          className="w-24 h-24 rounded-full object-cover mx-auto"
                        />
                        <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white dark:border-gray-700 ${
                          selectedStaff.status === 'available' ? 'bg-green-500' :
                          selectedStaff.status === 'busy' ? 'bg-yellow-500' : 'bg-gray-500'
                        }`}></div>
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{selectedStaff.name}</h4>
                      <p className="text-blue-600 dark:text-blue-400 mb-2">{selectedStaff.specialization}</p>
                      <div className="flex items-center justify-center mb-3">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className={`w-4 h-4 ${i < Math.floor(selectedStaff.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">{selectedStaff.rating} ({selectedStaff.completedJobs} jobs)</span>
                      </div>
                      <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                        selectedStaff.status === 'available' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                        selectedStaff.status === 'busy' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                        'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                      }`}>
                        {selectedStaff.status === 'available' ? 'Available' :
                         selectedStaff.status === 'busy' ? 'On Job' : 'Off Duty'}
                      </span>
                    </div>

                    {/* Contact Information */}
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-3">Contact Information</h5>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <span className="text-sm text-gray-900 dark:text-white">{selectedStaff.phone}</span>
                        </div>
                        <div className="flex items-center">
                          <svg className="w-4 h-4 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <span className="text-sm text-gray-900 dark:text-white">{selectedStaff.email}</span>
                        </div>
                        <div className="flex items-center">
                          <svg className="w-4 h-4 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="text-sm text-gray-900 dark:text-white">{selectedStaff.currentLocation}</span>
                        </div>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="space-y-3">
                      <button 
                        onClick={() => {
                          setShowContactStaff(true);
                          setShowStaffDetails(false);
                        }}
                        className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span>Contact Staff</span>
                      </button>
                      <button 
                        onClick={() => {
                          setShowAssignToJob(true);
                          setShowStaffDetails(false);
                        }}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        Assign to Job
                      </button>
                      <button 
                        onClick={() => {
                          setShowViewSchedule(true);
                          setShowStaffDetails(false);
                        }}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        View Schedule
                      </button>
                    </div>
                  </div>

                  {/* Middle Column - Professional Details */}
                  <div className="space-y-6">
                    {/* Employment Information */}
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-3">Employment Details</h5>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Staff ID:</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">{selectedStaff.id}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Join Date:</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">{selectedStaff.joinDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Shift:</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">{selectedStaff.schedule.shift}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Hours:</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">{selectedStaff.schedule.hours}</span>
                        </div>
                      </div>
                    </div>

                    {/* Performance Metrics */}
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-3">Performance Metrics</h5>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Job Completion Rate</span>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">96%</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                            <div className="bg-green-600 h-2 rounded-full" style={{width: '96%'}}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Customer Satisfaction</span>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">4.8/5.0</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                            <div className="bg-blue-600 h-2 rounded-full" style={{width: '96%'}}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Response Time</span>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">12 min avg</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                            <div className="bg-yellow-600 h-2 rounded-full" style={{width: '85%'}}></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Certifications */}
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-3">Certifications</h5>
                      <div className="flex flex-wrap gap-2">
                        {selectedStaff.certifications.map((cert: string, index: number) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-sm">
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-3">Recent Activity</h5>
                      <div className="space-y-3">
                        {[
                          { time: '2 hours ago', activity: 'Completed HVAC maintenance at Hotel Paradise', status: 'completed' },
                          { time: '5 hours ago', activity: 'Started electrical repair at Resort Bay', status: 'in-progress' },
                          { time: 'Yesterday', activity: 'Completed plumbing inspection at Villa Marina', status: 'completed' },
                          { time: '2 days ago', activity: 'Emergency call - AC unit repair', status: 'completed' }
                        ].map((activity, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <div className={`w-2 h-2 rounded-full mt-2 ${
                              activity.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
                            }`}></div>
                            <div className="flex-1">
                              <p className="text-sm text-gray-900 dark:text-white">{activity.activity}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Earnings & Statistics */}
                  <div className="space-y-6">
                    {/* Earnings Overview */}
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-3">Earnings Overview</h5>
                      <div className="space-y-3">
                        <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                          <p className="text-sm text-gray-600 dark:text-gray-400">Today</p>
                          <p className="text-lg font-bold text-green-600">₱{selectedStaff.earnings.today.toLocaleString()}</p>
                        </div>
                        <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                          <p className="text-sm text-gray-600 dark:text-gray-400">This Week</p>
                          <p className="text-lg font-bold text-green-600">₱{selectedStaff.earnings.thisWeek.toLocaleString()}</p>
                        </div>
                        <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                          <p className="text-sm text-gray-600 dark:text-gray-400">This Month</p>
                          <p className="text-lg font-bold text-green-600">₱{selectedStaff.earnings.thisMonth.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>

                    {/* Job Statistics */}
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-3">Job Statistics</h5>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Total Jobs:</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">{selectedStaff.completedJobs}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">This Month:</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">28</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">This Week:</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">8</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Today:</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">3</span>
                        </div>
                      </div>
                    </div>

                    {/* Service Types */}
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-3">Service Breakdown</h5>
                      <div className="space-y-2">
                        {[
                          { type: 'HVAC Maintenance', count: 45, percentage: 40 },
                          { type: 'Emergency Repairs', count: 32, percentage: 28 },
                          { type: 'Preventive Service', count: 28, percentage: 25 },
                          { type: 'Installations', count: 8, percentage: 7 }
                        ].map((service, index) => (
                          <div key={index}>
                            <div className="flex justify-between mb-1">
                              <span className="text-xs text-gray-600 dark:text-gray-400">{service.type}</span>
                              <span className="text-xs font-medium text-gray-900 dark:text-white">{service.count}</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1.5">
                              <div className="bg-blue-600 h-1.5 rounded-full" style={{width: `${service.percentage}%`}}></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Availability Calendar */}
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-3">This Week's Schedule</h5>
                      <div className="space-y-2">
                        {[
                          { day: 'Mon', status: 'scheduled', hours: '8:00 AM - 5:00 PM' },
                          { day: 'Tue', status: 'scheduled', hours: '8:00 AM - 5:00 PM' },
                          { day: 'Wed', status: 'busy', hours: '8:00 AM - 5:00 PM' },
                          { day: 'Thu', status: 'scheduled', hours: '8:00 AM - 5:00 PM' },
                          { day: 'Fri', status: 'scheduled', hours: '8:00 AM - 5:00 PM' },
                          { day: 'Sat', status: 'off', hours: 'Day Off' },
                          { day: 'Sun', status: 'off', hours: 'Day Off' }
                        ].map((schedule, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-900 dark:text-white">{schedule.day}</span>
                            <div className="flex items-center space-x-2">
                              <span className={`w-2 h-2 rounded-full ${
                                schedule.status === 'scheduled' ? 'bg-green-500' :
                                schedule.status === 'busy' ? 'bg-yellow-500' : 'bg-gray-400'
                              }`}></span>
                              <span className="text-xs text-gray-600 dark:text-gray-400">{schedule.hours}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700 mt-6">
                  <button 
                    onClick={() => {
                      setShowStaffDetails(false);
                      setSelectedStaff(null);
                    }}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Close
                  </button>
                  <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors">
                    Edit Staff Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Assign to Job Modal */}
        {showAssignToJob && selectedStaff && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Assign Job to {selectedStaff.name}</h3>
                  <button 
                    onClick={() => {
                      setShowAssignToJob(false);
                      setSelectedStaff(null);
                    }}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Staff Summary */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
                  <div className="flex items-center space-x-4">
                    <img src={selectedStaff.avatar} alt={selectedStaff.name} className="w-12 h-12 rounded-full object-cover" />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">{selectedStaff.name}</h4>
                      <p className="text-sm text-blue-600 dark:text-blue-400">{selectedStaff.specialization}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Rating: {selectedStaff.rating} ⭐ • {selectedStaff.completedJobs} jobs completed</p>
                    </div>
                  </div>
                </div>

                {/* Available Jobs */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Available Jobs</h4>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {[
                      {
                        id: 'FM-2024-001',
                        client: 'Paradise Resort',
                        service: 'HVAC System Maintenance',
                        priority: 'High',
                        location: 'Station 1, Boracay',
                        scheduledTime: 'Today, 2:00 PM',
                        duration: '3 hours',
                        amount: 2500,
                        description: 'Annual HVAC system inspection and maintenance for main lobby and guest rooms',
                        urgency: 'high'
                      },
                      {
                        id: 'FM-2024-002',
                        client: 'Ocean View Hotel',
                        service: 'Emergency AC Repair',
                        priority: 'Urgent',
                        location: 'Station 2, Boracay',
                        scheduledTime: 'Today, 4:00 PM',
                        duration: '2 hours',
                        amount: 1800,
                        description: 'AC unit not cooling properly in presidential suite',
                        urgency: 'urgent'
                      },
                      {
                        id: 'FM-2024-003',
                        client: 'Beachfront Villa',
                        service: 'Preventive Maintenance',
                        priority: 'Medium',
                        location: 'Station 3, Boracay',
                        scheduledTime: 'Tomorrow, 9:00 AM',
                        duration: '4 hours',
                        amount: 3200,
                        description: 'Quarterly maintenance check for all HVAC systems',
                        urgency: 'medium'
                      },
                      {
                        id: 'FM-2024-004',
                        client: 'Sunset Restaurant',
                        service: 'Kitchen Ventilation Service',
                        priority: 'Low',
                        location: 'Station 1, Boracay',
                        scheduledTime: 'Tomorrow, 2:00 PM',
                        duration: '2 hours',
                        amount: 1500,
                        description: 'Clean and service kitchen exhaust system',
                        urgency: 'low'
                      }
                    ].map((job) => (
                      <div key={job.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h5 className="font-semibold text-gray-900 dark:text-white">{job.service}</h5>
                              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                job.urgency === 'urgent' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                                job.urgency === 'high' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' :
                                job.urgency === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                                'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              }`}>
                                {job.priority}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{job.client} • {job.location}</p>
                            <p className="text-sm text-gray-900 dark:text-white mb-2">{job.description}</p>
                          </div>
                          <div className="text-right ml-4">
                            <p className="text-lg font-bold text-green-600">₱{job.amount.toLocaleString()}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{job.duration}</p>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {job.scheduledTime}
                            </div>
                            <div className="flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              </svg>
                              {job.location}
                            </div>
                            <span className="text-gray-500">ID: {job.id}</span>
                          </div>
                          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg font-medium transition-colors">
                            Assign Job
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Manual Job Assignment */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Create Custom Assignment</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Service Type</label>
                      <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white">
                        <option>HVAC Maintenance</option>
                        <option>Emergency Repair</option>
                        <option>Preventive Service</option>
                        <option>Installation</option>
                        <option>Inspection</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Priority</label>
                      <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white">
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                        <option>Urgent</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Scheduled Date</label>
                      <input type="date" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Scheduled Time</label>
                      <input type="time" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Location</label>
                      <input type="text" placeholder="Enter job location" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Job Description</label>
                      <textarea rows={3} placeholder="Describe the job requirements..." className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"></textarea>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700 mt-6">
                  <button 
                    onClick={() => {
                      setShowAssignToJob(false);
                      setSelectedStaff(null);
                    }}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                    Create Custom Assignment
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* View Schedule Modal */}
        {showViewSchedule && selectedStaff && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{selectedStaff.name}'s Schedule</h3>
                  <button 
                    onClick={() => {
                      setShowViewSchedule(false);
                      setSelectedStaff(null);
                    }}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Staff Info Header */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <img src={selectedStaff.avatar} alt={selectedStaff.name} className="w-12 h-12 rounded-full object-cover" />
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">{selectedStaff.name}</h4>
                        <p className="text-sm text-blue-600 dark:text-blue-400">{selectedStaff.specialization}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Current Status</p>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        selectedStaff.status === 'available' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                        selectedStaff.status === 'busy' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                        'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                      }`}>
                        {selectedStaff.status === 'available' ? 'Available' :
                         selectedStaff.status === 'busy' ? 'On Job' : 'Off Duty'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Calendar Navigation */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                      <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">December 2024</h4>
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                      <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg">Week</button>
                    <button className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">Month</button>
                  </div>
                </div>

                {/* Weekly Schedule */}
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div className="grid grid-cols-8 border-b border-gray-200 dark:border-gray-700">
                    <div className="p-3 bg-gray-50 dark:bg-gray-700 text-sm font-medium text-gray-900 dark:text-white">Time</div>
                    {['Mon 16', 'Tue 17', 'Wed 18', 'Thu 19', 'Fri 20', 'Sat 21', 'Sun 22'].map((day) => (
                      <div key={day} className="p-3 bg-gray-50 dark:bg-gray-700 text-sm font-medium text-gray-900 dark:text-white text-center border-l border-gray-200 dark:border-gray-700">
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Time Slots */}
                  {[
                    '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', 
                    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
                  ].map((time, timeIndex) => (
                    <div key={time} className="grid grid-cols-8 border-b border-gray-100 dark:border-gray-700">
                      <div className="p-3 text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700">
                        {time}
                      </div>
                      {[0, 1, 2, 3, 4, 5, 6].map((dayIndex) => (
                        <div key={dayIndex} className="p-1 border-l border-gray-100 dark:border-gray-700 min-h-[60px] relative">
                          {/* Sample scheduled jobs */}
                          {(timeIndex === 1 && dayIndex === 0) && (
                            <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 p-2 rounded text-xs">
                              <div className="font-medium">HVAC Maintenance</div>
                              <div>Paradise Resort</div>
                            </div>
                          )}
                          {(timeIndex === 3 && dayIndex === 1) && (
                            <div className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 p-2 rounded text-xs">
                              <div className="font-medium">Emergency Repair</div>
                              <div>Ocean View Hotel</div>
                            </div>
                          )}
                          {(timeIndex === 2 && dayIndex === 3) && (
                            <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 p-2 rounded text-xs">
                              <div className="font-medium">Preventive Service</div>
                              <div>Beachfront Villa</div>
                            </div>
                          )}
                          {(timeIndex === 5 && dayIndex === 4) && (
                            <div className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 p-2 rounded text-xs">
                              <div className="font-medium">Kitchen Ventilation</div>
                              <div>Sunset Restaurant</div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>

                {/* Schedule Legend */}
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded"></div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Scheduled</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded"></div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Urgent</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded"></div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Completed</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">In Progress</span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Total Hours This Week: 32 hours
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700 mt-6">
                  <button 
                    onClick={() => {
                      setShowViewSchedule(false);
                      setSelectedStaff(null);
                    }}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Close
                  </button>
                  <button 
                    onClick={() => {
                      setShowAssignToJob(true);
                      setShowViewSchedule(false);
                    }}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Assign New Job
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && renderAnalytics()}
        {activeTab === 'earnings' && renderEarnings()}
      </div>
    </div>
  );
} 