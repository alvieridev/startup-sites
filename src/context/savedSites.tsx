import { createContext, useEffect, useState, type ReactNode } from "react";

export type SavedSitesProviderType = {
    sites: SavedSiteType[] | [],
    addNewSite: (site: SavedSiteType) => void;
    removeSite: (site: SavedSiteType) => void;
}
type SavedSiteType =   {  name:string, url:string }
const SavedSitesContext = createContext<SavedSitesProviderType | []>([]);

export function SavedSitesProvider({children}:{children: ReactNode}){

    const [savedSites, setSavedSites] = useState<SavedSiteType[] | []>([])
    useEffect(() => {
        setSavedSites([
      {  name: 'Company Portal', url: 'https://portal.company.com' },
      {  name: 'Finance System', url: 'https://finance.company.com' }
    ]);
    }, [])
    const addNewSite = (site: SavedSiteType) => {
        setSavedSites((prev) => [...prev, site])
        
    }
    const removeSite = (site: SavedSiteType) => {
        setSavedSites((prev) => prev.filter((not) => not.url !== site.url))
    }

    const value: SavedSitesProviderType = {
        sites: savedSites,
        addNewSite,
        removeSite
    }

    return (
        <SavedSitesContext.Provider value={value}>
            {children}
        </SavedSitesContext.Provider>
    )
}
