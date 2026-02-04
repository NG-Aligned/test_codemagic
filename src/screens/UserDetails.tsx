import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { motion } from 'framer-motion';

export function UserDetails() {
  const navigate = useNavigate();
  const { updateBookingData } = useBooking();
  const [formData, setFormData] = useState({
    userName: '',
    userPhone: '',
    userEmail: '',
    notes: '',
    forSomeoneElse: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.userName.trim()) {
      newErrors.userName = 'Full name is required';
    }
    
    if (!formData.userPhone.trim()) {
      newErrors.userPhone = 'Phone number is required';
    } else if (!/^\+?[\d\s-()]+$/.test(formData.userPhone)) {
      newErrors.userPhone = 'Invalid phone number';
    }
    
    if (!formData.userEmail.trim()) {
      newErrors.userEmail = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.userEmail)) {
      newErrors.userEmail = 'Invalid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validate()) {
      updateBookingData(formData);
      navigate('/review');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white sticky top-0 z-10 px-5 py-4 flex items-center gap-3 border-b border-gray-100">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <h1 className="font-semibold text-gray-900">Patient Details</h1>
      </div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="px-5 py-6 space-y-5"
      >
        <div>
          <h2 className="font-semibold text-gray-900 mb-4">Your Information</h2>
          
          <div className="space-y-4">
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              value={formData.userName}
              onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
              error={errors.userName}
            />

            <Input
              label="Phone Number"
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={formData.userPhone}
              onChange={(e) => setFormData({ ...formData, userPhone: e.target.value })}
              error={errors.userPhone}
            />

            <Input
              label="Email Address"
              type="email"
              placeholder="your.email@example.com"
              value={formData.userEmail}
              onChange={(e) => setFormData({ ...formData, userEmail: e.target.value })}
              error={errors.userEmail}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Notes (Optional)
              </label>
              <textarea
                placeholder="Any specific concerns or requirements..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>
          </div>
        </div>

        {/* Toggle */}
        <div className="p-4 bg-white border border-gray-200 rounded-xl">
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <p className="font-medium text-gray-900">Booking for someone else?</p>
              <p className="text-sm text-gray-500 mt-0.5">
                Check if this appointment is for another person
              </p>
            </div>
            <div className="relative">
              <input
                type="checkbox"
                checked={formData.forSomeoneElse}
                onChange={(e) => setFormData({ ...formData, forSomeoneElse: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </div>
          </label>
        </div>
      </motion.div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 px-5 py-4" style={{ maxWidth: '390px', margin: '0 auto' }}>
        {/* Glassmorphism effect */}
        <div className="absolute inset-0 bg-white/80 backdrop-blur-xl border-t border-white/20 shadow-2xl" style={{ borderRadius: '24px 24px 0 0' }} />
        <div className="relative">
          <Button onClick={handleContinue} fullWidth>
            Review Booking
          </Button>
        </div>
      </div>
    </div>
  );
}