import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { Button } from '../components/Button';
import { Calendar } from '../components/Calendar';
import { motion } from 'framer-motion';

export function ChooseDate() {
  const navigate = useNavigate();
  const { bookingData, updateBookingData } = useBooking();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleContinue = () => {
    if (selectedDate) {
      updateBookingData({
        selectedDate: selectedDate.toISOString(),
      });
      navigate('/choose-time');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white sticky top-0 z-10 px-5 py-4 flex items-center gap-3 border-b border-gray-100">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <div className="flex-1">
          <h1 className="font-semibold text-gray-900">Choose Date</h1>
          <p className="text-sm text-gray-500">{bookingData.serviceName}</p>
        </div>
      </div>

      {/* Calendar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="px-5 py-6"
      >
        <Calendar
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />
      </motion.div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 px-5 py-4" style={{ maxWidth: '390px', margin: '0 auto' }}>
        {/* Glassmorphism effect */}
        <div className="absolute inset-0 bg-white/80 backdrop-blur-xl border-t border-white/20 shadow-2xl" style={{ borderRadius: '24px 24px 0 0' }} />
        <div className="relative">
          <Button onClick={handleContinue} fullWidth disabled={!selectedDate}>
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}