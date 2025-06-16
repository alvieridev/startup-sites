import { useState } from "react";
import { Button } from "../components/ui/Button";
import { ExternalLink, Globe, Plus, Settings, ToggleLeft, ToggleRight } from "lucide-react";
import { Card } from "../components/ui/Card";
import { WebsiteCard } from "../components/WebsiteCard";
import { AddWebsiteForm } from "../components/AddWebsiteCard";
const themeStyles = `
  :root {
    --primary: #2563eb;
    --primary-hover: #1d4ed8;
    --secondary: #64748b;
    --success: #16a34a;
    --danger: #dc2626;
    --danger-hover: #b91c1c;
    --background: #ffffff;
    --surface: #f8fafc;
    --border: #e2e8f0;
    --text-primary: #0f172a;
    --text-secondary: #64748b;
    --text-muted: #94a3b8;
  }
`;

const PopUp = () => {
  const [websites, setWebsites] = useState([
    { id: 1, name: 'Company Dashboard', url: 'https://dashboard.company.com' },
    { id: 2, name: 'Analytics Platform', url: 'https://analytics.company.com' },
    { id: 3, name: 'Marketing Tools', url: 'https://marketing.company.com' }
  ]);
  const [autoOpenEnabled, setAutoOpenEnabled] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

interface Website {
    id: number;
    name: string;
    url: string;
}

interface WebsiteData {
    name: string;
    url: string;
}

const addWebsite = (websiteData: WebsiteData): void => {
    const newWebsite: Website = {
        id: Date.now(),
        ...websiteData
    };
    setWebsites([...websites, newWebsite]);
    setShowAddForm(false);
};

  const removeWebsite = (id:number) => {
    setWebsites(websites.filter(website => website.id !== id));
  };

  const openAllSites = () => {
    websites.forEach(website => {
      window.open(website.url, '_blank');
    });
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: themeStyles }} />
      <div className="w-80 h-96 bg-slate-50 p-4 font-sans flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-lg font-semibold text-slate-900">Quick Sites</h1>
          <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
            <Settings className="w-4 h-4" />
          </Button>
        </div>

        {/* Auto-open Toggle */}
        <Card className="p-3 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-900">Auto-open on startup</p>
              <p className="text-xs text-slate-500">Open all sites when browser starts</p>
            </div>
            <button
              onClick={() => setAutoOpenEnabled(!autoOpenEnabled)}
              className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
            >
              {autoOpenEnabled ? (
                <ToggleRight className="w-6 h-6 text-blue-600" />
              ) : (
                <ToggleLeft className="w-6 h-6 text-slate-400" />
              )}
            </button>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-2 mb-4">
          <Button
            onClick={() => setShowAddForm(true)}
            className="flex-1"
            disabled={showAddForm}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Site
          </Button>
          <Button
            onClick={openAllSites}
            variant="secondary"
            disabled={websites.length === 0}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Open All
          </Button>
        </div>

        {/* Add Website Form */}
        {showAddForm && (
          <div className="mb-4">
            <AddWebsiteForm
              onAdd={addWebsite}
              onCancel={() => setShowAddForm(false)}
            />
          </div>
        )}

        {/* Websites List */}
        <div className="flex-1 min-h-0">
          <div className="h-full overflow-y-auto space-y-3">
            {websites.length === 0 ? (
              <Card className="p-6 text-center">
                <Globe className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-sm text-slate-500">No websites saved yet</p>
                <p className="text-xs text-slate-400 mt-1">Click "Add Site" to get started</p>
              </Card>
            ) : (
              websites.map(website => (
                <WebsiteCard
                  key={website.id}
                  website={website}
                  onRemove={removeWebsite}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PopUp;