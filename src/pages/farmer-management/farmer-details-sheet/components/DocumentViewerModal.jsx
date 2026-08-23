import React from 'react';
import { X, Download, FileText, CheckCircle2 } from 'lucide-react';
import Modal from '../../../../components/ui/Modal/Modal';
import './DocumentViewerModal.css';

const DocumentViewerModal = ({ document, isOpen, onClose }) => {
  if (!isOpen || !document) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="560px">
      <div className="doc-viewer-modal-content">
        <div className="doc-viewer-header">
          <div className="doc-viewer-title-box">
            <FileText size={20} className="doc-icon" />
            <div>
              <h3 className="doc-viewer-title">{document.name}</h3>
              <p className="doc-viewer-sub">{document.number}</p>
            </div>
          </div>
          <button type="button" className="doc-viewer-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="doc-viewer-preview-box">
          <div className="doc-preview-placeholder">
            <FileText size={48} className="preview-icon" />
            <span className="preview-filename">{document.name} ({document.type || 'PDF'})</span>
            <span className="preview-filesize">{document.size || '1.4 MB'}</span>
          </div>
        </div>

        <div className="doc-viewer-meta-row">
          <span className="doc-meta-badge">
            <CheckCircle2 size={13} /> {document.status || 'Verified'}
          </span>
          <span className="doc-meta-date">Uploaded: {document.uploadedOn || '12 May 2024'}</span>
        </div>

        <div className="doc-viewer-actions">
          <button type="button" className="doc-btn-cancel" onClick={onClose}>
            Close
          </button>
          <button
            type="button"
            className="doc-btn-download"
            onClick={() => alert(`Downloading ${document.name}...`)}
          >
            <Download size={15} /> Download Document
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DocumentViewerModal;
