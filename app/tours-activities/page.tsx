'use client';

import { useState } from 'react';
import Link from 'next/link';

interface TourActivity {
  id: string;
  name: string;
  type: 'island-hopping' | 'water-sports' | 'cultural' | 'adventure' | 'food-tour' | 'nightlife' | 'wellness';
  status: 'active' | 'inactive' | 'seasonal' | 'maintenance';
  location: string;
  duration: string; // e.g., "4 hours", "Full day"
  difficulty: 'easy' | 'moderate' | 'challenging' | 'extreme';
  rating: number;
  images: string[];
  pricing: {
    adult: number;
    child: number;
    senior: number;
    group: number; // per person for groups of 10+
  };
  schedule: {
    days: string[];
    startTimes: string[];
    maxParticipants: number;
    minParticipants: number;
  };
  inclusions: string[];
  requirements: string[];
  contact: {
    phone: string;
    email: string;
    guide: string;
  };
  equipment: {
    provided: string[];
    required: string[];
  };
  documents: {
    tourismPermit: { uploaded: boolean; expiry: string };
    insurance: { uploaded: boolean; expiry: string };
    safetyCompliance: { uploaded: boolean; expiry: string };
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
    repeatCustomers: number;
  };
  capacity: {
    dailySlots: number;
    bookedToday: number;
    availableToday: number;
  };
}

export default function ToursActivitiesManagement() {
  const [activeTab, setActiveTab] = useState<'overview' | 'tours' | 'bookings' | 'guides' | 'earnings' | 'analytics'>('overview');
  const [showAddTour, setShowAddTour] = useState(false);
  const [selectedTour, setSelectedTour] = useState<TourActivity | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive' | 'seasonal' | 'maintenance'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'island-hopping' | 'water-sports' | 'cultural' | 'adventure' | 'food-tour' | 'nightlife' | 'wellness'>('all');

  // Mock data
  const ownerInfo = {
    name: "Boracay Adventure Tours",
    email: "owner@boracayadventure.com",
    phone: "+63 917 123 4567",
    address: "456 Beach Road, Boracay, Aklan",
    license: "BAT-2024-001",
    rating: 4.7,
    totalTours: 12,
    totalBookings: 3250
  };

  const toursActivities: TourActivity[] = [
    {
      id: 'TA001',
      name: 'Ultimate Island Hopping Adventure',
      type: 'island-hopping',
      status: 'active',
      location: 'Boracay & Nearby Islands',
      duration: 'Full day (8 hours)',
      difficulty: 'easy',
      rating: 4.8,
      images: [
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop'
      ],
      pricing: {
        adult: 2500,
        child: 1800,
        senior: 2200,
        group: 2200
      },
      schedule: {
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        startTimes: ['08:00', '13:00'],
        maxParticipants: 25,
        minParticipants: 4
      },
      inclusions: ['Boat Transfer', 'Snorkeling Gear', 'Lunch', 'Tour Guide', 'Life Jackets', 'Fresh Fruits'],
      requirements: ['Swimming Ability', 'Valid ID', 'Sun Protection'],
      contact: {
        phone: '+63 917 111 2222',
        email: 'islands@boracayadventure.com',
        guide: 'Captain Jose'
      },
      equipment: {
        provided: ['Snorkeling Gear', 'Life Jackets', 'Underwater Camera', 'Towels'],
        required: ['Swimwear', 'Sunscreen', 'Hat', 'Water Bottle']
      },
      documents: {
        tourismPermit: { uploaded: true, expiry: '2025-12-31' },
        insurance: { uploaded: true, expiry: '2025-06-30' },
        safetyCompliance: { uploaded: true, expiry: '2025-03-31' }
      },
      earnings: {
        today: 15000,
        thisWeek: 85000,
        thisMonth: 320000
      },
      bookings: {
        total: 450,
        completed: 425,
        cancelled: 15,
        pending: 10,
        todayBookings: 6
      },
      performance: {
        completionRate: 94.4,
        averageRating: 4.8,
        repeatCustomers: 35
      },
      capacity: {
        dailySlots: 50,
        bookedToday: 30,
        availableToday: 20
      }
    },
    {
      id: 'TA002',
      name: 'Sunset Parasailing Experience',
      type: 'water-sports',
      status: 'active',
      location: 'White Beach, Station 1',
      duration: '2 hours',
      difficulty: 'moderate',
      rating: 4.9,
      images: [
        'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&h=300&fit=crop'
      ],
      pricing: {
        adult: 3500,
        child: 2800,
        senior: 3200,
        group: 3200
      },
      schedule: {
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        startTimes: ['16:00', '17:00'],
        maxParticipants: 8,
        minParticipants: 2
      },
      inclusions: ['Parasailing Equipment', 'Safety Briefing', 'Professional Guide', 'Photos & Videos', 'Insurance'],
      requirements: ['Age 12+', 'Weight Limit 120kg', 'No Heart Conditions', 'Valid ID'],
      contact: {
        phone: '+63 917 222 3333',
        email: 'parasail@boracayadventure.com',
        guide: 'Miguel Santos'
      },
      equipment: {
        provided: ['Parasail', 'Harness', 'Life Jacket', 'Helmet'],
        required: ['Comfortable Clothing', 'Secure Footwear']
      },
      documents: {
        tourismPermit: { uploaded: true, expiry: '2025-12-31' },
        insurance: { uploaded: true, expiry: '2025-06-30' },
        safetyCompliance: { uploaded: true, expiry: '2025-03-31' }
      },
      earnings: {
        today: 21000,
        thisWeek: 98000,
        thisMonth: 385000
      },
      bookings: {
        total: 320,
        completed: 310,
        cancelled: 8,
        pending: 2,
        todayBookings: 6
      },
      performance: {
        completionRate: 96.9,
        averageRating: 4.9,
        repeatCustomers: 28
      },
      capacity: {
        dailySlots: 16,
        bookedToday: 12,
        availableToday: 4
      }
    },
    {
      id: 'TA003',
      name: 'Boracay Cultural Heritage Walk',
      type: 'cultural',
      status: 'active',
      location: 'Balabag & Manoc-Manoc',
      duration: '3 hours',
      difficulty: 'easy',
      rating: 4.6,
      images: [
        'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop'
      ],
      pricing: {
        adult: 1500,
        child: 1000,
        senior: 1300,
        group: 1300
      },
      schedule: {
        days: ['Tuesday', 'Thursday', 'Saturday'],
        startTimes: ['09:00', '14:00'],
        maxParticipants: 15,
        minParticipants: 3
      },
      inclusions: ['Local Guide', 'Cultural Presentations', 'Traditional Snacks', 'Souvenir', 'Transportation'],
      requirements: ['Comfortable Walking Shoes', 'Respectful Attire', 'Valid ID'],
      contact: {
        phone: '+63 917 333 4444',
        email: 'culture@boracayadventure.com',
        guide: 'Maria Dela Cruz'
      },
      equipment: {
        provided: ['Audio Guide', 'Information Booklet', 'Umbrella'],
        required: ['Comfortable Shoes', 'Hat', 'Camera']
      },
      documents: {
        tourismPermit: { uploaded: true, expiry: '2025-12-31' },
        insurance: { uploaded: true, expiry: '2025-06-30' },
        safetyCompliance: { uploaded: true, expiry: '2025-03-31' }
      },
      earnings: {
        today: 9000,
        thisWeek: 42000,
        thisMonth: 165000
      },
      bookings: {
        total: 180,
        completed: 175,
        cancelled: 3,
        pending: 2,
        todayBookings: 6
      },
      performance: {
        completionRate: 97.2,
        averageRating: 4.6,
        repeatCustomers: 15
      },
      capacity: {
        dailySlots: 30,
        bookedToday: 18,
        availableToday: 12
      }
    }
  ];

  // Calculate totals
  const totalEarnings = toursActivities.reduce((sum, tour) => sum + tour.earnings.thisMonth, 0);
  const totalBookings = toursActivities.reduce((sum, tour) => sum + tour.bookings.total, 0);
  const todayBookings = toursActivities.reduce((sum, tour) => sum + tour.bookings.todayBookings, 0);
  const averageRating = toursActivities.reduce((sum, tour) => sum + tour.rating, 0) / toursActivities.length;
  const totalCapacity = toursActivities.reduce((sum, tour) => sum + tour.capacity.dailySlots, 0);
  const bookedCapacity = toursActivities.reduce((sum, tour) => sum + tour.capacity.bookedToday, 0);

  // Helper functions for styling
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'inactive': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      case 'seasonal': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'maintenance': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'island-hopping': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'water-sports': return 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200';
      case 'cultural': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'adventure': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'food-tour': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'nightlife': return 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200';
      case 'wellness': return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'moderate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'challenging': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'extreme': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  // Filter tours
  const filteredTours = toursActivities.filter(tour => {
    const matchesSearch = tour.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tour.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tour.contact.guide.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tour.inclusions.some(i => i.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || tour.status === statusFilter;
    const matchesType = typeFilter === 'all' || tour.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Tours & Activities Management</h1>
              <p className="text-gray-600 dark:text-gray-400">Manage your tours, activities, and bookings</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600 dark:text-gray-400">{ownerInfo.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-500">License: {ownerInfo.license}</p>
              </div>
              <Link href="/dashboard" className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors">
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', name: 'Overview', icon: '📊' },
              { id: 'tours', name: 'Tours & Activities', icon: '🏝️' },
              { id: 'bookings', name: 'Bookings', icon: '📅' },
              { id: 'guides', name: 'Guides', icon: '👨‍🏫' },
              { id: 'earnings', name: 'Earnings', icon: '💰' },
              { id: 'analytics', name: 'Analytics', icon: '📈' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-orange-500 text-orange-600 dark:text-orange-400'
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
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                    <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m0 0h2M7 7h10M7 11h10M7 15h10" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Tours</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">{toursActivities.filter(t => t.status === 'active').length}</p>
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
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                    <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Capacity Utilization</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">{Math.round((bookedCapacity / totalCapacity) * 100)}%</p>
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
                  <p className="text-2xl font-bold text-green-600">₱{toursActivities.reduce((sum, t) => sum + t.earnings.today, 0).toLocaleString()}</p>
                  <p className="text-sm text-green-800 dark:text-green-400">Today's Revenue</p>
                </div>
                <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <p className="text-2xl font-bold text-orange-600">{bookedCapacity}/{totalCapacity}</p>
                  <p className="text-sm text-orange-800 dark:text-orange-400">Capacity Booked</p>
                </div>
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">{averageRating.toFixed(1)} ⭐</p>
                  <p className="text-sm text-purple-800 dark:text-purple-400">Average Rating</p>
                </div>
              </div>
            </div>

            {/* Tour Performance */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Tour Performance</h3>
              <div className="space-y-4">
                {toursActivities.slice(0, 3).map((tour) => (
                  <div key={tour.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <img src={tour.images[0]} alt={tour.name} className="w-16 h-16 object-cover rounded-lg" />
                      <div>
                        <h4 className="font-medium">{tour.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{tour.location} • {tour.duration}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${tour.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'}`}>
                            {tour.status}
                          </span>
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                            {tour.type}
                          </span>
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                            {tour.difficulty}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₱{tour.earnings.thisMonth.toLocaleString()}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{tour.bookings.total} bookings</p>
                      <p className="text-sm text-yellow-600">{tour.rating} ⭐ • {tour.performance.completionRate}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tours Tab */}
        {activeTab === 'tours' && (
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
                      placeholder="Search tours by name, location, guide, or inclusions..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="seasonal">Seasonal</option>
                    <option value="maintenance">Maintenance</option>
                  </select>

                  {/* Type Filter */}
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value as any)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="all">All Types</option>
                    <option value="island-hopping">Island Hopping</option>
                    <option value="water-sports">Water Sports</option>
                    <option value="cultural">Cultural</option>
                    <option value="adventure">Adventure</option>
                    <option value="food-tour">Food Tour</option>
                    <option value="nightlife">Nightlife</option>
                    <option value="wellness">Wellness</option>
                  </select>

                  {/* Add Tour Button */}
                  <button 
                    onClick={() => setShowAddTour(true)}
                    className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors flex items-center space-x-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Add Tour</span>
                  </button>
                </div>
              </div>

              {/* Search Results Info */}
              {searchQuery && (
                <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                  Found {filteredTours.length} tour{filteredTours.length !== 1 ? 's' : ''} matching "{searchQuery}"
                </div>
              )}
            </div>

            {/* Tours Grid */}
            {filteredTours.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredTours.map((tour) => (
                  <div key={tour.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <img src={tour.images[0]} alt={tour.name} className="w-full h-48 object-cover" />
                      <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(tour.status)}`}>
                          {tour.status}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(tour.type)}`}>
                          {tour.type.replace('-', ' ')}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-lg px-2 py-1">
                        <div className="flex items-center space-x-1">
                          <span className="text-yellow-500">⭐</span>
                          <span className="text-sm font-medium">{tour.rating}</span>
                        </div>
                      </div>
                      <div className="absolute bottom-4 right-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(tour.difficulty)}`}>
                          {tour.difficulty}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold mb-1">{tour.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{tour.location} • {tour.duration}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {tour.inclusions.slice(0, 3).map((inclusion, index) => (
                            <span key={index} className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded text-xs">
                              {inclusion}
                            </span>
                          ))}
                          {tour.inclusions.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs">
                              +{tour.inclusions.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">Capacity</p>
                          <p className="font-medium">{tour.schedule.maxParticipants} max</p>
                        </div>
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">Completion Rate</p>
                          <p className="font-medium text-green-600">{tour.performance.completionRate}%</p>
                        </div>
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">Guide</p>
                          <p className="font-medium">{tour.contact.guide}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">Start Times</p>
                          <p className="font-medium">{tour.schedule.startTimes.join(', ')}</p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Pricing (Starting from)</p>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="text-center p-2 bg-orange-50 dark:bg-orange-900/20 rounded">
                            <p className="font-medium text-orange-600">₱{tour.pricing.adult.toLocaleString()}</p>
                            <p className="text-xs text-orange-800 dark:text-orange-400">Adult</p>
                          </div>
                          <div className="text-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                            <p className="font-medium text-blue-600">₱{tour.pricing.child.toLocaleString()}</p>
                            <p className="text-xs text-blue-800 dark:text-blue-400">Child</p>
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Today's Status</p>
                        <div className="flex justify-between text-sm">
                          <span>Bookings: <span className="font-medium text-blue-600">{tour.bookings.todayBookings}</span></span>
                          <span>Available: <span className="font-medium text-green-600">{tour.capacity.availableToday}</span></span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Schedule</p>
                        <div className="text-sm">
                          <p className="font-medium">
                            {tour.schedule.days.length === 7 ? 'Daily' : `${tour.schedule.days.length} days/week`}
                          </p>
                          <p className="text-gray-600 dark:text-gray-400">
                            Min {tour.schedule.minParticipants} - Max {tour.schedule.maxParticipants} participants
                          </p>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <button 
                          onClick={() => setSelectedTour(tour)}
                          className="flex-1 px-3 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm font-medium transition-colors"
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
                  {searchQuery ? 'No tours found' : 'No tours available'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {searchQuery 
                    ? 'Try adjusting your search criteria or filters' 
                    : 'Add your first tour or activity to get started'
                  }
                </p>
                {!searchQuery && (
                  <button 
                    onClick={() => setShowAddTour(true)}
                    className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Add Your First Tour
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* Guides Tab */}
        {activeTab === 'guides' && (
          <div className="space-y-6">
            {/* Guides Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Guides</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">8</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                    <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Available Today</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">6</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                    <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">On Duty</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">4</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                    <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Rating</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">4.6 ⭐</p>
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
                      placeholder="Search guides by name, specialization, or language..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                    <option value="all">All Status</option>
                    <option value="available">Available</option>
                    <option value="on-duty">On Duty</option>
                    <option value="off-duty">Off Duty</option>
                    <option value="vacation">On Vacation</option>
                  </select>

                  <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                    <option value="all">All Specializations</option>
                    <option value="island-hopping">Island Hopping</option>
                    <option value="water-sports">Water Sports</option>
                    <option value="cultural">Cultural Tours</option>
                    <option value="adventure">Adventure</option>
                    <option value="food-tour">Food Tours</option>
                  </select>

                  <button className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors flex items-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Add Guide</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Guides Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {/* Guide Card 1 */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop" alt="Captain Jose" className="w-full h-48 object-cover" />
                  <div className="absolute top-4 left-4">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      Available
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-lg px-2 py-1">
                    <div className="flex items-center space-x-1">
                      <span className="text-yellow-500">⭐</span>
                      <span className="text-sm font-medium">4.9</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-1">Captain Jose Santos</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Senior Island Hopping Guide</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs">
                        Island Hopping
                      </span>
                      <span className="px-2 py-1 bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200 rounded text-xs">
                        Water Sports
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Experience</p>
                      <p className="font-medium">8 years</p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Tours Completed</p>
                      <p className="font-medium">1,250</p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Languages</p>
                      <p className="font-medium">EN, FIL, KOR</p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Certifications</p>
                      <p className="font-medium">3 Active</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Today's Schedule</p>
                    <div className="text-sm">
                      <p className="font-medium text-green-600">08:00 - Island Hopping (25 pax)</p>
                      <p className="font-medium text-blue-600">14:00 - Available</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">This Month</p>
                    <div className="flex justify-between text-sm">
                      <span>Tours: <span className="font-medium text-blue-600">42</span></span>
                      <span>Earnings: <span className="font-medium text-green-600">₱84,000</span></span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button className="flex-1 px-3 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm font-medium transition-colors">
                      View Profile
                    </button>
                    <button className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg text-sm font-medium transition-colors">
                      Schedule
                    </button>
                  </div>
                </div>
              </div>

              {/* Guide Card 2 */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=300&fit=crop" alt="Maria Cruz" className="w-full h-48 object-cover" />
                  <div className="absolute top-4 left-4">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                      On Duty
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-lg px-2 py-1">
                    <div className="flex items-center space-x-1">
                      <span className="text-yellow-500">⭐</span>
                      <span className="text-sm font-medium">4.8</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-1">Maria Cruz</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Cultural & Food Tour Specialist</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded text-xs">
                        Cultural
                      </span>
                      <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded text-xs">
                        Food Tours
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Experience</p>
                      <p className="font-medium">5 years</p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Tours Completed</p>
                      <p className="font-medium">890</p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Languages</p>
                      <p className="font-medium">EN, FIL, JPN</p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Certifications</p>
                      <p className="font-medium">2 Active</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Today's Schedule</p>
                    <div className="text-sm">
                      <p className="font-medium text-yellow-600">10:00 - Cultural Tour (12 pax) - In Progress</p>
                      <p className="font-medium text-green-600">16:00 - Available</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">This Month</p>
                    <div className="flex justify-between text-sm">
                      <span>Tours: <span className="font-medium text-blue-600">38</span></span>
                      <span>Earnings: <span className="font-medium text-green-600">₱76,000</span></span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button className="flex-1 px-3 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm font-medium transition-colors">
                      View Profile
                    </button>
                    <button className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg text-sm font-medium transition-colors">
                      Schedule
                    </button>
                  </div>
                </div>
              </div>

              {/* Guide Card 3 */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=300&fit=crop" alt="Mike Rodriguez" className="w-full h-48 object-cover" />
                  <div className="absolute top-4 left-4">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      Available
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-lg px-2 py-1">
                    <div className="flex items-center space-x-1">
                      <span className="text-yellow-500">⭐</span>
                      <span className="text-sm font-medium">4.7</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-1">Mike Rodriguez</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Adventure & Water Sports Guide</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      <span className="px-2 py-1 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 rounded text-xs">
                        Adventure
                      </span>
                      <span className="px-2 py-1 bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200 rounded text-xs">
                        Water Sports
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Experience</p>
                      <p className="font-medium">6 years</p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Tours Completed</p>
                      <p className="font-medium">1,100</p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Languages</p>
                      <p className="font-medium">EN, FIL, ESP</p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Certifications</p>
                      <p className="font-medium">4 Active</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Today's Schedule</p>
                    <div className="text-sm">
                      <p className="font-medium text-green-600">09:00 - Available</p>
                      <p className="font-medium text-blue-600">15:00 - Water Sports (8 pax)</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">This Month</p>
                    <div className="flex justify-between text-sm">
                      <span>Tours: <span className="font-medium text-blue-600">35</span></span>
                      <span>Earnings: <span className="font-medium text-green-600">₱70,000</span></span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button className="flex-1 px-3 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm font-medium transition-colors">
                      View Profile
                    </button>
                    <button className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg text-sm font-medium transition-colors">
                      Schedule
                    </button>
                  </div>
                </div>
              </div>

              {/* Guide Card 4 */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=300&fit=crop" alt="Lisa Garcia" className="w-full h-48 object-cover" />
                  <div className="absolute top-4 left-4">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      Available
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-lg px-2 py-1">
                    <div className="flex items-center space-x-1">
                      <span className="text-yellow-500">⭐</span>
                      <span className="text-sm font-medium">4.8</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-1">Lisa Garcia</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Multi-Language Cultural Guide</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded text-xs">
                        Cultural
                      </span>
                      <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs">
                        Island Hopping
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Experience</p>
                      <p className="font-medium">7 years</p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Tours Completed</p>
                      <p className="font-medium">980</p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Languages</p>
                      <p className="font-medium">EN, FIL, GER, FRA</p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Certifications</p>
                      <p className="font-medium">5 Active</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Today's Schedule</p>
                    <div className="text-sm">
                      <p className="font-medium text-green-600">11:00 - Available</p>
                      <p className="font-medium text-green-600">16:00 - Available</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">This Month</p>
                    <div className="flex justify-between text-sm">
                      <span>Tours: <span className="font-medium text-blue-600">40</span></span>
                      <span>Earnings: <span className="font-medium text-green-600">₱80,000</span></span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button className="flex-1 px-3 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm font-medium transition-colors">
                      View Profile
                    </button>
                    <button className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg text-sm font-medium transition-colors">
                      Schedule
                    </button>
                  </div>
                </div>
              </div>

              {/* Guide Card 5 */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=300&fit=crop" alt="Carlos Mendoza" className="w-full h-48 object-cover" />
                  <div className="absolute top-4 left-4">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                      On Duty
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-lg px-2 py-1">
                    <div className="flex items-center space-x-1">
                      <span className="text-yellow-500">⭐</span>
                      <span className="text-sm font-medium">4.5</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-1">Carlos Mendoza</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Nightlife & Entertainment Guide</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      <span className="px-2 py-1 bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-200 rounded text-xs">
                        Nightlife
                      </span>
                      <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded text-xs">
                        Food Tours
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Experience</p>
                      <p className="font-medium">3 years</p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Tours Completed</p>
                      <p className="font-medium">420</p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Languages</p>
                      <p className="font-medium">EN, FIL</p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Certifications</p>
                      <p className="font-medium">2 Active</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Today's Schedule</p>
                    <div className="text-sm">
                      <p className="font-medium text-green-600">14:00 - Available</p>
                      <p className="font-medium text-yellow-600">20:00 - Nightlife Tour (15 pax)</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">This Month</p>
                    <div className="flex justify-between text-sm">
                      <span>Tours: <span className="font-medium text-blue-600">32</span></span>
                      <span>Earnings: <span className="font-medium text-green-600">₱64,000</span></span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button className="flex-1 px-3 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm font-medium transition-colors">
                      View Profile
                    </button>
                    <button className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg text-sm font-medium transition-colors">
                      Schedule
                    </button>
                  </div>
                </div>
              </div>

              {/* Guide Card 6 */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=300&fit=crop" alt="Lisa Garcia" className="w-full h-48 object-cover" />
                  <div className="absolute top-4 left-4">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      Available
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-lg px-2 py-1">
                    <div className="flex items-center space-x-1">
                      <span className="text-yellow-500">⭐</span>
                      <span className="text-sm font-medium">4.8</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-1">Lisa Garcia</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Multi-Language Cultural Guide</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded text-xs">
                        Cultural
                      </span>
                      <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs">
                        Island Hopping
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Experience</p>
                      <p className="font-medium">7 years</p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Tours Completed</p>
                      <p className="font-medium">980</p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Languages</p>
                      <p className="font-medium">EN, FIL, GER, FRA</p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Certifications</p>
                      <p className="font-medium">5 Active</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Today's Schedule</p>
                    <div className="text-sm">
                      <p className="font-medium text-green-600">11:00 - Available</p>
                      <p className="font-medium text-green-600">16:00 - Available</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">This Month</p>
                    <div className="flex justify-between text-sm">
                      <span>Tours: <span className="font-medium text-blue-600">40</span></span>
                      <span>Earnings: <span className="font-medium text-green-600">₱80,000</span></span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button className="flex-1 px-3 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm font-medium transition-colors">
                      View Profile
                    </button>
                    <button className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg text-sm font-medium transition-colors">
                      Schedule
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            {/* Bookings Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Bookings</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">3,250</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                    <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Confirmed</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">2,890</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                    <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">185</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
                    <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Cancelled</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">175</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                    <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Today's Revenue</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">₱125K</p>
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
                      placeholder="Search by booking ID, customer name, or tour..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                    <option value="all">All Status</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="pending">Pending</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="completed">Completed</option>
                    <option value="no-show">No Show</option>
                  </select>

                  <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                    <option value="all">All Tours</option>
                    <option value="island-hopping">Island Hopping</option>
                    <option value="water-sports">Water Sports</option>
                    <option value="cultural">Cultural Tours</option>
                    <option value="adventure">Adventure</option>
                    <option value="food-tour">Food Tours</option>
                  </select>

                  <input
                    type="date"
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />

                  <button className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors">
                    Export
                  </button>
                </div>
              </div>
            </div>

            {/* Bookings Table */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Booking Details
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Tour/Activity
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Date & Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Participants
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {/* Booking Row 1 */}
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">#BK-2024-001</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">Booked: Dec 15, 2024</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-full object-cover" src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop" alt="Sarah Johnson" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">Sarah Johnson</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">sarah.j@email.com</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">Ultimate Island Hopping</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">Captain Jose • Full day</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">Dec 20, 2024</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">09:00 AM</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">
                          <div>2 Adults</div>
                          <div>1 Child</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">₱6,800</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Paid</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          Confirmed
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-orange-600 hover:text-orange-900 dark:hover:text-orange-400">View</button>
                          <button className="text-blue-600 hover:text-blue-900 dark:hover:text-blue-400">Edit</button>
                          <button className="text-red-600 hover:text-red-900 dark:hover:text-red-400">Cancel</button>
                        </div>
                      </td>
                    </tr>

                    {/* Booking Row 2 */}
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">#BK-2024-002</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">Booked: Dec 15, 2024</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-full object-cover" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" alt="Michael Chen" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">Michael Chen</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">m.chen@email.com</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">Sunset Parasailing</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">Maria Santos • 2 hours</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">Dec 18, 2024</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">04:00 PM</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">
                          <div>1 Adult</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">₱3,500</div>
                        <div className="text-sm text-yellow-600">Pending</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                          Pending Payment
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-orange-600 hover:text-orange-900 dark:hover:text-orange-400">View</button>
                          <button className="text-blue-600 hover:text-blue-900 dark:hover:text-blue-400">Edit</button>
                          <button className="text-red-600 hover:text-red-900 dark:hover:text-red-400">Cancel</button>
                        </div>
                      </td>
                    </tr>

                    {/* Booking Row 3 */}
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">#BK-2024-003</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">Booked: Dec 14, 2024</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-full object-cover" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" alt="Emma Wilson" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">Emma Wilson</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">emma.w@email.com</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">Cultural Heritage Tour</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">Lisa Garcia • Half day</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">Dec 16, 2024</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">02:00 PM</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">
                          <div>4 Adults</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">₱6,000</div>
                        <div className="text-sm text-green-600">Paid</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                          Completed
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-orange-600 hover:text-orange-900 dark:hover:text-orange-400">View</button>
                          <button className="text-green-600 hover:text-green-900 dark:hover:text-green-400">Review</button>
                        </div>
                      </td>
                    </tr>

                    {/* Booking Row 4 */}
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">#BK-2024-004</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">Booked: Dec 14, 2024</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-full object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" alt="David Kim" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">David Kim</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">d.kim@email.com</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">Boracay Food Adventure</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">Carlos Mendoza • 4 hours</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">Dec 17, 2024</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">06:00 PM</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">
                          <div>2 Adults</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">₱4,800</div>
                        <div className="text-sm text-green-600">Paid</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          Confirmed
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-orange-600 hover:text-orange-900 dark:hover:text-orange-400">View</button>
                          <button className="text-blue-600 hover:text-blue-900 dark:hover:text-blue-400">Edit</button>
                          <button className="text-red-600 hover:text-red-900 dark:hover:text-red-400">Cancel</button>
                        </div>
                      </td>
                    </tr>

                    {/* Booking Row 5 */}
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">#BK-2024-005</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">Booked: Dec 13, 2024</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-full object-cover" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop" alt="Jessica Brown" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">Jessica Brown</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">j.brown@email.com</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">Cliff Jumping Adventure</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">Rico Delgado • 3 hours</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">Dec 15, 2024</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">10:00 AM</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">
                          <div>3 Adults</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">₱7,500</div>
                        <div className="text-sm text-red-600">Refunded</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                          Cancelled
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-orange-600 hover:text-orange-900 dark:hover:text-orange-400">View</button>
                          <button className="text-gray-400 cursor-not-allowed">Cancelled</button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 sm:px-6">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    Previous
                  </button>
                  <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of{' '}
                      <span className="font-medium">97</span> results
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <span className="sr-only">Previous</span>
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                      <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600">
                        1
                      </button>
                      <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-orange-50 dark:bg-orange-900 text-sm font-medium text-orange-600 dark:text-orange-400">
                        2
                      </button>
                      <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600">
                        3
                      </button>
                      <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <span className="sr-only">Next</span>
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Earnings Tab */}
        {activeTab === 'earnings' && (
          <div className="space-y-6">
            {/* Earnings Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                    <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Today's Revenue</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">₱125,500</p>
                    <p className="text-sm text-green-600">+12.5% from yesterday</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">This Week</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">₱785,200</p>
                    <p className="text-sm text-green-600">+8.3% from last week</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                    <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">This Month</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">₱3,245,800</p>
                    <p className="text-sm text-green-600">+15.7% from last month</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                    <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Average per Tour</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">₱4,250</p>
                    <p className="text-sm text-green-600">+5.2% increase</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Time Period Selector */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h3 className="text-lg font-semibold">Revenue Analytics</h3>
                <div className="flex items-center space-x-4">
                  <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                    <option value="7days">Last 7 Days</option>
                    <option value="30days">Last 30 Days</option>
                    <option value="3months">Last 3 Months</option>
                    <option value="year">This Year</option>
                  </select>
                  <button className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors">
                    Export Report
                  </button>
                </div>
              </div>
            </div>

            {/* Revenue Chart and Top Tours */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Revenue Chart */}
              <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold mb-6">Daily Revenue Trend</h3>
                <div className="h-80 flex items-end justify-between space-x-2">
                  {/* Simulated Chart Bars */}
                  <div className="flex flex-col items-center">
                    <div className="w-8 bg-orange-500 rounded-t" style={{height: '120px'}}></div>
                    <span className="text-xs text-gray-600 dark:text-gray-400 mt-2">Dec 10</span>
                    <span className="text-xs font-medium">₱85K</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-8 bg-orange-500 rounded-t" style={{height: '140px'}}></div>
                    <span className="text-xs text-gray-600 dark:text-gray-400 mt-2">Dec 11</span>
                    <span className="text-xs font-medium">₱95K</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-8 bg-orange-500 rounded-t" style={{height: '100px'}}></div>
                    <span className="text-xs text-gray-600 dark:text-gray-400 mt-2">Dec 12</span>
                    <span className="text-xs font-medium">₱72K</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-8 bg-orange-500 rounded-t" style={{height: '180px'}}></div>
                    <span className="text-xs text-gray-600 dark:text-gray-400 mt-2">Dec 13</span>
                    <span className="text-xs font-medium">₱125K</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-8 bg-orange-500 rounded-t" style={{height: '160px'}}></div>
                    <span className="text-xs text-gray-600 dark:text-gray-400 mt-2">Dec 14</span>
                    <span className="text-xs font-medium">₱110K</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-8 bg-orange-500 rounded-t" style={{height: '200px'}}></div>
                    <span className="text-xs text-gray-600 dark:text-gray-400 mt-2">Dec 15</span>
                    <span className="text-xs font-medium">₱145K</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-8 bg-orange-600 rounded-t" style={{height: '175px'}}></div>
                    <span className="text-xs text-gray-600 dark:text-gray-400 mt-2">Today</span>
                    <span className="text-xs font-medium">₱125K</span>
                  </div>
                </div>
              </div>

              {/* Top Earning Tours */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold mb-6">Top Earning Tours</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <div>
                        <p className="font-medium text-sm">Ultimate Island Hopping</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">45 bookings</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">₱112,500</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">35% of total</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div>
                        <p className="font-medium text-sm">Sunset Sailing</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">32 bookings</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">₱96,000</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">30% of total</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div>
                        <p className="font-medium text-sm">Cultural Heritage Tour</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">28 bookings</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">₱67,200</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">21% of total</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <div>
                        <p className="font-medium text-sm">Cliff Jumping Adventure</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">18 bookings</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">₱45,000</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">14% of total</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Earnings Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Payment Methods */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold mb-6">Payment Methods</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                        <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Credit/Debit Cards</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">65% of transactions</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">₱210,825</p>
                      <p className="text-sm text-green-600">+12%</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                        <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Cash Payments</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">25% of transactions</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">₱81,125</p>
                      <p className="text-sm text-red-600">-5%</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                        <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Digital Wallets</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">10% of transactions</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">₱32,450</p>
                      <p className="text-sm text-green-600">+25%</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Guide Earnings */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold mb-6">Top Earning Guides</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop" alt="Captain Jose" className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <p className="font-medium">Captain Jose Santos</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">15 tours this week</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">₱45,000</p>
                      <p className="text-sm text-green-600">Commission</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop" alt="Lisa Garcia" className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <p className="font-medium">Lisa Garcia</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">12 tours this week</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">₱36,000</p>
                      <p className="text-sm text-green-600">Commission</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop" alt="Miguel Rodriguez" className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <p className="font-medium">Miguel Rodriguez</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">10 tours this week</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">₱30,000</p>
                      <p className="text-sm text-green-600">Commission</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop" alt="Carlos Mendoza" className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <p className="font-medium">Carlos Mendoza</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">8 tours this week</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">₱24,000</p>
                      <p className="text-sm text-green-600">Commission</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Monthly Comparison */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold mb-6">Monthly Revenue Comparison</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-3xl font-bold text-blue-600">₱2,890,500</p>
                  <p className="text-sm text-blue-800 dark:text-blue-400 mt-2">November 2024</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Previous Month</p>
                </div>
                <div className="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <p className="text-3xl font-bold text-green-600">₱3,245,800</p>
                  <p className="text-sm text-green-800 dark:text-green-400 mt-2">December 2024</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Current Month</p>
                </div>
                <div className="text-center p-6 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <p className="text-3xl font-bold text-orange-600">+₱355,300</p>
                  <p className="text-sm text-orange-800 dark:text-orange-400 mt-2">+12.3% Growth</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Month over Month</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            {/* Key Performance Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Conversion Rate</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">68.5%</p>
                    <p className="text-sm text-green-600">+4.2% from last month</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                    <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Booking Time</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">3.2 days</p>
                    <p className="text-sm text-red-600">+0.5 days from last month</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                    <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Repeat Customers</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">42%</p>
                    <p className="text-sm text-green-600">+8.1% from last month</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                    <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Customer Satisfaction</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">4.7/5</p>
                    <p className="text-sm text-green-600">+0.2 from last month</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Analytics Controls */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h3 className="text-lg font-semibold">Performance Analytics</h3>
                <div className="flex items-center space-x-4">
                  <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                    <option value="7days">Last 7 Days</option>
                    <option value="30days">Last 30 Days</option>
                    <option value="3months">Last 3 Months</option>
                    <option value="year">This Year</option>
                  </select>
                  <button className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors">
                    Generate Report
                  </button>
                </div>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Booking Trends Chart */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold mb-6">Booking Trends</h3>
                <div className="h-64 flex items-end justify-between space-x-2">
                  {/* Simulated Line Chart */}
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-32 bg-gradient-to-t from-blue-500 to-blue-300 rounded-t"></div>
                    <span className="text-xs text-gray-600 dark:text-gray-400 mt-2">Week 1</span>
                    <span className="text-xs font-medium">45</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-40 bg-gradient-to-t from-blue-500 to-blue-300 rounded-t"></div>
                    <span className="text-xs text-gray-600 dark:text-gray-400 mt-2">Week 2</span>
                    <span className="text-xs font-medium">52</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-36 bg-gradient-to-t from-blue-500 to-blue-300 rounded-t"></div>
                    <span className="text-xs text-gray-600 dark:text-gray-400 mt-2">Week 3</span>
                    <span className="text-xs font-medium">48</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-48 bg-gradient-to-t from-blue-500 to-blue-300 rounded-t"></div>
                    <span className="text-xs text-gray-600 dark:text-gray-400 mt-2">Week 4</span>
                    <span className="text-xs font-medium">58</span>
                  </div>
                </div>
                <div className="mt-4 flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>Peak: 58 bookings</span>
                  <span>Avg: 50.8 bookings/week</span>
                </div>
              </div>

              {/* Tour Type Distribution */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold mb-6">Tour Type Distribution</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-blue-500 rounded"></div>
                      <span className="text-sm">Island Hopping</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{width: '35%'}}></div>
                      </div>
                      <span className="text-sm font-medium">35%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-cyan-500 rounded"></div>
                      <span className="text-sm">Water Sports</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-cyan-500 h-2 rounded-full" style={{width: '28%'}}></div>
                      </div>
                      <span className="text-sm font-medium">28%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-purple-500 rounded"></div>
                      <span className="text-sm">Cultural Tours</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{width: '18%'}}></div>
                      </div>
                      <span className="text-sm font-medium">18%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-orange-500 rounded"></div>
                      <span className="text-sm">Adventure</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-orange-500 h-2 rounded-full" style={{width: '12%'}}></div>
                      </div>
                      <span className="text-sm font-medium">12%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-green-500 rounded"></div>
                      <span className="text-sm">Food Tours</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{width: '7%'}}></div>
                      </div>
                      <span className="text-sm font-medium">7%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Demographics and Seasonal Trends */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Customer Demographics */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold mb-6">Customer Demographics</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-3">Age Groups</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">18-25</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{width: '22%'}}></div>
                          </div>
                          <span className="text-sm font-medium">22%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">26-35</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{width: '38%'}}></div>
                          </div>
                          <span className="text-sm font-medium">38%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">36-45</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div className="bg-orange-500 h-2 rounded-full" style={{width: '25%'}}></div>
                          </div>
                          <span className="text-sm font-medium">25%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">46+</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div className="bg-purple-500 h-2 rounded-full" style={{width: '15%'}}></div>
                          </div>
                          <span className="text-sm font-medium">15%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Customer Origin</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Domestic</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{width: '65%'}}></div>
                          </div>
                          <span className="text-sm font-medium">65%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">International</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{width: '35%'}}></div>
                          </div>
                          <span className="text-sm font-medium">35%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Seasonal Trends */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold mb-6">Seasonal Trends</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium text-blue-800 dark:text-blue-400">Peak Season</h4>
                      <span className="text-sm text-blue-600">Dec - Feb</span>
                    </div>
                    <p className="text-sm text-blue-700 dark:text-blue-300">Average 85 bookings/week</p>
                    <div className="mt-2 w-full bg-blue-200 dark:bg-blue-800 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{width: '85%'}}></div>
                    </div>
                  </div>

                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium text-green-800 dark:text-green-400">High Season</h4>
                      <span className="text-sm text-green-600">Mar - May</span>
                    </div>
                    <p className="text-sm text-green-700 dark:text-green-300">Average 65 bookings/week</p>
                    <div className="mt-2 w-full bg-green-200 dark:bg-green-800 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{width: '65%'}}></div>
                    </div>
                  </div>

                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium text-yellow-800 dark:text-yellow-400">Low Season</h4>
                      <span className="text-sm text-yellow-600">Jun - Aug</span>
                    </div>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300">Average 35 bookings/week</p>
                    <div className="mt-2 w-full bg-yellow-200 dark:bg-yellow-800 rounded-full h-2">
                      <div className="bg-yellow-600 h-2 rounded-full" style={{width: '35%'}}></div>
                    </div>
                  </div>

                  <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium text-orange-800 dark:text-orange-400">Recovery Season</h4>
                      <span className="text-sm text-orange-600">Sep - Nov</span>
                    </div>
                    <p className="text-sm text-orange-700 dark:text-orange-300">Average 50 bookings/week</p>
                    <div className="mt-2 w-full bg-orange-200 dark:bg-orange-800 rounded-full h-2">
                      <div className="bg-orange-600 h-2 rounded-full" style={{width: '50%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Metrics and Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Guide Performance */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold mb-6">Guide Performance Metrics</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">Average Rating</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Across all guides</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-yellow-600">4.6 ⭐</p>
                      <p className="text-xs text-green-600">+0.3</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">Completion Rate</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Tours completed successfully</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">96.8%</p>
                      <p className="text-xs text-green-600">+1.2%</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">Response Time</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Average booking response</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-blue-600">2.3 hrs</p>
                      <p className="text-xs text-red-600">+0.5 hrs</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">No-Show Rate</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Customer no-shows</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-red-600">3.2%</p>
                      <p className="text-xs text-green-600">-0.8%</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Revenue Insights */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold mb-6">Revenue Insights</h3>
                <div className="space-y-4">
                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Best Performing Day</span>
                      <span className="text-sm text-blue-600">Saturday</span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Average ₱45,000/day</p>
                  </div>

                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Peak Booking Hour</span>
                      <span className="text-sm text-green-600">2:00 PM</span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">25% of daily bookings</p>
                  </div>

                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Average Group Size</span>
                      <span className="text-sm text-purple-600">4.2 people</span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Optimal for pricing</p>
                  </div>

                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Cancellation Rate</span>
                      <span className="text-sm text-orange-600">5.4%</span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Within industry average</p>
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold mb-6">AI Recommendations</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                    <h4 className="font-medium text-blue-800 dark:text-blue-400 text-sm mb-1">Pricing Optimization</h4>
                    <p className="text-xs text-blue-700 dark:text-blue-300">Consider increasing weekend prices by 15% during peak season</p>
                  </div>

                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500">
                    <h4 className="font-medium text-green-800 dark:text-green-400 text-sm mb-1">Capacity Management</h4>
                    <p className="text-xs text-green-700 dark:text-green-300">Add more island hopping tours on Saturdays to meet demand</p>
                  </div>

                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
                    <h4 className="font-medium text-yellow-800 dark:text-yellow-400 text-sm mb-1">Marketing Focus</h4>
                    <p className="text-xs text-yellow-700 dark:text-yellow-300">Target 26-35 age group for cultural tours - highest conversion</p>
                  </div>

                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border-l-4 border-purple-500">
                    <h4 className="font-medium text-purple-800 dark:text-purple-400 text-sm mb-1">Guide Training</h4>
                    <p className="text-xs text-purple-700 dark:text-purple-300">Focus on response time improvement for better customer satisfaction</p>
                  </div>

                  <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border-l-4 border-orange-500">
                    <h4 className="font-medium text-orange-800 dark:text-orange-400 text-sm mb-1">Seasonal Strategy</h4>
                    <p className="text-xs text-orange-700 dark:text-orange-300">Develop indoor activities for low season to maintain revenue</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 