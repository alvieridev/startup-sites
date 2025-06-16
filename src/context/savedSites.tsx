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

     async function getAndSetSavedSitesFromStorage() { // Yeah.. this function does two things, let it be unless you have a better implementation 

        //AS PER MY OBSERVATION, THIS WILL ONLY WORK IN AN EXTENSION, OTHERWISE, IT THROWS AN ERROR
        chrome.storage.local.get(["sites"]).then((result) => {
        //  console.log("Value is " + result.sites);
         console.log("FRESH VALUES: ", result.sites)   
         setSavedSites(result.sites || [])
         });

        
        }
    useEffect(()  => {        
        getAndSetSavedSitesFromStorage()
    }, [])

    
    const addNewSite = (site: SavedSiteType) => {
        // const {name, url} = site
        const updatedSites = [...savedSites, site];

       chrome.storage.local.set({ sites : updatedSites }).then(() => {
           console.log("Value is set");
           getAndSetSavedSitesFromStorage()
        });


        
    }
    const removeSite = (site: SavedSiteType) => {
        // setSavedSites((prev) => prev.filter((not) => not.url !== site.url))
         const updatedSites = savedSites.filter(prevSite => prevSite.url !== site.url);
        setSavedSites(updatedSites);
        chrome.storage.local.set({ sites: updatedSites });
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
