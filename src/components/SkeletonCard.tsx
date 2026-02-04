import { motion } from 'motion/react';

export function SkeletonCard() {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden p-4">
      <div className="flex gap-4">
        <motion.div 
          className="w-24 h-24 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200"
          animate={{ 
            opacity: [0.5, 1, 0.5],
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
        
        <div className="flex-1 space-y-3">
          <motion.div 
            className="h-5 bg-gradient-to-r from-gray-100 to-gray-200 rounded w-3/4"
            animate={{ 
              opacity: [0.5, 1, 0.5],
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.1
            }}
          />
          <motion.div 
            className="h-4 bg-gradient-to-r from-gray-100 to-gray-200 rounded w-1/2"
            animate={{ 
              opacity: [0.5, 1, 0.5],
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.2
            }}
          />
          <motion.div 
            className="h-9 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg w-full"
            animate={{ 
              opacity: [0.5, 1, 0.5],
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.3
            }}
          />
        </div>
      </div>
    </div>
  );
}
