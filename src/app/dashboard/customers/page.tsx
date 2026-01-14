'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Link from 'next/link';
import { Search, User, Mail, Phone, MapPin, FolderKanban, ArrowRight, Plus } from 'lucide-react';
import { customers, projects } from '@/lib/mock-data';

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery);
    return matchesSearch;
  });

  const getCustomerProjects = (customerId: string) => {
    return projects.filter((p) => p.customerId === customerId);
  };

  return (
    <>
      <Header
        title="Customers"
        subtitle={`${customers.length} registered customers`}
        showNewButton
        newButtonText="Add Customer"
        newButtonHref="/dashboard/customers/new"
      />

      <div className="flex-1 p-6 overflow-y-auto">
        {/* Search */}
        <div className="card p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search customers by name, email, or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>
        </div>

        {/* Customers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredCustomers.map((customer) => {
            const customerProjects = getCustomerProjects(customer.id);
            const activeProjects = customerProjects.filter(
              (p) => p.status === 'in_progress' || p.status === 'on_hold'
            );

            return (
              <Link
                key={customer.id}
                href={`/dashboard/customers/${customer.id}`}
                className="card p-5 hover:shadow-md transition-shadow group"
              >
                {/* Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-7 h-7 text-gray-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 group-hover:text-red-600 transition-colors">
                      {customer.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Customer since {new Date(customer.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="truncate">{customer.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span>{customer.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="truncate">{customer.address}</span>
                  </div>
                </div>

                {/* Projects Summary */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <FolderKanban className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {customerProjects.length} project{customerProjects.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  {activeProjects.length > 0 && (
                    <span className="badge bg-amber-100 text-amber-700">
                      {activeProjects.length} active
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredCustomers.length === 0 && (
          <div className="card p-12 text-center">
            <User className="w-16 h-16 text-gray-200 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">No customers found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search criteria</p>
            <Link href="/dashboard/customers/new" className="btn-primary inline-flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add New Customer
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
