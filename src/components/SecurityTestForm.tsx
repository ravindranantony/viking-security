import React, { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle } from 'lucide-react';

interface TestResult {
  type: string;
  message: string;
  severity: 'high' | 'medium' | 'low';
}

export function SecurityTestForm() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<TestResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) {
      setError('Please enter a valid URL');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      // Simulated security tests
      const testResults: TestResult[] = [
        {
          type: 'XSS',
          message: 'Basic XSS protection detected',
          severity: 'low'
        },
        {
          type: 'CSRF',
          message: 'CSRF tokens implemented',
          severity: 'low'
        },
        {
          type: 'Headers',
          message: 'Security headers could be improved',
          severity: 'medium'
        }
      ];
      setResults(testResults);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex gap-4">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter website URL to test"
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
          >
            <Shield className="w-5 h-5" />
            {loading ? 'Testing...' : 'Run Tests'}
          </button>
        </div>
      </form>

      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          {error}
        </div>
      )}

      {results.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Security Test Results</h2>
          {results.map((result, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border ${
                result.severity === 'high'
                  ? 'bg-red-50 border-red-200'
                  : result.severity === 'medium'
                  ? 'bg-yellow-50 border-yellow-200'
                  : 'bg-green-50 border-green-200'
              }`}
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <h3 className="font-semibold">{result.type}</h3>
              </div>
              <p className="mt-2 text-gray-600">{result.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}