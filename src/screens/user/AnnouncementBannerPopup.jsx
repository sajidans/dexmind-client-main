import React, { useState, useEffect } from 'react';

const AnnouncementBannerPopup = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [fadeIn, setFadeIn] = useState(false);

    // Delay show by 2 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
            setTimeout(() => setFadeIn(true), 50);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    // Countdown logic
    useEffect(() => {
        if (!isVisible) return;
        const calculateTimeLeft = () => {
            const now = new Date();
            const targetDate = new Date();
            targetDate.setDate(27);
            targetDate.setHours(12, 0, 0, 0); // 12:00 PM
            if (now > targetDate) targetDate.setMonth(targetDate.getMonth() + 1);
            const difference = targetDate - now;
            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);
                setTimeLeft({ days, hours, minutes, seconds });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        };
        calculateTimeLeft();
        const interval = setInterval(calculateTimeLeft, 1000);
        return () => clearInterval(interval);
    }, [isVisible]);

    if (!isVisible) return null;

    return (
        <div
            className={`
                fixed inset-0 z-50 flex items-center justify-center
                transition-opacity duration-500
                ${fadeIn ? 'opacity-100' : 'opacity-0'}
            `}
            style={{ pointerEvents: fadeIn ? 'auto' : 'none' }}
        >
            <div className="
                relative bg-black bg-opacity-90 rounded-2xl border-2 border-yellow-400
                p-4 sm:p-8 md:p-12 shadow-2xl backdrop-blur-sm
                w-[75vw] max-w-[78vw] sm:min-w-[340px] md:min-w-[480px] 
                scale-100 md:scale-110
            ">
                {/* Neon glow effect */}
                <div className="absolute inset-0 rounded-2xl border-2 border-yellow-400 shadow-2xl shadow-yellow-400/40 animate-pulse"></div>
                
                {/* Close button */}
                <button
                    onClick={() => setIsVisible(false)}
                    className="absolute -top-3 -right-3 bg-black border border-yellow-400 rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all duration-300 z-10"
                >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="relative text-center flex flex-col items-center">
                    {/* Main message */}
                    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                        <span className="text-3xl sm:text-4xl md:text-5xl animate-pulse">🚀</span>
                        <span className="font-bold text-yellow-300 animate-pulse text-xl sm:text-2xl md:text-4xl">BIG ANNOUNCEMENT COMING!</span>
                    </div>
                    <div className="text-white font-medium text-lg sm:text-2xl md:text-3xl mb-1 sm:mb-2">
                        Something exciting launches on
                    </div>
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent font-bold text-lg sm:text-2xl md:text-3xl mb-4 sm:mb-6">
                        27th at 12:00 PM
                    </div>

                    {/* Countdown */}
                    <div className="flex gap-2 sm:gap-4 md:gap-6 justify-center mb-5 sm:mb-8 flex-wrap">
                        {['days', 'hours', 'minutes', 'seconds'].map((unit, idx) => (
                            <div className="text-center" key={unit}>
                                <div className={`bg-yellow-400 text-black font-bold text-2xl sm:text-3xl md:text-4xl px-4 sm:px-6 md:px-7 py-3 sm:py-4 md:py-5 rounded-lg min-w-[56px] sm:min-w-[70px] md:min-w-[80px] shadow-lg shadow-yellow-400/30 ${unit === 'seconds' ? 'animate-pulse' : ''}`}>
                                    {timeLeft[unit].toString().padStart(2, '0')}
                                </div>
                                <div className="text-gray-300 text-xs sm:text-base mt-1 sm:mt-2 font-medium capitalize">{unit}</div>
                            </div>
                        ))}
                    </div>

                    {/* CTA */}
                    <button 
                        onClick={() => setIsVisible(false)}
                        className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold px-6 sm:px-8 py-2 sm:py-3 rounded-full text-lg sm:text-2xl md:text-3xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                        Stay Tuned!
                    </button>
                </div>

                {/* Background pattern */}
                <div className="absolute inset-0 opacity-5 pointer-events-none">
                    <div className="w-full h-full bg-gradient-to-br from-yellow-400 to-transparent rounded-2xl"></div>
                </div>
            </div>
        </div>
    );
};

export default AnnouncementBannerPopup;
