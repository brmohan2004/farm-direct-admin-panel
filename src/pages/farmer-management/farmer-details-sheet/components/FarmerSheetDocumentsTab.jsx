import React from 'react';
import { FileText, Eye, Download, CheckCircle2, Clock, ShieldCheck } from 'lucide-react';
import './FarmerSheetDocumentsTab.css';

/**
 * FarmerSheetDocumentsTab Component
 * Displays verified identity and land documentation records inside details sheet
 */
const FarmerSheetDocumentsTab = ({ farmer, onViewDoc }) => {
  const documents = farmer?.documents || [
    { id: 'doc-1', name: 'Aadhaar Card', number: '9876 5432 3210', status: 'Verified', uploadedOn: '12 May 2024', size: '1.4 MB', type: 'PDF' },
    { id: 'doc-2', name: 'PAN Card', number: 'ABCDE1234F', status: 'Verified', uploadedOn: '12 May 2024', size: '850 KB', type: 'JPG' },
    { id: 'doc-3', name: 'Farm Photo', number: 'Green Valley Plot A', status: 'Verified', uploadedOn: '12 May 2024', size: '2.8 MB', type: 'PNG' },
    { id: 'doc-4', name: 'Land Ownership Proof', number: 'Patta/Chitta #4521/2023', status: 'Verified', uploadedOn: '14 May 2024', size: '3.1 MB', type: 'PDF' },
    { id: 'doc-5', name: 'Organic Certificate', number: 'NPOP/IND/884920', status: 'Verified', uploadedOn: '15 May 2024', size: '1.9 MB', type: 'PDF' }
  ];

  return (
    <div className="farmer-sheet-docs-wrapper">
      <div className="farmer-sheet-docs-intro">
        <ShieldCheck size={16} className="text-green" />
        <span>Verified Government IDs & Agricultural Land Certifications</span>
      </div>

      <div className="farmer-sheet-docs-list">
        {documents.map((doc) => (
          <div key={doc.id} className="farmer-sheet-doc-card">
            <div className="doc-card-left">
              <div className="doc-icon-box">
                <FileText size={18} className="doc-icon" />
              </div>
              <div className="doc-info">
                <span className="doc-name">{doc.name}</span>
                <span className="doc-number">{doc.number}</span>
                <div className="doc-meta">
                  <span>{doc.type}</span> • <span>{doc.size}</span> • <span>Uploaded {doc.uploadedOn}</span>
                </div>
              </div>
            </div>

            <div className="doc-card-right">
              <span className={`doc-status-badge ${doc.status.toLowerCase()}`}>
                <CheckCircle2 size={11} /> {doc.status}
              </span>

              <button
                type="button"
                className="doc-view-btn"
                onClick={() => onViewDoc && onViewDoc(doc)}
              >
                <Eye size={14} /> View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FarmerSheetDocumentsTab;
