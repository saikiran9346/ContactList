import React, { useState, useMemo } from 'react';
import SearchBar from './components/SearchBar';
import AddContactForm from './components/AddContactForm';
import ContactList from './components/ContactList';
import EmptyState from './components/EmptyState';
import SortControls from './components/SortControls';
import { Plus } from 'lucide-react';
import { useLocalStorage } from './hooks/useLocalStorage';
import './App.css';
function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', [
    { id: 1, name: 'Alice Johnson', phone: '+1 (555) 123-4567', email: 'alice.j@email.com' },
    { id: 2, name: 'Bob Smith', phone: '+1 (555) 234-5678', email: 'bob.smith@email.com' },
    { id: 3, name: 'Carol Williams', phone: '+1 (555) 345-6789', email: 'carol.w@email.com' },
    { id: 4, name: 'David Brown', phone: '+1 (555) 456-7890', email: 'david.b@email.com' },
    { id: 5, name: 'Emma Davis', phone: '+1 (555) 567-8901', email: 'emma.davis@email.com' },
  ]);
  const [searchQuery, setSearchQuery] = useLocalStorage('searchQuery', '');
  const [isAddingContact, setIsAddingContact] = useState(false);
  const [sortBy, setSortBy] = useLocalStorage('sortBy', 'name');
  const [sortDirection, setSortDirection] = useLocalStorage('sortDirection', 'asc');

  const normalizePhone = (value) => (value || '').replace(/\D/g, '');
  const normalizedQuery = (searchQuery || '').toLowerCase().trim();

  // Efficient search and sorting using useMemo
  const filteredContacts = useMemo(() => {
    const list = contacts.filter((contact) => {
      if (!normalizedQuery) return true;
      const inName = (contact.name || '').toLowerCase().includes(normalizedQuery);
      const inEmail = (contact.email || '').toLowerCase().includes(normalizedQuery);
      const qDigits = normalizedQuery.replace(/\D/g, '');
      const inPhone = qDigits
        ? normalizePhone(contact.phone).includes(qDigits)
        : (contact.phone || '').toLowerCase().includes(normalizedQuery);
      return inName || inEmail || inPhone;
    });

    const getField = (c) => {
      if (sortBy === 'name') return c.name || '';
      if (sortBy === 'email') return c.email || '';
      if (sortBy === 'phone') return normalizePhone(c.phone || '');
      return c.name || '';
    };

    return list.slice().sort((a, b) => {
      const aVal = getField(a);
      const bVal = getField(b);
      const cmp = String(aVal).localeCompare(String(bVal), 'en', { sensitivity: 'base' });
      return sortDirection === 'asc' ? cmp : -cmp;
    });
  }, [contacts, normalizedQuery, sortBy, sortDirection]);

  const handleAddContact = (newContact) => {
    setContacts([...contacts, { ...newContact, id: Date.now() }]);
    setIsAddingContact(false);
  };

  const handleUpdateContact = (id, updates) => {
    setContacts(contacts.map((c) => (c.id === id ? { ...c, ...updates } : c)));
  };

  const handleDeleteContact = (id) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  return (
    <div className="app-container">
      <div className="app-content">
        {/* Header */}
        <div className="app-header">
          <h1 className="app-title">Contact List</h1>
          <p className="app-subtitle">Manage your contacts efficiently</p>
        </div>

        {/* Search and Add Section */}
        <div className="search-add-section">
          <SearchBar 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
          />
          <SortControls 
            sortBy={sortBy}
            setSortBy={setSortBy}
            sortDirection={sortDirection}
            setSortDirection={setSortDirection}
          />
          <button
            onClick={() => setIsAddingContact(!isAddingContact)}
            className="add-button"
          >
            <Plus size={20} />
            <span>Add Contact</span>
          </button>
        </div>

        {/* Add Contact Form */}
        {isAddingContact && (
          <AddContactForm 
            onAddContact={handleAddContact}
            onClose={() => setIsAddingContact(false)}
            existingContacts={contacts}
          />
        )}

        {/* Contact List */}
        <div className="contacts-container">
          {filteredContacts.length === 0 ? (
            <EmptyState searchQuery={searchQuery} />
          ) : (
            <ContactList 
              contacts={filteredContacts} 
              onDeleteContact={handleDeleteContact}
              onUpdateContact={handleUpdateContact}
            />
          )}
        </div>

        {/* Footer Stats */}
        <div className="footer-stats">
          Showing {filteredContacts.length} of {contacts.length} contacts
        </div>
      </div>
    </div>
  );
}

export default App;