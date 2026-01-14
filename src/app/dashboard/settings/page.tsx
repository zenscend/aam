'use client';

import Header from '@/components/Header';
import { User, Bell, Shield, Palette, Database, Users } from 'lucide-react';
import { teamMembers, getDepartmentLabel } from '@/lib/mock-data';

export default function SettingsPage() {
  return (
    <>
      <Header title="Settings" subtitle="Manage your workspace settings" />

      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {/* Settings Navigation */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            <button className="card p-4 text-left hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mb-3">
                <User className="w-5 h-5 text-red-600" />
              </div>
              <h3 className="font-medium">Profile</h3>
              <p className="text-sm text-gray-500">Manage your account</p>
            </button>
            <button className="card p-4 text-left hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                <Bell className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-medium">Notifications</h3>
              <p className="text-sm text-gray-500">Configure alerts</p>
            </button>
            <button className="card p-4 text-left hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                <Shield className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-medium">Security</h3>
              <p className="text-sm text-gray-500">Password & access</p>
            </button>
            <button className="card p-4 text-left hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                <Palette className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="font-medium">Appearance</h3>
              <p className="text-sm text-gray-500">Theme & display</p>
            </button>
            <button className="card p-4 text-left hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mb-3">
                <Database className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="font-medium">Data & Export</h3>
              <p className="text-sm text-gray-500">Backup & reports</p>
            </button>
            <button className="card p-4 text-left hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                <Users className="w-5 h-5 text-gray-600" />
              </div>
              <h3 className="font-medium">Team</h3>
              <p className="text-sm text-gray-500">Manage users</p>
            </button>
          </div>

          {/* Team Members Section */}
          <div className="card">
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-semibold text-lg">Team Members</h2>
              <p className="text-sm text-gray-500">Manage your workshop staff</p>
            </div>
            <div className="divide-y divide-gray-100">
              {teamMembers.map((member) => (
                <div key={member.id} className="flex items-center gap-4 p-4 hover:bg-gray-50">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="font-medium text-gray-600">
                      {member.name.split(' ').map((n) => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-gray-500">{member.email}</p>
                  </div>
                  <div className="hidden sm:block text-right">
                    <p className="text-sm font-medium capitalize">{member.role}</p>
                    <p className="text-xs text-gray-500">{getDepartmentLabel(member.department)}</p>
                  </div>
                  <span
                    className={`badge ${
                      member.role === 'admin'
                        ? 'bg-red-100 text-red-700'
                        : member.role === 'manager'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {member.role}
                  </span>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-gray-100">
              <button className="btn-secondary w-full sm:w-auto">
                <Users className="w-4 h-4 mr-2" />
                Invite Team Member
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
