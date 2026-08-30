import React from 'react';

export const SectionDivider: React.FC = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="relative w-full h-px border-t border-dashed border-laravel/35">
        <div className="absolute -top-[4px] left-0 w-[7px] h-[7px] bg-laravel rounded-[1px]"></div>
        <div className="absolute -top-[4px] right-0 w-[7px] h-[7px] bg-laravel rounded-[1px]"></div>
      </div>
    </div>
  );
};
