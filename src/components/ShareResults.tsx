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
      
      <footer className="mt-8 text-center">
        <div className="flex flex-col items-center space-y-3 p-4 rounded-lg bg-gray-50">
          <p className="text-gray-700 font-medium">Security Testing Tool by Ravi</p>
          <div className="flex items-center space-x-4">
            <a 
              href="https://x.com/senthazalravi" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              @senthazalravi
            </a>
            <a 
              href="https://github.com/ravindranantony/viking-security/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              View Source
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}