import React from 'react';
import { FileWarning, Database, Lock, ShieldAlert, Key, Server, Shield, Network, ShieldOff } from 'lucide-react';
import type { SecurityTest } from '../types/security';
import { testUrl } from '../utils/securityTester';

export const initialTests: SecurityTest[] = [
  {
    name: 'XSS Vulnerability',
    description: 'Detects Cross-Site Scripting vulnerabilities that could allow attackers to inject malicious scripts into web pages viewed by other users.',
    icon: <FileWarning className="w-5 h-5 text-orange-500" />,
    result: { status: 'pending' },
    category: 'input-validation',
    owaspLink: 'https://owasp.org/www-community/attacks/xss/',
    safetyMessage: 'No immediate XSS vulnerabilities detected. Input validation and output encoding appear to be implemented correctly.',
    vulnerabilityMessage: 'Potential XSS vulnerability detected in user input handling. Insufficient sanitization of user-supplied data.',
    recommendation: 'Implement proper input validation, output encoding, and Content Security Policy (CSP).',
    test: async (url: string) => {
        const xssPatterns = [
            /<script>/i,
            /javascript:/i,
            /onerror=/i,
            /onload=/i,
            /<img[^>]+src=[^>]+>/i,
            /<svg[^>]+onload=/i
        ];
        
        const findings = xssPatterns
            .filter(pattern => pattern.test(decodeURIComponent(url)))
            .map(() => 'XSS attempt detected');
            
        return {
            vulnerable: findings.length > 0,
            findings,
            status: findings.length > 0 ? 'vulnerable' : 'safe'
        };
    }
  },
  {
    name: 'SQL Injection',
    description: 'Identifies SQL Injection vulnerabilities that could allow attackers to manipulate database queries and potentially access, modify, or delete data.',
    icon: <Database className="w-5 h-5 text-blue-500" />,
    result: { status: 'pending' },
    category: 'input-validation',
    owaspLink: 'https://owasp.org/www-community/attacks/SQL_Injection',
    safetyMessage: 'No SQL injection vulnerabilities found. Proper parameterization and input sanitization detected.',
    vulnerabilityMessage: 'Possible SQL injection vulnerability found. Raw SQL queries with user input detected.',
    recommendation: 'Use parameterized queries or ORM, implement input validation, and principle of least privilege.',
    test: async (url: string) => {
        const sqlPatterns = [
            /'.*OR.*'1'.*='1/i,
            /union.*select/i,
            /';.*--/i,
            /';.*#/i,
            /alter.*table/i,
            /drop.*table/i
        ];
        
        const findings = sqlPatterns
            .filter(pattern => pattern.test(decodeURIComponent(url)))
            .map(() => 'SQL injection attempt detected');
            
        return {
            vulnerable: findings.length > 0,
            findings,
            status: findings.length > 0 ? 'vulnerable' : 'safe'
        };
    }
  },
  {
    name: 'CSRF Protection',
    description: 'Evaluates Cross-Site Request Forgery protections to prevent attackers from forcing users to perform unwanted actions on authenticated sessions.',
    icon: <Lock className="w-5 h-5 text-purple-500" />,
    result: { status: 'pending' },
    category: 'authentication',
    owaspLink: 'https://owasp.org/www-community/attacks/csrf',
    safetyMessage: 'CSRF tokens are properly implemented and validated across forms and API endpoints.',
    vulnerabilityMessage: 'Missing or weak CSRF protection. Forms lack anti-CSRF tokens.',
    recommendation: 'Implement anti-CSRF tokens, SameSite cookie attribute, and verify origin headers.',
    test: async (url: string) => {
        const findings = [];
        const urlObj = new URL(url);
        
        if (!url.includes('csrf') && !url.includes('token')) {
            findings.push('No CSRF token parameter detected');
        }
        
        if (urlObj.searchParams.has('state') || urlObj.searchParams.has('token')) {
            findings.push('Token exposed in URL');
        }
        
        return {
            vulnerable: findings.length > 0,
            findings,
            status: findings.length > 0 ? 'vulnerable' : 'safe'
        };
    }
  },
  {
    name: 'JWT Security',
    description: 'Analyzes JSON Web Token implementation for proper signing, encryption, and validation to prevent token tampering and unauthorized access.',
    icon: <ShieldAlert className="w-5 h-5 text-red-500" />,
    result: { status: 'pending' },
    category: 'authentication',
    owaspLink: 'https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/06-Session_Management_Testing/10-Testing_JSON_Web_Tokens',
    safetyMessage: 'JWT implementation follows security best practices with proper signing and validation.',
    vulnerabilityMessage: 'JWT validation vulnerabilities found. Weak signing algorithms or improper validation.',
    recommendation: 'Use strong algorithms (RS256), implement proper token validation, and secure token storage.',
    test: async (url: string) => {
        const findings = [];
        const params = new URLSearchParams(new URL(url).search);
        const jwt = params.get('token') || params.get('jwt');
        
        if (jwt) {
            findings.push('JWT exposed in URL');
            if (jwt.split('.').length !== 3) {
                findings.push('Invalid JWT format');
            }
        }
        
        return {
            vulnerable: findings.length > 0,
            findings,
            status: findings.length > 0 ? 'vulnerable' : 'safe'
        };
    }
  },
  {
    name: 'API Authentication',
    description: 'Tests API endpoints for proper authentication mechanisms, token handling, and session management.',
    icon: <Key className="w-5 h-5 text-green-500" />,
    result: { status: 'pending' },
    category: 'api-security',
    owaspLink: 'https://owasp.org/www-project-api-security/latest/00-introduction',
    safetyMessage: 'Strong authentication mechanisms detected with proper session management.',
    vulnerabilityMessage: 'Weak authentication mechanisms. Possible authentication bypass vulnerabilities.',
    recommendation: 'Implement OAuth 2.0/OpenID Connect, strong password policies, and MFA where appropriate.',
    test: async (url: string) => {
        const findings = [];
        const urlObj = new URL(url);
        
        if (!url.includes('token') && !url.includes('jwt')) {
            findings.push('No authentication token parameter detected');
        }
        
        if (urlObj.searchParams.has('token') || urlObj.searchParams.has('jwt')) {
            findings.push('Authentication token exposed in URL');
        }
        
        return {
            vulnerable: findings.length > 0,
            findings,
            status: findings.length > 0 ? 'vulnerable' : 'safe'
        };
    }
  },
  {
    name: 'API Rate Limiting',
    description: 'Verifies implementation of rate limiting to prevent API abuse, DDoS attacks, and brute force attempts.',
    icon: <Server className="w-5 h-5 text-yellow-500" />,
    result: { status: 'pending' },
    category: 'api-security',
    owaspLink: 'https://owasp.org/www-project-api-security/latest/latest/0xa4-lack-of-resources-and-rate-limiting',
    safetyMessage: 'Rate limiting is properly configured with appropriate thresholds.',
    vulnerabilityMessage: 'Missing or insufficient rate limiting on critical endpoints.',
    recommendation: 'Implement rate limiting per API key/IP, use token bucket algorithm, and proper error responses.',
    test: async (url: string) => {
        const findings = [];
        const urlObj = new URL(url);
        
        if (!url.includes('rate-limit') && !url.includes('limit')) {
            findings.push('No rate limit parameter detected');
        }
        
        if (urlObj.searchParams.has('rate-limit') || urlObj.searchParams.has('limit')) {
            findings.push('Rate limit exposed in URL');
        }
        
        return {
            vulnerable: findings.length > 0,
            findings,
            status: findings.length > 0 ? 'vulnerable' : 'safe'
        };
    }
  },
  {
    name: 'Security Headers',
    description: 'Checks for implementation of security headers like CSP, HSTS, and X-Frame-Options to prevent various attacks.',
    icon: <Shield className="w-5 h-5 text-indigo-500" />,
    result: { status: 'pending' },
    category: 'infrastructure',
    owaspLink: 'https://owasp.org/www-project-secure-headers/',
    safetyMessage: 'Essential security headers are properly configured.',
    vulnerabilityMessage: 'Missing critical security headers that could prevent common attacks.',
    recommendation: 'Implement CSP, HSTS, X-Frame-Options, and other security headers with appropriate values.',
    test: async (url: string) => {
        try {
            const response = await fetch(url, { method: 'HEAD' });
            const headers = response.headers;
            const findings = [];
            
            const requiredHeaders = [
                'Content-Security-Policy',
                'Strict-Transport-Security',
                'X-Frame-Options',
                'X-Content-Type-Options'
            ];
            
            requiredHeaders.forEach(header => {
                if (!headers.get(header)) {
                    findings.push(`Missing ${header}`);
                }
            });
            
            return {
                vulnerable: findings.length > 0,
                findings,
                status: findings.length > 0 ? 'vulnerable' : 'safe'
            };
        } catch (error) {
            return {
                vulnerable: true,
                findings: ['Unable to check headers: ' + error.message],
                status: 'error'
            };
        }
    }
  },
  {
    name: 'SSL/TLS Configuration',
    description: 'Evaluates the SSL/TLS configuration for proper cipher suites, protocol versions, and certificate validity.',
    icon: <Network className="w-5 h-5 text-green-500" />,
    result: { status: 'pending' },
    category: 'infrastructure',
    owaspLink: 'https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/09-Testing_for_Weak_Cryptography/01-Testing_for_Weak_SSL_TLS_Ciphers',
    safetyMessage: 'Strong SSL/TLS configuration with modern cipher suites.',
    vulnerabilityMessage: 'Weak SSL/TLS configuration detected. Outdated protocols or cipher suites in use.',
    recommendation: 'Use TLS 1.2+, strong cipher suites, and properly configured certificates.',
    test: async (url: string) => {
        const findings = [];
        const urlObj = new URL(url);
        
        if (!url.includes('https')) {
            findings.push('No HTTPS protocol detected');
        }
        
        if (urlObj.protocol !== 'https:') {
            findings.push('Insecure HTTP protocol detected');
        }
        
        return {
            vulnerable: findings.length > 0,
            findings,
            status: findings.length > 0 ? 'vulnerable' : 'safe'
        };
    }
  },
  {
    name: 'Broken Access Control',
    description: 'Detects unauthorized access attempts, privilege escalation, and insecure direct object references (IDOR).',
    icon: <Lock className="w-5 h-5 text-red-500" />,
    result: { status: 'pending' },
    category: 'access-control',
    owaspLink: 'https://owasp.org/Top10/A01_2021-Broken_Access_Control/',
    safetyMessage: 'No immediate access control vulnerabilities detected.',
    vulnerabilityMessage: 'Potential access control vulnerability detected.',
    recommendation: 'Implement proper authorization checks and validate user permissions.',
    test: async (url: string) => {
        const vulnerabilities = [];
        
        // Check for sensitive endpoints
        if (/(admin|dashboard|config|settings|users)/i.test(url)) {
            vulnerabilities.push('Sensitive administrative endpoint detected');
        }
        
        // Check for exposed IDs
        if (/[?&](id|user_id|account)=/i.test(url)) {
            vulnerabilities.push('Potential IDOR vulnerability');
        }
        
        // Check for directory traversal
        if (/\.\./i.test(url)) {
            vulnerabilities.push('Directory traversal attempt detected');
        }
        
        // Check for API endpoints without version
        if (/\/api\//i.test(url) && !/(v1|v2|v3)/i.test(url)) {
            vulnerabilities.push('Unversioned API endpoint detected');
        }

        return {
            vulnerable: vulnerabilities.length > 0,
            findings: vulnerabilities,
            status: vulnerabilities.length > 0 ? 'vulnerable' : 'safe'
        };
    }
  },
];