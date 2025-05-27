'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function DriverPage() {
  const [currentLocation, setCurrentLocation] = useState({ lat: 11.5564, lng: 122.0566 }); // Boracay
  const [userLocation, setUserLocation] = useState({ lat: 11.5584, lng: 122.0586 }); // User location
  const [activeTrip, setActiveTrip] = useState(null);
  const [isOnline, setIsOnline] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Mock driver data
  const driverInfo = {
    name: "Juan Dela Cruz",
    id: "DRV001",
    vehicle: "Toyota Vios - ABC 123",
    rating: 4.8,
    totalTrips: 1247,
    phone: "+63 917 123 4567"
  };

  // Mock current trip data
  const tripData = {
    id: 1,
    passenger: "Maria Santos",
    passengerPhone: "+63 917 987 6543",
    destination: "Grand Palace Hotel Boracay",
    pickupLocation: "Caticlan Airport",
    estimatedDuration: "45 minutes",
    fare: 8000,
    status: "in_progress",
    startTime: "2024-03-15T10:00:00",
    itinerary: [
      {
        time: "10:00 AM",
        location: "Caticlan Airport",
        activity: "Pick up passengers",
        status: "completed",
        coordinates: { lat: 11.5564, lng: 122.0566 }
      },
      {
        time: "10:15 AM", 
        location: "Caticlan Jetty Port",
        activity: "Drop off at ferry terminal",
        status: "completed",
        coordinates: { lat: 11.5574, lng: 122.0576 }
      },
      {
        time: "12:30 PM",
        location: "Boracay Jetty Port",
        activity: "Pick up from ferry",
        status: "current",
        coordinates: { lat: 11.5584, lng: 122.0586 }
      },
      {
        time: "1:00 PM",
        location: "Grand Palace Hotel",
        activity: "Drop off at hotel",
        status: "pending",
        coordinates: { lat: 11.5594, lng: 122.0596 }
      }
    ]
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Simulate location updates
    const locationTimer = setInterval(() => {
      setCurrentLocation(prev => ({
        lat: prev.lat + (Math.random() - 0.5) * 0.001,
        lng: prev.lng + (Math.random() - 0.5) * 0.001
      }));
    }, 5000);

    return () => {
      clearInterval(timer);
      clearInterval(locationTimer);
    };
  }, []);

  const handleStatusUpdate = (status: string) => {
    // Update trip status
    console.log('Status updated to:', status);
  };

  const handleEmergency = () => {
    alert('Emergency alert sent to dispatch and passenger!');
  };

  const getCurrentStep = () => {
    return tripData.itinerary.find(step => step.status === 'current') || tripData.itinerary[0];
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">{driverInfo.name}</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Driver ID: {driverInfo.id}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {currentTime.toLocaleTimeString()}
                </p>
                <p className="text-xs text-gray-500">
                  {currentTime.toLocaleDateString()}
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-sm font-medium">
                  {isOnline ? 'Online' : 'Offline'}
                </span>
                <button
                  onClick={() => setIsOnline(!isOnline)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    isOnline 
                      ? 'bg-red-100 text-red-800 hover:bg-red-200' 
                      : 'bg-green-100 text-green-800 hover:bg-green-200'
                  }`}
                >
                  Go {isOnline ? 'Offline' : 'Online'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Trip Details & Itinerary */}
          <div className="space-y-6">
            {/* Current Trip Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Current Trip</h2>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  In Progress
                </span>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{tripData.passenger}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{tripData.passengerPhone}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Pickup</p>
                    <p className="font-medium">{tripData.pickupLocation}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Destination</p>
                    <p className="font-medium">{tripData.destination}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Duration</p>
                    <p className="font-medium">{tripData.estimatedDuration}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Fare</p>
                    <p className="font-medium text-green-600">₱{tripData.fare.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Trip Itinerary */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Trip Itinerary</h3>
              
              <div className="space-y-4">
                {tripData.itinerary.map((step, index) => (
                  <div key={index} className="relative">
                    {/* Timeline line */}
                    {index < tripData.itinerary.length - 1 && (
                      <div className="absolute left-4 top-8 w-0.5 h-16 bg-gray-200 dark:bg-gray-600"></div>
                    )}
                    
                    <div className="flex items-start space-x-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center relative z-10 ${
                        step.status === 'completed' 
                          ? 'bg-green-500' 
                          : step.status === 'current'
                          ? 'bg-blue-500'
                          : 'bg-gray-300 dark:bg-gray-600'
                      }`}>
                        {step.status === 'completed' ? (
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : step.status === 'current' ? (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        ) : (
                          <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                            {step.time}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            step.status === 'completed' 
                              ? 'bg-green-100 text-green-800' 
                              : step.status === 'current'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            {step.status}
                          </span>
                        </div>
                        <p className="font-medium text-gray-900 dark:text-white">{step.activity}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{step.location}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
              
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleStatusUpdate('arrived')}
                  className="px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                >
                  Mark as Arrived
                </button>
                <button
                  onClick={() => handleStatusUpdate('completed')}
                  className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  Complete Step
                </button>
                <button
                  onClick={() => window.open(`tel:${tripData.passengerPhone}`)}
                  className="px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
                >
                  Call Passenger
                </button>
                <button
                  onClick={handleEmergency}
                  className="px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                >
                  Emergency
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Map */}
          <div className="space-y-6">
            {/* Map Container */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Live Location</h3>
              
              {/* Mock Map */}
              <div className="relative bg-gray-100 dark:bg-gray-700 rounded-lg h-96 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900 dark:to-green-900">
                  {/* Mock map background */}
                  <div className="absolute inset-0 opacity-20">
                    <svg className="w-full h-full" viewBox="0 0 400 400">
                      <defs>
                        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                  </div>
                  
                  {/* Driver location */}
                  <div 
                    className="absolute w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg transform -translate-x-2 -translate-y-2"
                    style={{ 
                      left: `${(currentLocation.lng - 122.05) * 2000 + 200}px`, 
                      top: `${(11.56 - currentLocation.lat) * 2000 + 200}px` 
                    }}
                  >
                    <div className="absolute inset-0 bg-blue-600 rounded-full animate-ping"></div>
                  </div>
                  
                  {/* User location */}
                  <div 
                    className="absolute w-4 h-4 bg-green-600 rounded-full border-2 border-white shadow-lg transform -translate-x-2 -translate-y-2"
                    style={{ 
                      left: `${(userLocation.lng - 122.05) * 2000 + 200}px`, 
                      top: `${(11.56 - userLocation.lat) * 2000 + 200}px` 
                    }}
                  ></div>
                  
                  {/* Route line */}
                  <svg className="absolute inset-0 w-full h-full">
                    <line 
                      x1={`${(currentLocation.lng - 122.05) * 2000 + 200}`}
                      y1={`${(11.56 - currentLocation.lat) * 2000 + 200}`}
                      x2={`${(userLocation.lng - 122.05) * 2000 + 200}`}
                      y2={`${(11.56 - userLocation.lat) * 2000 + 200}`}
                      stroke="#3B82F6" 
                      strokeWidth="2" 
                      strokeDasharray="5,5"
                    />
                  </svg>
                </div>
                
                {/* Map Legend */}
                <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 rounded-lg p-3 shadow-lg">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                      <span>Your Location</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                      <span>Passenger Location</span>
                    </div>
                  </div>
                </div>
                
                {/* Distance Info */}
                <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-lg p-3 shadow-lg">
                  <p className="text-sm font-medium">Distance to passenger</p>
                  <p className="text-lg font-bold text-blue-600">0.8 km</p>
                  <p className="text-xs text-gray-500">~3 minutes</p>
                </div>
              </div>
            </div>

            {/* Driver Stats */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Driver Stats</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">{driverInfo.rating}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Rating</p>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">{driverInfo.totalTrips}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Trips</p>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm font-medium text-blue-900 dark:text-blue-300">Vehicle</p>
                <p className="text-sm text-blue-800 dark:text-blue-400">{driverInfo.vehicle}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 