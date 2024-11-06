import React, { useState, useEffect } from 'react';
import { Shield } from 'lucide-react';
import UrlInput from './UrlInput';
import TestCategories from './TestCategories';
import TestResults from './TestResults';
import ShareResults from './ShareResults';
import UrlHistory from './UrlHistory';
import { initialTests } from '../data/initialTests';
import type { SecurityTest, TestResult } from '../types/security';

export default function SecurityDashboard() {
  const [targetUrl, setTargetUrl] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [tests, setTests] = useState<SecurityTest[]>(initialTests);
  const [urlHistory, setUrlHistory] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  useEffect(() => {
    const savedHistory = localStorage.getItem('urlHistory');
    if (savedHistory) {
      setUrlHistory(JSON.parse(savedHistory));
    }
  }, []);

  const runTests = async () => {
    if (!targetUrl) return;

    setIsScanning(true);
    setTests(initialTests);

    for (let i = 0; i < initialTests.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setTests(prev => prev.map((test, index) => {
        if (index === i) {
          const severity = Math.random() > 0.6 ? 'high' : Math.random() > 0.3 ? 'medium' : 'low';
          const isSuccess = Math.random() > 0.3;
          return {
            ...test,
            result: {
              ...test.result,
              status: isSuccess ? 'success' : 'failed',
              severity,
              details: isSuccess 
                ? test.safetyMessage
                : test.vulnerabilityMessage,
              recommendation: test.recommendation
            }
          };
        }
        return test;
      }));
    }

    const newHistory = [targetUrl, ...urlHistory.filter(url => url !== targetUrl)].slice(0, 5);
    setUrlHistory(newHistory);
    localStorage.setItem('urlHistory', JSON.stringify(newHistory));
    setIsScanning(false);
  };

  const filteredTests = activeCategory === 'all' 
    ? tests 
    : tests.filter(test => test.category === activeCategory);

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Security Testing Tool</h1>
          </div>
          
          <UrlInput
            targetUrl={targetUrl}
            setTargetUrl={setTargetUrl}
            isScanning={isScanning}
            onScan={runTests}
          />

          <UrlHistory
            urlHistory={urlHistory}
            setTargetUrl={setTargetUrl}
          />

          <TestCategories
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />

          <TestResults tests={filteredTests} />
        </div>

        {!isScanning && tests.some(test => test.result.status !== 'pending') && (
          <ShareResults targetUrl={targetUrl} tests={tests} />
        )}
      </div>
    </div>
  );
}