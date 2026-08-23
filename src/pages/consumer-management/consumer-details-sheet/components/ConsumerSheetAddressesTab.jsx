import React from 'react';

const ConsumerSheetAddressesTab = ({ consumer }) => {
  return (
    <div className="consumer-sheet-card">
      <h4 className="consumer-sheet-section-title">Saved Addresses</h4>
      <div className="consumer-sheet-fields" style={{ marginTop: '10px' }}>
        {(consumer?.addresses || []).map((addr) => (
          <div key={addr.id} className="sheet-field-row" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '4px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <span className="sheet-field-lbl font-bold">{addr.type}</span>
              {addr.isDefault && <span style={{ fontSize: '0.7rem', color: '#16a34a', fontWeight: 600 }}>Default</span>}
            </div>
            <span className="sheet-field-val" style={{ textAlign: 'left' }}>{addr.line}, {addr.city}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConsumerSheetAddressesTab;
