import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import './CopyButton.css';

/**
 * CopyButton Component
 * Reusable icon button to copy text to clipboard with feedback tooltip/icon.
 */
const CopyButton = ({ text, className = '', size = 14 }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    e.stopPropagation();
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      className={`copy-button-root ${copied ? 'copied' : ''} ${className}`}
      onClick={handleCopy}
      title={copied ? 'Copied!' : 'Copy to clipboard'}
      aria-label="Copy to clipboard"
    >
      {copied ? <Check size={size} className="copy-icon-success" /> : <Copy size={size} className="copy-icon" />}
    </button>
  );
};

export default CopyButton;
