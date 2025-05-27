'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Booking {
  id: string;
  confirmationNumber: string;
  type: 'car' | 'hotel' | 'restaurant' | 'activity';
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  title: string;
  subtitle: string;
  date: string;
  time?: string;
  location: string;
  price: number;
  image: string;
  driver?: {
    name: string;
    phone: string;
    vehicle: string;
  };
  details: {
    duration?: string;
    guests?: number;
    checkIn?: string;
    checkOut?: string;
  };
}

export default function MyBookingsPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'upcoming' | 'ongoing' | 'completed' | 'cancelled'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock bookings data
  const bookings: Booking[] = [
    {
      id: '1',
      confirmationNumber: 'BK001234',
      type: 'car',
      status: 'upcoming',
      title: 'Airport Transfer',
      subtitle: 'Juan Dela Cruz - Toyota Vios',
      date: '2024-03-20',
      time: '10:00 AM',
      location: 'Caticlan Airport → Grand Palace Hotel',
      price: 1650,
      image: '/api/placeholder/300/200',
      driver: {
        name: 'Juan Dela Cruz',
        phone: '+63 917 123 4567',
        vehicle: 'Toyota Vios - ABC 123'
      },
      details: {
        duration: '45 minutes',
        guests: 2
      }
    },
    {
      id: '2',
      confirmationNumber: 'BK001235',
      type: 'hotel',
      status: 'upcoming',
      title: 'Grand Palace Hotel Boracay',
      subtitle: 'Deluxe Ocean View Room',
      date: '2024-03-20',
      location: 'Station 1, Boracay',
      price: 8500,
      image: '/api/placeholder/300/200',
      details: {
        checkIn: '2024-03-20',
        checkOut: '2024-03-23',
        guests: 2
      }
    },
    {
      id: '3',
      confirmationNumber: 'BK001236',
      type: 'restaurant',
      status: 'upcoming',
      title: 'Sunset Grill Restaurant',
      subtitle: 'Dinner Reservation',
      date: '2024-03-21',
      time: '7:00 PM',
      location: 'White Beach, Boracay',
      price: 3200,
      image: '/api/placeholder/300/200',
      details: {
        guests: 4
      }
    },
    {
      id: '4',
      confirmationNumber: 'BK001237',
      type: 'activity',
      status: 'completed',
      title: 'Island Hopping Tour',
      subtitle: 'Crystal Cove & Crocodile Island',
      date: '2024-03-15',
      time: '9:00 AM',
      location: 'Boracay Waters',
      price: 2800,
      image: '/api/placeholder/300/200',
      details: {
        duration: '6 hours',
        guests: 2
      }
    },
    {
      id: '5',
      confirmationNumber: 'BK001238',
      type: 'car',
      status: 'cancelled',
      title: 'City Tour',
      subtitle: 'Maria Santos - Honda Civic',
      date: '2024-03-18',
      time: '2:00 PM',
      location: 'Kalibo City Tour',
      price: 4500,
      image: '/api/placeholder/300/200',
      details: {
        duration: '4 hours',
        guests: 3
      }
    }
  ];

  const filteredBookings = bookings.filter(booking => {
    const matchesTab = activeTab === 'all' || booking.status === activeTab;
    const matchesSearch = booking.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         booking.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         booking.confirmationNumber.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'ongoing': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'completed': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'car':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
        );
      case 'hotel':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        );
      case 'restaurant':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      case 'activity':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-5-10v20m0-20V3a1 1 0 011-1h2a1 1 0 011 1v2m-4 0h4" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getTabCount = (status: string) => {
    if (status === 'all') return bookings.length;
    return bookings.filter(booking => booking.status === status).length;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Bookings</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage all your travel bookings in one place</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search bookings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Quick Actions */}
            <div className="flex space-x-3">
              <Link href="/car-services">
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                  New Booking
                </button>
              </Link>
              <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg font-medium transition-colors">
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md mb-6">
          <div className="border-b border-gray-200 dark:border-gray-600">
            <nav className="flex space-x-8 px-6">
              {[
                { key: 'all', label: 'All Bookings' },
                { key: 'upcoming', label: 'Upcoming' },
                { key: 'ongoing', label: 'Ongoing' },
                { key: 'completed', label: 'Completed' },
                { key: 'cancelled', label: 'Cancelled' }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.key
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  {tab.label}
                  <span className="ml-2 px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-xs">
                    {getTabCount(tab.key)}
                  </span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
              <div key={booking.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-6">
                  {/* Image */}
                  <div className="flex-shrink-0">
                    <img src={booking.image} alt={booking.title} className="w-full lg:w-24 h-48 lg:h-24 object-cover rounded-lg" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="text-blue-600 dark:text-blue-400">
                          {getTypeIcon(booking.type)}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                          {booking.title}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-lg font-bold text-green-600">₱{booking.price.toLocaleString()}</p>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 mb-2">{booking.subtitle}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500 dark:text-gray-400">Date & Time</p>
                        <p className="font-medium">{new Date(booking.date).toLocaleDateString()}</p>
                        {booking.time && <p className="text-gray-600 dark:text-gray-400">{booking.time}</p>}
                      </div>
                      <div>
                        <p className="text-gray-500 dark:text-gray-400">Location</p>
                        <p className="font-medium">{booking.location}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 dark:text-gray-400">Confirmation</p>
                        <p className="font-medium">#{booking.confirmationNumber}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 dark:text-gray-400">Details</p>
                        {booking.details.duration && <p className="font-medium">{booking.details.duration}</p>}
                        {booking.details.guests && <p className="text-gray-600 dark:text-gray-400">{booking.details.guests} guests</p>}
                        {booking.details.checkIn && booking.details.checkOut && (
                          <p className="text-gray-600 dark:text-gray-400">
                            {new Date(booking.details.checkIn).toLocaleDateString()} - {new Date(booking.details.checkOut).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex-shrink-0">
                    <div className="flex flex-col space-y-2">
                      {booking.type === 'car' && booking.status === 'upcoming' && (
                        <Link href={`/booking-confirmation/${booking.id}`}>
                          <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
                            View Details
                          </button>
                        </Link>
                      )}
                      
                      {booking.driver && booking.status === 'upcoming' && (
                        <a href={`tel:${booking.driver.phone}`}>
                          <button className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors">
                            Call Driver
                          </button>
                        </a>
                      )}

                      {booking.status === 'upcoming' && (
                        <button className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg text-sm font-medium transition-colors">
                          Modify
                        </button>
                      )}

                      {booking.status === 'completed' && (
                        <button className="w-full px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg text-sm font-medium transition-colors">
                          Rate & Review
                        </button>
                      )}

                      {(booking.status === 'upcoming' || booking.status === 'ongoing') && (
                        <button className="w-full px-4 py-2 border border-red-300 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-sm font-medium transition-colors">
                          Cancel
                        </button>
                      )}

                      <button className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg text-sm font-medium transition-colors">
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No bookings found</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {searchQuery ? 'Try adjusting your search criteria' : 'You haven\'t made any bookings yet'}
              </p>
              <Link href="/car-services">
                <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                  Make Your First Booking
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* Summary Stats */}
        {filteredBookings.length > 0 && (
          <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Booking Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">{bookings.filter(b => b.status === 'upcoming').length}</p>
                <p className="text-sm text-blue-800 dark:text-blue-400">Upcoming</p>
              </div>
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="text-2xl font-bold text-green-600">{bookings.filter(b => b.status === 'completed').length}</p>
                <p className="text-sm text-green-800 dark:text-green-400">Completed</p>
              </div>
              <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <p className="text-2xl font-bold text-purple-600">₱{bookings.reduce((sum, b) => sum + b.price, 0).toLocaleString()}</p>
                <p className="text-sm text-purple-800 dark:text-purple-400">Total Spent</p>
              </div>
              <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <p className="text-2xl font-bold text-orange-600">{bookings.length}</p>
                <p className="text-sm text-orange-800 dark:text-orange-400">Total Bookings</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 