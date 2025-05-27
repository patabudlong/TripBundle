'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Driver {
  id: string;
  name: string;
  photo: string;
  rating: number;
  totalTrips: number;
  yearsExperience: number;
  specialties: string[];
  availability: 'available' | 'busy' | 'offline';
  vehicle: {
    model: string;
    year: number;
    plateNumber: string;
    color: string;
    capacity: number;
    type: string;
    features: string[];
    image: string;
  };
  pricing: {
    hourly: number;
    daily: number;
    airport: number;
  };
  location: string;
  responseTime: string;
}

export default function CarServicesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'available' | 'sedan' | 'suv' | 'van'>('all');
  const [sortBy, setSortBy] = useState<'rating' | 'price' | 'experience'>('rating');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Mock drivers data
  const drivers: Driver[] = [
    {
      id: "DRV001",
      name: "Juan Dela Cruz",
      photo: "/api/placeholder/100/100",
      rating: 4.8,
      totalTrips: 1247,
      yearsExperience: 8,
      specialties: ["Airport Transfers", "City Tours", "Long Distance"],
      availability: 'available',
      vehicle: {
        model: "Toyota Vios",
        year: 2022,
        plateNumber: "ABC 123",
        color: "Silver",
        capacity: 4,
        type: "Sedan",
        features: ["Air Conditioning", "GPS Navigation", "Phone Charger", "WiFi"],
        image: "/api/placeholder/300/200"
      },
      pricing: {
        hourly: 800,
        daily: 5000,
        airport: 1500
      },
      location: "Caticlan Airport",
      responseTime: "< 5 min"
    },
    {
      id: "DRV002",
      name: "Maria Santos",
      photo: "/api/placeholder/100/100",
      rating: 4.9,
      totalTrips: 892,
      yearsExperience: 6,
      specialties: ["Family Tours", "Shopping Trips", "Beach Transfers"],
      availability: 'available',
      vehicle: {
        model: "Honda CR-V",
        year: 2023,
        plateNumber: "XYZ 789",
        color: "White",
        capacity: 7,
        type: "SUV",
        features: ["Air Conditioning", "GPS Navigation", "Phone Charger", "WiFi", "Child Seats"],
        image: "/api/placeholder/300/200"
      },
      pricing: {
        hourly: 1200,
        daily: 7500,
        airport: 2000
      },
      location: "Boracay Station 1",
      responseTime: "< 3 min"
    },
    {
      id: "DRV003",
      name: "Roberto Garcia",
      photo: "/api/placeholder/100/100",
      rating: 4.7,
      totalTrips: 1456,
      yearsExperience: 12,
      specialties: ["Group Tours", "Event Transportation", "Corporate Travel"],
      availability: 'busy',
      vehicle: {
        model: "Toyota Hiace",
        year: 2021,
        plateNumber: "DEF 456",
        color: "Blue",
        capacity: 15,
        type: "Van",
        features: ["Air Conditioning", "GPS Navigation", "Sound System", "WiFi", "Luggage Space"],
        image: "/api/placeholder/300/200"
      },
      pricing: {
        hourly: 1800,
        daily: 12000,
        airport: 3000
      },
      location: "Kalibo Airport",
      responseTime: "< 10 min"
    },
    {
      id: "DRV004",
      name: "Ana Reyes",
      photo: "/api/placeholder/100/100",
      rating: 4.6,
      totalTrips: 634,
      yearsExperience: 4,
      specialties: ["City Tours", "Restaurant Hopping", "Night Life"],
      availability: 'available',
      vehicle: {
        model: "Mitsubishi Mirage",
        year: 2020,
        plateNumber: "GHI 789",
        color: "Red",
        capacity: 4,
        type: "Sedan",
        features: ["Air Conditioning", "GPS Navigation", "Phone Charger"],
        image: "/api/placeholder/300/200"
      },
      pricing: {
        hourly: 600,
        daily: 4000,
        airport: 1200
      },
      location: "Boracay Station 2",
      responseTime: "< 7 min"
    },
    {
      id: "DRV005",
      name: "Carlos Mendoza",
      photo: "/api/placeholder/100/100",
      rating: 4.9,
      totalTrips: 2103,
      yearsExperience: 15,
      specialties: ["Luxury Tours", "VIP Service", "Executive Travel"],
      availability: 'available',
      vehicle: {
        model: "Toyota Camry",
        year: 2023,
        plateNumber: "VIP 001",
        color: "Black",
        capacity: 4,
        type: "Sedan",
        features: ["Leather Seats", "Premium Sound", "WiFi", "Phone Charger", "Bottled Water"],
        image: "/api/placeholder/300/200"
      },
      pricing: {
        hourly: 1500,
        daily: 10000,
        airport: 2500
      },
      location: "Boracay Station 3",
      responseTime: "< 2 min"
    },
    {
      id: "DRV006",
      name: "Lisa Fernandez",
      photo: "/api/placeholder/100/100",
      rating: 4.5,
      totalTrips: 445,
      yearsExperience: 3,
      specialties: ["Beach Tours", "Island Hopping", "Adventure Tours"],
      availability: 'offline',
      vehicle: {
        model: "Ford EcoSport",
        year: 2021,
        plateNumber: "ECO 123",
        color: "Orange",
        capacity: 5,
        type: "SUV",
        features: ["Air Conditioning", "GPS Navigation", "Phone Charger", "Roof Rack"],
        image: "/api/placeholder/300/200"
      },
      pricing: {
        hourly: 900,
        daily: 6000,
        airport: 1800
      },
      location: "Boracay Station 1",
      responseTime: "< 15 min"
    }
  ];

  // Filter and sort drivers
  const filteredDrivers = drivers
    .filter(driver => {
      const matchesSearch = driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           driver.vehicle.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           driver.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesFilter = selectedFilter === 'all' || 
                           (selectedFilter === 'available' && driver.availability === 'available') ||
                           (selectedFilter === 'sedan' && driver.vehicle.type === 'Sedan') ||
                           (selectedFilter === 'suv' && driver.vehicle.type === 'SUV') ||
                           (selectedFilter === 'van' && driver.vehicle.type === 'Van');
      
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'price':
          return a.pricing.hourly - b.pricing.hourly;
        case 'experience':
          return b.yearsExperience - a.yearsExperience;
        default:
          return 0;
      }
    });

  const getAvailabilityColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'busy': return 'bg-yellow-100 text-yellow-800';
      case 'offline': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAvailabilityText = (status: string) => {
    switch (status) {
      case 'available': return 'Available Now';
      case 'busy': return 'Currently Busy';
      case 'offline': return 'Offline';
      default: return 'Unknown';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Car Services</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Find the perfect driver and vehicle for your trip</p>
            </div>
            <Link href="/trip/1" className="text-blue-600 hover:text-blue-700 flex items-center">
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Trip
            </Link>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search drivers, cars, or specialties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-4">
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="all">All Vehicles</option>
                <option value="available">Available Only</option>
                <option value="sedan">Sedans</option>
                <option value="suv">SUVs</option>
                <option value="van">Vans</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="rating">Sort by Rating</option>
                <option value="price">Sort by Price</option>
                <option value="experience">Sort by Experience</option>
              </select>

              {/* View Mode Toggle */}
              <div className="flex border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600 dark:text-gray-400">
            Showing {filteredDrivers.length} of {drivers.length} drivers
          </p>
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
            <span className="text-sm text-gray-600 dark:text-gray-400">Available</span>
            <span className="w-3 h-3 bg-yellow-500 rounded-full ml-4"></span>
            <span className="text-sm text-gray-600 dark:text-gray-400">Busy</span>
            <span className="w-3 h-3 bg-gray-500 rounded-full ml-4"></span>
            <span className="text-sm text-gray-600 dark:text-gray-400">Offline</span>
          </div>
        </div>

        {/* Driver Cards */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDrivers.map((driver) => (
              <div key={driver.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                {/* Vehicle Image */}
                <div className="relative">
                  <img src={driver.vehicle.image} alt={driver.vehicle.model} className="w-full h-48 object-cover" />
                  <div className="absolute top-4 right-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(driver.availability)}`}>
                      {getAvailabilityText(driver.availability)}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                    {driver.vehicle.type} • {driver.vehicle.capacity} seats
                  </div>
                </div>

                <div className="p-6">
                  {/* Driver Info */}
                  <div className="flex items-center mb-4">
                    <img src={driver.photo} alt={driver.name} className="w-12 h-12 rounded-full mr-3" />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{driver.name}</h3>
                      <div className="flex items-center">
                        <div className="flex items-center mr-2">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className={`w-4 h-4 ${i < Math.floor(driver.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">{driver.rating} ({driver.totalTrips} trips)</span>
                      </div>
                    </div>
                  </div>

                  {/* Vehicle Details */}
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">{driver.vehicle.model} {driver.vehicle.year}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{driver.vehicle.color} • {driver.vehicle.plateNumber}</p>
                    <div className="flex flex-wrap gap-1">
                      {driver.vehicle.features.slice(0, 3).map((feature, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs">
                          {feature}
                        </span>
                      ))}
                      {driver.vehicle.features.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs">
                          +{driver.vehicle.features.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="mb-4">
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Hourly</p>
                        <p className="font-semibold text-green-600">₱{driver.pricing.hourly}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Daily</p>
                        <p className="font-semibold text-green-600">₱{driver.pricing.daily}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Airport</p>
                        <p className="font-semibold text-green-600">₱{driver.pricing.airport}</p>
                      </div>
                    </div>
                  </div>

                  {/* Location & Response Time */}
                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {driver.location}
                    </span>
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {driver.responseTime}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <Link href={`/driver-details/${driver.id}`} className="flex-1">
                      <button className="w-full px-4 py-2 border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg font-medium transition-colors">
                        View Details
                      </button>
                    </Link>
                    <button 
                      disabled={driver.availability !== 'available'}
                      onClick={() => router.push(`/book-driver/${driver.id}`)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        driver.availability === 'available' 
                          ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                          : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {driver.availability === 'available' ? 'Book Now' : 'Unavailable'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* List View */
          <div className="space-y-4">
            {filteredDrivers.map((driver) => (
              <div key={driver.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center space-x-6">
                  {/* Vehicle Image */}
                  <div className="relative">
                    <img src={driver.vehicle.image} alt={driver.vehicle.model} className="w-32 h-24 object-cover rounded-lg" />
                    <div className="absolute top-2 right-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(driver.availability)}`}>
                        {getAvailabilityText(driver.availability)}
                      </span>
                    </div>
                  </div>

                  {/* Driver & Vehicle Info */}
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <img src={driver.photo} alt={driver.name} className="w-10 h-10 rounded-full mr-3" />
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{driver.name}</h3>
                        <div className="flex items-center">
                          <div className="flex items-center mr-2">
                            {[...Array(5)].map((_, i) => (
                              <svg key={i} className={`w-3 h-3 ${i < Math.floor(driver.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <span className="text-xs text-gray-600 dark:text-gray-400">{driver.rating} ({driver.totalTrips} trips)</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">{driver.vehicle.model} {driver.vehicle.year}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{driver.vehicle.type} • {driver.vehicle.capacity} seats</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{driver.vehicle.color} • {driver.vehicle.plateNumber}</p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Specialties:</p>
                        <div className="flex flex-wrap gap-1">
                          {driver.specialties.slice(0, 2).map((specialty, index) => (
                            <span key={index} className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded text-xs">
                              {specialty}
                            </span>
                          ))}
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{driver.yearsExperience} years experience</p>
                      </div>

                      <div>
                        <div className="grid grid-cols-3 gap-2 text-center mb-2">
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Hourly</p>
                            <p className="font-semibold text-green-600">₱{driver.pricing.hourly}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Daily</p>
                            <p className="font-semibold text-green-600">₱{driver.pricing.daily}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Airport</p>
                            <p className="font-semibold text-green-600">₱{driver.pricing.airport}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                          <span>{driver.location}</span>
                          <span>{driver.responseTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col space-y-2">
                    <Link href={`/driver-details/${driver.id}`}>
                      <button className="px-4 py-2 border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg font-medium transition-colors">
                        View Details
                      </button>
                    </Link>
                    <button 
                      disabled={driver.availability !== 'available'}
                      onClick={() => router.push(`/book-driver/${driver.id}`)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        driver.availability === 'available' 
                          ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                          : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {driver.availability === 'available' ? 'Book Now' : 'Unavailable'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {filteredDrivers.length === 0 && (
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.175-5.5-2.709M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No drivers found</h3>
            <p className="text-gray-600 dark:text-gray-400">Try adjusting your search criteria or filters</p>
          </div>
        )}
      </div>
    </div>
  );
} 