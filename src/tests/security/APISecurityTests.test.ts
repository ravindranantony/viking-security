import { testSecurityVulnerability } from '../utils/securityTester';

describe('API Security Tests', () => {
  it('should detect missing rate limiting', async () => {
    const requests = Array(100).fill().map(() => testSecurityVulnerability('test'));
    const results = await Promise.all(requests);
    
    expect(results.some(r => 
      r.vulnerabilities.includes('MISSING_RATE_LIMIT')
    )).toBeTruthy();
  });

  it('should detect insecure direct object references', async () => {
    const payload = {
      userId: '12345',
      action: 'view_profile'
    };

    const result = await testSecurityVulnerability(JSON.stringify(payload));
    expect(result.vulnerabilities).toContain('INSECURE_DIRECT_OBJECT_REF');
  });
}); 