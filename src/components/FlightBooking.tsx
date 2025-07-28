import React, { useState } from 'react';
import { Search, MapPin, Calendar, Users, Eye, UserCheck, Clock, AlertCircle } from 'lucide-react';

interface Seat {
  id: string;
  row: number;
  letter: string;
  class: 'Economy' | 'Business' | 'First';
  status: 'Available' | 'Booked' | 'Hold' | 'Blocked';
  passenger?: {
    name: string;
    fullName: string;
    email: string;
    phone: string;
    nationality: string;
    passportNumber: string;
    identificationNumber: string;
    bookingReference: string;
    bookingDate: string;
  };
  holdExpiry?: string;
}

interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  departure: { city: string; time: string; airport: string };
  arrival: { city: string; time: string; airport: string };
  duration: string;
  aircraft: string;
  totalSeats: number;
  bookedSeats: number;
  holdSeats: number;
  availableSeats: number;
  seats: Seat[];
}

export const FlightBooking: React.FC = () => {
  const [searchParams, setSearchParams] = useState({
    flightNumber: '',
    route: '',
    date: '2024-02-15',
  });

  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [showSeatMap, setShowSeatMap] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);
  const [showPassengerDetails, setShowPassengerDetails] = useState(false);
  
  // Generate seat map for demonstration
  const generateSeats = (flightId: string): Seat[] => {
    const seats: Seat[] = [];
    const rows = 30;
    const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
    
    for (let row = 1; row <= rows; row++) {
      for (const letter of letters) {
        const seatClass = row <= 3 ? 'First' : row <= 8 ? 'Business' : 'Economy';
        let status: Seat['status'] = 'Available';
        let passenger;
        let holdExpiry;
        
        // Simulate some bookings and holds
        const random = Math.random();
        if (random < 0.4) {
          status = 'Booked';
          passenger = {
            name: `Passenger ${row}${letter}`,
            fullName: `John ${row} Smith ${letter}`,
            email: `passenger${row}${letter}@email.com`,
            phone: '+1-555-0123',
            nationality: ['American', 'British', 'Canadian', 'German', 'French'][Math.floor(Math.random() * 5)],
            passportNumber: `P${Math.random().toString().substr(2, 8)}`,
            identificationNumber: `ID${Math.random().toString().substr(2, 9)}`,
            bookingReference: `AA${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
            bookingDate: '2024-02-10',
          };
        } else if (random < 0.5) {
          status = 'Hold';
          holdExpiry = '2024-02-15T16:30:00';
        } else if (random < 0.52) {
          status = 'Blocked';
        }
        
        seats.push({
          id: `${flightId}-${row}${letter}`,
          row,
          letter,
          class: seatClass,
          status,
          passenger,
          holdExpiry,
        });
      }
    }
    return seats;
  };

  const flights: Flight[] = [
    {
      id: '1',
      airline: 'American Airlines',
      flightNumber: 'AA101',
      departure: { city: 'New York', time: '08:30', airport: 'JFK' },
      arrival: { city: 'Los Angeles', time: '12:15', airport: 'LAX' },
      duration: '5h 45m',
      aircraft: 'Boeing 737-800',
      totalSeats: 180,
      bookedSeats: 72,
      holdSeats: 8,
      availableSeats: 100,
      seats: generateSeats('1'),
    },
    {
      id: '2',
      airline: 'American Airlines',
      flightNumber: 'AA205',
      departure: { city: 'New York', time: '14:20', airport: 'JFK' },
      arrival: { city: 'Los Angeles', time: '18:05', airport: 'LAX' },
      duration: '5h 45m',
      aircraft: 'Airbus A320',
      totalSeats: 150,
      bookedSeats: 143,
      holdSeats: 2,
      availableSeats: 5,
      seats: generateSeats('2'),
    },
    {
      id: '3',
      airline: 'American Airlines',
      flightNumber: 'AA350',
      departure: { city: 'New York', time: '19:45', airport: 'JFK' },
      arrival: { city: 'Los Angeles', time: '23:30', airport: 'LAX' },
      duration: '5h 45m',
      aircraft: 'Boeing 777-300',
      totalSeats: 350,
      bookedSeats: 287,
      holdSeats: 18,
      availableSeats: 45,
      seats: generateSeats('3'),
    },
  ];

  const getSeatColor = (seat: Seat) => {
    switch (seat.status) {
      case 'Available': return 'bg-green-100 border-green-300 text-green-800';
      case 'Booked': return 'bg-red-100 border-red-300 text-red-800';
      case 'Hold': return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'Blocked': return 'bg-gray-100 border-gray-300 text-gray-800';
      default: return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  const getClassColor = (seatClass: string) => {
    switch (seatClass) {
      case 'First': return 'bg-purple-50';
      case 'Business': return 'bg-blue-50';
      case 'Economy': return 'bg-gray-50';
      default: return 'bg-gray-50';
    }
  };

  const handleSeatClick = (seat: Seat) => {
    if (seat.status === 'Booked' && seat.passenger) {
      setSelectedSeat(seat);
      setShowPassengerDetails(true);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto h-full overflow-y-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Flight Booking Management</h1>
        <p className="text-gray-600">Monitor seat availability and manage passenger bookings</p>
      </div>

      {/* Search Form */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Flight Number</label>
            <input
              type="text"
              value={searchParams.flightNumber}
              onChange={(e) => setSearchParams({ ...searchParams, flightNumber: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., AA101"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Route</label>
            <input
              type="text"
              value={searchParams.route}
              onChange={(e) => setSearchParams({ ...searchParams, route: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., JFK-LAX"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="date"
                value={searchParams.date}
                onChange={(e) => setSearchParams({ ...searchParams, date: e.target.value })}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          <div className="flex items-end">
            <button className="w-full bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
              <Search className="w-5 h-5" />
              <span>Search Flights</span>
            </button>
          </div>
        </div>
      </div>

      {/* Flight Results */}
      <div className="space-y-4">
        {flights.map((flight) => (
          <div key={flight.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-8">
                <div>
                  <p className="text-sm text-gray-600">{flight.airline}</p>
                  <p className="font-semibold text-gray-900 text-lg">{flight.flightNumber}</p>
                  <p className="text-sm text-gray-600">{flight.aircraft}</p>
                </div>
                
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <p className="text-xl font-bold text-gray-900">{flight.departure.time}</p>
                    <p className="text-sm text-gray-600">{flight.departure.city}</p>
                    <p className="text-xs text-gray-500">{flight.departure.airport}</p>
                  </div>
                  
                  <div className="flex-1 relative">
                    <div className="border-t-2 border-gray-300 w-24"></div>
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
                <button
                  onClick={() => {
                    setSelectedFlight(flight);
                    setShowSeatMap(true);
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <Eye className="w-4 h-4" />
                  <span>View Seat Map</span>
                </button>
              </div>
            </div>

            {/* Seat Statistics */}
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-600">Total Seats</p>
                    <p className="text-xl font-bold text-gray-900">{flight.totalSeats}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2">
                  <UserCheck className="w-5 h-5 text-red-600" />
                  <div>
                    <p className="text-sm text-red-600">Booked</p>
                    <p className="text-xl font-bold text-red-900">{flight.bookedSeats}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-yellow-600" />
                  <div>
                    <p className="text-sm text-yellow-600">On Hold</p>
                    <p className="text-xl font-bold text-yellow-900">{flight.holdSeats}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm text-green-600">Available</p>
                    <p className="text-xl font-bold text-green-900">{flight.availableSeats}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Occupancy Bar */}
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Seat Occupancy</span>
                <span className="text-sm text-gray-600">
                  {Math.round((flight.bookedSeats / flight.totalSeats) * 100)}% occupied
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="flex h-3 rounded-full overflow-hidden">
                  <div
                    className="bg-red-500"
                    style={{ width: `${(flight.bookedSeats / flight.totalSeats) * 100}%` }}
                  ></div>
                  <div
                    className="bg-yellow-500"
                    style={{ width: `${(flight.holdSeats / flight.totalSeats) * 100}%` }}
                  ></div>
                  <div
                    className="bg-green-500"
                    style={{ width: `${(flight.availableSeats / flight.totalSeats) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Seat Map Modal */}
      {showSeatMap && selectedFlight && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-6xl w-full max-h-screen overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Seat Map - {selectedFlight.flightNumber}
                  </h3>
                  <p className="text-gray-600">
                    {selectedFlight.departure.city} → {selectedFlight.arrival.city} | {selectedFlight.aircraft}
                  </p>
                </div>
                <button
                  onClick={() => setShowSeatMap(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Legend */}
              <div className="flex items-center justify-center space-x-6 mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
                  <span className="text-sm">Available</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-red-100 border border-red-300 rounded"></div>
                  <span className="text-sm">Booked</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-yellow-100 border border-yellow-300 rounded"></div>
                  <span className="text-sm">On Hold</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gray-100 border border-gray-300 rounded"></div>
                  <span className="text-sm">Blocked</span>
                </div>
              </div>

              {/* Seat Map */}
              <div className="max-w-2xl mx-auto">
                {/* Class Sections */}
                {['First', 'Business', 'Economy'].map((seatClass) => {
                  const classSeats = selectedFlight.seats.filter(seat => seat.class === seatClass);
                  const rows = [...new Set(classSeats.map(seat => seat.row))].sort((a, b) => a - b);
                  
                  if (rows.length === 0) return null;
                  
                  return (
                    <div key={seatClass} className={`mb-6 p-4 rounded-lg ${getClassColor(seatClass)}`}>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                        {seatClass} Class
                      </h4>
                      <div className="space-y-2">
                        {rows.map(row => {
                          const rowSeats = classSeats.filter(seat => seat.row === row);
                          return (
                            <div key={row} className="flex items-center justify-center space-x-2">
                              <div className="w-8 text-center text-sm font-medium text-gray-600">
                                {row}
                              </div>
                              <div className="flex space-x-1">
                                {rowSeats.slice(0, 3).map(seat => (
                                  <div
                                    key={seat.id}
                                    className={`w-8 h-8 border-2 rounded text-xs flex items-center justify-center font-medium cursor-pointer hover:shadow-md transition-shadow ${getSeatColor(seat)}`}
                                    title={seat.passenger ? `${seat.passenger.fullName} - ${seat.passenger.email}` : `${seat.row}${seat.letter} - ${seat.status}`}
                                    onClick={() => handleSeatClick(seat)}
                                  >
                                    {seat.letter}
                                  </div>
                                ))}
                              </div>
                              <div className="w-8"></div> {/* Aisle */}
                              <div className="flex space-x-1">
                                {rowSeats.slice(3, 6).map(seat => (
                                  <div
                                    key={seat.id}
                                    className={`w-8 h-8 border-2 rounded text-xs flex items-center justify-center font-medium cursor-pointer hover:shadow-md transition-shadow ${getSeatColor(seat)}`}
                                    title={seat.passenger ? `${seat.passenger.fullName} - ${seat.passenger.email}` : `${seat.row}${seat.letter} - ${seat.status}`}
                                    onClick={() => handleSeatClick(seat)}
                                  >
                                    {seat.letter}
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Passenger Details Modal */}
      {showPassengerDetails && selectedSeat && selectedSeat.passenger && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Passenger Details - Seat {selectedSeat.row}{selectedSeat.letter}
                  </h3>
                  <p className="text-gray-600">
                    {selectedFlight?.flightNumber} | {selectedSeat.class} Class
                  </p>
                </div>
                <button
                  onClick={() => setShowPassengerDetails(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                    Personal Information
                  </h4>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <p className="text-gray-900 bg-gray-50 p-2 rounded">{selectedSeat.passenger.fullName}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
                    <p className="text-gray-900 bg-gray-50 p-2 rounded">{selectedSeat.passenger.nationality}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <p className="text-gray-900 bg-gray-50 p-2 rounded">{selectedSeat.passenger.email}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <p className="text-gray-900 bg-gray-50 p-2 rounded">{selectedSeat.passenger.phone}</p>
                  </div>
                </div>

                {/* Travel Documents & Booking */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                    Travel Documents & Booking
                  </h4>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Passport Number</label>
                    <p className="text-gray-900 bg-gray-50 p-2 rounded font-mono">{selectedSeat.passenger.passportNumber}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Identification Number</label>
                    <p className="text-gray-900 bg-gray-50 p-2 rounded font-mono">{selectedSeat.passenger.identificationNumber}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Booking Reference</label>
                    <p className="text-gray-900 bg-gray-50 p-2 rounded font-mono">{selectedSeat.passenger.bookingReference}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Booking Date</label>
                    <p className="text-gray-900 bg-gray-50 p-2 rounded">
                      {new Date(selectedSeat.passenger.bookingDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Seat Information */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Seat Information</h4>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Seat:</span>
                    <span className="ml-2 text-gray-900">{selectedSeat.row}{selectedSeat.letter}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Class:</span>
                    <span className="ml-2 text-gray-900">{selectedSeat.class}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Status:</span>
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getSeatColor(selectedSeat)}`}>
                      {selectedSeat.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowPassengerDetails(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Edit Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};