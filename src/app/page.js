'use client';

import { useState, useEffect } from 'react';

export default function YearInPixels() {
  const [selectedDay, setSelectedDay] = useState(null);
  const [dayColors, setDayColors] = useState({});
  
  // AI generated color options from sad (blue) to happy (red)
  const colors = [
    { name: 'Very Sad', color: 'bg-blue-600', value: 'blue-600' },
    { name: 'Sad', color: 'bg-blue-300', value: 'blue-300' },
    { name: 'Neutral', color: 'bg-gray-300', value: 'gray-300' },
    { name: 'Happy', color: 'bg-orange-400', value: 'orange-400' },
    { name: 'Very Happy', color: 'bg-red-500', value: 'red-500' },
  ];

  const getCurrentDayOfYear = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  };

  useEffect(() => {
    setSelectedDay(getCurrentDayOfYear());
  }, []);

  const generateDays = () => {
    const days = [];
    for (let i = 0; i < 3; i++) {
      days.push(null);
    }
    for (let i = 1; i <= 365; i++) {
      days.push(i);
    }
    return days;
  };

  const getDayDate = (dayNumber) => {
    const date = new Date(2025, 0, dayNumber); 
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const handleDayClick = (dayNumber) => {
    setSelectedDay(dayNumber);
  };

  const handleColorClick = (colorValue) => {
    if (selectedDay !== null) {
      setDayColors(prev => ({
        ...prev,
        [selectedDay]: colorValue
      }));
    }
  };

  const downloadAsPNG = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    const boxSize = 20;
    const borderSize = 1;
    const cols = 7;
    const rows = Math.ceil(days.length / cols);
    
    canvas.width = cols * boxSize;
    canvas.height = rows * boxSize;
    
    const colorMap = {
      'blue-600': '#2563eb',
      'blue-300': '#93c5fd',  
      'gray-300': '#d1d5db',
      'orange-400': '#fb923c',
      'red-500': '#ef4444',
    };
    
    days.forEach((dayNumber, index) => {
      const row = Math.floor(index / cols);
      const col = index % cols;
      const x = col * boxSize;
      const y = row * boxSize;
      
      if (dayNumber === null) {
        ctx.fillStyle = '#ffffff';
      } else {
        const dayColor = dayColors[dayNumber];
        ctx.fillStyle = dayColor ? colorMap[dayColor] : '#ffffff';
      }
      
      ctx.fillRect(x, y, boxSize, boxSize);
      
      if (dayNumber !== null) {
        ctx.strokeStyle = '#d1d5db'; 
        ctx.lineWidth = borderSize;
        ctx.strokeRect(x, y, boxSize, boxSize);
      }
    });
    
    const link = document.createElement('a');
    link.download = `year-in-pixels-${new Date().getFullYear()}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  const days = generateDays();

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-8 text-center">
          Year in Pixels - Mood Tracker
        </h1>
        
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 justify-center items-start">
          <div className="flex max-w-xl w-full flex-col items-center">
            <div className="grid grid-cols-7 gap-0 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-xs sm:text-sm font-medium text-gray-600 p-1 sm:p-2">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-0">
              {days.map((dayNumber, index) => {
                if (dayNumber === null) {
                  return (
                    <div
                      key={`empty-${index}`}
                      className="w-6 h-6 sm:w-8 sm:h-8"
                    />
                  );
                }
                
                const isSelected = selectedDay === dayNumber;
                const dayColor = dayColors[dayNumber];
                
                return (
                  <button
                    key={dayNumber}
                    onClick={() => handleDayClick(dayNumber)}
                    className={`
                      w-6 h-6 sm:w-8 sm:h-8 border transition-all duration-200 hover:scale-110
                      ${isSelected 
                        ? 'border-gray-800 border-2 sm:border-4 shadow-lg z-10 relative' 
                        : 'border-gray-300 hover:border-gray-500'
                      }
                      ${dayColor ? `bg-${dayColor}` : 'bg-white hover:bg-gray-100'}
                    `}
                    title={getDayDate(dayNumber)}
                  >
                    <span className="sr-only">Day {dayNumber}</span>
                  </button>
                );
              })}
            </div>
            
            {selectedDay && (
              <div className="mt-3 sm:mt-4 text-center text-gray-600 text-sm sm:text-base">
                Selected: Day {selectedDay} ({getDayDate(selectedDay)})
              </div>
            )}
            
            <button
              onClick={downloadAsPNG}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm sm:text-base"
            >
              Download as PNG
            </button>
          </div>

          <div className="flex flex-col items-center w-full lg:w-auto">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">
              Mood Colors
            </h2>
            <div className="flex lg:flex-col gap-2 sm:gap-3 justify-center">
              {colors.map((colorOption, index) => (
                <button
                  key={index}
                  onClick={() => handleColorClick(colorOption.value)}
                  className={`
                    w-12 h-12 sm:w-16 sm:h-16 border-2 border-gray-300 
                    ${colorOption.color} 
                    hover:border-gray-600 hover:scale-105 
                    transition-all duration-200 shadow-md hover:shadow-lg
                    ${selectedDay === null ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                  `}
                  disabled={selectedDay === null}
                  title={colorOption.name}
                >
                  <span className="sr-only">{colorOption.name}</span>
                </button>
              ))}
            </div>
            
            <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-500 text-center">
              <div>😢 Very Sad</div>
              <div className="my-1">😐 Neutral</div>
              <div>😊 Very Happy</div>
            </div>
            
            {selectedDay === null && (
              <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-500 text-center">
                Select a day first
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}