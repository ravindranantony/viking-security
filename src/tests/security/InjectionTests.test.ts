import { testSecurityVulnerability } from '../utils/securityTester';

describe('SQL Injection Tests', () => {
  const testCases = [
    { 
      input: "' OR '1'='1", 
      description: 'Basic SQL injection'
    },
    { 
      input: "'; DROP TABLE users; --", 
      description: 'Destructive SQL injection'
    },
    { 
      input: "' UNION SELECT username, password FROM users --", 
      description: 'Union-based SQL injection'
    },
    {
      input: "admin' --",
      description: 'Authentication bypass'
    }
  ];

  testCases.forEach(({ input, description }) => {
    it(`should detect ${description}`, async () => {
      const result = await testSecurityVulnerability(input);
      expect(result.vulnerabilities).toContain('SQL_INJECTION');
    });
  });
}); 