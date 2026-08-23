import React from 'react';
import { Phone, Mail, MapPin, ChevronRight } from 'lucide-react';
import { StatusBadge, UserAvatar } from '../../../../components/ui';
import './ConsumersTable.css';

/**
 * ConsumersTable Component
 * Table layout for Desktop and Tablet viewports matching design Image 3
 */
const ConsumersTable = ({ consumers = [], onSelectConsumer }) => {
  if (consumers.length === 0) {
    return (
      <div className="consumers-table-empty">
        <p>No consumers match the search or filter criteria.</p>
      </div>
    );
  }

  return (
    <div className="consumers-table-container">
      <table className="consumers-table">
        <thead>
          <tr>
            <th>Consumer</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Location</th>
            <th>Status</th>
            <th>Joined On</th>
            <th>Orders</th>
            <th>Total Spent</th>
            <th className="consumers-th-actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          {consumers.map((consumer) => (
            <tr
              key={consumer.id}
              className="consumers-table-row"
              onClick={() => onSelectConsumer(consumer)}
            >
              <td className="consumers-td-consumer">
                <div className="consumer-profile-cell">
                  <UserAvatar src={consumer.avatar} name={consumer.name} size="sm" />
                  <span className="consumer-profile-name">{consumer.name}</span>
                </div>
              </td>

              <td className="consumers-td-phone">
                <div className="consumer-icon-text-cell">
                  <Phone size={14} className="cell-muted-icon" />
                  <span>{consumer.phone}</span>
                </div>
              </td>

              <td className="consumers-td-email">
                <div className="consumer-icon-text-cell">
                  <Mail size={14} className="cell-muted-icon" />
                  <span className="consumer-email-text">{consumer.email}</span>
                </div>
              </td>

              <td className="consumers-td-location">
                <div className="consumer-icon-text-cell">
                  <MapPin size={14} className="cell-muted-icon" />
                  <span>{consumer.location}</span>
                </div>
              </td>

              <td className="consumers-td-status">
                <StatusBadge status={consumer.status} size="sm" />
              </td>

              <td className="consumers-td-joined">
                <span>{consumer.joinedOn}</span>
              </td>

              <td className="consumers-td-orders">
                <span className="consumer-orders-count">{consumer.totalOrders}</span>
              </td>

              <td className="consumers-td-spent">
                <span className="consumer-spent-amount">{consumer.formattedTotalSpent}</span>
              </td>

              <td className="consumers-td-actions">
                <button
                  className="consumer-action-chevron-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectConsumer(consumer);
                  }}
                  title={`View details for ${consumer.name}`}
                >
                  <ChevronRight size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ConsumersTable;
