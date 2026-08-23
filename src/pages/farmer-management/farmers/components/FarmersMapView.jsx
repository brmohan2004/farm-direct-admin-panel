import React, { useState } from 'react';
import {
  MapPin,
  CheckCircle2,
  Sprout,
  Navigation,
  Search,
  Layers,
  ChevronRight,
  Maximize2,
  Minimize2,
  RotateCcw,
  Compass,
  Phone
} from 'lucide-react';
import FarmerMapDetailsSheet from './FarmerMapDetailsSheet';
import farmlandCoverImg from '../../../../assets/farmland_cover.png';
import rameshImg from '../../../../assets/farmer.png';
import selviImg from '../../../../assets/image copy.png';
import manojImg from '../../../../assets/image copy 2.png';
import kavithaImg from '../../../../assets/image copy 3.png';
import raghavanImg from '../../../../assets/image.png';
import './FarmersMapView.css';

/**
 * Mock Approved Farmers with exact regional land coordinates for Map View
 */
export const MOCK_APPROVED_FARMERS = [
  {
    id: 'FD12345',
    name: 'Ramesh Kumar',
    phone: '+91 98765 43210',
    email: 'ramesh.kumar@email.com',
    location: 'Coimbatore, Tamil Nadu',
    district: 'Coimbatore',
    farmName: 'Green Valley Organic Farms',
    products: 'Organic Vegetables, Fruits',
    memberSince: '12 May 2024',
    status: 'Approved',
    landSize: '5.2 Acres',
    irrigation: 'Borewell & Drip Irrigation',
    crops: ['Tomatoes', 'Carrots', 'Spinach', 'Apples'],
    avatar: rameshImg,
    coordinates: { x: 28, y: 36 },
    plotArea: 'Plot A - Coimbatore West',
    rating: 4.9,
    ordersCompleted: 142
  },
  {
    id: 'FD12346',
    name: 'Selvi Anbarasan',
    phone: '+91 98765 43211',
    email: 'selvi.a@email.com',
    location: 'Pollachi, Tamil Nadu',
    district: 'Pollachi',
    farmName: 'Coconut Grove & Orchards',
    products: 'Coconut, Mango, Banana',
    memberSince: '10 Apr 2024',
    status: 'Approved',
    landSize: '3.8 Acres',
    irrigation: 'Canal & Well Water',
    crops: ['Tender Coconut', 'Alphonso Mango', 'Banana'],
    avatar: selviImg,
    coordinates: { x: 64, y: 25 },
    plotArea: 'Plot B - Pollachi South',
    rating: 4.8,
    ordersCompleted: 98
  },
  {
    id: 'FD12347',
    name: 'Manoj Prabhakar',
    phone: '+91 98765 43212',
    email: 'manoj.p@email.com',
    location: 'Salem, Tamil Nadu',
    district: 'Salem',
    farmName: 'Salem Natural Grains Farm',
    products: 'Grains, Pulses, Millets',
    memberSince: '05 Mar 2024',
    status: 'Approved',
    landSize: '6.0 Acres',
    irrigation: 'Rainfed & Borewell',
    crops: ['Finger Millet', 'Toor Dal', 'Raw Rice'],
    avatar: manojImg,
    coordinates: { x: 45, y: 62 },
    plotArea: 'Plot C - Salem Central',
    rating: 4.7,
    ordersCompleted: 115
  },
  {
    id: 'FD12348',
    name: 'Kavitha Sundaram',
    phone: '+91 98765 43213',
    email: 'kavitha.s@email.com',
    location: 'Erode, Tamil Nadu',
    district: 'Erode',
    farmName: 'Erode Turmeric & Greens',
    products: 'Turmeric, Leafy Greens',
    memberSince: '18 Feb 2024',
    status: 'Approved',
    landSize: '4.2 Acres',
    irrigation: 'Drip System',
    crops: ['Turmeric', 'Palak Spinach', 'Coriander'],
    avatar: kavithaImg,
    coordinates: { x: 76, y: 68 },
    plotArea: 'Plot D - Erode East',
    rating: 4.9,
    ordersCompleted: 164
  },
  {
    id: 'FD12349',
    name: 'Raghavan Pillai',
    phone: '+91 98765 43214',
    email: 'raghavan.p@email.com',
    location: 'Tiruppur, Tamil Nadu',
    district: 'Tiruppur',
    farmName: 'Pillai Agro Dairy & Veggies',
    products: 'Dairy, Fresh Vegetables',
    memberSince: '22 Jan 2024',
    status: 'Approved',
    landSize: '8.5 Acres',
    irrigation: 'River & Canal',
    crops: ['Organic Milk', 'Potatoes', 'Onions'],
    avatar: raghavanImg,
    coordinates: { x: 22, y: 74 },
    plotArea: 'Plot E - Tiruppur Valley',
    rating: 5.0,
    ordersCompleted: 210
  }
];

const FarmersMapView = () => {
  const [farmers] = useState(MOCK_APPROVED_FARMERS);
  const [selectedFarmer, setSelectedFarmer] = useState(MOCK_APPROVED_FARMERS[0]);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeDistrict, setActiveDistrict] = useState('All');

  const filteredFarmers = farmers.filter((f) => {
    const q = searchTerm.toLowerCase();
    const matchesSearch =
      f.name.toLowerCase().includes(q) ||
      f.farmName.toLowerCase().includes(q) ||
      f.location.toLowerCase().includes(q) ||
      f.products.toLowerCase().includes(q);

    const matchesDistrict =
      activeDistrict === 'All' || f.district === activeDistrict;

    return matchesSearch && matchesDistrict;
  });

  const handleSelectFarmerPin = (farmer) => {
    setSelectedFarmer(farmer);
  };

  const handleOpenSheet = (farmer) => {
    setSelectedFarmer(farmer);
    setIsSheetOpen(true);
  };

  return (
    <div className="farmers-map-view-wrapper">
      {/* Search & District Filter Header Overlay */}
      <div className="map-controls-top-bar">
        <div className="map-search-box">
          <Search size={16} className="map-search-icon" />
          <input
            type="text"
            className="map-search-input"
            placeholder="Search approved farmers or crops on map..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              className="map-search-clear"
              onClick={() => setSearchTerm('')}
            >
              ✕
            </button>
          )}
        </div>

        <div className="map-district-pills">
          {['All', 'Coimbatore', 'Pollachi', 'Salem', 'Erode', 'Tiruppur'].map((dist) => (
            <button
              key={dist}
              type="button"
              className={`map-district-pill ${activeDistrict === dist ? 'active' : ''}`}
              onClick={() => setActiveDistrict(dist)}
            >
              {dist === 'All' ? '📍 All Districts' : dist}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Farm Satellite Map Canvas */}
      <div className="map-canvas-container">
        {/* Background Farm Satellite Texture */}
        <div className="map-satellite-layer">
          <img
            src={farmlandCoverImg}
            alt="Farm Land Topographic Satellite View"
            className="map-background-img"
          />
          <div className="map-overlay-grid" />
          <div className="map-topography-lines" />
        </div>

        {/* Mapped Farm Land Parcels/Plots */}
        <svg className="map-svg-parcels" viewBox="0 0 1000 600" preserveAspectRatio="none">
          {/* Plot A - Coimbatore */}
          <polygon
            points="180,140 380,120 400,280 200,320"
            className={`map-land-parcel ${selectedFarmer?.id === 'FD12345' ? 'active-parcel' : ''}`}
            onClick={() => handleSelectFarmerPin(farmers[0])}
          />
          <text x="270" y="220" className="map-parcel-label">Green Valley (5.2A)</text>

          {/* Plot B - Pollachi */}
          <polygon
            points="580,100 740,90 780,240 600,260"
            className={`map-land-parcel ${selectedFarmer?.id === 'FD12346' ? 'active-parcel' : ''}`}
            onClick={() => handleSelectFarmerPin(farmers[1])}
          />
          <text x="650" y="180" className="map-parcel-label">Coconut Grove (3.8A)</text>

          {/* Plot C - Salem */}
          <polygon
            points="380,310 540,290 560,450 390,470"
            className={`map-land-parcel ${selectedFarmer?.id === 'FD12347' ? 'active-parcel' : ''}`}
            onClick={() => handleSelectFarmerPin(farmers[2])}
          />
          <text x="440" y="390" className="map-parcel-label">Salem Grains (6.0A)</text>

          {/* Plot D - Erode */}
          <polygon
            points="700,350 860,330 890,500 710,510"
            className={`map-land-parcel ${selectedFarmer?.id === 'FD12348' ? 'active-parcel' : ''}`}
            onClick={() => handleSelectFarmerPin(farmers[3])}
          />
          <text x="770" y="430" className="map-parcel-label">Erode Turmeric (4.2A)</text>

          {/* Plot E - Tiruppur */}
          <polygon
            points="140,380 300,360 330,530 160,540"
            className={`map-land-parcel ${selectedFarmer?.id === 'FD12349' ? 'active-parcel' : ''}`}
            onClick={() => handleSelectFarmerPin(farmers[4])}
          />
          <text x="210" y="470" className="map-parcel-label">Pillai Dairy (8.5A)</text>
        </svg>

        {/* Approved Farmer Marker Pins - Positioned above farmer land */}
        {filteredFarmers.map((farmer) => {
          const isSelected = selectedFarmer?.id === farmer.id;

          return (
            <div
              key={farmer.id}
              className={`farmer-map-pin-container ${isSelected ? 'selected-pin' : ''}`}
              style={{
                left: `${farmer.coordinates.x}%`,
                top: `${farmer.coordinates.y}%`
              }}
              onClick={() => handleSelectFarmerPin(farmer)}
            >
              {/* Outer pulsing ring animation */}
              <div className="farmer-pin-pulse" />

              {/* Farmer Pin Badge above the land */}
              <div className="farmer-pin-card-head">
                <div className="farmer-pin-avatar-wrap">
                  <img
                    src={farmer.avatar}
                    alt={farmer.name}
                    className="farmer-pin-avatar-img"
                  />
                  <span className="farmer-pin-check">
                    <CheckCircle2 size={11} />
                  </span>
                </div>

                <div className="farmer-pin-text">
                  <span className="farmer-pin-name">{farmer.name}</span>
                  <span className="farmer-pin-farm">{farmer.district}</span>
                </div>
              </div>

              {/* Pin Arrow Tip pointing directly to the farm land parcel */}
              <div className="farmer-pin-tip" />
            </div>
          );
        })}

        {/* Floating Farmer Card Overlay over the Map - Displays on click of farmer pin */}
        {selectedFarmer && (
          <div
            className="floating-farmer-map-card"
            onClick={() => handleOpenSheet(selectedFarmer)}
          >
            <div className="floating-card-left">
              <div className="floating-card-avatar-wrap">
                <img
                  src={selectedFarmer.avatar}
                  alt={selectedFarmer.name}
                  className="floating-card-avatar"
                />
                <span className="floating-card-check">
                  <CheckCircle2 size={12} />
                </span>
              </div>

              <div className="floating-card-info">
                <div className="floating-card-header-row">
                  <h3 className="floating-card-name">{selectedFarmer.name}</h3>
                  <span className="floating-card-status">Approved</span>
                </div>
                <p className="floating-card-farm-name">{selectedFarmer.farmName}</p>
                <div className="floating-card-location">
                  <MapPin size={12} />
                  <span>{selectedFarmer.location}</span>
                </div>
                <div className="floating-card-tags">
                  <span className="floating-card-tag green">
                    <Sprout size={11} /> {selectedFarmer.landSize}
                  </span>
                  <span className="floating-card-tag blue">
                    {selectedFarmer.products.split(',')[0]}
                  </span>
                </div>
              </div>
            </div>

            <div className="floating-card-action">
              <span className="floating-card-cta-text">Click for Details</span>
              <div className="floating-card-arrow-btn">
                <ChevronRight size={16} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Farmer Land & Profile Details Sheet Modal */}
      <FarmerMapDetailsSheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        farmer={selectedFarmer}
      />
    </div>
  );
};

export default FarmersMapView;
