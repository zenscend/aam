// Mock data for All American Muscle Workshop Management System Prototype

export type ProjectStatus = 'quote' | 'approved' | 'in_progress' | 'on_hold' | 'suspended' | 'complete';
export type ProjectType = 'new_build' | 'customization' | 'repair';
export type TaskStatus = 'pending' | 'in_progress' | 'blocked' | 'complete';
export type PartStatus = 'quoted' | 'ordered' | 'in_transit' | 'received' | 'installed';
export type Department = 'body' | 'wiring' | 'interior' | 'engineering' | 'paint';

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  projectCount: number;
  createdAt: string;
}

export interface Vehicle {
  id: string;
  customerId: string;
  year: number;
  make: string;
  model: string;
  vin: string;
  color: string;
  condition: string;
  imageUrl: string;
}

export interface Phase {
  id: string;
  name: string;
  order: number;
  status: TaskStatus;
  progress: number;
  tasks: Task[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  department: Department;
  assignee: string;
  status: TaskStatus;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  estimatedHours: number;
  actualHours: number;
  dueDate: string;
  blockedBy?: string;
}

export interface Part {
  id: string;
  name: string;
  description: string;
  supplier: string;
  status: PartStatus;
  orderDate: string;
  eta: string;
  cost: number;
  cageNumber: string;
  trackingNumber?: string;
}

export interface Project {
  id: string;
  name: string;
  customerId: string;
  customerName: string;
  vehicleId: string;
  vehicle: Vehicle;
  type: ProjectType;
  status: ProjectStatus;
  startDate: string;
  targetDate: string;
  progress: number;
  phases: Phase[];
  parts: Part[];
  notes: string[];
  cageNumbers: string[];
  budget: number;
  spent: number;
}

export interface Cage {
  id: string;
  number: string;
  projectId: string;
  projectName: string;
  location: string;
  partsCount: number;
  status: 'active' | 'empty' | 'pending_pickup';
}

export interface TeamMember {
  id: string;
  name: string;
  role: 'admin' | 'manager' | 'technician';
  department: Department;
  email: string;
  phone: string;
  avatar: string;
  activeProjects: number;
}

// Sample Customers
export const customers: Customer[] = [
  {
    id: 'cust-001',
    name: 'John Mitchell',
    email: 'john.mitchell@email.com',
    phone: '+1 (555) 123-4567',
    address: '1234 Oak Street, Dallas, TX 75201',
    projectCount: 2,
    createdAt: '2023-06-15',
  },
  {
    id: 'cust-002',
    name: 'Robert Thompson',
    email: 'r.thompson@email.com',
    phone: '+1 (555) 234-5678',
    address: '567 Pine Avenue, Houston, TX 77001',
    projectCount: 1,
    createdAt: '2023-09-20',
  },
  {
    id: 'cust-003',
    name: 'David Martinez',
    email: 'david.m@email.com',
    phone: '+1 (555) 345-6789',
    address: '890 Cedar Lane, Austin, TX 78701',
    projectCount: 3,
    createdAt: '2022-11-10',
  },
  {
    id: 'cust-004',
    name: 'Michael Chen',
    email: 'mchen@email.com',
    phone: '+1 (555) 456-7890',
    address: '234 Maple Drive, San Antonio, TX 78201',
    projectCount: 1,
    createdAt: '2024-01-05',
  },
  {
    id: 'cust-005',
    name: 'William Anderson',
    email: 'w.anderson@email.com',
    phone: '+1 (555) 567-8901',
    address: '678 Birch Road, Fort Worth, TX 76101',
    projectCount: 2,
    createdAt: '2023-03-22',
  },
];

// Sample Vehicles
export const vehicles: Vehicle[] = [
  {
    id: 'veh-001',
    customerId: 'cust-001',
    year: 1969,
    make: 'Ford',
    model: 'Mustang Boss 429',
    vin: '9F02Z123456',
    color: 'Candy Apple Red',
    condition: 'Partial restoration needed',
    imageUrl: '/images/mustang-69.jpg',
  },
  {
    id: 'veh-002',
    customerId: 'cust-002',
    year: 1970,
    make: 'Chevrolet',
    model: 'Chevelle SS 454',
    vin: '136370K123456',
    color: 'Cranberry Red',
    condition: 'Frame-off restoration',
    imageUrl: '/images/chevelle-70.jpg',
  },
  {
    id: 'veh-003',
    customerId: 'cust-003',
    year: 1967,
    make: 'Chevrolet',
    model: 'Camaro RS/SS',
    vin: '124377N123456',
    color: 'Marina Blue',
    condition: 'Custom build',
    imageUrl: '/images/camaro-67.jpg',
  },
  {
    id: 'veh-004',
    customerId: 'cust-004',
    year: 1971,
    make: 'Plymouth',
    model: 'Barracuda 440',
    vin: 'BS23H1B123456',
    color: 'Plum Crazy Purple',
    condition: 'Engine rebuild required',
    imageUrl: '/images/barracuda-71.jpg',
  },
  {
    id: 'veh-005',
    customerId: 'cust-005',
    year: 1968,
    make: 'Dodge',
    model: 'Charger R/T',
    vin: 'XS29L8B123456',
    color: 'Black',
    condition: 'Full restoration',
    imageUrl: '/images/charger-68.jpg',
  },
];

// Sample Projects
export const projects: Project[] = [
  {
    id: 'proj-001',
    name: '1969 Mustang Boss 429 Restoration',
    customerId: 'cust-001',
    customerName: 'John Mitchell',
    vehicleId: 'veh-001',
    vehicle: vehicles[0],
    type: 'new_build',
    status: 'in_progress',
    startDate: '2024-02-15',
    targetDate: '2025-06-30',
    progress: 45,
    cageNumbers: ['C-012', 'C-013'],
    budget: 2250000,
    spent: 1057500,
    phases: [
      {
        id: 'phase-001-1',
        name: 'Disassembly & Assessment',
        order: 1,
        status: 'complete',
        progress: 100,
        tasks: [
          { id: 't-001', title: 'Complete vehicle disassembly', description: 'Remove all components and catalog', department: 'body', assignee: 'Oom Andre', status: 'complete', priority: 'high', estimatedHours: 40, actualHours: 38, dueDate: '2024-03-01' },
          { id: 't-002', title: 'Document existing condition', description: 'Photo documentation of all areas', department: 'body', assignee: 'Joka', status: 'complete', priority: 'medium', estimatedHours: 8, actualHours: 10, dueDate: '2024-03-05' },
        ],
      },
      {
        id: 'phase-001-2',
        name: 'Body & Frame',
        order: 2,
        status: 'in_progress',
        progress: 65,
        tasks: [
          { id: 't-003', title: 'Media blast frame', description: 'Strip frame to bare metal', department: 'body', assignee: 'Oom Andre', status: 'complete', priority: 'high', estimatedHours: 16, actualHours: 18, dueDate: '2024-04-01' },
          { id: 't-004', title: 'Frame powder coating', description: 'Apply satin black powder coat', department: 'body', assignee: 'Pieter Kruger', status: 'complete', priority: 'high', estimatedHours: 8, actualHours: 8, dueDate: '2024-04-15' },
          { id: 't-005', title: 'Floor pan replacement', description: 'Install new AMD floor pans', department: 'body', assignee: 'Oom Andre', status: 'in_progress', priority: 'high', estimatedHours: 24, actualHours: 12, dueDate: '2024-05-01' },
          { id: 't-006', title: 'Quarter panel fitment', description: 'Test fit and align quarter panels', department: 'body', assignee: 'Oom Andre', status: 'pending', priority: 'medium', estimatedHours: 16, actualHours: 0, dueDate: '2024-05-15' },
        ],
      },
      {
        id: 'phase-001-3',
        name: 'Paint & Body Finish',
        order: 3,
        status: 'pending',
        progress: 0,
        tasks: [
          { id: 't-007', title: 'Body prep and primer', description: 'Block sand and apply epoxy primer', department: 'paint', assignee: 'Willem van der Berg', status: 'pending', priority: 'high', estimatedHours: 40, actualHours: 0, dueDate: '2024-06-15' },
          { id: 't-008', title: 'Base coat application', description: 'Apply Candy Apple Red base', department: 'paint', assignee: 'Willem van der Berg', status: 'pending', priority: 'high', estimatedHours: 24, actualHours: 0, dueDate: '2024-07-01' },
        ],
      },
      {
        id: 'phase-001-4',
        name: 'Engine & Drivetrain',
        order: 4,
        status: 'pending',
        progress: 0,
        tasks: [],
      },
      {
        id: 'phase-001-5',
        name: 'Interior & Electrical',
        order: 5,
        status: 'pending',
        progress: 0,
        tasks: [],
      },
      {
        id: 'phase-001-6',
        name: 'Final Assembly',
        order: 6,
        status: 'pending',
        progress: 0,
        tasks: [],
      },
    ],
    parts: [
      { id: 'part-001', name: 'AMD Floor Pan - Driver', description: 'Full replacement floor pan', supplier: 'AMD Industries', status: 'received', orderDate: '2024-03-10', eta: '2024-03-25', cost: 8100, cageNumber: 'C-012' },
      { id: 'part-002', name: 'AMD Floor Pan - Passenger', description: 'Full replacement floor pan', supplier: 'AMD Industries', status: 'received', orderDate: '2024-03-10', eta: '2024-03-25', cost: 8100, cageNumber: 'C-012' },
      { id: 'part-003', name: 'Quarter Panel - LH', description: 'Full outer quarter panel', supplier: 'Dynacorn', status: 'in_transit', orderDate: '2024-04-20', eta: '2024-05-10', cost: 16110, cageNumber: 'C-013', trackingNumber: 'DYN-78543' },
      { id: 'part-004', name: 'Quarter Panel - RH', description: 'Full outer quarter panel', supplier: 'Dynacorn', status: 'in_transit', orderDate: '2024-04-20', eta: '2024-05-10', cost: 16110, cageNumber: 'C-013', trackingNumber: 'DYN-78544' },
      { id: 'part-005', name: 'Boss 429 Engine Block', description: 'Date-coded correct block', supplier: 'Private Seller', status: 'ordered', orderDate: '2024-04-25', eta: '2024-06-15', cost: 630000, cageNumber: 'C-012' },
    ],
    notes: [
      'Customer wants numbers-matching restoration where possible',
      'Original engine block sourced from Arizona - in transit',
      'Paint code confirmed: Candy Apple Red (T)',
    ],
  },
  {
    id: 'proj-002',
    name: '1970 Chevelle SS 454 Frame-Off',
    customerId: 'cust-002',
    customerName: 'Robert Thompson',
    vehicleId: 'veh-002',
    vehicle: vehicles[1],
    type: 'new_build',
    status: 'in_progress',
    startDate: '2024-01-10',
    targetDate: '2025-03-30',
    progress: 62,
    cageNumbers: ['C-008', 'C-009', 'C-010'],
    budget: 1710000,
    spent: 1107000,
    phases: [
      { id: 'phase-002-1', name: 'Disassembly & Assessment', order: 1, status: 'complete', progress: 100, tasks: [] },
      { id: 'phase-002-2', name: 'Body & Frame', order: 2, status: 'complete', progress: 100, tasks: [] },
      { id: 'phase-002-3', name: 'Paint & Body Finish', order: 3, status: 'in_progress', progress: 75, tasks: [] },
      { id: 'phase-002-4', name: 'Engine & Drivetrain', order: 4, status: 'in_progress', progress: 40, tasks: [] },
      { id: 'phase-002-5', name: 'Interior & Electrical', order: 5, status: 'pending', progress: 0, tasks: [] },
      { id: 'phase-002-6', name: 'Final Assembly', order: 6, status: 'pending', progress: 0, tasks: [] },
    ],
    parts: [],
    notes: ['LS6 454 engine rebuild in progress at machine shop'],
  },
  {
    id: 'proj-003',
    name: '1967 Camaro RS/SS Pro-Touring Build',
    customerId: 'cust-003',
    customerName: 'David Martinez',
    vehicleId: 'veh-003',
    vehicle: vehicles[2],
    type: 'customization',
    status: 'in_progress',
    startDate: '2023-08-20',
    targetDate: '2024-12-15',
    progress: 78,
    cageNumbers: ['C-001', 'C-002', 'C-003'],
    budget: 3240000,
    spent: 2556000,
    phases: [
      { id: 'phase-003-1', name: 'Disassembly & Assessment', order: 1, status: 'complete', progress: 100, tasks: [] },
      { id: 'phase-003-2', name: 'Chassis & Suspension', order: 2, status: 'complete', progress: 100, tasks: [] },
      { id: 'phase-003-3', name: 'Body & Paint', order: 3, status: 'complete', progress: 100, tasks: [] },
      { id: 'phase-003-4', name: 'LS3 Engine Install', order: 4, status: 'in_progress', progress: 85, tasks: [] },
      { id: 'phase-003-5', name: 'Interior & Electronics', order: 5, status: 'in_progress', progress: 45, tasks: [] },
      { id: 'phase-003-6', name: 'Final Assembly & Tuning', order: 6, status: 'pending', progress: 0, tasks: [] },
    ],
    parts: [],
    notes: ['Art Morrison chassis installed', 'Wilwood big brake kit fitted'],
  },
  {
    id: 'proj-004',
    name: '1971 Barracuda 440 Engine Rebuild',
    customerId: 'cust-004',
    customerName: 'Michael Chen',
    vehicleId: 'veh-004',
    vehicle: vehicles[3],
    type: 'repair',
    status: 'on_hold',
    startDate: '2024-03-01',
    targetDate: '2024-08-30',
    progress: 25,
    cageNumbers: ['C-015'],
    budget: 504000,
    spent: 153000,
    phases: [
      { id: 'phase-004-1', name: 'Diagnostic & Teardown', order: 1, status: 'complete', progress: 100, tasks: [] },
      { id: 'phase-004-2', name: 'Machine Work', order: 2, status: 'blocked', progress: 0, tasks: [] },
      { id: 'phase-004-3', name: 'Reassembly', order: 3, status: 'pending', progress: 0, tasks: [] },
      { id: 'phase-004-4', name: 'Installation & Tuning', order: 4, status: 'pending', progress: 0, tasks: [] },
    ],
    parts: [],
    notes: ['ON HOLD: Waiting for customer approval on machine work quote', 'Block requires boring .030 over'],
  },
  {
    id: 'proj-005',
    name: '1968 Charger R/T Full Restoration',
    customerId: 'cust-005',
    customerName: 'William Anderson',
    vehicleId: 'veh-005',
    vehicle: vehicles[4],
    type: 'new_build',
    status: 'in_progress',
    startDate: '2023-11-15',
    targetDate: '2025-08-30',
    progress: 35,
    cageNumbers: ['C-020', 'C-021', 'C-022'],
    budget: 2610000,
    spent: 936000,
    phases: [
      { id: 'phase-005-1', name: 'Disassembly & Assessment', order: 1, status: 'complete', progress: 100, tasks: [] },
      { id: 'phase-005-2', name: 'Body & Frame', order: 2, status: 'in_progress', progress: 55, tasks: [] },
      { id: 'phase-005-3', name: 'Paint & Body Finish', order: 3, status: 'pending', progress: 0, tasks: [] },
      { id: 'phase-005-4', name: 'Engine & Drivetrain', order: 4, status: 'pending', progress: 0, tasks: [] },
      { id: 'phase-005-5', name: 'Interior & Electrical', order: 5, status: 'pending', progress: 0, tasks: [] },
      { id: 'phase-005-6', name: 'Final Assembly', order: 6, status: 'pending', progress: 0, tasks: [] },
    ],
    parts: [],
    notes: ['Customer approved black exterior with white interior', '440 Magnum engine sourced'],
  },
  {
    id: 'proj-006',
    name: '1969 Mustang Mach 1 Assessment',
    customerId: 'cust-001',
    customerName: 'John Mitchell',
    vehicleId: 'veh-001',
    vehicle: vehicles[0],
    type: 'new_build',
    status: 'quote',
    startDate: '',
    targetDate: '',
    progress: 0,
    cageNumbers: [],
    budget: 0,
    spent: 0,
    phases: [],
    parts: [],
    notes: ['Initial assessment scheduled', 'Customer interested in restomod build'],
  },
];

// Sample Cages
export const cages: Cage[] = [
  { id: 'cage-001', number: 'C-001', projectId: 'proj-003', projectName: '1967 Camaro RS/SS', location: 'Row A, Bay 1', partsCount: 24, status: 'active' },
  { id: 'cage-002', number: 'C-002', projectId: 'proj-003', projectName: '1967 Camaro RS/SS', location: 'Row A, Bay 2', partsCount: 18, status: 'active' },
  { id: 'cage-003', number: 'C-003', projectId: 'proj-003', projectName: '1967 Camaro RS/SS', location: 'Row A, Bay 3', partsCount: 12, status: 'active' },
  { id: 'cage-008', number: 'C-008', projectId: 'proj-002', projectName: '1970 Chevelle SS 454', location: 'Row B, Bay 3', partsCount: 45, status: 'active' },
  { id: 'cage-009', number: 'C-009', projectId: 'proj-002', projectName: '1970 Chevelle SS 454', location: 'Row B, Bay 4', partsCount: 32, status: 'active' },
  { id: 'cage-010', number: 'C-010', projectId: 'proj-002', projectName: '1970 Chevelle SS 454', location: 'Row B, Bay 5', partsCount: 28, status: 'active' },
  { id: 'cage-012', number: 'C-012', projectId: 'proj-001', projectName: '1969 Mustang Boss 429', location: 'Row C, Bay 2', partsCount: 56, status: 'active' },
  { id: 'cage-013', number: 'C-013', projectId: 'proj-001', projectName: '1969 Mustang Boss 429', location: 'Row C, Bay 3', partsCount: 23, status: 'active' },
  { id: 'cage-015', number: 'C-015', projectId: 'proj-004', projectName: '1971 Barracuda 440', location: 'Row D, Bay 1', partsCount: 8, status: 'active' },
  { id: 'cage-020', number: 'C-020', projectId: 'proj-005', projectName: '1968 Charger R/T', location: 'Row E, Bay 1', partsCount: 67, status: 'active' },
  { id: 'cage-021', number: 'C-021', projectId: 'proj-005', projectName: '1968 Charger R/T', location: 'Row E, Bay 2', partsCount: 34, status: 'active' },
  { id: 'cage-022', number: 'C-022', projectId: 'proj-005', projectName: '1968 Charger R/T', location: 'Row E, Bay 3', partsCount: 19, status: 'active' },
  { id: 'cage-025', number: 'C-025', projectId: '', projectName: '', location: 'Row F, Bay 1', partsCount: 0, status: 'empty' },
  { id: 'cage-026', number: 'C-026', projectId: '', projectName: '', location: 'Row F, Bay 2', partsCount: 0, status: 'empty' },
];

// Sample Team Members
export const teamMembers: TeamMember[] = [
  { id: 'team-001', name: 'Drikus Botha', role: 'admin', department: 'body', email: 'drikus@allamericanmuscle.co.za', phone: '+27 82 555 0001', avatar: '/avatars/drikus.jpg', activeProjects: 0 },
  { id: 'team-002', name: 'Lynne-Mari Cloete', role: 'manager', department: 'body', email: 'lynne-mari@allamericanmuscle.co.za', phone: '+27 82 555 0002', avatar: '/avatars/lynne-mari.jpg', activeProjects: 12 },
  { id: 'team-003', name: 'Joka', role: 'manager', department: 'body', email: 'joka@allamericanmuscle.co.za', phone: '+27 82 555 0003', avatar: '/avatars/joka.jpg', activeProjects: 8 },
  { id: 'team-004', name: 'Oom Andre', role: 'technician', department: 'body', email: 'andre@allamericanmuscle.co.za', phone: '+27 82 555 0004', avatar: '/avatars/andre.jpg', activeProjects: 5 },
  { id: 'team-005', name: 'Willem van der Berg', role: 'technician', department: 'paint', email: 'willem@allamericanmuscle.co.za', phone: '+27 82 555 0005', avatar: '/avatars/willem.jpg', activeProjects: 4 },
  { id: 'team-006', name: 'Pieter Kruger', role: 'technician', department: 'engineering', email: 'pieter@allamericanmuscle.co.za', phone: '+27 82 555 0006', avatar: '/avatars/pieter.jpg', activeProjects: 3 },
  { id: 'team-007', name: 'Johan Pretorius', role: 'technician', department: 'wiring', email: 'johan@allamericanmuscle.co.za', phone: '+27 82 555 0007', avatar: '/avatars/johan.jpg', activeProjects: 3 },
];

// Dashboard Stats
export const dashboardStats = {
  totalProjects: 85,
  activeProjects: 42,
  completedThisMonth: 3,
  onHold: 8,
  partsInTransit: 127,
  overdueTaskCount: 12,
  totalCages: 156,
  activeCages: 134,
};

// Helper functions
export function getStatusColor(status: ProjectStatus | TaskStatus | PartStatus): string {
  const colors: Record<string, string> = {
    quote: 'bg-gray-100 text-gray-700',
    approved: 'bg-blue-100 text-blue-700',
    in_progress: 'bg-amber-100 text-amber-700',
    on_hold: 'bg-orange-100 text-orange-700',
    suspended: 'bg-red-100 text-red-700',
    complete: 'bg-green-100 text-green-700',
    pending: 'bg-gray-100 text-gray-700',
    blocked: 'bg-red-100 text-red-700',
    quoted: 'bg-gray-100 text-gray-700',
    ordered: 'bg-blue-100 text-blue-700',
    in_transit: 'bg-purple-100 text-purple-700',
    received: 'bg-green-100 text-green-700',
    installed: 'bg-emerald-100 text-emerald-700',
  };
  return colors[status] || 'bg-gray-100 text-gray-700';
}

export function getProjectTypeLabel(type: ProjectType): string {
  const labels: Record<ProjectType, string> = {
    new_build: 'New Build',
    customization: 'Customization',
    repair: 'Repair',
  };
  return labels[type];
}

export function getStatusLabel(status: ProjectStatus): string {
  const labels: Record<ProjectStatus, string> = {
    quote: 'Quote',
    approved: 'Approved',
    in_progress: 'In Progress',
    on_hold: 'On Hold',
    suspended: 'Suspended',
    complete: 'Complete',
  };
  return labels[status];
}

export function getDepartmentLabel(department: Department): string {
  const labels: Record<Department, string> = {
    body: 'Body Shop',
    wiring: 'Electrical',
    interior: 'Interior',
    engineering: 'Engineering',
    paint: 'Paint',
  };
  return labels[department];
}
