import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Mail, ArrowLeft, Send, CheckCircle2 } from 'lucide-react';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <div className="auth-form-card">
      {!isSubmitted ? (
        <>
          <div className="auth-header">
            <h2 className="auth-title">Reset Password</h2>
            <p className="auth-subtitle">
              Enter your registered work email address and we'll send password reset instructions.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label className="form-label" htmlFor="reset-email">Work Email Address</label>
              <div className="form-input-wrap">
                <Mail className="input-icon-left" size={18} />
                <input
                  id="reset-email"
                  type="email"
                  className="form-input"
                  placeholder="admin@farmdirect.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn-auth-submit" disabled={isLoading}>
              {isLoading ? (
                <span>Sending Instructions...</span>
              ) : (
                <>
                  <span>Send Reset Instructions</span>
                  <Send size={17} />
                </>
              )}
            </button>
          </form>

          <p className="auth-footer-text">
            Remembered your password?{' '}
            <NavLink to="/auth/login" className="auth-footer-link">
              Back to Login
            </NavLink>
          </p>
        </>
      ) : (
        <div className="auth-success-box">
          <div className="success-icon-circle">
            <CheckCircle2 size={28} />
          </div>
          <h3 className="success-title">Reset Link Sent!</h3>
          <p className="success-desc">
            We have sent password reset instructions to <strong>{email || 'admin@farmdirect.com'}</strong>. Please check your email inbox and follow the steps.
          </p>

          <NavLink to="/auth/login" className="btn-auth-submit" style={{ textDecoration: 'none', width: '100%', marginTop: '8px' }}>
            <ArrowLeft size={18} />
            <span>Return to Login</span>
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default ForgotPasswordPage;
