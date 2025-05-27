import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      {/* Hero Section with World Map Theme */}
      <section className="relative bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-500 dark:from-teal-600 dark:via-cyan-700 dark:to-blue-700 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none">
            {/* Simplified world map silhouette */}
            <path d="M200 300C250 280 300 290 350 310C400 330 450 320 500 340C550 360 600 350 650 370C700 390 750 380 800 400C850 420 900 410 950 430C1000 450 1050 440 1100 460V600H100V350C133 333 166 316 200 300Z" fill="currentColor"/>
            <circle cx="300" cy="200" r="3" fill="currentColor"/>
            <circle cx="500" cy="180" r="3" fill="currentColor"/>
            <circle cx="700" cy="220" r="3" fill="currentColor"/>
            <circle cx="900" cy="190" r="3" fill="currentColor"/>
          </svg>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-8 h-8 bg-white/20 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-6 h-6 bg-white/30 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-40 left-20 w-4 h-4 bg-white/25 rounded-full animate-pulse delay-500"></div>
          <div className="absolute bottom-20 right-40 w-10 h-10 bg-white/15 rounded-full animate-pulse delay-700"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start mb-6">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 mr-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">TripBundle</h1>
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Your Complete
                <span className="block text-cyan-200">Travel Companion</span>
              </h2>
              
              <p className="text-xl text-cyan-100 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Plan, book, and explore effortlessly with TripBundle — the all-in-one travel platform that integrates accommodations, car rentals, tours, dining, and must-visit places.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link 
                  href="/signup"
                  className="bg-white text-cyan-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Start Planning
                </Link>
                <Link 
                  href="/login"
                  className="bg-white/20 backdrop-blur-sm text-white border-2 border-white/30 hover:bg-white/30 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300"
                >
                  Sign In
                </Link>
              </div>
            </div>

            {/* Right Content - Device Mockups */}
            <div className="relative">
              <div className="relative z-10">
                {/* Desktop Mockup */}
                <div className="bg-gray-800 rounded-t-2xl p-2 shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                  <div className="bg-white rounded-xl overflow-hidden">
                    <div className="bg-gray-100 px-4 py-3 flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      <div className="flex-1 bg-gray-200 rounded-full px-4 py-1 ml-4">
                        <span className="text-xs text-gray-500">tripbundle.com</span>
                      </div>
                    </div>
                    <div className="h-64 bg-gradient-to-br from-cyan-400 to-blue-500 relative overflow-hidden">
                      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                      <div className="relative p-6">
                        <div className="text-white text-lg font-semibold mb-4">Travel Bookings</div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-white/20 rounded-lg p-3">
                            <div className="w-full h-16 bg-white/30 rounded mb-2"></div>
                            <div className="h-2 bg-white/40 rounded mb-1"></div>
                            <div className="h-2 bg-white/30 rounded w-3/4"></div>
                          </div>
                          <div className="bg-white/20 rounded-lg p-3">
                            <div className="w-full h-16 bg-white/30 rounded mb-2"></div>
                            <div className="h-2 bg-white/40 rounded mb-1"></div>
                            <div className="h-2 bg-white/30 rounded w-2/3"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile Mockups */}
                <div className="absolute -bottom-8 -left-8 bg-gray-800 rounded-3xl p-2 shadow-xl transform -rotate-12 hover:rotate-0 transition-transform duration-500">
                  <div className="w-32 h-56 bg-white rounded-2xl overflow-hidden">
                    <div className="bg-cyan-500 h-20 relative">
                      <div className="absolute top-4 left-4 text-white text-xs font-semibold">TripBundle</div>
                      <div className="absolute bottom-2 left-4 right-4">
                        <div className="bg-white/20 rounded-full h-6"></div>
                      </div>
                    </div>
                    <div className="p-3 space-y-2">
                      <div className="flex space-x-2">
                        <div className="w-12 h-12 bg-orange-200 rounded-lg"></div>
                        <div className="w-12 h-12 bg-blue-200 rounded-lg"></div>
                        <div className="w-12 h-12 bg-green-200 rounded-lg"></div>
                      </div>
                      <div className="space-y-1">
                        <div className="h-2 bg-gray-200 rounded"></div>
                        <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-4 -right-4 bg-gray-800 rounded-3xl p-2 shadow-xl transform rotate-12 hover:rotate-0 transition-transform duration-500">
                  <div className="w-32 h-56 bg-white rounded-2xl overflow-hidden">
                    <div className="bg-gradient-to-r from-teal-400 to-cyan-500 h-24 relative">
                      <div className="absolute top-4 left-4 text-white text-xs font-semibold">Bookings</div>
                    </div>
                    <div className="p-3 space-y-3">
                      <div className="bg-gray-100 rounded-lg p-2">
                        <div className="h-1 bg-gray-300 rounded mb-1"></div>
                        <div className="h-1 bg-gray-300 rounded w-2/3"></div>
                      </div>
                      <div className="bg-gray-100 rounded-lg p-2">
                        <div className="h-1 bg-gray-300 rounded mb-1"></div>
                        <div className="h-1 bg-gray-300 rounded w-3/4"></div>
                      </div>
                      <div className="bg-green-100 rounded-lg p-2">
                        <div className="h-1 bg-green-300 rounded mb-1"></div>
                        <div className="h-1 bg-green-300 rounded w-1/2"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything You Need for Your Perfect Trip
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              From accommodations to activities, we've got every aspect of your journey covered in one seamless platform.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Cards */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Accommodations</h3>
              <p className="text-gray-600 dark:text-gray-300">Find and book hotels, vacation rentals, hostels, and unique stays worldwide with the best prices guaranteed.</p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Tours & Experiences</h3>
              <p className="text-gray-600 dark:text-gray-300">Discover amazing tours, activities, and experiences with local guides who know the hidden gems.</p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Trip Planning</h3>
              <p className="text-gray-600 dark:text-gray-300">Create detailed itineraries, manage bookings, and keep all your travel information organized in one place.</p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Car Rentals</h3>
              <p className="text-gray-600 dark:text-gray-300">Compare and book rental cars from trusted providers with flexible pickup and drop-off options.</p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Food Experiences</h3>
              <p className="text-gray-600 dark:text-gray-300">Book restaurant reservations, food tours, and culinary experiences to taste the local flavors.</p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-teal-100 dark:bg-teal-900 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-teal-600 dark:text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Must-Visit Places</h3>
              <p className="text-gray-600 dark:text-gray-300">Explore curated lists of attractions, landmarks, and hidden gems recommended by travelers and locals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-cyan-600 dark:to-blue-700 py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Next Adventure?
          </h2>
          <p className="text-xl text-cyan-100 mb-8 max-w-2xl mx-auto">
            Join thousands of travelers who trust TripBundle to make their journeys unforgettable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/signup"
              className="bg-white text-cyan-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Get Started Free
            </Link>
            <Link 
              href="/login"
              className="bg-white/20 backdrop-blur-sm text-white border-2 border-white/30 hover:bg-white/30 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
