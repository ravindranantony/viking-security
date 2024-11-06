import React from 'react';
import { Mail } from 'lucide-react';
import type { SecurityTest } from '../types/security';

interface ShareResultsProps {
  targetUrl: string;
  tests: SecurityTest[];
}

export default function ShareResults({ targetUrl, tests }: ShareResultsProps) {
  const shareResults = () => {
    const shareText = `Security Test Results for ${targetUrl}
Security Testing Tool by ravi

Results Summary:
${tests.map((test) => `
${test.name}: ${test.result.status}
Severity: ${test.result.severity || 'N/A'}
Details: ${test.result.details || 'N/A'}
Recommendation: ${test.result.recommendation || 'N/A'}
OWASP Reference: ${test.owaspLink || 'N/A'}
`).join('\n')}`;

    window.location.href = `mailto:?subject=Security Test Results&body=${encodeURIComponent(shareText)}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Share Security Test Results</h3>
      </div>
      
      <button
        onClick={shareResults}
        className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        <Mail className="w-5 h-5" />
        <span>Share via Email</span>
      </button>
      
      <p className="mt-4 text-sm text-gray-600 text-center">
        Security Testing Tool by ravi <a href="https://x.com/senthazalravi" target="_blank" rel="noopener noreferrer">https://x.com/senthazalravi</a>
        Contributed by <a href="https://github.com/ravindranantony/viking-security/" target="_blank" rel="noopener noreferrer">Open Source Repo</a>
      </p>
    </div>
  );
}