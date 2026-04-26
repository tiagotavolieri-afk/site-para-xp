import { useState } from 'react';

export const SCREENS = {
  LANDING: 'landing',
  SECTORS: 'sectors',
  COMPANIES: 'companies',
  DASHBOARD: 'dashboard',
  FAVORITES: 'favorites',
};

export function useNavigation() {
  const [screen, setScreen] = useState(SCREENS.LANDING);
  const [selectedSector, setSelectedSector] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const goToLanding = () => {
    setScreen(SCREENS.LANDING);
    setSelectedSector(null);
    setSelectedCompany(null);
  };

  const goToCompanies = (sectorId) => {
    setSelectedSector(sectorId);
    setScreen(SCREENS.COMPANIES);
  };

  const goToDashboard = (companyId) => {
    setSelectedCompany(companyId);
    setScreen(SCREENS.DASHBOARD);
  };

  const goToSectors = () => {
    setScreen(SCREENS.SECTORS);
    setSelectedSector(null);
    setSelectedCompany(null);
  };

  const goToFavorites = () => {
    setScreen(SCREENS.FAVORITES);
  };

  const goBack = () => {
    if (screen === SCREENS.DASHBOARD) setScreen(SCREENS.COMPANIES);
    else if (screen === SCREENS.COMPANIES) setScreen(SCREENS.SECTORS);
    else if (screen === SCREENS.SECTORS) setScreen(SCREENS.LANDING);
    else if (screen === SCREENS.FAVORITES) setScreen(SCREENS.SECTORS);
  };

  return {
    screen,
    selectedSector,
    selectedCompany,
    goToLanding,
    goToCompanies,
    goToDashboard,
    goToSectors,
    goToFavorites,
    goBack,
  };
}
