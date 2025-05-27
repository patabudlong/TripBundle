'use client';

import { useState } from 'react';
import Link from 'next/link';

interface DestinationFilter {
  region: string;
  province: string;
  city: string;
  barangay: string;
}

export default function DestinationsPage() {
  const [filters, setFilters] = useState<DestinationFilter>({
    region: '',
    province: '',
    city: '',
    barangay: ''
  });

  const [searchQuery, setSearchQuery] = useState('');

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
    'National Capital Region (NCR)': ['Metro Manila'],
    'Region IV-A (CALABARZON)': ['Batangas', 'Cavite', 'Laguna', 'Quezon', 'Rizal'],
    'Region VII (Central Visayas)': ['Bohol', 'Cebu', 'Negros Oriental', 'Siquijor'],
    'Region XI (Davao Region)': ['Davao del Norte', 'Davao del Sur', 'Davao de Oro', 'Davao Occidental', 'Davao Oriental'],
    'Region VI (Western Visayas)': ['Aklan', 'Antique', 'Capiz', 'Guimaras', 'Iloilo', 'Negros Occidental'],
    'Region III (Central Luzon)': ['Aurora', 'Bataan', 'Bulacan', 'Nueva Ecija', 'Pampanga', 'Tarlac', 'Zambales'],
    'Region V (Bicol Region)': ['Albay', 'Camarines Norte', 'Camarines Sur', 'Catanduanes', 'Masbate', 'Sorsogon'],
    'Region IV-B (MIMAROPA)': ['Marinduque', 'Occidental Mindoro', 'Oriental Mindoro', 'Palawan', 'Romblon'],
    'Cordillera Administrative Region (CAR)': ['Abra', 'Apayao', 'Benguet', 'Ifugao', 'Kalinga', 'Mountain Province'],
    'Region XIII (Caraga)': ['Agusan del Norte', 'Agusan del Sur', 'Dinagat Islands', 'Surigao del Norte', 'Surigao del Sur']
  };

  const cities = {
    'Metro Manila': ['Manila', 'Quezon City', 'Makati', 'Pasig', 'Taguig', 'Mandaluyong', 'Marikina', 'Pasay', 'Caloocan'],
    'Cebu': ['Cebu City', 'Lapu-Lapu City', 'Mandaue City', 'Talisay City', 'Toledo City', 'Danao City'],
    'Batangas': ['Batangas City', 'Lipa City', 'Tanauan City', 'Santo Tomas', 'Calaca', 'Lemery'],
    'Aklan': ['Kalibo', 'Boracay (Malay)', 'Ibajay', 'Altavas', 'Balete', 'Banga'],
    'Bohol': ['Tagbilaran City', 'Panglao', 'Loboc', 'Carmen', 'Dauis', 'Baclayon'],
    'Palawan': ['Puerto Princesa', 'El Nido', 'Coron', 'San Vicente', 'Brooke\'s Point'],
    'Benguet': ['Baguio City', 'La Trinidad', 'Itogon', 'Sablan', 'Tuba'],
    'Surigao del Norte': ['Surigao City', 'Del Carmen (Siargao)', 'Dapa', 'General Luna', 'Pilar']
  };

  const barangays = {
    'Boracay (Malay)': ['Balabag', 'Manoc-Manoc', 'Yapak'],
    'El Nido': ['Poblacion', 'Corong-Corong', 'Bacuit Bay'],
    'Panglao': ['Alona Beach', 'Doljo', 'Tawala'],
    'Manila': ['Ermita', 'Malate', 'Intramuros', 'Binondo'],
    'Cebu City': ['Lahug', 'IT Park', 'Colon', 'Capitol Site']
  };

  const allDestinations = [
    {
      id: 1,
      name: "Boracay",
      region: "Region VI (Western Visayas)",
      province: "Aklan", 
      city: "Boracay (Malay)",
      rating: 4.1,
      reviews: 103,
      category: "Islands, Points of Interest & Landmarks",
      image: "/api/placeholder/400/250",
      description: "World-famous white sand beaches and crystal clear waters perfect for relaxation and water sports.",
      highlights: ["White Beach", "Water Sports", "Nightlife", "Island Hopping"],
      priceRange: "₱3,000 - ₱15,000",
      bestTime: "Nov - Apr"
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
      image: "/api/placeholder/400/250",
      description: "Pristine islands, underground rivers, and breathtaking limestone cliffs.",
      highlights: ["El Nido", "Coron", "Underground River", "Island Tours"],
      priceRange: "₱4,000 - ₱20,000",
      bestTime: "Dec - May"
    },
    {
      id: 3,
      name: "Bohol",
      region: "Region VII (Central Visayas)",
      province: "Bohol",
      city: "Tagbilaran City",
      rating: 4.3,
      reviews: 156,
      category: "Nature & Wildlife, Points of Interest",
      image: "/api/placeholder/400/250",
      description: "Famous for Chocolate Hills and adorable tarsiers, plus beautiful beaches.",
      highlights: ["Chocolate Hills", "Tarsier Sanctuary", "Loboc River", "Panglao Beach"],
      priceRange: "₱2,500 - ₱12,000",
      bestTime: "Dec - May"
    },
    {
      id: 4,
      name: "Siargao",
      region: "Region XIII (Caraga)",
      province: "Surigao del Norte",
      city: "Del Carmen",
      rating: 4.4,
      reviews: 89,
      category: "Islands, Surfing & Water Sports",
      image: "/api/placeholder/400/250",
      description: "Surfing capital with pristine lagoons and laid-back island vibes.",
      highlights: ["Cloud 9", "Sugba Lagoon", "Island Hopping", "Magpupungko Pools"],
      priceRange: "₱2,000 - ₱10,000",
      bestTime: "Mar - Oct"
    },
    {
      id: 5,
      name: "Cebu City",
      region: "Region VII (Central Visayas)",
      province: "Cebu",
      city: "Cebu City",
      rating: 4.0,
      reviews: 234,
      category: "Historical Sites, Shopping Malls",
      image: "/api/placeholder/400/250",
      description: "Historical landmarks, modern attractions, and gateway to beautiful islands.",
      highlights: ["Magellan's Cross", "Temple of Leah", "IT Park", "Oslob Whale Sharks"],
      priceRange: "₱2,000 - ₱8,000",
      bestTime: "Dec - May"
    },
    {
      id: 6,
      name: "Baguio",
      region: "Cordillera Administrative Region (CAR)",
      province: "Benguet",
      city: "Baguio City",
      rating: 3.9,
      reviews: 178,
      category: "Mountains, Cool Climate & Nature",
      image: "/api/placeholder/400/250",
      description: "Summer capital with cool mountain air, pine trees, and strawberry farms.",
      highlights: ["Burnham Park", "Session Road", "Strawberry Farm", "Mines View Park"],
      priceRange: "₱1,500 - ₱6,000",
      bestTime: "Nov - Feb"
    },
    {
      id: 7,
      name: "Vigan",
      region: "Region I (Ilocos Region)",
      province: "Ilocos Sur",
      city: "Vigan City",
      rating: 4.2,
      reviews: 145,
      category: "Historical Sites, Cultural Heritage",
      image: "/api/placeholder/400/250",
      description: "UNESCO World Heritage site with preserved Spanish colonial architecture.",
      highlights: ["Calle Crisologo", "Heritage Village", "Kalesa Rides", "Longganisa"],
      priceRange: "₱1,800 - ₱7,000",
      bestTime: "Nov - Apr"
    },
    {
      id: 8,
      name: "Davao",
      region: "Region XI (Davao Region)",
      province: "Davao del Sur",
      city: "Davao City",
      rating: 4.1,
      reviews: 198,
      category: "Urban, Nature & Wildlife",
      image: "/api/placeholder/400/250",
      description: "Modern city with Mount Apo, durian fruit, and Philippine Eagle Center.",
      highlights: ["Mount Apo", "Philippine Eagle Center", "Durian", "Eden Nature Park"],
      priceRange: "₱2,000 - ₱9,000",
      bestTime: "Dec - May"
    }
  ];

  const filteredDestinations = allDestinations.filter(destination => {
    const matchesSearch = destination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         destination.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         destination.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRegion = !filters.region || destination.region === filters.region;
    const matchesProvince = !filters.province || destination.province === filters.province;
    const matchesCity = !filters.city || destination.city === filters.city;
    
    return matchesSearch && matchesRegion && matchesProvince && matchesCity;
  });

  const clearFilters = () => {
    setFilters({ region: '', province: '', city: '', barangay: '' });
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-600 dark:from-blue-800 dark:via-cyan-800 dark:to-teal-800">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Discover the Philippines
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              From pristine beaches to historic cities, explore the most beautiful destinations in the archipelago
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search destinations, activities, or places..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 pl-12 text-lg rounded-xl border-0 shadow-lg focus:ring-4 focus:ring-white/30 focus:outline-none dark:bg-gray-800 dark:text-white"
                />
                <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Filter Destinations</h2>
            <button 
              onClick={clearFilters}
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
            >
              Clear All
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Region Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Region</label>
              <select
                value={filters.region}
                onChange={(e) => setFilters({...filters, region: e.target.value, province: '', city: '', barangay: ''})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="">All Regions</option>
                {regions.map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>

            {/* Province Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Province</label>
              <select
                value={filters.province}
                onChange={(e) => setFilters({...filters, province: e.target.value, city: '', barangay: ''})}
                disabled={!filters.region}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white disabled:opacity-50"
              >
                <option value="">All Provinces</option>
                {filters.region && provinces[filters.region]?.map(province => (
                  <option key={province} value={province}>{province}</option>
                ))}
              </select>
            </div>

            {/* City Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">City</label>
              <select
                value={filters.city}
                onChange={(e) => setFilters({...filters, city: e.target.value, barangay: ''})}
                disabled={!filters.province}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white disabled:opacity-50"
              >
                <option value="">All Cities</option>
                {filters.province && cities[filters.province]?.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            {/* Barangay Filter (Optional) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Barangay (Optional)</label>
              <select
                value={filters.barangay}
                onChange={(e) => setFilters({...filters, barangay: e.target.value})}
                disabled={!filters.city}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white disabled:opacity-50"
              >
                <option value="">All Barangays</option>
                {filters.city && barangays[filters.city]?.map(barangay => (
                  <option key={barangay} value={barangay}>{barangay}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {filteredDestinations.length} Destinations Found
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {searchQuery && `Results for "${searchQuery}"`}
              {filters.region && ` in ${filters.region}`}
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white">
              <option>Sort by Popularity</option>
              <option>Sort by Rating</option>
              <option>Sort by Price (Low to High)</option>
              <option>Sort by Price (High to Low)</option>
            </select>
          </div>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDestinations.map((destination) => (
            <div
              key={destination.id}
              className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
            >
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={destination.image} 
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                
                {/* Heart Icon */}
                <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-colors">
                  <svg className="w-5 h-5 text-gray-600 hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>

                {/* Price Range Badge */}
                <div className="absolute top-3 left-3 bg-black/70 text-white px-2 py-1 rounded-md text-xs font-medium">
                  {destination.priceRange}
                </div>

                {/* Image Dots Indicator */}
                <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-white' : 'bg-white/50'}`}
                    ></div>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                {/* Title and Rating */}
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {destination.name}
                  </h3>
                </div>

                {/* Rating */}
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white mr-1">
                      {destination.rating}
                    </span>
                    <div className="flex items-center mr-2">
                      {[...Array(5)].map((_, i) => (
                        <svg 
                          key={i} 
                          className={`w-4 h-4 ${i < Math.floor(destination.rating) ? 'text-green-500' : 'text-gray-300'}`} 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      ({destination.reviews})
                    </span>
                  </div>
                </div>

                {/* Category */}
                <p className="text-sm text-blue-600 dark:text-blue-400 mb-2 font-medium">
                  {destination.category}
                </p>

                {/* Description */}
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                  {destination.description}
                </p>

                {/* Best Time to Visit */}
                <div className="flex items-center mb-3 text-xs text-gray-500 dark:text-gray-400">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Best time: {destination.bestTime}
                </div>

                {/* Highlights */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {destination.highlights.slice(0, 2).map((highlight, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs text-gray-700 dark:text-gray-300 rounded-full"
                    >
                      {highlight}
                    </span>
                  ))}
                  {destination.highlights.length > 2 && (
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs text-gray-700 dark:text-gray-300 rounded-full">
                      +{destination.highlights.length - 2} more
                    </span>
                  )}
                </div>

                {/* Create Trip Bundle Button */}
                <Link 
                  href={`/bundle?destination=${encodeURIComponent(JSON.stringify({
                    region: destination.region,
                    province: destination.province,
                    city: destination.city,
                    barangay: ''
                  }))}`}
                  className="block w-full py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white text-sm font-medium rounded-lg transition-all duration-200 transform group-hover:scale-105 text-center"
                >
                  Create Trip Bundle
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredDestinations.length === 0 && (
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No destinations found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Try adjusting your search or filters</p>
            <button 
              onClick={clearFilters}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 