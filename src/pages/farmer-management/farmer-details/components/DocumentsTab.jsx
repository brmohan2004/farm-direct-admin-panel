import React from 'react';
import { Eye, Download, ShieldCheck, Clock, FileText, Upload } from 'lucide-react';
import './DocumentsTab.css';

/**
 * DocumentsTab Component
 * Renders list and previews of uploaded documents (KYC, Land proof, Organic cert)
 */
const DocumentsTab = ({ farmer, onViewDocument }) => {
  const documents = farmer?.documents || [
    {
      id: 'doc-1',
      name: 'Aadhaar Card',
      number: '9876 5432 3210',
      status: 'Verified',
      uploadedOn: '12 May 2024',
      size: '1.4 MB',
      type: 'PDF'
    },
    {
      id: 'doc-2',
      name: 'PAN Card',
      number: 'ABCDE1234F',
      status: 'Verified',
      uploadedOn: '12 May 2024',
      size: '850 KB',
      type: 'JPG'
    },
    {
      id: 'doc-3',
      name: 'Farm Photo',
      number: 'Green Valley Farm Plot A',
      status: 'Verified',
      uploadedOn: '12 May 2024',
      size: '2.8 MB',
      type: 'PNG'
    },
    {
      id: 'doc-4',
      name: 'Land Ownership Proof',
      number: 'Patta/Chitta #4521/2023',
      status: 'Pending',
      uploadedOn: '14 May 2024',
      size: '3.1 MB',
      type: 'PDF'
    },
    {
      id: 'doc-5',
      name: 'Organic Certification',
      number: 'NPOP/IND/884920',
      status: 'Pending',
      uploadedOn: '15 May 2024',
      size: '1.9 MB',
      type: 'PDF'
    }
  ];

  return (
    <div className="documents-tab-container">
      <div className="tab-section-header">
        <div>
          <h3 className="section-title">Farmer Verification Documents</h3>
          <p className="section-subtitle">
            Manage, inspect, and verify official identification and land ownership records.
          </p>
        </div>
      </div>

      <div className="documents-grid">
        {documents.map((doc) => (
          <div key={doc.id} className="document-card-item">
            <div className="doc-card-top">
              <div className="doc-type-icon">
                <FileText size={22} />
              </div>
              <span className={`doc-badge-pill badge-${doc.status.toLowerCase()}`}>
                {doc.status === 'Verified' ? <ShieldCheck size={12} /> : <Clock size={12} />}
                {doc.status}
              </span>
            </div>

            <div className="doc-card-body">
              <h4 className="doc-title">{doc.name}</h4>
              <span className="doc-number">{doc.number}</span>

              <div className="doc-meta-row">
                <span>{doc.type} • {doc.size}</span>
                <span>Uploaded: {doc.uploadedOn}</span>
              </div>
            </div>

            <div className="doc-card-actions">
              <button
                type="button"
                className="btn-doc-view"
                onClick={() => onViewDocument && onViewDocument(doc)}
              >
                <Eye size={15} /> Preview Document
              </button>

              <button
                type="button"
                className="btn-doc-download"
                onClick={() => onViewDocument && onViewDocument(doc)}
                title="Download"
              >
                <Download size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentsTab;
