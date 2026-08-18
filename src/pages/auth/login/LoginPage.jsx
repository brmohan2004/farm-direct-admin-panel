import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, LogIn, KeyRound } from 'lucide-react';

const LoginPage = () => {
  const navigate = useNavigate();
  // Pre-filled dummy credentials as requested
  const [email, setEmail] = useState('admin@farmdirect.com');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login loading delay then navigate to dashboard
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 600);
  };

  return (
    <div className="auth-form-card">
      <div className="auth-header">
        <h2 className="auth-title">Admin Portal Login</h2>
        <p className="auth-subtitle">Sign in to manage farm supply, inventory & orders.</p>
      </div>

      {/* Pre-filled Dummy Credentials Banner */}
      <div className="demo-credentials-banner">
        <KeyRound className="demo-banner-icon" size={18} />
        <div className="demo-banner-content">
          <span className="demo-banner-title">Demo Admin Credentials Pre-filled</span>
          <span className="demo-banner-text">
            Email: <code>admin@farmdirect.com</code> | Password: <code>admin123</code>
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label className="form-label" htmlFor="admin-email">Work Email</label>
          <div className="form-input-wrap">
            <Mail className="input-icon-left" size={18} />
            <input
              id="admin-email"
              type="email"
              className="form-input"
              placeholder="admin@farmdirect.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="admin-password">Password</label>
          <div className="form-input-wrap">
            <Lock className="input-icon-left" size={18} />
            <input
              id="admin-password"
              type={showPassword ? 'text' : 'password'}
              className="form-input"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="input-btn-toggle"
              onClick={() => setShowPassword(!showPassword)}
              title={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div className="auth-form-meta">
          <label className="remember-checkbox">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            Remember me
          </label>

          <NavLink to="/auth/forgot-password" className="forgot-link">
            Forgot Password?
          </NavLink>
        </div>

        <button type="submit" className="btn-auth-submit" disabled={isLoading}>
          {isLoading ? (
            <span>Signing in...</span>
          ) : (
            <>
              <span>Sign In to Admin Panel</span>
              <LogIn size={18} />
            </>
          )}
        </button>
      </form>

      <p className="auth-footer-text">
        Don't have an admin account?{' '}
        <NavLink to="/auth/signup" className="auth-footer-link">
          Create Account
        </NavLink>
      </p>
    </div>
  );
};

export default LoginPage;
