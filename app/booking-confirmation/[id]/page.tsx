'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function BookingConfirmationPage() {
  const params = useParams();
  const bookingId = params.id as string;
  const [showDetails, setShowDetails] = useState(false);
  const [countdown, setCountdown] = useState(300); // 5 minutes countdown for driver arrival

  // Mock booking data
  const bookingData = {
    id: bookingId,
    status: 'confirmed',
    confirmationNumber: `BK${bookingId.slice(-6)}`,
    bookingDate: new Date().toISOString(),
    driver: {
      name: "Juan Dela Cruz",
      photo: "/api/placeholder/100/100",
      phone: "+63 917 123 4567",
      vehicle: "Toyota Vios 2022",
      plateNumber: "ABC 123",
      rating: 4.8,
      location: "En route to pickup"
    },
    service: {
      type: "Airport Transfer",
      date: "2024-03-20",
      time: "10:00 AM",
      pickup: "Caticlan Airport",
      destination: "Grand Palace Hotel Boracay",
      passengers: 2,
      luggage: 2,
      duration: "45 minutes",
      distance: "25 km"
    },
    pricing: {
      basePrice: 1500,
      serviceFee: 150,
      total: 1650
    },
    paymentMethod: "Cash",
    estimatedArrival: "9:45 AM",
    specialRequests: "Please wait at Terminal 1 arrival area"
  };

  useEffect(() => {
    // Simulate sending confirmation notifications
    console.log('Sending confirmation notifications...');
    
    // Countdown timer
    const timer = setInterval(() => {
      setCountdown(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCancelBooking = () => {
    if (confirm('Are you sure you want to cancel this booking? This action cannot be undone.')) {
      // Handle cancellation logic
      console.log('Booking cancelled');
    }
  };

  const handleCallDriver = () => {
    window.location.href = `tel:${bookingData.driver.phone}`;
  };

  const handleDownloadReceipt = () => {
    // Generate and download receipt
    console.log('Downloading receipt...');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Booking Confirmed!</h1>
          <p className="text-gray-600 dark:text-gray-400">Your ride has been successfully booked</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Confirmation sent to your email and SMS
          </p>
        </div>

        {/* Status Banner */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
              <div>
                <p className="font-semibold text-blue-900 dark:text-blue-300">Driver Status: {bookingData.driver.location}</p>
                <p className="text-sm text-blue-800 dark:text-blue-400">Estimated arrival in {formatTime(countdown)}</p>
              </div>
            </div>
            <button 
              onClick={handleCallDriver}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
            >
              Call Driver
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Confirmation Details */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold">Booking Details</h2>
                  <p className="text-gray-600 dark:text-gray-400">#{bookingData.confirmationNumber}</p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  Confirmed
                </span>
              </div>

              {/* Driver Information */}
              <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 mb-6">
                <h3 className="font-semibold mb-3 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Your Driver
                </h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img src={bookingData.driver.photo} alt={bookingData.driver.name} className="w-12 h-12 rounded-full" />
                    <div>
                      <h4 className="font-medium">{bookingData.driver.name}</h4>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className={`w-3 h-3 ${i < Math.floor(bookingData.driver.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-xs text-gray-600 dark:text-gray-400">{bookingData.driver.rating}</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{bookingData.driver.vehicle} • {bookingData.driver.plateNumber}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <button 
                      onClick={handleCallDriver}
                      className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-sm transition-colors mb-1"
                    >
                      Call
                    </button>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{bookingData.driver.phone}</p>
                  </div>
                </div>
              </div>

              {/* Trip Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 4v10m6-10v10m-6 0h6" />
                    </svg>
                    Trip Details
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Service:</span>
                      <span className="font-medium">{bookingData.service.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Date:</span>
                      <span className="font-medium">{bookingData.service.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Time:</span>
                      <span className="font-medium">{bookingData.service.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Duration:</span>
                      <span className="font-medium">{bookingData.service.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Distance:</span>
                      <span className="font-medium">{bookingData.service.distance}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Passengers:</span>
                      <span className="font-medium">{bookingData.service.passengers}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                    Payment Summary
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Base Price:</span>
                      <span>₱{bookingData.pricing.basePrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Service Fee:</span>
                      <span>₱{bookingData.pricing.serviceFee.toLocaleString()}</span>
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-600 pt-2">
                      <div className="flex justify-between font-semibold">
                        <span>Total:</span>
                        <span className="text-green-600">₱{bookingData.pricing.total.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Payment Method:</span>
                      <span className="font-medium">{bookingData.paymentMethod}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Route Information */}
              <div className="border-t border-gray-200 dark:border-gray-600 pt-6 mt-6">
                <h4 className="font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Route Details
                </h4>
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                      <span className="text-sm font-medium">Pickup Location</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 ml-5">{bookingData.service.pickup}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 ml-5">at {bookingData.service.time}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                      <span className="text-sm font-medium">Destination</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 ml-5">{bookingData.service.destination}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 ml-5">ETA: {bookingData.estimatedArrival}</p>
                  </div>
                </div>
              </div>

              {/* Special Requests */}
              {bookingData.specialRequests && (
                <div className="border-t border-gray-200 dark:border-gray-600 pt-6 mt-6">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Special Requests</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                    {bookingData.specialRequests}
                  </p>
                </div>
              )}
            </div>

            {/* Important Information */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
              <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Important Information
              </h3>
              <ul className="text-sm text-blue-800 dark:text-blue-400 space-y-2">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Driver will arrive at approximately {bookingData.estimatedArrival}
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  You will receive an SMS when the driver is nearby
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Please be ready 5 minutes before pickup time
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Free cancellation up to 2 hours before pickup
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Driver will wait up to 15 minutes at pickup location
                </li>
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h3 className="font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button 
                  onClick={handleCallDriver}
                  className="w-full flex items-center justify-center px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call Driver
                </button>
                <button className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.013 8.013 0 01-2.319-.371l-3.681.736.736-3.681A8.013 8.013 0 013 12c0-4.418 3.582-8 8-8s8 3.582 8 8z" />
                  </svg>
                  Message Driver
                </button>
                <button 
                  onClick={handleDownloadReceipt}
                  className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg font-medium transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download Receipt
                </button>
              </div>
            </div>

            {/* Navigation */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h3 className="font-semibold mb-4">Manage Booking</h3>
              <div className="space-y-3">
                <Link href="/my-bookings" className="block">
                  <button className="w-full px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors">
                    View All Bookings
                  </button>
                </Link>
                <button 
                  onClick={() => setShowDetails(!showDetails)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg font-medium transition-colors"
                >
                  {showDetails ? 'Hide' : 'Show'} Full Details
                </button>
                <button 
                  onClick={handleCancelBooking}
                  className="w-full px-4 py-3 border border-red-300 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg font-medium transition-colors"
                >
                  Cancel Booking
                </button>
              </div>
            </div>

            {/* Support */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h3 className="font-semibold mb-4">Need Help?</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call Support
                </button>
                <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.013 8.013 0 01-2.319-.371l-3.681.736.736-3.681A8.013 8.013 0 013 12c0-4.418 3.582-8 8-8s8 3.582 8 8z" />
                  </svg>
                  Live Chat
                </button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 text-center">
                Available 24/7 for assistance
              </p>
            </div>

            {/* Back to Home */}
            <Link href="/" className="block">
              <button className="w-full px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors">
                Back to Home
              </button>
            </Link>
          </div>
        </div>

        {/* Detailed Information (Collapsible) */}
        {showDetails && (
          <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold mb-6">Complete Booking Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium mb-3 text-blue-600">Booking Information</h4>
                <div className="space-y-2 text-sm">
                  <p><span className="text-gray-600 dark:text-gray-400">Booking ID:</span> {bookingData.id}</p>
                  <p><span className="text-gray-600 dark:text-gray-400">Confirmation:</span> {bookingData.confirmationNumber}</p>
                  <p><span className="text-gray-600 dark:text-gray-400">Status:</span> <span className="text-green-600 font-medium">Confirmed</span></p>
                  <p><span className="text-gray-600 dark:text-gray-400">Booked on:</span> {new Date(bookingData.bookingDate).toLocaleDateString()}</p>
                  <p><span className="text-gray-600 dark:text-gray-400">Service Type:</span> {bookingData.service.type}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-3 text-green-600">Contact Information</h4>
                <div className="space-y-2 text-sm">
                  <p><span className="text-gray-600 dark:text-gray-400">Driver:</span> {bookingData.driver.name}</p>
                  <p><span className="text-gray-600 dark:text-gray-400">Phone:</span> {bookingData.driver.phone}</p>
                  <p><span className="text-gray-600 dark:text-gray-400">Vehicle:</span> {bookingData.driver.vehicle}</p>
                  <p><span className="text-gray-600 dark:text-gray-400">Plate:</span> {bookingData.driver.plateNumber}</p>
                  <p><span className="text-gray-600 dark:text-gray-400">Support:</span> +63 917 000 0000</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3 text-purple-600">Terms & Policies</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Free cancellation up to 2 hours before pickup</li>
                  <li>• Late cancellation may incur charges</li>
                  <li>• Driver will wait up to 15 minutes</li>
                  <li>• Additional stops may incur extra charges</li>
                  <li>• Payment due upon completion</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 