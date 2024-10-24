import React from 'react';
import { Code, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center mb-4">
            <Code size={24} className="mr-2" />
            <span className="text-xl font-semibold">No-Code Platform Rankings</span>
          </div>
          <p className="text-gray-400 text-center max-w-md mb-6">
            Empowering creators to build software without writing code
          </p>
          <div className="flex items-center text-sm text-gray-500">
            <span>Made with</span>
            <Heart size={16} className="mx-1 text-red-500" />
            <span>by the no-code community</span>
          </div>
        </div>
      </div>
    </footer>
  );
};