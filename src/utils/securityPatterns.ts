export const securityPatterns = {
  xss: {
    basic: [
      /<script[^>]*>[\s\S]*?<\/script>/i,
      /javascript:/i,
      /onerror\s*=\s*['"]/i,
      /onload\s*=\s*['"]/i,
      /onclick\s*=\s*['"]/i,
      /onmouseover\s*=\s*['"]/i
    ],
    advanced: [
      /data:(?:text|image)\/[^,]+,/i,
      /expression\s*\([^)]*\)/i,
      /vbscript:/i,
      /-moz-binding[\s\S]*?:/i
    ]
  },
  sqlInjection: {
    basic: [
      /'.*OR.*'1'.*='1/i,
      /union.*select/i,
      /';.*--/i
    ],
    advanced: [
      /exec(\s|\+)+(x?p\w+)/i,
      /UNION(\s|\+)+ALL(\s|\+)+SELECT/i,
      /LOAD_FILE\s*\(/i,
      /INTO(\s|\+)+OUTFILE/i
    ]
  },
  pathTraversal: {
    patterns: [
      /\.\.[\/\\]/,
      /%2e%2e[\/\\]/i,
      /\.\.%2f/i,
      /%252e%252e%252f/i
    ]
  },
  commandInjection: {
    patterns: [
      /;\s*[\w\-]+/i,
      /\|\s*[\w\-]+/i,
      /`[\w\-]+`/i,
      /\$\([\w\-]+\)/i
    ]
  }
}; 