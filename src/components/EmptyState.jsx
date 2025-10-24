import React from 'react';
import { UserCircle } from 'lucide-react';

const EmptyState = ({ searchQuery }) => {
  return (
    <div className="empty-state">
      <UserCircle size={64} className="empty-state-icon" />
      <p className="empty-state-title">
        {searchQuery ? 'No contacts found' : 'No contacts yet'}
      </p>
      <p className="empty-state-subtitle">
        {searchQuery ? 'Try a different search term' : 'Add your first contact to get started'}
      </p>
    </div>
  );
};

export default EmptyState;