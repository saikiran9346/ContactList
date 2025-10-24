import React from 'react';
import { ArrowUpDown } from 'lucide-react';

const SortControls = ({ sortBy, setSortBy, sortDirection, setSortDirection }) => {
  return (
    <div className="sort-controls">
      <select
        aria-label="Sort by"
        className="sort-select"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="name">Name</option>
        <option value="email">Email</option>
        <option value="phone">Phone</option>
      </select>
      <button
        type="button"
        className="sort-direction"
        onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
        aria-label={`Sort ${sortDirection === 'asc' ? 'descending' : 'ascending'}`}
        title={`Sort ${sortDirection === 'asc' ? 'descending' : 'ascending'}`}
      >
        <ArrowUpDown size={18} />
        <span className="sort-direction-label">{sortDirection === 'asc' ? 'Asc' : 'Desc'}</span>
      </button>
    </div>
  );
};

export default SortControls;