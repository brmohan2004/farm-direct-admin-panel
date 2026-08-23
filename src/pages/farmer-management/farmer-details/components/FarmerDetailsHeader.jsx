import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MoreVertical, Edit3, ShieldCheck, Download, Ban, Trash2 } from 'lucide-react';
import './FarmerDetailsHeader.css';

/**
 * FarmerDetailsHeader Component
 * Renders minimalist top toolbar with Back Icon Button on left and 3-Dots Actions menu on right
 */
const FarmerDetailsHeader = ({
  onEdit,
  onVerify,
  onDownloadPdf,
  onSuspend,
  onRemove
}) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="farmer-details-header">
      {/* Left: Back Icon Button Only */}
      <button
        type="button"
        className="btn-header-back-icon"
        onClick={() => navigate(-1)}
        aria-label="Go back"
        title="Go back"
      >
        <ArrowLeft size={18} />
      </button>

      {/* Right: 3-Dots Actions Menu Button Only */}
      <div className="header-actions-wrapper" ref={menuRef}>
        <button
          type="button"
          className="btn-header-dots-actions"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-expanded={isMenuOpen}
          aria-label="More options"
          title="More options"
        >
          <MoreVertical size={18} />
        </button>

        {isMenuOpen && (
          <div className="header-dropdown-menu">
            <button
              type="button"
              className="dropdown-menu-item"
              onClick={() => {
                setIsMenuOpen(false);
                onEdit && onEdit();
              }}
            >
              <Edit3 size={15} /> Edit Farmer Details
            </button>
            <button
              type="button"
              className="dropdown-menu-item"
              onClick={() => {
                setIsMenuOpen(false);
                onVerify && onVerify();
              }}
            >
              <ShieldCheck size={15} className="text-green" /> Verify Documents
            </button>
            <button
              type="button"
              className="dropdown-menu-item"
              onClick={() => {
                setIsMenuOpen(false);
                onDownloadPdf && onDownloadPdf();
              }}
            >
              <Download size={15} /> Export Profile PDF
            </button>
            <div className="dropdown-divider"></div>
            <button
              type="button"
              className="dropdown-menu-item text-amber"
              onClick={() => {
                setIsMenuOpen(false);
                onSuspend && onSuspend();
              }}
            >
              <Ban size={15} /> Suspend Account
            </button>
            <button
              type="button"
              className="dropdown-menu-item text-red"
              onClick={() => {
                setIsMenuOpen(false);
                onRemove && onRemove();
              }}
            >
              <Trash2 size={15} /> Remove Farmer
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default FarmerDetailsHeader;
