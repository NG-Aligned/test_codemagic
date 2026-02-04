import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Check } from 'lucide-react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit';
  loading?: boolean;
  success?: boolean;
}

export function Button({
  children,
  onClick,
  variant = 'primary',
  fullWidth = false,
  disabled = false,
  type = 'button',
  loading = false,
  success = false,
}: ButtonProps) {
  const baseStyles = 'flex items-center justify-center px-6 py-3.5 rounded-xl font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 relative overflow-hidden';
  
  const variantStyles = {
    primary: disabled || loading
      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
      : success
      ? 'bg-green-600 text-white shadow-lg shadow-green-200'
      : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-lg shadow-blue-200',
    secondary: disabled || loading
      ? 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed'
      : 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-50 focus:ring-blue-500 hover:shadow-md',
  };

  const widthStyles = fullWidth ? 'w-full' : '';

  const isDisabled = disabled || loading || success;

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={`${baseStyles} ${variantStyles[variant]} ${widthStyles}`}
      whileTap={isDisabled ? {} : { scale: 0.98 }}
      whileHover={isDisabled ? {} : { scale: 1.01 }}
      animate={success ? { scale: [1, 1.05, 1] } : {}}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 17 
      }}
    >
      {loading && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Loader2 className="w-5 h-5 animate-spin" />
        </motion.div>
      )}
      
      {success && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 15 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Check className="w-5 h-5" />
        </motion.div>
      )}
      
      <span className={loading || success ? 'opacity-0' : 'opacity-100'}>
        {children}
      </span>
    </motion.button>
  );
}