export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  subspecialty?: string;
  qualification: string[];
  experience: string;
  location: string;
  city: string;
  state: string;
  country: string;
  hospital: string;
  hospitalType: string;
  rating: number;
  reviews: number;
  phone: string;
  email: string;
  consultationFee: string;
  onlineConsultationFee?: string;
  languages: string[];
  availability: string;
  education: string[];
  certifications: string[];
  specializations: string[];
  awards?: string[];
  publications?: number;
  image: string;
  verified: boolean;
  telemedicine: boolean;
  emergencyAvailable: boolean;
}

export const doctorsData: Doctor[] = [
  {
    id: 1,
    name: 'Dr. Rajesh Kumar Sharma',
    specialty: 'cardiology',
    subspecialty: 'interventional-cardiology',
    qualification: ['MBBS', 'MD Internal Medicine', 'DM Cardiology'],
    experience: '15 years',
    location: 'bangalore',
    city: 'Bangalore',
    state: 'Karnataka',
    country: 'India',
    hospital: 'Apollo Hospital',
    hospitalType: 'Private',
    rating: 4.8,
    reviews: 245,
    phone: '+91 9876543210',
    email: 'dr.rajesh@apollo.com',
    consultationFee: '₹800',
    onlineConsultationFee: '₹500',
    languages: ['English', 'Hindi', 'Kannada', 'Telugu'],
    availability: 'Mon-Sat: 9:00 AM - 5:00 PM',
    education: ['AIIMS Delhi (MBBS)', 'PGIMER Chandigarh (MD)', 'AIIMS Delhi (DM)'],
    certifications: ['Board Certified Cardiologist', 'Fellow of American College of Cardiology'],
    specializations: ['Angioplasty', 'Cardiac Catheterization', 'Heart Failure Management', 'Preventive Cardiology'],
    awards: ['Best Cardiologist Award 2022', 'Excellence in Patient Care 2021'],
    publications: 45,
    image: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=400',
    verified: true,
    telemedicine: true,
    emergencyAvailable: true
  },
  {
    id: 2,
    name: 'Dr. Priya Sharma',
    specialty: 'neurology',
    subspecialty: 'stroke-neurology',
    qualification: ['MBBS', 'MD Internal Medicine', 'DM Neurology'],
    experience: '12 years',
    location: 'mumbai',
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    hospital: 'Fortis Hospital',
    hospitalType: 'Private',
    rating: 4.9,
    reviews: 189,
    phone: '+91 9876543211',
    email: 'dr.priya@fortis.com',
    consultationFee: '₹1000',
    onlineConsultationFee: '₹700',
    languages: ['English', 'Hindi', 'Marathi', 'Gujarati'],
    availability: 'Mon-Fri: 10:00 AM - 6:00 PM',
    education: ['KEM Hospital Mumbai (MBBS)', 'LTMMC Mumbai (MD)', 'NIMHANS Bangalore (DM)'],
    certifications: ['Board Certified Neurologist', 'Stroke Specialist Certification'],
    specializations: ['Stroke Management', 'Epilepsy', 'Movement Disorders', 'Headache Medicine'],
    awards: ['Young Neurologist Award 2020', 'Research Excellence Award 2019'],
    publications: 32,
    image: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=400',
    verified: true,
    telemedicine: true,
    emergencyAvailable: false
  },
  {
    id: 3,
    name: 'Dr. Amit Patel',
    specialty: 'orthopedics',
    subspecialty: 'joint-replacement',
    qualification: ['MBBS', 'MS Orthopedics', 'Fellowship Joint Replacement'],
    experience: '18 years',
    location: 'delhi',
    city: 'New Delhi',
    state: 'Delhi',
    country: 'India',
    hospital: 'AIIMS',
    hospitalType: 'Government',
    rating: 4.7,
    reviews: 312,
    phone: '+91 9876543212',
    email: 'dr.amit@aiims.edu',
    consultationFee: '₹600',
    onlineConsultationFee: '₹400',
    languages: ['English', 'Hindi', 'Gujarati', 'Punjabi'],
    availability: 'Tue-Sat: 8:00 AM - 4:00 PM',
    education: ['AIIMS Delhi (MBBS)', 'AIIMS Delhi (MS)', 'Johns Hopkins (Fellowship)'],
    certifications: ['Board Certified Orthopedic Surgeon', 'Joint Replacement Specialist'],
    specializations: ['Knee Replacement', 'Hip Replacement', 'Arthroscopy', 'Sports Medicine'],
    awards: ['Excellence in Surgery Award 2021', 'Best Teacher Award 2020'],
    publications: 67,
    image: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=400',
    verified: true,
    telemedicine: false,
    emergencyAvailable: true
  },
  {
    id: 4,
    name: 'Dr. Sarah Johnson',
    specialty: 'pediatrics',
    subspecialty: 'pediatric-cardiology',
    qualification: ['MBBS', 'MD Pediatrics', 'Fellowship Pediatric Cardiology'],
    experience: '10 years',
    location: 'chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    country: 'India',
    hospital: 'Apollo Children\'s Hospital',
    hospitalType: 'Private',
    rating: 4.9,
    reviews: 156,
    phone: '+91 9876543213',
    email: 'dr.sarah@apollo.com',
    consultationFee: '₹900',
    onlineConsultationFee: '₹600',
    languages: ['English', 'Tamil', 'Hindi', 'Telugu'],
    availability: 'Mon-Sat: 9:00 AM - 5:00 PM',
    education: ['CMC Vellore (MBBS)', 'CMC Vellore (MD)', 'Boston Children\'s Hospital (Fellowship)'],
    certifications: ['Board Certified Pediatrician', 'Pediatric Cardiology Specialist'],
    specializations: ['Congenital Heart Disease', 'Pediatric Echocardiography', 'Fetal Cardiology'],
    awards: ['Best Pediatric Cardiologist 2022', 'Compassionate Care Award 2021'],
    publications: 28,
    image: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=400',
    verified: true,
    telemedicine: true,
    emergencyAvailable: true
  },
  {
    id: 5,
    name: 'Dr. Michael Chen',
    specialty: 'oncology',
    subspecialty: 'medical-oncology',
    qualification: ['MBBS', 'MD Internal Medicine', 'DM Medical Oncology'],
    experience: '14 years',
    location: 'hyderabad',
    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    hospital: 'Yashoda Hospitals',
    hospitalType: 'Private',
    rating: 4.8,
    reviews: 203,
    phone: '+91 9876543214',
    email: 'dr.michael@yashoda.com',
    consultationFee: '₹1200',
    onlineConsultationFee: '₹800',
    languages: ['English', 'Hindi', 'Telugu', 'Chinese'],
    availability: 'Mon-Fri: 10:00 AM - 6:00 PM',
    education: ['AIIMS Delhi (MBBS)', 'AIIMS Delhi (MD)', 'Tata Memorial Hospital (DM)'],
    certifications: ['Board Certified Medical Oncologist', 'Hematology-Oncology Specialist'],
    specializations: ['Breast Cancer', 'Lung Cancer', 'Immunotherapy', 'Precision Medicine'],
    awards: ['Outstanding Oncologist Award 2021', 'Research Innovation Award 2020'],
    publications: 89,
    image: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=400',
    verified: true,
    telemedicine: true,
    emergencyAvailable: false
  }
];

export const specialties = [
  { id: 'all', name: 'All Specialties', count: doctorsData.length },
  { id: 'cardiology', name: 'Cardiology', count: doctorsData.filter(d => d.specialty === 'cardiology').length },
  { id: 'neurology', name: 'Neurology', count: doctorsData.filter(d => d.specialty === 'neurology').length },
  { id: 'orthopedics', name: 'Orthopedics', count: doctorsData.filter(d => d.specialty === 'orthopedics').length },
  { id: 'pediatrics', name: 'Pediatrics', count: doctorsData.filter(d => d.specialty === 'pediatrics').length },
  { id: 'oncology', name: 'Oncology', count: doctorsData.filter(d => d.specialty === 'oncology').length },
  { id: 'dermatology', name: 'Dermatology', count: doctorsData.filter(d => d.specialty === 'dermatology').length },
  { id: 'psychiatry', name: 'Psychiatry', count: doctorsData.filter(d => d.specialty === 'psychiatry').length },
  { id: 'gynecology', name: 'Gynecology', count: doctorsData.filter(d => d.specialty === 'gynecology').length },
];

export const locations = [
  { id: 'all', name: 'All Locations', count: doctorsData.length },
  { id: 'bangalore', name: 'Bangalore', count: doctorsData.filter(d => d.location === 'bangalore').length },
  { id: 'mumbai', name: 'Mumbai', count: doctorsData.filter(d => d.location === 'mumbai').length },
  { id: 'delhi', name: 'Delhi', count: doctorsData.filter(d => d.location === 'delhi').length },
  { id: 'chennai', name: 'Chennai', count: doctorsData.filter(d => d.location === 'chennai').length },
  { id: 'hyderabad', name: 'Hyderabad', count: doctorsData.filter(d => d.location === 'hyderabad').length },
  { id: 'pune', name: 'Pune', count: doctorsData.filter(d => d.location === 'pune').length },
  { id: 'kolkata', name: 'Kolkata', count: doctorsData.filter(d => d.location === 'kolkata').length },
];