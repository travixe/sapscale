import React from 'react';
import { 
  Card, 
  CardHeader, 
  Title, 
  Text,
  FlexBox,
  FlexBoxDirection,
  FlexBoxJustifyContent,
  FlexBoxAlignItems,
  AnalyticalTable,
  ObjectStatus,
  ValueState,
  Icon,
  Panel,
  PanelAccessibleRole
} from '@ui5/webcomponents-react';

export const Dashboard: React.FC = () => {
  const stats = [
    { label: 'Active Flights', value: '127', icon: 'flight', trend: '+5.2%', trendState: ValueState.Success },
    { label: 'Passengers Today', value: '8,542', icon: 'group', trend: '+12.8%', trendState: ValueState.Success },
    { label: 'Maintenance Alerts', value: '3', icon: 'warning', trend: '-2', trendState: ValueState.Error },
    { label: 'Daily Revenue', value: '$2.4M', icon: 'money-bills', trend: '+8.1%', trendState: ValueState.Success },
  ];

  const flightColumns = [
    { Header: 'Flight', accessor: 'flight', width: 100 },
    { Header: 'Route', accessor: 'route', width: 150 },
    { Header: 'Status', accessor: 'status', width: 120 },
    { Header: 'Departure', accessor: 'departure', width: 100 },
    { Header: 'Gate', accessor: 'gate', width: 80 },
  ];

  const flightData = [
    { 
      flight: 'AA101', 
      route: 'NYC → LAX', 
      status: <ui5-badge color-scheme="8">On Time</ui5-badge>, 
      departure: '14:30', 
      gate: 'A12' 
    },
    { 
      flight: 'AA205', 
      route: 'LAX → CHI', 
      status: <ui5-badge color-scheme="1">Delayed</ui5-badge>, 
      departure: '16:45', 
      gate: 'B8' 
    },
    { 
      flight: 'AA350', 
      route: 'CHI → MIA', 
      status: <ui5-badge color-scheme="6">Boarding</ui5-badge>, 
      departure: '18:20', 
      gate: 'C15' 
    },
    { 
      flight: 'AA422', 
      route: 'MIA → NYC', 
      status: <ui5-badge color-scheme="8">On Time</ui5-badge>, 
      departure: '20:10', 
      gate: 'A5' 
    },
  ];

  const maintenanceColumns = [
    { Header: 'Aircraft', accessor: 'aircraft', width: 120 },
    { Header: 'Issue', accessor: 'issue', width: 200 },
    { Header: 'Priority', accessor: 'priority', width: 100 },
    { Header: 'Due', accessor: 'due', width: 100 },
  ];

  const maintenanceData = [
    { 
      aircraft: 'N123AA', 
      issue: 'Engine inspection due', 
      priority: <ObjectStatus state={ValueState.Error}>High</ObjectStatus>, 
      due: '2 days' 
    },
    { 
      aircraft: 'N456BB', 
      issue: 'Tire replacement needed', 
      priority: <ObjectStatus state={ValueState.Warning}>Medium</ObjectStatus>, 
      due: '5 days' 
    },
    { 
      aircraft: 'N789CC', 
      issue: 'Avionics update required', 
      priority: <ObjectStatus state={ValueState.Success}>Low</ObjectStatus>, 
      due: '1 week' 
    },
  ];

  return (
    <div className="h-full overflow-y-auto p-6 bg-gray-50">
      <FlexBox direction={FlexBoxDirection.Column} className="max-w-7xl mx-auto">
        {/* Header */}
        <FlexBox direction={FlexBoxDirection.Column} className="mb-8">
          <Title level="H1" className="text-3xl font-bold mb-2">Operations Dashboard</Title>
          <Text className="text-gray-600">Real-time overview of airline operations</Text>
        </FlexBox>

        {/* Stats Cards */}
        <FlexBox 
          direction={FlexBoxDirection.Row} 
          justifyContent={FlexBoxJustifyContent.SpaceBetween}
          className="mb-8 gap-6"
          wrap="Wrap"
        >
          {stats.map((stat, index) => (
            <Card key={index} className="flex-1 min-w-64">
              <CardHeader 
                titleText={stat.label}
                subtitleText={stat.value}
                action={
                  <FlexBox alignItems={FlexBoxAlignItems.Center} className="gap-2">
                    <Icon name={stat.icon} className="text-blue-600" />
                    <ObjectStatus state={stat.trendState}>{stat.trend}</ObjectStatus>
                  </FlexBox>
                }
              />
            </Card>
          ))}
        </FlexBox>

        <FlexBox direction={FlexBoxDirection.Row} className="gap-8" wrap="Wrap">
          {/* Active Flights */}
          <Panel 
            headerText="Active Flights" 
            className="flex-1 min-w-96"
            accessibleRole={PanelAccessibleRole.Region}
          >
            <AnalyticalTable
              columns={flightColumns}
              data={flightData}
              visibleRows={4}
              noDataText="No flights available"
              className="w-full"
            />
          </Panel>

          {/* Maintenance Alerts */}
          <Panel 
            headerText="Maintenance Alerts" 
            className="flex-1 min-w-96"
            accessibleRole={PanelAccessibleRole.Region}
          >
            <AnalyticalTable
              columns={maintenanceColumns}
              data={maintenanceData}
              visibleRows={4}
              noDataText="No maintenance alerts"
              className="w-full"
            />
          </Panel>
        </FlexBox>
      </FlexBox>
    </div>
  );
};