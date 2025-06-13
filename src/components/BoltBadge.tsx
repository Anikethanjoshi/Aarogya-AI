import React from 'react';

const BoltBadge: React.FC = () => {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <a
        href="https://bolt.new"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center px-3 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
      >
        <svg
          className="w-4 h-4 mr-2"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
            fill="currentColor"
          />
        </svg>
        Built on Bolt
      </a>
    </div>
  );
};

export default BoltBadge;