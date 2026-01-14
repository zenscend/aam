'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import {
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  User,
  Calendar,
  ArrowUpRight,
} from 'lucide-react';
import { projects, getDepartmentLabel, Department } from '@/lib/mock-data';
import { clsx } from 'clsx';
import Link from 'next/link';

// Flatten all tasks from all projects
const allTasks = projects.flatMap((project) =>
  project.phases.flatMap((phase) =>
    phase.tasks.map((task) => ({
      ...task,
      projectId: project.id,
      projectName: project.name,
      phaseName: phase.name,
    }))
  )
);

type DepartmentFilter = 'all' | Department;
type StatusFilter = 'all' | 'pending' | 'in_progress' | 'blocked' | 'complete';

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState<DepartmentFilter>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  const filteredTasks = allTasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.assignee.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = departmentFilter === 'all' || task.department === departmentFilter;
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const tasksByStatus = {
    pending: filteredTasks.filter((t) => t.status === 'pending'),
    in_progress: filteredTasks.filter((t) => t.status === 'in_progress'),
    blocked: filteredTasks.filter((t) => t.status === 'blocked'),
    complete: filteredTasks.filter((t) => t.status === 'complete'),
  };

  return (
    <>
      <Header
        title="Job Cards"
        subtitle={`${allTasks.length} tasks across all projects`}
        showNewButton
        newButtonText="New Job Card"
        newButtonHref="/dashboard/jobs/new"
      />

      <div className="flex-1 p-6 overflow-y-auto">
        {/* Filters */}
        <div className="card p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search tasks, projects, or assignees..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>

            {/* Department Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value as DepartmentFilter)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="all">All Departments</option>
                <option value="body">Body Shop</option>
                <option value="paint">Paint</option>
                <option value="wiring">Electrical</option>
                <option value="interior">Interior</option>
                <option value="engineering">Engineering</option>
              </select>
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="blocked">Blocked</option>
              <option value="complete">Complete</option>
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="card p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full border-2 border-gray-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{tasksByStatus.pending.length}</p>
                <p className="text-xs text-gray-500">Pending</p>
              </div>
            </div>
          </div>
          <div className="card p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{tasksByStatus.in_progress.length}</p>
                <p className="text-xs text-gray-500">In Progress</p>
              </div>
            </div>
          </div>
          <div className="card p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{tasksByStatus.blocked.length}</p>
                <p className="text-xs text-gray-500">Blocked</p>
              </div>
            </div>
          </div>
          <div className="card p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{tasksByStatus.complete.length}</p>
                <p className="text-xs text-gray-500">Complete</p>
              </div>
            </div>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Pending Column */}
          <div className="card">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-semibold text-gray-500">Pending</h3>
              <span className="badge bg-gray-100 text-gray-600">
                {tasksByStatus.pending.length}
              </span>
            </div>
            <div className="p-3 space-y-3 max-h-[600px] overflow-y-auto">
              {tasksByStatus.pending.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
              {tasksByStatus.pending.length === 0 && (
                <p className="text-sm text-gray-400 text-center py-8">No pending tasks</p>
              )}
            </div>
          </div>

          {/* In Progress Column */}
          <div className="card">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-semibold text-amber-600">In Progress</h3>
              <span className="badge bg-amber-100 text-amber-600">
                {tasksByStatus.in_progress.length}
              </span>
            </div>
            <div className="p-3 space-y-3 max-h-[600px] overflow-y-auto">
              {tasksByStatus.in_progress.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
              {tasksByStatus.in_progress.length === 0 && (
                <p className="text-sm text-gray-400 text-center py-8">No tasks in progress</p>
              )}
            </div>
          </div>

          {/* Blocked Column */}
          <div className="card">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-semibold text-red-600">Blocked</h3>
              <span className="badge bg-red-100 text-red-600">
                {tasksByStatus.blocked.length}
              </span>
            </div>
            <div className="p-3 space-y-3 max-h-[600px] overflow-y-auto">
              {tasksByStatus.blocked.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
              {tasksByStatus.blocked.length === 0 && (
                <p className="text-sm text-gray-400 text-center py-8">No blocked tasks</p>
              )}
            </div>
          </div>

          {/* Complete Column */}
          <div className="card">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-semibold text-green-600">Complete</h3>
              <span className="badge bg-green-100 text-green-600">
                {tasksByStatus.complete.length}
              </span>
            </div>
            <div className="p-3 space-y-3 max-h-[600px] overflow-y-auto">
              {tasksByStatus.complete.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
              {tasksByStatus.complete.length === 0 && (
                <p className="text-sm text-gray-400 text-center py-8">No completed tasks</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Task Card Component
function TaskCard({
  task,
}: {
  task: {
    id: string;
    title: string;
    description: string;
    department: Department;
    assignee: string;
    status: string;
    priority: string;
    dueDate: string;
    projectId: string;
    projectName: string;
    phaseName: string;
  };
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex items-start justify-between mb-2">
        <span
          className={clsx(
            'badge text-xs',
            task.priority === 'urgent'
              ? 'bg-red-100 text-red-700'
              : task.priority === 'high'
              ? 'bg-orange-100 text-orange-700'
              : task.priority === 'medium'
              ? 'bg-blue-100 text-blue-700'
              : 'bg-gray-100 text-gray-600'
          )}
        >
          {task.priority}
        </span>
        <span className="badge bg-gray-100 text-gray-600 text-xs">
          {getDepartmentLabel(task.department)}
        </span>
      </div>
      <h4 className="font-medium text-sm mb-1 line-clamp-2">{task.title}</h4>
      <Link
        href={`/dashboard/projects/${task.projectId}`}
        className="text-xs text-gray-500 hover:text-red-600 flex items-center gap-1 mb-3"
      >
        {task.projectName}
        <ArrowUpRight className="w-3 h-3" />
      </Link>
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <User className="w-3 h-3" />
          <span>{task.assignee}</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          <span>{task.dueDate}</span>
        </div>
      </div>
    </div>
  );
}
