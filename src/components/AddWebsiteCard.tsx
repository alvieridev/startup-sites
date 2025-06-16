import { useState } from "react";
import { Card } from "./ui/Card";
import { Input } from "./ui/Input";

// Add Website Form Component
export const AddWebsiteForm = ({ onAdd, onCancel }) => {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = () => {
    if (name.trim() && url.trim()) {
      onAdd({ name: name.trim(), url: url.trim() });
      setName('');
      setUrl('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Website Name
          </label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="e.g., Company Dashboard"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Website URL
          </label>
          <Input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="https://example.com"
          />
        </div>
        <div className="flex justify-end gap-2">
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Add Website</Button>
        </div>
      </div>
    </Card>
  );
};
