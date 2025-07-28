import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { FlightBooking } from './components/FlightBooking';
import { FlightScheduling } from './components/FlightScheduling';
import { AircraftMaintenance } from './components/AircraftMaintenance';

export type ActivePage = 'dashboard' | 'booking' | 'scheduling' | 'maintenance';

function App() {
  const [activePage, setActivePage] = useState<ActivePage>('dashboard');

  const renderActivePage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />;
      case 'booking':
        return <FlightBooking />;
      case 'scheduling':
        return <FlightScheduling />;
      case 'maintenance':
        return <AircraftMaintenance />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <main className="flex-1 overflow-hidden">
        {renderActivePage()}
      </main>
    </div>
  );
}

export default App;