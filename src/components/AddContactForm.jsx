import React, { useMemo, useState } from 'react';
import { X } from 'lucide-react';

const AddContactForm = ({ onAddContact, onClose, existingContacts = [] }) => {
  const [newContact, setNewContact] = useState({ name: '', phone: '', email: '' });
  const [errors, setErrors] = useState({});

  const normalizedExisting = useMemo(() => {
    const normalizePhone = (v) => (v || '').replace(/\D/g, '');
    return existingContacts.map((c) => ({
      name: (c.name || '').trim().toLowerCase(),
      email: (c.email || '').trim().toLowerCase(),
      phone: normalizePhone(c.phone || ''),
    }));
  }, [existingContacts]);

  const validate = () => {
    const nextErrors = {};
    const name = newContact.name.trim();
    const email = (newContact.email || '').trim();
    const phone = (newContact.phone || '').trim();

    if (!name) nextErrors.name = 'Name is required';
    if (!phone) nextErrors.phone = 'Phone is required';
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = 'Enter a valid email';
    }

    const phoneDigits = phone.replace(/\D/g, '');
    const nameLower = name.toLowerCase();
    const emailLower = email.toLowerCase();

    const isDuplicate = normalizedExisting.some(
      (c) => c.name === nameLower || (!!emailLower && c.email === emailLower) || (!!phoneDigits && c.phone === phoneDigits)
    );
    if (isDuplicate) {
      nextErrors.duplicate = 'A contact with same name, email, or phone exists';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onAddContact({
      name: newContact.name.trim(),
      phone: newContact.phone.trim(),
      email: newContact.email.trim(),
    });
    setNewContact({ name: '', phone: '', email: '' });
  };

  return (
    <div className="add-contact-form">
      <div className="form-header">
        <h2 className="form-title">New Contact</h2>
        <button onClick={onClose} className="close-button">
          <X size={20} />
        </button>
      </div>
      
      <div className="form-fields">
        <div className="form-group">
          <label className="form-label">Name *</label>
          <input
            type="text"
            value={newContact.name}
            onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
            className="form-input"
            placeholder="John Doe"
          />
          {errors.name && <p className="form-error">{errors.name}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">Phone *</label>
          <input
            type="tel"
            value={newContact.phone}
            onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
            className="form-input"
            placeholder="+1 (555) 000-0000"
          />
          {errors.phone && <p className="form-error">{errors.phone}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            type="email"
            value={newContact.email}
            onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
            className="form-input"
            placeholder="john@example.com"
          />
          {errors.email && <p className="form-error">{errors.email}</p>}
        </div>

        {errors.duplicate && <p className="form-error">{errors.duplicate}</p>}

        <button onClick={handleSubmit} className="submit-button">
          Add Contact
        </button>
      </div>
    </div>
  );
};

export default AddContactForm;