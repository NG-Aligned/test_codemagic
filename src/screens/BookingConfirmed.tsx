import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { CheckCircle2, Calendar, Clock, User, MapPin, Phone, Mail } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { Button } from '../components/Button';
import { Confetti } from '../components/Confetti';
import { motion } from 'motion/react';

export function BookingConfirmed() {
  const navigate = useNavigate();
  const { bookingData, resetBooking } = useBooking();
  const [showConfetti, setShowConfetti] = useState(false);

  const bookingId = Math.random().toString(36).substring(2, 9).toUpperCase();

  const selectedDate = bookingData.selectedDate 
    ? new Date(bookingData.selectedDate)
    : new Date();

  const formattedDate = selectedDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  useEffect(() => {
    // Trigger confetti after component mounts
    const timer = setTimeout(() => {
      setShowConfetti(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleBackToHome = () => {
    resetBooking();
    navigate('/');
  };

  const handleAddToCalendar = () => {
    // In a real app, this would integrate with calendar APIs
    alert('Calendar integration would be implemented here');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {showConfetti && <Confetti />}
      
      <div className="px-5 py-8 max-w-md mx-auto">
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-6"
        >
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-14 h-14 text-green-600" />
          </div>
        </motion.div>

        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center mb-8"
        >
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Booking Confirmed!
          </h1>
          <p className="text-gray-600">
            Your appointment has been successfully scheduled
          </p>
          <div className="mt-3 inline-block px-4 py-2 bg-blue-50 rounded-lg">
            <span className="text-sm text-gray-600">Booking ID: </span>
            <span className="text-sm font-semibold text-blue-600">{bookingId}</span>
          </div>
        </motion.div>

        {/* Appointment Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 space-y-4"
        >
          <h2 className="font-semibold text-gray-900 pb-3 border-b border-gray-100">
            Appointment Details
          </h2>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">Service & Provider</p>
                <p className="font-medium text-gray-900">{bookingData.serviceName}</p>
                <p className="text-sm text-gray-600">with {bookingData.providerName}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-medium text-gray-900">{formattedDate}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">Time</p>
                <p className="font-medium text-gray-900">{bookingData.selectedTime}</p>
                <p className="text-sm text-gray-600">{bookingData.serviceDuration} minutes</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">Patient</p>
                <p className="font-medium text-gray-900">{bookingData.userName}</p>
                <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                  <Phone className="w-3.5 h-3.5" />
                  <span>{bookingData.userPhone}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                  <Mail className="w-3.5 h-3.5" />
                  <span>{bookingData.userEmail}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
            <span className="text-gray-600">Total Amount</span>
            <span className="text-xl font-semibold text-gray-900">${bookingData.servicePrice}</span>
          </div>
        </motion.div>

        {/* Location Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-blue-50 border border-blue-100 rounded-2xl p-4 mb-6"
        >
          <div className="flex gap-3">
            <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900 mb-1">HealthCare Medical Center</p>
              <p className="text-sm text-gray-600">123 Medical Plaza, Suite 100</p>
              <p className="text-sm text-gray-600">San Francisco, CA 94102</p>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="space-y-3"
        >
          <Button onClick={handleAddToCalendar} variant="secondary" fullWidth>
            <Calendar className="w-5 h-5 mr-2" />
            Add to Calendar
          </Button>
          <Button onClick={handleBackToHome} fullWidth>
            Back to Home
          </Button>
        </motion.div>

        {/* Confirmation Message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-sm text-gray-500 mt-6"
        >
          A confirmation email has been sent to {bookingData.userEmail}
        </motion.p>
      </div>
    </div>
  );
}