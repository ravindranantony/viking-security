import React from 'react';
import { Shield, RefreshCw } from 'lucide-react';

interface UrlInputProps {
  targetUrl: string;
  setTargetUrl: (url: string) => void;
  isScanning: boolean;
  onScan: () => void;
}

export default function UrlInput({ targetUrl, setTargetUrl, isScanning, onScan }: UrlInputProps) {
  return (
    <div className="flex gap-4 mb-6">
      <input
        type="url"
        value={targetUrl}
        onChange={(e) => setTargetUrl(e.target.value)}
        placeholder="Enter website URL to test"
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        required
      />
      <button
        onClick={onScan}
        disabled={isScanning || !targetUrl}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
      >
        {isScanning ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Shield className="w-5 h-5" />}
        {isScanning ? 'Scanning...' : 'Start Scan'}
      </button>
    </div>
  );
}