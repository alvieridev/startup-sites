import { createContext, useEffect, useState, type ReactNode } from "react";

export type SavedSitesProviderType = {
    sites: SavedSiteType[] | [],
    addNewSite: (site: Omit<SavedSiteType, "id">) => void;
    removeSite: (site: SavedSiteType) => void;
    toggleEnabled: (status:boolean) => void;
    isEnabled: boolean
}
export type SavedSiteType =   {id: string,  name:string, url:string }

export const SavedSitesContext = createContext<SavedSitesProviderType | null>(null);

export default function SavedSitesProvider({children}:{children: ReactNode}){

    const [savedSites, setSavedSites] = useState<SavedSiteType[] | []>([])
        const [isEnabled, setIsEnabled] = useState(true);


     async function getAndSetSavedSitesFromStorage() { // Yeah.. this function does two things, let it be unless you have a better implementation 

        //AS PER MY OBSERVATION, THIS WILL ONLY WORK IN AN EXTENSION, OTHERWISE, IT THROWS AN ERROR
        chrome.storage.local.get(["sites"]).then((result) => {
        //  console.log("Value is " + result.sites);
         console.log("FRESH VALUES: ", result.sites)   
         setSavedSites(result.sites || [])
         });

        
        }
         async function getAndSetAutoEnabledStatus() {

        chrome.storage.local.get(["isAutoOpenEnabled"]).then((result) => {
         console.log("IS AUTO ENABLE FROM CONTEXT: ", result.isAutoOpenEnabled)   
         setIsEnabled(result.isAutoOpenEnabled)
         });

        
        }
    useEffect(()  => {        
        getAndSetSavedSitesFromStorage()
        getAndSetAutoEnabledStatus()

    }, [])

    
    const addNewSite = (site: Omit<SavedSiteType, "id">) => {
        // const {name, url} = site

         const newSite: SavedSiteType = {
            id: Date.now().toString(),
            name: site.name.trim(),
            url: site.url.trim()
        };
        const updatedSites = [...savedSites, newSite];

       chrome.storage.local.set({ sites : updatedSites }).then(() => {
           console.log("Value is set");
           setSavedSites(updatedSites)
        });


        
    }
    const removeSite = (site: SavedSiteType) => {
         const updatedSites = savedSites.filter(prevSite => prevSite.id !== site.id);
        setSavedSites(updatedSites);
        chrome.storage.local.set({ sites: updatedSites });
    }

              
   const toggleEnabled = (status:boolean) => {
    // setIsEnabled(!isEnabled);

    
    
    
    chrome.storage.local.set({ isAutoOpenEnabled: status }).then((result) => {
        
        console.log("NEW AUTO ENABLED: ", result)
        setIsEnabled(status);
    });

  };

    const value: SavedSitesProviderType = {
        sites: savedSites,
        addNewSite,
        removeSite,
        isEnabled,
        toggleEnabled
    }

    return (
        <SavedSitesContext.Provider value={value}>
            {children}
        </SavedSitesContext.Provider>
    )
}
