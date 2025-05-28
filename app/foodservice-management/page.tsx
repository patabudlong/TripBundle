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
  const [showAddMenuItem, setShowAddMenuItem] = useState(false);
  const [showEditMenuItem, setShowEditMenuItem] = useState(false);
  const [showViewMenuItem, setShowViewMenuItem] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState<any>(null);
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
                          <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded text-xs">
                            Takeout
                          </span>
                        )}
                        {selectedRestaurant.capacity.delivery && (
                          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs">
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
                  <button 
                    onClick={() => setShowAddMenuItem(true)}
                    className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Add Menu Item
                  </button>
                  <button className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors">
                    View Orders
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Menu Management Tab */}
        {activeTab === 'menu' && (
          <div className="space-y-6">
            {/* Menu Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                    <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Menu Items</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">247</p>
                    <p className="text-sm text-green-600">+12 this week</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Categories</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">18</p>
                    <p className="text-sm text-blue-600">Across all restaurants</p>
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
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Average Price</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">₱485</p>
                    <p className="text-sm text-green-600">+8.5% from last month</p>
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
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Best Seller</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">Adobo Rice Bowl</p>
                    <p className="text-sm text-purple-600">1,247 orders this month</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Menu Management Controls */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-6">
                <div className="flex-1 max-w-md">
                  <div className="relative">
                    <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                      type="text"
                      placeholder="Search menu items..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option value="all">All Restaurants</option>
                    <option value="sunset-grill">Sunset Grill</option>
                    <option value="island-cafe">Island Café</option>
                    <option value="beach-bar">Beach Bar</option>
                  </select>

                  <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option value="all">All Categories</option>
                    <option value="appetizers">Appetizers</option>
                    <option value="main-course">Main Course</option>
                    <option value="desserts">Desserts</option>
                    <option value="beverages">Beverages</option>
                  </select>

                  <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option value="all">All Status</option>
                    <option value="available">Available</option>
                    <option value="out-of-stock">Out of Stock</option>
                    <option value="seasonal">Seasonal</option>
                  </select>

                  <button 
                    onClick={() => setShowAddMenuItem(true)}
                    className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Add Menu Item
                  </button>
                </div>
              </div>
            </div>

            {/* Menu Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  id: 1,
                  name: "Grilled Seafood Platter",
                  restaurant: "Sunset Grill & Bar",
                  category: "Main Course",
                  price: 1250,
                  status: "available",
                  rating: 4.8,
                  orders: 234,
                  image: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&h=300&fit=crop",
                  description: "Fresh catch of the day grilled to perfection with herbs and lemon",
                  ingredients: ["Fish", "Shrimp", "Squid", "Herbs", "Lemon"],
                  allergens: ["Seafood"],
                  preparationTime: 25
                },
                {
                  id: 2,
                  name: "Tropical Fruit Smoothie",
                  restaurant: "Island Café",
                  category: "Beverages",
                  price: 185,
                  status: "available",
                  rating: 4.6,
                  orders: 456,
                  image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400&h=300&fit=crop",
                  description: "Refreshing blend of mango, pineapple, and coconut milk",
                  ingredients: ["Mango", "Pineapple", "Coconut Milk", "Ice"],
                  allergens: [],
                  preparationTime: 5
                },
                {
                  id: 3,
                  name: "Adobo Rice Bowl",
                  restaurant: "Quick Bites Express",
                  category: "Main Course",
                  price: 295,
                  status: "available",
                  rating: 4.9,
                  orders: 1247,
                  image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
                  description: "Traditional Filipino adobo served over steamed rice",
                  ingredients: ["Pork", "Soy Sauce", "Vinegar", "Rice", "Garlic"],
                  allergens: ["Soy"],
                  preparationTime: 15
                },
                {
                  id: 4,
                  name: "Chocolate Lava Cake",
                  restaurant: "Sunset Grill & Bar",
                  category: "Desserts",
                  price: 325,
                  status: "seasonal",
                  rating: 4.7,
                  orders: 189,
                  image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop",
                  description: "Warm chocolate cake with molten center, served with vanilla ice cream",
                  ingredients: ["Chocolate", "Flour", "Eggs", "Butter", "Ice Cream"],
                  allergens: ["Eggs", "Dairy", "Gluten"],
                  preparationTime: 20
                },
                {
                  id: 5,
                  name: "Craft Beer Selection",
                  restaurant: "Beach Bar Lounge",
                  category: "Alcoholic",
                  price: 165,
                  status: "available",
                  rating: 4.5,
                  orders: 678,
                  image: "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400&h=300&fit=crop",
                  description: "Local and imported craft beers, rotating selection",
                  ingredients: ["Hops", "Malt", "Yeast", "Water"],
                  allergens: ["Gluten"],
                  preparationTime: 2
                },
                {
                  id: 6,
                  name: "Caesar Salad",
                  restaurant: "Island Café",
                  category: "Appetizers",
                  price: 245,
                  status: "out-of-stock",
                  rating: 4.4,
                  orders: 123,
                  image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop",
                  description: "Crisp romaine lettuce with parmesan, croutons and caesar dressing",
                  ingredients: ["Romaine", "Parmesan", "Croutons", "Caesar Dressing"],
                  allergens: ["Dairy", "Eggs", "Gluten"],
                  preparationTime: 10
                }
              ].map((item) => (
                <div key={item.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                    <div className="absolute top-4 right-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.status === 'available' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                        item.status === 'out-of-stock' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      }`}>
                        {item.status.replace('-', ' ')}
                      </span>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="px-2 py-1 bg-black bg-opacity-50 text-white text-xs rounded-full">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.name}</h3>
                      <span className="text-lg font-bold text-orange-600">₱{item.price}</span>
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{item.restaurant}</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">{item.description}</p>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-yellow-500">⭐</span>
                        <span className="text-sm font-medium">{item.rating}</span>
                        <span className="text-sm text-gray-500">({item.orders} orders)</span>
                      </div>
                      <span className="text-sm text-gray-500">{item.preparationTime} min</span>
                    </div>

                    <div className="mb-4">
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Ingredients:</p>
                      <div className="flex flex-wrap gap-1">
                        {item.ingredients.slice(0, 3).map((ingredient, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded">
                            {ingredient}
                          </span>
                        ))}
                        {item.ingredients.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded">
                            +{item.ingredients.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {item.allergens.length > 0 && (
                      <div className="mb-4">
                        <p className="text-xs text-red-600 dark:text-red-400 mb-1">Allergens:</p>
                        <div className="flex flex-wrap gap-1">
                          {item.allergens.map((allergen, index) => (
                            <span key={index} className="px-2 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 text-xs rounded">
                              {allergen}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex space-x-2">
                      <button 
                        onClick={() => {
                          setSelectedMenuItem(item);
                          setShowEditMenuItem(true);
                        }}
                        className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => {
                          setSelectedMenuItem(item);
                          setShowViewMenuItem(true);
                        }}
                        className="flex-1 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center">
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <span className="sr-only">Previous</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-orange-50 dark:bg-orange-900 text-sm font-medium text-orange-600 dark:text-orange-400">
                  1
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600">
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
        )}

        {/* Add Menu Item Modal */}
        {showAddMenuItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Add New Menu Item</h2>
                  <button 
                    onClick={() => setShowAddMenuItem(false)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <form className="p-6 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-6">
                    {/* Basic Information */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Basic Information</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Item Name *
                          </label>
                          <input
                            type="text"
                            placeholder="e.g., Grilled Salmon with Herbs"
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Restaurant *
                          </label>
                          <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                            <option value="">Select Restaurant</option>
                            <option value="sunset-grill">Sunset Grill & Bar</option>
                            <option value="island-cafe">Island Café</option>
                            <option value="beach-bar">Beach Bar Lounge</option>
                            <option value="quick-bites">Quick Bites Express</option>
                            <option value="catering">Boracay Catering</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Category *
                          </label>
                          <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                            <option value="">Select Category</option>
                            <option value="appetizers">Appetizers</option>
                            <option value="soups">Soups & Salads</option>
                            <option value="main-course">Main Course</option>
                            <option value="seafood">Seafood</option>
                            <option value="pasta">Pasta & Rice</option>
                            <option value="desserts">Desserts</option>
                            <option value="beverages">Beverages</option>
                            <option value="alcoholic">Alcoholic Drinks</option>
                          </select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Price (₱) *
                            </label>
                            <input
                              type="number"
                              placeholder="0.00"
                              min="0"
                              step="0.01"
                              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Prep Time (minutes) *
                            </label>
                            <input
                              type="number"
                              placeholder="15"
                              min="1"
                              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Description *
                          </label>
                          <textarea
                            rows={3}
                            placeholder="Describe the dish, cooking method, and what makes it special..."
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          ></textarea>
                        </div>
                      </div>
                    </div>

                    {/* Ingredients & Allergens */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Ingredients & Allergens</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Main Ingredients
                          </label>
                          <input
                            type="text"
                            placeholder="e.g., Salmon, Herbs, Lemon, Olive Oil (separate with commas)"
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Allergens
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            {['Dairy', 'Eggs', 'Fish', 'Shellfish', 'Nuts', 'Peanuts', 'Soy', 'Gluten'].map((allergen) => (
                              <label key={allergen} className="flex items-center">
                                <input
                                  type="checkbox"
                                  className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                                />
                                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{allergen}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Dietary Options
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            {['Vegetarian', 'Vegan', 'Gluten-Free', 'Keto-Friendly', 'Low-Carb', 'Spicy'].map((option) => (
                              <label key={option} className="flex items-center">
                                <input
                                  type="checkbox"
                                  className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                                />
                                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{option}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    {/* Image Upload */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Item Images</h3>
                      
                      <div className="space-y-4">
                        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                          <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <div className="mt-4">
                            <label htmlFor="file-upload" className="cursor-pointer">
                              <span className="mt-2 block text-sm font-medium text-gray-900 dark:text-white">
                                Upload main image
                              </span>
                              <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" />
                            </label>
                            <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center">
                              <svg className="mx-auto h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                              <p className="mt-1 text-xs text-gray-500">Additional</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Availability & Status */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Availability & Status</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Status
                          </label>
                          <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                            <option value="available">Available</option>
                            <option value="out-of-stock">Out of Stock</option>
                            <option value="seasonal">Seasonal</option>
                            <option value="limited">Limited Time</option>
                          </select>
                        </div>

                        <div>
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                            />
                            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Available for delivery</span>
                          </label>
                        </div>

                        <div>
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                            />
                            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Available for takeout</span>
                          </label>
                        </div>

                        <div>
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                            />
                            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Featured item</span>
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Nutritional Information */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Nutritional Information (Optional)</h3>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Calories
                          </label>
                          <input
                            type="number"
                            placeholder="0"
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Protein (g)
                          </label>
                          <input
                            type="number"
                            placeholder="0"
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Carbs (g)
                          </label>
                          <input
                            type="number"
                            placeholder="0"
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Fat (g)
                          </label>
                          <input
                            type="number"
                            placeholder="0"
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <button
                    type="button"
                    onClick={() => setShowAddMenuItem(false)}
                    className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Save as Draft
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Add Menu Item
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Menu Item Modal */}
        {showEditMenuItem && selectedMenuItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Edit Menu Item</h2>
                  <button 
                    onClick={() => {
                      setShowEditMenuItem(false);
                      setSelectedMenuItem(null);
                    }}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <form className="p-6 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-6">
                    {/* Basic Information */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Basic Information</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Item Name *
                          </label>
                          <input
                            type="text"
                            defaultValue={selectedMenuItem.name}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Restaurant *
                          </label>
                          <select 
                            defaultValue={selectedMenuItem.restaurant}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          >
                            <option value="Sunset Grill & Bar">Sunset Grill & Bar</option>
                            <option value="Island Café">Island Café</option>
                            <option value="Beach Bar Lounge">Beach Bar Lounge</option>
                            <option value="Quick Bites Express">Quick Bites Express</option>
                            <option value="Boracay Catering">Boracay Catering</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Category *
                          </label>
                          <select 
                            defaultValue={selectedMenuItem.category}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          >
                            <option value="Appetizers">Appetizers</option>
                            <option value="Main Course">Main Course</option>
                            <option value="Desserts">Desserts</option>
                            <option value="Beverages">Beverages</option>
                            <option value="Alcoholic">Alcoholic</option>
                          </select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Price (₱) *
                            </label>
                            <input
                              type="number"
                              defaultValue={selectedMenuItem.price}
                              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Prep Time (minutes) *
                            </label>
                            <input
                              type="number"
                              defaultValue={selectedMenuItem.preparationTime}
                              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Description *
                          </label>
                          <textarea
                            rows={3}
                            defaultValue={selectedMenuItem.description}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Status *
                          </label>
                          <select 
                            defaultValue={selectedMenuItem.status}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          >
                            <option value="available">Available</option>
                            <option value="out-of-stock">Out of Stock</option>
                            <option value="seasonal">Seasonal</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    {/* Current Image */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Current Image</h3>
                      <div className="mb-4">
                        <img 
                          src={selectedMenuItem.image} 
                          alt={selectedMenuItem.name}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      </div>
                      
                      <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <div className="mt-4">
                          <label htmlFor="edit-file-upload" className="cursor-pointer">
                            <span className="mt-2 block text-sm font-medium text-gray-900 dark:text-white">
                              Upload new image
                            </span>
                            <input id="edit-file-upload" name="edit-file-upload" type="file" className="sr-only" accept="image/*" />
                          </label>
                          <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        </div>
                      </div>
                    </div>

                    {/* Ingredients & Allergens */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Ingredients & Allergens</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Main Ingredients
                          </label>
                          <input
                            type="text"
                            defaultValue={selectedMenuItem.ingredients.join(', ')}
                            placeholder="e.g., Chicken, Rice, Vegetables"
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Allergens
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            {['Dairy', 'Eggs', 'Fish', 'Shellfish', 'Tree Nuts', 'Peanuts', 'Wheat/Gluten', 'Soy'].map((allergen) => (
                              <label key={allergen} className="flex items-center">
                                <input
                                  type="checkbox"
                                  defaultChecked={selectedMenuItem.allergens.includes(allergen)}
                                  className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                                />
                                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{allergen}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <button
                    type="button"
                    onClick={() => {
                      setShowEditMenuItem(false);
                      setSelectedMenuItem(null);
                    }}
                    className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Delete Item
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* View Menu Item Details Modal */}
        {showViewMenuItem && selectedMenuItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Menu Item Details</h2>
                  <button 
                    onClick={() => {
                      setShowViewMenuItem(false);
                      setSelectedMenuItem(null);
                    }}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column - Image and Basic Info */}
                  <div className="space-y-6">
                    <div>
                      <img 
                        src={selectedMenuItem.image} 
                        alt={selectedMenuItem.name}
                        className="w-full h-64 object-cover rounded-lg"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedMenuItem.name}</h3>
                          <p className="text-lg text-gray-600 dark:text-gray-400">{selectedMenuItem.restaurant}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-orange-600">₱{selectedMenuItem.price}</p>
                          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                            selectedMenuItem.status === 'available' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                            selectedMenuItem.status === 'out-of-stock' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                            'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                          }`}>
                            {selectedMenuItem.status.replace('-', ' ')}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center space-x-4">
                          <span className="text-yellow-500 text-lg">⭐</span>
                          <span className="font-medium">{selectedMenuItem.rating}</span>
                          <span className="text-gray-500">({selectedMenuItem.orders} orders)</span>
                        </div>

                        <div className="flex items-center space-x-4">
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-gray-700 dark:text-gray-300">Preparation time: {selectedMenuItem.preparationTime} minutes</span>
                        </div>

                        <div className="flex items-center space-x-4">
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                          </svg>
                          <span className="text-gray-700 dark:text-gray-300">Category: {selectedMenuItem.category}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Details */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Description</h4>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{selectedMenuItem.description}</p>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Ingredients</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedMenuItem.ingredients.map((ingredient: string, index: number) => (
                          <span key={index} className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full">
                            {ingredient}
                          </span>
                        ))}
                      </div>
                    </div>

                    {selectedMenuItem.allergens.length > 0 && (
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Allergen Information</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedMenuItem.allergens.map((allergen: string, index: number) => (
                            <span key={index} className="px-3 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 text-sm rounded-full">
                              ⚠️ {allergen}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Performance Metrics</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                          <p className="text-sm text-gray-600 dark:text-gray-400">Total Orders</p>
                          <p className="text-xl font-bold text-gray-900 dark:text-white">{selectedMenuItem.orders}</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                          <p className="text-sm text-gray-600 dark:text-gray-400">Average Rating</p>
                          <p className="text-xl font-bold text-gray-900 dark:text-white">{selectedMenuItem.rating}/5</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                          <p className="text-sm text-gray-600 dark:text-gray-400">Revenue Generated</p>
                          <p className="text-xl font-bold text-gray-900 dark:text-white">₱{(selectedMenuItem.orders * selectedMenuItem.price).toLocaleString()}</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                          <p className="text-sm text-gray-600 dark:text-gray-400">Popularity Rank</p>
                          <p className="text-xl font-bold text-gray-900 dark:text-white">#3</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700 mt-8">
                  <button
                    onClick={() => {
                      setShowViewMenuItem(false);
                      setShowEditMenuItem(true);
                    }}
                    className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Edit Item
                  </button>
                  <button
                    onClick={() => {
                      setShowViewMenuItem(false);
                      setSelectedMenuItem(null);
                    }}
                    className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other tabs placeholders */}
        {activeTab !== 'overview' && activeTab !== 'restaurants' && activeTab !== 'menu' && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} section coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
} 