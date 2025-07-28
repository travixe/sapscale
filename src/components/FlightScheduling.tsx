import React, { useState } from 'react';
import { Plus, Clock, MapPin, Plane, Edit, Trash2 } from 'lucide-react';

interface ScheduledFlight {
  id: string;
  flightNumber: string;
  aircraft: string;
  route: { from: string; to: string };
  departure: string;
  arrival: string;
  status: 'Scheduled' | 'Delayed' | 'Cancelled' | 'Completed';
  gate: string;
  passengers: number;
  capacity: number;
}

export const FlightScheduling: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('2024-02-15');
  
  const flights: ScheduledFlight[] = [
    {
      id: '1',
      flightNumber: 'AA101',
      aircraft: 'Boeing 737-800',
      route: { from: 'JFK', to: 'LAX' },
      departure: '08:30',
      arrival: '12:15',
      status: 'Scheduled',
      gate: 'A12',
      passengers: 156,
      capacity: 180,
    },
    {
      id: '2',
      flightNumber: 'AA205',
      aircraft: 'Airbus A320',
      route: { from: 'LAX', to: 'ORD' },
      departure: '14:20',
      arrival: '20:05',
      status: 'Delayed',
      gate: 'B8',
      passengers: 142,
      capacity: 150,
    },
    {
      id: '3',
      flightNumber: 'AA350',
      aircraft: 'Boeing 777-300',
      route: { from: 'ORD', to: 'MIA' },
      departure: '16:45',
      arrival: '20:30',
      status: 'Scheduled',
      gate: 'C15',
      passengers: 287,
      capacity: 350,
    },
    {
      id: '4',
      flightNumber: 'AA422',
      aircraft: 'Boeing 737-800',
      route: { from: 'MIA', to: 'JFK' },
      departure: '22:10',
      arrival: '01:45',
      status: 'Scheduled',
      gate: 'A5',
      passengers: 164,
      capacity: 180,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Scheduled': return 'bg-green-100 text-green-800';
      case 'Delayed': return 'bg-red-100 text-red-800';
      case 'Cancelled': return 'bg-gray-100 text-gray-800';
      case 'Completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto h-full overflow-y-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Flight Scheduling</h1>
          <p className="text-gray-600">Manage flight schedules and aircraft assignments</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Schedule Flight</span>
        </button>
      </div>

      {/* Date Selector */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-gray-700">Schedule Date:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <div className="flex-1 text-right">
            <span className="text-sm text-gray-600">
              {flights.length} flights scheduled for {new Date(selectedDate).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      {/* Flights Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left p-4 font-medium text-gray-900">Flight</th>
                <th className="text-left p-4 font-medium text-gray-900">Aircraft</th>
                <th className="text-left p-4 font-medium text-gray-900">Route</th>
                <th className="text-left p-4 font-medium text-gray-900">Schedule</th>
                <th className="text-left p-4 font-medium text-gray-900">Gate</th>
                <th className="text-left p-4 font-medium text-gray-900">Passengers</th>
                <th className="text-left p-4 font-medium text-gray-900">Status</th>
                <th className="text-left p-4 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {flights.map((flight) => (
                <tr key={flight.id} className="hover:bg-gray-50">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <Plane className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{flight.flightNumber}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="text-gray-900">{flight.aircraft}</p>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{flight.route.from}</span>
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">{flight.route.to}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <p className="font-semibold text-gray-900">{flight.departure}</p>
                        <p className="text-xs text-gray-500">Departure</p>
                      </div>
                      <Clock className="w-4 h-4 text-gray-400" />
                      <div className="text-center">
                        <p className="font-semibold text-gray-900">{flight.arrival}</p>
                        <p className="text-xs text-gray-500">Arrival</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="font-medium text-gray-900">{flight.gate}</span>
                  </td>
                  <td className="p-4">
                    <div>
                      <p className="font-medium text-gray-900">{flight.passengers}/{flight.capacity}</p>
                      <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${(flight.passengers / flight.capacity) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(flight.status)}`}>
                      {flight.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Flight Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl max-w-2xl w-full mx-4 max-h-screen overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Schedule New Flight</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Flight Number</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., AA501"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Aircraft</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option>Boeing 737-800</option>
                  <option>Airbus A320</option>
                  <option>Boeing 777-300</option>
                  <option>Airbus A330</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Airport code (e.g., JFK)"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Airport code (e.g., LAX)"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Departure Time</label>
                <input
                  type="time"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Arrival Time</label>
                <input
                  type="time"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gate</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., A12"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
                Schedule Flight
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};