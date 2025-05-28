'use client';

import { useState } from 'react';
import Link from 'next/link';

interface CleaningService {
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

export default function CleaningServicesManagement() {
  const [activeTab, setActiveTab] = useState<'overview' | 'services' | 'bookings' | 'staff' | 'earnings' | 'analytics'>('overview');
  const [showAddService, setShowAddService] = useState(false);
  const [selectedService, setSelectedService] = useState<CleaningService | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive' | 'busy' | 'pending'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'residential' | 'commercial' | 'hotel' | 'office' | 'deep-cleaning' | 'maintenance'>('all');

  // Mock data
  const ownerInfo = {
    name: "Boracay Cleaning Solutions",
    email: "owner@boracaycleaning.com",
    phone: "+63 917 123 4567",
    address: "123 Service Street, Boracay, Aklan",
    license: "BCS-2024-001",
    rating: 4.8,
    totalServices: 8,
    totalBookings: 2150
  };

  const cleaningServices: CleaningService[] = [
    {
      id: 'CS001',
      name: 'Premium Hotel Cleaning',
      type: 'hotel',
      status: 'active',
      location: 'Station 1-3, Boracay',
      address: 'Multiple Hotel Locations, White Beach, Boracay',
      rating: 4.9,
      services: ['Room Cleaning', 'Bathroom Sanitization', 'Linen Service', 'Deep Cleaning', 'Window Cleaning'],
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
        email: 'hotel@boracaycleaning.com',
        supervisor: 'Maria Santos'
      },
      team: {
        totalStaff: 15,
        availableStaff: 12,
        equipment: ['Vacuum Cleaners', 'Steam Cleaners', 'Pressure Washers', 'Eco-friendly Chemicals', 'Microfiber Cloths']
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
      id: 'CS002',
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
        email: 'residential@boracaycleaning.com',
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
      id: 'CS003',
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
        email: 'commercial@boracaycleaning.com',
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
  const totalEarnings = cleaningServices.reduce((sum, service) => sum + service.earnings.thisMonth, 0);
  const totalBookings = cleaningServices.reduce((sum, service) => sum + service.bookings.total, 0);
  const averageRating = cleaningServices.reduce((sum, service) => sum + service.rating, 0) / cleaningServices.length;
  const todayBookings = cleaningServices.reduce((sum, service) => sum + service.bookings.todayBookings, 0);
  const totalStaff = cleaningServices.reduce((sum, service) => sum + service.team.totalStaff, 0);
  const availableStaff = cleaningServices.reduce((sum, service) => sum + service.team.availableStaff, 0);

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
  const filteredServices = cleaningServices.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.contact.supervisor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.services.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || service.status === statusFilter;
    const matchesType = typeFilter === 'all' || service.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Cleaning Services Management</h1>
              <p className="text-gray-600 dark:text-gray-400">Manage your cleaning service operations</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600 dark:text-gray-400">{ownerInfo.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-500">{ownerInfo.rating} ⭐ • {cleaningServices.length} Services</p>
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
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">{cleaningServices.length}</p>
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
                  <p className="text-2xl font-bold text-green-600">₱{cleaningServices.reduce((sum, s) => sum + s.earnings.today, 0).toLocaleString()}</p>
                  <p className="text-sm text-green-800 dark:text-green-400">Today's Revenue</p>
                </div>
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">{cleaningServices.filter(s => s.status === 'active').length}</p>
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
                {cleaningServices.slice(0, 3).map((service) => (
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
                    : 'Add your first cleaning service to get started'
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
                  <h3 className="text-xl font-semibold">Add New Cleaning Service</h3>
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
                        placeholder="e.g., Premium Hotel Cleaning"
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
                        placeholder="e.g., service@cleaning.com"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Services Offered</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {['Room Cleaning', 'Bathroom Sanitization', 'Linen Service', 'Deep Cleaning', 'Window Cleaning', 'Floor Mopping', 'Carpet Cleaning', 'Kitchen Cleaning', 'Disinfection', 'Waste Management', 'Laundry Service', 'Equipment Maintenance'].map((service) => (
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
                      {['Vacuum Cleaners', 'Steam Cleaners', 'Pressure Washers', 'Eco-friendly Chemicals', 'Microfiber Cloths', 'Floor Polishers', 'Carpet Extractors', 'Disinfection Sprayers', 'Safety Equipment', 'Cleaning Carts', 'Window Squeegees', 'Industrial Mops'].map((equipment) => (
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
      </div>
    </div>
  );
} 