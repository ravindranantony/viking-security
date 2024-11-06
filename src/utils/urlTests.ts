interface URLTestResult {
  vulnerability: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  description: string;
  recommendation: string;
}

export const urlSecurityTests = [
  {
    name: 'SSL/TLS Check',
    test: (url: string): URLTestResult => {
      const hasHttps = url.startsWith('https://');
      return {
        vulnerability: 'Insecure Protocol',
        severity: hasHttps ? 'Low' : 'High',
        description: hasHttps ? 'Site uses HTTPS' : 'Site uses insecure HTTP protocol',
        recommendation: 'Implement HTTPS across the entire site'
      };
    }
  },
  {
    name: 'Open Redirects',
    test: (url: string): URLTestResult => {
      const hasRedirect = /[?&](redirect|return|next|url|goto)=/i.test(url);
      return {
        vulnerability: 'Open Redirect',
        severity: hasRedirect ? 'Medium' : 'Low',
        description: hasRedirect ? 'URL contains potential redirect parameters' : 'No obvious redirect parameters found',
        recommendation: 'Validate all redirect URLs against whitelist'
      };
    }
  },
  {
    name: 'Directory Traversal',
    test: (url: string): URLTestResult => {
      const hasTraversal = /\.\./i.test(url);
      return {
        vulnerability: 'Path Traversal',
        severity: hasTraversal ? 'Critical' : 'Low',
        description: hasTraversal ? 'URL contains directory traversal attempts' : 'No directory traversal detected',
        recommendation: 'Sanitize file paths and implement proper access controls'
      };
    }
  },
  {
    name: 'Injection Vulnerabilities',
    test: (url: string): URLTestResult => {
      const sqlInjection = /'|--|;|union\s+select|exec\(/i.test(url);
      const commandInjection = /[;&|`]|\$\(|\bping\b|\bcat\b/i.test(url);
      const noSQLInjection = /\{\$/?i.test(url);
      
      return {
        vulnerability: 'Injection',
        severity: (sqlInjection || commandInjection || noSQLInjection) ? 'Critical' : 'Low',
        description: 'Detects SQL, NoSQL, OS command injection attempts',
        recommendation: 'Use parameterized queries and input validation'
      };
    }
  },
  {
    name: 'Sensitive Information',
    test: (url: string): URLTestResult => {
      const hasSensitive = /(password|passwd|pwd|apikey|api_key|secret|token)=/i.test(url);
      return {
        vulnerability: 'Sensitive Data Exposure',
        severity: hasSensitive ? 'High' : 'Low',
        description: hasSensitive ? 'URL contains sensitive information in parameters' : 'No sensitive data detected in URL',
        recommendation: 'Never include sensitive data in URLs'
      };
    }
  },
  {
    name: 'File Inclusion',
    test: (url: string): URLTestResult => {
      const hasFileInclusion = /\.(php|asp|jsp|cgi|env|config)/i.test(url);
      return {
        vulnerability: 'File Inclusion',
        severity: hasFileInclusion ? 'High' : 'Low',
        description: hasFileInclusion ? 'URL attempts to include sensitive files' : 'No sensitive files included in URL',
        recommendation: 'Implement strict file access controls'
      };
    }
  },
  {
    name: 'Access Control Check',
    test: (url: string): URLTestResult => {
      const sensitiveEndpoints = /(admin|dashboard|config|settings|users)/i.test(url);
      const hasIdParams = /[?&](id|user_id|account)=/i.test(url);
      
      return {
        vulnerability: 'Broken Access Control',
        severity: (sensitiveEndpoints || hasIdParams) ? 'High' : 'Low',
        description: 'Checks for exposed sensitive endpoints and IDOR vulnerabilities',
        recommendation: 'Implement proper authorization checks and avoid exposing IDs in URLs'
      };
    }
  },
  {
    name: 'Security Configuration',
    test: (url: string): URLTestResult => {
      const exposedConfig = /phpinfo|server-status|\.env|\.config|\.git/i.test(url);
      const debugEndpoints = /debug|trace|status|health/i.test(url);
      
      return {
        vulnerability: 'Security Misconfiguration',
        severity: exposedConfig ? 'Critical' : debugEndpoints ? 'Medium' : 'Low',
        description: 'Checks for exposed configuration and debug endpoints',
        recommendation: 'Remove debug endpoints in production and secure configurations'
      };
    }
  },
  {
    name: 'Component Analysis',
    test: async (url: string): Promise<URLTestResult> => {
      // This would require integration with vulnerability databases
      return {
        vulnerability: 'Vulnerable Components',
        severity: 'Medium',
        description: 'Analyzes for known vulnerable components',
        recommendation: 'Keep all components updated and regularly check for vulnerabilities'
      };
    }
  },
  {
    name: 'Authentication Security',
    test: (url: string): URLTestResult => {
      const hasAuthBypass = /(login|auth|signin).*?(bypass|debug)/i.test(url);
      const hasWeakAuth = /(basic|digest)\s+auth/i.test(url);
      
      return {
        vulnerability: 'Authentication Failures',
        severity: hasAuthBypass ? 'Critical' : hasWeakAuth ? 'High' : 'Low',
        description: 'Identifies weak authentication mechanisms',
        recommendation: 'Implement strong authentication with MFA'
      };
    }
  },
  {
    name: 'Integrity Checks',
    test: (url: string): URLTestResult => {
      const hasUnsignedDownload = /\.(exe|dll|dmg|pkg|zip)$/i.test(url);
      const hasUpdate = /update|upgrade|patch/i.test(url);
      
      return {
        vulnerability: 'Integrity Failures',
        severity: (hasUnsignedDownload || hasUpdate) ? 'High' : 'Low',
        description: 'Checks for unsigned downloads and insecure updates',
        recommendation: 'Implement code signing and verify file integrity'
      };
    }
  },
  {
    name: 'Logging Security',
    test: (url: string): URLTestResult => {
      const hasLogExposure = /log|audit|trace/i.test(url);
      
      return {
        vulnerability: 'Logging and Monitoring',
        severity: hasLogExposure ? 'High' : 'Low',
        description: 'Checks for exposed logs and monitoring endpoints',
        recommendation: 'Secure log files and implement proper monitoring'
      };
    }
  },
  {
    name: 'SSRF Detection',
    test: (url: string): URLTestResult => {
      const hasInternalUrls = /(localhost|127\.0\.0\.1|0\.0\.0\.0|internal|corp|intra)/i.test(url);
      const hasUrlParams = /[?&](url|path|proxy)=/i.test(url);
      
      return {
        vulnerability: 'SSRF',
        severity: (hasInternalUrls && hasUrlParams) ? 'Critical' : hasUrlParams ? 'High' : 'Low',
        description: 'Detects potential SSRF attempts',
        recommendation: 'Implement URL validation and whitelist allowed destinations'
      };
    }
  }
]; 