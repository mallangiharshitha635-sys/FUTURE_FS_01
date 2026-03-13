import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import { LayoutDashboard, Users, Settings, LogOut, Plus, Search, MoreVertical } from 'lucide-react';
import LeadForm from '../components/LeadForm';
import LeadDetails from '../components/LeadDetails';

export default function Dashboard() {
  const { logout } = useContext(AuthContext);
  const [leads, setLeads] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [editingLead, setEditingLead] = useState(null);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await api.get('/leads');
      setLeads(res.data);
    } catch (err) {
      console.error('Error fetching leads:', err);
    }
  };

  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    lead.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusClass = (status) => {
    switch(status) {
      case 'new': return 'status-new';
      case 'contacted': return 'status-contacted';
      case 'converted': return 'status-converted';
      default: return '';
    }
  };

  return (
    <div className="layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem', padding: '0 0.5rem' }}>
          <div style={{ background: 'var(--primary)', padding: '0.5rem', borderRadius: '0.375rem', color: 'white' }}>
            <Users size={20} />
          </div>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Mini CRM</h1>
        </div>
        
        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', background: '#f3f4f6', color: 'var(--primary)', borderRadius: '0.375rem', fontWeight: '500', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
            <LayoutDashboard size={18} /> Dashboard
          </button>
          <button style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', background: 'transparent', color: 'var(--text-muted)', borderRadius: '0.375rem', fontWeight: '500', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
            <Settings size={18} /> Settings
          </button>
        </nav>

        <button onClick={logout} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', background: 'transparent', color: '#dc2626', borderRadius: '0.375rem', fontWeight: '500', border: 'none', cursor: 'pointer', textAlign: 'left', marginTop: 'auto' }}>
          <LogOut size={18} /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="header">
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Leads Overview</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ position: 'relative' }}>
              <Search style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={16} />
              <input 
                type="text" 
                placeholder="Search leads..." 
                className="input" 
                style={{ paddingLeft: '2.25rem', width: '16rem' }}
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="btn btn-primary" onClick={() => { setEditingLead(null); setIsFormOpen(true); }}>
              <Plus size={16} style={{ marginRight: '0.5rem' }} /> Add Lead
            </button>
          </div>
        </header>

        <div style={{ padding: '2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
            <div style={{ background: 'var(--surface)', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: '500' }}>Total Leads</p>
              <h3 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginTop: '0.5rem' }}>{leads.length}</h3>
            </div>
            <div style={{ background: 'var(--surface)', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: '500' }}>New Leads</p>
              <h3 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginTop: '0.5rem' }}>{leads.filter(l => l.status === 'new').length}</h3>
            </div>
            <div style={{ background: 'var(--surface)', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: '500' }}>Converted</p>
              <h3 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginTop: '0.5rem' }}>{leads.filter(l => l.status === 'converted').length}</h3>
            </div>
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Contact</th>
                  <th>Source</th>
                  <th>Status</th>
                  <th>Added</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map(lead => (
                  <tr key={lead._id} onClick={() => setSelectedLead(lead)} style={{ cursor: 'pointer' }}>
                    <td>
                      <div style={{ fontWeight: '500' }}>{lead.name}</div>
                    </td>
                    <td>
                      <div style={{ color: 'var(--text-muted)' }}>{lead.email}</div>
                    </td>
                    <td>{lead.source}</td>
                    <td>
                      <span className={`status-badge ${getStatusClass(lead.status)}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td>{new Date(lead.createdAt).toLocaleDateString()}</td>
                    <td style={{ textAlign: 'right' }}>
                      <button 
                        className="icon-btn" 
                        onClick={(e) => { e.stopPropagation(); setEditingLead(lead); setIsFormOpen(true); }}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredLeads.length === 0 && (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                      No leads found. Create one to get started.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Modals */}
      {isFormOpen && (
        <LeadForm 
          lead={editingLead} 
          onClose={() => setIsFormOpen(false)} 
          onSuccess={() => { setIsFormOpen(false); fetchLeads(); }} 
        />
      )}

      {selectedLead && (
        <LeadDetails 
          lead={selectedLead} 
          onClose={() => setSelectedLead(null)} 
          onUpdate={() => { fetchLeads(); }} 
        />
      )}
    </div>
  );
}
