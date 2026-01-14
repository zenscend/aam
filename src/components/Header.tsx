'use client';

import { Bell, Search, Plus } from 'lucide-react';
import Link from 'next/link';

interface HeaderProps {
  title: string;
  subtitle?: string;
  showNewButton?: boolean;
  newButtonText?: string;
  newButtonHref?: string;
}

export default function Header({
  title,
  subtitle,
  showNewButton = false,
  newButtonText = 'New',
  newButtonHref = '#',
}: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="lg:hidden w-10" /> {/* Spacer for mobile menu button */}

        <div className="flex-1 lg:flex-none">
          <h1 className="text-xl lg:text-2xl font-bold text-gray-900">{title}</h1>
          {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
        </div>

        <div className="flex items-center gap-3">
          {/* Search - hidden on mobile */}
          <div className="hidden md:block relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 bg-gray-100 border-0 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:bg-white w-64"
            />
          </div>

          {/* Notifications */}
          <button className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* New Button */}
          {showNewButton && (
            <Link
              href={newButtonHref}
              className="btn-primary flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">{newButtonText}</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
