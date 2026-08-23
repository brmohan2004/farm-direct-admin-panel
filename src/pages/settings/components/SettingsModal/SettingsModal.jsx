import React, { useState, useEffect } from 'react';
import { Check, Save, Upload, ToggleLeft, ToggleRight } from 'lucide-react';
import Modal from '../../../../components/ui/Modal/Modal';
import SettingsIconAvatar from '../../../../components/ui/SettingsIconAvatar/SettingsIconAvatar';

// Import asset folder images as required
import reactLogo from '../../../../assets/react.svg';
import heroImg from '../../../../assets/hero.png';
import farmlandCoverImg from '../../../../assets/farmland_cover.png';
import catVegetablesImg from '../../../../assets/cat_vegetables.png';
import catFruitsImg from '../../../../assets/cat_fruits.png';
import farmerImg from '../../../../assets/farmer.png';

import './SettingsModal.css';

/**
 * SettingsModal Component
 * Interactive settings configuration modal for updating settings options
 */
const SettingsModal = ({ isOpen, onClose, settingItem, onSave }) => {
  const [formData, setFormData] = useState({});
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (!settingItem) return;

    setSavedSuccess(false);

    switch (settingItem.id) {
      case 'general':
        setFormData({
          appName: 'FarmDirect Admin',
          tagline: 'Fresh organic produce directly from local farms',
          supportPhone: '+91 98765 43210',
          supportEmail: 'contact@farmdirect.com',
          currency: 'INR (₹)',
          timezone: 'Asia/Kolkata (GMT+05:30)'
        });
        break;
      case 'notifications':
        setFormData({
          enablePush: true,
          orderAlerts: true,
          farmerUpdates: true,
          promoNotifications: false
        });
        break;
      case 'privacy':
        setFormData({
          privacyVersion: 'v2.4 (Updated Aug 2026)',
          termsVersion: 'v1.8 (Updated Jul 2026)',
          privacyText: 'FarmDirect collects location data solely for calculating delivery distances and route optimization for fresh produce delivery...',
          termsText: 'By placing an order on FarmDirect, users agree to standard produce freshness guidelines and transparent pricing...'
        });
        break;
      case 'app-content':
        setFormData({
          appVersion: 'v2.6.4 (Production Build)',
          maintenanceMode: false,
          aboutUs: 'FarmDirect bridges the gap between rural organic farmers and urban consumers through real-time ordering and direct logistics.',
          faqCount: '12 active FAQs'
        });
        break;
      case 'home-page':
        setFormData({
          featuredProducts: true,
          heroBannerSlider: true,
          farmerSpotlight: true,
          topCategoriesGrid: true
        });
        break;
      case 'banners':
        setFormData({
          bannerCount: 2,
          autoRotate: true,
          rotateInterval: '5 seconds'
        });
        break;
      case 'categories':
        setFormData({
          showCategoryCounts: true,
          enableSearch: true,
          layoutGrid: '4 Columns Desktop, 2 Mobile'
        });
        break;
      case 'offers':
        setFormData({
          activeCoupons: 'FARM20, WELCOME50',
          firstOrderDiscount: '20% OFF',
          minOrderValue: '₹299'
        });
        break;
      case 'support':
        setFormData({
          helplineNumber: '1800-419-8989',
          supportHours: '8:00 AM - 8:00 PM IST',
          whatsappSupport: '+91 91234 56789'
        });
        break;
      case 'system':
        setFormData({
          dbHealth: 'Healthy (Latency 14ms)',
          cacheCleared: '2 hours ago',
          autoBackup: 'Daily at 02:00 AM'
        });
        break;
      case 'security':
        setFormData({
          encryptionType: 'AES-256 GCM',
          sslStatus: 'Active & Valid (TLS 1.3)',
          twoFactorAuth: true
        });
        break;
      default:
        setFormData({});
    }
  }, [settingItem]);

  if (!isOpen || !settingItem) return null;

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleToggleChange = (field) => {
    setFormData(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    if (onSave) {
      onSave(settingItem.id, formData);
    }
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1000);
  };

  const renderContent = () => {
    switch (settingItem.id) {
      case 'general':
        return (
          <div className="settings-form-fields">
            <div className="settings-field-group">
              <label className="settings-field-label">App Logo & Brand Asset</label>
              <div className="settings-logo-preview-box">
                <img src={reactLogo} alt="App Logo" className="settings-logo-preview" />
                <div className="settings-logo-info">
                  <span className="settings-logo-name">farmdirect_logo.png</span>
                  <span className="settings-logo-meta">SVG Vector / PNG • Asset folder</span>
                </div>
                <button type="button" className="settings-asset-btn" title="Using asset folder image">
                  <Upload size={14} /> Change Asset
                </button>
              </div>
            </div>

            <div className="settings-field-group">
              <label className="settings-field-label">Application Name</label>
              <input
                type="text"
                className="settings-field-input"
                value={formData.appName || ''}
                onChange={(e) => handleInputChange('appName', e.target.value)}
              />
            </div>

            <div className="settings-field-group">
              <label className="settings-field-label">App Tagline / Subtitle</label>
              <input
                type="text"
                className="settings-field-input"
                value={formData.tagline || ''}
                onChange={(e) => handleInputChange('tagline', e.target.value)}
              />
            </div>

            <div className="settings-field-grid">
              <div className="settings-field-group">
                <label className="settings-field-label">Support Email</label>
                <input
                  type="email"
                  className="settings-field-input"
                  value={formData.supportEmail || ''}
                  onChange={(e) => handleInputChange('supportEmail', e.target.value)}
                />
              </div>

              <div className="settings-field-group">
                <label className="settings-field-label">Support Phone</label>
                <input
                  type="text"
                  className="settings-field-input"
                  value={formData.supportPhone || ''}
                  onChange={(e) => handleInputChange('supportPhone', e.target.value)}
                />
              </div>
            </div>

            <div className="settings-field-grid">
              <div className="settings-field-group">
                <label className="settings-field-label">Default Currency</label>
                <select
                  className="settings-field-select"
                  value={formData.currency || 'INR (₹)'}
                  onChange={(e) => handleInputChange('currency', e.target.value)}
                >
                  <option value="INR (₹)">INR (₹)</option>
                  <option value="USD ($)">USD ($)</option>
                  <option value="EUR (€)">EUR (€)</option>
                </select>
              </div>

              <div className="settings-field-group">
                <label className="settings-field-label">Timezone</label>
                <input
                  type="text"
                  className="settings-field-input"
                  value={formData.timezone || ''}
                  onChange={(e) => handleInputChange('timezone', e.target.value)}
                />
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="settings-form-fields">
            <div className="settings-toggle-row">
              <div className="settings-toggle-info">
                <span className="settings-toggle-title">Push Notifications</span>
                <span className="settings-toggle-desc">Enable master mobile push notification service</span>
              </div>
              <button
                type="button"
                className={`settings-toggle-btn ${formData.enablePush ? 'settings-toggle-btn--active' : ''}`}
                onClick={() => handleToggleChange('enablePush')}
              >
                {formData.enablePush ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
              </button>
            </div>

            <div className="settings-toggle-row">
              <div className="settings-toggle-info">
                <span className="settings-toggle-title">Order Status Alerts</span>
                <span className="settings-toggle-desc">Send immediate notifications on order updates</span>
              </div>
              <button
                type="button"
                className={`settings-toggle-btn ${formData.orderAlerts ? 'settings-toggle-btn--active' : ''}`}
                onClick={() => handleToggleChange('orderAlerts')}
              >
                {formData.orderAlerts ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
              </button>
            </div>

            <div className="settings-toggle-row">
              <div className="settings-toggle-info">
                <span className="settings-toggle-title">Farmer Supply Updates</span>
                <span className="settings-toggle-desc">Notify when farmers publish new fresh harvest stocks</span>
              </div>
              <button
                type="button"
                className={`settings-toggle-btn ${formData.farmerUpdates ? 'settings-toggle-btn--active' : ''}`}
                onClick={() => handleToggleChange('farmerUpdates')}
              >
                {formData.farmerUpdates ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
              </button>
            </div>

            <div className="settings-toggle-row">
              <div className="settings-toggle-info">
                <span className="settings-toggle-title">Promotional Offers</span>
                <span className="settings-toggle-desc">Send automated discount and coupon push alerts</span>
              </div>
              <button
                type="button"
                className={`settings-toggle-btn ${formData.promoNotifications ? 'settings-toggle-btn--active' : ''}`}
                onClick={() => handleToggleChange('promoNotifications')}
              >
                {formData.promoNotifications ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
              </button>
            </div>
          </div>
        );

      case 'banners':
        return (
          <div className="settings-form-fields">
            <label className="settings-field-label">Active App Banners (From Asset Folder)</label>

            <div className="settings-banner-preview-list">
              <div className="settings-banner-card">
                <img src={heroImg} alt="Banner 1" className="settings-banner-img" />
                <div className="settings-banner-details">
                  <span className="settings-banner-name">Hero Fresh Produce Banner</span>
                  <span className="settings-banner-path">assets/hero.png</span>
                  <span className="settings-banner-status">ACTIVE • Display order #1</span>
                </div>
              </div>

              <div className="settings-banner-card">
                <img src={farmlandCoverImg} alt="Banner 2" className="settings-banner-img" />
                <div className="settings-banner-details">
                  <span className="settings-banner-name">Farmland Direct Sourcing Banner</span>
                  <span className="settings-banner-path">assets/farmland_cover.png</span>
                  <span className="settings-banner-status">ACTIVE • Display order #2</span>
                </div>
              </div>
            </div>

            <div className="settings-toggle-row">
              <div className="settings-toggle-info">
                <span className="settings-toggle-title">Auto Rotation</span>
                <span className="settings-toggle-desc">Automatically cycle banners on mobile app homepage</span>
              </div>
              <button
                type="button"
                className={`settings-toggle-btn ${formData.autoRotate ? 'settings-toggle-btn--active' : ''}`}
                onClick={() => handleToggleChange('autoRotate')}
              >
                {formData.autoRotate ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
              </button>
            </div>
          </div>
        );

      case 'categories':
        return (
          <div className="settings-form-fields">
            <label className="settings-field-label">Category Visual Assets (From Asset Directory)</label>
            <div className="settings-asset-grid">
              <div className="settings-asset-item">
                <img src={catVegetablesImg} alt="Vegetables" />
                <span>cat_vegetables.png</span>
              </div>
              <div className="settings-asset-item">
                <img src={catFruitsImg} alt="Fruits" />
                <span>cat_fruits.png</span>
              </div>
              <div className="settings-asset-item">
                <img src={farmerImg} alt="Farmer" />
                <span>farmer.png</span>
              </div>
            </div>

            <div className="settings-toggle-row">
              <div className="settings-toggle-info">
                <span className="settings-toggle-title">Show Category Product Counts</span>
                <span className="settings-toggle-desc">Display live stock counts under category cards</span>
              </div>
              <button
                type="button"
                className={`settings-toggle-btn ${formData.showCategoryCounts ? 'settings-toggle-btn--active' : ''}`}
                onClick={() => handleToggleChange('showCategoryCounts')}
              >
                {formData.showCategoryCounts ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
              </button>
            </div>
          </div>
        );

      default:
        return (
          <div className="settings-form-fields">
            <div className="settings-field-group">
              <label className="settings-field-label">Configuration Details</label>
              <textarea
                className="settings-field-textarea"
                rows={5}
                value={JSON.stringify(formData, null, 2)}
                onChange={(e) => {
                  try {
                    setFormData(JSON.parse(e.target.value));
                  } catch {
                    // Ignore syntax while typing
                  }
                }}
              />
            </div>
          </div>
        );
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={settingItem.title}
      subtitle={settingItem.description}
      maxWidth="560px"
    >
      <form onSubmit={handleSubmit} className="settings-modal-form">
        <div className="settings-modal-top-banner">
          <SettingsIconAvatar type={settingItem.iconType} size="md" />
          <span className="settings-modal-top-tag">{settingItem.title} Configuration</span>
        </div>

        {savedSuccess && (
          <div className="settings-success-banner">
            <Check size={20} className="settings-success-icon" />
            <span>Settings successfully updated & saved!</span>
          </div>
        )}

        {renderContent()}

        <div className="settings-modal-actions">
          <button type="button" className="settings-cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="settings-save-btn">
            <Save size={16} /> Save Changes
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default SettingsModal;
