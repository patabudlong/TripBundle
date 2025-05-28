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
  const [showAddDriver, setShowAddDriver] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
  const [showDriverDetails, setShowDriverDetails] = useState(false);
  const [showContactDriver, setShowContactDriver] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'maintenance' | 'inactive'>('all');
  const [showBookingDetails, setShowBookingDetails] = useState(false);
  const [showAssignDriver, setShowAssignDriver] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);

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
      images: [
        'https://images.unsplash.com/photo-1549924231-f129b911e442?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop'
      ],
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
      features: ['Air Conditioning', 'GPS Navigation', 'Phone Charger', 'WiFi', '4WD'],
      images: [
        'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1581540222194-0def2dda95b8?w=400&h=300&fit=crop'
      ],
      documents: {
        registration: { uploaded: true, expiry: '2025-12-31' },
        insurance: { uploaded: true, expiry: '2025-06-30' },
        inspection: { uploaded: false, expiry: '2024-12-31' }
      },
      earnings: {
        today: 3600,
        thisWeek: 21000,
        thisMonth: 67500
      },
      trips: {
        total: 89,
        completed: 85,
        cancelled: 4
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
      location: 'Kalibo Garage',
      pricing: {
        hourly: 1500,
        daily: 10000,
        airport: 2500
      },
      features: ['Air Conditioning', 'GPS Navigation', 'Phone Charger', 'WiFi', 'Large Luggage Space'],
      images: [
        'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop'
      ],
      documents: {
        registration: { uploaded: true, expiry: '2025-12-31' },
        insurance: { uploaded: true, expiry: '2025-06-30' },
        inspection: { uploaded: true, expiry: '2024-12-31' }
      },
      earnings: {
        today: 0,
        thisWeek: 8500,
        thisMonth: 42000
      },
      trips: {
        total: 67,
        completed: 63,
        cancelled: 4
      }
    },
    {
      id: 'VH004',
      model: 'Mitsubishi Montero',
      year: 2020,
      plateNumber: 'JKL 012',
      color: 'Black',
      type: 'suv',
      capacity: 7,
      status: 'active',
      location: 'Boracay Station 3',
      driver: {
        name: 'Carlos Rodriguez',
        phone: '+63 917 333 3333',
        status: 'available'
      },
      pricing: {
        hourly: 1100,
        daily: 6500,
        airport: 1800
      },
      features: ['Air Conditioning', 'GPS Navigation', 'Phone Charger', '4WD', 'Leather Seats'],
      images: [
        'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400&h=300&fit=crop'
      ],
      documents: {
        registration: { uploaded: true, expiry: '2025-12-31' },
        insurance: { uploaded: true, expiry: '2025-06-30' },
        inspection: { uploaded: true, expiry: '2024-12-31' }
      },
      earnings: {
        today: 1800,
        thisWeek: 12600,
        thisMonth: 38500
      },
      trips: {
        total: 112,
        completed: 108,
        cancelled: 4
      }
    },
    {
      id: 'VH005',
      model: 'Nissan Navara',
      year: 2023,
      plateNumber: 'MNO 345',
      color: 'Red',
      type: 'suv',
      capacity: 5,
      status: 'inactive',
      location: 'Kalibo Service Center',
      pricing: {
        hourly: 1000,
        daily: 6000,
        airport: 1700
      },
      features: ['Air Conditioning', 'GPS Navigation', 'Phone Charger', '4WD', 'Pickup Bed'],
      images: [
        'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=400&h=300&fit=crop'
      ],
      documents: {
        registration: { uploaded: true, expiry: '2025-12-31' },
        insurance: { uploaded: false, expiry: '2025-06-30' },
        inspection: { uploaded: true, expiry: '2024-12-31' }
      },
      earnings: {
        today: 0,
        thisWeek: 0,
        thisMonth: 15200
      },
      trips: {
        total: 45,
        completed: 42,
        cancelled: 3
      }
    },
    {
      id: 'VH006',
      model: 'Honda City',
      year: 2022,
      plateNumber: 'PQR 678',
      color: 'Gray',
      type: 'sedan',
      capacity: 4,
      status: 'active',
      location: 'Caticlan Port',
      driver: {
        name: 'Ana Reyes',
        phone: '+63 917 444 4444',
        status: 'busy'
      },
      pricing: {
        hourly: 750,
        daily: 4500,
        airport: 1400
      },
      features: ['Air Conditioning', 'GPS Navigation', 'Phone Charger', 'Fuel Efficient'],
      images: [
        'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=400&h=300&fit=crop'
      ],
      documents: {
        registration: { uploaded: true, expiry: '2025-12-31' },
        insurance: { uploaded: true, expiry: '2025-06-30' },
        inspection: { uploaded: true, expiry: '2024-12-31' }
      },
      earnings: {
        today: 2100,
        thisWeek: 13500,
        thisMonth: 41200
      },
      trips: {
        total: 134,
        completed: 129,
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

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = vehicle.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         vehicle.plateNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         vehicle.color.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         vehicle.driver?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         vehicle.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || vehicle.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

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
      {/* Search and Filter Bar */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search vehicles by model, plate, driver, or location..."
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
              onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'maintenance' | 'inactive')}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="maintenance">Maintenance</option>
              <option value="inactive">Inactive</option>
            </select>

            {/* Add Vehicle Button */}
            <button 
              onClick={() => setShowAddVehicle(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Add Vehicle</span>
            </button>
          </div>
        </div>

        {/* Search Results Info */}
        {searchQuery && (
          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            Found {filteredVehicles.length} vehicle{filteredVehicles.length !== 1 ? 's' : ''} matching "{searchQuery}"
          </div>
        )}
      </div>

      {/* Vehicles Grid */}
      {filteredVehicles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVehicles.map((vehicle) => (
            <div key={vehicle.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
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
                    onClick={() => {
                      setSelectedVehicle(vehicle);
                      setShowDriverDetails(true);
                    }}
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.175-5.5-2.709M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            {searchQuery ? 'No vehicles found' : 'No vehicles available'}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {searchQuery 
              ? 'Try adjusting your search criteria or filters' 
              : 'Add your first vehicle to get started'
            }
          </p>
          {!searchQuery && (
            <button 
              onClick={() => setShowAddVehicle(true)}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              Add Your First Vehicle
            </button>
          )}
        </div>
      )}
    </div>
  );

  const renderDrivers = () => (
    <div className="space-y-6">
      {/* Drivers Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Drivers</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">24</p>
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
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Drivers</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">18</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">On Break</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">4</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 bg-red-100 dark:bg-red-900 rounded-lg">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Offline</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">2</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search drivers by name, phone, or license..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Status Filter */}
            <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="on-break">On Break</option>
              <option value="offline">Offline</option>
            </select>

            {/* Add Driver Button */}
            <button 
              onClick={() => setShowAddDriver(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Add Driver</span>
            </button>
          </div>
        </div>
      </div>

      {/* Drivers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            id: 1,
            name: "Juan Dela Cruz",
            phone: "+63 917 123 4567",
            email: "juan.delacruz@email.com",
            license: "N01-12-345678",
            rating: 4.8,
            totalTrips: 1247,
            status: "active",
            vehicle: "Toyota Vios - ABC 123",
            joinDate: "Jan 15, 2023",
            earnings: {
              today: 2850,
              thisWeek: 18500,
              thisMonth: 75200
            },
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
          },
          {
            id: 2,
            name: "Maria Santos",
            phone: "+63 918 987 6543",
            email: "maria.santos@email.com",
            license: "N01-23-456789",
            rating: 4.9,
            totalTrips: 892,
            status: "active",
            vehicle: "Honda City - XYZ 789",
            joinDate: "Mar 22, 2023",
            earnings: {
              today: 3200,
              thisWeek: 21000,
              thisMonth: 82500
            },
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
          },
          {
            id: 3,
            name: "Roberto Garcia",
            phone: "+63 919 555 1234",
            email: "roberto.garcia@email.com",
            license: "N01-34-567890",
            rating: 4.7,
            totalTrips: 1456,
            status: "on-break",
            vehicle: "Mitsubishi Mirage - DEF 456",
            joinDate: "Nov 8, 2022",
            earnings: {
              today: 1950,
              thisWeek: 16800,
              thisMonth: 68900
            },
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
          },
          {
            id: 4,
            name: "Ana Rodriguez",
            phone: "+63 920 777 8888",
            email: "ana.rodriguez@email.com",
            license: "N01-45-678901",
            rating: 4.6,
            totalTrips: 734,
            status: "active",
            vehicle: "Nissan Almera - GHI 789",
            joinDate: "Jun 12, 2023",
            earnings: {
              today: 2650,
              thisWeek: 19200,
              thisMonth: 71800
            },
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
          },
          {
            id: 5,
            name: "Carlos Mendoza",
            phone: "+63 921 333 4444",
            email: "carlos.mendoza@email.com",
            license: "N01-56-789012",
            rating: 4.5,
            totalTrips: 623,
            status: "offline",
            vehicle: "Hyundai Accent - JKL 012",
            joinDate: "Aug 30, 2023",
            earnings: {
              today: 0,
              thisWeek: 14500,
              thisMonth: 58200
            },
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
          },
          {
            id: 6,
            name: "Lisa Chen",
            phone: "+63 922 666 7777",
            email: "lisa.chen@email.com",
            license: "N01-67-890123",
            rating: 4.9,
            totalTrips: 1089,
            status: "active",
            vehicle: "Toyota Wigo - MNO 345",
            joinDate: "Feb 14, 2023",
            earnings: {
              today: 3100,
              thisWeek: 22500,
              thisMonth: 89200
            },
            avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
          }
        ].map((driver) => (
          <div key={driver.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <img src={driver.avatar} alt={driver.name} className="w-16 h-16 rounded-full object-cover" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{driver.name}</h3>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-4 h-4 ${i < Math.floor(driver.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">{driver.rating}</span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      driver.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      driver.status === 'on-break' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                      'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {driver.status === 'on-break' ? 'On Break' : driver.status.charAt(0).toUpperCase() + driver.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Phone:</span>
                  <span className="font-medium">{driver.phone}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">License:</span>
                  <span className="font-medium">{driver.license}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Vehicle:</span>
                  <span className="font-medium">{driver.vehicle}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Total Trips:</span>
                  <span className="font-medium">{driver.totalTrips.toLocaleString()}</span>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 mb-4">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Earnings</h4>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="text-center">
                    <p className="text-gray-600 dark:text-gray-400">Today</p>
                    <p className="font-semibold text-green-600">₱{driver.earnings.today.toLocaleString()}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-600 dark:text-gray-400">Week</p>
                    <p className="font-semibold text-blue-600">₱{driver.earnings.thisWeek.toLocaleString()}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-600 dark:text-gray-400">Month</p>
                    <p className="font-semibold text-purple-600">₱{driver.earnings.thisMonth.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                <button 
                  onClick={() => {
                    setSelectedDriver(driver);
                    setShowDriverDetails(true);
                  }}
                  className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  View Details
                </button>
                <button 
                  onClick={() => {
                    setSelectedDriver(driver);
                    setShowContactDriver(true);
                  }}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg text-sm font-medium transition-colors"
                >
                  Contact
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

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
              <p className="text-2xl font-bold text-gray-900 dark:text-white">156</p>
              <p className="text-sm text-green-600">+12% from yesterday</p>
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
              <p className="text-sm text-gray-600 dark:text-gray-400">Pending Bookings</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">23</p>
              <p className="text-sm text-orange-600">Awaiting assignment</p>
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
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Trips</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">18</p>
              <p className="text-sm text-green-600">Currently in progress</p>
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
              <p className="text-2xl font-bold text-gray-900 dark:text-white">₱45,280</p>
              <p className="text-sm text-purple-600">From completed trips</p>
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
                placeholder="Search bookings by customer, driver, or booking ID..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Status Filter */}
            <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>

            {/* Date Filter */}
            <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="this-week">This Week</option>
              <option value="this-month">This Month</option>
              <option value="custom">Custom Range</option>
            </select>

            {/* Export Button */}
            <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg font-medium transition-colors flex items-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Export</span>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Booking Details</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Driver & Vehicle</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Route</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {[
                {
                  id: "BK-2024-001",
                  bookingTime: "2:30 PM",
                  pickupTime: "3:00 PM",
                  customer: {
                    name: "Maria Santos",
                    phone: "+63 917 123 4567",
                    rating: 4.8
                  },
                  driver: {
                    name: "Juan Dela Cruz",
                    phone: "+63 918 987 6543"
                  },
                  vehicle: "Toyota Vios - ABC 123",
                  pickup: "SM Mall of Asia",
                  destination: "NAIA Terminal 3",
                  distance: "12.5 km",
                  duration: "25 mins",
                  status: "in-progress",
                  amount: 450,
                  paymentMethod: "Cash"
                },
                {
                  id: "BK-2024-002",
                  bookingTime: "1:45 PM",
                  pickupTime: "2:15 PM",
                  customer: {
                    name: "Roberto Garcia",
                    phone: "+63 919 555 1234",
                    rating: 4.6
                  },
                  driver: {
                    name: "Maria Santos",
                    phone: "+63 920 777 8888"
                  },
                  vehicle: "Honda City - XYZ 789",
                  pickup: "Makati CBD",
                  destination: "BGC Taguig",
                  distance: "8.2 km",
                  duration: "18 mins",
                  status: "completed",
                  amount: 320,
                  paymentMethod: "GCash"
                },
                {
                  id: "BK-2024-003",
                  bookingTime: "3:15 PM",
                  pickupTime: "3:45 PM",
                  customer: {
                    name: "Ana Rodriguez",
                    phone: "+63 921 333 4444",
                    rating: 4.9
                  },
                  driver: null,
                  vehicle: "Pending Assignment",
                  pickup: "Quezon City Circle",
                  destination: "UP Diliman",
                  distance: "5.8 km",
                  duration: "15 mins",
                  status: "pending",
                  amount: 250,
                  paymentMethod: "Card"
                },
                {
                  id: "BK-2024-004",
                  bookingTime: "12:30 PM",
                  pickupTime: "1:00 PM",
                  customer: {
                    name: "Carlos Mendoza",
                    phone: "+63 922 666 7777",
                    rating: 4.7
                  },
                  driver: {
                    name: "Roberto Garcia",
                    phone: "+63 919 555 1234"
                  },
                  vehicle: "Mitsubishi Mirage - DEF 456",
                  pickup: "Ortigas Center",
                  destination: "Eastwood City",
                  distance: "6.3 km",
                  duration: "12 mins",
                  status: "confirmed",
                  amount: 280,
                  paymentMethod: "Cash"
                },
                {
                  id: "BK-2024-005",
                  bookingTime: "11:15 AM",
                  pickupTime: "11:45 AM",
                  customer: {
                    name: "Lisa Chen",
                    phone: "+63 923 888 9999",
                    rating: 4.5
                  },
                  driver: {
                    name: "Ana Rodriguez",
                    phone: "+63 920 777 8888"
                  },
                  vehicle: "Nissan Almera - GHI 789",
                  pickup: "Alabang Town Center",
                  destination: "Festival Mall",
                  distance: "4.2 km",
                  duration: "10 mins",
                  status: "cancelled",
                  amount: 200,
                  paymentMethod: "GCash"
                }
              ].map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{booking.id}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Booked: {booking.bookingTime}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Pickup: {booking.pickupTime}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{booking.customer.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{booking.customer.phone}</div>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className={`w-3 h-3 ${i < Math.floor(booking.customer.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">{booking.customer.rating}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      {booking.driver ? (
                        <>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{booking.driver.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{booking.driver.phone}</div>
                        </>
                      ) : (
                        <div className="text-sm text-orange-600 dark:text-orange-400 font-medium">Unassigned</div>
                      )}
                      <div className="text-sm text-gray-500 dark:text-gray-400">{booking.vehicle}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm text-gray-900 dark:text-white">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          {booking.pickup}
                        </div>
                      </div>
                      <div className="text-sm text-gray-900 dark:text-white">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 text-red-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          {booking.destination}
                        </div>
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{booking.distance} • {booking.duration}</div>
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
                      <div className="text-sm font-medium text-gray-900 dark:text-white">₱{booking.amount}</div>
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
                            setShowAssignDriver(true);
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
            <span className="font-medium">156</span> results
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
        {activeTab === 'drivers' && renderDrivers()}
        {activeTab === 'bookings' && renderBookings()}
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
                        <p className="text-sm text-gray-600 dark:text-gray-400">Today</p>
                      </div>
                      <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <p className="text-lg font-bold text-blue-600">₱{selectedVehicle.earnings.thisWeek.toLocaleString()}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">This Week</p>
                      </div>
                      <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <p className="text-lg font-bold text-purple-600">₱{selectedVehicle.earnings.thisMonth.toLocaleString()}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">This Month</p>
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

      {/* Driver Details Modal */}
      {showDriverDetails && selectedDriver && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Driver Details</h3>
                <button 
                  onClick={() => {
                    setShowDriverDetails(false);
                    setSelectedDriver(null);
                  }}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Driver Profile */}
                <div className="lg:col-span-1">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 text-center">
                    <img src={selectedDriver.avatar} alt={selectedDriver.name} className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{selectedDriver.name}</h4>
                    <div className="flex items-center justify-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-5 h-5 ${i < Math.floor(selectedDriver.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">{selectedDriver.rating}</span>
                    </div>
                    <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                      selectedDriver.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      selectedDriver.status === 'on-break' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                      'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {selectedDriver.status === 'on-break' ? 'On Break' : selectedDriver.status.charAt(0).toUpperCase() + selectedDriver.status.slice(1)}
                    </span>
                  </div>

                  {/* Contact Information */}
                  <div className="mt-6 bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                    <h5 className="font-semibold text-gray-900 dark:text-white mb-4">Contact Information</h5>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span className="text-sm text-gray-600 dark:text-gray-400">{selectedDriver.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm text-gray-600 dark:text-gray-400">{selectedDriver.email}</span>
                      </div>
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="text-sm text-gray-600 dark:text-gray-400">{selectedDriver.license}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Driver Statistics */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Performance Metrics */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                    <h5 className="font-semibold text-gray-900 dark:text-white mb-4">Performance Metrics</h5>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">{selectedDriver.totalTrips.toLocaleString()}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Total Trips</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">{selectedDriver.rating}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Rating</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-purple-600">98%</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Completion Rate</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-orange-600">4.2</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Avg Trip Time (hrs)</p>
                      </div>
                    </div>
                  </div>

                  {/* Earnings Overview */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                    <h5 className="font-semibold text-gray-900 dark:text-white mb-4">Earnings Overview</h5>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-white dark:bg-gray-600 rounded-lg">
                        <p className="text-xl font-bold text-green-600">₱{selectedDriver.earnings.today.toLocaleString()}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Today</p>
                      </div>
                      <div className="text-center p-4 bg-white dark:bg-gray-600 rounded-lg">
                        <p className="text-xl font-bold text-blue-600">₱{selectedDriver.earnings.thisWeek.toLocaleString()}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">This Week</p>
                      </div>
                      <div className="text-center p-4 bg-white dark:bg-gray-600 rounded-lg">
                        <p className="text-xl font-bold text-purple-600">₱{selectedDriver.earnings.thisMonth.toLocaleString()}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">This Month</p>
                      </div>
                    </div>
                  </div>

                  {/* Vehicle Assignment */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                    <h5 className="font-semibold text-gray-900 dark:text-white mb-4">Vehicle Assignment</h5>
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{selectedDriver.vehicle}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Assigned since {selectedDriver.joinDate}</p>
                      </div>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                    <h5 className="font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h5>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-600">
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">Trip to NAIA Terminal 3</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">2 hours ago</p>
                        </div>
                        <span className="text-sm font-medium text-green-600">₱1,250</span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-600">
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">City Tour - 4 hours</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">5 hours ago</p>
                        </div>
                        <span className="text-sm font-medium text-green-600">₱3,200</span>
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">Hotel Transfer</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">8 hours ago</p>
                        </div>
                        <span className="text-sm font-medium text-green-600">₱850</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => {
                    setShowDriverDetails(false);
                    setSelectedDriver(null);
                  }}
                  className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setShowDriverDetails(false);
                    setShowContactDriver(true);
                  }}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  Contact Driver
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Driver Modal */}
      {showContactDriver && selectedDriver && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Contact {selectedDriver.name}</h3>
                <button 
                  onClick={() => {
                    setShowContactDriver(false);
                    setSelectedDriver(null);
                  }}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                {/* Quick Contact Options */}
                <div className="grid grid-cols-2 gap-4">
                  <a
                    href={`tel:${selectedDriver.phone}`}
                    className="flex items-center justify-center space-x-2 p-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="font-medium">Call</span>
                  </a>
                  <a
                    href={`sms:${selectedDriver.phone}`}
                    className="flex items-center justify-center space-x-2 p-4 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span className="font-medium">SMS</span>
                  </a>
                </div>

                {/* Send Message Form */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Send Message
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Type your message here..."
                  ></textarea>
                </div>

                {/* Quick Message Templates */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Quick Messages
                  </label>
                  <div className="space-y-2">
                    <button className="w-full text-left px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                      "Please report to the office"
                    </button>
                    <button className="w-full text-left px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                      "New booking assigned to you"
                    </button>
                    <button className="w-full text-left px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                      "Please update your location"
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4 pt-4">
                  <button
                    onClick={() => {
                      setShowContactDriver(false);
                      setSelectedDriver(null);
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Driver Modal */}
      {showAddDriver && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Add New Driver</h3>
                <button 
                  onClick={() => setShowAddDriver(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Personal Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Full Name *
                      </label>
                      <input 
                        type="text" 
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                        placeholder="e.g., Juan Dela Cruz" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Date of Birth *
                      </label>
                      <input 
                        type="date" 
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Phone Number *
                      </label>
                      <input 
                        type="tel" 
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                        placeholder="+63 917 123 4567" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <input 
                        type="email" 
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                        placeholder="juan.delacruz@email.com" 
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Address *
                      </label>
                      <textarea 
                        rows={3}
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                        placeholder="Complete address including barangay, city, and province"
                      ></textarea>
                    </div>
                  </div>
                </div>

                {/* License Information */}
                <div>
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">License Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Driver's License Number *
                      </label>
                      <input 
                        type="text" 
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                        placeholder="N01-12-345678" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        License Type *
                      </label>
                      <select 
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select License Type</option>
                        <option value="professional">Professional Driver's License</option>
                        <option value="non-professional">Non-Professional Driver's License</option>
                        <option value="student">Student Permit</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        License Expiry Date *
                      </label>
                      <input 
                        type="date" 
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Years of Experience *
                      </label>
                      <input 
                        type="number" 
                        required
                        min="0"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                        placeholder="5" 
                      />
                    </div>
                  </div>
                </div>

                {/* Employment Details */}
                <div>
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Employment Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Employment Type *
                      </label>
                      <select 
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select Employment Type</option>
                        <option value="full-time">Full-time</option>
                        <option value="part-time">Part-time</option>
                        <option value="contract">Contract</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Start Date *
                      </label>
                      <input 
                        type="date" 
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Assigned Vehicle
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option value="">Select Vehicle (Optional)</option>
                        <option value="toyota-vios-abc123">Toyota Vios - ABC 123</option>
                        <option value="honda-city-xyz789">Honda City - XYZ 789</option>
                        <option value="mitsubishi-mirage-def456">Mitsubishi Mirage - DEF 456</option>
                        <option value="nissan-almera-ghi789">Nissan Almera - GHI 789</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Base Salary (₱)
                      </label>
                      <input 
                        type="number" 
                        min="0"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                        placeholder="15000" 
                      />
                    </div>
                  </div>
                </div>

                {/* Emergency Contact */}
                <div>
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Emergency Contact</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Contact Name *
                      </label>
                      <input 
                        type="text" 
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                        placeholder="Maria Dela Cruz" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Relationship *
                      </label>
                      <select 
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select Relationship</option>
                        <option value="spouse">Spouse</option>
                        <option value="parent">Parent</option>
                        <option value="sibling">Sibling</option>
                        <option value="child">Child</option>
                        <option value="friend">Friend</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Contact Phone *
                      </label>
                      <input 
                        type="tel" 
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                        placeholder="+63 918 987 6543" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Contact Email
                      </label>
                      <input 
                        type="email" 
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                        placeholder="maria.delacruz@email.com" 
                      />
                    </div>
                  </div>
                </div>

                {/* Documents Upload */}
                <div>
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Required Documents</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Driver's License (Front & Back)
                      </label>
                      <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center">
                        <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Click to upload or drag and drop</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG up to 5MB</p>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Profile Photo
                      </label>
                      <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center">
                        <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Click to upload or drag and drop</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG up to 2MB</p>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Medical Certificate
                      </label>
                      <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center">
                        <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Click to upload or drag and drop</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">PDF, PNG, JPG up to 5MB</p>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Background Check/NBI Clearance
                      </label>
                      <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center">
                        <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Click to upload or drag and drop</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">PDF, PNG, JPG up to 5MB</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <div className="flex items-start space-x-3">
                    <input 
                      type="checkbox" 
                      id="terms"
                      required
                      className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="terms" className="text-sm text-gray-700 dark:text-gray-300">
                      I confirm that all information provided is accurate and complete. I agree to the 
                      <a href="#" className="text-blue-600 hover:text-blue-500 ml-1">terms and conditions</a> and 
                      <a href="#" className="text-blue-600 hover:text-blue-500 ml-1">privacy policy</a>.
                    </label>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <button 
                    type="button"
                    onClick={() => setShowAddDriver(false)}
                    className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Add Driver
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Booking Details Modal */}
      {showBookingDetails && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Booking Details</h3>
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
                        <span className="font-medium">{selectedBooking.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Status:</span>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
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
                        <span className="font-medium">{selectedBooking.bookingTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Pickup Time:</span>
                        <span className="font-medium">{selectedBooking.pickupTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Amount:</span>
                        <span className="font-medium text-green-600">₱{selectedBooking.amount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Payment Method:</span>
                        <span className="font-medium">{selectedBooking.paymentMethod}</span>
                      </div>
                    </div>
                  </div>

                  {/* Customer Information */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Customer Information</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Name:</span>
                        <span className="font-medium">{selectedBooking.customer.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Phone:</span>
                        <span className="font-medium">{selectedBooking.customer.phone}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">Rating:</span>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className={`w-4 h-4 ${i < Math.floor(selectedBooking.customer.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <span className="ml-2 text-sm">{selectedBooking.customer.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Driver Information */}
                  {selectedBooking.driver && (
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Driver Information</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Name:</span>
                          <span className="font-medium">{selectedBooking.driver.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Phone:</span>
                          <span className="font-medium">{selectedBooking.driver.phone}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Vehicle:</span>
                          <span className="font-medium">{selectedBooking.vehicle}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Route and Map */}
                <div className="space-y-6">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Route Information</h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center text-green-600 mb-1">
                          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          <span className="font-medium">Pickup Location</span>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 ml-7">{selectedBooking.pickup}</p>
                      </div>
                      <div>
                        <div className="flex items-center text-red-600 mb-1">
                          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          <span className="font-medium">Destination</span>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 ml-7">{selectedBooking.destination}</p>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-gray-200 dark:border-gray-600">
                        <span className="text-gray-600 dark:text-gray-400">Distance:</span>
                        <span className="font-medium">{selectedBooking.distance}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Duration:</span>
                        <span className="font-medium">{selectedBooking.duration}</span>
                      </div>
                    </div>
                  </div>

                  {/* Map Placeholder */}
                  <div className="bg-gray-200 dark:bg-gray-600 rounded-lg h-64 flex items-center justify-center">
                    <div className="text-center">
                      <svg className="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                      <p className="text-gray-500 dark:text-gray-400">Route Map</p>
                      <p className="text-sm text-gray-400 dark:text-gray-500">Interactive map would be displayed here</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button 
                  onClick={() => {
                    setShowBookingDetails(false);
                    setSelectedBooking(null);
                  }}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Close
                </button>
                {selectedBooking.status === 'pending' && (
                  <button 
                    onClick={() => {
                      setShowBookingDetails(false);
                      setShowAssignDriver(true);
                    }}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Assign Driver
                  </button>
                )}
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                  Contact Customer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Assign Driver Modal */}
      {showAssignDriver && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Assign Driver</h3>
                <button 
                  onClick={() => {
                    setShowAssignDriver(false);
                    setSelectedBooking(null);
                  }}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Booking Summary */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Booking Summary</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Booking ID:</span>
                    <span className="ml-2 font-medium">{selectedBooking.id}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Pickup Time:</span>
                    <span className="ml-2 font-medium">{selectedBooking.pickupTime}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-gray-600 dark:text-gray-400">Route:</span>
                    <span className="ml-2 font-medium">{selectedBooking.pickup} → {selectedBooking.destination}</span>
                  </div>
                </div>
              </div>

              {/* Available Drivers */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Available Drivers</h4>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {[
                    {
                      id: 1,
                      name: "Juan Dela Cruz",
                      phone: "+63 917 123 4567",
                      vehicle: "Toyota Vios - ABC 123",
                      rating: 4.8,
                      distance: "2.3 km away",
                      status: "active",
                      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
                    },
                    {
                      id: 2,
                      name: "Maria Santos",
                      phone: "+63 918 987 6543",
                      vehicle: "Honda City - XYZ 789",
                      rating: 4.9,
                      distance: "1.8 km away",
                      status: "active",
                      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
                    },
                    {
                      id: 3,
                      name: "Lisa Chen",
                      phone: "+63 922 666 7777",
                      vehicle: "Toyota Wigo - MNO 345",
                      rating: 4.9,
                      distance: "3.1 km away",
                      status: "active",
                      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
                    }
                  ].map((driver) => (
                    <div key={driver.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <img src={driver.avatar} alt={driver.name} className="w-12 h-12 rounded-full object-cover" />
                          <div>
                            <h5 className="font-medium text-gray-900 dark:text-white">{driver.name}</h5>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{driver.vehicle}</p>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <svg key={i} className={`w-3 h-3 ${i < Math.floor(driver.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                              <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">{driver.rating}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600 dark:text-gray-400">{driver.distance}</p>
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
                    setShowAssignDriver(false);
                    setSelectedBooking(null);
                  }}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors">
                  Auto Assign Best Driver
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 