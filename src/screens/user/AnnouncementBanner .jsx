import React, { useState, useEffect } from 'react';

const AnnouncementBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState('');

  // Calculate time remaining until 27th, 12:00 PM
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const targetDate = new Date();
      
      // Set target to 27th of current month at 12:00 PM
      targetDate.setDate(27);
      targetDate.setHours(12, 0, 0, 0);
      
      // If 27th has passed this month, set to next month
      if (now > targetDate) {
        targetDate.setMonth(targetDate.getMonth() + 1);
      }
      
      const difference = targetDate - now;
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        
        setTimeLeft(`${days}d ${hours}h ${minutes}m`);
      } else {
        setTimeLeft('Event Started!');
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="relative w-full bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 text-white py-3 px-4 shadow-lg z-50">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-pulse"></div>
      </div>
      
      <div className="relative flex items-center justify-center  mx-auto">
        <div className="flex items-center justify-center gap-4 flex-wrap text-center">
          {/* Icon */}
          <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          
          {/* Main message */}
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <span className="font-bold text-yellow-300 animate-pulse text-2xl md:text-3xl">🚀 BIG ANNOUNCEMENT COMING!</span>
            <span className="text-white font-medium text-xl md:text-2xl">Something exciting launches on</span>
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent font-bold text-lg md:text-2xl">
              27th at 12:00 PM
            </span>
          </div>
          
          {/* Countdown */}
          <div className="flex items-center gap-2">
            <span className="text-yellow-300 font-medium text-xl md:text-2xl">⏰</span>
            <span className="bg-black bg-opacity-30 px-3 py-1 rounded-full font-mono font-bold text-yellow-300 border border-yellow-300/30 text-lg md:text-xl">
              {timeLeft}
            </span>
          </div>
          
          {/* CTA */}
          <button
           onClick={() => setIsVisible(false)}
          className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold px-4 py-1 rounded-full text-lg md:text-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
            Stay Tuned!
          </button>
        </div>
        
        {/* Close button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white hover:text-yellow-300 transition-colors duration-200 p-1"
          aria-label="Close banner"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      {/* Bottom animated border */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 animate-pulse"></div>
    </div>
  );
};

export default AnnouncementBanner;