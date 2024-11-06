import React from 'react';

interface TestCategoriesProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

export default function TestCategories({ activeCategory, setActiveCategory }: TestCategoriesProps) {
  const categories = [
    { id: 'all', name: 'All Tests' },
    { id: 'input-validation', name: 'Input Validation' },
    { id: 'authentication', name: 'Authentication' },
    { id: 'api-security', name: 'API Security' },
    { id: 'infrastructure', name: 'Infrastructure' }
  ];

  return (
    <div className="mb-6">
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeCategory === category.id
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}