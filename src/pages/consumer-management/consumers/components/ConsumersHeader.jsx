import React from 'react';
import { Plus } from 'lucide-react';
import './ConsumersHeader.css';

/**
 * ConsumersHeader Component
 * Displays main Consumers page title, description, and primary + Add Consumer button
 */
const ConsumersHeader = ({ onAddConsumer }) => {
  return (
    <div className="consumers-header">
      <div className="consumers-header-text">
        <h1 className="consumers-title">Consumers</h1>
        <p className="consumers-subtitle">Manage and view consumer details and their activity.</p>
      </div>

      <button
        className="consumers-add-btn"
        onClick={onAddConsumer}
        title="Add new consumer"
      >
        <Plus size={18} />
        <span>Add Consumer</span>
      </button>
    </div>
  );
};

export default ConsumersHeader;
