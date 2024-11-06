import { testSecurityVulnerability } from '../utils/securityTester';

describe('XSS Vulnerability Tests', () => {
  const xssPayloads = [
    {
      input: '<script>alert("xss")</script>',
      description: 'Basic XSS'
    },
    {
      input: '<img src="x" onerror="alert(1)">',
      description: 'Image-based XSS'
    },
    {
      input: 'javascript:alert(document.cookie)',
      description: 'JavaScript protocol'
    },
    {
      input: '<svg onload="alert(1)">',
      description: 'SVG-based XSS'
    },
    {
      input: '"><script>alert(document.domain)</script>',
      description: 'DOM-based XSS'
    }
  ];

  xssPayloads.forEach(({ input, description }) => {
    it(`should detect ${description}`, async () => {
      const result = await testSecurityVulnerability(input);
      expect(result.vulnerabilities).toContain('XSS');
    });
  });
}); 