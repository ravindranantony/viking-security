import { urlSecurityTests } from '../utils/urlTests';

// Inside your main testing component/function
const handleTestUrl = async (url: string) => {
  const results = [];
  
  // Run through all security tests
  for (const test of urlSecurityTests) {
    const result = test.test(url);
    if (result.severity !== 'Low') {  // Only show medium and above severity
      results.push({
        testName: test.name,
        ...result
      });
    }
  }

  // Update the UI with results
  setTestResults(results);
};

// Update the results display component to show the new test results
const DisplayResults = ({ results }) => {
  return (
    <div className="mt-4">
      {results.map((result, index) => (
        <div key={index} className="mb-4 p-4 rounded-lg bg-white shadow">
          <h3 className="font-bold text-lg">{result.testName}</h3>
          <div className={`text-sm mt-1 ${
            result.severity === 'Critical' ? 'text-red-600' :
            result.severity === 'High' ? 'text-orange-600' :
            result.severity === 'Medium' ? 'text-yellow-600' : 'text-green-600'
          }`}>
            Severity: {result.severity}
          </div>
          <p className="mt-2 text-gray-700">{result.description}</p>
          <p className="mt-2 text-gray-600 text-sm">
            <strong>Recommendation:</strong> {result.recommendation}
          </p>
        </div>
      ))}
    </div>
  );
};

// Add this test to your existing tests
const brokenAccessControlTest = {
  name: 'Broken Access Control',
  test: (url: string) => {
    // Check for sensitive endpoints
    const sensitiveEndpoints = /(admin|dashboard|config|settings|users)/i.test(url);
    // Check for exposed IDs in URL
    const hasIdParams = /[?&](id|user_id|account)=/i.test(url);
    // Check for directory traversal
    const hasTraversal = /\.\./i.test(url);
    
    let findings = [];
    let severity = 'Low';
    
    if (sensitiveEndpoints) {
      findings.push('Sensitive administrative endpoints detected');
      severity = 'High';
    }
    
    if (hasIdParams) {
      findings.push('Potential Insecure Direct Object References (IDOR)');
      severity = 'High';
    }
    
    if (hasTraversal) {
      findings.push('Directory traversal attempt detected');
      severity = 'Critical';
    }

    return {
      vulnerability: 'Broken Access Control',
      severity: severity,
      description: findings.length > 0 ? findings.join('. ') : 'No obvious access control issues detected',
      recommendation: 'Implement proper authorization checks, avoid exposing IDs in URLs, and validate user permissions'
    };
  }
}; 