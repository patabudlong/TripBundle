'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

interface BookingData {
  serviceType: 'hourly' | 'daily' | 'airport' | 'custom';
  pickupDate: string;
  pickupTime: string;
  pickupLocation: string;
  dropoffLocation: string;
  returnDate?: string;
  returnTime?: string;
  passengers: number;
  luggage: number;
  specialRequests: string;
  contactInfo: {
    name: string;
    phone: string;
    email: string;
  };
  paymentMethod: 'cash' | 'card' | 'gcash' | 'paymaya';
}

export default function BookDriverPage() {
  const params = useParams();
  const router = useRouter();
  const driverId = params.id as string;
  
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState<BookingData>({
    serviceType: 'hourly',
    pickupDate: '',
    pickupTime: '',
    pickupLocation: '',
    dropoffLocation: '',
    passengers: 1,
    luggage: 1,
    specialRequests: '',
    contactInfo: {
      name: '',
      phone: '',
      email: ''
    },
    paymentMethod: 'cash'
  });

  // Mock driver data
  const driverData = {
    id: driverId,
    name: "Juan Dela Cruz",
    photo: "/api/placeholder/100/100",
    rating: 4.8,
    vehicle: {
      model: "Toyota Vios 2022",
      type: "Sedan",
      capacity: 4,
      features: ["Air Conditioning", "GPS Navigation", "Phone Charger", "WiFi"],
      image: "/api/placeholder/300/200"
    },
    pricing: {
      hourly: 800,
      daily: 5000,
      airport: 1500
    },
    location: "Caticlan Airport"
  };

  const calculateTotal = () => {
    let basePrice = 0;
    let hours = 1;
    let days = 1;

    switch (bookingData.serviceType) {
      case 'hourly':
        if (bookingData.pickupTime && bookingData.returnTime) {
          const pickup = new Date(`${bookingData.pickupDate} ${bookingData.pickupTime}`);
          const dropoff = new Date(`${bookingData.returnDate || bookingData.pickupDate} ${bookingData.returnTime}`);
          hours = Math.max(1, Math.ceil((dropoff.getTime() - pickup.getTime()) / (1000 * 60 * 60)));
        }
        basePrice = driverData.pricing.hourly * hours;
        break;
      case 'daily':
        if (bookingData.pickupDate && bookingData.returnDate) {
          const pickup = new Date(bookingData.pickupDate);
          const dropoff = new Date(bookingData.returnDate);
          days = Math.max(1, Math.ceil((dropoff.getTime() - pickup.getTime()) / (1000 * 60 * 60 * 24)));
        }
        basePrice = driverData.pricing.daily * days;
        break;
      case 'airport':
        basePrice = driverData.pricing.airport;
        break;
      default:
        basePrice = driverData.pricing.hourly;
    }

    const serviceFee = basePrice * 0.1; // 10% service fee
    const total = basePrice + serviceFee;

    return { basePrice, serviceFee, total, hours, days };
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    // Simulate booking submission
    console.log('Booking submitted:', bookingData);
    
    // Redirect to confirmation page
    router.push(`/booking-confirmation/${Date.now()}`);
  };

  const { basePrice, serviceFee, total } = calculateTotal();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/car-services" className="text-blue-600 hover:text-blue-700 flex items-center mb-4">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Car Services
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Book Your Ride</h1>
          <p className="text-gray-600 dark:text-gray-400">Complete your booking in 4 simple steps</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step <= currentStep 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}>
                  {step}
                </div>
                <div className={`ml-3 ${step <= currentStep ? 'text-blue-600' : 'text-gray-500'}`}>
                  <p className="text-sm font-medium">
                    {step === 1 && 'Service Details'}
                    {step === 2 && 'Trip Information'}
                    {step === 3 && 'Contact Info'}
                    {step === 4 && 'Payment & Review'}
                  </p>
                </div>
                {step < 4 && (
                  <div className={`flex-1 h-1 mx-4 ${
                    step < currentStep ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              {/* Step 1: Service Selection */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Select Your Service</h2>
                  
                  {/* Service Type */}
                  <div>
                    <label className="block text-sm font-medium mb-3">Service Type</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { value: 'hourly', label: 'Hourly Rental', desc: 'Perfect for short trips and city tours', price: driverData.pricing.hourly },
                        { value: 'daily', label: 'Daily Rental', desc: 'Best for full day adventures', price: driverData.pricing.daily },
                        { value: 'airport', label: 'Airport Transfer', desc: 'Direct transfer to/from airport', price: driverData.pricing.airport },
                        { value: 'custom', label: 'Custom Trip', desc: 'Tailored to your specific needs', price: 'Quote' }
                      ].map((service) => (
                        <div
                          key={service.value}
                          onClick={() => setBookingData({...bookingData, serviceType: service.value as any})}
                          className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                            bookingData.serviceType === service.value
                              ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                              : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'
                          }`}
                        >
                          <h3 className="font-semibold">{service.label}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{service.desc}</p>
                          <p className="text-lg font-bold text-blue-600">
                            {typeof service.price === 'number' ? `₱${service.price.toLocaleString()}` : service.price}
                            {service.value === 'hourly' && '/hour'}
                            {service.value === 'daily' && '/day'}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Date and Time */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Pickup Date</label>
                      <input
                        type="date"
                        value={bookingData.pickupDate}
                        onChange={(e) => setBookingData({...bookingData, pickupDate: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Pickup Time</label>
                      <input
                        type="time"
                        value={bookingData.pickupTime}
                        onChange={(e) => setBookingData({...bookingData, pickupTime: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                      />
                    </div>
                  </div>

                  {/* Return Date/Time for multi-day or hourly */}
                  {(bookingData.serviceType === 'daily' || bookingData.serviceType === 'hourly') && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          {bookingData.serviceType === 'daily' ? 'Return Date' : 'End Date'}
                        </label>
                        <input
                          type="date"
                          value={bookingData.returnDate || ''}
                          onChange={(e) => setBookingData({...bookingData, returnDate: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                          min={bookingData.pickupDate}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          {bookingData.serviceType === 'daily' ? 'Return Time' : 'End Time'}
                        </label>
                        <input
                          type="time"
                          value={bookingData.returnTime || ''}
                          onChange={(e) => setBookingData({...bookingData, returnTime: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                        />
                      </div>
                    </div>
                  )}

                  {/* Locations */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Pickup Location</label>
                      <input
                        type="text"
                        value={bookingData.pickupLocation}
                        onChange={(e) => setBookingData({...bookingData, pickupLocation: e.target.value})}
                        placeholder="Enter pickup address or landmark"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Destination</label>
                      <input
                        type="text"
                        value={bookingData.dropoffLocation}
                        onChange={(e) => setBookingData({...bookingData, dropoffLocation: e.target.value})}
                        placeholder="Enter destination address or landmark"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Trip Details */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Trip Details</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Number of Passengers</label>
                      <select
                        value={bookingData.passengers}
                        onChange={(e) => setBookingData({...bookingData, passengers: parseInt(e.target.value)})}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                      >
                        {[1, 2, 3, 4].map(num => (
                          <option key={num} value={num}>{num} passenger{num > 1 ? 's' : ''}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Luggage Pieces</label>
                      <select
                        value={bookingData.luggage}
                        onChange={(e) => setBookingData({...bookingData, luggage: parseInt(e.target.value)})}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                      >
                        {[0, 1, 2, 3, 4, 5].map(num => (
                          <option key={num} value={num}>{num} piece{num !== 1 ? 's' : ''}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Special Requests</label>
                    <textarea
                      value={bookingData.specialRequests}
                      onChange={(e) => setBookingData({...bookingData, specialRequests: e.target.value})}
                      placeholder="Any special requirements, stops, or requests..."
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                    />
                  </div>

                  {/* Trip Summary */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h3 className="font-semibold mb-3">Trip Summary</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Service Type:</span>
                        <span className="font-medium capitalize">{bookingData.serviceType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Date & Time:</span>
                        <span className="font-medium">
                          {bookingData.pickupDate} at {bookingData.pickupTime}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Passengers:</span>
                        <span className="font-medium">{bookingData.passengers}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Luggage:</span>
                        <span className="font-medium">{bookingData.luggage} pieces</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Contact Information */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Contact Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name *</label>
                      <input
                        type="text"
                        value={bookingData.contactInfo.name}
                        onChange={(e) => setBookingData({
                          ...bookingData, 
                          contactInfo: {...bookingData.contactInfo, name: e.target.value}
                        })}
                        placeholder="Enter your full name"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        value={bookingData.contactInfo.phone}
                        onChange={(e) => setBookingData({
                          ...bookingData, 
                          contactInfo: {...bookingData.contactInfo, phone: e.target.value}
                        })}
                        placeholder="+63 917 123 4567"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Email Address *</label>
                    <input
                      type="email"
                      value={bookingData.contactInfo.email}
                      onChange={(e) => setBookingData({
                        ...bookingData, 
                        contactInfo: {...bookingData.contactInfo, email: e.target.value}
                      })}
                      placeholder="your.email@example.com"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                      required
                    />
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">Communication Preferences</h3>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" defaultChecked />
                        <span className="text-sm text-blue-800 dark:text-blue-400">Send SMS updates about my trip</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" defaultChecked />
                        <span className="text-sm text-blue-800 dark:text-blue-400">Send email confirmation and receipt</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-sm text-blue-800 dark:text-blue-400">Subscribe to promotional offers</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Payment & Review */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Payment & Review</h2>
                  
                  {/* Payment Method */}
                  <div>
                    <label className="block text-sm font-medium mb-3">Payment Method</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { value: 'cash', label: 'Cash Payment', desc: 'Pay the driver directly' },
                        { value: 'card', label: 'Credit/Debit Card', desc: 'Secure online payment' },
                        { value: 'gcash', label: 'GCash', desc: 'Mobile wallet payment' },
                        { value: 'paymaya', label: 'PayMaya', desc: 'Digital wallet payment' }
                      ].map((method) => (
                        <div
                          key={method.value}
                          onClick={() => setBookingData({...bookingData, paymentMethod: method.value as any})}
                          className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                            bookingData.paymentMethod === method.value
                              ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                              : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'
                          }`}
                        >
                          <h3 className="font-semibold">{method.label}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{method.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Booking Review */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                    <h3 className="font-semibold mb-4">Booking Review</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span>Service:</span>
                        <span className="font-medium capitalize">{bookingData.serviceType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Date & Time:</span>
                        <span className="font-medium">{bookingData.pickupDate} at {bookingData.pickupTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Pickup:</span>
                        <span className="font-medium">{bookingData.pickupLocation}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Destination:</span>
                        <span className="font-medium">{bookingData.dropoffLocation}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Passengers:</span>
                        <span className="font-medium">{bookingData.passengers}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Contact:</span>
                        <span className="font-medium">{bookingData.contactInfo.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Payment:</span>
                        <span className="font-medium capitalize">{bookingData.paymentMethod}</span>
                      </div>
                    </div>
                  </div>

                  {/* Terms and Conditions */}
                  <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                    <h3 className="font-semibold mb-3">Terms & Conditions</h3>
                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      <label className="flex items-start">
                        <input type="checkbox" className="mr-2 mt-1" required />
                        <span>I agree to the terms and conditions of service</span>
                      </label>
                      <label className="flex items-start">
                        <input type="checkbox" className="mr-2 mt-1" required />
                        <span>I understand the cancellation policy (free cancellation up to 2 hours before pickup)</span>
                      </label>
                      <label className="flex items-start">
                        <input type="checkbox" className="mr-2 mt-1" />
                        <span>I would like to receive promotional offers and updates</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6 border-t border-gray-200 dark:border-gray-600">
                <button 
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                
                {currentStep < 4 ? (
                  <button 
                    onClick={handleNext}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    Next
                  </button>
                ) : (
                  <button 
                    onClick={handleSubmit}
                    className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                  >
                    Confirm Booking
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - Driver Info & Price Summary */}
          <div className="space-y-6">
            {/* Driver Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h3 className="font-semibold mb-4">Your Driver</h3>
              <div className="flex items-center space-x-3 mb-4">
                <img src={driverData.photo} alt={driverData.name} className="w-12 h-12 rounded-full" />
                <div>
                  <h4 className="font-medium">{driverData.name}</h4>
                  <div className="flex items-center">
                    <div className="flex items-center mr-2">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-3 h-3 ${i < Math.floor(driverData.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs text-gray-600 dark:text-gray-400">{driverData.rating}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Vehicle:</span>
                  <span className="font-medium">{driverData.vehicle.model}</span>
                </div>
                <div className="flex justify-between">
                  <span>Type:</span>
                  <span className="font-medium">{driverData.vehicle.type}</span>
                </div>
                <div className="flex justify-between">
                  <span>Capacity:</span>
                  <span className="font-medium">{driverData.vehicle.capacity} passengers</span>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Features:</p>
                <div className="flex flex-wrap gap-1">
                  {driverData.vehicle.features.slice(0, 3).map((feature, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Price Summary */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h3 className="font-semibold mb-4">Price Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Base Price:</span>
                  <span>₱{basePrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Service Fee:</span>
                  <span>₱{serviceFee.toLocaleString()}</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-600 pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-blue-600">₱{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <p className="text-sm text-green-800 dark:text-green-300">
                  <span className="font-medium">Free Cancellation</span> up to 2 hours before pickup
                </p>
              </div>
            </div>

            {/* Contact Support */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h3 className="font-semibold mb-3">Need Help?</h3>
              <div className="space-y-2">
                <button className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 