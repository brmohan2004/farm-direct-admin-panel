import React from 'react';
import Modal from '../../../../components/ui/Modal/Modal';
import { Download, ShieldCheck, Clock, FileText, CheckCircle2, XCircle } from 'lucide-react';
import './DocumentViewerModal.css';

/**
 * DocumentViewerModal Component
 * Renders modal preview for inspecting KYC, PAN, Land Ownership, or Organic Certificate documents
 */
const DocumentViewerModal = ({
  document: doc,
  isOpen,
  onClose,
  onApproveDoc,
  onRejectDoc
}) => {
  if (!doc) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Document Preview: ${doc.name}`}
      size="lg"
    >
      <div className="doc-modal-container">
        {/* Top Header metadata */}
        <div className="doc-modal-header">
          <div className="doc-modal-info">
            <h4 className="doc-modal-title">{doc.name}</h4>
            <span className="doc-modal-number">{doc.number || 'Doc ID #98214-TN'}</span>
          </div>

          <span className={`doc-modal-pill status-${(doc.status || '').toLowerCase()}`}>
            {doc.status === 'Verified' ? <ShieldCheck size={14} /> : <Clock size={14} />}
            {doc.status}
          </span>
        </div>

        {/* Mock Document Preview Box */}
        <div className="doc-preview-viewport">
          <div className="mock-certificate-canvas">
            <div className="watermark-bg">FARMDIRECT VERIFIED</div>
            <FileText size={48} className="preview-icon" />
            <h3 className="cert-title">OFFICIAL GOVERNMENT DOCUMENT</h3>
            <p className="cert-sub">Tamil Nadu Land & Revenue Registry / Unique ID Authority</p>
            
            <div className="cert-fields">
              <div><strong>Document Name:</strong> {doc.name}</div>
              <div><strong>Document Number:</strong> {doc.number || '9876 5432 3210'}</div>
              <div><strong>Owner Name:</strong> Ramesh Kumar</div>
              <div><strong>Issued Authority:</strong> District Revenue Department, Coimbatore</div>
            </div>

            <div className="cert-stamp">
              <ShieldCheck size={28} />
              <span>OFFICIALLY SEALED</span>
            </div>
          </div>
        </div>

        {/* Modal Action Controls */}
        <div className="doc-modal-actions">
          <button type="button" className="btn-modal-secondary" onClick={onClose}>
            Close Preview
          </button>

          {doc.status !== 'Verified' && (
            <button
              type="button"
              className="btn-modal-green"
              onClick={() => {
                onApproveDoc && onApproveDoc(doc);
                onClose();
              }}
            >
              <CheckCircle2 size={16} /> Mark as Verified
            </button>
          )}

          <button
            type="button"
            className="btn-modal-download"
            onClick={onClose}
          >
            <Download size={16} /> Download File
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DocumentViewerModal;
