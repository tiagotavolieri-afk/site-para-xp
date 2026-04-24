import React from 'react';
import './styles/globals.css';
import { Header } from './components/layout/Header';
import { SectorScreen } from './components/screens/SectorScreen';
import { CompaniesScreen } from './components/screens/CompaniesScreen';
import { DashboardScreen } from './components/screens/DashboardScreen';
import { useNavigation, SCREENS } from './hooks/useNavigation';

export default function App() {
  const nav = useNavigation();

  const renderScreen = () => {
    switch (nav.screen) {
      case SCREENS.COMPANIES:
        return (
          <CompaniesScreen
            key="companies"
            onSelect={nav.goToDashboard}
            onBackSectors={nav.goToSectors}
          />
        );
      case SCREENS.DASHBOARD:
        return (
          <DashboardScreen
            key="dashboard"
            onBackCompanies={nav.goBack}
            onBackSectors={nav.goToSectors}
          />
        );
      default:
        return (
          <SectorScreen
            key="sectors"
            onSelect={nav.goToCompanies}
          />
        );
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#050a18' }}>
      <Header />
      <div className="fade-in" key={nav.screen}>
        {renderScreen()}
      </div>
    </div>
  );
}
