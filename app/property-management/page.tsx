'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Property {
  id: string;
  name: string;
  type: 'hotel' | 'resort' | 'apartment' | 'villa' | 'hostel';
  status: 'active' | 'maintenance' | 'inactive' | 'pending';
  location: string;
  address: string;
  rating: number;
  totalRooms: number;
  availableRooms: number;
  images: string[];
  amenities: string[];
  pricing: {
    standard: number;
    deluxe: number;
    suite: number;
  };
  contact: {
    phone: string;
    email: string;
    manager: string;
  };
  documents: {
    businessPermit: { uploaded: boolean; expiry: string };
    firePermit: { uploaded: boolean; expiry: string };
    dotAccreditation: { uploaded: boolean; expiry: string };
  };
  earnings: {
    today: number;
    thisWeek: number;
    thisMonth: number;
  };
  bookings: {
    total: number;
    confirmed: number;
    cancelled: number;
    checkInsToday: number;
    checkOutsToday: number;
  };
  occupancyRate: number;
}

export default function PropertyManagement() {
  const [activeTab, setActiveTab] = useState<'overview' | 'properties' | 'rooms' | 'bookings' | 'earnings' | 'analytics'>('overview');
  const [showAddProperty, setShowAddProperty] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'maintenance' | 'inactive' | 'pending'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'hotel' | 'resort' | 'apartment' | 'villa' | 'hostel'>('all');
  const [showAddRoom, setShowAddRoom] = useState(false);

  // Mock data
  const ownerInfo = {
    name: "Boracay Hospitality Group",
    email: "owner@boracayhospitality.com",
    phone: "+63 917 123 4567",
    address: "456 Tourism Boulevard, Boracay, Aklan",
    license: "DOT-2024-BHG-001",
    rating: 4.6,
    totalProperties: 8,
    totalRooms: 156
  };

  const properties: Property[] = [
    {
      id: 'PROP001',
      name: 'Grand Palace Hotel Boracay',
      type: 'hotel',
      status: 'active',
      location: 'Station 1, Boracay',
      address: 'White Beach, Station 1, Boracay Island, Aklan',
      rating: 4.8,
      totalRooms: 45,
      availableRooms: 12,
      images: [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop'
      ],
      amenities: ['Swimming Pool', 'Restaurant', 'Spa', 'WiFi', 'Beach Access', 'Gym'],
      pricing: {
        standard: 3500,
        deluxe: 5500,
        suite: 8500
      },
      contact: {
        phone: '+63 917 111 1111',
        email: 'reservations@grandpalace.com',
        manager: 'Maria Elena Santos'
      },
      documents: {
        businessPermit: { uploaded: true, expiry: '2025-12-31' },
        firePermit: { uploaded: true, expiry: '2025-06-30' },
        dotAccreditation: { uploaded: true, expiry: '2026-03-15' }
      },
      earnings: {
        today: 45000,
        thisWeek: 285000,
        thisMonth: 1250000
      },
      bookings: {
        total: 234,
        confirmed: 198,
        cancelled: 36,
        checkInsToday: 8,
        checkOutsToday: 12
      },
      occupancyRate: 73
    },
    {
      id: 'PROP002',
      name: 'Sunset Beach Resort',
      type: 'resort',
      status: 'active',
      location: 'Station 3, Boracay',
      address: 'Sunset Point, Station 3, Boracay Island, Aklan',
      rating: 4.5,
      totalRooms: 32,
      availableRooms: 8,
      images: [
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop'
      ],
      amenities: ['Private Beach', 'Restaurant', 'Bar', 'WiFi', 'Water Sports', 'Spa'],
      pricing: {
        standard: 4200,
        deluxe: 6800,
        suite: 12000
      },
      contact: {
        phone: '+63 917 222 2222',
        email: 'info@sunsetbeach.com',
        manager: 'Roberto Cruz'
      },
      documents: {
        businessPermit: { uploaded: true, expiry: '2025-12-31' },
        firePermit: { uploaded: true, expiry: '2025-06-30' },
        dotAccreditation: { uploaded: true, expiry: '2026-03-15' }
      },
      earnings: {
        today: 38000,
        thisWeek: 245000,
        thisMonth: 980000
      },
      bookings: {
        total: 189,
        confirmed: 165,
        cancelled: 24,
        checkInsToday: 6,
        checkOutsToday: 9
      },
      occupancyRate: 75
    },
    {
      id: 'PROP003',
      name: 'Boracay Villa Paradise',
      type: 'villa',
      status: 'active',
      location: 'Bulabog Beach, Boracay',
      address: 'Bulabog Beach Road, Boracay Island, Aklan',
      rating: 4.7,
      totalRooms: 8,
      availableRooms: 2,
      images: [
        'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=400&h=300&fit=crop'
      ],
      amenities: ['Private Pool', 'Kitchen', 'WiFi', 'Garden', 'BBQ Area', 'Parking'],
      pricing: {
        standard: 8500,
        deluxe: 12000,
        suite: 18000
      },
      contact: {
        phone: '+63 917 333 3333',
        email: 'villa@paradise.com',
        manager: 'Carmen Dela Cruz'
      },
      documents: {
        businessPermit: { uploaded: true, expiry: '2025-12-31' },
        firePermit: { uploaded: false, expiry: '2025-06-30' },
        dotAccreditation: { uploaded: true, expiry: '2026-03-15' }
      },
      earnings: {
        today: 25000,
        thisWeek: 168000,
        thisMonth: 650000
      },
      bookings: {
        total: 89,
        confirmed: 82,
        cancelled: 7,
        checkInsToday: 2,
        checkOutsToday: 3
      },
      occupancyRate: 75
    }
  ];

  // Helper functions for styling
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'inactive': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'pending': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'hotel': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'resort': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'villa': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'apartment': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'hostel': return 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  // Filter properties
  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         property.contact.manager.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || property.status === statusFilter;
    const matchesType = typeFilter === 'all' || property.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const totalEarnings = properties.reduce((sum, prop) => sum + prop.earnings.thisMonth, 0);
  const totalBookings = properties.reduce((sum, prop) => sum + prop.bookings.total, 0);
  const averageOccupancy = properties.reduce((sum, prop) => sum + prop.occupancyRate, 0) / properties.length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Property Management</h1>
              <p className="text-gray-600 dark:text-gray-400">{ownerInfo.name}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600 dark:text-gray-400">License: {ownerInfo.license}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Rating: {ownerInfo.rating} ⭐</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'properties', label: 'Properties' },
              { id: 'rooms', label: 'Room Management' },
              { id: 'bookings', label: 'Bookings' },
              { id: 'earnings', label: 'Earnings' },
              { id: 'analytics', label: 'Analytics' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
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
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m0 0h2M7 7h10M7 11h10M7 15h10" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Properties</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">{properties.length}</p>
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
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Monthly Earnings</p>
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
                  <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                    <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Occupancy</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">{averageOccupancy.toFixed(1)}%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Properties */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Properties</h3>
              <div className="space-y-4">
                {properties.slice(0, 3).map((property) => (
                  <div key={property.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <img src={property.images[0]} alt={property.name} className="w-16 h-16 object-cover rounded-lg" />
                      <div>
                        <h4 className="font-medium">{property.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{property.location}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(property.status)}`}>
                            {property.status}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(property.type)}`}>
                            {property.type}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₱{property.earnings.thisMonth.toLocaleString()}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{property.occupancyRate}% occupied</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Properties Tab */}
        {activeTab === 'properties' && (
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
                      placeholder="Search properties by name, location, or manager..."
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
                    <option value="maintenance">Maintenance</option>
                    <option value="inactive">Inactive</option>
                    <option value="pending">Pending</option>
                  </select>

                  {/* Type Filter */}
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value as any)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Types</option>
                    <option value="hotel">Hotel</option>
                    <option value="resort">Resort</option>
                    <option value="villa">Villa</option>
                    <option value="apartment">Apartment</option>
                    <option value="hostel">Hostel</option>
                  </select>

                  {/* Add Property Button */}
                  <button 
                    onClick={() => setShowAddProperty(true)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center space-x-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Add Property</span>
                  </button>
                </div>
              </div>

              {/* Search Results Info */}
              {searchQuery && (
                <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                  Found {filteredProperties.length} propert{filteredProperties.length !== 1 ? 'ies' : 'y'} matching "{searchQuery}"
                </div>
              )}
            </div>

            {/* Properties Grid */}
            {filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProperties.map((property) => (
                  <div key={property.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <img src={property.images[0]} alt={property.name} className="w-full h-48 object-cover" />
                      <div className="absolute top-4 right-4 flex space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(property.status)}`}>
                          {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(property.type)}`}>
                          {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
                        </span>
                      </div>
                      <div className="absolute bottom-4 left-4">
                        <div className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                          {property.rating} ⭐ ({property.totalRooms} rooms)
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold mb-1">{property.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{property.location}</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">Available Rooms</p>
                          <p className="font-medium">{property.availableRooms}/{property.totalRooms}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">Occupancy Rate</p>
                          <p className="font-medium">{property.occupancyRate}%</p>
                        </div>
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">Manager</p>
                          <p className="font-medium">{property.contact.manager}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">Monthly Earnings</p>
                          <p className="font-medium text-green-600">₱{property.earnings.thisMonth.toLocaleString()}</p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Today's Activity</p>
                        <div className="flex justify-between text-sm">
                          <span>Check-ins: <span className="font-medium text-green-600">{property.bookings.checkInsToday}</span></span>
                          <span>Check-outs: <span className="font-medium text-blue-600">{property.bookings.checkOutsToday}</span></span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Pricing (per night)</p>
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded">
                            <p className="font-medium">₱{property.pricing.standard.toLocaleString()}</p>
                            <p className="text-gray-600 dark:text-gray-400">Standard</p>
                          </div>
                          <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded">
                            <p className="font-medium">₱{property.pricing.deluxe.toLocaleString()}</p>
                            <p className="text-gray-600 dark:text-gray-400">Deluxe</p>
                          </div>
                          <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded">
                            <p className="font-medium">₱{property.pricing.suite.toLocaleString()}</p>
                            <p className="text-gray-600 dark:text-gray-400">Suite</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <button 
                          onClick={() => setSelectedProperty(property)}
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
                  {searchQuery ? 'No properties found' : 'No properties available'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {searchQuery 
                    ? 'Try adjusting your search criteria or filters' 
                    : 'Add your first property to get started'
                  }
                </p>
                {!searchQuery && (
                  <button 
                    onClick={() => setShowAddProperty(true)}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Add Your First Property
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* Add Property Modal */}
        {showAddProperty && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold">Add New Property</h3>
                  <button 
                    onClick={() => setShowAddProperty(false)}
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
                      <label className="block text-sm font-medium mb-2">Property Name</label>
                      <input 
                        type="text" 
                        placeholder="e.g., Grand Palace Hotel"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Property Type</label>
                      <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option value="">Select Type</option>
                        <option value="hotel">Hotel</option>
                        <option value="resort">Resort</option>
                        <option value="villa">Villa</option>
                        <option value="apartment">Apartment</option>
                        <option value="hostel">Hostel</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Location</label>
                      <input 
                        type="text" 
                        placeholder="e.g., Station 1, Boracay"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Status</label>
                      <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option value="active">Active</option>
                        <option value="maintenance">Maintenance</option>
                        <option value="inactive">Inactive</option>
                        <option value="pending">Pending</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Full Address</label>
                    <textarea 
                      rows={3}
                      placeholder="Complete address of the property"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Total Rooms</label>
                      <input 
                        type="number" 
                        placeholder="e.g., 45"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Standard Rate (₱/night)</label>
                      <input 
                        type="number" 
                        placeholder="e.g., 3500"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Deluxe Rate (₱/night)</label>
                      <input 
                        type="number" 
                        placeholder="e.g., 5500"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Suite Rate (₱/night)</label>
                      <input 
                        type="number" 
                        placeholder="e.g., 8500"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Manager Name</label>
                      <input 
                        type="text" 
                        placeholder="e.g., Maria Elena Santos"
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
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Contact Email</label>
                    <input 
                      type="email" 
                      placeholder="e.g., reservations@grandpalace.com"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Property Images</label>
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                      <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <p className="text-gray-600 dark:text-gray-400 mb-2">Click to upload or drag and drop</p>
                      <p className="text-sm text-gray-500 dark:text-gray-500">PNG, JPG, GIF up to 10MB each</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Amenities</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {[
                        'Swimming Pool', 'Restaurant', 'Spa', 'WiFi', 'Gym', 'Beach Access', 
                        'Parking', 'Bar', 'Room Service', 'Laundry', 'Airport Shuttle', 'Pet Friendly',
                        'Business Center', 'Conference Room', 'Kids Club', 'Water Sports'
                      ].map((amenity) => (
                        <label key={amenity} className="flex items-center">
                          <input type="checkbox" className="mr-2 rounded" />
                          <span className="text-sm">{amenity}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button 
                      type="button"
                      onClick={() => setShowAddProperty(false)}
                      className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                    >
                      Add Property
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Property Details Modal */}
        {selectedProperty && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold">{selectedProperty.name} - Details</h3>
                  <button 
                    onClick={() => setSelectedProperty(null)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column - Images and Basic Info */}
                  <div className="space-y-6">
                    <div>
                      <img 
                        src={selectedProperty.images[0]} 
                        alt={selectedProperty.name} 
                        className="w-full h-64 object-cover rounded-lg mb-4" 
                      />
                      <div className="grid grid-cols-2 gap-2">
                        {selectedProperty.images.slice(1).map((image, index) => (
                          <img 
                            key={index}
                            src={image} 
                            alt={`${selectedProperty.name} ${index + 2}`} 
                            className="w-full h-32 object-cover rounded-lg" 
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <h4 className="font-semibold mb-3">Property Information</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">Type</p>
                          <p className="font-medium capitalize">{selectedProperty.type}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">Status</p>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedProperty.status)}`}>
                            {selectedProperty.status.charAt(0).toUpperCase() + selectedProperty.status.slice(1)}
                          </span>
                        </div>
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">Rating</p>
                          <p className="font-medium">{selectedProperty.rating} ⭐</p>
                        </div>
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">Total Rooms</p>
                          <p className="font-medium">{selectedProperty.totalRooms}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">Available Rooms</p>
                          <p className="font-medium text-green-600">{selectedProperty.availableRooms}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">Occupancy Rate</p>
                          <p className="font-medium">{selectedProperty.occupancyRate}%</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <h4 className="font-semibold mb-3">Contact Information</h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">Manager</p>
                          <p className="font-medium">{selectedProperty.contact.manager}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">Phone</p>
                          <p className="font-medium">{selectedProperty.contact.phone}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">Email</p>
                          <p className="font-medium">{selectedProperty.contact.email}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">Address</p>
                          <p className="font-medium">{selectedProperty.address}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <h4 className="font-semibold mb-3">Amenities</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProperty.amenities.map((amenity, index) => (
                          <span key={index} className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Statistics and Performance */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-4">Earnings Overview</h4>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <p className="text-lg font-bold text-green-600">₱{selectedProperty.earnings.today.toLocaleString()}</p>
                          <p className="text-sm text-green-800 dark:text-green-400">Today</p>
                        </div>
                        <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <p className="text-lg font-bold text-blue-600">₱{selectedProperty.earnings.thisWeek.toLocaleString()}</p>
                          <p className="text-sm text-blue-800 dark:text-blue-400">This Week</p>
                        </div>
                        <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                          <p className="text-lg font-bold text-purple-600">₱{selectedProperty.earnings.thisMonth.toLocaleString()}</p>
                          <p className="text-sm text-purple-800 dark:text-purple-400">This Month</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-4">Booking Statistics</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <p className="text-lg font-bold">{selectedProperty.bookings.total}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Total Bookings</p>
                        </div>
                        <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <p className="text-lg font-bold text-green-600">{selectedProperty.bookings.confirmed}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Confirmed</p>
                        </div>
                        <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <p className="text-lg font-bold text-red-600">{selectedProperty.bookings.cancelled}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Cancelled</p>
                        </div>
                        <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <p className="text-lg font-bold text-blue-600">{selectedProperty.occupancyRate}%</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Occupancy</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-4">Today's Activity</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <p className="text-2xl font-bold text-green-600">{selectedProperty.bookings.checkInsToday}</p>
                          <p className="text-sm text-green-800 dark:text-green-400">Check-ins</p>
                        </div>
                        <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <p className="text-2xl font-bold text-blue-600">{selectedProperty.bookings.checkOutsToday}</p>
                          <p className="text-sm text-blue-800 dark:text-blue-400">Check-outs</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-4">Room Pricing (per night)</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <span className="font-medium">Standard Room</span>
                          <span className="text-lg font-bold text-green-600">₱{selectedProperty.pricing.standard.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <span className="font-medium">Deluxe Room</span>
                          <span className="text-lg font-bold text-blue-600">₱{selectedProperty.pricing.deluxe.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <span className="font-medium">Suite</span>
                          <span className="text-lg font-bold text-purple-600">₱{selectedProperty.pricing.suite.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-4">Documents Status</h4>
                      <div className="space-y-3">
                        {Object.entries(selectedProperty.documents).map(([doc, info]) => (
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
                    Edit Property
                  </button>
                  <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                    Manage Rooms
                  </button>
                  <button className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors">
                    View Bookings
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Room Management Tab */}
        {activeTab === 'rooms' && (
          <div className="space-y-6">
            {/* Room Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Rooms</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">156</p>
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
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Available</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">42</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
                    <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Occupied</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">98</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                    <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Maintenance</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">16</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Search and Filter Bar */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                      type="text"
                      placeholder="Search rooms by number, type, or guest name..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <select 
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as any)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Status</option>
                    <option value="available">Available</option>
                    <option value="occupied">Occupied</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="cleaning">Cleaning</option>
                  </select>
                  <select 
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value as any)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Types</option>
                    <option value="standard">Standard</option>
                    <option value="deluxe">Deluxe</option>
                    <option value="suite">Suite</option>
                    <option value="family">Family</option>
                  </select>
                  <button 
                    onClick={() => setShowAddRoom(true)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Add Room
                  </button>
                </div>
              </div>
            </div>

            {/* Room Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {/* Room Card 1 */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=300&h=200&fit=crop" 
                    alt="Room 101" 
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full text-xs font-medium">
                      Available
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded text-xs font-medium">
                      Deluxe
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold">Room 101</h3>
                    <p className="text-lg font-bold text-blue-600">₱5,500</p>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Grand Palace Hotel Boracay</p>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Capacity</p>
                      <p className="font-medium">2 Adults</p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Size</p>
                      <p className="font-medium">35 sqm</p>
                    </div>
                  </div>

                  <div className="mb-3">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Amenities</p>
                    <div className="flex flex-wrap gap-1">
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs">AC</span>
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs">WiFi</span>
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs">TV</span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
                      View Details
                    </button>
                    <button className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg text-sm font-medium transition-colors">
                      Edit
                    </button>
                  </div>
                </div>
              </div>

              {/* Room Card 2 */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1618773928121-c33d57733427?w=300&h=200&fit=crop" 
                    alt="Room 102" 
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 rounded-full text-xs font-medium">
                      Occupied
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 rounded text-xs font-medium">
                      Suite
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold">Room 102</h3>
                    <p className="text-lg font-bold text-blue-600">₱8,500</p>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Grand Palace Hotel Boracay</p>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Capacity</p>
                      <p className="font-medium">4 Adults</p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Size</p>
                      <p className="font-medium">65 sqm</p>
                    </div>
                  </div>

                  <div className="mb-3">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Guest</p>
                    <p className="font-medium text-sm">John & Sarah Smith</p>
                    <p className="text-xs text-gray-500">Check-out: Dec 18, 2024</p>
                  </div>

                  <div className="flex space-x-2">
                    <button className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
                      View Details
                    </button>
                    <button className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg text-sm font-medium transition-colors">
                      Contact
                    </button>
                  </div>
                </div>
              </div>

              {/* Room Card 3 */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1590490360182-c33d57733427?w=300&h=200&fit=crop" 
                    alt="Room 103" 
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 rounded-full text-xs font-medium">
                      Maintenance
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200 rounded text-xs font-medium">
                      Standard
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold">Room 103</h3>
                    <p className="text-lg font-bold text-blue-600">₱3,500</p>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Grand Palace Hotel Boracay</p>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Capacity</p>
                      <p className="font-medium">2 Adults</p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Size</p>
                      <p className="font-medium">25 sqm</p>
                    </div>
                  </div>

                  <div className="mb-3">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Maintenance Issue</p>
                    <p className="font-medium text-sm text-yellow-600">AC Unit Repair</p>
                    <p className="text-xs text-gray-500">Est. completion: Dec 16, 2024</p>
                  </div>

                  <div className="flex space-x-2">
                    <button className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
                      View Details
                    </button>
                    <button className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg text-sm font-medium transition-colors">
                      Update
                    </button>
                  </div>
                </div>
              </div>

              {/* Room Card 4 */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=300&h=200&fit=crop" 
                    alt="Room 201" 
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-xs font-medium">
                      Cleaning
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-1 bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 rounded text-xs font-medium">
                      Family
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold">Room 201</h3>
                    <p className="text-lg font-bold text-blue-600">₱6,500</p>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Grand Palace Hotel Boracay</p>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Capacity</p>
                      <p className="font-medium">6 Adults</p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Size</p>
                      <p className="font-medium">45 sqm</p>
                    </div>
                  </div>

                  <div className="mb-3">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Cleaning Status</p>
                    <p className="font-medium text-sm text-blue-600">Deep Cleaning</p>
                    <p className="text-xs text-gray-500">Est. completion: 2:00 PM</p>
                  </div>

                  <div className="flex space-x-2">
                    <button className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
                      View Details
                    </button>
                    <button className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg text-sm font-medium transition-colors">
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Room Status Legend */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Room Status Legend</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                  <span className="text-sm">Available - Ready for booking</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                  <span className="text-sm">Occupied - Guest checked in</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                  <span className="text-sm">Maintenance - Under repair</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                  <span className="text-sm">Cleaning - Being cleaned</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add Room Modal */}
        {showAddRoom && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold">Add New Room</h3>
                  <button 
                    onClick={() => setShowAddRoom(false)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <form className="space-y-6">
                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Room Number</label>
                      <input 
                        type="text" 
                        placeholder="e.g., 101, A-205"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Property</label>
                      <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option value="">Select Property</option>
                        <option value="grand-palace">Grand Palace Hotel Boracay</option>
                        <option value="sunset-resort">Sunset Beach Resort</option>
                        <option value="paradise-villa">Paradise Villa</option>
                        <option value="ocean-view">Ocean View Apartments</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Room Type</label>
                      <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option value="">Select Type</option>
                        <option value="standard">Standard</option>
                        <option value="deluxe">Deluxe</option>
                        <option value="suite">Suite</option>
                        <option value="family">Family</option>
                        <option value="presidential">Presidential</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Floor</label>
                      <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option value="">Select Floor</option>
                        <option value="ground">Ground Floor</option>
                        <option value="1">1st Floor</option>
                        <option value="2">2nd Floor</option>
                        <option value="3">3rd Floor</option>
                        <option value="4">4th Floor</option>
                        <option value="5">5th Floor</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Status</label>
                      <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option value="available">Available</option>
                        <option value="maintenance">Under Maintenance</option>
                        <option value="cleaning">Cleaning</option>
                        <option value="out-of-order">Out of Order</option>
                      </select>
                    </div>
                  </div>

                  {/* Room Specifications */}
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                    <h4 className="text-lg font-medium mb-4">Room Specifications</h4>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Size (sqm)</label>
                        <input 
                          type="number" 
                          placeholder="25"
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Max Adults</label>
                        <input 
                          type="number" 
                          placeholder="2"
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Max Children</label>
                        <input 
                          type="number" 
                          placeholder="1"
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Beds</label>
                        <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                          <option value="">Select Bed Type</option>
                          <option value="single">1 Single Bed</option>
                          <option value="double">1 Double Bed</option>
                          <option value="queen">1 Queen Bed</option>
                          <option value="king">1 King Bed</option>
                          <option value="twin">2 Twin Beds</option>
                          <option value="bunk">Bunk Beds</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                    <h4 className="text-lg font-medium mb-4">Pricing</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Base Rate (₱/night)</label>
                        <input 
                          type="number" 
                          placeholder="3500"
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Weekend Rate (₱/night)</label>
                        <input 
                          type="number" 
                          placeholder="4200"
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Peak Season Rate (₱/night)</label>
                        <input 
                          type="number" 
                          placeholder="5500"
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                    <h4 className="text-lg font-medium mb-4">Room Amenities</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        'Air Conditioning', 'WiFi', 'TV', 'Mini Bar', 'Safe', 'Balcony',
                        'Ocean View', 'Garden View', 'Bathtub', 'Shower', 'Hair Dryer',
                        'Coffee Maker', 'Refrigerator', 'Microwave', 'Iron', 'Telephone'
                      ].map((amenity) => (
                        <label key={amenity} className="flex items-center space-x-2">
                          <input 
                            type="checkbox" 
                            className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm">{amenity}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Room Features */}
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                    <h4 className="text-lg font-medium mb-4">Special Features</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {[
                        'Wheelchair Accessible', 'Pet Friendly', 'Smoking Allowed',
                        'Kitchenette', 'Living Area', 'Work Desk', 'Connecting Rooms',
                        'Private Entrance', 'Soundproof'
                      ].map((feature) => (
                        <label key={feature} className="flex items-center space-x-2">
                          <input 
                            type="checkbox" 
                            className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm">{feature}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Room Images */}
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                    <h4 className="text-lg font-medium mb-4">Room Images</h4>
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6">
                      <div className="text-center">
                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <div className="mt-4">
                          <label htmlFor="room-images" className="cursor-pointer">
                            <span className="mt-2 block text-sm font-medium text-gray-900 dark:text-white">
                              Upload room images
                            </span>
                            <input id="room-images" name="room-images" type="file" multiple accept="image/*" className="sr-only" />
                          </label>
                          <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF up to 10MB each</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                    <h4 className="text-lg font-medium mb-4">Room Description</h4>
                    <textarea 
                      rows={4}
                      placeholder="Describe the room, its features, and what makes it special..."
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    ></textarea>
                  </div>

                  {/* Housekeeping */}
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                    <h4 className="text-lg font-medium mb-4">Housekeeping Settings</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Cleaning Time (minutes)</label>
                        <input 
                          type="number" 
                          placeholder="30"
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Maintenance Schedule</label>
                        <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                          <option value="weekly">Weekly</option>
                          <option value="bi-weekly">Bi-weekly</option>
                          <option value="monthly">Monthly</option>
                          <option value="quarterly">Quarterly</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </form>

                <div className="flex justify-end space-x-4 pt-6 mt-6 border-t border-gray-200 dark:border-gray-700">
                  <button 
                    onClick={() => setShowAddRoom(false)}
                    className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                    Add Room
                  </button>
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
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">1,847</p>
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
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">1,623</p>
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
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Check-ins Today</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">24</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                    <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Check-outs Today</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">18</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                    <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Today's Revenue</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">₱185,500</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Search and Filter Bar */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                      type="text"
                      placeholder="Search by booking ID, guest name, or room number..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="all">All Status</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="checked-in">Checked In</option>
                    <option value="checked-out">Checked Out</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="no-show">No Show</option>
                  </select>
                  <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="all">All Properties</option>
                    <option value="grand-palace">Grand Palace Hotel</option>
                    <option value="sunset-resort">Sunset Beach Resort</option>
                    <option value="paradise-villa">Paradise Villa</option>
                  </select>
                  <input 
                    type="date" 
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
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
                        Guest
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Property & Room
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Dates
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Guests
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
                          <p className="text-sm font-medium text-gray-900 dark:text-white">#BK-2024-001</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Dec 10, 2024</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img className="h-10 w-10 rounded-full object-cover" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop" alt="John Smith" />
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">John Smith</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">john.smith@email.com</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">Grand Palace Hotel</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Room 101 - Deluxe</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p className="text-sm text-gray-900 dark:text-white">Dec 15 - Dec 18</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">3 nights</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p className="text-sm text-gray-900 dark:text-white">2 Adults</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">1 Child</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">₱16,500</p>
                          <p className="text-sm text-green-600">Paid</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          Confirmed
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                            View
                          </button>
                          <button className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300">
                            Check-in
                          </button>
                          <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                            Cancel
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* Booking Row 2 */}
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">#BK-2024-002</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Dec 12, 2024</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img className="h-10 w-10 rounded-full object-cover" src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop" alt="Sarah Johnson" />
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">Sarah Johnson</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">sarah.j@email.com</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">Sunset Beach Resort</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Room 205 - Suite</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p className="text-sm text-gray-900 dark:text-white">Dec 14 - Dec 16</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">2 nights</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p className="text-sm text-gray-900 dark:text-white">2 Adults</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">₱17,000</p>
                          <p className="text-sm text-green-600">Paid</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                          Checked In
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                            View
                          </button>
                          <button className="text-purple-600 hover:text-purple-900 dark:text-purple-400 dark:hover:text-purple-300">
                            Check-out
                          </button>
                          <button className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300">
                            Message
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* Booking Row 3 */}
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">#BK-2024-003</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Dec 11, 2024</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img className="h-10 w-10 rounded-full object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop" alt="Michael Chen" />
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">Michael Chen</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">m.chen@email.com</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">Paradise Villa</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Villa A - Family</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p className="text-sm text-gray-900 dark:text-white">Dec 20 - Dec 25</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">5 nights</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p className="text-sm text-gray-900 dark:text-white">4 Adults</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">2 Children</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">₱42,500</p>
                          <p className="text-sm text-yellow-600">Pending</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                          Pending Payment
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                            View
                          </button>
                          <button className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300">
                            Confirm
                          </button>
                          <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                            Cancel
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* Booking Row 4 */}
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">#BK-2024-004</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Dec 09, 2024</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img className="h-10 w-10 rounded-full object-cover" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop" alt="Emma Wilson" />
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">Emma Wilson</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">emma.w@email.com</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">Grand Palace Hotel</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Room 302 - Standard</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p className="text-sm text-gray-900 dark:text-white">Dec 12 - Dec 14</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">2 nights</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p className="text-sm text-gray-900 dark:text-white">1 Adult</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">₱7,000</p>
                          <p className="text-sm text-green-600">Paid</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                          Checked Out
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                            View
                          </button>
                          <button className="text-orange-600 hover:text-orange-900 dark:text-orange-400 dark:hover:text-orange-300">
                            Review
                          </button>
                          <button className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300">
                            Invoice
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* Booking Row 5 */}
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">#BK-2024-005</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Dec 08, 2024</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img className="h-10 w-10 rounded-full object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop" alt="David Rodriguez" />
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">David Rodriguez</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">d.rodriguez@email.com</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">Sunset Beach Resort</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Room 108 - Deluxe</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p className="text-sm text-gray-900 dark:text-white">Dec 13 - Dec 15</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">2 nights</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p className="text-sm text-gray-900 dark:text-white">2 Adults</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">₱11,000</p>
                          <p className="text-sm text-red-600">Refunded</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                          Cancelled
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                            View
                          </button>
                          <button className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300">
                            Details
                          </button>
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
                      <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-blue-50 dark:bg-blue-900 text-sm font-medium text-blue-600 dark:text-blue-400">
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
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">₱185,500</p>
                    <p className="text-sm text-green-600">+15.2% from yesterday</p>
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
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">₱1,245,800</p>
                    <p className="text-sm text-green-600">+12.8% from last week</p>
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
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">₱4,890,200</p>
                    <p className="text-sm text-green-600">+18.5% from last month</p>
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
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg. Daily Rate</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">₱4,250</p>
                    <p className="text-sm text-green-600">+8.3% from last month</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Revenue Analytics */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Revenue Analytics</h3>
                <div className="flex space-x-2">
                  <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm">
                    <option value="7">Last 7 days</option>
                    <option value="30">Last 30 days</option>
                    <option value="90">Last 3 months</option>
                    <option value="365">Last year</option>
                  </select>
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
                    Export Report
                  </button>
                </div>
              </div>
              
              {/* Revenue Chart Placeholder */}
              <div className="h-64 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center mb-6">
                <div className="text-center">
                  <svg className="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <p className="text-gray-500 dark:text-gray-400">Daily Revenue Trend Chart</p>
                </div>
              </div>

              {/* Daily Revenue Breakdown */}
              <div className="grid grid-cols-7 gap-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
                  const revenues = [125000, 145000, 135000, 165000, 185000, 225000, 195000];
                  return (
                    <div key={day} className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">{day}</p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">₱{revenues[index].toLocaleString()}</p>
                      <div className="mt-2 bg-blue-200 dark:bg-blue-800 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${(revenues[index] / 225000) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Property Performance */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold mb-6">Top Performing Properties</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=50&h=50&fit=crop" alt="Grand Palace Hotel" className="w-12 h-12 rounded-lg object-cover" />
                      <div>
                        <p className="font-medium">Grand Palace Hotel Boracay</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">45 rooms • 92% occupancy</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">₱85,500</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Today</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=50&h=50&fit=crop" alt="Sunset Beach Resort" className="w-12 h-12 rounded-lg object-cover" />
                      <div>
                        <p className="font-medium">Sunset Beach Resort</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">32 rooms • 88% occupancy</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">₱62,000</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Today</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <img src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=50&h=50&fit=crop" alt="Paradise Villa" className="w-12 h-12 rounded-lg object-cover" />
                      <div>
                        <p className="font-medium">Paradise Villa</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">8 villas • 75% occupancy</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">₱28,000</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Today</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <img src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=50&h=50&fit=crop" alt="Ocean View Apartments" className="w-12 h-12 rounded-lg object-cover" />
                      <div>
                        <p className="font-medium">Ocean View Apartments</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">24 units • 67% occupancy</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">₱10,000</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Today</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Revenue Sources */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold mb-6">Revenue Sources</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-blue-500 rounded"></div>
                      <span className="text-sm font-medium">Room Revenue</span>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">₱145,500</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">78.4%</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-green-500 rounded"></div>
                      <span className="text-sm font-medium">Food & Beverage</span>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">₱25,000</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">13.5%</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-purple-500 rounded"></div>
                      <span className="text-sm font-medium">Spa & Wellness</span>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">₱8,500</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">4.6%</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-orange-500 rounded"></div>
                      <span className="text-sm font-medium">Activities & Tours</span>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">₱4,500</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">2.4%</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-red-500 rounded"></div>
                      <span className="text-sm font-medium">Other Services</span>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">₱2,000</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">1.1%</p>
                    </div>
                  </div>
                </div>

                {/* Revenue Source Chart Placeholder */}
                <div className="mt-6 h-32 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Revenue Distribution Chart</p>
                </div>
              </div>
            </div>

            {/* Payment Methods & Financial Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold mb-6">Payment Methods</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                      <span className="font-medium">Credit/Debit Cards</span>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">₱125,500</p>
                      <p className="text-sm text-green-600">+12.5%</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span className="font-medium">Cash Payments</span>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">₱45,000</p>
                      <p className="text-sm text-red-600">-5.2%</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      <span className="font-medium">Digital Wallets</span>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">₱15,000</p>
                      <p className="text-sm text-green-600">+25.8%</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Monthly Comparison */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold mb-6">Monthly Comparison</h3>
                <div className="space-y-6">
                  <div className="text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-3xl font-bold text-blue-600">₱4,125,800</p>
                    <p className="text-sm text-blue-800 dark:text-blue-400 mt-2">November 2024</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Previous Month</p>
                  </div>

                  <div className="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <p className="text-3xl font-bold text-green-600">₱4,890,200</p>
                    <p className="text-sm text-green-800 dark:text-green-400 mt-2">December 2024</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Current Month</p>
                  </div>

                  <div className="text-center p-6 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                    <p className="text-3xl font-bold text-orange-600">+₱764,400</p>
                    <p className="text-sm text-orange-800 dark:text-orange-400 mt-2">+18.5% Growth</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Month over Month</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Revenue Chart */}
            <div className="h-64 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6 relative">
              {/* Chart Title and Legend */}
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Daily Revenue Trend</h4>
                <div className="flex items-center space-x-4 text-xs">
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-blue-500 rounded"></div>
                    <span className="text-gray-600 dark:text-gray-400">Revenue</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                    <span className="text-gray-600 dark:text-gray-400">Target</span>
                  </div>
                </div>
              </div>

              {/* Chart Container */}
              <div className="relative h-40">
                {/* Y-axis Grid Lines */}
                <div className="absolute inset-0">
                  {[0, 25, 50, 75, 100].map((percentage) => (
                    <div
                      key={percentage}
                      className="absolute w-full border-t border-gray-100 dark:border-gray-600"
                      style={{ bottom: `${percentage}%` }}
                    >
                      <span className="absolute -left-12 -top-2 text-xs text-gray-500 dark:text-gray-400">
                        ₱{Math.round((percentage / 100) * 250)}k
                      </span>
                    </div>
                  ))}
                </div>

                {/* Chart Bars and Line */}
                <div className="relative h-full flex items-end justify-between space-x-1 pl-8">
                  {[
                    { day: 'Dec 1', revenue: 125000, target: 150000, height: 50 },
                    { day: 'Dec 2', revenue: 145000, target: 150000, height: 58 },
                    { day: 'Dec 3', revenue: 135000, target: 150000, height: 54 },
                    { day: 'Dec 4', revenue: 165000, target: 150000, height: 66 },
                    { day: 'Dec 5', revenue: 185000, target: 150000, height: 74 },
                    { day: 'Dec 6', revenue: 225000, target: 150000, height: 90 },
                    { day: 'Dec 7', revenue: 195000, target: 150000, height: 78 },
                    { day: 'Dec 8', revenue: 175000, target: 150000, height: 70 },
                    { day: 'Dec 9', revenue: 155000, target: 150000, height: 62 },
                    { day: 'Dec 10', revenue: 205000, target: 150000, height: 82 },
                    { day: 'Dec 11', revenue: 235000, target: 150000, height: 94 },
                    { day: 'Dec 12', revenue: 215000, target: 150000, height: 86 },
                    { day: 'Dec 13', revenue: 185000, target: 150000, height: 74 },
                    { day: 'Dec 14', revenue: 165000, target: 150000, height: 66 }
                  ].map((data, index) => (
                    <div key={index} className="flex flex-col items-center flex-1 group relative">
                      {/* Revenue Bar */}
                      <div className="relative w-full max-w-6 mb-2">
                        <div 
                          className={`w-full rounded-t transition-all duration-300 cursor-pointer ${
                            data.revenue >= data.target 
                              ? 'bg-green-500 hover:bg-green-600' 
                              : 'bg-blue-500 hover:bg-blue-600'
                          }`}
                          style={{ height: `${(data.height / 100) * 140}px` }}
                        ></div>
                        
                        {/* Target Line */}
                        <div 
                          className="absolute w-full border-t-2 border-green-400 border-dashed"
                          style={{ bottom: `${(60 / 100) * 140}px` }}
                        ></div>
                      </div>

                      {/* Hover Tooltip */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-8 px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10 shadow-lg">
                        <div className="text-center">
                          <p className="font-medium">{data.day}</p>
                          <p className="text-green-300">Revenue: ₱{data.revenue.toLocaleString()}</p>
                          <p className="text-gray-300">Target: ₱{data.target.toLocaleString()}</p>
                          <p className={`${data.revenue >= data.target ? 'text-green-300' : 'text-red-300'}`}>
                            {data.revenue >= data.target ? '+' : ''}
                            {((data.revenue - data.target) / data.target * 100).toFixed(1)}%
                          </p>
                        </div>
                        {/* Tooltip Arrow */}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-700"></div>
                      </div>

                      {/* Day Label */}
                      <span className="text-xs text-gray-600 dark:text-gray-400 mt-1 transform rotate-0">
                        {data.day.split(' ')[1]}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Trend Line Overlay */}
                <svg className="absolute inset-0 pointer-events-none" style={{ left: '2rem' }}>
                  <polyline
                    fill="none"
                    stroke="#F59E0B"
                    strokeWidth="2"
                    strokeDasharray="4,4"
                    points="20,120 40,110 60,115 80,95 100,85 120,60 140,75 160,85 180,100 200,70 220,55 240,65 260,85 280,95"
                    className="opacity-60"
                  />
                </svg>
              </div>

              {/* Chart Footer Stats */}
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Avg Daily</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">₱178,571</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Best Day</p>
                  <p className="text-sm font-semibold text-green-600">₱235,000</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Growth</p>
                  <p className="text-sm font-semibold text-blue-600">+32%</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Target Hit</p>
                  <p className="text-sm font-semibold text-orange-600">9/14 days</p>
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Occupancy Rate</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">78.5%</p>
                    <p className="text-sm text-green-600">+5.2% from last month</p>
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
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">RevPAR</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">₱3,340</p>
                    <p className="text-sm text-green-600">+12.8% from last month</p>
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
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Guest Satisfaction</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">4.7/5</p>
                    <p className="text-sm text-green-600">+0.3 from last month</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                    <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Repeat Guests</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">32.4%</p>
                    <p className="text-sm text-green-600">+2.1% from last month</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Occupancy Trends */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Occupancy Trends</h3>
                <div className="flex space-x-2">
                  <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm">
                    <option value="30">Last 30 days</option>
                    <option value="90">Last 3 months</option>
                    <option value="365">Last year</option>
                  </select>
                </div>
              </div>
              
              {/* Occupancy Chart */}
              <div className="h-64 bg-gray-50 dark:bg-gray-700 rounded-lg p-4 relative">
                <div className="h-full flex items-end justify-between space-x-2">
                  {[
                    { week: 'Week 1', occupancy: 65, target: 75 },
                    { week: 'Week 2', occupancy: 72, target: 75 },
                    { week: 'Week 3', occupancy: 68, target: 75 },
                    { week: 'Week 4', occupancy: 78, target: 75 },
                    { week: 'Week 5', occupancy: 82, target: 75 },
                    { week: 'Week 6', occupancy: 85, target: 75 },
                    { week: 'Week 7', occupancy: 79, target: 75 },
                    { week: 'Week 8', occupancy: 88, target: 75 }
                  ].map((data, index) => (
                    <div key={index} className="flex flex-col items-center flex-1 group">
                      <div className="relative mb-2 w-full max-w-8">
                        <div 
                          className={`w-full rounded-t transition-colors cursor-pointer ${
                            data.occupancy >= data.target 
                              ? 'bg-green-500 hover:bg-green-600' 
                              : 'bg-blue-500 hover:bg-blue-600'
                          }`}
                          style={{ height: `${(data.occupancy / 100) * 200}px` }}
                          title={`${data.week}: ${data.occupancy}% occupancy`}
                        ></div>
                        
                        {/* Target line */}
                        <div 
                          className="absolute w-full border-t-2 border-red-400 border-dashed"
                          style={{ bottom: `${(data.target / 100) * 200}px` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {data.week.split(' ')[1]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Guest Demographics & Booking Patterns */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Guest Demographics */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold mb-6">Guest Demographics</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Age 25-34</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">35%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '35%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Age 35-44</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">28%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '28%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Age 45-54</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">22%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: '22%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Age 18-24</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">10%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-orange-600 h-2 rounded-full" style={{ width: '10%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Age 55+</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">5%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-red-600 h-2 rounded-full" style={{ width: '5%' }}></div>
                    </div>
                  </div>
                </div>

                {/* Guest Origin */}
                <div className="mt-8">
                  <h4 className="text-md font-medium mb-4">Guest Origin</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">68%</p>
                      <p className="text-sm text-blue-800 dark:text-blue-400">Domestic</p>
                    </div>
                    <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">32%</p>
                      <p className="text-sm text-green-800 dark:text-green-400">International</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Booking Patterns */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold mb-6">Booking Patterns</h3>
                
                {/* Booking Lead Time */}
                <div className="mb-6">
                  <h4 className="text-md font-medium mb-4">Average Booking Lead Time</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Same Day</span>
                      <span className="text-sm font-medium">8%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">1-7 Days</span>
                      <span className="text-sm font-medium">25%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">1-4 Weeks</span>
                      <span className="text-sm font-medium">42%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">1-3 Months</span>
                      <span className="text-sm font-medium">20%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">3+ Months</span>
                      <span className="text-sm font-medium">5%</span>
                    </div>
                  </div>
                </div>

                {/* Peak Booking Days */}
                <div className="mb-6">
                  <h4 className="text-md font-medium mb-4">Peak Booking Days</h4>
                  <div className="grid grid-cols-7 gap-1">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
                      const bookings = [12, 15, 18, 22, 28, 35, 25];
                      return (
                        <div key={day} className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded">
                          <p className="text-xs text-gray-600 dark:text-gray-400">{day}</p>
                          <p className="text-sm font-semibold">{bookings[index]}%</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Seasonal Trends */}
                <div>
                  <h4 className="text-md font-medium mb-4">Seasonal Performance</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg text-center">
                      <p className="text-lg font-bold text-yellow-600">Peak</p>
                      <p className="text-sm text-yellow-800 dark:text-yellow-400">Dec-Feb</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">95% avg occupancy</p>
                    </div>
                    <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
                      <p className="text-lg font-bold text-green-600">High</p>
                      <p className="text-sm text-green-800 dark:text-green-400">Mar-May</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">82% avg occupancy</p>
                    </div>
                    <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg text-center">
                      <p className="text-lg font-bold text-orange-600">Medium</p>
                      <p className="text-sm text-orange-800 dark:text-orange-400">Jun-Aug</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">68% avg occupancy</p>
                    </div>
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
                      <p className="text-lg font-bold text-blue-600">Low</p>
                      <p className="text-sm text-blue-800 dark:text-blue-400">Sep-Nov</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">55% avg occupancy</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Insights & Recommendations */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold mb-6">AI-Powered Insights & Recommendations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500">
                    <h4 className="font-medium text-green-800 dark:text-green-400 text-sm mb-1">Revenue Optimization</h4>
                    <p className="text-xs text-green-700 dark:text-green-300">Increase weekend rates by 15% - demand exceeds supply on Fri-Sun</p>
                  </div>

                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                    <h4 className="font-medium text-blue-800 dark:text-blue-400 text-sm mb-1">Marketing Focus</h4>
                    <p className="text-xs text-blue-700 dark:text-blue-300">Target 35-44 age group with family packages - highest conversion rate</p>
                  </div>

                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border-l-4 border-purple-500">
                    <h4 className="font-medium text-purple-800 dark:text-purple-400 text-sm mb-1">Guest Experience</h4>
                    <p className="text-xs text-purple-700 dark:text-purple-300">Improve check-in process - 23% of complaints relate to wait times</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border-l-4 border-orange-500">
                    <h4 className="font-medium text-orange-800 dark:text-orange-400 text-sm mb-1">Operational Efficiency</h4>
                    <p className="text-xs text-orange-700 dark:text-orange-300">Optimize housekeeping schedule - reduce turnover time by 20 minutes</p>
                  </div>

                  <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-500">
                    <h4 className="font-medium text-red-800 dark:text-red-400 text-sm mb-1">Competitive Analysis</h4>
                    <p className="text-xs text-red-700 dark:text-red-300">Competitors offering 10% lower rates - consider dynamic pricing strategy</p>
                  </div>

                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
                    <h4 className="font-medium text-yellow-800 dark:text-yellow-400 text-sm mb-1">Seasonal Strategy</h4>
                    <p className="text-xs text-yellow-700 dark:text-yellow-300">Launch early bird promotions for low season - book 3 months ahead</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other tabs placeholders */}
        {!['overview', 'properties', 'rooms', 'bookings', 'earnings', 'analytics'].includes(activeTab) && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">{(activeTab as string).charAt(0).toUpperCase() + (activeTab as string).slice(1)} section coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
} 