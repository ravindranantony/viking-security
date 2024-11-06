import React from 'react';
import { FileWarning, Database, Lock, ShieldAlert, Key, Server, Shield, Network } from 'lucide-react';
import type { SecurityTest } from '../types/security';

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
    recommendation: 'Implement proper input validation, output encoding, and Content Security Policy (CSP).'
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
    recommendation: 'Use parameterized queries or ORM, implement input validation, and principle of least privilege.'
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
    recommendation: 'Implement anti-CSRF tokens, SameSite cookie attribute, and verify origin headers.'
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
    recommendation: 'Use strong algorithms (RS256), implement proper token validation, and secure token storage.'
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
    recommendation: 'Implement OAuth 2.0/OpenID Connect, strong password policies, and MFA where appropriate.'
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
    recommendation: 'Implement rate limiting per API key/IP, use token bucket algorithm, and proper error responses.'
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
    recommendation: 'Implement CSP, HSTS, X-Frame-Options, and other security headers with appropriate values.'
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
    recommendation: 'Use TLS 1.2+, strong cipher suites, and properly configured certificates.'
  }
];