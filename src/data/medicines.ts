export interface Medicine {
  id: number;
  name: string;
  genericName: string;
  category: string;
  subcategory: string;
  description: string;
  composition: string;
  dosage: string;
  maxDose: string;
  sideEffects: string[];
  benefits: string[];
  contraindications: string[];
  interactions: string[];
  janAushadhiPrice: string;
  brandPrice: string;
  whoApproved: boolean;
  fdaApproved: boolean;
  janAushadhiAvailable: boolean;
  prescriptionRequired: boolean;
  ageGroup: string[];
  pregnancy: string;
  breastfeeding: string;
  storage: string;
  manufacturer: string[];
}

export const medicinesData: Medicine[] = [
  {
    id: 1,
    name: 'Paracetamol',
    genericName: 'Acetaminophen',
    category: 'painkillers',
    subcategory: 'analgesic-antipyretic',
    description: 'Common pain reliever and fever reducer, widely used for mild to moderate pain',
    composition: 'Paracetamol 500mg/650mg',
    dosage: '500mg-1000mg every 4-6 hours',
    maxDose: 'Maximum 4000mg per day (adults)',
    sideEffects: ['Nausea', 'Stomach upset', 'Liver damage (overdose)', 'Skin rash (rare)'],
    benefits: ['Effective pain relief', 'Reduces fever', 'Safe for most people', 'Available over-the-counter'],
    contraindications: ['Severe liver disease', 'Alcohol dependency', 'Known hypersensitivity'],
    interactions: ['Warfarin', 'Alcohol', 'Carbamazepine', 'Phenytoin'],
    janAushadhiPrice: '₹2-5 per tablet',
    brandPrice: '₹8-15 per tablet',
    whoApproved: true,
    fdaApproved: true,
    janAushadhiAvailable: true,
    prescriptionRequired: false,
    ageGroup: ['Adults', 'Children (>6 months)'],
    pregnancy: 'Safe in all trimesters',
    breastfeeding: 'Safe',
    storage: 'Store below 25°C, protect from moisture',
    manufacturer: ['Cipla', 'Sun Pharma', 'Dr. Reddy\'s', 'Lupin', 'Aurobindo']
  },
  {
    id: 2,
    name: 'Amoxicillin',
    genericName: 'Amoxicillin',
    category: 'antibiotics',
    subcategory: 'penicillin',
    description: 'Broad-spectrum antibiotic for bacterial infections',
    composition: 'Amoxicillin 250mg/500mg',
    dosage: '250mg-500mg every 8 hours',
    maxDose: 'As prescribed by doctor (max 3g/day)',
    sideEffects: ['Diarrhea', 'Nausea', 'Skin rash', 'Allergic reactions', 'Candidiasis'],
    benefits: ['Treats bacterial infections', 'Well-tolerated', 'Oral administration', 'Broad spectrum'],
    contraindications: ['Penicillin allergy', 'Mononucleosis', 'Severe kidney disease'],
    interactions: ['Methotrexate', 'Oral contraceptives', 'Allopurinol', 'Probenecid'],
    janAushadhiPrice: '₹15-25 per course',
    brandPrice: '₹50-100 per course',
    whoApproved: true,
    fdaApproved: true,
    janAushadhiAvailable: true,
    prescriptionRequired: true,
    ageGroup: ['Adults', 'Children', 'Infants'],
    pregnancy: 'Safe (Category B)',
    breastfeeding: 'Safe with caution',
    storage: 'Store below 25°C, complete course even if feeling better',
    manufacturer: ['Cipla', 'Ranbaxy', 'Aurobindo', 'Lupin', 'Cadila']
  },
  {
    id: 3,
    name: 'Metformin',
    genericName: 'Metformin Hydrochloride',
    category: 'diabetes',
    subcategory: 'biguanide',
    description: 'First-line medication for type 2 diabetes management',
    composition: 'Metformin HCl 500mg/850mg/1000mg',
    dosage: '500mg twice daily with meals, gradually increase',
    maxDose: 'Maximum 2550mg per day',
    sideEffects: ['Gastrointestinal upset', 'Diarrhea', 'Metallic taste', 'Vitamin B12 deficiency'],
    benefits: ['Lowers blood glucose', 'Weight neutral/loss', 'Cardiovascular benefits', 'Low hypoglycemia risk'],
    contraindications: ['Kidney disease', 'Liver disease', 'Heart failure', 'Metabolic acidosis'],
    interactions: ['Contrast agents', 'Alcohol', 'Cimetidine', 'Furosemide'],
    janAushadhiPrice: '₹3-8 per tablet',
    brandPrice: '₹12-25 per tablet',
    whoApproved: true,
    fdaApproved: true,
    janAushadhiAvailable: true,
    prescriptionRequired: true,
    ageGroup: ['Adults', 'Children (>10 years)'],
    pregnancy: 'Use with caution (Category B)',
    breastfeeding: 'Use with caution',
    storage: 'Store below 25°C, take with food',
    manufacturer: ['Sun Pharma', 'Cipla', 'Dr. Reddy\'s', 'Lupin', 'Glenmark']
  },
  {
    id: 4,
    name: 'Atorvastatin',
    genericName: 'Atorvastatin Calcium',
    category: 'cardiovascular',
    subcategory: 'statin',
    description: 'HMG-CoA reductase inhibitor for cholesterol management',
    composition: 'Atorvastatin 10mg/20mg/40mg/80mg',
    dosage: '10-80mg once daily in evening',
    maxDose: 'Maximum 80mg per day',
    sideEffects: ['Muscle pain', 'Liver enzyme elevation', 'Headache', 'Digestive issues'],
    benefits: ['Lowers LDL cholesterol', 'Reduces cardiovascular risk', 'Plaque stabilization', 'Stroke prevention'],
    contraindications: ['Active liver disease', 'Pregnancy', 'Breastfeeding', 'Muscle disorders'],
    interactions: ['Cyclosporine', 'Gemfibrozil', 'Warfarin', 'Digoxin'],
    janAushadhiPrice: '₹8-20 per tablet',
    brandPrice: '₹25-60 per tablet',
    whoApproved: true,
    fdaApproved: true,
    janAushadhiAvailable: true,
    prescriptionRequired: true,
    ageGroup: ['Adults'],
    pregnancy: 'Contraindicated (Category X)',
    breastfeeding: 'Contraindicated',
    storage: 'Store below 25°C, take in evening',
    manufacturer: ['Ranbaxy', 'Cipla', 'Dr. Reddy\'s', 'Lupin', 'Cadila']
  },
  {
    id: 5,
    name: 'Omeprazole',
    genericName: 'Omeprazole',
    category: 'gastrointestinal',
    subcategory: 'proton-pump-inhibitor',
    description: 'Proton pump inhibitor for acid-related disorders',
    composition: 'Omeprazole 20mg/40mg',
    dosage: '20mg once daily before breakfast',
    maxDose: 'Maximum 40mg per day',
    sideEffects: ['Headache', 'Diarrhea', 'Abdominal pain', 'Vitamin B12 deficiency'],
    benefits: ['Reduces stomach acid', 'Heals ulcers', 'Prevents GERD', 'H. pylori treatment'],
    contraindications: ['Known hypersensitivity', 'Severe liver impairment'],
    interactions: ['Clopidogrel', 'Warfarin', 'Phenytoin', 'Diazepam'],
    janAushadhiPrice: '₹3-8 per capsule',
    brandPrice: '₹15-30 per capsule',
    whoApproved: true,
    fdaApproved: true,
    janAushadhiAvailable: true,
    prescriptionRequired: false,
    ageGroup: ['Adults', 'Children (>1 year)'],
    pregnancy: 'Safe (Category C)',
    breastfeeding: 'Use with caution',
    storage: 'Store below 25°C, take before meals',
    manufacturer: ['Dr. Reddy\'s', 'Cipla', 'Sun Pharma', 'Lupin', 'Cadila']
  }
];

export const medicineCategories = [
  { id: 'all', name: 'All Medicines', count: medicinesData.length },
  { id: 'antibiotics', name: 'Antibiotics', count: medicinesData.filter(m => m.category === 'antibiotics').length },
  { id: 'painkillers', name: 'Pain Relief', count: medicinesData.filter(m => m.category === 'painkillers').length },
  { id: 'cardiovascular', name: 'Cardiovascular', count: medicinesData.filter(m => m.category === 'cardiovascular').length },
  { id: 'diabetes', name: 'Diabetes', count: medicinesData.filter(m => m.category === 'diabetes').length },
  { id: 'gastrointestinal', name: 'Gastrointestinal', count: medicinesData.filter(m => m.category === 'gastrointestinal').length },
  { id: 'vitamins', name: 'Vitamins & Supplements', count: medicinesData.filter(m => m.category === 'vitamins').length },
  { id: 'respiratory', name: 'Respiratory', count: medicinesData.filter(m => m.category === 'respiratory').length },
];