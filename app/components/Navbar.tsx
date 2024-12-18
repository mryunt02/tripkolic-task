'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FilterMenu } from './FilterMenu/FilterMenu';
import logo from '@/images/image.png';
import { useMenu } from '../contexts/MenuContext';

export default function Navbar() {
  const { isMenuOpen, setIsMenuOpen } = useMenu();

  return (
    <>
      <nav className='fixed top-0 left-0 right-0 bg-white shadow-md z-40'>
        <div className='max-w-7xl mx-auto'>
          {/* Top Bar */}
          <div className='px-4 py-3 flex items-center justify-between'>
            <button
              onClick={() => setIsMenuOpen(true)}
              className='flex items-center gap-2 text-gray-600'
              aria-label='Open filters'
            >
              <div className='flex flex-col gap-[3px] w-5'>
                <div className='w-full h-[2px] bg-gray-600'></div>
                <div className='w-3/4 h-[2px] bg-gray-600'></div>
                <div className='w-full h-[2px] bg-gray-600'></div>
              </div>
              <span className='text-sm'>Filter</span>
            </button>

            {/* Center Logo */}
            <Link href='/'>
              <Image src={logo} alt='Tripkolic Logo' width={25} height={25} />
            </Link>

            <div className='flex items-center gap-4'>
              <button className='text-gray-600' aria-label='Language'>
                <svg
                  className='w-6 h-6'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9'
                  />
                </svg>
              </button>
              <button className='text-red-500' aria-label='Favorites'>
                <svg
                  className='w-6 h-6'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' />
                </svg>
              </button>
              <button className='text-gray-600' aria-label='Cart'>
                <svg
                  className='w-6 h-6'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Category Tabs */}
        </div>
      </nav>

      {/* Filter Menu */}
      <FilterMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
