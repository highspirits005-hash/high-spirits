import React, { createContext, useContext, useState } from 'react';

interface WalkInPopupContextType {
  isOpen: boolean;
  openPopup: () => void;
  closePopup: () => void;
}

const WalkInPopupContext = createContext<WalkInPopupContextType | undefined>(undefined);

export const WalkInPopupProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);

  return (
    <WalkInPopupContext.Provider value={{ isOpen, openPopup, closePopup }}>
      {children}
    </WalkInPopupContext.Provider>
  );
};

export const useWalkInPopup = () => {
  const context = useContext(WalkInPopupContext);
  if (!context) {
    throw new Error('useWalkInPopup must be used within WalkInPopupProvider');
  }
  return context;
};
