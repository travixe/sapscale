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
  TextArea,
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
  Icon,
  FilterBar,
  FilterGroupItem
} from '@ui5/webcomponents-react';

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

  const getPriorityState = (priority: string): ValueState => {
    switch (priority) {
      case 'Critical': return ValueState.Error;
      case 'High': return ValueState.Warning;
      case 'Medium': return ValueState.Information;
      case 'Low': return ValueState.Success;
      default: return ValueState.None;
    }
  };

  const getStatusState = (status: string): ValueState => {
    switch (status) {
      case 'Pending': return ValueState.Warning;
      case 'In Progress': return ValueState.Information;
      case 'Completed': return ValueState.Success;
      default: return ValueState.None;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pending': return 'pending';
      case 'In Progress': return 'in-progress';
      case 'Completed': return 'accept';
      default: return 'pending';
    }
  };

  const maintenanceColumns = [
    { Header: 'Aircraft', accessor: 'aircraft', width: 200 },
    { Header: 'Type', accessor: 'type', width: 120 },
    { Header: 'Description', accessor: 'description', width: 250 },
    { Header: 'Priority', accessor: 'priority', width: 120 },
    { Header: 'Status', accessor: 'status', width: 150 },
    { Header: 'Assigned To', accessor: 'assignedTo', width: 150 },
    { Header: 'Schedule', accessor: 'schedule', width: 150 },
    { Header: 'Est. Hours', accessor: 'estimatedHours', width: 100 },
  ];

  const filteredRecords = filterStatus === 'All' 
    ? maintenanceRecords 
    : maintenanceRecords.filter(record => record.status === filterStatus);

  const maintenanceData = filteredRecords.map(record => ({
    aircraft: (
      <FlexBox direction={FlexBoxDirection.Column}>
        <Text className="font-semibold">{record.aircraft.split(' ')[0]}</Text>
        <Text className="text-sm text-gray-600">{record.aircraft.split(' ').slice(1).join(' ')}</Text>
      </FlexBox>
    ),
    type: <ui5-badge color-scheme="6">{record.type}</ui5-badge>,
    description: record.description,
    priority: <ObjectStatus state={getPriorityState(record.priority)}>{record.priority}</ObjectStatus>,
    status: (
      <FlexBox alignItems={FlexBoxAlignItems.Center} className="gap-2">
        <Icon name={getStatusIcon(record.status)} />
        <ObjectStatus state={getStatusState(record.status)}>{record.status}</ObjectStatus>
      </FlexBox>
    ),
    assignedTo: record.assignedTo,
    schedule: (
      <FlexBox direction={FlexBoxDirection.Column}>
        <FlexBox alignItems={FlexBoxAlignItems.Center} className="gap-1">
          <Icon name="calendar" className="text-gray-400" />
          <Text className="text-sm">{new Date(record.scheduledDate).toLocaleDateString()}</Text>
        </FlexBox>
        {record.completedDate && (
          <Text className="text-xs text-green-600">
            Completed: {new Date(record.completedDate).toLocaleDateString()}
          </Text>
        )}
      </FlexBox>
    ),
    estimatedHours: `${record.estimatedHours}h`,
  }));

  return (
    <div className="h-full overflow-y-auto p-6 bg-gray-50">
      <FlexBox direction={FlexBoxDirection.Column} className="max-w-7xl mx-auto">
        {/* Header */}
        <FlexBox justifyContent={FlexBoxJustifyContent.SpaceBetween} alignItems={FlexBoxAlignItems.Center} className="mb-8">
          <FlexBox direction={FlexBoxDirection.Column}>
            <Title level="H1" className="text-3xl font-bold mb-2">Aircraft Maintenance</Title>
            <Text className="text-gray-600">Track and manage aircraft maintenance schedules</Text>
          </FlexBox>
          <Button
            design="Emphasized"
            icon="add"
            onClick={() => setShowAddModal(true)}
          >
            Add Maintenance
          </Button>
        </FlexBox>

        {/* Stats Cards */}
        <FlexBox direction={FlexBoxDirection.Row} className="gap-6 mb-8" wrap="Wrap">
          <Card className="flex-1 min-w-64">
            <CardHeader 
              titleText="Pending Tasks"
              subtitleText={maintenanceRecords.filter(r => r.status === 'Pending').length.toString()}
              action={<Icon name="pending" className="text-yellow-500" />}
            />
          </Card>
          
          <Card className="flex-1 min-w-64">
            <CardHeader 
              titleText="In Progress"
              subtitleText={maintenanceRecords.filter(r => r.status === 'In Progress').length.toString()}
              action={<Icon name="in-progress" className="text-blue-500" />}
            />
          </Card>
          
          <Card className="flex-1 min-w-64">
            <CardHeader 
              titleText="Completed"
              subtitleText={maintenanceRecords.filter(r => r.status === 'Completed').length.toString()}
              action={<Icon name="accept" className="text-green-500" />}
            />
          </Card>
          
          <Card className="flex-1 min-w-64">
            <CardHeader 
              titleText="Critical Issues"
              subtitleText={maintenanceRecords.filter(r => r.priority === 'Critical').length.toString()}
              action={<Icon name="warning" className="text-red-500" />}
            />
          </Card>
        </FlexBox>

        {/* Filter Bar */}
        <FilterBar className="mb-6">
          <FilterGroupItem label="Status">
            <Select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.detail.selectedOption.textContent)}
            >
              <Option>All</Option>
              <Option>Pending</Option>
              <Option>In Progress</Option>
              <Option>Completed</Option>
            </Select>
          </FilterGroupItem>
        </FilterBar>

        {/* Maintenance Records */}
        <Panel headerText="Maintenance Records">
          <AnalyticalTable
            columns={maintenanceColumns}
            data={maintenanceData}
            visibleRows={10}
            noDataText="No maintenance records found"
            className="w-full"
          />
        </Panel>
      </FlexBox>

      {/* Add Maintenance Dialog */}
      <Dialog
        open={showAddModal}
        headerText="Schedule Maintenance"
        onAfterClose={() => setShowAddModal(false)}
        className="w-full max-w-2xl"
        resizable
      >
        <div className="p-6">
          <Form>
            <FormGroup titleText="Maintenance Details">
              <FlexBox direction={FlexBoxDirection.Row} className="gap-4" wrap="Wrap">
                <FormItem labelContent={<Label>Aircraft</Label>}>
                  <Select>
                    <Option>N123AA (Boeing 737-800)</Option>
                    <Option>N456BB (Airbus A320)</Option>
                    <Option>N789CC (Boeing 777-300)</Option>
                    <Option>N321DD (Airbus A330)</Option>
                  </Select>
                </FormItem>
                
                <FormItem labelContent={<Label>Type</Label>}>
                  <Select>
                    <Option>Routine</Option>
                    <Option>Scheduled</Option>
                    <Option>Inspection</Option>
                    <Option>Emergency</Option>
                  </Select>
                </FormItem>
                
                <FormItem labelContent={<Label>Priority</Label>}>
                  <Select>
                    <Option>Low</Option>
                    <Option>Medium</Option>
                    <Option>High</Option>
                    <Option>Critical</Option>
                  </Select>
                </FormItem>
                
                <FormItem labelContent={<Label>Assigned Team</Label>}>
                  <Select>
                    <Option>Team Alpha</Option>
                    <Option>Team Beta</Option>
                    <Option>Team Gamma</Option>
                    <Option>Team Delta</Option>
                  </Select>
                </FormItem>
                
                <FormItem labelContent={<Label>Scheduled Date</Label>}>
                  <DatePicker />
                </FormItem>
                
                <FormItem labelContent={<Label>Estimated Hours</Label>}>
                  <Input type="Number" placeholder="Enter estimated hours" />
                </FormItem>
              </FlexBox>
              
              <FormItem labelContent={<Label>Description</Label>}>
                <TextArea
                  rows={3}
                  placeholder="Describe the maintenance task..."
                />
              </FormItem>
            </FormGroup>
          </Form>
        </div>
        <Bar
          endContent={
            <FlexBox className="gap-3">
              <Button onClick={() => setShowAddModal(false)}>Cancel</Button>
              <Button design="Emphasized">Schedule Maintenance</Button>
            </FlexBox>
          }
        />
      </Dialog>
    </div>
  );
};