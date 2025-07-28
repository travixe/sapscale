import React from 'react';
import { Plane, Users, AlertTriangle, DollarSign, TrendingUp, Clock } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const stats = [
    { label: 'Active Flights', value: '127', icon: Plane, color: 'bg-blue-500' },
    { label: 'Passengers Today', value: '8,542', icon: Users, color: 'bg-green-500' },
    { label: 'Maintenance Alerts', value: '3', icon: AlertTriangle, color: 'bg-red-500' },
    { label: 'Daily Revenue', value: '$2.4M', icon: DollarSign, color: 'bg-purple-500' },
  ];

  const recentFlights = [
    { flight: 'AA101', route: 'NYC → LAX', status: 'On Time', departure: '14:30', gate: 'A12' },
    { flight: 'AA205', route: 'LAX → CHI', status: 'Delayed', departure: '16:45', gate: 'B8' },
    { flight: 'AA350', route: 'CHI → MIA', status: 'Boarding', departure: '18:20', gate: 'C15' },
    { flight: 'AA422', route: 'MIA → NYC', status: 'On Time', departure: '20:10', gate: 'A5' },
  ];

  const maintenanceAlerts = [
    { aircraft: 'N123AA', issue: 'Engine inspection due', priority: 'High', due: '2 days' },
    { aircraft: 'N456BB', issue: 'Tire replacement needed', priority: 'Medium', due: '5 days' },
    { aircraft: 'N789CC', issue: 'Avionics update required', priority: 'Low', due: '1 week' },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto h-full overflow-y-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Operations Dashboard</h1>
        <p className="text-gray-600">Real-time overview of airline operations</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Flights */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Active Flights</h2>
            <TrendingUp className="w-5 h-5 text-blue-500" />
          </div>
          <div className="space-y-4">
            {recentFlights.map((flight, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="font-medium text-gray-900">{flight.flight}</span>
                  </div>
                  <span className="text-gray-600">{flight.route}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    flight.status === 'On Time' ? 'bg-green-100 text-green-800' :
                    flight.status === 'Delayed' ? 'bg-red-100 text-red-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {flight.status}
                  </span>
                  <span className="text-sm text-gray-600">Gate {flight.gate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Maintenance Alerts */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Maintenance Alerts</h2>
            <AlertTriangle className="w-5 h-5 text-red-500" />
          </div>
          <div className="space-y-4">
            {maintenanceAlerts.map((alert, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">{alert.aircraft}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    alert.priority === 'High' ? 'bg-red-100 text-red-800' :
                    alert.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {alert.priority}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-1">{alert.issue}</p>
                <p className="text-gray-500 text-xs">Due in {alert.due}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};