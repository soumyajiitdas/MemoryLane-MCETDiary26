import React from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = ({ value, onChange, placeholder = "Search...", className = "", onClear }) => {
  return (
    <div className={`relative group ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400 group-focus-within:text-[var(--color-amber)] transition-colors" />
      </div>
      
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="block w-full pl-11 pr-10 py-3 bg-[var(--color-surface)] border border-[var(--color-glass-border)] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-amber-glow)] focus:border-[var(--color-amber)] transition-all glass hover:bg-[#1a1a24]"
      />
      
      {value && onClear && (
        <button
          onClick={onClear}
          className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
