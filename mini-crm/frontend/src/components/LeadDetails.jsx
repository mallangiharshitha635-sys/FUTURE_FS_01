import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { X, Trash2 } from 'lucide-react';

export default function LeadDetails({ lead: initialLead, onClose, onUpdate }) {
  const [lead, setLead] = useState(initialLead);
  const [newNote, setNewNote] = useState('');
  const [loading, setLoading] = useState(false);

  // Sync state if initialLead changes
  useEffect(() => {
    setLead(initialLead);
  }, [initialLead]);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    try {
      const res = await api.put(`/leads/${lead._id}`, { status: newStatus });
      setLead({ ...lead, status: res.data.status });
      onUpdate();
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    setLoading(true);
    try {
      const res = await api.post(`/leads/${lead._id}/notes`, { text: newNote });
      setLead(res.data);
      setNewNote('');
    } catch (err) {
      console.error('Error adding note:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      try {
        await api.delete(`/leads/${lead._id}`);
        onUpdate();
        onClose();
      } catch (err) {
        console.error('Error deleting lead:', err);
      }
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '36rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{lead.name}</h2>
            <p style={{ color: 'var(--text-muted)' }}>{lead.email}</p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="icon-btn" style={{ color: '#dc2626' }} onClick={handleDelete} title="Delete Lead">
              <Trash2 size={20} />
            </button>
            <button onClick={onClose} className="icon-btn"><X size={20} /></button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', background: '#f9fafb', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1.5rem', border: '1px solid var(--border)' }}>
          <div>
            <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: '600' }}>Source</p>
            <p style={{ fontWeight: '500' }}>{lead.source}</p>
          </div>
          <div>
            <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: '600' }}>Status</p>
            <select className="input" style={{ marginTop: '0.25rem' }} value={lead.status} onChange={handleStatusChange}>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="converted">Converted</option>
            </select>
          </div>
        </div>

        <div>
          <h3 style={{ fontWeight: '600', marginBottom: '1rem' }}>Notes & Activity</h3>
          
          <form onSubmit={handleAddNote} style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.5rem' }}>
            <input 
              type="text" 
              className="input" 
              placeholder="Add a new note..." 
              value={newNote}
              onChange={e => setNewNote(e.target.value)}
            />
            <button type="submit" className="btn btn-primary" disabled={loading || !newNote.trim()}>Add</button>
          </form>

          <div style={{ maxHeight: '200px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {lead.notes && lead.notes.length > 0 ? (
              lead.notes.map((note, idx) => (
                <div key={idx} style={{ background: '#f9fafb', padding: '0.75rem', borderRadius: '0.375rem', border: '1px solid var(--border)' }}>
                  <p style={{ fontSize: '0.875rem' }}>{note.text}</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                    {new Date(note.date).toLocaleString()}
                  </p>
                </div>
              ))
            ) : (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', textAlign: 'center', padding: '1rem' }}>No notes yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
