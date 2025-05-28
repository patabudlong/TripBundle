'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Restaurant {
  id: string;
  name: string;
  type: 'restaurant' | 'cafe' | 'bar' | 'fastfood' | 'catering';
  status: 'active' | 'closed' | 'maintenance' | 'pending';
  location: string;
  address: string;
  rating: number;
  cuisine: string[];
  images: string[];
  operatingHours: {
    open: string;
    close: string;
    days: string[];
  };
  contact: {
    phone: string;
    email: string;
    manager: string;
  };
  capacity: {
    indoor: number;
    outdoor: number;
    delivery: boolean;
    takeout: boolean;
  };
  documents: {
    businessPermit: { uploaded: boolean; expiry: string };
    foodSafety: { uploaded: boolean; expiry: string };
    liquorLicense: { uploaded: boolean; expiry: string };
  };
  earnings: {
    today: number;
    thisWeek: number;
    thisMonth: number;
  };
  orders: {
    total: number;
    completed: number;
    cancelled: number;
    pending: number;
    todayOrders: number;
  };
  menu: {
    totalItems: number;
    categories: number;
    averagePrice: number;
  };
}

export default function FoodServiceManagement() {
  const [activeTab, setActiveTab] = useState<'overview' | 'restaurants' | 'menu' | 'orders' | 'earnings' | 'analytics'>('overview');
  const [showAddRestaurant, setShowAddRestaurant] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'closed' | 'maintenance' | 'pending'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'restaurant' | 'cafe' | 'bar' | 'fastfood' | 'catering'>('all');

  // Mock data
  const ownerInfo = {
    name: "Boracay Food Group",
    email: "owner@boracayfood.com",
    phone: "+63 917 123 4567",
    address: "789 Culinary Street, Boracay, Aklan",
    license: "FDA-2024-BFG-001",
    rating: 4.7,
    totalRestaurants: 6,
    totalOrders: 1250
  };

  const restaurants: Restaurant[] = [
    {
      id: 'REST001',
      name: 'Sunset Grill & Bar',
      type: 'restaurant',
      status: 'active',
      location: 'Station 1, Boracay',
      address: 'Beachfront, Station 1, White Beach, Boracay',
      rating: 4.8,
      cuisine: ['Filipino', 'International', 'Seafood'],
      images: [
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop'
      ],
      operatingHours: {
        open: '11:00',
        close: '23:00',
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
      },
      contact: {
        phone: '+63 917 111 1111',
        email: 'reservations@sunsetgrill.com',
        manager: 'Chef Marco Rodriguez'
      },
      capacity: {
        indoor: 80,
        outdoor: 40,
        delivery: true,
        takeout: true
      },
      documents: {
        businessPermit: { uploaded: true, expiry: '2025-12-31' },
        foodSafety: { uploaded: true, expiry: '2025-06-30' },
        liquorLicense: { uploaded: true, expiry: '2025-09-15' }
      },
      earnings: {
        today: 35000,
        thisWeek: 245000,
        thisMonth: 980000
      },
      orders: {
        total: 456,
        completed: 432,
        cancelled: 24,
        pending: 8,
        todayOrders: 45
      },
      menu: {
        totalItems: 85,
        categories: 8,
        averagePrice: 450
      }
    },
    {
      id: 'REST002',
      name: 'Boracay Coffee House',
      type: 'cafe',
      status: 'active',
      location: 'Station 2, Boracay',
      address: 'D\'Mall, Station 2, Boracay Island, Aklan',
      rating: 4.6,
      cuisine: ['Coffee', 'Pastries', 'Light Meals'],
      images: [
        'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=300&fit=crop'
      ],
      operatingHours: {
        open: '06:00',
        close: '22:00',
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
      },
      contact: {
        phone: '+63 917 222 2222',
        email: 'hello@boracaycoffee.com',
        manager: 'Maria Santos'
      },
      capacity: {
        indoor: 45,
        outdoor: 20,
        delivery: true,
        takeout: true
      },
      documents: {
        businessPermit: { uploaded: true, expiry: '2025-12-31' },
        foodSafety: { uploaded: true, expiry: '2025-06-30' },
        liquorLicense: { uploaded: false, expiry: '2025-09-15' }
      },
      earnings: {
        today: 18000,
        thisWeek: 126000,
        thisMonth: 540000
      },
      orders: {
        total: 789,
        completed: 756,
        cancelled: 33,
        pending: 12,
        todayOrders: 67
      },
      menu: {
        totalItems: 42,
        categories: 5,
        averagePrice: 180
      }
    },
    {
      id: 'REST003',
      name: 'Island Seafood Paradise',
      type: 'restaurant',
      status: 'active',
      location: 'Station 3, Boracay',
      address: 'Beachfront Road, Station 3, Boracay Island, Aklan',
      rating: 4.9,
      cuisine: ['Seafood', 'Filipino', 'Asian'],
      images: [
        'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=300&fit=crop'
      ],
      operatingHours: {
        open: '10:00',
        close: '22:00',
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
      },
      contact: {
        phone: '+63 917 333 3333',
        email: 'orders@islandseafood.com',
        manager: 'Captain Jose Dela Cruz'
      },
      capacity: {
        indoor: 60,
        outdoor: 80,
        delivery: false,
        takeout: true
      },
      documents: {
        businessPermit: { uploaded: true, expiry: '2025-12-31' },
        foodSafety: { uploaded: true, expiry: '2025-06-30' },
        liquorLicense: { uploaded: true, expiry: '2025-09-15' }
      },
      earnings: {
        today: 52000,
        thisWeek: 364000,
        thisMonth: 1450000
      },
      orders: {
        total: 234,
        completed: 225,
        cancelled: 9,
        pending: 5,
        todayOrders: 28
      },
      menu: {
        totalItems: 65,
        categories: 6,
        averagePrice: 650
      }
    },
    {
      id: 'REST004',
      name: 'Quick Bites Express',
      type: 'fastfood',
      status: 'maintenance',
      location: 'Caticlan Port',
      address: 'Terminal Building, Caticlan Port, Aklan',
      rating: 4.2,
      cuisine: ['Fast Food', 'Filipino', 'Snacks'],
      images: [
        'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&h=300&fit=crop'
      ],
      operatingHours: {
        open: '05:00',
        close: '21:00',
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
      },
      contact: {
        phone: '+63 917 444 4444',
        email: 'manager@quickbites.com',
        manager: 'Ana Reyes'
      },
      capacity: {
        indoor: 30,
        outdoor: 0,
        delivery: true,
        takeout: true
      },
      documents: {
        businessPermit: { uploaded: true, expiry: '2025-12-31' },
        foodSafety: { uploaded: false, expiry: '2025-06-30' },
        liquorLicense: { uploaded: false, expiry: '2025-09-15' }
      },
      earnings: {
        today: 0,
        thisWeek: 45000,
        thisMonth: 280000
      },
      orders: {
        total: 567,
        completed: 534,
        cancelled: 33,
        pending: 0,
        todayOrders: 0
      },
      menu: {
        totalItems: 35,
        categories: 4,
        averagePrice: 120
      }
    }
  ];

  // Helper functions for styling
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'closed': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'pending': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'restaurant': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'cafe': return 'bg-brown-100 text-brown-800 dark:bg-brown-900 dark:text-brown-200';
      case 'bar': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'fastfood': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'catering': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  // Filter restaurants
  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         restaurant.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         restaurant.contact.manager.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         restaurant.cuisine.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || restaurant.status === statusFilter;
    const matchesType = typeFilter === 'all' || restaurant.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  // Calculate totals
  const totalEarnings = restaurants.reduce((sum, restaurant) => sum + restaurant.earnings.thisMonth, 0);
  const totalOrders = restaurants.reduce((sum, restaurant) => sum + restaurant.orders.total, 0);
  const averageRating = restaurants.reduce((sum, restaurant) => sum + restaurant.rating, 0) / restaurants.length;
  const todayOrders = restaurants.reduce((sum, restaurant) => sum + restaurant.orders.todayOrders, 0);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'restaurants', label: 'Restaurants' },
    { id: 'menu', label: 'Menu Management' },
    { id: 'orders', label: 'Orders' },
    { id: 'earnings', label: 'Earnings' },
    { id: 'analytics', label: 'Analytics' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Food Service Management</h1>
              <p className="text-gray-600 dark:text-gray-400">Manage your restaurants and food services</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600 dark:text-gray-400">Welcome back,</p>
                <p className="font-semibold text-gray-900 dark:text-white">{ownerInfo.name}</p>
              </div>
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">BF</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-orange-500 text-orange-600 dark:text-orange-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                {tab.label}
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
                  <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                    <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m0 0h2M7 7h10M7 11h10M7 15h10" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Restaurants</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">{restaurants.length}</p>
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
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Orders</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">{totalOrders}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                    <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Average Rating</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">{averageRating.toFixed(1)} ⭐</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Today's Summary */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Today's Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">{todayOrders}</p>
                  <p className="text-sm text-green-800 dark:text-green-400">Orders Today</p>
                </div>
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">₱{restaurants.reduce((sum, r) => sum + r.earnings.today, 0).toLocaleString()}</p>
                  <p className="text-sm text-blue-800 dark:text-blue-400">Today's Revenue</p>
                </div>
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">{restaurants.filter(r => r.status === 'active').length}</p>
                  <p className="text-sm text-purple-800 dark:text-purple-400">Active Restaurants</p>
                </div>
                <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <p className="text-2xl font-bold text-orange-600">{restaurants.reduce((sum, r) => sum + r.orders.pending, 0)}</p>
                  <p className="text-sm text-orange-800 dark:text-orange-400">Pending Orders</p>
                </div>
              </div>
            </div>

            {/* Recent Restaurants */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Restaurant Performance</h3>
              <div className="space-y-4">
                {restaurants.slice(0, 3).map((restaurant) => (
                  <div key={restaurant.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <img src={restaurant.images[0]} alt={restaurant.name} className="w-16 h-16 object-cover rounded-lg" />
                      <div>
                        <h4 className="font-medium">{restaurant.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{restaurant.location}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(restaurant.status)}`}>
                            {restaurant.status}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(restaurant.type)}`}>
                            {restaurant.type}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₱{restaurant.earnings.thisMonth.toLocaleString()}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{restaurant.orders.total} orders</p>
                      <p className="text-sm text-yellow-600">{restaurant.rating} ⭐</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Restaurants Tab */}
        {activeTab === 'restaurants' && (
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
                      placeholder="Search restaurants by name, location, cuisine, or manager..."
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
                    <option value="closed">Closed</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="pending">Pending</option>
                  </select>

                  {/* Type Filter */}
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value as any)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="all">All Types</option>
                    <option value="restaurant">Restaurant</option>
                    <option value="cafe">Cafe</option>
                    <option value="bar">Bar</option>
                    <option value="fastfood">Fast Food</option>
                    <option value="catering">Catering</option>
                  </select>

                  {/* Add Restaurant Button */}
                  <button 
                    onClick={() => setShowAddRestaurant(true)}
                    className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors flex items-center space-x-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Add Restaurant</span>
                  </button>
                </div>
              </div>

              {/* Search Results Info */}
              {searchQuery && (
                <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                  Found {filteredRestaurants.length} restaurant{filteredRestaurants.length !== 1 ? 's' : ''} matching "{searchQuery}"
                </div>
              )}
            </div>

            {/* Restaurants Grid */}
            {filteredRestaurants.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRestaurants.map((restaurant) => (
                  <div key={restaurant.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <img src={restaurant.images[0]} alt={restaurant.name} className="w-full h-48 object-cover" />
                      <div className="absolute top-4 right-4 flex space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(restaurant.status)}`}>
                          {restaurant.status.charAt(0).toUpperCase() + restaurant.status.slice(1)}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(restaurant.type)}`}>
                          {restaurant.type.charAt(0).toUpperCase() + restaurant.type.slice(1)}
                        </span>
                      </div>
                      <div className="absolute bottom-4 left-4">
                        <div className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                          {restaurant.rating} ⭐ • {restaurant.operatingHours.open}-{restaurant.operatingHours.close}
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold mb-1">{restaurant.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{restaurant.location}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {restaurant.cuisine.slice(0, 3).map((cuisine, index) => (
                            <span key={index} className="px-2 py-1 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 rounded text-xs">
                              {cuisine}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">Capacity</p>
                          <p className="font-medium">{restaurant.capacity.indoor + restaurant.capacity.outdoor} seats</p>
                        </div>
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">Menu Items</p>
                          <p className="font-medium">{restaurant.menu.totalItems} items</p>
                        </div>
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">Manager</p>
                          <p className="font-medium">{restaurant.contact.manager}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">Avg. Price</p>
                          <p className="font-medium">₱{restaurant.menu.averagePrice}</p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Today's Performance</p>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="text-center p-2 bg-green-50 dark:bg-green-900/20 rounded">
                            <p className="font-medium text-green-600">{restaurant.orders.todayOrders}</p>
                            <p className="text-xs text-green-800 dark:text-green-400">Orders</p>
                          </div>
                          <div className="text-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                            <p className="font-medium text-blue-600">₱{restaurant.earnings.today.toLocaleString()}</p>
                            <p className="text-xs text-blue-800 dark:text-blue-400">Revenue</p>
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Services</p>
                        <div className="flex space-x-2">
                          {restaurant.capacity.delivery && (
                            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs">
                              Delivery
                            </span>
                          )}
                          {restaurant.capacity.takeout && (
                            <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded text-xs">
                              Takeout
                            </span>
                          )}
                          <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded text-xs">
                            Dine-in
                          </span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Monthly Stats</p>
                        <div className="flex justify-between text-sm">
                          <span>Orders: <span className="font-medium text-green-600">{restaurant.orders.total}</span></span>
                          <span>Revenue: <span className="font-medium text-blue-600">₱{restaurant.earnings.thisMonth.toLocaleString()}</span></span>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <button 
                          onClick={() => setSelectedRestaurant(restaurant)}
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
                  {searchQuery ? 'No restaurants found' : 'No restaurants available'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {searchQuery 
                    ? 'Try adjusting your search criteria or filters' 
                    : 'Add your first restaurant to get started'
                  }
                </p>
                {!searchQuery && (
                  <button 
                    onClick={() => setShowAddRestaurant(true)}
                    className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Add Your First Restaurant
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* Add Restaurant Modal */}
        {showAddRestaurant && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold">Add New Restaurant</h3>
                  <button 
                    onClick={() => setShowAddRestaurant(false)}
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
                      <label className="block text-sm font-medium mb-2">Restaurant Name</label>
                      <input 
                        type="text" 
                        placeholder="e.g., Sunset Grill & Bar"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Restaurant Type</label>
                      <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                        <option value="">Select Type</option>
                        <option value="restaurant">Restaurant</option>
                        <option value="cafe">Cafe</option>
                        <option value="bar">Bar</option>
                        <option value="fastfood">Fast Food</option>
                        <option value="catering">Catering</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Location</label>
                      <input 
                        type="text" 
                        placeholder="e.g., Station 1, Boracay"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Status</label>
                      <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                        <option value="active">Active</option>
                        <option value="closed">Closed</option>
                        <option value="maintenance">Maintenance</option>
                        <option value="pending">Pending</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Full Address</label>
                    <textarea 
                      rows={3}
                      placeholder="Complete address of the restaurant"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Indoor Capacity</label>
                      <input 
                        type="number" 
                        placeholder="e.g., 80"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Outdoor Capacity</label>
                      <input 
                        type="number" 
                        placeholder="e.g., 40"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Opening Time</label>
                      <input 
                        type="time" 
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Closing Time</label>
                      <input 
                        type="time" 
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent" 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Manager Name</label>
                      <input 
                        type="text" 
                        placeholder="e.g., Chef Marco Rodriguez"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Contact Phone</label>
                      <input 
                        type="tel" 
                        placeholder="e.g., +63 917 111 1111"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email Address</label>
                      <input 
                        type="email" 
                        placeholder="e.g., reservations@restaurant.com"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent" 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Cuisine Types</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {['Filipino', 'International', 'Seafood', 'Italian', 'Asian', 'American', 'Mediterranean', 'Vegetarian', 'BBQ', 'Desserts', 'Coffee', 'Pastries'].map((cuisine) => (
                        <label key={cuisine} className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded border-gray-300 text-orange-600 focus:ring-orange-500" />
                          <span className="text-sm">{cuisine}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Services Offered</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded border-gray-300 text-orange-600 focus:ring-orange-500" />
                        <span className="text-sm">Dine-in</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded border-gray-300 text-orange-600 focus:ring-orange-500" />
                        <span className="text-sm">Takeout</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded border-gray-300 text-orange-600 focus:ring-orange-500" />
                        <span className="text-sm">Delivery</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded border-gray-300 text-orange-600 focus:ring-orange-500" />
                        <span className="text-sm">Catering</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Operating Days</label>
                    <div className="grid grid-cols-4 md:grid-cols-7 gap-3">
                      {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                        <label key={day} className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded border-gray-300 text-orange-600 focus:ring-orange-500" defaultChecked />
                          <span className="text-sm">{day.slice(0, 3)}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Restaurant Images</label>
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                      <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <p className="text-gray-600 dark:text-gray-400 mb-2">Upload restaurant images</p>
                      <p className="text-sm text-gray-500">PNG, JPG up to 10MB each</p>
                      <button type="button" className="mt-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm font-medium transition-colors">
                        Choose Files
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <button 
                      type="button"
                      onClick={() => setShowAddRestaurant(false)}
                      className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors"
                    >
                      Add Restaurant
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Restaurant Details Modal */}
        {selectedRestaurant && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold">{selectedRestaurant.name} Details</h3>
                  <button 
                    onClick={() => setSelectedRestaurant(null)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column - Basic Info and Images */}
                  <div className="space-y-6">
                    <div>
                      <img src={selectedRestaurant.images[0]} alt={selectedRestaurant.name} className="w-full h-64 object-cover rounded-lg mb-4" />
                      
                      <div className="grid grid-cols-2 gap-2">
                        {selectedRestaurant.images.slice(1).map((image, index) => (
                          <img key={index} src={image} alt={`${selectedRestaurant.name} ${index + 2}`} className="w-full h-32 object-cover rounded-lg" />
                        ))}
                      </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <h4 className="font-semibold mb-3">Restaurant Information</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">Type</p>
                          <p className="font-medium capitalize">{selectedRestaurant.type}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">Rating</p>
                          <p className="font-medium">{selectedRestaurant.rating} ⭐</p>
                        </div>
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">Total Capacity</p>
                          <p className="font-medium">{selectedRestaurant.capacity.indoor + selectedRestaurant.capacity.outdoor} seats</p>
                        </div>
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">Operating Hours</p>
                          <p className="font-medium">{selectedRestaurant.operatingHours.open} - {selectedRestaurant.operatingHours.close}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <h4 className="font-semibold mb-3">Contact Information</h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">Manager</p>
                          <p className="font-medium">{selectedRestaurant.contact.manager}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">Phone</p>
                          <p className="font-medium">{selectedRestaurant.contact.phone}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">Email</p>
                          <p className="font-medium">{selectedRestaurant.contact.email}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">Address</p>
                          <p className="font-medium">{selectedRestaurant.address}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <h4 className="font-semibold mb-3">Cuisine Types</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedRestaurant.cuisine.map((cuisine, index) => (
                          <span key={index} className="px-3 py-1 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 rounded-full text-sm">
                            {cuisine}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <h4 className="font-semibold mb-3">Services Available</h4>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm">
                          Dine-in
                        </span>
                        {selectedRestaurant.capacity.takeout && (
                          <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm">
                            Takeout
                          </span>
                        )}
                        {selectedRestaurant.capacity.delivery && (
                          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                            Delivery
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
                          <p className="text-lg font-bold text-green-600">₱{selectedRestaurant.earnings.today.toLocaleString()}</p>
                          <p className="text-sm text-green-800 dark:text-green-400">Today</p>
                        </div>
                        <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <p className="text-lg font-bold text-blue-600">₱{selectedRestaurant.earnings.thisWeek.toLocaleString()}</p>
                          <p className="text-sm text-blue-800 dark:text-blue-400">This Week</p>
                        </div>
                        <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                          <p className="text-lg font-bold text-purple-600">₱{selectedRestaurant.earnings.thisMonth.toLocaleString()}</p>
                          <p className="text-sm text-purple-800 dark:text-purple-400">This Month</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-4">Order Statistics</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <p className="text-lg font-bold">{selectedRestaurant.orders.total}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Total Orders</p>
                        </div>
                        <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <p className="text-lg font-bold text-green-600">{selectedRestaurant.orders.completed}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
                        </div>
                        <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <p className="text-lg font-bold text-red-600">{selectedRestaurant.orders.cancelled}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Cancelled</p>
                        </div>
                        <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <p className="text-lg font-bold text-orange-600">{selectedRestaurant.orders.pending}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-4">Today's Activity</h4>
                      <div className="text-center p-6 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                        <p className="text-3xl font-bold text-orange-600">{selectedRestaurant.orders.todayOrders}</p>
                        <p className="text-sm text-orange-800 dark:text-orange-400">Orders Today</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-4">Menu Information</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <span className="font-medium">Total Menu Items</span>
                          <span className="text-lg font-bold text-blue-600">{selectedRestaurant.menu.totalItems}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <span className="font-medium">Categories</span>
                          <span className="text-lg font-bold text-green-600">{selectedRestaurant.menu.categories}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <span className="font-medium">Average Price</span>
                          <span className="text-lg font-bold text-purple-600">₱{selectedRestaurant.menu.averagePrice}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-4">Capacity Details</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <p className="text-2xl font-bold text-blue-600">{selectedRestaurant.capacity.indoor}</p>
                          <p className="text-sm text-blue-800 dark:text-blue-400">Indoor Seats</p>
                        </div>
                        <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <p className="text-2xl font-bold text-green-600">{selectedRestaurant.capacity.outdoor}</p>
                          <p className="text-sm text-green-800 dark:text-green-400">Outdoor Seats</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-4">Documents Status</h4>
                      <div className="space-y-3">
                        {Object.entries(selectedRestaurant.documents).map(([doc, info]) => (
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
                    Edit Restaurant
                  </button>
                  <button className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors">
                    Manage Menu
                  </button>
                  <button className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors">
                    View Orders
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other tabs placeholders */}
        {activeTab !== 'overview' && activeTab !== 'restaurants' && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} section coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
} 