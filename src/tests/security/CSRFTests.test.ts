import { testSecurityVulnerability } from '../utils/securityTester';

describe('CSRF Security Tests', () => {
  it('should detect missing CSRF tokens', async () => {
    const payload = {
      type: 'form_submission',
      csrfToken: undefined
    };

    const result = await testSecurityVulnerability(JSON.stringify(payload));
    expect(result.vulnerabilities).toContain('MISSING_CSRF_TOKEN');
  });

  it('should detect invalid CSRF tokens', async () => {
    const payload = {
      type: 'form_submission',
      csrfToken: 'invalid_token'
    };

    const result = await testSecurityVulnerability(JSON.stringify(payload));
    expect(result.vulnerabilities).toContain('INVALID_CSRF_TOKEN');
  });
}); 