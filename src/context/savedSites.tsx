import { createContext, useEffect, useState, type ReactNode } from "react";

export type SavedSitesProviderType = {
    sites: SavedSiteType[] | [],
    addNewSite: (site: SavedSiteType) => void;
    removeSite: (site: SavedSiteType) => void;
}
export type SavedSiteType =   {  name:string, url:string }

export const SavedSitesContext = createContext<SavedSitesProviderType | null>(null);

export default function SavedSitesProvider({children}:{children: ReactNode}){

    const [savedSites, setSavedSites] = useState<SavedSiteType[] | []>([])
    
    useEffect(()  => {
    //     setSavedSites([
    //   {  name: 'Company Portal', url: 'https://portal.company.com' },
    //   {  name: 'Finance System', url: 'https://finance.company.com' }
    //     ]);
     async function getAndSetSavedSitesFromStorage() { // Yeah.. this function does two things, let it be unless you have a better implementation 
        chrome.storage.local.get(["sites"]).then((result) => {
         console.log("Value is " + result.sites);
         console.log("FRESH VALUES: ", result.sites)   
         setSavedSites(result.sites || [])
         });

        
        //  return sitesFromStorage
        }
        getAndSetSavedSitesFromStorage()
    }, [])

    
    const addNewSite = (site: SavedSiteType) => {
        // const {name, url} = site
        const updatedSites = [...savedSites, site];

       chrome.storage.local.set({ sites : updatedSites }).then(() => {
           console.log("Value is set");
           setSavedSites((prev) => [...prev, site])
        });

        chrome.storage.local.get(["sites"]).then((result) => {
            console.log("Value is inside add new function" + result.sites);
        });
        
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
