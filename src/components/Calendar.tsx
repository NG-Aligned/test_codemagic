import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface CalendarProps {
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
}

export function Calendar({ selectedDate, onSelectDate }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentMonth.getMonth() === today.getMonth() &&
      currentMonth.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (day: number) => {
    if (!selectedDate) return false;
    return (
      day === selectedDate.getDate() &&
      currentMonth.getMonth() === selectedDate.getMonth() &&
      currentMonth.getFullYear() === selectedDate.getFullYear()
    );
  };

  const isPast = (day: number) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return date < today;
  };

  const handleDateClick = (day: number) => {
    if (!isPast(day)) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      onSelectDate(date);
    }
  };

  const days = [];
  
  // Empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="h-12"></div>);
  }

  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const past = isPast(day);
    const today = isToday(day);
    const selected = isSelected(day);

    days.push(
      <motion.button
        key={day}
        onClick={() => handleDateClick(day)}
        disabled={past}
        className={`h-12 rounded-xl flex items-center justify-center font-medium text-sm transition-all ${
          selected
            ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
            : today
            ? 'bg-blue-50 text-blue-600 border-2 border-blue-600'
            : past
            ? 'text-gray-300 cursor-not-allowed'
            : 'text-gray-900 hover:bg-gray-100'
        }`}
        whileHover={!past && !selected ? { scale: 1.1, y: -2 } : {}}
        whileTap={!past ? { scale: 0.95 } : {}}
        animate={selected ? { scale: [1, 1.05, 1] } : {}}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        {day}
      </motion.button>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-5">
        <motion.button
          onClick={prevMonth}
          className="w-9 h-9 rounded-lg bg-gray-50 hover:bg-gray-100 flex items-center justify-center transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </motion.button>
        
        <motion.h3 
          className="font-semibold text-gray-900"
          key={currentMonth.toISOString()}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </motion.h3>
        
        <motion.button
          onClick={nextMonth}
          className="w-9 h-9 rounded-lg bg-gray-50 hover:bg-gray-100 flex items-center justify-center transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight className="w-5 h-5 text-gray-700" />
        </motion.button>
      </div>

      {/* Day Names */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {dayNames.map(day => (
          <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7 gap-2">
        {days}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 mt-5 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 bg-blue-600 rounded"></div>
          <span className="text-xs text-gray-600">Selected</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 bg-blue-50 border-2 border-blue-600 rounded"></div>
          <span className="text-xs text-gray-600">Today</span>
        </div>
      </div>
    </div>
  );
}