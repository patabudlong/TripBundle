'use client';

import { useState } from 'react';
import Link from 'next/link';

interface BucketListDestination {
  id: number;
  name: string;
  region: string;
  province: string;
  city: string;
  rating: number;
  reviews: number;
  category: string;
  image: string;
  priceRange: string;
  dateAdded: string;
}

interface TripBundle {
  id: number;
  destination: string;
  region: string;
  dates: {
    checkIn: string;
    checkOut: string;
  };
  status: 'planned' | 'booked' | 'completed' | 'cancelled';
  totalCost: number;
  guests: number;
  hotel?: string;
  car?: string;
  restaurants: number;
  createdAt: string;
  image: string;
}

export default function UserPage() {
  const [activeTab, setActiveTab] = useState<'bucket-list' | 'planned' | 'history'>('bucket-list');

  // Mock data for bucket list destinations
  const bucketListDestinations: BucketListDestination[] = [
    {
      id: 1,
      name: "Boracay",
      region: "Region VI (Western Visayas)",
      province: "Aklan",
      city: "Boracay (Malay)",
      rating: 4.1,
      reviews: 103,
      category: "Islands, Points of Interest & Landmarks",
      image: "/api/placeholder/300/200",
      priceRange: "₱3,000 - ₱15,000",
      dateAdded: "2024-01-15"
    },
    {
      id: 2,
      name: "Palawan",
      region: "Region IV-B (MIMAROPA)",
      province: "Palawan",
      city: "Puerto Princesa",
      rating: 4.5,
      reviews: 287,
      category: "Islands, Nature & Wildlife",
      image: "/api/placeholder/300/200",
      priceRange: "₱4,000 - ₱20,000",
      dateAdded: "2024-01-20"
    },
    {
      id: 3,
      name: "Siargao",
      region: "Region XIII (Caraga)",
      province: "Surigao del Norte",
      city: "Del Carmen",
      rating: 4.4,
      reviews: 89,
      category: "Islands, Surfing & Water Sports",
      image: "/api/placeholder/300/200",
      priceRange: "₱2,000 - ₱10,000",
      dateAdded: "2024-02-01"
    }
  ];

  // Mock data for planned trips
  const plannedTrips: TripBundle[] = [
    {
      id: 1,
      destination: "Boracay, Aklan",
      region: "Region VI (Western Visayas)",
      dates: {
        checkIn: "2024-03-15",
        checkOut: "2024-03-20"
      },
      status: 'planned',
      totalCost: 45000,
      guests: 2,
      hotel: "Grand Palace Hotel",
      car: "Toyota Vios",
      restaurants: 3,
      createdAt: "2024-01-25",
      image: "/api/placeholder/300/200"
    },
    {
      id: 2,
      destination: "Cebu City, Cebu",
      region: "Region VII (Central Visayas)",
      dates: {
        checkIn: "2024-04-10",
        checkOut: "2024-04-15"
      },
      status: 'booked',
      totalCost: 38000,
      guests: 4,
      hotel: "Luxury Resort & Spa",
      car: "Honda CR-V",
      restaurants: 2,
      createdAt: "2024-02-05",
      image: "/api/placeholder/300/200"
    }
  ];

  // Mock data for trip history
  const tripHistory: TripBundle[] = [
    {
      id: 3,
      destination: "Bohol, Tagbilaran",
      region: "Region VII (Central Visayas)",
      dates: {
        checkIn: "2023-12-20",
        checkOut: "2023-12-25"
      },
      status: 'completed',
      totalCost: 32000,
      guests: 2,
      hotel: "Beachfront Resort",
      car: "Mitsubishi Mirage",
      restaurants: 4,
      createdAt: "2023-11-15",
      image: "/api/placeholder/300/200"
    },
    {
      id: 4,
      destination: "Palawan, El Nido",
      region: "Region IV-B (MIMAROPA)",
      dates: {
        checkIn: "2023-10-05",
        checkOut: "2023-10-10"
      },
      status: 'completed',
      totalCost: 55000,
      guests: 3,
      hotel: "Island Paradise Resort",
      car: "Toyota Innova",
      restaurants: 5,
      createdAt: "2023-09-01",
      image: "/api/placeholder/300/200"
    },
    {
      id: 5,
      destination: "Baguio, Benguet",
      region: "Cordillera Administrative Region (CAR)",
      dates: {
        checkIn: "2023-08-15",
        checkOut: "2023-08-18"
      },
      status: 'cancelled',
      totalCost: 18000,
      guests: 2,
      hotel: "Mountain View Hotel",
      car: "Honda City",
      restaurants: 2,
      createdAt: "2023-07-20",
      image: "/api/placeholder/300/200"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planned': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'booked': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'completed': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'planned':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case 'booked':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'completed':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'cancelled':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Travel Dashboard</h1>
              <p className="text-gray-600 dark:text-gray-400">Manage your destinations, trips, and travel history</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Bucket List</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{bucketListDestinations.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Planned Trips</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{plannedTrips.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{tripHistory.filter(t => t.status === 'completed').length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Spent</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">₱{tripHistory.filter(t => t.status === 'completed').reduce((sum, trip) => sum + trip.totalCost, 0).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('bucket-list')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'bucket-list'
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                  Bucket List ({bucketListDestinations.length})
                </div>
              </button>
              <button
                onClick={() => setActiveTab('planned')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'planned'
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Planned Trips ({plannedTrips.length})
                </div>
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'history'
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Trip History ({tripHistory.length})
                </div>
              </button>
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {/* Bucket List Tab */}
          {activeTab === 'bucket-list' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">My Bucket List</h2>
                <Link 
                  href="/destinations"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  Discover More
                </Link>
              </div>

              {bucketListDestinations.length === 0 ? (
                <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                  <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No destinations in your bucket list</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">Start exploring and add destinations you'd love to visit!</p>
                  <Link 
                    href="/destinations"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Explore Destinations
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {bucketListDestinations.map((destination) => (
                    <div key={destination.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700">
                      <div className="relative h-48 overflow-hidden rounded-t-xl">
                        <img 
                          src={destination.image} 
                          alt={destination.name}
                          className="w-full h-full object-cover"
                        />
                        <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-md">
                          <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                          </svg>
                        </button>
                        <div className="absolute top-3 left-3 bg-black/70 text-white px-2 py-1 rounded-md text-xs font-medium">
                          {destination.priceRange}
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{destination.name}</h3>
                        <div className="flex items-center mb-2">
                          <span className="text-sm font-semibold text-gray-900 dark:text-white mr-1">{destination.rating}</span>
                          <div className="flex items-center mr-2">
                            {[...Array(5)].map((_, i) => (
                              <svg key={i} className={`w-4 h-4 ${i < Math.floor(destination.rating) ? 'text-green-500' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">({destination.reviews})</span>
                        </div>
                        <p className="text-sm text-blue-600 dark:text-blue-400 mb-3">{destination.category}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">Added on {new Date(destination.dateAdded).toLocaleDateString()}</p>
                        <div className="flex space-x-2">
                          <Link 
                            href={`/bundle?destination=${encodeURIComponent(JSON.stringify({
                              region: destination.region,
                              province: destination.province,
                              city: destination.city,
                              barangay: ''
                            }))}`}
                            className="flex-1 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white text-sm font-medium rounded-lg transition-all duration-200 text-center"
                          >
                            Plan Trip
                          </Link>
                          <button className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Planned Trips Tab */}
          {activeTab === 'planned' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Planned Trips</h2>
                <Link 
                  href="/bundle"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  Plan New Trip
                </Link>
              </div>

              {plannedTrips.length === 0 ? (
                <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                  <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No planned trips yet</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">Start planning your next adventure!</p>
                  <Link 
                    href="/bundle"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Create Trip Bundle
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {plannedTrips.map((trip) => (
                    <div key={trip.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
                      <div className="md:flex">
                        <div className="md:w-48 h-48 md:h-auto">
                          <img 
                            src={trip.image} 
                            alt={trip.destination}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{trip.destination}</h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{trip.region}</p>
                            </div>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(trip.status)}`}>
                              {getStatusIcon(trip.status)}
                              <span className="ml-1 capitalize">{trip.status}</span>
                            </span>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div>
                              <p className="text-xs text-gray-500 dark:text-gray-400">Check-in</p>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">{new Date(trip.dates.checkIn).toLocaleDateString()}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 dark:text-gray-400">Check-out</p>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">{new Date(trip.dates.checkOut).toLocaleDateString()}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 dark:text-gray-400">Guests</p>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">{trip.guests} people</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 dark:text-gray-400">Total Cost</p>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">₱{trip.totalCost.toLocaleString()}</p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
                            {trip.hotel && (
                              <div className="flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                                {trip.hotel}
                              </div>
                            )}
                            {trip.car && (
                              <div className="flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                </svg>
                                {trip.car}
                              </div>
                            )}
                            <div className="flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                              </svg>
                              {trip.restaurants} restaurants
                            </div>
                          </div>

                          <div className="flex space-x-3">
                            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                              View Details
                            </button>
                            <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg font-medium transition-colors">
                              Edit Trip
                            </button>
                            {trip.status === 'planned' && (
                              <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors">
                                Book Now
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Trip History Tab */}
          {activeTab === 'history' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Trip History</h2>
                <div className="flex space-x-2">
                  <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option>All Status</option>
                    <option>Completed</option>
                    <option>Cancelled</option>
                  </select>
                  <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option>All Time</option>
                    <option>This Year</option>
                    <option>Last Year</option>
                  </select>
                </div>
              </div>

              {tripHistory.length === 0 ? (
                <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                  <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No trip history</h3>
                  <p className="text-gray-600 dark:text-gray-400">Your completed and cancelled trips will appear here</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {tripHistory.map((trip) => (
                    <div key={trip.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
                      <div className="md:flex">
                        <div className="md:w-48 h-48 md:h-auto">
                          <img 
                            src={trip.image} 
                            alt={trip.destination}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{trip.destination}</h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{trip.region}</p>
                            </div>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(trip.status)}`}>
                              {getStatusIcon(trip.status)}
                              <span className="ml-1 capitalize">{trip.status}</span>
                            </span>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div>
                              <p className="text-xs text-gray-500 dark:text-gray-400">Trip Dates</p>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {new Date(trip.dates.checkIn).toLocaleDateString()} - {new Date(trip.dates.checkOut).toLocaleDateString()}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 dark:text-gray-400">Duration</p>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {Math.ceil((new Date(trip.dates.checkOut).getTime() - new Date(trip.dates.checkIn).getTime()) / (1000 * 60 * 60 * 24))} days
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 dark:text-gray-400">Guests</p>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">{trip.guests} people</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 dark:text-gray-400">Total Cost</p>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">₱{trip.totalCost.toLocaleString()}</p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
                            {trip.hotel && (
                              <div className="flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                                {trip.hotel}
                              </div>
                            )}
                            {trip.car && (
                              <div className="flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                </svg>
                                {trip.car}
                              </div>
                            )}
                            <div className="flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                              </svg>
                              {trip.restaurants} restaurants
                            </div>
                          </div>

                          <div className="flex space-x-3">
                            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                              View Details
                            </button>
                            {trip.status === 'completed' && (
                              <>
                                <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg font-medium transition-colors">
                                  Leave Review
                                </button>
                                <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors">
                                  Book Again
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 