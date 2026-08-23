import React from 'react';
import { Phone, MapPin, MoreVertical } from 'lucide-react';
import { StatusBadge, UserAvatar } from '../../../../components/ui';
import './ConsumersCards.css';

/**
 * ConsumersCards Component
 * Mobile-optimized stacked card layout for consumers matching design Image 4
 */
const ConsumersCards = ({ consumers = [], onSelectConsumer }) => {
  if (consumers.length === 0) {
    return (
      <div className="consumers-cards-empty">
        <p>No consumers found.</p>
      </div>
    );
  }

  return (
    <div className="consumers-cards-container">
      {consumers.map((consumer) => (
        <div
          key={consumer.id}
          className="consumers-card-item"
          onClick={() => onSelectConsumer(consumer)}
          role="button"
          tabIndex={0}
        >
          <div className="consumers-card-left">
            <UserAvatar src={consumer.avatar} name={consumer.name} size="md" />
            <div className="consumers-card-info">
              <span className="consumers-card-name">{consumer.name}</span>
              
              <div className="consumers-card-meta-line">
                <Phone size={13} className="meta-icon" />
                <span>{consumer.phone}</span>
              </div>

              <div className="consumers-card-meta-line">
                <MapPin size={13} className="meta-icon" />
                <span>{consumer.location}</span>
              </div>
            </div>
          </div>

          <div className="consumers-card-right">
            <StatusBadge status={consumer.status} size="sm" />
            <button
              className="consumers-card-more-btn"
              onClick={(e) => {
                e.stopPropagation();
                onSelectConsumer(consumer);
              }}
              title="More actions"
            >
              <MoreVertical size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ConsumersCards;
