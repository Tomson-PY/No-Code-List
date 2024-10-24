import React from 'react';
import { Code2 } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center mb-6">
          <Code2 size={48} className="mr-4" />
          <h1 className="text-5xl font-bold">No-Code Tools Tier List</h1>
        </div>
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-lg text-indigo-100">
            Discover and rate the best no-code platforms for building your next project.
            From web apps to automation, find the perfect tool for your needs.
          </p>
          <div className="flex justify-center gap-4 mt-6">
            {['A', 'B', 'C', 'D'].map((tier) => (
              <div key={tier} className="bg-white/10 px-4 py-2 rounded-full">
                <span className="text-sm font-semibold">Tier {tier}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};