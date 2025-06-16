import { useContext, useState } from 'react'

import './App.css'
import { SavedSitesContext } from './context/savedSites';
import Header from './components/ui/Header';
import TabNavigation from './components/ui/TabNavigation';
import SavedSitesView from './components/SavedSitesView';
import Settings from './components/Settings';

function App() {
    const [activeTab, setActiveTab] = useState<'sites' | 'settings'>('sites');
    const context = useContext(SavedSitesContext)


     
     if (context === null) {
       throw new Error(
         "NotificationContainer must be used within a NotificationProvider"
        );
      }

        const [isEnabled, setIsEnabled] = useState(true);

          
   const toggleEnabled = () => {
    setIsEnabled(!isEnabled);
    
    // In real extension:
    // chrome.storage.local.set({ isEnabled: !isEnabled });
  };


  return (
    <>
      <div className="w-80 rounded-md md:max-h-full bg-white  ">
      {/* Header */}
     
      <Header />

      <div className="px-1">
        {/* Status Banner */}
        <div className={`px-4 py-2 text-sm ${isEnabled ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
          <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${isEnabled ? 'bg-green-500' : 'bg-red-500'}`}></div>
        Auto-open is {isEnabled ? 'enabled' : 'disabled'}
            </div>
        </div>

        {/* Tab Navigation */}
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Content */}
        <div className="p-4">
          {activeTab === 'sites' && (
            <SavedSitesView />
          )}
          {activeTab === 'settings' && (
           <Settings isEnabled={isEnabled} toggleEnabled={toggleEnabled} />
          )}
        </div>
      </div>
    </div>
    </>
  )
}

export default App
