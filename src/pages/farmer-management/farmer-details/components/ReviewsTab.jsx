import React from 'react';
import { Star, ThumbsUp, MessageSquare } from 'lucide-react';
import './ReviewsTab.css';

/**
 * ReviewsTab Component
 * Renders consumer ratings, star rating breakdown, and feedback reviews for the farmer
 */
const ReviewsTab = ({ farmer }) => {
  const reviews = farmer?.reviews || [
    {
      id: 'rev-1',
      reviewer: 'Sujatha Nathan',
      rating: 5,
      date: '19 May 2024',
      comment: 'Super fresh vegetables directly from Ramesh’s farm! The tomatoes and carrots were top grade quality.'
    },
    {
      id: 'rev-2',
      reviewer: 'Vijay Kumar',
      rating: 5,
      date: '16 May 2024',
      comment: 'Prompt delivery and clean organic produce. Very satisfied with the packaging.'
    },
    {
      id: 'rev-3',
      reviewer: 'Meenakshi S.',
      rating: 4,
      date: '10 May 2024',
      comment: 'Good quality fruits. Will order again.'
    }
  ];

  return (
    <div className="reviews-tab-container">
      <div className="reviews-summary-card">
        <div className="summary-score-box">
          <span className="rating-huge">4.8</span>
          <div className="stars-flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={18} className="star-filled" />
            ))}
          </div>
          <span className="rating-subtext">Based on 128 verified consumer reviews</span>
        </div>

        <div className="reviews-list">
          {reviews.map((rev) => (
            <div key={rev.id} className="review-item-card">
              <div className="review-header">
                <div>
                  <h4 className="reviewer-name">{rev.reviewer}</h4>
                  <span className="review-date">{rev.date}</span>
                </div>
                <div className="stars-flex">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={14} className="star-filled" />
                  ))}
                </div>
              </div>
              <p className="review-comment">"{rev.comment}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewsTab;
