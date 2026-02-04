import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Calendar, Clock, User, DollarSign, CreditCard, Banknote, FileText, Edit2 } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { Button } from '../components/Button';
import { motion } from 'motion/react';

export function ReviewConfirm() {
  const navigate = useNavigate();
  const { bookingData, updateBookingData } = useBooking();
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash' | 'insurance'>('card');
  const [isConfirming, setIsConfirming] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const selectedDate = bookingData.selectedDate 
    ? new Date(bookingData.selectedDate)
    : new Date();

  const formattedDate = selectedDate.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const handleConfirm = async () => {
    setIsConfirming(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsConfirming(false);
    setIsSuccess(true);
    
    // Wait for success animation then navigate
    setTimeout(() => {
      updateBookingData({ paymentMethod });
      navigate('/confirmed');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white sticky top-0 z-10 px-5 py-4 flex items-center gap-3 border-b border-gray-100">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <h1 className="font-semibold text-gray-900">Review & Confirm</h1>
      </div>

      <div className="px-5 py-6 space-y-5">
        {/* Service Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white border border-gray-200 rounded-2xl p-5 space-y-4"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="font-semibold text-gray-900 mb-1">{bookingData.serviceName}</h2>
              <p className="text-sm text-gray-500">with {bookingData.providerName}</p>
            </div>
            <button 
              onClick={() => navigate('/service/' + bookingData.serviceId)}
              className="text-blue-600 hover:text-blue-700 p-1"
            >
              <Edit2 className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3 pt-3 border-t border-gray-100">
            <div className="flex items-center gap-3 text-sm">
              <Calendar className="w-5 h-5 text-gray-400" />
              <span className="text-gray-900">{formattedDate}</span>
              <button 
                onClick={() => navigate('/choose-date')}
                className="ml-auto text-blue-600 hover:text-blue-700 text-sm"
              >
                Edit
              </button>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <Clock className="w-5 h-5 text-gray-400" />
              <span className="text-gray-900">{bookingData.selectedTime}</span>
              <button 
                onClick={() => navigate('/choose-time')}
                className="ml-auto text-blue-600 hover:text-blue-700 text-sm"
              >
                Edit
              </button>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <User className="w-5 h-5 text-gray-400" />
              <span className="text-gray-900">{bookingData.userName}</span>
              <button 
                onClick={() => navigate('/user-details')}
                className="ml-auto text-blue-600 hover:text-blue-700 text-sm"
              >
                Edit
              </button>
            </div>

            <div className="flex items-center gap-3 text-sm pt-3 border-t border-gray-100">
              <DollarSign className="w-5 h-5 text-green-600" />
              <span className="font-semibold text-gray-900">${bookingData.servicePrice}</span>
              <span className="text-gray-500">• {bookingData.serviceDuration} mins</span>
            </div>
          </div>
        </motion.div>

        {/* Payment Method */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="font-semibold text-gray-900 mb-3">Payment Method</h3>
          <div className="space-y-2">
            <button
              onClick={() => setPaymentMethod('card')}
              className={`w-full flex items-center gap-3 p-4 border-2 rounded-xl transition-all ${
                paymentMethod === 'card'
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                paymentMethod === 'card' ? 'bg-blue-100' : 'bg-gray-100'
              }`}>
                <CreditCard className={`w-5 h-5 ${paymentMethod === 'card' ? 'text-blue-600' : 'text-gray-600'}`} />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-gray-900">Credit / Debit Card</p>
                <p className="text-sm text-gray-500">Pay securely with your card</p>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                paymentMethod === 'card' ? 'border-blue-600' : 'border-gray-300'
              }`}>
                {paymentMethod === 'card' && (
                  <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                )}
              </div>
            </button>

            <button
              onClick={() => setPaymentMethod('cash')}
              className={`w-full flex items-center gap-3 p-4 border-2 rounded-xl transition-all ${
                paymentMethod === 'cash'
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                paymentMethod === 'cash' ? 'bg-blue-100' : 'bg-gray-100'
              }`}>
                <Banknote className={`w-5 h-5 ${paymentMethod === 'cash' ? 'text-blue-600' : 'text-gray-600'}`} />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-gray-900">Cash</p>
                <p className="text-sm text-gray-500">Pay at the clinic</p>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                paymentMethod === 'cash' ? 'border-blue-600' : 'border-gray-300'
              }`}>
                {paymentMethod === 'cash' && (
                  <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                )}
              </div>
            </button>

            <button
              onClick={() => setPaymentMethod('insurance')}
              className={`w-full flex items-center gap-3 p-4 border-2 rounded-xl transition-all ${
                paymentMethod === 'insurance'
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                paymentMethod === 'insurance' ? 'bg-blue-100' : 'bg-gray-100'
              }`}>
                <FileText className={`w-5 h-5 ${paymentMethod === 'insurance' ? 'text-blue-600' : 'text-gray-600'}`} />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-gray-900">Insurance</p>
                <p className="text-sm text-gray-500">Use your insurance coverage</p>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                paymentMethod === 'insurance' ? 'border-blue-600' : 'border-gray-300'
              }`}>
                {paymentMethod === 'insurance' && (
                  <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                )}
              </div>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 px-5 py-4" style={{ maxWidth: '390px', margin: '0 auto' }}>
        {/* Glassmorphism effect */}
        <div className="absolute inset-0 bg-white/80 backdrop-blur-xl border-t border-white/20 shadow-2xl" style={{ borderRadius: '24px 24px 0 0' }} />
        <div className="relative">
          <Button onClick={handleConfirm} fullWidth loading={isConfirming} success={isSuccess}>
            {isConfirming ? 'Confirming...' : isSuccess ? 'Confirmed!' : 'Confirm Appointment'}
          </Button>
        </div>
      </div>
    </div>
  );
}