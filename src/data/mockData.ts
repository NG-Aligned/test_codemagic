export interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  duration: number;
  price: number;
  rating: number;
  reviewCount: number;
  image: string;
}

export interface Provider {
  id: string;
  name: string;
  title: string;
  rating: number;
  reviewCount: number;
  avatar: string;
}

export const categories = [
  { id: 'all', name: 'All', icon: '🏥' },
  { id: 'general', name: 'General', icon: '👨‍⚕️' },
  { id: 'dental', name: 'Dental', icon: '🦷' },
  { id: 'therapy', name: 'Therapy', icon: '🧘' },
  { id: 'skin', name: 'Skin', icon: '✨' },
];

export const services: Service[] = [
  {
    id: '1',
    name: 'General Consultation',
    category: 'general',
    description: 'Comprehensive medical consultation with our experienced doctors. Discuss your health concerns, get accurate diagnosis, and receive personalized treatment plans. Perfect for routine check-ups or specific health issues.',
    duration: 30,
    price: 75,
    rating: 4.8,
    reviewCount: 234,
    image: 'https://images.unsplash.com/photo-1758691463606-1493d79cc577?w=400',
  },
  {
    id: '2',
    name: 'Dental Cleaning',
    category: 'dental',
    description: 'Professional dental cleaning and oral hygiene maintenance. Includes plaque removal, polishing, fluoride treatment, and comprehensive oral health assessment. Keep your smile bright and healthy.',
    duration: 45,
    price: 120,
    rating: 4.9,
    reviewCount: 189,
    image: 'https://images.unsplash.com/photo-1581585004042-bca38021ce1e?w=400',
  },
  {
    id: '3',
    name: 'Physical Therapy',
    category: 'therapy',
    description: 'Personalized physical therapy session to help with recovery, pain management, and mobility improvement. Our licensed therapists create custom treatment plans for your specific needs.',
    duration: 60,
    price: 95,
    rating: 4.7,
    reviewCount: 156,
    image: 'https://images.unsplash.com/photo-1764314138160-5f04f4a50dae?w=400',
  },
  {
    id: '4',
    name: 'Skin Analysis',
    category: 'skin',
    description: 'Advanced skin analysis and consultation with our dermatology experts. Get personalized skincare recommendations, treatment options for skin conditions, and anti-aging solutions.',
    duration: 45,
    price: 110,
    rating: 4.9,
    reviewCount: 203,
    image: 'https://images.unsplash.com/photo-1606501190025-f3ad6d3ea6ae?w=400',
  },
  {
    id: '5',
    name: 'Mental Health Consultation',
    category: 'therapy',
    description: 'Confidential counseling session with licensed mental health professionals. Address anxiety, stress, depression, or life challenges in a safe and supportive environment.',
    duration: 50,
    price: 130,
    rating: 4.8,
    reviewCount: 167,
    image: 'https://images.unsplash.com/photo-1758273240360-76b908e7582a?w=400',
  },
  {
    id: '6',
    name: 'Pediatric Check-up',
    category: 'general',
    description: 'Complete health examination for children and adolescents. Includes growth monitoring, developmental assessment, vaccinations, and parental guidance for optimal child health.',
    duration: 40,
    price: 85,
    rating: 4.9,
    reviewCount: 278,
    image: 'https://images.unsplash.com/photo-1758691462284-9eeec33fb0e7?w=400',
  },
];

export const providers: Provider[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    title: 'General Practitioner',
    rating: 4.9,
    reviewCount: 342,
    avatar: 'female doctor professional',
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    title: 'Dentist',
    rating: 4.8,
    reviewCount: 289,
    avatar: 'male dentist professional',
  },
  {
    id: '3',
    name: 'Emma Williams',
    title: 'Physical Therapist',
    rating: 4.7,
    reviewCount: 234,
    avatar: 'female therapist professional',
  },
  {
    id: '4',
    name: 'Dr. James Rodriguez',
    title: 'Dermatologist',
    rating: 4.9,
    reviewCount: 412,
    avatar: 'male dermatologist professional',
  },
];

export const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
];

export const unavailableSlots = ['09:30', '11:00', '14:00', '15:30'];