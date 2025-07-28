import React, { useState } from 'react';
import { 
  Card,
  CardHeader,
  Title,
  Text,
  Button,
  Input,
  DatePicker,
  FlexBox,
  FlexBoxDirection,
  FlexBoxJustifyContent,
  FlexBoxAlignItems,
  AnalyticalTable,
  ObjectStatus,
  ValueState,
  Dialog,
  Bar,
  Panel,
  Form,
  FormGroup,
  FormItem,
  Label,
  MessageStrip,
  MessageStripDesign,
  ProgressIndicator,
  Icon
} from '@ui5/webcomponents-react';

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

  const flightColumns = [
    { Header: 'Flight', accessor: 'flightInfo', width: 200 },
    { Header: 'Route', accessor: 'route', width: 200 },
    { Header: 'Schedule', accessor: 'schedule', width: 200 },
    { Header: 'Aircraft', accessor: 'aircraft', width: 150 },
    { Header: 'Occupancy', accessor: 'occupancy', width: 200 },
    { Header: 'Actions', accessor: 'actions', width: 150 },
  ];

  const flightData = flights.map(flight => ({
    flightInfo: (
      <FlexBox direction={FlexBoxDirection.Column}>
        <Text className="font-semibold">{flight.flightNumber}</Text>
        <Text className="text-sm text-gray-600">{flight.airline}</Text>
      </FlexBox>
    ),
    route: (
      <FlexBox direction={FlexBoxDirection.Column}>
        <Text>{flight.departure.city} → {flight.arrival.city}</Text>
        <Text className="text-sm text-gray-600">{flight.departure.airport} - {flight.arrival.airport}</Text>
      </FlexBox>
    ),
    schedule: (
      <FlexBox direction={FlexBoxDirection.Column}>
        <Text>{flight.departure.time} - {flight.arrival.time}</Text>
        <Text className="text-sm text-gray-600">{flight.duration}</Text>
      </FlexBox>
    ),
    aircraft: flight.aircraft,
    occupancy: (
      <FlexBox direction={FlexBoxDirection.Column} className="gap-1">
        <Text className="text-sm">{flight.bookedSeats}/{flight.totalSeats} seats</Text>
          <ui5-badge color-scheme="8">{flight.availableSeats} Available</ui5-badge>
          <ui5-badge color-scheme="1">{flight.bookedSeats} Booked</ui5-badge>
          <ui5-badge color-scheme="3">{flight.holdSeats} Hold</ui5-badge>
      </FlexBox>
    ),
    actions: (
      <Button 
        design="Emphasized"
        icon="show"
        onClick={() => {
          setSelectedFlight(flight);
          setShowSeatMap(true);
        }}
      >
        View Seats
      </Button>
    ),
  }));

  const getSeatColor = (seat: Seat) => {
    switch (seat.status) {
      case 'Available': return 'bg-green-100 border-green-300 text-green-800 hover:bg-green-200';
      case 'Booked': return 'bg-red-100 border-red-300 text-red-800 hover:bg-red-200 cursor-pointer';
      case 'Hold': return 'bg-yellow-100 border-yellow-300 text-yellow-800 hover:bg-yellow-200';
      case 'Blocked': return 'bg-gray-100 border-gray-300 text-gray-800';
      default: return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  const getClassColor = (seatClass: string) => {
    switch (seatClass) {
      case 'First': return 'bg-purple-50 border-purple-200';
      case 'Business': return 'bg-blue-50 border-blue-200';
      case 'Economy': return 'bg-gray-50 border-gray-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const handleSeatClick = (seat: Seat) => {
    if (seat.status === 'Booked' && seat.passenger) {
      setSelectedSeat(seat);
      setShowPassengerDetails(true);
    }
  };

  return (
    <div className="h-full overflow-y-auto p-6 bg-gray-50">
      <FlexBox direction={FlexBoxDirection.Column} className="max-w-7xl mx-auto">
        {/* Header */}
        <FlexBox direction={FlexBoxDirection.Column} className="mb-8">
          <Title level="H1" className="text-3xl font-bold mb-2">Flight Booking Management</Title>
          <Text className="text-gray-600">Monitor seat availability and manage passenger bookings</Text>
        </FlexBox>

        {/* Search Form */}
        <Card className="mb-8">
          <CardHeader titleText="Search Flights" />
          <div className="p-6">
            <Form>
              <FormGroup titleText="Flight Search">
                <FlexBox direction={FlexBoxDirection.Row} className="gap-4" wrap="Wrap">
                  <FormItem labelContent={<Label>Flight Number</Label>}>
                    <Input
                      value={searchParams.flightNumber}
                      onInput={(e) => setSearchParams({ ...searchParams, flightNumber: e.target.value })}
                      placeholder="e.g., AA101"
                    />
                  </FormItem>
                  
                  <FormItem labelContent={<Label>Route</Label>}>
                    <Input
                      value={searchParams.route}
                      onInput={(e) => setSearchParams({ ...searchParams, route: e.target.value })}
                      placeholder="e.g., JFK-LAX"
                    />
                  </FormItem>
                  
                  <FormItem labelContent={<Label>Date</Label>}>
                    <DatePicker
                      value={searchParams.date}
                      onChange={(e) => setSearchParams({ ...searchParams, date: e.target.value })}
                    />
                  </FormItem>
                  
                  <FormItem>
                    <Button design="Emphasized" icon="search">Search Flights</Button>
                  </FormItem>
                </FlexBox>
              </FormGroup>
            </Form>
          </div>
        </Card>

        {/* Flight Results */}
        <Panel headerText="Flight Results" className="mb-6">
          <AnalyticalTable
            columns={flightColumns}
            data={flightData}
            visibleRows={10}
            noDataText="No flights found"
            className="w-full"
          />
        </Panel>

        {/* Seat Statistics */}
        <FlexBox direction={FlexBoxDirection.Row} className="gap-6 mb-6" wrap="Wrap">
          <Card className="flex-1 min-w-48">
            <CardHeader 
              titleText="Available Seats"
              subtitleText={flights.reduce((sum, f) => sum + f.availableSeats, 0).toString()}
              action={<Icon name="accept" className="text-green-600" />}
            />
          </Card>
          <Card className="flex-1 min-w-48">
            <CardHeader 
              titleText="Booked Seats"
              subtitleText={flights.reduce((sum, f) => sum + f.bookedSeats, 0).toString()}
              action={<Icon name="decline" className="text-red-600" />}
            />
          </Card>
          <Card className="flex-1 min-w-48">
            <CardHeader 
              titleText="On Hold"
              subtitleText={flights.reduce((sum, f) => sum + f.holdSeats, 0).toString()}
              action={<Icon name="pending" className="text-yellow-600" />}
            />
          </Card>
          <Card className="flex-1 min-w-48">
            <CardHeader 
              titleText="Total Capacity"
              subtitleText={flights.reduce((sum, f) => sum + f.totalSeats, 0).toString()}
              action={<Icon name="flight" className="text-blue-600" />}
            />
          </Card>
        </FlexBox>
      </FlexBox>

      {/* Seat Map Dialog */}
      <Dialog
        open={showSeatMap}
        headerText={`Seat Map - ${selectedFlight?.flightNumber}`}
        onAfterClose={() => setShowSeatMap(false)}
        className="w-full max-w-6xl"
        resizable
      >
        <div className="p-6">
          {selectedFlight && (
            <>
              <MessageStrip design={MessageStripDesign.Information} className="mb-4">
                {selectedFlight.departure.city} → {selectedFlight.arrival.city} | {selectedFlight.aircraft}
              </MessageStrip>

              {/* Legend */}
              <FlexBox justifyContent={FlexBoxJustifyContent.Center} className="mb-6 p-4 bg-gray-50 rounded-lg gap-6" wrap="Wrap">
                <FlexBox alignItems={FlexBoxAlignItems.Center} className="gap-2">
                  <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
                  <Text>Available</Text>
                </FlexBox>
                <FlexBox alignItems={FlexBoxAlignItems.Center} className="gap-2">
                  <div className="w-4 h-4 bg-red-100 border border-red-300 rounded"></div>
                  <Text>Booked</Text>
                </FlexBox>
                <FlexBox alignItems={FlexBoxAlignItems.Center} className="gap-2">
                  <div className="w-4 h-4 bg-yellow-100 border border-yellow-300 rounded"></div>
                  <Text>On Hold</Text>
                </FlexBox>
                <FlexBox alignItems={FlexBoxAlignItems.Center} className="gap-2">
                  <div className="w-4 h-4 bg-gray-100 border border-gray-300 rounded"></div>
                  <Text>Blocked</Text>
                </FlexBox>
              </FlexBox>

              {/* Seat Map */}
              <div className="max-w-2xl mx-auto">
                {['First', 'Business', 'Economy'].map((seatClass) => {
                  const classSeats = selectedFlight.seats.filter(seat => seat.class === seatClass);
                  const rows = [...new Set(classSeats.map(seat => seat.row))].sort((a, b) => a - b);
                  
                  if (rows.length === 0) return null;
                  
                  return (
                    <div key={seatClass} className={`mb-6 p-4 rounded-lg border-2 ${getClassColor(seatClass)}`}>
                      <Title level="H4" className="text-center mb-4">{seatClass} Class</Title>
                      <div className="space-y-2">
                        {rows.map(row => {
                          const rowSeats = classSeats.filter(seat => seat.row === row);
                          return (
                            <FlexBox key={row} alignItems={FlexBoxAlignItems.Center} justifyContent={FlexBoxJustifyContent.Center} className="gap-2">
                              <div className="w-8 text-center text-sm font-medium text-gray-600">
                                {row}
                              </div>
                              <FlexBox className="gap-1">
                                {rowSeats.slice(0, 3).map(seat => (
                                  <div
                                    key={seat.id}
                                    className={`w-8 h-8 border-2 rounded text-xs flex items-center justify-center font-medium transition-all ${getSeatColor(seat)}`}
                                    title={seat.passenger ? `${seat.passenger.fullName} - ${seat.passenger.email}` : `${seat.row}${seat.letter} - ${seat.status}`}
                                    onClick={() => handleSeatClick(seat)}
                                  >
                                    {seat.letter}
                                  </div>
                                ))}
                              </FlexBox>
                              <div className="w-8"></div> {/* Aisle */}
                              <FlexBox className="gap-1">
                                {rowSeats.slice(3, 6).map(seat => (
                                  <div
                                    key={seat.id}
                                    className={`w-8 h-8 border-2 rounded text-xs flex items-center justify-center font-medium transition-all ${getSeatColor(seat)}`}
                                    title={seat.passenger ? `${seat.passenger.fullName} - ${seat.passenger.email}` : `${seat.row}${seat.letter} - ${seat.status}`}
                                    onClick={() => handleSeatClick(seat)}
                                  >
                                    {seat.letter}
                                  </div>
                                ))}
                              </FlexBox>
                            </FlexBox>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
        <Bar
          endContent={
            <Button onClick={() => setShowSeatMap(false)}>Close</Button>
          }
        />
      </Dialog>

      {/* Passenger Details Dialog */}
      <Dialog
        open={showPassengerDetails}
        headerText={`Passenger Details - Seat ${selectedSeat?.row}${selectedSeat?.letter}`}
        onAfterClose={() => setShowPassengerDetails(false)}
        className="w-full max-w-2xl"
        resizable
      >
        <div className="p-6">
          {selectedSeat && selectedSeat.passenger && (
            <>
              <MessageStrip design={MessageStripDesign.Information} className="mb-4">
                {selectedFlight?.flightNumber} | {selectedSeat.class} Class
              </MessageStrip>

              <Form>
                <FormGroup titleText="Personal Information">
                  <FlexBox direction={FlexBoxDirection.Row} className="gap-6" wrap="Wrap">
                    <FormItem labelContent={<Label>Full Name</Label>}>
                      <Input value={selectedSeat.passenger.fullName} readonly />
                    </FormItem>
                    
                    <FormItem labelContent={<Label>Nationality</Label>}>
                      <Input value={selectedSeat.passenger.nationality} readonly />
                    </FormItem>
                    
                    <FormItem labelContent={<Label>Email Address</Label>}>
                      <Input value={selectedSeat.passenger.email} readonly />
                    </FormItem>
                    
                    <FormItem labelContent={<Label>Phone Number</Label>}>
                      <Input value={selectedSeat.passenger.phone} readonly />
                    </FormItem>
                  </FlexBox>
                </FormGroup>

                <FormGroup titleText="Travel Documents & Booking">
                  <FlexBox direction={FlexBoxDirection.Row} className="gap-6" wrap="Wrap">
                    <FormItem labelContent={<Label>Passport Number</Label>}>
                      <Input value={selectedSeat.passenger.passportNumber} readonly />
                    </FormItem>
                    
                    <FormItem labelContent={<Label>Identification Number</Label>}>
                      <Input value={selectedSeat.passenger.identificationNumber} readonly />
                    </FormItem>
                    
                    <FormItem labelContent={<Label>Booking Reference</Label>}>
                      <Input value={selectedSeat.passenger.bookingReference} readonly />
                    </FormItem>
                    
                    <FormItem labelContent={<Label>Booking Date</Label>}>
                      <Input value={new Date(selectedSeat.passenger.bookingDate).toLocaleDateString()} readonly />
                    </FormItem>
                  </FlexBox>
                </FormGroup>

                <FormGroup titleText="Seat Information">
                  <FlexBox direction={FlexBoxDirection.Row} className="gap-6" wrap="Wrap">
                    <FormItem labelContent={<Label>Seat</Label>}>
                      <Input value={`${selectedSeat.row}${selectedSeat.letter}`} readonly />
                    </FormItem>
                    
                    <FormItem labelContent={<Label>Class</Label>}>
                      <Input value={selectedSeat.class} readonly />
                    </FormItem>
                    
                    <FormItem labelContent={<Label>Status</Label>}>
                      <ObjectStatus state={ValueState.Success}>{selectedSeat.status}</ObjectStatus>
                    </FormItem>
                  </FlexBox>
                </FormGroup>
              </Form>
            </>
          )}
        </div>
        <Bar
          endContent={
            <FlexBox className="gap-3">
              <Button onClick={() => setShowPassengerDetails(false)}>Close</Button>
              <Button design="Emphasized">Edit Booking</Button>
            </FlexBox>
          }
        />
      </Dialog>
    </div>
  );
};