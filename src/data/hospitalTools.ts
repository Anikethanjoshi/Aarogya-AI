export interface HospitalTool {
  id: number;
  name: string;
  category: string;
  subcategory: string;
  description: string;
  uses: string[];
  benefits: string[];
  specifications: string[];
  priceRange: string;
  manufacturer: string[];
  whoApproved: boolean;
  fdaApproved: boolean;
  ceMarked: boolean;
  image: string;
  department: string[];
  bodyPart: string[];
  complexity: 'Basic' | 'Intermediate' | 'Advanced';
  maintenance: string;
  training: string;
}

export const hospitalToolsData: HospitalTool[] = [
  // Diagnostic Equipment
  {
    id: 1,
    name: 'Digital Stethoscope',
    category: 'diagnostic',
    subcategory: 'auscultation',
    description: 'Advanced digital stethoscope with noise cancellation and recording capabilities',
    uses: ['Heart sound examination', 'Lung sound analysis', 'Telemedicine consultations', 'Medical education'],
    benefits: ['Enhanced sound quality', 'Digital recording', 'Remote consultation capability', 'Noise reduction'],
    specifications: ['Frequency range: 20Hz-20kHz', 'Battery life: 40+ hours', 'Bluetooth connectivity', 'Memory: 30+ recordings'],
    priceRange: '₹15,000 - ₹50,000',
    manufacturer: ['3M Littmann', 'Eko', 'Thinklabs', 'Welch Allyn'],
    whoApproved: true,
    fdaApproved: true,
    ceMarked: true,
    image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=400',
    department: ['Cardiology', 'Pulmonology', 'General Medicine', 'Emergency'],
    bodyPart: ['Heart', 'Lungs', 'Abdomen'],
    complexity: 'Basic',
    maintenance: 'Monthly calibration, battery replacement',
    training: '2-4 hours basic training required'
  },
  {
    id: 2,
    name: 'Ultrasound Machine - Portable',
    category: 'diagnostic',
    subcategory: 'imaging',
    description: 'Portable ultrasound machine for real-time imaging and diagnostics',
    uses: ['Pregnancy monitoring', 'Organ examination', 'Emergency diagnostics', 'Point-of-care imaging'],
    benefits: ['Non-invasive imaging', 'Real-time results', 'Portable design', 'No radiation exposure'],
    specifications: ['Frequency: 2-15 MHz', 'Display: 15-inch LCD', 'Battery: 2+ hours', 'Weight: 5-8 kg'],
    priceRange: '₹2,00,000 - ₹15,00,000',
    manufacturer: ['GE Healthcare', 'Philips', 'Siemens', 'Mindray', 'Samsung Medison'],
    whoApproved: true,
    fdaApproved: true,
    ceMarked: true,
    image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=400',
    department: ['Radiology', 'Obstetrics', 'Emergency', 'Cardiology'],
    bodyPart: ['Abdomen', 'Heart', 'Pelvis', 'Vascular'],
    complexity: 'Intermediate',
    maintenance: 'Quarterly service, probe calibration',
    training: '40-80 hours specialized training'
  },
  {
    id: 3,
    name: 'ECG Machine - 12 Lead',
    category: 'diagnostic',
    subcategory: 'cardiac',
    description: 'Digital 12-lead ECG machine for cardiac rhythm analysis',
    uses: ['Heart rhythm monitoring', 'Cardiac diagnosis', 'Pre-operative assessment', 'Emergency cardiac care'],
    benefits: ['Accurate cardiac analysis', 'Digital storage', 'Automatic interpretation', 'Portable design'],
    specifications: ['12-lead capability', 'Digital display', 'Thermal printer', 'USB connectivity'],
    priceRange: '₹25,000 - ₹1,50,000',
    manufacturer: ['Philips', 'GE Healthcare', 'Schiller', 'Nihon Kohden', 'BPL Medical'],
    whoApproved: true,
    fdaApproved: true,
    ceMarked: true,
    image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=400',
    department: ['Cardiology', 'Emergency', 'ICU', 'General Medicine'],
    bodyPart: ['Heart'],
    complexity: 'Basic',
    maintenance: 'Monthly calibration, electrode replacement',
    training: '8-16 hours training required'
  },
  // Surgical Instruments
  {
    id: 4,
    name: 'Surgical Forceps Set',
    category: 'surgical',
    subcategory: 'grasping',
    description: 'Precision surgical forceps for delicate procedures and tissue handling',
    uses: ['Tissue handling', 'Suturing', 'Microsurgery', 'Foreign body removal'],
    benefits: ['Precise control', 'Sterile design', 'Ergonomic grip', 'Durable construction'],
    specifications: ['Stainless steel 316L', 'Length: 10-25cm', 'Various tip designs', 'Autoclavable'],
    priceRange: '₹500 - ₹5,000',
    manufacturer: ['Aesculap', 'Medtronic', 'KLS Martin', 'Rumex', 'Surgicon'],
    whoApproved: true,
    fdaApproved: true,
    ceMarked: true,
    image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=400',
    department: ['Surgery', 'Emergency', 'Dermatology', 'Plastic Surgery'],
    bodyPart: ['All body parts'],
    complexity: 'Basic',
    maintenance: 'Sterilization after each use, sharpening as needed',
    training: '4-8 hours basic surgical training'
  },
  {
    id: 5,
    name: 'Laparoscopic Camera System',
    category: 'surgical',
    subcategory: 'visualization',
    description: 'High-definition laparoscopic camera system for minimally invasive surgery',
    uses: ['Laparoscopic surgery', 'Endoscopic procedures', 'Minimally invasive surgery', 'Diagnostic laparoscopy'],
    benefits: ['High-definition imaging', 'Minimally invasive', 'Reduced recovery time', 'Better visualization'],
    specifications: ['4K resolution', 'LED light source', 'Digital zoom', 'Image recording capability'],
    priceRange: '₹15,00,000 - ₹50,00,000',
    manufacturer: ['Karl Storz', 'Olympus', 'Stryker', 'Ethicon', 'Medtronic'],
    whoApproved: true,
    fdaApproved: true,
    ceMarked: true,
    image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=400',
    department: ['General Surgery', 'Gynecology', 'Urology', 'Gastroenterology'],
    bodyPart: ['Abdomen', 'Pelvis'],
    complexity: 'Advanced',
    maintenance: 'Regular calibration, lens cleaning, system updates',
    training: '80-120 hours specialized training'
  },
  // Monitoring Equipment
  {
    id: 6,
    name: 'Patient Monitor - Multi-Parameter',
    category: 'monitoring',
    subcategory: 'vital-signs',
    description: 'Multi-parameter patient monitoring system for continuous vital signs monitoring',
    uses: ['Vital signs monitoring', 'ICU care', 'Surgery monitoring', 'Emergency care'],
    benefits: ['Continuous monitoring', 'Alarm systems', 'Data recording', 'Network connectivity'],
    specifications: ['ECG, SpO2, NIBP, Temperature', '15-inch display', 'Wireless connectivity', 'Battery backup'],
    priceRange: '₹50,000 - ₹3,00,000',
    manufacturer: ['Philips', 'GE Healthcare', 'Mindray', 'Nihon Kohden', 'Drager'],
    whoApproved: true,
    fdaApproved: true,
    ceMarked: true,
    image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=400',
    department: ['ICU', 'Emergency', 'Surgery', 'Cardiology'],
    bodyPart: ['Heart', 'Lungs', 'Circulatory System'],
    complexity: 'Intermediate',
    maintenance: 'Monthly calibration, sensor replacement',
    training: '16-24 hours training required'
  },
  // Add more comprehensive tools...
  {
    id: 7,
    name: 'MRI Scanner - 1.5T',
    category: 'diagnostic',
    subcategory: 'imaging',
    description: 'Magnetic Resonance Imaging scanner for detailed soft tissue imaging',
    uses: ['Brain imaging', 'Spinal cord examination', 'Joint assessment', 'Cardiac imaging'],
    benefits: ['Detailed soft tissue imaging', 'No radiation exposure', 'Multiple imaging sequences', 'High resolution'],
    specifications: ['1.5 Tesla magnetic field', 'Gradient strength: 33 mT/m', 'Bore diameter: 60cm', 'Helium-cooled'],
    priceRange: '₹8,00,00,000 - ₹15,00,00,000',
    manufacturer: ['Siemens', 'GE Healthcare', 'Philips', 'Canon Medical', 'Hitachi'],
    whoApproved: true,
    fdaApproved: true,
    ceMarked: true,
    image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=400',
    department: ['Radiology', 'Neurology', 'Orthopedics', 'Cardiology'],
    bodyPart: ['Brain', 'Spine', 'Joints', 'Heart'],
    complexity: 'Advanced',
    maintenance: 'Daily helium level check, quarterly service',
    training: '200+ hours specialized training'
  },
  {
    id: 8,
    name: 'Ventilator - ICU Grade',
    category: 'life-support',
    subcategory: 'respiratory',
    description: 'Advanced mechanical ventilator for critical care respiratory support',
    uses: ['Respiratory failure support', 'Post-operative care', 'Emergency ventilation', 'Long-term ventilation'],
    benefits: ['Life-saving respiratory support', 'Multiple ventilation modes', 'Advanced monitoring', 'Alarm systems'],
    specifications: ['Volume/Pressure modes', 'PEEP capability', 'FiO2: 21-100%', 'Tidal volume: 50-2000ml'],
    priceRange: '₹5,00,000 - ₹25,00,000',
    manufacturer: ['Medtronic', 'Philips', 'Drager', 'Hamilton Medical', 'Getinge'],
    whoApproved: true,
    fdaApproved: true,
    ceMarked: true,
    image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=400',
    department: ['ICU', 'Emergency', 'Anesthesia', 'Pulmonology'],
    bodyPart: ['Lungs', 'Respiratory System'],
    complexity: 'Advanced',
    maintenance: 'Daily function checks, weekly calibration',
    training: '40-60 hours intensive training'
  }
];

export const toolCategories = [
  { id: 'all', name: 'All Tools', count: hospitalToolsData.length },
  { id: 'diagnostic', name: 'Diagnostic Equipment', count: hospitalToolsData.filter(t => t.category === 'diagnostic').length },
  { id: 'surgical', name: 'Surgical Instruments', count: hospitalToolsData.filter(t => t.category === 'surgical').length },
  { id: 'monitoring', name: 'Monitoring Systems', count: hospitalToolsData.filter(t => t.category === 'monitoring').length },
  { id: 'life-support', name: 'Life Support', count: hospitalToolsData.filter(t => t.category === 'life-support').length },
  { id: 'laboratory', name: 'Laboratory Equipment', count: hospitalToolsData.filter(t => t.category === 'laboratory').length },
  { id: 'rehabilitation', name: 'Rehabilitation', count: hospitalToolsData.filter(t => t.category === 'rehabilitation').length },
];

export const departments = [
  'Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Dermatology', 'Radiology',
  'Emergency', 'ICU', 'Surgery', 'Anesthesia', 'Pulmonology', 'Gastroenterology',
  'Urology', 'Gynecology', 'Oncology', 'Psychiatry', 'Ophthalmology', 'ENT'
];