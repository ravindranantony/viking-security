import React from 'react';
import { CheckCircle, XCircle, RefreshCw, BookOpen } from 'lucide-react';
import type { SecurityTest } from '../types/security';

interface TestResultsProps {
  tests: SecurityTest[];
}

export default function TestResults({ tests }: TestResultsProps) {
  // Add severity color mapping
  const severityColors = {
    Critical: 'text-red-600',
    High: 'text-orange-600',
    Medium: 'text-yellow-600',
    Low: 'text-green-600'
  };

  return (
    <div className="space-y-4">
      {tests.map((test, index) => (
        <div key={index} className="border rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              {test.icon}
              <h3 className="font-medium">{test.name}</h3>
            </div>
            <div className="flex items-center gap-2">
              {test.result.severity && (
                <span className={`text-sm px-2 py-1 rounded ${
                  test.result.severity === 'high' ? 'bg-red-100 text-red-800' :
                  test.result.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {test.result.severity.toUpperCase()}
                </span>
              )}
              {test.result.status === 'success' && <CheckCircle className="w-5 h-5 text-green-500" />}
              {test.result.status === 'failed' && <XCircle className="w-5 h-5 text-red-500" />}
              {test.result.status === 'running' && <RefreshCw className="w-5 h-5 animate-spin text-blue-500" />}
              {test.result.status === 'pending' && <div className="w-5 h-5" />}
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-2">{test.description}</p>
          {test.result.details && (
            <div className={`mt-2 p-3 rounded-lg ${
              test.result.status === 'success' ? 'bg-green-50' : 'bg-red-50'
            }`}>
              <p className={`text-sm ${
                test.result.status === 'success' ? 'text-green-700' : 'text-red-700'
              }`}>
                {test.result.details}
              </p>
              {test.result.recommendation && (
                <p className="text-sm text-gray-700 mt-2">
                  <strong>Recommendation:</strong> {test.result.recommendation}
                </p>
              )}
              {test.owaspLink && (
                <a
                  href={test.owaspLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-800 mt-2 flex items-center gap-1"
                >
                  <BookOpen className="w-4 h-4" />
                  Learn more (OWASP)
                </a>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}