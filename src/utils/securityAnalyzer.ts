export async function analyzeURL(url: string) {
  const results = [];
  
  for (const test of urlSecurityTests) {
    try {
      const result = test.test(url);
      results.push({
        testName: test.name,
        ...result
      });
    } catch (error) {
      console.error(`Error running ${test.name}:`, error);
    }
  }

  return {
    url,
    timestamp: new Date().toISOString(),
    results: results,
    overallRisk: calculateOverallRisk(results)
  };
}

function calculateOverallRisk(results: URLTestResult[]) {
  const severityScores = {
    'Critical': 4,
    'High': 3,
    'Medium': 2,
    'Low': 1
  };

  const totalScore = results.reduce((score, result) => 
    score + severityScores[result.severity], 0);
  
  return {
    score: Math.min(100, (totalScore / (results.length * 4)) * 100),
    level: totalScore > 10 ? 'High' : totalScore > 5 ? 'Medium' : 'Low'
  };
} 