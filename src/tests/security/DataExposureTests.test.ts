import { testSecurityVulnerability } from '../utils/securityTester';

describe('Sensitive Data Exposure Tests', () => {
  const sensitivePatterns = [
    {
      input: '4532-7153-3790-1234',
      type: 'CREDIT_CARD'
    },
    {
      input: 'ssh-rsa AAAA...',
      type: 'PRIVATE_KEY'
    },
    {
      input: '-----BEGIN PRIVATE KEY-----',
      type: 'PRIVATE_KEY'
    },
    {
      input: 'api_key=1234567890abcdef',
      type: 'API_KEY'
    }
  ];

  sensitivePatterns.forEach(({ input, type }) => {
    it(`should detect exposed ${type}`, async () => {
      const result = await testSecurityVulnerability(input);
      expect(result.vulnerabilities).toContain(`EXPOSED_${type}`);
    });
  });
}); 