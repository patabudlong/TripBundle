'use client';

import Link from "next/link";
import Image from "next/image";
import { useAuth } from '@/contexts/AuthContext';

export default function Header() {
  const { isAuthenticated, user, logout, isLoading } = useAuth();
  
  console.log('Header - isAuthenticated:', isAuthenticated, 'user:', user, 'isLoading:', isLoading);

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/tripbundles-logo.png"
                alt="TripBundles Logo"
                width={32}
                height={32}
                className="rounded-lg"
              />
              <span className="text-xl font-bold text-gray-900 dark:text-white">TripBundles</span>
            </Link>
          </div>

          {/* ... existing navigation ... */}

          {/* Right Side - Auth & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Desktop Auth Buttons */}
            <div className="hidden lg:flex items-center space-x-3">
              {isLoading ? (
                <div className="text-gray-700 dark:text-gray-300 px-3 py-2 text-sm">
                  Loading...
                </div>
              ) : isAuthenticated ? (
                <>
                  <span className="text-gray-700 dark:text-gray-300 text-sm">
                    Welcome, {user?.email}
                  </span>
                  <button 
                    onClick={logout}
                    className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                    Sign In
                  </Link>
                  <Link href="/signup" className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg">
                    Get Started
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button className="lg:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
} 