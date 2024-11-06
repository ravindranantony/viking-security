import { testSecurityVulnerability } from '../utils/securityTester';

describe('Security Misconfiguration Tests', () => {
  it('should detect exposed environment variables', async () => {
    const payload = 'process.env';
    const result = await testSecurityVulnerability(payload);
    expect(result.vulnerabilities).toContain('EXPOSED_ENV_VARS');
  });

  it('should detect directory traversal attempts', async () => {
    const traversalPaths = [
      '../../../etc/passwd',
      '..\\..\\..\\windows\\system32',
      '%2e%2e%2f%2e%2e%2f'
    ];

    for (const path of traversalPaths) {
      const result = await testSecurityVulnerability(path);
      expect(result.vulnerabilities).toContain('PATH_TRAVERSAL');
    }
  });
}); 