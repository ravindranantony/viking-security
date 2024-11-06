import { ReactNode } from 'react';

export interface TestResult {
  status: 'pending' | 'running' | 'success' | 'failed';
  details?: string;
  severity?: 'low' | 'medium' | 'high';
  recommendation?: string;
}

export interface SecurityTest {
  name: string;
  description: string;
  icon: ReactNode;
  result: TestResult;
  category: 'input-validation' | 'authentication' | 'api-security' | 'infrastructure';
  owaspLink: string;
  safetyMessage: string;
  vulnerabilityMessage: string;
  recommendation: string;
}