'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Link from 'next/link';
import {
  Search,
  Filter,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  ExternalLink,
  ArrowUpRight,
} from 'lucide-react';
import { projects, PartStatus } from '@/lib/mock-data';
import { clsx } from 'clsx';

// Flatten all parts from all projects
const allParts = projects.flatMap((project) =>
  project.parts.map((part) => ({
    ...part,
    projectId: project.id,
    projectName: project.name,
  }))
);

type StatusFilter = 'all' | PartStatus;

export default function PartsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  const filteredParts = allParts.filter((part) => {
    const matchesSearch =
      part.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      part.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
      part.projectName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || part.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getPartStatusIcon = (status: PartStatus) => {
    switch (status) {
      case 'installed':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'received':
        return <Package className="w-5 h-5 text-green-500" />;
      case 'in_transit':
        return <Truck className="w-5 h-5 text-purple-500" />;
      case 'ordered':
        return <Clock className="w-5 h-5 text-blue-500" />;
      default:
        return <div className="w-5 h-5 rounded-full border-2 border-gray-300" />;
    }
  };

  const partsByStatus = {
    quoted: allParts.filter((p) => p.status === 'quoted'),
    ordered: allParts.filter((p) => p.status === 'ordered'),
    in_transit: allParts.filter((p) => p.status === 'in_transit'),
    received: allParts.filter((p) => p.status === 'received'),
    installed: allParts.filter((p) => p.status === 'installed'),
  };

  return (
    <>
      <Header
        title="Parts & Procurement"
        subtitle={`${allParts.length} parts tracked`}
        showNewButton
        newButtonText="Add Part"
        newButtonHref="/dashboard/parts/new"
      />

      <div className="flex-1 p-6 overflow-y-auto">
        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <div className="card p-4 text-center">
            <p className="text-2xl font-bold text-gray-400">{partsByStatus.quoted.length}</p>
            <p className="text-xs text-gray-500">Quoted</p>
          </div>
          <div className="card p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">{partsByStatus.ordered.length}</p>
            <p className="text-xs text-gray-500">Ordered</p>
          </div>
          <div className="card p-4 text-center">
            <p className="text-2xl font-bold text-purple-600">{partsByStatus.in_transit.length}</p>
            <p className="text-xs text-gray-500">In Transit</p>
          </div>
          <div className="card p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{partsByStatus.received.length}</p>
            <p className="text-xs text-gray-500">Received</p>
          </div>
          <div className="card p-4 text-center">
            <p className="text-2xl font-bold text-emerald-600">{partsByStatus.installed.length}</p>
            <p className="text-xs text-gray-500">Installed</p>
          </div>
        </div>

        {/* Filters */}
        <div className="card p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search parts, suppliers, or projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="all">All Status</option>
                <option value="quoted">Quoted</option>
                <option value="ordered">Ordered</option>
                <option value="in_transit">In Transit</option>
                <option value="received">Received</option>
                <option value="installed">Installed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Parts List */}
        <div className="card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Part</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Project</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Supplier</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">ETA</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Cage</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredParts.map((part) => (
                  <tr key={part.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        {getPartStatusIcon(part.status)}
                        <div>
                          <p className="font-medium text-sm">{part.name}</p>
                          <p className="text-xs text-gray-500">{part.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Link
                        href={`/dashboard/projects/${part.projectId}`}
                        className="text-sm text-gray-600 hover:text-red-600 flex items-center gap-1"
                      >
                        {part.projectName}
                        <ArrowUpRight className="w-3 h-3" />
                      </Link>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-gray-600">{part.supplier}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={clsx(
                          'badge text-xs capitalize',
                          part.status === 'installed'
                            ? 'bg-emerald-100 text-emerald-700'
                            : part.status === 'received'
                            ? 'bg-green-100 text-green-700'
                            : part.status === 'in_transit'
                            ? 'bg-purple-100 text-purple-700'
                            : part.status === 'ordered'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-gray-100 text-gray-600'
                        )}
                      >
                        {part.status.replace('_', ' ')}
                      </span>
                      {part.trackingNumber && (
                        <button className="ml-2 text-xs text-gray-400 hover:text-gray-600">
                          <ExternalLink className="w-3 h-3 inline" />
                        </button>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-gray-600">{part.eta}</span>
                    </td>
                    <td className="py-3 px-4">
                      {part.cageNumber ? (
                        <Link
                          href={`/dashboard/cages?search=${part.cageNumber}`}
                          className="text-sm font-mono text-gray-600 hover:text-red-600 flex items-center gap-1"
                        >
                          <MapPin className="w-3 h-3" />
                          {part.cageNumber}
                        </Link>
                      ) : (
                        <span className="text-sm text-gray-400">-</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="text-sm font-medium">R{part.cost.toLocaleString()}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredParts.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No parts found</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
