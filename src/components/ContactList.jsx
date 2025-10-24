import React from 'react';
import ContactCard from './ContactCard';

const ContactList = ({ contacts, onDeleteContact, onUpdateContact }) => {
  return (
    <div className="contact-list">
      {contacts.map((contact) => (
        <ContactCard 
          key={contact.id} 
          contact={contact} 
          onDelete={onDeleteContact}
          onUpdate={onUpdateContact}
        />
      ))}
    </div>
  );
};

export default ContactList;