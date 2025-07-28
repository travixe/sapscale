import React from 'react';
import { 
  SideNavigation, 
  SideNavigationItem,
  SideNavigationSubItem,
  ShellBar,
  Avatar,
  FlexBox,
  FlexBoxDirection,
  FlexBoxAlignItems,
  Text,
  Title
} from '@ui5/webcomponents-react';
import { ActivePage } from '../App';

interface SidebarProps {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage }) => {
  return (
    <div className="w-64 bg-slate-900 text-white flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-slate-700">
        <FlexBox alignItems={FlexBoxAlignItems.Center} className="gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">✈</span>
          </div>
          <FlexBox direction={FlexBoxDirection.Column}>
            <Title level="H3" className="text-white text-xl font-bold">AirlineOps</Title>
            <Text className="text-slate-400 text-sm">Management System</Text>
          </FlexBox>
        </FlexBox>
      </div>
      
      {/* Navigation */}
      <div className="flex-1 p-4">
        <SideNavigation 
          className="w-full"
          onSelectionChange={(e) => {
            const selectedItem = e.detail.item;
            if (selectedItem?.dataset?.page) {
              setActivePage(selectedItem.dataset.page as ActivePage);
            }
          }}
        >
          <SideNavigationItem 
            text="Dashboard" 
            icon="business-objects-experience"
            data-page="dashboard"
            selected={activePage === 'dashboard'}
          />
          <SideNavigationItem 
            text="Flight Booking" 
            icon="flight"
            data-page="booking"
            selected={activePage === 'booking'}
          />
          <SideNavigationItem 
            text="Flight Scheduling" 
            icon="calendar"
            data-page="scheduling"
            selected={activePage === 'scheduling'}
          />
          <SideNavigationItem 
            text="Aircraft Maintenance" 
            icon="wrench"
            data-page="maintenance"
            selected={activePage === 'maintenance'}
          />
        </SideNavigation>
      </div>
      
      {/* User Info */}
      <div className="p-4 border-t border-slate-700">
        <FlexBox alignItems={FlexBoxAlignItems.Center} className="gap-3">
          <Avatar size="S" className="bg-blue-600">OM</Avatar>
          <FlexBox direction={FlexBoxDirection.Column}>
            <Text className="text-white text-sm font-semibold">Operations Manager</Text>
            <Text className="text-slate-400 text-xs">Logged in</Text>
          </FlexBox>
        </FlexBox>
      </div>
    </div>
  );
};