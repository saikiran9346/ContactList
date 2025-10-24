import React, { useState } from 'react';
import { Phone, Mail, X, Pencil, Check, XCircle } from 'lucide-react';

const ContactCard = ({ contact, onDelete, onUpdate }) => {
  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getAvatarColor = (id) => {
    const colors = [
      '#3b82f6', // blue
      '#8b5cf6', // purple
      '#ec4899', // pink
      '#10b981', // green
      '#f59e0b', // orange
      '#14b8a6', // teal
    ];
    return colors[id % colors.length];
  };

  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState({ name: contact.name || '', phone: contact.phone || '', email: contact.email || '' });

  const save = () => {
    const trimmed = {
      name: (draft.name || '').trim(),
      phone: (draft.phone || '').trim(),
      email: (draft.email || '').trim(),
    };
    onUpdate(contact.id, trimmed);
    setIsEditing(false);
  };

  const cancel = () => {
    setDraft({ name: contact.name || '', phone: contact.phone || '', email: contact.email || '' });
    setIsEditing(false);
  };

  return (
    <div className="contact-card">
      <div className="contact-card-content">
        {/* Avatar */}
        <div 
          className="contact-avatar"
          style={{ backgroundColor: getAvatarColor(contact.id) }}
        >
          {getInitials(contact.name)}
        </div>
        
        {/* Contact Info */}
        <div className="contact-info">
          {isEditing ? (
            <div className="edit-fields">
              <input
                className="edit-input"
                value={draft.name}
                onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                placeholder="Full name"
              />
              <div className="contact-details">
                <div className="contact-detail-item">
                  <Phone size={16} />
                  <input
                    className="edit-input"
                    value={draft.phone}
                    onChange={(e) => setDraft({ ...draft, phone: e.target.value })}
                    placeholder="Phone"
                  />
                </div>
                <span className="detail-separator">•</span>
                <div className="contact-detail-item">
                  <Mail size={16} />
                  <input
                    className="edit-input"
                    value={draft.email}
                    onChange={(e) => setDraft({ ...draft, email: e.target.value })}
                    placeholder="Email"
                  />
                </div>
              </div>
            </div>
          ) : (
            <>
              <h3 className="contact-name">{contact.name}</h3>
              <div className="contact-details">
                <div className="contact-detail-item">
                  <Phone size={16} />
                  <span>{contact.phone}</span>
                </div>
                {contact.email && (
                  <>
                    <span className="detail-separator">•</span>
                    <div className="contact-detail-item">
                      <Mail size={16} />
                      <span>{contact.email}</span>
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </div>

        {/* Action Buttons */}
        <div className="card-actions">
          {isEditing ? (
            <>
              <button className="icon-button success" aria-label="Save" onClick={save}>
                <Check size={20} />
              </button>
              <button className="icon-button" aria-label="Cancel" onClick={cancel}>
                <XCircle size={20} />
              </button>
            </>
          ) : (
            <>
              <button
                className="icon-button"
                aria-label="Edit contact"
                onClick={() => setIsEditing(true)}
              >
                <Pencil size={20} />
              </button>
              <button
                onClick={() => onDelete(contact.id)}
                className="delete-button"
                aria-label="Delete contact"
              >
                <X size={20} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactCard;