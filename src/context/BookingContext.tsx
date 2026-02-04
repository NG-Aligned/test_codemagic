import React, { createContext, useContext, useState, ReactNode } from 'react';

interface BookingData {
  serviceId?: string;
  serviceName?: string;
  servicePrice?: number;
  serviceDuration?: number;
  providerId?: string;
  providerName?: string;
  selectedDate?: string;
  selectedTime?: string;
  userName?: string;
  userPhone?: string;
  userEmail?: string;
  notes?: string;
  forSomeoneElse?: boolean;
  paymentMethod?: 'card' | 'cash' | 'insurance';
}

interface BookingContextType {
  bookingData: BookingData;
  updateBookingData: (data: Partial<BookingData>) => void;
  resetBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookingData, setBookingData] = useState<BookingData>({});

  const updateBookingData = (data: Partial<BookingData>) => {
    setBookingData(prev => ({ ...prev, ...data }));
  };

  const resetBooking = () => {
    setBookingData({});
  };

  return (
    <BookingContext.Provider value={{ bookingData, updateBookingData, resetBooking }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within BookingProvider');
  }
  return context;
}
