import React from 'react';

const ConsumerSheetActivityTab = ({ consumer }) => {
  return (
    <div className="consumer-sheet-card">
      <h4 className="consumer-sheet-section-title">Activity Log</h4>
      <div className="consumer-sheet-fields" style={{ marginTop: '10px' }}>
        {(consumer?.activities || []).map((act) => (
          <div key={act.id} className="sheet-field-row" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
            <span className="sheet-field-val font-bold">{act.text}</span>
            <span className="sheet-field-lbl">{act.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConsumerSheetActivityTab;
