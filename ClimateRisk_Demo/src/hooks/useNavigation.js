import { useState } from 'react';

export const SCREENS = {
  SECTORS: 'sectors',
  COMPANIES: 'companies',
  DASHBOARD: 'dashboard',
};

export function useNavigation() {
  const [screen, setScreen] = useState(SCREENS.SECTORS);
  const [selectedSector, setSelectedSector] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);

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

  const goBack = () => {
    if (screen === SCREENS.DASHBOARD) setScreen(SCREENS.COMPANIES);
    else if (screen === SCREENS.COMPANIES) setScreen(SCREENS.SECTORS);
  };

  return {
    screen,
    selectedSector,
    selectedCompany,
    goToCompanies,
    goToDashboard,
    goToSectors,
    goBack,
  };
}
