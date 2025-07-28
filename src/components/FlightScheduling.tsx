import React, { useState } from 'react';
import { 
  Card,
  CardHeader,
  Title,
  Text,
  Button,
  Input,
  Select,
  Option,
  TimePicker,
  DatePicker,
  FlexBox,
  FlexBoxDirection,
  FlexBoxJustifyContent,
  FlexBoxAlignItems,
  AnalyticalTable,
  Badge,
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

  const getStatusState = (status: string): ValueState => {
    switch (status) {
      case 'Scheduled': return ValueState.Success;
      case 'Delayed': return ValueState.Error;
      case 'Cancelled': return ValueState.None;
      case 'Completed': return ValueState.Information;
      default: return ValueState.None;
    }
  };

  const flightColumns = [
    { Header: 'Flight', accessor: 'flightInfo', width: 200 },
    { Header: 'Aircraft', accessor: 'aircraft', width: 150 },
    { Header: 'Route', accessor: 'route', width: 150 },
    { Header: 'Schedule', accessor: 'schedule', width: 200 },
    { Header: 'Gate', accessor: 'gate', width: 100 },
    { Header: 'Passengers', accessor: 'passengers', width: 150 },
    { Header: 'Status', accessor: 'status', width: 120 },
    { Header: 'Actions', accessor: 'actions', width: 150 },
  ];

  const flightData = flights.map(flight => ({
    flightInfo: (
      <FlexBox direction={FlexBoxDirection.Column}>
        <Text className="font-semibold">{flight.flightNumber}</Text>
        <Icon name="flight" className="text-blue-600" />
      </FlexBox>
    ),
    aircraft: flight.aircraft,
    route: (
      <FlexBox alignItems={FlexBoxAlignItems.Center} className="gap-2">
        <Text className="font-medium">{flight.route.from}</Text>
        <Icon name="navigation-right-arrow" className="text-gray-400" />
        <Text className="font-medium">{flight.route.to}</Text>
      </FlexBox>
    ),
    schedule: (
      <FlexBox direction={FlexBoxDirection.Column}>
        <FlexBox alignItems={FlexBoxAlignItems.Center} className="gap-4">
          <FlexBox direction={FlexBoxDirection.Column} alignItems={FlexBoxAlignItems.Center}>
            <Text className="font-semibold">{flight.departure}</Text>
            <Text className="text-xs text-gray-500">Departure</Text>
          </FlexBox>
          <Icon name="time" className="text-gray-400" />
          <FlexBox direction={FlexBoxDirection.Column} alignItems={FlexBoxAlignItems.Center}>
            <Text className="font-semibold">{flight.arrival}</Text>
            <Text className="text-xs text-gray-500">Arrival</Text>
          </FlexBox>
        </FlexBox>
      </FlexBox>
    ),
    gate: <ui5-badge>{flight.gate}</ui5-badge>,
    passengers: (
      <FlexBox direction={FlexBoxDirection.Column} className="gap-1">
        <Text className="font-medium">{flight.passengers}/{flight.capacity}</Text>
        <ProgressIndicator 
          value={(flight.passengers / flight.capacity) * 100}
          valueState={flight.passengers / flight.capacity > 0.8 ? ValueState.Error : ValueState.Success}
        />
      </FlexBox>
    ),
    status: <ObjectStatus state={getStatusState(flight.status)}>{flight.status}</ObjectStatus>,
    actions: (
      <FlexBox className="gap-2">
        <Button icon="edit" design="Transparent" />
        <Button icon="delete" design="Transparent" />
      </FlexBox>
    ),
  }));

  return (
    <div className="h-full overflow-y-auto p-6 bg-gray-50">
      <FlexBox direction={FlexBoxDirection.Column} className="max-w-7xl mx-auto">
        {/* Header */}
        <FlexBox justifyContent={FlexBoxJustifyContent.SpaceBetween} alignItems={FlexBoxAlignItems.Center} className="mb-8">
          <FlexBox direction={FlexBoxDirection.Column}>
            <Title level="H1" className="text-3xl font-bold mb-2">Flight Scheduling</Title>
            <Text className="text-gray-600">Manage flight schedules and aircraft assignments</Text>
          </FlexBox>
          <Button
            design="Emphasized"
            icon="add"
            onClick={() => setShowAddModal(true)}
          >
            Schedule Flight
          </Button>
        </FlexBox>

        {/* Date Selector */}
        <Card className="mb-6">
          <CardHeader titleText="Schedule Overview" />
          <div className="p-6">
            <FlexBox alignItems={FlexBoxAlignItems.Center} className="gap-4">
              <Label>Schedule Date:</Label>
              <DatePicker
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
              <FlexBox className="flex-1" justifyContent={FlexBoxJustifyContent.End}>
                <Text className="text-gray-600">
                  {flights.length} flights scheduled for {new Date(selectedDate).toLocaleDateString()}
                </Text>
              </FlexBox>
            </FlexBox>
          </div>
        </Card>

        {/* Flights Table */}
        <Panel headerText="Scheduled Flights">
          <AnalyticalTable
            columns={flightColumns}
            data={flightData}
            visibleRows={10}
            noDataText="No flights scheduled"
            className="w-full"
          />
        </Panel>
      </FlexBox>

      {/* Add Flight Dialog */}
      <Dialog
        open={showAddModal}
        headerText="Schedule New Flight"
        onAfterClose={() => setShowAddModal(false)}
        className="w-full max-w-2xl"
        resizable
      >
        <div className="p-6">
          <Form>
            <FormGroup titleText="Flight Information">
              <FlexBox direction={FlexBoxDirection.Row} className="gap-4" wrap="Wrap">
                <FormItem labelContent={<Label>Flight Number</Label>}>
                  <Input placeholder="e.g., AA501" />
                </FormItem>
                
                <FormItem labelContent={<Label>Aircraft</Label>}>
                  <Select>
                    <Option>Boeing 737-800</Option>
                    <Option>Airbus A320</Option>
                    <Option>Boeing 777-300</Option>
                    <Option>Airbus A330</Option>
                  </Select>
                </FormItem>
                
                <FormItem labelContent={<Label>From</Label>}>
                  <Input placeholder="Airport code (e.g., JFK)" />
                </FormItem>
                
                <FormItem labelContent={<Label>To</Label>}>
                  <Input placeholder="Airport code (e.g., LAX)" />
                </FormItem>
                
                <FormItem labelContent={<Label>Departure Time</Label>}>
                  <TimePicker />
                </FormItem>
                
                <FormItem labelContent={<Label>Arrival Time</Label>}>
                  <TimePicker />
                </FormItem>
                
                <FormItem labelContent={<Label>Gate</Label>}>
                  <Input placeholder="e.g., A12" />
                </FormItem>
                
                <FormItem labelContent={<Label>Date</Label>}>
                  <DatePicker />
                </FormItem>
              </FlexBox>
            </FormGroup>
          </Form>
        </div>
        <Bar
          endContent={
            <FlexBox className="gap-3">
              <Button onClick={() => setShowAddModal(false)}>Cancel</Button>
              <Button design="Emphasized">Schedule Flight</Button>
            </FlexBox>
          }
        />
      </Dialog>
    </div>
  );
};