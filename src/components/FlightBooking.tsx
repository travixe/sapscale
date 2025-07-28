import React, { useState } from 'react';
import { Search, MapPin, Calendar, Users, CreditCard } from 'lucide-react';

interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  departure: { city: string; time: string; airport: string };
  arrival: { city: string; time: string; airport: string };
  duration: string;
  price: number;
  seats: number;
}

export const FlightBooking: React.FC = () => {
  const [searchParams, setSearchParams] = useState({
    from: 'New York (JFK)',
    to: 'Los Angeles (LAX)',
    departure: '2024-02-15',
    passengers: 1,
  });

  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  
  const flights: Flight[] = [
    {
      id: '1',
      airline: 'American Airlines',
      flightNumber: 'AA101',
      departure: { city: 'New York', time: '08:30', airport: 'JFK' },
      arrival: { city: 'Los Angeles', time: '12:15', airport: 'LAX' },
      duration: '5h 45m',
      price: 459,
      seats: 23,
    },
    {
      id: '2',
      airline: 'American Airlines',
      flightNumber: 'AA205',
      departure: { city: 'New York', time: '14:20', airport: 'JFK' },
      arrival: { city: 'Los Angeles', time: '18:05', airport: 'LAX' },
      duration: '5h 45m',
      price: 389,
      seats: 7,
    },
    {
      id: '3',
      airline: 'American Airlines',
      flightNumber: 'AA350',
      departure: { city: 'New York', time: '19:45', airport: 'JFK' },
      arrival: { city: 'Los Angeles', time: '23:30', airport: 'LAX' },
      duration: '5h 45m',
      price: 329,
      seats: 45,
    },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto h-full overflow-y-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Flight Booking</h1>
        <p className="text-gray-600">Search and book flights for passengers</p>
      </div>

      {/* Search Form */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchParams.from}
                onChange={(e) => setSearchParams({ ...searchParams, from: e.target.value })}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchParams.to}
                onChange={(e) => setSearchParams({ ...searchParams, to: e.target.value })}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Departure</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="date"
                value={searchParams.departure}
                onChange={(e) => setSearchParams({ ...searchParams, departure: e.target.value })}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Passengers</label>
            <div className="relative">
              <Users className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <select
                value={searchParams.passengers}
                onChange={(e) => setSearchParams({ ...searchParams, passengers: parseInt(e.target.value) })}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {[1, 2, 3, 4, 5, 6].map(n => (
                  <option key={n} value={n}>{n} passenger{n > 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <Search className="w-5 h-5" />
          <span>Search Flights</span>
        </button>
      </div>

      {/* Flight Results */}
      <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
        {flights.map((flight) => (
          <div key={flight.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-8">
                <div>
                  <p className="text-sm text-gray-600">{flight.airline}</p>
                  <p className="font-semibold text-gray-900">{flight.flightNumber}</p>
                </div>
                
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <p className="text-xl font-bold text-gray-900">{flight.departure.time}</p>
                    <p className="text-sm text-gray-600">{flight.departure.city}</p>
                    <p className="text-xs text-gray-500">{flight.departure.airport}</p>
                  </div>
                  
                  <div className="flex-1 relative">
                    <div className="border-t-2 border-gray-300"></div>
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-white px-2">
                      <p className="text-xs text-gray-500">{flight.duration}</p>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-xl font-bold text-gray-900">{flight.arrival.time}</p>
                    <p className="text-sm text-gray-600">{flight.arrival.city}</p>
                    <p className="text-xs text-gray-500">{flight.arrival.airport}</p>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-600">${flight.price}</p>
                <p className="text-sm text-gray-600">{flight.seats} seats left</p>
                <button
                  onClick={() => setSelectedFlight(flight)}
                  className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  Select Flight
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {selectedFlight && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Complete Booking</h3>
            
            <div className="mb-6">
              <p className="font-semibold">{selectedFlight.flightNumber}</p>
              <p className="text-gray-600">
                {selectedFlight.departure.city} → {selectedFlight.arrival.city}
              </p>
              <p className="text-lg font-bold text-blue-600">${selectedFlight.price}</p>
            </div>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Passenger Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter email address"
                />
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setSelectedFlight(null)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                <CreditCard className="w-4 h-4" />
                <span>Book Flight</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};