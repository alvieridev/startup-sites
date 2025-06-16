import { useContext } from 'react'
import { SavedSitesContext,  } from '../../context/savedSites'
import { Settings } from 'lucide-react'
export type ActiveTab = "sites" | "settings"

export default function TabNavigation({activeTab, setActiveTab, }: {activeTab: ActiveTab, setActiveTab: (param: ActiveTab) => void,

}) {
       const context = useContext(SavedSitesContext)
              if (context === null) {
           throw new Error(
             "NotificationContainer must be used within a NotificationProvider"
            );
          }
          const {sites, } = context
    return (
     <div className="flex border-b">
          <button
            onClick={() => setActiveTab('sites')}
            className={`flex-1 px-4 py-3 text-sm font-medium  transition-colors ${
              activeTab === 'sites'
                ? 'border-blue-600 text-blue-600 bg-blue-50'
                : 'border-transparent text-gray-600 hover:text-gray-800'
            }`}
          >
            Sites ({sites.length})
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex-1 px-4 py-3 text-sm font-mediumtransition-colors ${
              activeTab === 'settings'
                ? 'border-blue-600 text-blue-600 bg-blue-50'
                : 'border-transparent text-gray-600 hover:text-gray-800'
            }`}
          >
            <Settings className="w-4 h-4 inline mr-1" />
            Settings
          </button>
        </div>
  )
}
