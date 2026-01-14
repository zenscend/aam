'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Link from 'next/link';
import {
  Search,
  QrCode,
  MapPin,
  Package,
  ArrowUpRight,
  Printer,
  Box,
  Grid,
  List,
} from 'lucide-react';
import { cages } from '@/lib/mock-data';
import { clsx } from 'clsx';

type ViewMode = 'grid' | 'list';
type StatusFilter = 'all' | 'active' | 'empty' | 'pending_pickup';

export default function CagesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [selectedCage, setSelectedCage] = useState<typeof cages[0] | null>(null);

  const filteredCages = cages.filter((cage) => {
    const matchesSearch =
      cage.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cage.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cage.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || cage.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const cagesByStatus = {
    active: cages.filter((c) => c.status === 'active'),
    empty: cages.filter((c) => c.status === 'empty'),
    pending_pickup: cages.filter((c) => c.status === 'pending_pickup'),
  };

  return (
    <>
      <Header
        title="Parts Cages"
        subtitle={`${cages.length} cages in storage`}
        showNewButton
        newButtonText="Add Cage"
        newButtonHref="/dashboard/cages/new"
      />

      <div className="flex-1 p-6 overflow-y-auto">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="card p-4 text-center">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Box className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-green-600">{cagesByStatus.active.length}</p>
            <p className="text-xs text-gray-500">Active Cages</p>
          </div>
          <div className="card p-4 text-center">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Box className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-2xl font-bold text-gray-400">{cagesByStatus.empty.length}</p>
            <p className="text-xs text-gray-500">Empty Cages</p>
          </div>
          <div className="card p-4 text-center">
            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Box className="w-5 h-5 text-amber-600" />
            </div>
            <p className="text-2xl font-bold text-amber-600">{cagesByStatus.pending_pickup.length}</p>
            <p className="text-xs text-gray-500">Pending Pickup</p>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Cage List */}
          <div className="xl:col-span-2">
            {/* Filters */}
            <div className="card p-4 mb-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search cages, projects, or locations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="empty">Empty</option>
                  <option value="pending_pickup">Pending Pickup</option>
                </select>
                <div className="flex items-center bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={clsx(
                      'p-2 rounded-md transition-colors',
                      viewMode === 'grid' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'
                    )}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={clsx(
                      'p-2 rounded-md transition-colors',
                      viewMode === 'list' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'
                    )}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Grid View */}
            {viewMode === 'grid' && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {filteredCages.map((cage) => (
                  <button
                    key={cage.id}
                    onClick={() => setSelectedCage(cage)}
                    className={clsx(
                      'card p-4 text-left hover:shadow-md transition-all',
                      selectedCage?.id === cage.id && 'ring-2 ring-red-500'
                    )}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-lg font-bold font-mono">{cage.number}</span>
                      <span
                        className={clsx(
                          'w-3 h-3 rounded-full',
                          cage.status === 'active'
                            ? 'bg-green-500'
                            : cage.status === 'empty'
                            ? 'bg-gray-300'
                            : 'bg-amber-500'
                        )}
                      />
                    </div>
                    {cage.projectName ? (
                      <p className="text-sm text-gray-600 truncate mb-1">{cage.projectName}</p>
                    ) : (
                      <p className="text-sm text-gray-400 mb-1">Empty</p>
                    )}
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <MapPin className="w-3 h-3" />
                      <span>{cage.location}</span>
                    </div>
                    {cage.partsCount > 0 && (
                      <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                        <Package className="w-3 h-3" />
                        <span>{cage.partsCount} parts</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* List View */}
            {viewMode === 'list' && (
              <div className="card divide-y divide-gray-100">
                {filteredCages.map((cage) => (
                  <button
                    key={cage.id}
                    onClick={() => setSelectedCage(cage)}
                    className={clsx(
                      'flex items-center gap-4 p-4 w-full text-left hover:bg-gray-50 transition-colors',
                      selectedCage?.id === cage.id && 'bg-red-50'
                    )}
                  >
                    <div
                      className={clsx(
                        'w-12 h-12 rounded-lg flex items-center justify-center font-bold font-mono',
                        cage.status === 'active'
                          ? 'bg-green-100 text-green-700'
                          : cage.status === 'empty'
                          ? 'bg-gray-100 text-gray-400'
                          : 'bg-amber-100 text-amber-700'
                      )}
                    >
                      {cage.number.replace('C-', '')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium">{cage.number}</p>
                      <p className="text-sm text-gray-500 truncate">
                        {cage.projectName || 'No project assigned'}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">{cage.location}</p>
                      <p className="text-xs text-gray-400">{cage.partsCount} parts</p>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {filteredCages.length === 0 && (
              <div className="card p-12 text-center">
                <Box className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No cages found</p>
              </div>
            )}
          </div>

          {/* QR Preview Panel */}
          <div className="card sticky top-6">
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-semibold text-lg">Cage Label Preview</h2>
            </div>
            {selectedCage ? (
              <div className="p-6">
                {/* QR Code Placeholder */}
                <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-6 mb-4">
                  <div className="w-full aspect-square bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                    <QrCode className="w-32 h-32 text-gray-400" />
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold font-mono mb-1">{selectedCage.number}</p>
                    <p className="text-sm text-gray-500">{selectedCage.location}</p>
                  </div>
                </div>

                {/* Cage Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Status</span>
                    <span
                      className={clsx(
                        'font-medium capitalize',
                        selectedCage.status === 'active'
                          ? 'text-green-600'
                          : selectedCage.status === 'empty'
                          ? 'text-gray-400'
                          : 'text-amber-600'
                      )}
                    >
                      {selectedCage.status.replace('_', ' ')}
                    </span>
                  </div>
                  {selectedCage.projectName && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Project</span>
                      <Link
                        href={`/dashboard/projects/${selectedCage.projectId}`}
                        className="font-medium text-red-600 hover:text-red-700 flex items-center gap-1"
                      >
                        {selectedCage.projectName.split(' ').slice(0, 2).join(' ')}
                        <ArrowUpRight className="w-3 h-3" />
                      </Link>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Parts Count</span>
                    <span className="font-medium">{selectedCage.partsCount}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-2">
                  <button className="w-full btn-primary flex items-center justify-center gap-2">
                    <Printer className="w-4 h-4" />
                    Print Label
                  </button>
                  <button className="w-full btn-secondary flex items-center justify-center gap-2">
                    <QrCode className="w-4 h-4" />
                    Download QR
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-12 text-center">
                <QrCode className="w-16 h-16 text-gray-200 mx-auto mb-3" />
                <p className="text-gray-400">Select a cage to preview its label</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
