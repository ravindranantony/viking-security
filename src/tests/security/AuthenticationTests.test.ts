import { testSecurityVulnerability } from '../utils/securityTester';

describe('Authentication Security Tests', () => {
  it('should detect weak passwords', async () => {
    const weakPasswords = [
      'password123',
      '12345678',
      'qwerty',
      'admin123'
    ];

    for (const password of weakPasswords) {
      const result = await testSecurityVulnerability(password);
      expect(result.vulnerabilities).toContain('WEAK_PASSWORD');
    }
  });

  it('should detect brute force attempts', async () => {
    const attempts = Array(10).fill('password');
    
    for (const attempt of attempts) {
      const result = await testSecurityVulnerability(attempt);
      expect(result.vulnerabilities).toContain('BRUTE_FORCE_ATTEMPT');
    }
  });
}); 