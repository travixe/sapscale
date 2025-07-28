import React, { useState } from 'react';
import { Plus, AlertTriangle, CheckCircle, Clock, Wrench, Calendar } from 'lucide-react';

interface MaintenanceRecord {
  id: string;
  aircraft: string;
  type: 'Routine' | 'Emergency' | 'Scheduled' | 'Inspection';
  description: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Pending' | 'In Progress' | 'Completed';
  assignedTo: string;
  scheduledDate: string;
  estimatedHours: number;
  completedDate?: string;
}

export const AircraftMaintenance: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('All');
  
  const maintenanceRecords: MaintenanceRecord[] = [
    {
      id: '1',
      aircraft: 'N123AA (Boeing 737-800)',
      type: 'Inspection',
      description: 'A-Check inspection - 500 flight hours',
      priority: 'High',
      status: 'Pending',
      assignedTo: 'Team Alpha',
      scheduledDate: '2024-02-16',
      estimatedHours: 12,
    },
    {
      id: '2',
      aircraft: 'N456BB (Airbus A320)',
      type: 'Routine',
      description: 'Tire replacement - Main landing gear',
      priority: 'Medium',
      status: 'In Progress',
      assignedTo: 'Team Beta',
      scheduledDate: '2024-02-15',
      estimatedHours: 4,
    },
    {
      id: '3',
      aircraft: 'N789CC (Boeing 777-300)',
      type: 'Emergency',
      description: 'Engine oil leak investigation',
      priority: 'Critical',
      status: 'In Progress',
      assignedTo: 'Team Gamma',
      scheduledDate: '2024-02-14',
      estimatedHours: 8,
    },
    {
      id: '4',
      aircraft: 'N321DD (Airbus A330)',
      type: 'Scheduled',
      description: 'Avionics software update',
      priority: 'Low',
      status: 'Completed',
      assignedTo: 'Team Delta',
      scheduledDate: '2024-02-13',
      estimatedHours: 3,
      completedDate: '2024-02-13',
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-500 text-white';
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pending': return <Clock className="w-4 h-4" />;
      case 'In Progress': return <Wrench className="w-4 h-4" />;
      case 'Completed': return <CheckCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const filteredRecords = filterStatus === 'All' 
    ? maintenanceRecords 
    : maintenanceRecords.filter(record => record.status === filterStatus);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Aircraft Maintenance</h1>
          <p className="text-gray-600">Track and manage aircraft maintenance schedules</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Maintenance</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Pending Tasks</p>
              <p className="text-2xl font-bold text-yellow-600">
                {maintenanceRecords.filter(r => r.status === 'Pending').length}
              </p>
            </div>
            <Clock className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">In Progress</p>
              <p className="text-2xl font-bold text-blue-600">
                {maintenanceRecords.filter(r => r.status === 'In Progress').length}
              </p>
            </div>
            <Wrench className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Completed</p>
              <p className="text-2xl font-bold text-green-600">
                {maintenanceRecords.filter(r => r.status === 'Completed').length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Critical Issues</p>
              <p className="text-2xl font-bold text-red-600">
                {maintenanceRecords.filter(r => r.priority === 'Critical').length}
              </p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-700">Filter by status:</span>
          {['All', 'Pending', 'In Progress', 'Completed'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                filterStatus === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Maintenance Records */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left p-4 font-medium text-gray-900">Aircraft</th>
                <th className="text-left p-4 font-medium text-gray-900">Type</th>
                <th className="text-left p-4 font-medium text-gray-900">Description</th>
                <th className="text-left p-4 font-medium text-gray-900">Priority</th>
                <th className="text-left p-4 font-medium text-gray-900">Status</th>
                <th className="text-left p-4 font-medium text-gray-900">Assigned To</th>
                <th className="text-left p-4 font-medium text-gray-900">Schedule</th>
                <th className="text-left p-4 font-medium text-gray-900">Est. Hours</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="p-4">
                    <p className="font-semibold text-gray-900">{record.aircraft.split(' ')[0]}</p>
                    <p className="text-sm text-gray-600">{record.aircraft.split(' ').slice(1).join(' ')}</p>
                  </td>
                  <td className="p-4">
                    <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
                      {record.type}
                    </span>
                  </td>
                  <td className="p-4">
                    <p className="text-gray-900">{record.description}</p>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(record.priority)}`}>
                      {record.priority}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(record.status)}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                        {record.status}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="text-gray-900">{record.assignedTo}</p>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {new Date(record.scheduledDate).toLocaleDateString()}
                      </span>
                    </div>
                    {record.completedDate && (
                      <div className="text-xs text-green-600 mt-1">
                        Completed: {new Date(record.completedDate).toLocaleDateString()}
                      </div>
                    )}
                  </td>
                  <td className="p-4">
                    <p className="text-gray-900">{record.estimatedHours}h</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Maintenance Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl max-w-2xl w-full mx-4 max-h-screen overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Schedule Maintenance</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Aircraft</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option>N123AA (Boeing 737-800)</option>
                  <option>N456BB (Airbus A320)</option>
                  <option>N789CC (Boeing 777-300)</option>
                  <option>N321DD (Airbus A330)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option>Routine</option>
                  <option>Scheduled</option>
                  <option>Inspection</option>
                  <option>Emergency</option>
                </select>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Describe the maintenance task..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                  <option>Critical</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Assigned Team</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option>Team Alpha</option>
                  <option>Team Beta</option>
                  <option>Team Gamma</option>
                  <option>Team Delta</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Scheduled Date</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Hours</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter estimated hours"
                />
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Schedule Maintenance
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};