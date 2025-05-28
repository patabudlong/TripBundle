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

        {/* Add Tour Modal */}
        {showAddTour && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold">Add New Tour/Activity</h3>
                  <button 
                    onClick={() => setShowAddTour(false)}
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
                      <label className="block text-sm font-medium mb-2">Tour/Activity Name</label>
                      <input 
                        type="text" 
                        placeholder="e.g., Ultimate Island Hopping Adventure"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Activity Type</label>
                      <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                        <option value="">Select Type</option>
                        <option value="island-hopping">Island Hopping</option>
                        <option value="water-sports">Water Sports</option>
                        <option value="cultural">Cultural</option>
                        <option value="adventure">Adventure</option>
                        <option value="food-tour">Food Tour</option>
                        <option value="nightlife">Nightlife</option>
                        <option value="wellness">Wellness</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Location</label>
                      <input 
                        type="text" 
                        placeholder="e.g., Boracay & Nearby Islands"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Duration</label>
                      <input 
                        type="text" 
                        placeholder="e.g., Full day (8 hours)"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Difficulty Level</label>
                      <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                        <option value="">Select Difficulty</option>
                        <option value="easy">Easy</option>
                        <option value="moderate">Moderate</option>
                        <option value="challenging">Challenging</option>
                        <option value="extreme">Extreme</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Status</label>
                      <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="seasonal">Seasonal</option>
                        <option value="maintenance">Maintenance</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Tour Guide</label>
                      <input 
                        type="text" 
                        placeholder="e.g., Captain Jose"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent" 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Adult Price (₱)</label>
                      <input 
                        type="number" 
                        placeholder="e.g., 2500"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Child Price (₱)</label>
                      <input 
                        type="number" 
                        placeholder="e.g., 1800"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Senior Price (₱)</label>
                      <input 
                        type="number" 
                        placeholder="e.g., 2200"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Group Price (₱)</label>
                      <input 
                        type="number" 
                        placeholder="e.g., 2200"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent" 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Max Participants</label>
                      <input 
                        type="number" 
                        placeholder="e.g., 25"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Min Participants</label>
                      <input 
                        type="number" 
                        placeholder="e.g., 4"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Daily Slots</label>
                      <input 
                        type="number" 
                        placeholder="e.g., 2"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent" 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Contact Phone</label>
                      <input 
                        type="tel" 
                        placeholder="+63 917 111 2222"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Contact Email</label>
                      <input 
                        type="email" 
                        placeholder="tours@example.com"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent" 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Start Times</label>
                    <input 
                      type="text" 
                      placeholder="e.g., 08:00, 13:00 (comma separated)"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent" 
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Operating Days</label>
                    <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
                      {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                        <label key={day} className="flex items-center space-x-2 p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                          <input type="checkbox" className="rounded border-gray-300 text-orange-600 focus:ring-orange-500" />
                          <span className="text-sm">{day.slice(0, 3)}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Inclusions</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {['Boat Transfer', 'Snorkeling Gear', 'Lunch', 'Tour Guide', 'Life Jackets', 'Fresh Fruits', 'Drinks', 'Insurance', 'Photos', 'Equipment', 'Transportation', 'Entrance Fees'].map((inclusion) => (
                        <label key={inclusion} className="flex items-center space-x-2 p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                          <input type="checkbox" className="rounded border-gray-300 text-orange-600 focus:ring-orange-500" />
                          <span className="text-sm">{inclusion}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Equipment Provided</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {['Snorkeling Gear', 'Life Jackets', 'Underwater Camera', 'Towels', 'Fins', 'Masks', 'Safety Equipment', 'First Aid Kit', 'Communication Device', 'Cooler', 'Umbrellas', 'Chairs'].map((equipment) => (
                        <label key={equipment} className="flex items-center space-x-2 p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                          <input type="checkbox" className="rounded border-gray-300 text-orange-600 focus:ring-orange-500" />
                          <span className="text-sm">{equipment}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Requirements</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {['Swimming Ability', 'Valid ID', 'Sun Protection', 'Swimwear', 'Comfortable Shoes', 'Physical Fitness', 'Age Restriction', 'Medical Clearance', 'Waiver Form', 'Advance Booking', 'Group Size', 'Weather Dependent'].map((requirement) => (
                        <label key={requirement} className="flex items-center space-x-2 p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                          <input type="checkbox" className="rounded border-gray-300 text-orange-600 focus:ring-orange-500" />
                          <span className="text-sm">{requirement}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Tour Images</label>
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                      <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <p className="text-gray-600 dark:text-gray-400 mb-2">Upload tour images</p>
                      <button type="button" className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm font-medium transition-colors">
                        Choose Files
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <button 
                      type="button"
                      onClick={() => setShowAddTour(false)}
                      className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors"
                    >
                      Add Tour/Activity
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Tour Details Modal */}
        {selectedTour && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-xl font-semibold">{selectedTour.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{selectedTour.location} • {selectedTour.duration}</p>
                  </div>
                  <button 
                    onClick={() => setSelectedTour(null)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Image Gallery */}
                  <div className="lg:col-span-2">
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {selectedTour.images.map((image, index) => (
                        <img key={index} src={image} alt={`${selectedTour.name} ${index + 1}`} className="w-full h-48 object-cover rounded-lg" />
                      ))}
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold mb-3">Tour Information</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedTour.status)}`}>
                              {selectedTour.status}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(selectedTour.type)}`}>
                              {selectedTour.type.replace('-', ' ')}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(selectedTour.difficulty)}`}>
                              {selectedTour.difficulty}
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-yellow-500">⭐</span>
                            <span className="font-medium">{selectedTour.rating}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">Inclusions</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedTour.inclusions.map((inclusion, index) => (
                            <span key={index} className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm">
                              {inclusion}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">Equipment Provided</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedTour.equipment.provided.map((item, index) => (
                            <span key={index} className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">Requirements</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedTour.requirements.map((requirement, index) => (
                            <span key={index} className="px-3 py-1 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 rounded-full text-sm">
                              {requirement}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Details Sidebar */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-4">Revenue Overview</h4>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <span className="font-medium">Today</span>
                          <span className="text-lg font-bold text-green-600">₱{selectedTour.earnings.today.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <span className="font-medium">This Week</span>
                          <span className="text-lg font-bold text-blue-600">₱{selectedTour.earnings.thisWeek.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <span className="font-medium">This Month</span>
                          <span className="text-lg font-bold text-purple-600">₱{selectedTour.earnings.thisMonth.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-4">Booking Statistics</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <p className="text-lg font-bold">{selectedTour.bookings.total}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Total Bookings</p>
                        </div>
                        <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <p className="text-lg font-bold text-green-600">{selectedTour.bookings.completed}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
                        </div>
                        <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <p className="text-lg font-bold text-red-600">{selectedTour.bookings.cancelled}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Cancelled</p>
                        </div>
                        <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <p className="text-lg font-bold text-orange-600">{selectedTour.bookings.pending}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-4">Performance Metrics</h4>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <span className="font-medium">Completion Rate</span>
                          <span className="text-lg font-bold text-green-600">{selectedTour.performance.completionRate}%</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <span className="font-medium">Average Rating</span>
                          <span className="text-lg font-bold text-yellow-600">{selectedTour.performance.averageRating} ⭐</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <span className="font-medium">Repeat Customers</span>
                          <span className="text-lg font-bold text-blue-600">{selectedTour.performance.repeatCustomers}%</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-4">Today's Capacity</h4>
                      <div className="text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <p className="text-3xl font-bold text-blue-600">{selectedTour.capacity.bookedToday}/{selectedTour.capacity.dailySlots}</p>
                        <p className="text-sm text-blue-800 dark:text-blue-400">Slots Booked Today</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{selectedTour.capacity.availableToday} slots available</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-4">Pricing Structure</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <span className="font-medium">Adult</span>
                          <span className="text-lg font-bold text-green-600">₱{selectedTour.pricing.adult.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <span className="font-medium">Child</span>
                          <span className="text-lg font-bold text-blue-600">₱{selectedTour.pricing.child.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <span className="font-medium">Senior</span>
                          <span className="text-lg font-bold text-purple-600">₱{selectedTour.pricing.senior.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <span className="font-medium">Group (10+)</span>
                          <span className="text-lg font-bold text-orange-600">₱{selectedTour.pricing.group.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-4">Schedule Information</h4>
                      <div className="space-y-3">
                        <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <p className="font-medium">Operating Days</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {selectedTour.schedule.days.length === 7 ? 'Daily' : selectedTour.schedule.days.join(', ')}
                          </p>
                        </div>
                        <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <p className="font-medium">Start Times</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{selectedTour.schedule.startTimes.join(', ')}</p>
                        </div>
                        <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <p className="font-medium">Capacity</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {selectedTour.schedule.minParticipants} - {selectedTour.schedule.maxParticipants} participants
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-4">Contact Information</h4>
                      <div className="space-y-3">
                        <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <p className="font-medium">Guide</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{selectedTour.contact.guide}</p>
                        </div>
                        <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <p className="font-medium">Phone</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{selectedTour.contact.phone}</p>
                        </div>
                        <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <p className="font-medium">Email</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{selectedTour.contact.email}</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-4">Documents Status</h4>
                      <div className="space-y-3">
                        {Object.entries(selectedTour.documents).map(([doc, info]) => (
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
                    Edit Tour
                  </button>
                  <button className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors">
                    Manage Schedule
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
        {activeTab !== 'overview' && activeTab !== 'tours' && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} section coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
} 