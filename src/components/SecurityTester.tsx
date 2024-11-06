import { useState } from 'react';
import { initialTests } from '../data/initialTests';
import { additionalTests } from '../data/additionalTests';
import { securityPatterns } from '../utils/securityPatterns';

export const SecurityTester = () => {
  const [url, setUrl] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const allTests = [...initialTests, ...additionalTests];

  const runSecurityTests = async () => {
    setIsLoading(true);
    try {
      const testResults = await Promise.all(
        allTests.map(async (test) => {
          const result = await test.test(url);
          return {
            name: test.name,
            icon: test.icon,
            category: test.category,
            result,
            message: result.vulnerable ? test.vulnerabilityMessage : test.safetyMessage,
            recommendation: test.recommendation,
            findings: result.findings
          };
        })
      );
      setResults(testResults);
    } catch (error) {
      console.error('Security test error:', error);
    }
    setIsLoading(false);
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL to test"
          className="w-full p-2 border rounded"
        />
        <button
          onClick={runSecurityTests}
          disabled={isLoading}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          {isLoading ? 'Testing...' : 'Run Security Tests'}
        </button>
      </div>

      <div className="space-y-4">
        {results.map((result, index) => (
          <div key={index} className="p-4 border rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              {result.icon}
              <h3 className="font-bold">{result.name}</h3>
            </div>
            <div className={`p-2 rounded ${
              result.result.vulnerable ? 'bg-red-100' : 'bg-green-100'
            }`}>
              <p>{result.message}</p>
            </div>
            {result.result.findings?.length > 0 && (
              <div className="mt-2">
                <h4 className="font-semibold">Findings:</h4>
                <ul className="list-disc pl-5">
                  {result.result.findings.map((finding, i) => (
                    <li key={i}>{finding}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="mt-2">
              <h4 className="font-semibold">Recommendation:</h4>
              <p className="text-gray-600">{result.recommendation}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};