import React from 'react';
import { 
  Sprout, 
  Apple, 
  Wheat, 
  Milk, 
  Flame, 
  Droplet, 
  CupSoda, 
  Folder 
} from 'lucide-react';
import catVegetablesImg from '../../../assets/cat_vegetables.png';
import catFruitsImg from '../../../assets/cat_fruits.png';
import catGrainsImg from '../../../assets/cat_grains_pulses.png';
import catHerbsSpicesImg from '../../../assets/cat_herbs_spices.png';
import catDairyEggsImg from '../../../assets/cat_dairy_eggs.png';
import catOilsCondimentsImg from '../../../assets/cat_oils_condiments.png';
import catOrganicImg from '../../../assets/cat_organic.png';
import './CategoryIconAvatar.css';

// SVG components for specific custom icons like Pulses (pea pod)
const PulsesIcon = ({ size = 20, color = 'currentColor' }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke={color} 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M12 2C6.5 2 2 6.5 2 12c0 5.5 4.5 10 10 10s10-4.5 10-10C22 6.5 17.5 2 12 2z" />
    <circle cx="8" cy="12" r="1.5" fill={color} />
    <circle cx="12" cy="12" r="1.5" fill={color} />
    <circle cx="16" cy="12" r="1.5" fill={color} />
  </svg>
);

const CATEGORY_PRESETS = {
  vegetables: {
    bgColor: '#e6f4ea',
    iconColor: '#16a34a',
    icon: Sprout,
    assetImg: catVegetablesImg
  },
  fruits: {
    bgColor: '#ffebee',
    iconColor: '#e11d48',
    icon: Apple,
    assetImg: catFruitsImg
  },
  grains: {
    bgColor: '#fef3c7',
    iconColor: '#d97706',
    icon: Wheat,
    assetImg: catGrainsImg
  },
  pulses: {
    bgColor: '#f3e8ff',
    iconColor: '#9333ea',
    icon: PulsesIcon,
    assetImg: catGrainsImg
  },
  dairy: {
    bgColor: '#dbeafe',
    iconColor: '#2563eb',
    icon: Milk,
    assetImg: catDairyEggsImg
  },
  spices: {
    bgColor: '#ffedd5',
    iconColor: '#ea580c',
    icon: Flame,
    assetImg: catHerbsSpicesImg
  },
  oils: {
    bgColor: '#ccfbf1',
    iconColor: '#0d9488',
    icon: Droplet,
    assetImg: catOilsCondimentsImg
  },
  beverages: {
    bgColor: '#fce7f3',
    iconColor: '#db2777',
    icon: CupSoda,
    assetImg: catOrganicImg
  }
};

/**
 * CategoryIconAvatar Component
 * Displays a styled circular avatar with soft pastel background color and icon/image
 */
const CategoryIconAvatar = ({
  categoryName = '',
  customBgColor,
  customIconColor,
  useAssetImg = false,
  size = 'md',
  className = ''
}) => {
  const key = (categoryName || '').toLowerCase().trim();
  const preset = CATEGORY_PRESETS[key] || {
    bgColor: '#f3f4f6',
    iconColor: '#4b5563',
    icon: Folder,
    assetImg: null
  };

  const backgroundColor = customBgColor || preset.bgColor;
  const color = customIconColor || preset.iconColor;
  const IconComponent = preset.icon || Folder;

  return (
    <div
      className={`category-icon-avatar category-icon-avatar--${size} ${className}`}
      style={{ backgroundColor }}
      title={categoryName}
    >
      {useAssetImg && preset.assetImg ? (
        <img 
          src={preset.assetImg} 
          alt={categoryName} 
          className="category-icon-avatar-img"
        />
      ) : (
        <IconComponent size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20} color={color} />
      )}
    </div>
  );
};

export default CategoryIconAvatar;
