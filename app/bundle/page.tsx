'use client';

import { useState } from 'react';
import Link from 'next/link';

interface TripData {
  destination: {
    region: string;
    province: string;
    city: string;
    barangay: string;
  };
  dates: {
    checkIn: string;
    checkOut: string;
  };
  guests: number;
  selectedHotel: any;
  selectedCar: any;
  selectedRestaurants: any[];
}

export default function BundleServicePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [tripData, setTripData] = useState<TripData>({
    destination: { region: '', province: '', city: '', barangay: '' },
    dates: { checkIn: '', checkOut: '' },
    guests: 2,
    selectedHotel: null,
    selectedCar: null,
    selectedRestaurants: []
  });

  const steps = [
    { id: 1, name: 'Destination', icon: '🇵🇭' },
    { id: 2, name: 'Dates', icon: '📅' },
    { id: 3, name: 'Hotels', icon: '🏨' },
    { id: 4, name: 'Cars', icon: '🚗' },
    { id: 5, name: 'Dining', icon: '🍽️' },
    { id: 6, name: 'Review', icon: '✅' }
  ];

  // Philippines administrative divisions
  const regions = [
    'National Capital Region (NCR)',
    'Cordillera Administrative Region (CAR)',
    'Region I (Ilocos Region)',
    'Region II (Cagayan Valley)',
    'Region III (Central Luzon)',
    'Region IV-A (CALABARZON)',
    'Region IV-B (MIMAROPA)',
    'Region V (Bicol Region)',
    'Region VI (Western Visayas)',
    'Region VII (Central Visayas)',
    'Region VIII (Eastern Visayas)',
    'Region IX (Zamboanga Peninsula)',
    'Region X (Northern Mindanao)',
    'Region XI (Davao Region)',
    'Region XII (SOCCSKSARGEN)',
    'Region XIII (Caraga)',
    'Bangsamoro Autonomous Region in Muslim Mindanao (BARMM)'
  ];

  const provinces = {
    'National Capital Region (NCR)': [
      'Metro Manila'
    ],
    'Region IV-A (CALABARZON)': [
      'Batangas', 'Cavite', 'Laguna', 'Quezon', 'Rizal'
    ],
    'Region VII (Central Visayas)': [
      'Bohol', 'Cebu', 'Negros Oriental', 'Siquijor'
    ],
    'Region XI (Davao Region)': [
      'Davao del Norte', 'Davao del Sur', 'Davao de Oro', 'Davao Occidental', 'Davao Oriental'
    ],
    'Region VI (Western Visayas)': [
      'Aklan', 'Antique', 'Capiz', 'Guimaras', 'Iloilo', 'Negros Occidental'
    ],
    'Region III (Central Luzon)': [
      'Aurora', 'Bataan', 'Bulacan', 'Nueva Ecija', 'Pampanga', 'Tarlac', 'Zambales'
    ],
    'Region V (Bicol Region)': [
      'Albay', 'Camarines Norte', 'Camarines Sur', 'Catanduanes', 'Masbate', 'Sorsogon'
    ]
  };

  const cities = {
    'Metro Manila': [
      'Manila', 'Quezon City', 'Makati', 'Pasig', 'Taguig', 'Mandaluyong', 'Marikina', 
      'Pasay', 'Caloocan', 'Las Piñas', 'Muntinlupa', 'Parañaque', 'Valenzuela', 
      'Malabon', 'Navotas', 'San Juan', 'Pateros'
    ],
    'Cebu': [
      'Cebu City', 'Lapu-Lapu City', 'Mandaue City', 'Talisay City', 'Toledo City', 
      'Danao City', 'Carcar City', 'Bogo City'
    ],
    'Batangas': [
      'Batangas City', 'Lipa City', 'Tanauan City', 'Santo Tomas', 'Calaca', 'Lemery'
    ],
    'Davao del Sur': [
      'Davao City', 'Digos City', 'Samal City'
    ],
    'Aklan': [
      'Kalibo', 'Boracay (Malay)', 'Ibajay', 'Altavas', 'Balete', 'Banga'
    ],
    'Bohol': [
      'Tagbilaran City', 'Panglao', 'Loboc', 'Carmen', 'Dauis', 'Baclayon'
    ],
    'Palawan': [
      'Puerto Princesa', 'El Nido', 'Coron', 'San Vicente', 'Brooke\'s Point'
    ]
  };

  const barangays = {
    'Manila': [
      'Ermita', 'Malate', 'Intramuros', 'Binondo', 'Quiapo', 'Sampaloc', 'Tondo', 'Santa Cruz'
    ],
    'Makati': [
      'Poblacion', 'Bel-Air', 'Salcedo Village', 'Legazpi Village', 'San Lorenzo', 'Urdaneta'
    ],
    'Cebu City': [
      'Lahug', 'Capitol Site', 'Guadalupe', 'Banilad', 'Talamban', 'Mabolo', 'IT Park'
    ],
    'Davao City': [
      'Poblacion District', 'Buhangin', 'Bunawan', 'Calinan', 'Marilog', 'Paquibato', 'Toril', 'Tugbok'
    ],
    'Boracay (Malay)': [
      'Balabag', 'Manoc-Manoc', 'Yapak'
    ],
    'Tagbilaran City': [
      'Cogon', 'Dao', 'Poblacion I', 'Poblacion II', 'Poblacion III', 'Taloto', 'Ubujan'
    ],
    'Puerto Princesa': [
      'Barangay San Pedro', 'Barangay San Jose', 'Barangay Bancao-Bancao', 'Barangay Mandaragat'
    ],
    'El Nido': [
      'Barangay Buena Suerte', 'Barangay Corong-Corong', 'Barangay Masagana', 'Barangay Maremegmeg'
    ]
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const toggleRestaurant = (restaurant: any) => {
    const isSelected = tripData.selectedRestaurants.some(r => r.id === restaurant.id);
    if (isSelected) {
      setTripData({
        ...tripData,
        selectedRestaurants: tripData.selectedRestaurants.filter(r => r.id !== restaurant.id)
      });
    } else {
      setTripData({
        ...tripData,
        selectedRestaurants: [...tripData.selectedRestaurants, restaurant]
      });
    }
  };

  const calculateTotal = () => {
    let total = 0;
    if (tripData.selectedHotel && tripData.dates.checkIn && tripData.dates.checkOut) {
      const days = Math.ceil((new Date(tripData.dates.checkOut).getTime() - new Date(tripData.dates.checkIn).getTime()) / (1000 * 3600 * 24));
      total += tripData.selectedHotel.price * days;
    }
    if (tripData.selectedCar && tripData.dates.checkIn && tripData.dates.checkOut) {
      const days = Math.ceil((new Date(tripData.dates.checkOut).getTime() - new Date(tripData.dates.checkIn).getTime()) / (1000 * 3600 * 24));
      total += tripData.selectedCar.price * days;
    }
    return total;
  };

  const sampleHotels = [
    {
      id: 1,
      name: 'Manila Grand Hotel',
      rating: 4.8,
      price: 8500,
      image: '/api/placeholder/300/200',
      amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant'],
      location: 'Makati CBD'
    },
    {
      id: 2,
      name: 'Cebu Beach Resort',
      rating: 4.6,
      price: 6500,
      image: '/api/placeholder/300/200',
      amenities: ['WiFi', 'Beach Access', 'Breakfast', 'Parking'],
      location: 'Mactan Island'
    },
    {
      id: 3,
      name: 'Boracay Paradise Inn',
      rating: 4.7,
      price: 7200,
      image: '/api/placeholder/300/200',
      amenities: ['WiFi', 'Beach Front', 'Bar', 'Water Sports'],
      location: 'White Beach'
    }
  ];

  const sampleCars = [
    {
      id: 1,
      name: 'Economy Sedan',
      type: 'Toyota Vios or similar',
      price: 2500,
      features: ['Manual', '5 Seats', 'AC', 'Good for City'],
      image: '/api/placeholder/300/200'
    },
    {
      id: 2,
      name: 'SUV',
      type: 'Toyota Fortuner or similar',
      price: 4500,
      features: ['Automatic', '7 Seats', 'GPS', 'Good for Provinces'],
      image: '/api/placeholder/300/200'
    },
    {
      id: 3,
      name: 'Van',
      type: 'Toyota Hiace or similar',
      price: 6000,
      features: ['Automatic', '15 Seats', 'AC', 'Group Travel'],
      image: '/api/placeholder/300/200'
    }
  ];

  const sampleRestaurants = [
    {
      id: 1,
      name: 'Aristocrat Restaurant',
      cuisine: 'Filipino',
      rating: 4.5,
      priceRange: '₱₱',
      image: '/api/placeholder/300/200',
      specialties: ['Chicken Barbecue', 'Java Rice', 'Pancit Canton']
    },
    {
      id: 2,
      name: 'Larsian BBQ',
      cuisine: 'Street Food',
      rating: 4.3,
      priceRange: '₱',
      image: '/api/placeholder/300/200',
      specialties: ['Pork BBQ', 'Pusô', 'Tempura']
    },
    {
      id: 3,
      name: 'Sutukil Restaurant',
      cuisine: 'Seafood',
      rating: 4.6,
      priceRange: '₱₱₱',
      image: '/api/placeholder/300/200',
      specialties: ['Grilled Fish', 'Kinilaw', 'Seafood Soup']
    },
    {
      id: 4,
      name: 'Jollibee',
      cuisine: 'Fast Food',
      rating: 4.2,
      priceRange: '₱',
      image: '/api/placeholder/300/200',
      specialties: ['Chickenjoy', 'Jolly Spaghetti', 'Burger Steak']
    },
    {
      id: 5,
      name: 'Kamayan sa Palaisdaan',
      cuisine: 'Filipino Seafood',
      rating: 4.4,
      priceRange: '₱₱',
      image: '/api/placeholder/300/200',
      specialties: ['Grilled Tilapia', 'Sinigang', 'Lechon Kawali']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Create Your Perfect Trip Bundle
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            Plan your complete Philippines adventure in one place
          </p>
          
          {/* Flight Booking Help Banner */}
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl p-6 mb-8 shadow-lg">
            <div className="flex items-center justify-center mb-3">
              <svg className="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              <h3 className="text-xl font-semibold">Need help to book your flight?</h3>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>Call us at <strong>+63 082 298 8047</strong></span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <span>Mobile/WhatsApp: <strong>+63 898 800 5598</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep >= step.id 
                    ? 'bg-blue-600 border-blue-600 text-white' 
                    : 'border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500'
                }`}>
                  {currentStep > step.id ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span className="text-sm font-medium">{step.id}</span>
                  )}
                </div>
                <div className="ml-3 hidden sm:block">
                  <p className={`text-sm font-medium ${
                    currentStep >= step.id ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {step.icon} {step.name}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`hidden sm:block w-12 h-0.5 ml-4 ${
                    currentStep > step.id ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 mb-8">
          
          {/* Step 1: Destination Selection - Philippines Focus */}
          {currentStep === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <span className="text-3xl mr-3">🇵🇭</span>
                Choose Your Philippines Destination
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Region Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Region
                  </label>
                  <select 
                    value={tripData.destination.region}
                    onChange={(e) => setTripData({
                      ...tripData, 
                      destination: { 
                        ...tripData.destination, 
                        region: e.target.value, 
                        province: '', 
                        city: '', 
                        barangay: '' 
                      }
                    })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="">Select a Region</option>
                    {regions.map(region => (
                      <option key={region} value={region}>{region}</option>
                    ))}
                  </select>
                </div>

                {/* Province Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Province
                  </label>
                  <select 
                    value={tripData.destination.province}
                    onChange={(e) => setTripData({
                      ...tripData, 
                      destination: { 
                        ...tripData.destination, 
                        province: e.target.value, 
                        city: '', 
                        barangay: '' 
                      }
                    })}
                    disabled={!tripData.destination.region}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="">Select a Province</option>
                    {tripData.destination.region && provinces[tripData.destination.region]?.map(province => (
                      <option key={province} value={province}>{province}</option>
                    ))}
                  </select>
                </div>

                {/* City/Municipality Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    City/Municipality
                  </label>
                  <select 
                    value={tripData.destination.city}
                    onChange={(e) => setTripData({
                      ...tripData, 
                      destination: { 
                        ...tripData.destination, 
                        city: e.target.value, 
                        barangay: '' 
                      }
                    })}
                    disabled={!tripData.destination.province}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="">Select a City/Municipality</option>
                    {tripData.destination.province && cities[tripData.destination.province]?.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>

                {/* Barangay Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Barangay (Optional)
                  </label>
                  <select 
                    value={tripData.destination.barangay}
                    onChange={(e) => setTripData({
                      ...tripData, 
                      destination: { 
                        ...tripData.destination, 
                        barangay: e.target.value 
                      }
                    })}
                    disabled={!tripData.destination.city}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="">Select a Barangay (Optional)</option>
                    {tripData.destination.city && barangays[tripData.destination.city]?.map(barangay => (
                      <option key={barangay} value={barangay}>{barangay}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Popular Destinations Suggestions */}
              {!tripData.destination.region && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Popular Destinations</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { name: 'Boracay', region: 'Region VI (Western Visayas)', province: 'Aklan', city: 'Boracay (Malay)', emoji: '🏖️' },
                      { name: 'Palawan', region: 'Region IV-B (MIMAROPA)', province: 'Palawan', city: 'Puerto Princesa', emoji: '🏝️' },
                      { name: 'Cebu', region: 'Region VII (Central Visayas)', province: 'Cebu', city: 'Cebu City', emoji: '🏛️' },
                      { name: 'Manila', region: 'National Capital Region (NCR)', province: 'Metro Manila', city: 'Manila', emoji: '🏙️' }
                    ].map(destination => (
                      <button
                        key={destination.name}
                        onClick={() => setTripData({
                          ...tripData,
                          destination: {
                            region: destination.region,
                            province: destination.province,
                            city: destination.city,
                            barangay: ''
                          }
                        })}
                        className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors text-center"
                      >
                        <div className="text-2xl mb-2">{destination.emoji}</div>
                        <div className="font-medium text-gray-900 dark:text-white">{destination.name}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Selected Destination Preview */}
              {tripData.destination.city && (
                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-2">Selected Destination:</h4>
                  <p className="text-blue-800 dark:text-blue-300">
                    {tripData.destination.barangay && `${tripData.destination.barangay}, `}
                    {tripData.destination.city}, {tripData.destination.province}, {tripData.destination.region}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Dates */}
          {currentStep === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Select Your Travel Dates</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Check-in Date</label>
                  <input 
                    type="date"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    value={tripData.dates.checkIn}
                    onChange={(e) => setTripData({
                      ...tripData,
                      dates: { ...tripData.dates, checkIn: e.target.value }
                    })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Check-out Date</label>
                  <input 
                    type="date"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    value={tripData.dates.checkOut}
                    onChange={(e) => setTripData({
                      ...tripData,
                      dates: { ...tripData.dates, checkOut: e.target.value }
                    })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Guests</label>
                  <select 
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    value={tripData.guests}
                    onChange={(e) => setTripData({
                      ...tripData,
                      guests: parseInt(e.target.value)
                    })}
                  >
                    {[1,2,3,4,5,6,7,8].map(num => (
                      <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Hotels */}
          {currentStep === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Choose Your Accommodation</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sampleHotels.map(hotel => (
                  <div 
                    key={hotel.id}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      tripData.selectedHotel?.id === hotel.id 
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'
                    }`}
                    onClick={() => setTripData({ ...tripData, selectedHotel: hotel })}
                  >
                    <div className="w-full h-32 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{hotel.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{hotel.location}</p>
                    <div className="flex items-center mb-2">
                      <span className="text-yellow-400">★</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">{hotel.rating}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {hotel.amenities.map(amenity => (
                        <span key={amenity} className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                          {amenity}
                        </span>
                      ))}
                    </div>
                    <p className="text-lg font-bold text-blue-600 dark:text-blue-400">${hotel.price}/night</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Cars */}
          {currentStep === 4 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Select Your Vehicle</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sampleCars.map(car => (
                  <div 
                    key={car.id}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      tripData.selectedCar?.id === car.id 
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'
                    }`}
                    onClick={() => setTripData({ ...tripData, selectedCar: car })}
                  >
                    <div className="w-full h-32 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{car.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{car.type}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {car.features.map(feature => (
                        <span key={feature} className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                          {feature}
                        </span>
                      ))}
                    </div>
                    <p className="text-lg font-bold text-green-600 dark:text-green-400">${car.price}/day</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Dining */}
          {currentStep === 5 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Choose Dining Experiences</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">Select multiple restaurants you'd like to visit during your trip</p>
              <div className="grid md:grid-cols-2 gap-6">
                {sampleRestaurants.map(restaurant => (
                  <div 
                    key={restaurant.id}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      tripData.selectedRestaurants.some(r => r.id === restaurant.id)
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'
                    }`}
                    onClick={() => toggleRestaurant(restaurant)}
                  >
                    <div className="flex">
                      <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-lg mr-4"></div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white">{restaurant.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{restaurant.cuisine}</p>
                        <div className="flex items-center mb-2">
                          <span className="text-yellow-400">★</span>
                          <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">{restaurant.rating}</span>
                          <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">{restaurant.priceRange}</span>
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {restaurant.specialties.join(' • ')}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 6: Review */}
          {currentStep === 6 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Review Your Trip Bundle</h2>
              <div className="space-y-6">
                {/* Destination Summary */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Destination</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {tripData.destination.barangay && `${tripData.destination.barangay}, `}
                    {tripData.destination.city}, {tripData.destination.province}, {tripData.destination.region}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {tripData.dates.checkIn} to {tripData.dates.checkOut} • {tripData.guests} guest{tripData.guests > 1 ? 's' : ''}
                  </p>
                </div>

                {/* Selected Items */}
                <div className="grid md:grid-cols-2 gap-6">
                  {tripData.selectedHotel && (
                    <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">Hotel</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{tripData.selectedHotel.name}</p>
                      <p className="text-sm font-medium text-blue-600 dark:text-blue-400">${tripData.selectedHotel.price}/night</p>
                    </div>
                  )}

                  {tripData.selectedCar && (
                    <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">Car Rental</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{tripData.selectedCar.name}</p>
                      <p className="text-sm font-medium text-green-600 dark:text-green-400">${tripData.selectedCar.price}/day</p>
                    </div>
                  )}
                </div>

                {tripData.selectedRestaurants.length > 0 && (
                  <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Dining ({tripData.selectedRestaurants.length} restaurants)</h4>
                    <div className="space-y-1">
                      {tripData.selectedRestaurants.map(restaurant => (
                        <p key={restaurant.id} className="text-sm text-gray-600 dark:text-gray-400">
                          {restaurant.name} - {restaurant.cuisine}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                {/* Total */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">Total Estimated Cost</span>
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">₱{calculateTotal().toLocaleString()}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    *Prices are estimates and may vary based on availability and final selections
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button 
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            
            {currentStep < steps.length ? (
              <button 
                onClick={nextStep}
                disabled={currentStep === 1 && !tripData.destination.city}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next Step
              </button>
            ) : (
              <button className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg">
                Book Trip Bundle
              </button>
            )}
          </div>
        </div>

        {/* Additional Flight Booking Help Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 109.75 9.75A9.75 9.75 0 0012 2.25z" />
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Flight Booking Assistance
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Our travel experts are ready to help you find the best flight deals and create seamless travel itineraries. 
                Get personalized assistance for domestic and international flights.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <svg className="w-5 h-5 text-green-600 dark:text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Phone Support</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">+63 082 298 8047</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <svg className="w-5 h-5 text-green-600 dark:text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">WhatsApp/Mobile</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">+63 898 800 5598</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Side Summary */}
        <div className="hidden lg:block fixed right-8 top-1/2 transform -translate-y-1/2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Trip Summary</h3>
          
          {/* Flight Booking Reminder */}
          <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div className="flex items-center mb-2">
              <svg className="w-4 h-4 text-blue-600 dark:text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              <span className="text-sm font-medium text-blue-900 dark:text-blue-300">Need Flights?</span>
            </div>
            <p className="text-xs text-blue-800 dark:text-blue-300">
              Call +63 082 298 8047 for flight booking assistance
            </p>
          </div>
          
          {tripData.destination.city && (
            <div className="mb-3">
              <p className="text-sm text-gray-600 dark:text-gray-400">Destination</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {tripData.destination.barangay && `${tripData.destination.barangay}, `}
                {tripData.destination.city}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {tripData.destination.province}, {tripData.destination.region}
              </p>
            </div>
          )}
          
          {tripData.dates.checkIn && tripData.dates.checkOut && (
            <div className="mb-3">
              <p className="text-sm text-gray-600 dark:text-gray-400">Dates</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {new Date(tripData.dates.checkIn).toLocaleDateString()} - {new Date(tripData.dates.checkOut).toLocaleDateString()}
              </p>
            </div>
          )}
          
          <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-3">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-900 dark:text-white">Estimated Total</span>
              <span className="text-lg font-bold text-blue-600 dark:text-blue-400">₱{calculateTotal().toLocaleString()}</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">*Flights not included</p>
          </div>
        </div>
      </div>
    </div>
  );
} 