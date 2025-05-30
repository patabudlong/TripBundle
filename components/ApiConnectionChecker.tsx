'use client';

import { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';

interface ApiStatus {
  status: 'checking' | 'connected' | 'failed';
  url?: string;
  error?: string;
}

export default function ApiConnectionChecker() {
  const [apiStatus, setApiStatus] = useState<ApiStatus>({ status: 'checking' });

  useEffect(() => {
    const checkApiConnection = async () => {
      const apiUrl = typeof window !== 'undefined' 
        ? window.location.origin + '/api'
        : 'http://localhost:3000/api';
      
      console.log('🔍 Checking API connection to:', apiUrl);
      
      try {
        // Try to fetch a simple endpoint
        const response = await fetch(`${apiUrl}/health`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          setApiStatus({
            status: 'connected',
            url: apiUrl
          });
          console.log('✅ API connection successful');
        } else {
          setApiStatus({
            status: 'failed',
            url: apiUrl,
            error: `HTTP ${response.status}: ${response.statusText}`
          });
          console.log('❌ API connection failed:', response.status);
        }
      } catch (error) {
        setApiStatus({
          status: 'failed',
          url: apiUrl,
          error: error instanceof Error ? error.message : 'Network error'
        });
        console.log('❌ API connection error:', error);
      }
    };

    checkApiConnection();
  }, []);

  if (apiStatus.status === 'checking') {
    return (
      <div className="mb-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 border border-blue-200 dark:border-blue-800">
        <div className="flex items-center space-x-3">
          <LoadingSpinner size="sm" color="blue" />
          <span className="text-sm text-blue-600 dark:text-blue-400">
            Checking API connection...
          </span>
        </div>
      </div>
    );
  }

  if (apiStatus.status === 'failed') {
    return (
      <div className="mb-4 bg-red-50 dark:bg-red-900/20 rounded-lg p-3 border border-red-200 dark:border-red-800">
        <div className="flex items-start space-x-3">
          <span className="text-red-500">❌</span>
          <div>
            <p className="text-sm font-medium text-red-800 dark:text-red-200">
              API Connection Failed
            </p>
            <p className="text-xs text-red-600 dark:text-red-400 mt-1">
              {apiStatus.url && `URL: ${apiStatus.url}`}
            </p>
            <p className="text-xs text-red-600 dark:text-red-400">
              Error: {apiStatus.error}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (apiStatus.status === 'connected') {
    return (
      <div className="mb-4 bg-green-50 dark:bg-green-900/20 rounded-lg p-3 border border-green-200 dark:border-green-800">
        <div className="flex items-center space-x-3">
          <span className="text-green-500">✅</span>
          <div>
            <p className="text-sm font-medium text-green-800 dark:text-green-200">
              API Connected
            </p>
            <p className="text-xs text-green-600 dark:text-green-400">
              {apiStatus.url}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
} 