'use client';

import Header from '@/components/Header';
import Link from 'next/link';
import {
  FolderKanban,
  Clock,
  AlertTriangle,
  Package,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Pause,
} from 'lucide-react';
import { projects, dashboardStats, getStatusColor, getStatusLabel } from '@/lib/mock-data';

// Stat Card Component
function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  color,
}: {
  title: string;
  value: number | string;
  icon: React.ElementType;
  trend?: string;
  color: string;
}) {
  return (
    <div className="card p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-3xl font-bold mt-1">{value}</p>
          {trend && (
            <p className="text-sm text-green-600 flex items-center gap-1 mt-2">
              <TrendingUp className="w-4 h-4" />
              {trend}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-xl ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
}

// Project Row Component
function ProjectRow({ project }: { project: typeof projects[0] }) {
  return (
    <Link
      href={`/dashboard/projects/${project.id}`}
      className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors rounded-lg"
    >
      <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
        <span className="text-lg">🚗</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-900 truncate">{project.name}</p>
        <p className="text-sm text-gray-500">{project.customerName}</p>
      </div>
      <div className="hidden sm:block">
        <div className="w-32 bg-gray-200 rounded-full h-2">
          <div
            className="bg-red-600 h-2 rounded-full transition-all"
            style={{ width: `${project.progress}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-1 text-right">{project.progress}%</p>
      </div>
      <span className={`badge ${getStatusColor(project.status)}`}>
        {getStatusLabel(project.status)}
      </span>
      <ArrowRight className="w-5 h-5 text-gray-400" />
    </Link>
  );
}

export default function DashboardPage() {
  const recentProjects = projects.slice(0, 5);

  return (
    <>
      <Header
        title="Dashboard"
        subtitle="Welcome back, Lynne-Mari"
        showNewButton
        newButtonText="New Project"
        newButtonHref="/dashboard/projects/new"
      />

      <div className="flex-1 p-6 overflow-y-auto">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Active Projects"
            value={dashboardStats.activeProjects}
            icon={FolderKanban}
            trend="+3 this month"
            color="bg-red-500"
          />
          <StatCard
            title="Completed This Month"
            value={dashboardStats.completedThisMonth}
            icon={CheckCircle2}
            color="bg-green-500"
          />
          <StatCard
            title="On Hold"
            value={dashboardStats.onHold}
            icon={Pause}
            color="bg-amber-500"
          />
          <StatCard
            title="Parts In Transit"
            value={dashboardStats.partsInTransit}
            icon={Package}
            color="bg-blue-500"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Recent Projects */}
          <div className="xl:col-span-2 card">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h2 className="font-semibold text-lg">Recent Projects</h2>
              <Link
                href="/dashboard/projects"
                className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
              >
                View all <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="divide-y divide-gray-100">
              {recentProjects.map((project) => (
                <ProjectRow key={project.id} project={project} />
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Alerts & Notifications */}
            <div className="card">
              <div className="p-4 border-b border-gray-100">
                <h2 className="font-semibold text-lg">Alerts</h2>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-red-800">12 Overdue Tasks</p>
                    <p className="text-xs text-red-600 mt-0.5">Across 4 projects</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg">
                  <Clock className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-amber-800">Parts Arriving Today</p>
                    <p className="text-xs text-amber-600 mt-0.5">3 shipments expected</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                  <Package className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-800">Low Stock Alert</p>
                    <p className="text-xs text-blue-600 mt-0.5">5 items need reorder</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="card">
              <div className="p-4 border-b border-gray-100">
                <h2 className="font-semibold text-lg">Workshop Overview</h2>
              </div>
              <div className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Projects</span>
                  <span className="font-semibold">{dashboardStats.totalProjects}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Active Cages</span>
                  <span className="font-semibold">{dashboardStats.activeCages} / {dashboardStats.totalCages}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Technicians Working</span>
                  <span className="font-semibold">5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">This Week&apos;s Revenue</span>
                  <span className="font-semibold text-green-600">R445,000</span>
                </div>
              </div>
            </div>

            {/* Project Status Breakdown */}
            <div className="card">
              <div className="p-4 border-b border-gray-100">
                <h2 className="font-semibold text-lg">Project Status</h2>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <span className="text-sm flex-1">In Progress</span>
                  <span className="font-semibold">42</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                  <span className="text-sm flex-1">Quote</span>
                  <span className="font-semibold">15</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  <span className="text-sm flex-1">On Hold</span>
                  <span className="font-semibold">8</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm flex-1">Completed</span>
                  <span className="font-semibold">20</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
