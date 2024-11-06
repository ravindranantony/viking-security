import React from 'react';
import { History, Globe } from 'lucide-react';

interface UrlHistoryProps {
  urlHistory: string[];
  setTargetUrl: (url: string) => void;
}

export default function UrlHistory({ urlHistory, setTargetUrl }: UrlHistoryProps) {
  if (urlHistory.length === 0) return null;

  return (
    <div className="mb-6">
      <h2 className="text-sm font-medium text-gray-600 mb-2 flex items-center gap-2">
        <History className="w-4 h-4" />
        Recent Scans
      </h2>
      <div className="flex flex-wrap gap-2">
        {urlHistory.map((url, index) => (
          <button
            key={index}
            onClick={() => setTargetUrl(url)}
            className="text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 flex items-center gap-1"
          >
            <Globe className="w-4 h-4" />
            {url}
          </button>
        ))}
      </div>
    </div>
  );
}