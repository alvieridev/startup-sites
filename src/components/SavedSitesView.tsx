import  { useContext, useState } from 'react'
import { SavedSitesContext } from '../context/savedSites';
import { Check, Globe, Plus, Power, X } from 'lucide-react';

export default function SavedSitesView() {
      const [newSite, setNewSite] = useState({ name: '', url: '' })
 const [isAddingNew, setIsAddingNew] = useState(false);

    

        const context = useContext(SavedSitesContext)
          if (context === null) {
       throw new Error(
         "NotificationContainer must be used within a NotificationProvider"
        );
      }
      const {sites, addNewSite, removeSite} = context

       const openAllSites = () => {
    sites.forEach(site => {
      // In real extension:
      chrome.tabs.create({ url: site.url });
      console.log(`Opening: ${site.url}`);
    });
  };

    
  return (
   <div className="space-y-4">
              {/* Sites List */}
              <div className="space-y-2">
                {sites.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Globe className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No sites added yet</p>
                    <p className="text-xs">Add your frequently used websites</p>
                  </div>
                ) : (
                  sites.map(site => (
                    <div key={site.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Globe className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">{site.name}</p>
                        <p className="text-sm text-gray-500 truncate">{site.url}</p>
                      </div>
                      <button
                        onClick={() => removeSite(site)}
                        className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="Remove site"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
              {/* Add New Site Form */}
              {isAddingNew ? (
                <div className="border rounded-lg p-4 bg-blue-50">
                  <h3 className="font-medium text-gray-900 mb-3">Add New Site</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Site Name
                      </label>
                      <input
                        type="text"
                        value={newSite.name}
                        onChange={(e) => setNewSite(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="e.g., Company Portal"
                        className="w-full px-3 py-2 border border-gray-300 text-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Website URL
                      </label>
                      <input
                        type="url"
                        value={newSite.url}
                        onChange={(e) => setNewSite(prev => ({ ...prev, url: e.target.value }))}
                        placeholder="https://alvieri.dev"
                        className="w-full px-3 py-2 border border-gray-300 text-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => addNewSite(newSite)}
                        className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                      >
                        <Check className="w-4 h-4 inline mr-1" />
                        Add Site
                      </button>
                      <button
                        onClick={() => {
                          setIsAddingNew(false);
                          setNewSite({ name: '', url: '' });
                        }}
                        className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setIsAddingNew(true)}
                  className="w-full flex items-center justify-center gap-2 p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add New Site
                </button>
              )}
              {/* Quick Actions */}
              {sites.length > 0 && (
                <div className="pt-2 border-t">
                  <button
                    onClick={openAllSites}
                    className="w-full bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
                  >
                    <Power className="w-4 h-4 inline mr-2" />
                    Open All Sites Now
                  </button>
                </div>
              )}
            </div>
  )
}
