import React, { useState } from 'react';
import { Search, MapPin, Sprout, CheckCircle2, Eye } from 'lucide-react';
import rameshImg from '../../../assets/farmer.png';
import selviImg from '../../../assets/image copy.png';
import manojImg from '../../../assets/image copy 2.png';
import kavithaImg from '../../../assets/image copy 3.png';
import raghavanImg from '../../../assets/image.png';
import SearchInput from '../../../components/ui/SearchInput/SearchInput';
import FarmerDetailsSheet from '../farmer-details-sheet/FarmerDetailsSheet';
import './FarmersPage.css';

/**
 * Approved Farmers Dataset
 */
const APPROVED_FARMERS = [
  {
    id: 'FD12345',
    name: 'Ramesh Kumar',
    phone: '+91 98765 43210',
    email: 'ramesh.kumar@email.com',
    location: 'Coimbatore, Tamil Nadu',
    farmName: 'Green Valley Organic Farms',
    products: 'Vegetables, Fruits',
    memberSince: '12 May 2024',
    status: 'Approved',
    avatar: rameshImg
  },
  {
    id: 'FD12346',
    name: 'Selvi Anbarasan',
    phone: '+91 98765 43211',
    email: 'selvi.a@email.com',
    location: 'Pollachi, Tamil Nadu',
    farmName: 'Coconut Grove & Fruits',
    products: 'Coconut, Mango, Banana',
    memberSince: '10 Apr 2024',
    status: 'Approved',
    avatar: selviImg
  },
  {
    id: 'FD12347',
    name: 'Manoj Prabhakar',
    phone: '+91 98765 43212',
    email: 'manoj.p@email.com',
    location: 'Salem, Tamil Nadu',
    farmName: 'Salem Organic Farm',
    products: 'Grains, Pulses',
    memberSince: '05 Mar 2024',
    status: 'Approved',
    avatar: manojImg
  },
  {
    id: 'FD12348',
    name: 'Kavitha Sundaram',
    phone: '+91 98765 43213',
    email: 'kavitha.s@email.com',
    location: 'Erode, Tamil Nadu',
    farmName: 'Erode Turmeric & Greens',
    products: 'Turmeric, Leafy Greens',
    memberSince: '18 Feb 2024',
    status: 'Approved',
    avatar: kavithaImg
  },
  {
    id: 'FD12349',
    name: 'Raghavan Pillai',
    phone: '+91 98765 43214',
    email: 'raghavan.p@email.com',
    location: 'Tiruppur, Tamil Nadu',
    farmName: 'Pillai Dairy & Veggies',
    products: 'Dairy, Vegetables',
    memberSince: '22 Jan 2024',
    status: 'Approved',
    avatar: raghavanImg
  }
];

const FarmersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFarmer, setSelectedFarmer] = useState(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const filteredFarmers = APPROVED_FARMERS.filter((f) => {
    const q = searchTerm.toLowerCase();
    return (
      f.name.toLowerCase().includes(q) ||
      f.phone.toLowerCase().includes(q) ||
      f.location.toLowerCase().includes(q) ||
      f.id.toLowerCase().includes(q)
    );
  });

  const handleOpenDetails = (farmerOrId) => {
    const found = typeof farmerOrId === 'object' ? farmerOrId : APPROVED_FARMERS.find((f) => f.id === farmerOrId) || { id: farmerOrId };
    setSelectedFarmer(found);
    setIsSheetOpen(true);
  };

  return (
    <div className="approved-farmers-page-container">
      {/* Header */}
      <div className="farmers-page-header">
        <div className="farmers-header-text-group">
          <h1 className="farmers-title">Approved Farmers</h1>
          <p className="farmers-subtitle">
            Manage and view verified farmer profiles and production catalog records.
          </p>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="farmers-search-bar">
        <SearchInput
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClear={() => setSearchTerm('')}
          placeholder="Search approved farmers by name, phone or farm ID..."
        />
      </div>

      {/* Desktop / Tablet Table View */}
      <div className="farmers-desktop-view">
        <div className="farmers-table-card">
          <table className="approved-farmers-table">
            <thead>
              <tr>
                <th>Farmer</th>
                <th>Farm Name</th>
                <th>Location</th>
                <th>Crops / Products</th>
                <th>Member Since</th>
                <th>Status</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredFarmers.map((farmer) => (
                <tr
                  key={farmer.id}
                  className="farmer-row"
                  onClick={() => handleOpenDetails(farmer.id)}
                >
                  <td>
                    <div className="farmer-cell">
                      <img
                        src={farmer.avatar}
                        alt={farmer.name}
                        className="cell-avatar"
                      />
                      <div>
                        <span className="cell-name">{farmer.name}</span>
                        <span className="cell-id">Farm ID: {farmer.id}</span>
                      </div>
                    </div>
                  </td>

                  <td className="font-semibold">{farmer.farmName}</td>

                  <td>
                    <div className="icon-text">
                      <MapPin size={14} className="icon-muted" />
                      <span>{farmer.location}</span>
                    </div>
                  </td>

                  <td>
                    <div className="icon-text">
                      <Sprout size={14} className="icon-green" />
                      <span>{farmer.products}</span>
                    </div>
                  </td>

                  <td>{farmer.memberSince}</td>

                  <td>
                    <span className="badge-approved">
                      <CheckCircle2 size={12} /> Verified
                    </span>
                  </td>

                  <td className="text-right">
                    <button
                      type="button"
                      className="btn-view-profile"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenDetails(farmer.id);
                      }}
                    >
                      <Eye size={14} /> View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Stacked Cards List View */}
      <div className="farmers-mobile-cards-view">
        {filteredFarmers.map((farmer) => (
          <div
            key={farmer.id}
            className="farmer-mobile-card"
            onClick={() => handleOpenDetails(farmer.id)}
          >
            <div className="farmer-card-header">
              <img src={farmer.avatar} alt={farmer.name} className="farmer-card-avatar" />
              <div className="farmer-card-main-info">
                <h3 className="farmer-card-name">{farmer.name}</h3>
                <span className="farmer-card-id">ID: {farmer.id}</span>
                <span className="farmer-card-farm">{farmer.farmName}</span>
              </div>
              <span className="badge-approved">
                <CheckCircle2 size={12} /> Verified
              </span>
            </div>

            <div className="farmer-card-details">
              <div className="farmer-detail-chip">
                <MapPin size={13} className="icon-muted" />
                <span>{farmer.location}</span>
              </div>
              <div className="farmer-detail-chip">
                <Sprout size={13} className="icon-green" />
                <span>{farmer.products}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Approved Farmer Details Sheet Overlay */}
      {isSheetOpen && (
        <FarmerDetailsSheet
          isOpen={isSheetOpen}
          farmer={selectedFarmer}
          onClose={() => {
            setIsSheetOpen(false);
            setSelectedFarmer(null);
          }}
        />
      )}
    </div>
  );
};

export default FarmersPage;
