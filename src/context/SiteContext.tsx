import { createContext, useContext, useState, ReactNode } from 'react';

interface SiteContextType {
  siteName: string;
  setSiteName: (name: string) => void;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export function SiteProvider({ children }: { children: ReactNode }) {
  const [siteName, setSiteName] = useState(() => {
    return localStorage.getItem('siteName') || 'DERSFLIX';
  });

  const updateSiteName = (name: string) => {
    setSiteName(name);
    localStorage.setItem('siteName', name);
  };

  return (
    <SiteContext.Provider value={{ siteName, setSiteName: updateSiteName }}>
      {children}
    </SiteContext.Provider>
  );
}

export function useSite() {
  const context = useContext(SiteContext);
  if (context === undefined) {
    throw new Error('useSite must be used within a SiteProvider');
  }
  return context;
}