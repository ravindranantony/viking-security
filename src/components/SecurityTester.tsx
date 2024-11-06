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

// Add this function alongside your existing security checks
const checkBrokenAccessControl = (url: string) => {
  const issues = [];
  
  // Check for sensitive administrative endpoints
  if (/(admin|dashboard|config|settings|users)/i.test(url)) {
    issues.push({
      type: 'Broken Access Control',
      severity: 'High',
      finding: 'Sensitive administrative endpoint detected',
      recommendation: 'Ensure proper authentication and authorization controls are in place'
    });
  }

  // Check for exposed IDs in URL
  if (/[?&](id|user_id|account)=/i.test(url)) {
    issues.push({
      type: 'Broken Access Control',
      severity: 'High',
      finding: 'Potential Insecure Direct Object Reference (IDOR)',
      recommendation: 'Use indirect references or implement proper access controls'
    });
  }

  // Check for directory traversal attempts
  if (/\.\./i.test(url)) {
    issues.push({
      type: 'Broken Access Control',
      severity: 'Critical',
      finding: 'Directory traversal pattern detected',
      recommendation: 'Validate and sanitize file paths, implement proper access controls'
    });
  }

  // Check for unauthorized API endpoints
  if (/\/api\/|\/v1\/|\/v2\//i.test(url)) {
    issues.push({
      type: 'Broken Access Control',
      severity: 'Medium',
      finding: 'API endpoint detected - verify access controls',
      recommendation: 'Implement proper API authentication and authorization'
    });
  }

  return issues;
};

// Add this to your main security check function
const handleSecurityCheck = async (url: string) => {
  const results = [];
  
  // Add broken access control checks
  const accessControlIssues = checkBrokenAccessControl(url);
  results.push(...accessControlIssues);
  
  // Your existing security checks...
  
  return results;
};