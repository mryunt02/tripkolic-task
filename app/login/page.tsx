'use client';

import { useState } from 'react';

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className='min-h-screen p-4 pt-20 bg-gray-50'>
      <div className='max-w-md mx-auto bg-white rounded-xl shadow-md p-6'>
        <h2 className='text-2xl font-bold text-center mb-6'>
          {isSignUp ? 'Create Account' : 'Sign In'}
        </h2>

        <form className='space-y-4'>
          {isSignUp && (
            <>
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Name
                </label>
                <input
                  type='text'
                  className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Surname
                </label>
                <input
                  type='text'
                  className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500'
                />
              </div>
            </>
          )}

          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Email
            </label>
            <input
              type='email'
              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Password
            </label>
            <input
              type='password'
              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500'
            />
          </div>

          <button
            type='submit'
            className='w-full bg-primary-500 text-white py-2 px-4 rounded-md hover:bg-primary-600 transition-colors'
          >
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>

        <div className='mt-4 text-center'>
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className='text-primary-500 hover:text-primary-600'
          >
            {isSignUp
              ? 'Already have an account? Sign In'
              : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}
