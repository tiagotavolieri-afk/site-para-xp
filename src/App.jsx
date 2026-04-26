import React from 'react';
import './styles/globals.css';
import { Header } from './components/layout/Header';
import { SectorScreen } from './components/screens/SectorScreen';
import { CompaniesScreen } from './components/screens/CompaniesScreen';
import { DashboardScreen } from './components/screens/DashboardScreen';
import { FavoritesScreen } from './screens/FavoritesScreen';
import { LandingScreen } from './screens/LandingScreen';
import { SCREENS } from './hooks/useNavigation';
import { FavoritesProvider } from './context/FavoritesContext';
import { NavigationProvider, useNavigationContext } from './context/NavigationContext';

function AppContent() {
  const nav = useNavigationContext();

  const renderScreen = () => {
    switch (nav.screen) {
      case SCREENS.LANDING:
        return (
          <LandingScreen
            key="landing"
            onEnter={nav.goToSectors}
            onGoToDashboard={nav.goToDashboard}
          />
        );
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
      case SCREENS.FAVORITES:
        return (
          <FavoritesScreen
            key="favorites"
            onGoToDashboard={nav.goToDashboard}
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
    <div style={{ minHeight: '100vh', backgroundColor: '#020202' }}>
      <Header />
      <div className="screen-fade" key={nav.screen}>
        {renderScreen()}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <NavigationProvider>
      <FavoritesProvider>
        <AppContent />
      </FavoritesProvider>
    </NavigationProvider>
  );
}
