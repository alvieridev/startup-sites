import { Card } from "./ui/Card";
import { Button } from "./ui/Button";
import { Globe, ExternalLink, Trash2 } from "lucide-react";

interface Website {
    id: number;
    name: string;
    url: string;
}

interface WebsiteCardProps {
    website: Website;
    onRemove: (id: string) => void;
}

export const WebsiteCard = ({ website, onRemove }: WebsiteCardProps) => {
    const getDomain = (url: string) => {
        try {
            return new URL(url).hostname;
        } catch {
            return url;
        }
    };

    const openWebsite = () => {
        window.open(website.url, '_blank');
    };
    return (
        <Card className="p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <div className="flex items-start gap-3 flex-1 min-w-0"></div>
                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Globe className="w-5 h-5 text-slate-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-slate-900 truncate">{website.name}</h3>
                        <p className="text-sm text-slate-500 truncate">{getDomain(website.url)}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {openWebsite()}}
                        className="w-8 h-8 p-0"
                    >
                        <ExternalLink className="w-4 h-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRemove(website.id)}
                        className="w-8 h-8 p-0 text-red-600 hover:bg-red-50 hover:text-red-700"
                    >
                        <Trash2 className="w-4 h-4" />
                    </Button>
                </div>
            </div>
            </div>
        </Card>
    )
    
};