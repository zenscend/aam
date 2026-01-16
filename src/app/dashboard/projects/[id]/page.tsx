'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import {
  ArrowLeft,
  Calendar,
  DollarSign,
  User,
  Car,
  Package,
  CheckCircle2,
  Clock,
  AlertCircle,
  MapPin,
  FileText,
  Edit,
  MoreVertical,
} from 'lucide-react';
import {
  projects,
  getStatusColor,
  getStatusLabel,
  getProjectTypeLabel,
  getDepartmentLabel,
} from '@/lib/mock-data';
import { clsx } from 'clsx';

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const project = projects.find((p) => p.id === id) || projects[0];

  const getTaskStatusIcon = (status: string) => {
    switch (status) {
      case 'complete':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'in_progress':
        return <Clock className="w-5 h-5 text-amber-500" />;
      case 'blocked':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <div className="w-5 h-5 rounded-full border-2 border-gray-300" />;
    }
  };

  return (
    <>
      <Header title={project.name} subtitle={project.customerName} />

      <div className="flex-1 p-6 overflow-y-auto">
        {/* Back Link */}
        <Link
          href="/dashboard/projects"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </Link>

        {/* Top Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="card p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Car className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Vehicle</p>
                <p className="font-medium">
                  {project.vehicle.year} {project.vehicle.make}
                </p>
              </div>
            </div>
          </div>
          <div className="card p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Calendar className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Target Date</p>
                <p className="font-medium">{project.targetDate || 'TBD'}</p>
              </div>
            </div>
          </div>
          <div className="card p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <DollarSign className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Budget</p>
                <p className="font-medium">R{project.budget.toLocaleString()}</p>
              </div>
            </div>
          </div>
          <div className="card p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Package className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Cages</p>
                <p className="font-medium">{project.cageNumbers.join(', ') || 'None assigned'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left Column - Phases & Tasks */}
          <div className="xl:col-span-2 space-y-6">
            {/* Progress Overview */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-lg">Project Progress</h2>
                <span className={`badge ${getStatusColor(project.status)}`}>
                  {getStatusLabel(project.status)}
                </span>
              </div>
              <div className="mb-2">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-500">Overall Progress</span>
                  <span className="font-semibold">{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-red-600 h-3 rounded-full transition-all"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
              <div className="flex items-center gap-4 mt-4 text-sm">
                <span className="text-gray-500">Type:</span>
                <span className="font-medium bg-gray-100 px-2 py-1 rounded">
                  {getProjectTypeLabel(project.type)}
                </span>
                <span className="text-gray-500">Started:</span>
                <span className="font-medium">{project.startDate}</span>
              </div>
            </div>

            {/* Phases */}
            <div className="card">
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <h2 className="font-semibold text-lg">Phases & Milestones</h2>
                <button className="btn-secondary text-sm">
                  <Edit className="w-4 h-4 mr-1" />
                  Edit Phases
                </button>
              </div>
              <div className="divide-y divide-gray-100">
                {project.phases.map((phase, index) => (
                  <div key={phase.id} className="p-4">
                    <div className="flex items-center gap-4 mb-3">
                      <div
                        className={clsx(
                          'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold',
                          phase.status === 'complete'
                            ? 'bg-green-100 text-green-700'
                            : phase.status === 'in_progress'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-gray-100 text-gray-500'
                        )}
                      >
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{phase.name}</h3>
                        <p className="text-sm text-gray-500">{phase.tasks.length} tasks</p>
                      </div>
                      <div className="text-right">
                        <span
                          className={clsx(
                            'badge',
                            phase.status === 'complete'
                              ? 'bg-green-100 text-green-700'
                              : phase.status === 'in_progress'
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-gray-100 text-gray-500'
                          )}
                        >
                          {phase.progress}%
                        </span>
                      </div>
                    </div>

                    {/* Tasks (expanded for in_progress phase) */}
                    {phase.status === 'in_progress' && phase.tasks.length > 0 && (
                      <div className="ml-12 mt-3 space-y-2">
                        {phase.tasks.map((task) => (
                          <div
                            key={task.id}
                            className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                          >
                            {getTaskStatusIcon(task.status)}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{task.title}</p>
                              <p className="text-xs text-gray-500">
                                {getDepartmentLabel(task.department)} • {task.assignee}
                              </p>
                            </div>
                            <span
                              className={clsx(
                                'badge text-xs',
                                task.priority === 'urgent'
                                  ? 'bg-red-100 text-red-700'
                                  : task.priority === 'high'
                                  ? 'bg-orange-100 text-orange-700'
                                  : 'bg-gray-100 text-gray-600'
                              )}
                            >
                              {task.priority}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Vehicle Details */}
            <div className="card">
              <div className="p-4 border-b border-gray-100">
                <h2 className="font-semibold text-lg">Vehicle Details</h2>
              </div>
              <div className="p-4">
                <div className="bg-gray-200 rounded-lg h-32 flex items-center justify-center mb-4">
                  <span className="text-4xl">🚗</span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Year/Make/Model</span>
                    <span className="text-sm font-medium">
                      {project.vehicle.year} {project.vehicle.make} {project.vehicle.model}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">VIN</span>
                    <span className="text-sm font-mono">{project.vehicle.vin}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Color</span>
                    <span className="text-sm font-medium">{project.vehicle.color}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Condition</span>
                    <span className="text-sm font-medium">{project.vehicle.condition}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Info */}
            <div className="card">
              <div className="p-4 border-b border-gray-100">
                <h2 className="font-semibold text-lg">Customer</h2>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-gray-400" />
                  </div>
                  <div>
                    <p className="font-medium">{project.customerName}</p>
                    <p className="text-sm text-gray-500">Project Owner</p>
                  </div>
                </div>
                <Link
                  href={`/dashboard/customers/${project.customerId}`}
                  className="w-full btn-secondary justify-center"
                >
                  View Customer Profile
                </Link>
              </div>
            </div>

            {/* Parts Summary */}
            <div className="card">
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <h2 className="font-semibold text-lg">Parts</h2>
                <span className="badge bg-gray-100 text-gray-700">{project.parts.length}</span>
              </div>
              {project.parts.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {project.parts.slice(0, 4).map((part) => (
                    <div key={part.id} className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{part.name}</p>
                          <p className="text-xs text-gray-500">{part.supplier}</p>
                        </div>
                        <span
                          className={clsx(
                            'badge text-xs',
                            part.status === 'received' || part.status === 'installed'
                              ? 'bg-green-100 text-green-700'
                              : part.status === 'in_transit'
                              ? 'bg-purple-100 text-purple-700'
                              : 'bg-gray-100 text-gray-600'
                          )}
                        >
                          {part.status.replace('_', ' ')}
                        </span>
                      </div>
                      {part.status === 'in_transit' && (
                        <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                          <MapPin className="w-3 h-3" />
                          <span>ETA: {part.eta}</span>
                        </div>
                      )}
                    </div>
                  ))}
                  {project.parts.length > 4 && (
                    <div className="p-4">
                      <Link
                        href={`/dashboard/parts?project=${project.id}`}
                        className="text-sm text-red-600 hover:text-red-700 font-medium"
                      >
                        View all {project.parts.length} parts →
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-8 text-center text-gray-500">
                  <Package className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                  <p className="text-sm">No parts tracked yet</p>
                </div>
              )}
            </div>

            {/* Notes */}
            <div className="card">
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <h2 className="font-semibold text-lg">Notes</h2>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <MoreVertical className="w-4 h-4 text-gray-400" />
                </button>
              </div>
              <div className="p-4 space-y-3">
                {project.notes.map((note, index) => (
                  <div key={index} className="flex gap-3 text-sm">
                    <FileText className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-600">{note}</p>
                  </div>
                ))}
                {project.notes.length === 0 && (
                  <p className="text-sm text-gray-400 text-center py-2">No notes yet</p>
                )}
                <button className="w-full btn-secondary text-sm mt-2">Add Note</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
