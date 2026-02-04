import { Star, Clock, DollarSign } from 'lucide-react';
import { Service } from '../data/mockData';
import { motion } from 'framer-motion';

interface ServiceCardProps {
  service: Service;
  onBook: () => void;
}

export function ServiceCard({ service, onBook }: ServiceCardProps) {
  return (
    <motion.div
      className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all"
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
      }}
    >
      <div className="flex gap-4 p-4">
        <motion.div 
          className="w-24 h-24 rounded-xl overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 flex-shrink-0"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
          <img
            src={service.image}
            alt={service.name}
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 mb-1 truncate">{service.name}</h3>
          
          <div className="flex items-center gap-1 mb-2">
            <Star className="w-4 h-4 text-amber-500 fill-current" />
            <span className="text-sm font-medium text-gray-900">{service.rating}</span>
            <span className="text-sm text-gray-500">({service.reviewCount})</span>
          </div>
          
          <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{service.duration} min</span>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="w-4 h-4" />
              <span className="font-medium text-gray-900">{service.price}</span>
            </div>
          </div>
          
          <motion.button
            onClick={onBook}
            className="w-full px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            whileHover={{ scale: 1.02, boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)' }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            Book Appointment
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}