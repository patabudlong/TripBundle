'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface TripDetails {
  id: number;
  destination: string;
  region: string;
  province: string;
  city: string;
  dates: {
    checkIn: string;
    checkOut: string;
  };
  status: 'planned' | 'booked' | 'completed' | 'cancelled';
  totalCost: number;
  guests: number;
  createdAt: string;
  images: string[];
  hotel: {
    name: string;
    rating: number;
    address: string;
    amenities: string[];
    checkIn: string;
    checkOut: string;
    cost: number;
    image: string;
  };
  car: {
    model: string;
    type: string;
    features: string[];
    pickupLocation: string;
    cost: number;
    image: string;
  };
  restaurants: Array<{
    name: string;
    cuisine: string;
    rating: number;
    address: string;
    reservationTime: string;
    cost: number;
    image: string;
  }>;
  activities: Array<{
    name: string;
    type: string;
    duration: string;
    cost: number;
    description: string;
    included: string[];
  }>;
  itinerary: Array<{
    day: number;
    date: string;
    activities: Array<{
      time: string;
      activity: string;
      location: string;
      notes?: string;
    }>;
  }>;
}

export default function TripDetailsPage() {
  const params = useParams();
  const tripId = params.id;
  
  const [activeTab, setActiveTab] = useState<'overview' | 'itinerary' | 'bookings'>('overview');
  const [showShareModal, setShowShareModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Mock trip data
  const tripDetails: TripDetails = {
    id: 1,
    destination: "Boracay, Aklan",
    region: "Region VI (Western Visayas)",
    province: "Aklan",
    city: "Boracay (Malay)",
    dates: {
      checkIn: "2024-03-15",
      checkOut: "2024-03-20"
    },
    status: 'booked',
    totalCost: 45000,
    guests: 2,
    createdAt: "2024-01-25",
    images: [
      "/api/placeholder/800/400",
      "/api/placeholder/800/400",
      "/api/placeholder/800/400",
      "/api/placeholder/800/400"
    ],
    hotel: {
      name: "Grand Palace Hotel Boracay",
      rating: 4.2,
      address: "Station 1, White Beach, Boracay Island",
      amenities: ["Free WiFi", "Pool", "Beach Access", "Restaurant", "Spa", "Gym"],
      checkIn: "2024-03-15",
      checkOut: "2024-03-20",
      cost: 25000,
      image: "/api/placeholder/300/200"
    },
    car: {
      model: "Toyota Vios",
      type: "Sedan",
      features: ["Air Conditioning", "GPS Navigation", "Bluetooth", "USB Charging"],
      pickupLocation: "Caticlan Airport",
      cost: 8000,
      image: "/api/placeholder/300/200"
    },
    restaurants: [
      {
        name: "Sunny Side Cafe",
        cuisine: "International",
        rating: 4.3,
        address: "Station 2, White Beach",
        reservationTime: "2024-03-16 19:00",
        cost: 3500,
        image: "/api/placeholder/300/200"
      },
      {
        name: "D'Talipapa Seafood Market",
        cuisine: "Filipino Seafood",
        rating: 4.1,
        address: "D'Mall, Station 2",
        reservationTime: "2024-03-17 18:30",
        cost: 4000,
        image: "/api/placeholder/300/200"
      },
      {
        name: "Aria Restaurant",
        cuisine: "Italian",
        rating: 4.5,
        address: "Station 1, White Beach",
        reservationTime: "2024-03-18 20:00",
        cost: 4500,
        image: "/api/placeholder/300/200"
      }
    ],
    activities: [
      {
        name: "Island Hopping Tour",
        type: "Water Activity",
        duration: "6 hours",
        cost: 2500,
        description: "Visit Crystal Cove, Crocodile Island, and Magic Island",
        included: ["Transportation", "Snacks"]
      },
      {
        name: "Sunset Sailing",
        type: "Water Activity", 
        duration: "2 hours",
        cost: 1500,
        description: "Romantic sunset sailing experience with drinks",
        included: ["Transportation", "Drinks"]
      },
      {
        name: "ATV Adventure",
        type: "Land Activity",
        duration: "3 hours", 
        cost: 2000,
        description: "Off-road adventure through Boracay's interior",
        included: ["Transportation", "Safety Gear"]
      }
    ],
    itinerary: [
      {
        day: 1,
        date: "2024-03-15",
        activities: [
          { time: "10:00", activity: "Arrival at Caticlan Airport", location: "Caticlan Airport" },
          { time: "11:30", activity: "Ferry to Boracay", location: "Caticlan Jetty Port" },
          { time: "12:30", activity: "Hotel Check-in", location: "Grand Palace Hotel" },
          { time: "14:00", activity: "Lunch", location: "Hotel Restaurant" },
          { time: "16:00", activity: "Beach Exploration", location: "White Beach Station 1" },
          { time: "18:00", activity: "Sunset Viewing", location: "White Beach" },
          { time: "19:30", activity: "Welcome Dinner", location: "Sunny Side Cafe" }
        ]
      },
      {
        day: 2,
        date: "2024-03-16",
        activities: [
          { time: "08:00", activity: "Breakfast", location: "Hotel Restaurant" },
          { time: "09:30", activity: "Island Hopping Tour", location: "Station 1 Beach" },
          { time: "15:30", activity: "Return to Hotel", location: "Grand Palace Hotel" },
          { time: "17:00", activity: "Spa Treatment", location: "Hotel Spa" },
          { time: "19:00", activity: "Dinner", location: "D'Talipapa Seafood Market" },
          { time: "21:00", activity: "Beach Bar Hopping", location: "Station 2" }
        ]
      },
      {
        day: 3,
        date: "2024-03-17",
        activities: [
          { time: "08:00", activity: "Breakfast", location: "Hotel Restaurant" },
          { time: "10:00", activity: "ATV Adventure", location: "Boracay Interior" },
          { time: "14:00", activity: "Lunch", location: "Local Restaurant" },
          { time: "16:00", activity: "Shopping", location: "D'Mall" },
          { time: "18:00", activity: "Sunset Sailing", location: "White Beach" },
          { time: "20:00", activity: "Fine Dining", location: "Aria Restaurant" }
        ]
      },
      {
        day: 4,
        date: "2024-03-18",
        activities: [
          { time: "08:00", activity: "Breakfast", location: "Hotel Restaurant" },
          { time: "10:00", activity: "Beach Relaxation", location: "White Beach" },
          { time: "12:00", activity: "Lunch", location: "Beachfront Restaurant" },
          { time: "14:00", activity: "Water Sports", location: "Station 2 Beach" },
          { time: "17:00", activity: "Packing", location: "Hotel Room" },
          { time: "19:00", activity: "Farewell Dinner", location: "Hotel Restaurant" }
        ]
      },
      {
        day: 5,
        date: "2024-03-19",
        activities: [
          { time: "09:00", activity: "Hotel Check-out", location: "Grand Palace Hotel" },
          { time: "10:30", activity: "Ferry to Caticlan", location: "Boracay Jetty Port" },
          { time: "11:30", activity: "Departure", location: "Caticlan Airport" }
        ]
      }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planned': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'booked': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = `Check out my trip to ${tripDetails.destination}!`;
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`);
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`);
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        setShowShareModal(false);
        break;
    }
  };

  const duration = Math.ceil((new Date(tripDetails.dates.checkOut).getTime() - new Date(tripDetails.dates.checkIn).getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/user" className="text-blue-600 hover:text-blue-700 text-sm font-medium mb-2 inline-block">
                ← Back to My Trips
              </Link>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{tripDetails.destination}</h1>
              <p className="text-gray-600 dark:text-gray-400">{tripDetails.region}</p>
            </div>
            <button
              onClick={() => setShowShareModal(true)}
              className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
              Share Trip
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Image Gallery */}
        <div className="mb-8">
          <div className="relative h-96 rounded-xl overflow-hidden">
            <img 
              src={tripDetails.images[currentImageIndex]} 
              alt={tripDetails.destination}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {tripDetails.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Trip Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Trip Dates</h3>
            <p className="text-gray-600 dark:text-gray-400">
              {new Date(tripDetails.dates.checkIn).toLocaleDateString()} - {new Date(tripDetails.dates.checkOut).toLocaleDateString()}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Guests</h3>
            <p className="text-gray-600 dark:text-gray-400">{tripDetails.guests} people</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Total Cost</h3>
            <p className="text-2xl font-bold text-blue-600">₱{tripDetails.totalCost.toLocaleString()}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
          <nav className="flex space-x-8">
            {['overview', 'itinerary', 'bookings'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Hotel Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Hotel Accommodation
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <img src={tripDetails.hotel.image} alt={tripDetails.hotel.name} className="w-full h-48 object-cover rounded-lg mb-4" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">{tripDetails.hotel.name}</h4>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`w-4 h-4 ${i < Math.floor(tripDetails.hotel.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-1 text-sm">{tripDetails.hotel.rating}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">{tripDetails.hotel.address}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {tripDetails.hotel.amenities.map((amenity, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-sm">
                        {amenity}
                      </span>
                    ))}
                  </div>
                  <p className="text-2xl font-bold text-blue-600">₱{tripDetails.hotel.cost.toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Activities Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <svg className="w-6 h-6 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-5-10v20m0-20V3a2 2 0 114 0v1M7 21V10a2 2 0 012-2h6a2 2 0 012 2v11" />
                </svg>
                Planned Activities
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tripDetails.activities.map((activity, index) => (
                  <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">{activity.name}</h4>
                    <p className="text-sm text-blue-600 dark:text-blue-400 mb-2">{activity.type} • {activity.duration}</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{activity.description}</p>
                    <div className="mb-3">
                      <p className="text-sm font-medium mb-1">Included:</p>
                      <ul className="text-xs text-gray-500 space-y-1">
                        {activity.included.map((item, i) => (
                          <li key={i} className="flex items-center">
                            <svg className="w-3 h-3 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <p className="text-lg font-bold text-green-600">₱{activity.cost.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'itinerary' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <svg className="w-6 h-6 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 9l2 2 4-4m6-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Daily Itinerary
              </h3>
              
              {tripDetails.itinerary.map((day, dayIndex) => (
                <div key={dayIndex} className="mb-8 last:mb-0">
                  <div className="flex items-center mb-4">
                    <div className="flex items-center justify-center w-10 h-10 bg-purple-600 text-white rounded-full font-bold mr-4">
                      {day.day}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{day.title}</h4>
                      <p className="text-gray-600 dark:text-gray-400">{new Date(day.date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</p>
                    </div>
                  </div>
                  
                  <div className="ml-14 space-y-4">
                    {day.activities.map((activity, activityIndex) => (
                      <div key={activityIndex} className="relative">
                        {/* Timeline line */}
                        {activityIndex < day.activities.length - 1 && (
                          <div className="absolute left-4 top-8 w-0.5 h-16 bg-gray-200 dark:bg-gray-600"></div>
                        )}
                        
                        <div className="flex items-start">
                          <div className="flex items-center justify-center w-8 h-8 bg-white dark:bg-gray-700 border-2 border-purple-600 rounded-full mr-4 relative z-10">
                            <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                          </div>
                          
                          <div className="flex-1 bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                                {activity.time}
                              </span>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {activityIndex + 1} of {day.activities.length}
                              </span>
                            </div>
                            
                            <h5 className="font-semibold text-gray-900 dark:text-white mb-1">
                              {activity.activity}
                            </h5>
                            
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              {activity.location}
                            </p>
                            
                            {activity.notes && (
                              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded p-2 mt-2">
                                <p className="text-xs text-blue-800 dark:text-blue-300 flex items-start">
                                  <svg className="w-3 h-3 mr-1 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                  </svg>
                                  <span className="font-medium">Note:</span> {activity.notes}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Day Summary */}
                  <div className="ml-14 mt-4 p-3 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg">
                    <p className="text-sm text-purple-800 dark:text-purple-300">
                      <span className="font-medium">Day {day.day} Summary:</span> {day.activities.length} activities planned
                    </p>
                  </div>
                </div>
              ))}
              
              {/* Weather Info */}
              <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                  Weather Forecast
                </h4>
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  Expect sunny weather with temperatures around 28-32°C. Perfect for beach activities and outdoor tours. 
                  Don't forget sunscreen and stay hydrated!
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="space-y-6">
            {/* Booking Summary */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6">
              <h3 className="text-xl font-bold text-green-900 dark:text-green-300 mb-4 flex items-center">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                All Bookings Confirmed
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                  <p className="text-2xl font-bold text-blue-600">1</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Hotel</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                  <p className="text-2xl font-bold text-green-600">1</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Car Rental</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                  <p className="text-2xl font-bold text-orange-600">{tripDetails.restaurants.length}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Restaurants</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                  <p className="text-2xl font-bold text-purple-600">{tripDetails.activities.length}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Activities</p>
                </div>
              </div>
            </div>

            {/* Hotel Booking */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold flex items-center">
                  <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Hotel Booking
                </h3>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">Confirmed</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">{tripDetails.hotel.name}</h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">{tripDetails.hotel.address}</p>
                  <div className="space-y-1 text-sm">
                    <p><span className="font-medium">Check-in:</span> {new Date(tripDetails.dates.checkIn).toLocaleDateString()} at {tripDetails.hotel.checkIn}</p>
                    <p><span className="font-medium">Check-out:</span> {new Date(tripDetails.dates.checkOut).toLocaleDateString()} at {tripDetails.hotel.checkOut}</p>
                    <p><span className="font-medium">Guests:</span> {tripDetails.guests} adults</p>
                    <p><span className="font-medium">Room Type:</span> Deluxe Ocean View</p>
                    <p><span className="font-medium">Booking ID:</span> HTL001234</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-600 mb-2">₱{tripDetails.hotel.cost.toLocaleString()}</p>
                  <p className="text-sm text-gray-500 mb-4">Total for {duration - 1} nights</p>
                  <div className="space-y-2">
                    <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                      View Voucher
                    </button>
                    <button className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg font-medium transition-colors">
                      Contact Hotel
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Car Rental Booking */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold flex items-center">
                  <svg className="w-6 h-6 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                  Car Rental Booking
                </h3>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">Confirmed</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">{tripDetails.car.model}</h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">{tripDetails.car.type}</p>
                  <div className="space-y-1 text-sm">
                    <p><span className="font-medium">Pickup:</span> {tripDetails.car.pickupLocation} at {tripDetails.car.pickupTime}</p>
                    <p><span className="font-medium">Return:</span> {tripDetails.car.pickupLocation} at {tripDetails.car.returnTime}</p>
                    <p><span className="font-medium">Duration:</span> {duration} days</p>
                    <p><span className="font-medium">Booking ID:</span> CAR001234</p>
                    <p><span className="font-medium">License Required:</span> Valid driver's license</p>
                  </div>
                  <div className="mt-3">
                    <p className="text-sm font-medium mb-1">Features:</p>
                    <div className="flex flex-wrap gap-1">
                      {tripDetails.car.features.map((feature, index) => (
                        <span key={index} className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded text-xs">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-600 mb-2">₱{tripDetails.car.cost.toLocaleString()}</p>
                  <p className="text-sm text-gray-500 mb-4">Total for {duration} days</p>
                  <div className="space-y-2">
                    <button className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors">
                      View Rental Agreement
                    </button>
                    <button className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg font-medium transition-colors">
                      Contact Rental Company
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Restaurant Reservations */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <svg className="w-6 h-6 mr-2 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
                Restaurant Reservations
              </h3>
              <div className="space-y-4">
                {tripDetails.restaurants.map((restaurant, index) => (
                  <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold">{restaurant.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{restaurant.cuisine}</p>
                        <p className="text-sm text-gray-500">{restaurant.address}</p>
                      </div>
                      <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">Reserved</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="text-sm">
                        <p><span className="font-medium">Date & Time:</span> {new Date(restaurant.reservationTime).toLocaleString()}</p>
                        <p><span className="font-medium">Party Size:</span> {tripDetails.guests} people</p>
                        <p><span className="font-medium">Reservation ID:</span> RST00{index + 1}234</p>
                        <p><span className="font-medium">Table:</span> Window seat (requested)</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-orange-600 mb-2">₱{restaurant.cost.toLocaleString()}</p>
                        <p className="text-xs text-gray-500 mb-3">Estimated cost</p>
                        <div className="space-y-1">
                          <button className="w-full px-3 py-1 bg-orange-600 hover:bg-orange-700 text-white rounded text-sm transition-colors">
                            View Reservation
                          </button>
                          <button className="w-full px-3 py-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded text-sm transition-colors">
                            Modify Reservation
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity Bookings */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <svg className="w-6 h-6 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-5-10v20m0-20V3a2 2 0 114 0v1M7 21V10a2 2 0 012-2h6a2 2 0 012 2v11" />
                </svg>
                Activity Bookings
              </h3>
              <div className="space-y-4">
                {tripDetails.activities.map((activity, index) => (
                  <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-lg">{activity.name}</h4>
                        <p className="text-sm text-purple-600 dark:text-purple-400">{activity.type} • {activity.duration}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{activity.description}</p>
                      </div>
                      <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">Confirmed</span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">What's Included</p>
                        <ul className="text-sm space-y-1">
                          {activity.included.map((item, i) => (
                            <li key={i} className="flex items-center text-gray-600 dark:text-gray-400">
                              <svg className="w-3 h-3 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Booking Details</p>
                        <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          <p><span className="font-medium">Participants:</span> {tripDetails.guests} people</p>
                          <p><span className="font-medium">Booking ID:</span> ACT00{index + 1}234</p>
                          <p><span className="font-medium">Confirmation:</span> Instant</p>
                          <p><span className="font-medium">Meeting Point:</span> Hotel Lobby</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-purple-600">₱{activity.cost.toLocaleString()}</span>
                      <div className="flex space-x-2">
                        <button className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded text-sm transition-colors">
                          View Ticket
                        </button>
                        <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded text-sm transition-colors">
                          Reschedule
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Summary */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <svg className="w-6 h-6 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                Payment Summary
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Hotel ({duration - 1} nights)</span>
                  <span>₱{tripDetails.hotel.cost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Car Rental ({duration} days)</span>
                  <span>₱{tripDetails.car.cost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Restaurants ({tripDetails.restaurants.length} reservations)</span>
                  <span>₱{tripDetails.restaurants.reduce((sum, r) => sum + r.cost, 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Activities ({tripDetails.activities.length} bookings)</span>
                  <span>₱{tripDetails.activities.reduce((sum, a) => sum + a.cost, 0).toLocaleString()}</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-600 pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Trip Cost</span>
                    <span className="text-blue-600">₱{tripDetails.totalCost.toLocaleString()}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">All payments confirmed</p>
                </div>
              </div>
              <button className="w-full mt-4 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg font-medium transition-colors">
                Download Receipt
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Share Your Trip</h3>
              <button onClick={() => setShowShareModal(false)}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-3">
              <button onClick={() => handleShare('facebook')} className="w-full flex items-center px-4 py-3 bg-blue-600 text-white rounded-lg">
                Share on Facebook
              </button>
              <button onClick={() => handleShare('twitter')} className="w-full flex items-center px-4 py-3 bg-sky-500 text-white rounded-lg">
                Share on Twitter
              </button>
              <button onClick={() => handleShare('whatsapp')} className="w-full flex items-center px-4 py-3 bg-green-500 text-white rounded-lg">
                Share on WhatsApp
              </button>
              <button onClick={() => handleShare('copy')} className="w-full flex items-center px-4 py-3 border border-gray-300 rounded-lg">
                Copy Link
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 