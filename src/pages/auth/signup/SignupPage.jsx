import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Lock, ShieldCheck, Eye, EyeOff, UserPlus } from 'lucide-react';

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    role: 'Operations Manager',
    password: '',
    confirmPassword: '',
    agreeTerms: true
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 600);
  };

  return (
    <div className="auth-form-card">
      <div className="auth-header">
        <h2 className="auth-title">Create Admin Account</h2>
        <p className="auth-subtitle">Register for FarmDirect Admin Panel access.</p>
      </div>

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label className="form-label" htmlFor="fullName">Full Name</label>
          <div className="form-input-wrap">
            <User className="input-icon-left" size={18} />
            <input
              id="fullName"
              name="fullName"
              type="text"
              className="form-input"
              placeholder="e.g. Ramesh V"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="email">Work Email</label>
          <div className="form-input-wrap">
            <Mail className="input-icon-left" size={18} />
            <input
              id="email"
              name="email"
              type="email"
              className="form-input"
              placeholder="name@farmdirect.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="phone">Phone Number</label>
          <div className="form-input-wrap">
            <Phone className="input-icon-left" size={18} />
            <input
              id="phone"
              name="phone"
              type="tel"
              className="form-input"
              placeholder="+91 98765 43210"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="role">Admin Role</label>
          <div className="form-input-wrap">
            <ShieldCheck className="input-icon-left" size={18} />
            <select
              id="role"
              name="role"
              className="form-select"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="Super Admin">Super Admin</option>
              <option value="Operations Manager">Operations Manager</option>
              <option value="Inventory Lead">Inventory Lead</option>
              <option value="Finance & Payouts">Finance & Payouts</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="signup-password">Password</label>
          <div className="form-input-wrap">
            <Lock className="input-icon-left" size={18} />
            <input
              id="signup-password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              className="form-input"
              placeholder="••••••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="input-btn-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div className="auth-form-meta">
          <label className="remember-checkbox">
            <input
              type="checkbox"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
              required
            />
            I agree to Admin Privacy & Data Terms
          </label>
        </div>

        <button type="submit" className="btn-auth-submit" disabled={isLoading}>
          {isLoading ? (
            <span>Creating Account...</span>
          ) : (
            <>
              <span>Complete Registration</span>
              <UserPlus size={18} />
            </>
          )}
        </button>
      </form>

      <p className="auth-footer-text">
        Already have an admin account?{' '}
        <NavLink to="/auth/login" className="auth-footer-link">
          Sign In
        </NavLink>
      </p>
    </div>
  );
};

export default SignupPage;
