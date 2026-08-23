import farmerImg from '../../../assets/farmer.png';
import userImg2 from '../../../assets/image copy 2.png';
import userImg3 from '../../../assets/image copy 3.png';

export const mockConsumers = [
  {
    id: 'CONS001',
    name: 'Ramesh Kumar',
    status: 'Active',
    phone: '9876543210',
    email: 'ramesh.kumar@email.com',
    location: 'Lucknow, Uttar Pradesh',
    fullLocation: 'Lucknow, Uttar Pradesh, India',
    joinedOn: '10 May 2024',
    joinedOnTime: '10 May 2024, 09:15 AM',
    totalOrders: 12,
    totalSpent: 2450.0,
    formattedTotalSpent: '₹2,450.00',
    avgOrderValue: '₹204.17',
    lastOrderTimeAgo: '2 months ago',
    firstOrderDate: '12 Apr 2024, 10:20 AM',
    lastOrderDate: '10 May 2024, 09:15 AM',
    avatar: farmerImg,
    notes: [],
    recentOrders: [
      { id: 'ORD12345', number: '#ORD12345', date: '10 May 2024, 09:15 AM', status: 'Delivered', amount: '₹1,250.00' },
      { id: 'ORD12344', number: '#ORD12344', date: '10 May 2024, 08:40 AM', status: 'Pending', amount: '₹850.00' },
      { id: 'ORD12343', number: '#ORD12343', date: '09 May 2024, 07:20 PM', status: 'Shipped', amount: '₹1,560.00' },
      { id: 'ORD12342', number: '#ORD12342', date: '09 May 2024, 06:10 PM', status: 'Delivered', amount: '₹620.00' },
      { id: 'ORD12341', number: '#ORD12341', date: '09 May 2024, 04:30 PM', status: 'Cancelled', amount: '₹430.00' },
    ],
    addresses: [
      { id: 'addr-1', type: 'Home', isDefault: true, line: '123, Green Street, Gomti Nagar', city: 'Lucknow', state: 'Uttar Pradesh', pincode: '226010' },
      { id: 'addr-2', type: 'Office', isDefault: false, line: '45, Tech Park, Vibhuti Khand', city: 'Lucknow', state: 'Uttar Pradesh', pincode: '226010' },
    ],
    activities: [
      { id: 'act-1', text: 'Placed order #ORD12345 for ₹1,250.00', time: '10 May 2024, 09:15 AM' },
      { id: 'act-2', text: 'Updated home delivery address', time: '05 May 2024, 02:10 PM' },
      { id: 'act-3', text: 'Account registered via Mobile OTP', time: '10 May 2024, 08:00 AM' },
    ]
  },
  {
    id: 'CONS002',
    name: 'Sunita Devi',
    status: 'Active',
    phone: '8765432109',
    email: 'sunita.devi@email.com',
    location: 'Kanpur, Uttar Pradesh',
    fullLocation: 'Kanpur, Uttar Pradesh, India',
    joinedOn: '08 May 2024',
    joinedOnTime: '08 May 2024, 11:30 AM',
    totalOrders: 8,
    totalSpent: 1150.0,
    formattedTotalSpent: '₹1,150.00',
    avgOrderValue: '₹143.75',
    lastOrderTimeAgo: '1 month ago',
    firstOrderDate: '10 Apr 2024, 09:15 AM',
    lastOrderDate: '10 May 2024, 08:40 AM',
    avatar: userImg3,
    notes: ['Preferred delivery time: Morning (9 AM - 12 PM)'],
    recentOrders: [
      { id: 'ORD12344', number: '#ORD12344', date: '10 May 2024, 08:40 AM', status: 'Pending', amount: '₹850.00' },
      { id: 'ORD12338', number: '#ORD12338', date: '01 May 2024, 03:00 PM', status: 'Delivered', amount: '₹300.00' },
    ],
    addresses: [
      { id: 'addr-1', type: 'Home', isDefault: true, line: '45, MG Road, Civil Lines', city: 'Kanpur', state: 'Uttar Pradesh', pincode: '208001' },
    ],
    activities: [
      { id: 'act-1', text: 'Placed order #ORD12344 for ₹850.00', time: '10 May 2024, 08:40 AM' },
    ]
  },
  {
    id: 'CONS003',
    name: 'Amit Verma',
    status: 'Inactive',
    phone: '7654321098',
    email: 'amit.verma@email.com',
    location: 'Agra, Uttar Pradesh',
    fullLocation: 'Agra, Uttar Pradesh, India',
    joinedOn: '05 May 2024',
    joinedOnTime: '05 May 2024, 02:45 PM',
    totalOrders: 5,
    totalSpent: 820.0,
    formattedTotalSpent: '₹820.00',
    avgOrderValue: '₹164.00',
    lastOrderTimeAgo: '3 months ago',
    firstOrderDate: '15 Apr 2024, 04:00 PM',
    lastOrderDate: '09 May 2024, 07:20 PM',
    avatar: userImg2,
    notes: [],
    recentOrders: [
      { id: 'ORD12343', number: '#ORD12343', date: '09 May 2024, 07:20 PM', status: 'Shipped', amount: '₹1,560.00' },
    ],
    addresses: [
      { id: 'addr-1', type: 'Home', isDefault: true, line: '78, Taj Road', city: 'Agra', state: 'Uttar Pradesh', pincode: '282001' },
    ],
    activities: [
      { id: 'act-1', text: 'Logged in from desktop browser', time: '09 May 2024, 07:15 PM' },
    ]
  },
  {
    id: 'CONS004',
    name: 'Priya Sharma',
    status: 'Active',
    phone: '6543210987',
    email: 'priya.sharma@email.com',
    location: 'Varanasi, Uttar Pradesh',
    fullLocation: 'Varanasi, Uttar Pradesh, India',
    joinedOn: '04 May 2024',
    joinedOnTime: '04 May 2024, 10:10 AM',
    totalOrders: 10,
    totalSpent: 1980.0,
    formattedTotalSpent: '₹1,980.00',
    avgOrderValue: '₹198.00',
    lastOrderTimeAgo: '3 days ago',
    firstOrderDate: '01 Apr 2024, 11:00 AM',
    lastOrderDate: '09 May 2024, 06:10 PM',
    avatar: userImg3,
    notes: [],
    recentOrders: [
      { id: 'ORD12342', number: '#ORD12342', date: '09 May 2024, 06:10 PM', status: 'Delivered', amount: '₹620.00' },
    ],
    addresses: [
      { id: 'addr-1', type: 'Home', isDefault: true, line: '12, Assi Ghat Road', city: 'Varanasi', state: 'Uttar Pradesh', pincode: '221005' },
    ],
    activities: [
      { id: 'act-1', text: 'Placed order #ORD12342 for ₹620.00', time: '09 May 2024, 06:10 PM' },
    ]
  },
  {
    id: 'CONS005',
    name: 'Vikram Singh',
    status: 'Active',
    phone: '5432109876',
    email: 'vikram.singh@email.com',
    location: 'Meerut, Uttar Pradesh',
    fullLocation: 'Meerut, Uttar Pradesh, India',
    joinedOn: '02 May 2024',
    joinedOnTime: '02 May 2024, 01:20 PM',
    totalOrders: 7,
    totalSpent: 1320.0,
    formattedTotalSpent: '₹1,320.00',
    avgOrderValue: '₹188.57',
    lastOrderTimeAgo: '1 week ago',
    firstOrderDate: '05 Apr 2024, 05:30 PM',
    lastOrderDate: '09 May 2024, 04:30 PM',
    avatar: userImg2,
    notes: [],
    recentOrders: [
      { id: 'ORD12341', number: '#ORD12341', date: '09 May 2024, 04:30 PM', status: 'Cancelled', amount: '₹430.00' },
    ],
    addresses: [
      { id: 'addr-1', type: 'Home', isDefault: true, line: '89, Mall Road', city: 'Meerut', state: 'Uttar Pradesh', pincode: '250001' },
    ],
    activities: [
      { id: 'act-1', text: 'Cancelled order #ORD12341', time: '09 May 2024, 05:00 PM' },
    ]
  },
  {
    id: 'CONS006',
    name: 'Neha Patel',
    status: 'Inactive',
    phone: '4321098765',
    email: 'neha.patel@email.com',
    location: 'Prayagraj, Uttar Pradesh',
    fullLocation: 'Prayagraj, Uttar Pradesh, India',
    joinedOn: '01 May 2024',
    joinedOnTime: '01 May 2024, 09:00 AM',
    totalOrders: 3,
    totalSpent: 550.0,
    formattedTotalSpent: '₹550.00',
    avgOrderValue: '₹183.33',
    lastOrderTimeAgo: '4 months ago',
    firstOrderDate: '10 Apr 2024, 08:20 AM',
    lastOrderDate: '09 May 2024, 03:15 PM',
    avatar: userImg3,
    notes: [],
    recentOrders: [
      { id: 'ORD12340', number: '#ORD12340', date: '09 May 2024, 03:15 PM', status: 'Pending', amount: '₹980.00' },
    ],
    addresses: [
      { id: 'addr-1', type: 'Home', isDefault: true, line: '34, Civil Lines', city: 'Prayagraj', state: 'Uttar Pradesh', pincode: '211001' },
    ],
    activities: [
      { id: 'act-1', text: 'Account registered', time: '01 May 2024, 09:00 AM' },
    ]
  }
];
