'use client';

import { useState } from 'react';
import Link from 'next/link';

interface TripData {
  destination: {
    country: string;
    region: string;
    place: string;
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
    destination: { country: '', region: '', place: '' },
    dates: { checkIn: '', checkOut: '' },
    guests: 2,
    selectedHotel: null,
    selectedCar: null,
    selectedRestaurants: []
  });

  const steps = [
    { id: 1, name: 'Destination', icon: '🌍' },
    { id: 2, name: 'Dates', icon: '📅' },
    { id: 3, name: 'Hotels', icon: '🏨' },
    { id: 4, name: 'Cars', icon: '🚗' },
    { id: 5, name: 'Dining', icon: '🍽️' },
    { id: 6, name: 'Review', icon: '✅' }
  ];

  const countries = [
    'United States', 'United Kingdom', 'France', 'Germany', 'Italy', 'Spain', 
    'Japan', 'Australia', 'Canada', 'Thailand', 'Greece', 'Portugal'
  ];

  const regions = {
    'United States': ['California', 'New York', 'Florida', 'Texas', 'Nevada'],
    'France': ['Île-de-France', 'Provence', 'Normandy', 'Loire Valley', 'French Riviera'],
    'Italy': ['Tuscany', 'Lazio', 'Veneto', 'Campania', 'Sicily'],
    'Japan': ['Tokyo', 'Kyoto', 'Osaka', 'Hokkaido', 'Okinawa']
  };

  const places = {
    'California': ['Los Angeles', 'San Francisco', 'San Diego', 'Napa Valley'],
    'Île-de-France': ['Paris', 'Versailles', 'Fontainebleau', 'Chantilly'],
    'Tuscany': ['Florence', 'Siena', 'Pisa', 'San Gimignano'],
    'Tokyo': ['Shibuya', 'Shinjuku', 'Asakusa', 'Ginza']
  };

  const sampleHotels = [
    {
      id: 1,
      name: 'Grand Palace Hotel',
      rating: 4.8,
      price: 299,
      image: '/api/placeholder/300/200',
      amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant'],
      location: 'City Center'
    },
    {
      id: 2,
      name: 'Boutique Garden Inn',
      rating: 4.6,
      price: 189,
      image: '/api/placeholder/300/200',
      amenities: ['WiFi', 'Garden', 'Breakfast', 'Parking'],
      location: 'Historic District'
    },
    {
      id: 3,
      name: 'Modern Sky Tower',
      rating: 4.7,
      price: 349,
      image: '/api/placeholder/300/200',
      amenities: ['WiFi', 'Gym', 'Rooftop Bar', 'Concierge'],
      location: 'Business District'
    }
  ];

  const sampleCars = [
    {
      id: 1,
      name: 'Economy Compact',
      type: 'Toyota Corolla or similar',
      price: 45,
      features: ['Manual', '5 Seats', 'AC', 'Good MPG'],
      image: '/api/placeholder/300/200'
    },
    {
      id: 2,
      name: 'Premium SUV',
      type: 'BMW X3 or similar',
      price: 89,
      features: ['Automatic', '5 Seats', 'GPS', 'Luxury'],
      image: '/api/placeholder/300/200'
    },
    {
      id: 3,
      name: 'Convertible',
      type: 'Mercedes C-Class or similar',
      price: 125,
      features: ['Automatic', '4 Seats', 'Convertible', 'Premium'],
      image: '/api/placeholder/300/200'
    }
  ];

  const sampleRestaurants = [
    {
      id: 1,
      name: 'Le Gourmet',
      cuisine: 'French Fine Dining',
      rating: 4.9,
      priceRange: '$$$',
      image: '/api/placeholder/300/200',
      specialties: ['Foie Gras', 'Bouillabaisse', 'Crème Brûlée']
    },
    {
      id: 2,
      name: 'Sakura Sushi',
      cuisine: 'Japanese',
      rating: 4.7,
      priceRange: '$$',
      image: '/api/placeholder/300/200',
      specialties: ['Omakase', 'Fresh Sashimi', 'Sake Selection']
    },
    {
      id: 3,
      name: 'Mama\'s Trattoria',
      cuisine: 'Italian',
      rating: 4.6,
      priceRange: '$$',
      image: '/api/placeholder/300/200',
      specialties: ['Handmade Pasta', 'Wood-fired Pizza', 'Tiramisu']
    },
    {
      id: 4,
      name: 'Street Food Market',
      cuisine: 'Local Specialties',
      rating: 4.5,
      priceRange: '$',
      image: '/api/placeholder/300/200',
      specialties: ['Local Dishes', 'Fresh Ingredients', 'Authentic Flavors']
    }
  ];

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
    const days = tripData.dates.checkIn && tripData.dates.checkOut 
      ? Math.ceil((new Date(tripData.dates.checkOut).getTime() - new Date(tripData.dates.checkIn).getTime()) / (1000 * 3600 * 24))
      : 1;
    
    const hotelTotal = tripData.selectedHotel ? tripData.selectedHotel.price * days : 0;
    const carTotal = tripData.selectedCar ? tripData.selectedCar.price * days : 0;
    const restaurantTotal = tripData.selectedRestaurants.length * 75; // Average per restaurant
    
    return hotelTotal + carTotal + restaurantTotal;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Create Your Perfect Trip Bundle
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Plan everything in one place - destination, dates, accommodation, transport, and dining
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4 overflow-x-auto pb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full text-sm font-medium ${
                  currentStep >= step.id 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}>
                  <span className="text-lg">{step.icon}</span>
                </div>
                <div className="ml-2 text-sm font-medium text-gray-900 dark:text-white hidden sm:block">
                  {step.name}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-8 h-0.5 mx-4 ${
                    currentStep > step.id ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
          
          {/* Step 1: Destination */}
          {currentStep === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Choose Your Destination</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Country</label>
                  <select 
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    value={tripData.destination.country}
                    onChange={(e) => setTripData({
                      ...tripData,
                      destination: { ...tripData.destination, country: e.target.value, region: '', place: '' }
                    })}
                  >
                    <option value="">Select Country</option>
                    {countries.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Region</label>
                  <select 
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    value={tripData.destination.region}
                    onChange={(e) => setTripData({
                      ...tripData,
                      destination: { ...tripData.destination, region: e.target.value, place: '' }
                    })}
                    disabled={!tripData.destination.country}
                  >
                    <option value="">Select Region</option>
                    {tripData.destination.country && regions[tripData.destination.country as keyof typeof regions]?.map(region => (
                      <option key={region} value={region}>{region}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">City/Place</label>
                  <select 
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    value={tripData.destination.place}
                    onChange={(e) => setTripData({
                      ...tripData,
                      destination: { ...tripData.destination, place: e.target.value }
                    })}
                    disabled={!tripData.destination.region}
                  >
                    <option value="">Select Place</option>
                    {tripData.destination.region && places[tripData.destination.region as keyof typeof places]?.map(place => (
                      <option key={place} value={place}>{place}</option>
                    ))}
                  </select>
                </div>
              </div>
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
                    {tripData.destination.place}, {tripData.destination.region}, {tripData.destination.country}
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
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">${calculateTotal()}</span>
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
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
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

        {/* Side Summary (visible on larger screens) */}
        <div className="hidden lg:block fixed right-8 top-1/2 transform -translate-y-1/2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Trip Summary</h3>
          
          {tripData.destination.place && (
            <div className="mb-3">
              <p className="text-sm text-gray-600 dark:text-gray-400">Destination</p>
              <p className="font-medium text-gray-900 dark:text-white">{tripData.destination.place}</p>
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
              <span className="text-lg font-bold text-blue-600 dark:text-blue-400">${calculateTotal()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 