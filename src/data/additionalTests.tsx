export const additionalTests = [
  {
    name: 'Directory Listing',
    description: 'Checks for exposed directory listings',
    icon: <Folder className="w-5 h-5 text-yellow-500" />,
    test: async (url: string) => {
      const findings = [];
      const directoryPatterns = [
        /index\s+of/i,
        /parent\s+directory/i,
        /\[To\s+Parent\s+Directory\]/i
      ];
      
      try {
        const response = await fetch(url);
        const text = await response.text();
        
        directoryPatterns.forEach(pattern => {
          if (pattern.test(text)) {
            findings.push('Directory listing detected');
          }
        });
      } catch (error) {
        findings.push('Unable to check directory listing');
      }
      
      return {
        vulnerable: findings.length > 0,
        findings,
        status: findings.length > 0 ? 'vulnerable' : 'safe'
      };
    }
  },
  {
    name: 'Information Disclosure',
    description: 'Detects sensitive information exposure',
    icon: <Eye className="w-5 h-5 text-red-500" />,
    test: async (url: string) => {
      const findings = [];
      const sensitivePatterns = [
        /error/i,
        /exception/i,
        /stack\s+trace/i,
        /debug/i,
        /([a-zA-Z0-9+/]{4}){8,}={0,3}/  // Base64
      ];
      
      try {
        const response = await fetch(url);
        const text = await response.text();
        
        sensitivePatterns.forEach(pattern => {
          if (pattern.test(text)) {
            findings.push('Potential information disclosure detected');
          }
        });
      } catch (error) {
        findings.push('Unable to check for information disclosure');
      }
      
      return {
        vulnerable: findings.length > 0,
        findings,
        status: findings.length > 0 ? 'vulnerable' : 'safe'
      };
    }
  },
  {
    name: 'SSL/TLS Security',
    description: 'Analyzes SSL/TLS configuration',
    icon: <Lock className="w-5 h-5 text-green-500" />,
    test: async (url: string) => {
      const findings = [];
      
      if (!url.startsWith('https://')) {
        findings.push('Not using HTTPS');
      }
      
      try {
        const response = await fetch(url);
        const security = response.headers.get('Strict-Transport-Security');
        
        if (!security) {
          findings.push('HSTS not implemented');
        }
      } catch (error) {
        findings.push('Unable to check SSL/TLS configuration');
      }
      
      return {
        vulnerable: findings.length > 0,
        findings,
        status: findings.length > 0 ? 'vulnerable' : 'safe'
      };
    }
  }
]; 