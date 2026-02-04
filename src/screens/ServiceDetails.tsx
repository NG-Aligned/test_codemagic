import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, Star, Clock, DollarSign, ChevronDown } from 'lucide-react';
import { services, providers } from '../data/mockData';
import { useBooking } from '../context/BookingContext';
import { Button } from '../components/Button';
import { BottomSheet } from '../components/BottomSheet';
import { motion } from 'motion/react';

export function ServiceDetails() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const { updateBookingData } = useBooking();
  const [selectedProvider, setSelectedProvider] = useState(providers[0]);
  const [showProviders, setShowProviders] = useState(false);

  const service = services.find(s => s.id === serviceId);

  if (!service) {
    return <div>Service not found</div>;
  }

  const handleContinue = () => {
    updateBookingData({
      serviceId: service.id,
      serviceName: service.name,
      servicePrice: service.price,
      serviceDuration: service.duration,
      providerId: selectedProvider.id,
      providerName: selectedProvider.name,
    });
    navigate('/choose-date');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white sticky top-0 z-10 px-5 py-4 flex items-center gap-3 border-b border-gray-100">
        <button onClick={() => navigate('/')} className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <h1 className="font-semibold text-gray-900">Service Details</h1>
      </div>

      {/* Hero Image */}
      <div className="w-full h-56 bg-gradient-to-br from-blue-50 to-blue-100 relative overflow-hidden">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="px-5 py-5 space-y-6">
        {/* Title and Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">{service.name}</h2>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1 text-amber-600">
              <Star className="w-4 h-4 fill-current" />
              <span className="font-medium">{service.rating}</span>
              <span className="text-gray-500">({service.reviewCount} reviews)</span>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 rounded-lg">
              <Clock className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">{service.duration} mins</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 rounded-lg">
              <DollarSign className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-900">${service.price}</span>
            </div>
          </div>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="font-semibold text-gray-900 mb-2">About this service</h3>
          <p className="text-gray-600 leading-relaxed">{service.description}</p>
        </motion.div>

        {/* Provider Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="font-semibold text-gray-900 mb-3">Select Provider</h3>
          <div className="relative">
            <motion.button
              onClick={() => setShowProviders(!showProviders)}
              className="w-full flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:border-blue-300 transition-colors"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center overflow-hidden">
                  <span className="text-white font-semibold">{selectedProvider.name.charAt(0)}</span>
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-900">{selectedProvider.name}</p>
                  <p className="text-sm text-gray-500">{selectedProvider.title}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-current" />
                    <span className="text-sm text-gray-600">{selectedProvider.rating}</span>
                  </div>
                </div>
              </div>
              <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${showProviders ? 'rotate-180' : ''}`} />
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Provider Bottom Sheet */}
      <BottomSheet
        isOpen={showProviders}
        onClose={() => setShowProviders(false)}
        title="Select Provider"
      >
        <div className="p-5 space-y-2">
          {providers.map((provider, index) => (
            <motion.button
              key={provider.id}
              onClick={() => {
                setSelectedProvider(provider);
                setShowProviders(false);
              }}
              className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors border border-gray-100 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                <span className="text-white font-semibold">{provider.name.charAt(0)}</span>
              </div>
              <div className="text-left flex-1">
                <p className="font-medium text-gray-900">{provider.name}</p>
                <p className="text-sm text-gray-500">{provider.title}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-current" />
                  <span className="text-sm text-gray-600">{provider.rating}</span>
                  <span className="text-xs text-gray-400">({provider.reviewCount} reviews)</span>
                </div>
              </div>
              {selectedProvider.id === provider.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center"
                >
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>
      </BottomSheet>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 px-5 py-4" style={{ maxWidth: '390px', margin: '0 auto' }}>
        {/* Glassmorphism effect */}
        <div className="absolute inset-0 bg-white/80 backdrop-blur-xl border-t border-white/20 shadow-2xl" style={{ borderRadius: '24px 24px 0 0' }} />
        <div className="relative">
          <Button onClick={handleContinue} fullWidth>
            Select Date & Time
          </Button>
        </div>
      </div>
    </div>
  );
}