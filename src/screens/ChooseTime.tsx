import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Clock } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { Button } from '../components/Button';
import { TimeSlot } from '../components/TimeSlot';
import { timeSlots, unavailableSlots } from '../data/mockData';
import { motion } from 'framer-motion';

export function ChooseTime() {
  const navigate = useNavigate();
  const { bookingData, updateBookingData } = useBooking();
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const selectedDate = bookingData.selectedDate 
    ? new Date(bookingData.selectedDate)
    : new Date();

  const formattedDate = selectedDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  const handleContinue = () => {
    if (selectedTime) {
      updateBookingData({
        selectedTime,
      });
      navigate('/user-details');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white sticky top-0 z-10 px-5 py-4 flex items-center gap-3 border-b border-gray-100">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <div className="flex-1">
          <h1 className="font-semibold text-gray-900">Choose Time</h1>
          <p className="text-sm text-gray-500">{formattedDate}</p>
        </div>
      </div>

      {/* Time Slots */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="px-5 py-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-gray-400" />
          <h2 className="font-semibold text-gray-900">Available Time Slots</h2>
        </div>
        
        <div className="grid grid-cols-3 gap-3">
          {timeSlots.map((time, index) => (
            <motion.div
              key={time}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 + (index * 0.02) }}
            >
              <TimeSlot
                time={time}
                selected={selectedTime === time}
                available={!unavailableSlots.includes(time)}
                onSelect={() => setSelectedTime(time)}
              />
            </motion.div>
          ))}
        </div>

        <div className="flex items-center gap-3 mt-6 p-4 bg-blue-50 rounded-xl">
          <div className="flex gap-2">
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 bg-blue-600 rounded"></div>
              <span className="text-xs text-gray-600">Selected</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 bg-gray-100 rounded"></div>
              <span className="text-xs text-gray-600">Unavailable</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 px-5 py-4" style={{ maxWidth: '390px', margin: '0 auto' }}>
        {/* Glassmorphism effect */}
        <div className="absolute inset-0 bg-white/80 backdrop-blur-xl border-t border-white/20 shadow-2xl" style={{ borderRadius: '24px 24px 0 0' }} />
        <div className="relative">
          <Button onClick={handleContinue} fullWidth disabled={!selectedTime}>
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}