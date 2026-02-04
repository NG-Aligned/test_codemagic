import { motion } from 'framer-motion';

interface TimeSlotProps {
  time: string;
  selected: boolean;
  available: boolean;
  onSelect: () => void;
}

export function TimeSlot({ time, selected, available, onSelect }: TimeSlotProps) {
  return (
    <motion.button
      onClick={onSelect}
      disabled={!available}
      className={`py-3 px-2 rounded-xl font-medium text-sm transition-all ${
        selected
          ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
          : available
          ? 'bg-white text-gray-900 border border-gray-200 hover:border-blue-300 hover:bg-blue-50'
          : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-100'
      }`}
      whileHover={available && !selected ? { scale: 1.05, y: -2 } : {}}
      whileTap={available ? { scale: 0.95 } : {}}
      animate={selected ? { scale: [1, 1.05, 1] } : {}}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {time}
    </motion.button>
  );
}