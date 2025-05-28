'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Vehicle {
  id: string;
  model: string;
  year: number;
  plateNumber: string;
  color: string;
  type: 'sedan' | 'suv' | 'van' | 'hatchback';
  capacity: number;
  status: 'active' | 'maintenance' | 'inactive';
  location: string;
  driver?: {
    name: string;
    phone: string;
    status: 'available' | 'busy' | 'offline';
  };
  pricing: {
    hourly: number;
    daily: number;
    airport: number;
  };
  features: string[];
  images: string[];
  documents: {
    registration: { uploaded: boolean; expiry: string };
    insurance: { uploaded: boolean; expiry: string };
    inspection: { uploaded: boolean; expiry: string };
  };
  earnings: {
    today: number;
    thisWeek: number;
    thisMonth: number;
  };
  trips: {
    total: number;
    completed: number;
    cancelled: number;
  };
}

export default function FleetManagement() {
  const [activeTab, setActiveTab] = useState<'overview' | 'vehicles' | 'drivers' | 'bookings' | 'earnings' | 'analytics'>('overview');
  const [showAddVehicle, setShowAddVehicle] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  // Mock data
  const ownerInfo = {
    name: "Transport Solutions Inc.",
    email: "owner@transportsolutions.com",
    phone: "+63 917 123 4567",
    address: "123 Business District, Kalibo, Aklan",
    license: "TSP-2024-001",
    rating: 4.7,
    totalVehicles: 12,
    activeDrivers: 8
  };

  const vehicles: Vehicle[] = [
    {
      id: 'VH001',
      model: 'Toyota Vios',
      year: 2022,
      plateNumber: 'ABC 123',
      color: 'Silver',
      type: 'sedan',
      capacity: 4,
      status: 'active',
      location: 'Caticlan Airport',
      driver: {
        name: 'Juan Dela Cruz',
        phone: '+63 917 111 1111',
        status: 'available'
      },
      pricing: {
        hourly: 800,
        daily: 5000,
        airport: 1500
      },
      features: ['Air Conditioning', 'GPS Navigation', 'Phone Charger', 'WiFi'],
      images: ['/api/placeholder/300/200', '/api/placeholder/300/200'],
      documents: {
        registration: { uploaded: true, expiry: '2025-12-31' },
        insurance: { uploaded: true, expiry: '2025-06-30' },
        inspection: { uploaded: true, expiry: '2024-12-31' }
      },
      earnings: {
        today: 2400,
        thisWeek: 15600,
        thisMonth: 45200
      },
      trips: {
        total: 156,
        completed: 148,
        cancelled: 8
      }
    },
    {
      id: 'VH002',
      model: 'Honda CR-V',
      year: 2023,
      plateNumber: 'DEF 456',
      color: 'White',
      type: 'suv',
      capacity: 7,
      status: 'active',
      location: 'Boracay Station 1',
      driver: {
        name: 'Maria Santos',
        phone: '+63 917 222 2222',
        status: 'busy'
      },
      pricing: {
        hourly: 1200,
        daily: 7500,
        airport: 2000
      },
      features: ['Air Conditioning', 'GPS Navigation', 'Phone Charger', 'WiFi', 'Leather Seats'],
      images: ['/api/placeholder/300/200', '/api/placeholder/300/200'],
      documents: {
        registration: { uploaded: true, expiry: '2026-01-15' },
        insurance: { uploaded: true, expiry: '2025-08-20' },
        inspection: { uploaded: false, expiry: '2024-11-30' }
      },
      earnings: {
        today: 3600,
        thisWeek: 21000,
        thisMonth: 67800
      },
      trips: {
        total: 203,
        completed: 195,
        cancelled: 8
      }
    },
    {
      id: 'VH003',
      model: 'Toyota Hiace',
      year: 2021,
      plateNumber: 'GHI 789',
      color: 'Blue',
      type: 'van',
      capacity: 15,
      status: 'maintenance',
      location: 'Service Center',
      pricing: {
        hourly: 1500,
        daily: 10000,
        airport: 2500
      },
      features: ['Air Conditioning', 'GPS Navigation', 'Phone Charger', 'WiFi', 'Large Luggage Space'],
      images: ['/api/placeholder/300/200'],
      documents: {
        registration: { uploaded: true, expiry: '2025-09-10' },
        insurance: { uploaded: true, expiry: '2025-03-15' },
        inspection: { uploaded: true, expiry: '2024-10-20' }
      },
      earnings: {
        today: 0,
        thisWeek: 8500,
        thisMonth: 38900
      },
      trips: {
        total: 89,
        completed: 84,
        cancelled: 5
      }
    }
  ];

  const totalEarnings = vehicles.reduce((sum, vehicle) => sum + vehicle.earnings.thisMonth, 0);
  const totalTrips = vehicles.reduce((sum, vehicle) => sum + vehicle.trips.total, 0);
  const activeVehicles = vehicles.filter(v => v.status === 'active').length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'inactive': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'available': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'busy': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'offline': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Vehicles</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{vehicles.length}</p>
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
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Vehicles</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{activeVehicles}</p>
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
              <p className="text-sm text-gray-600 dark:text-gray-400">Monthly Earnings</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">₱{totalEarnings.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Trips</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalTrips}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Bookings</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="font-medium">Airport Transfer</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Toyota Vios - ABC 123</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-green-600">₱1,500</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Vehicle Status</h3>
          <div className="space-y-4">
            {vehicles.slice(0, 3).map((vehicle) => (
              <div key={vehicle.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="font-medium">{vehicle.model}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{vehicle.plateNumber}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(vehicle.status)}`}>
                  {vehicle.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderVehicles = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Vehicle Management</h2>
        <button 
          onClick={() => setShowAddVehicle(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
        >
          Add New Vehicle
        </button>
      </div>

      {/* Vehicles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.map((vehicle) => (
          <div key={vehicle.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
            <div className="relative">
              <img src={vehicle.images[0]} alt={vehicle.model} className="w-full h-48 object-cover" />
              <span className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(vehicle.status)}`}>
                {vehicle.status}
              </span>
            </div>
            
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold">{vehicle.model} {vehicle.year}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{vehicle.plateNumber}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Type</p>
                  <p className="font-medium capitalize">{vehicle.type}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Capacity</p>
                  <p className="font-medium">{vehicle.capacity} passengers</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Location</p>
                  <p className="font-medium">{vehicle.location}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Monthly Earnings</p>
                  <p className="font-medium text-green-600">₱{vehicle.earnings.thisMonth.toLocaleString()}</p>
                </div>
              </div>

              {vehicle.driver && (
                <div className="mb-4 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium">{vehicle.driver.name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{vehicle.driver.phone}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(vehicle.driver.status)}`}>
                      {vehicle.driver.status}
                    </span>
                  </div>
                </div>
              )}

              <div className="flex space-x-2">
                <button 
                  onClick={() => setSelectedVehicle(vehicle)}
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
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Fleet Management Dashboard</h1>
              <p className="text-gray-600 dark:text-gray-400">{ownerInfo.name}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600 dark:text-gray-400">License: {ownerInfo.license}</p>
                <div className="flex items-center">
                  <div className="flex items-center mr-2">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`w-3 h-3 ${i < Math.floor(ownerInfo.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{ownerInfo.rating}</span>
                </div>
              </div>
              <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { key: 'overview', label: 'Overview', icon: '📊' },
              { key: 'vehicles', label: 'Vehicles', icon: '🚗' },
              { key: 'drivers', label: 'Drivers', icon: '👨‍💼' },
              { key: 'bookings', label: 'Bookings', icon: '📅' },
              { key: 'earnings', label: 'Earnings', icon: '💰' },
              { key: 'analytics', label: 'Analytics', icon: '📈' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.key
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'vehicles' && renderVehicles()}
        {activeTab === 'drivers' && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Driver Management</h3>
            <p className="text-gray-600 dark:text-gray-400">Coming soon...</p>
          </div>
        )}
        {activeTab === 'bookings' && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Booking Management</h3>
            <p className="text-gray-600 dark:text-gray-400">Coming soon...</p>
          </div>
        )}
        {activeTab === 'earnings' && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Earnings Reports</h3>
            <p className="text-gray-600 dark:text-gray-400">Coming soon...</p>
          </div>
        )}
        {activeTab === 'analytics' && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Analytics Dashboard</h3>
            <p className="text-gray-600 dark:text-gray-400">Coming soon...</p>
          </div>
        )}
      </div>

      {/* Add Vehicle Modal */}
      {showAddVehicle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">Add New Vehicle</h3>
                <button 
                  onClick={() => setShowAddVehicle(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Vehicle Model</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700" placeholder="e.g., Toyota Vios" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Year</label>
                    <input type="number" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700" placeholder="2023" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Plate Number</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700" placeholder="ABC 123" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Color</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700" placeholder="Silver" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Vehicle Type</label>
                    <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700">
                      <option value="sedan">Sedan</option>
                      <option value="suv">SUV</option>
                      <option value="van">Van</option>
                      <option value="hatchback">Hatchback</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Capacity</label>
                    <input type="number" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700" placeholder="4" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Vehicle Images</label>
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                    <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="text-gray-600 dark:text-gray-400">Click to upload or drag and drop</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">PNG, JPG up to 10MB</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Hourly Rate (₱)</label>
                    <input type="number" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700" placeholder="800" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Daily Rate (₱)</label>
                    <input type="number" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700" placeholder="5000" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Airport Rate (₱)</label>
                    <input type="number" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700" placeholder="1500" />
                  </div>
                </div>

                <div className="flex justify-end space-x-4 pt-6">
                  <button 
                    type="button"
                    onClick={() => setShowAddVehicle(false)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    Add Vehicle
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Vehicle Details Modal */}
      {selectedVehicle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">{selectedVehicle.model} Details</h3>
                <button 
                  onClick={() => setSelectedVehicle(null)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <img src={selectedVehicle.images[0]} alt={selectedVehicle.model} className="w-full h-64 object-cover rounded-lg mb-4" />
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Vehicle Information</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">Model</p>
                          <p className="font-medium">{selectedVehicle.model} {selectedVehicle.year}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">Plate Number</p>
                          <p className="font-medium">{selectedVehicle.plateNumber}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">Type</p>
                          <p className="font-medium capitalize">{selectedVehicle.type}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">Capacity</p>
                          <p className="font-medium">{selectedVehicle.capacity} passengers</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Features</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedVehicle.features.map((feature, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-sm">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-2">Earnings Overview</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <p className="text-lg font-bold text-green-600">₱{selectedVehicle.earnings.today.toLocaleString()}</p>
                        <p className="text-sm text-green-800 dark:text-green-400">Today</p>
                      </div>
                      <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <p className="text-lg font-bold text-blue-600">₱{selectedVehicle.earnings.thisWeek.toLocaleString()}</p>
                        <p className="text-sm text-blue-800 dark:text-blue-400">This Week</p>
                      </div>
                      <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <p className="text-lg font-bold text-purple-600">₱{selectedVehicle.earnings.thisMonth.toLocaleString()}</p>
                        <p className="text-sm text-purple-800 dark:text-purple-400">This Month</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Trip Statistics</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <p className="text-lg font-bold">{selectedVehicle.trips.total}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <p className="text-lg font-bold text-green-600">{selectedVehicle.trips.completed}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <p className="text-lg font-bold text-red-600">{selectedVehicle.trips.cancelled}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Cancelled</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Pricing</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Hourly Rate:</span>
                        <span className="font-medium">₱{selectedVehicle.pricing.hourly}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Daily Rate:</span>
                        <span className="font-medium">₱{selectedVehicle.pricing.daily}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Airport Transfer:</span>
                        <span className="font-medium">₱{selectedVehicle.pricing.airport}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Documents Status</h4>
                    <div className="space-y-2">
                      {Object.entries(selectedVehicle.documents).map(([doc, info]) => (
                        <div key={doc} className="flex justify-between items-center">
                          <span className="capitalize">{doc}:</span>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 rounded-full text-xs ${info.uploaded ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {info.uploaded ? 'Uploaded' : 'Missing'}
                            </span>
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              Expires: {new Date(info.expiry).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 