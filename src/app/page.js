'use client';

import { useState, useEffect } from 'react';

export default function YearInPixels() {
  const [selectedDay, setSelectedDay] = useState(null);
  const [dayColors, setDayColors] = useState({});
  const [quote, setQuote] = useState('');
  const [quoteAuthor, setQuoteAuthor] = useState('');
  const [isLoadingQuote, setIsLoadingQuote] = useState(true);
  const [viewMode, setViewMode] = useState('year');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  const colors = [
    { name: 'Clear', color: 'bg-white border-2 border-gray-400 border-dashed', value: null },
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

  const inspirationalQuotes = [
    { content: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
    { content: "Your limitation—it's only your imagination.", author: "Unknown" },
    { content: "Push yourself, because no one else is going to do it for you.", author: "Unknown" },
    { content: "Great things never come from comfort zones.", author: "Unknown" },
    { content: "Dream it. Wish it. Do it.", author: "Unknown" },
    { content: "Success doesn't just find you. You have to go out and get it.", author: "Unknown" },
    { content: "The harder you work for something, the greater you'll feel when you achieve it.", author: "Unknown" },
    { content: "Dream bigger. Do bigger.", author: "Unknown" },
    { content: "Don't stop when you're tired. Stop when you're done.", author: "Unknown" },
    { content: "Wake up with determination. Go to bed with satisfaction.", author: "Unknown" },
    { content: "Do something today that your future self will thank you for.", author: "Sean Wise" },
    { content: "Little things make big days.", author: "Unknown" },
    { content: "It's going to be hard, but hard does not mean impossible.", author: "Unknown" },
    { content: "Don't wait for opportunity. Create it.", author: "Unknown" },
    { content: "Sometimes we're tested not to show our weaknesses, but to discover our strengths.", author: "Unknown" },
    { content: "The key to success is to focus on goals, not obstacles.", author: "Unknown" },
    { content: "Be yourself; everyone else is already taken.", author: "Oscar Wilde" },
    { content: "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.", author: "Albert Einstein" },
    { content: "You only live once, but if you do it right, once is enough.", author: "Mae West" },
    { content: "Be the change that you wish to see in the world.", author: "Mahatma Gandhi" }
  ];

  useEffect(() => {
    setSelectedDay(getCurrentDayOfYear());

    const fetchInspirationalQuote = () => {
      setIsLoadingQuote(true);
      setTimeout(() => {
        const randomQuote = inspirationalQuotes[Math.floor(Math.random() * inspirationalQuotes.length)];
        setQuote(randomQuote.content);
        setQuoteAuthor(randomQuote.author);
        setIsLoadingQuote(false);
      }, 500);
    };

    fetchInspirationalQuote();
  }, []);

  const handleNewQuote = () => {
    setIsLoadingQuote(true);
    setTimeout(() => {
      const randomQuote = inspirationalQuotes[Math.floor(Math.random() * inspirationalQuotes.length)];
      setQuote(randomQuote.content);
      setQuoteAuthor(randomQuote.author);
      setIsLoadingQuote(false);
    }, 500);
  };

  const generateDays = () => {
    if (viewMode === 'month') return generateMonthDays();

    const days = [];
    const jan1 = new Date(2025, 0, 1);
    const startDay = jan1.getDay();
    for (let i = 0; i < startDay; i++) days.push(null);
    for (let i = 1; i <= 365; i++) days.push(i);
    return days;
  };

  const generateMonthDays = () => {
    const days = [];
    const firstDay = new Date(2025, selectedMonth, 1);
    const lastDay = new Date(2025, selectedMonth + 1, 0);
    const startDay = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    for (let i = 0; i < startDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) {
      const dayOfYear = getDayOfYear(2025, selectedMonth, i);
      days.push(dayOfYear);
    }

    return days;
  };

  const getDayOfYear = (year, month, day) => {
    const date = new Date(year, month, day);
    const start = new Date(year, 0, 0);
    const diff = date - start;
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  };

  const getMonthName = (monthIndex) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[monthIndex];
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
      setDayColors(prev => {
        const newColors = { ...prev };
        if (colorValue === null) {
          delete newColors[selectedDay];
        } else {
          newColors[selectedDay] = colorValue;
        }
        return newColors;
      });
    }
  };

  const downloadAsPNG = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const scale = 4;
    const boxSize = 20 * scale;
    const gapSize = 4 * scale;
    const totalBoxSize = boxSize + gapSize;
    const cols = 7;
    const rows = Math.ceil(days.length / cols);

    canvas.width = (cols * totalBoxSize) - gapSize;
    canvas.height = (rows * totalBoxSize) - gapSize;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

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
      const x = col * totalBoxSize;
      const y = row * totalBoxSize;

      if (dayNumber !== null) {
        const dayColor = dayColors[dayNumber];
        ctx.fillStyle = dayColor ? colorMap[dayColor] : '#ffffff';
        ctx.fillRect(x, y, boxSize, boxSize);
        ctx.strokeStyle = '#d1d5db';
        ctx.lineWidth = 2 * scale;
        ctx.strokeRect(x, y, boxSize, boxSize);
      }
    });

    const link = document.createElement('a');
    const fileName = viewMode === 'month'
      ? `${getMonthName(selectedMonth).toLowerCase()}-${new Date().getFullYear()}-pixels.png`
      : `year-in-pixels-${new Date().getFullYear()}.png`;
    link.download = fileName;
    link.href = canvas.toDataURL();
    link.click();
  };

  const days = generateDays();

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">
          Year in Pixels - Mood Tracker V0.01
        </h1>
        <p className="text-gray-600 text-center mb-6">
          2025 Mood Tracker - <strong>Frontend Demo</strong>
          <br />
          This is a simple mood tracker that lets you visualize your mood over the year. Database and backend are <strong>NOT IMPLEMENTED</strong>
          <br />
          meaning this is just a frontend demo. Next step is to implement OAuth and a DB so people can use it :) <br />
          Click on a day to select it, then choose a mood color!
        </p>

        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('year')}
                className={`px-4 py-2 rounded-lg transition-colors duration-200 ${viewMode === 'year'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                Year View
              </button>
              <button
                onClick={() => setViewMode('month')}
                className={`px-4 py-2 rounded-lg transition-colors duration-200 ${viewMode === 'month'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                Month View
              </button>
            </div>

            {viewMode === 'month' && (
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                className="text-black px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i} value={i}>
                    {getMonthName(i)}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        <div className="flex flex-row gap-6 justify-center items-start">
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            {viewMode === 'month' && (
              <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                {getMonthName(selectedMonth)} 2025
              </h3>
            )}
            <div className="grid grid-cols-7 gap-1 mb-3">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-xs font-medium text-gray-600 w-4">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {days.map((dayNumber, index) => {
                if (dayNumber === null) {
                  return <div key={`empty-${index}`} className="w-4 h-4" />;
                }
                const isSelected = selectedDay === dayNumber;
                const dayColor = dayColors[dayNumber];
                return (
                  <button
                    key={dayNumber}
                    onClick={() => handleDayClick(dayNumber)}
                    className={`
                      w-4 h-4 border transition-all duration-200 hover:scale-125
                      ${isSelected ? 'border-gray-800 border-2 shadow-lg z-10 relative' : 'border-gray-300 hover:border-gray-500'}
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
              <div className="mt-4 text-center text-gray-600 text-sm">
                Selected: Day {selectedDay} ({getDayDate(selectedDay)})
              </div>
            )}
          </div>

          <div className="flex flex-col w-80 justify-end">
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
              {isLoadingQuote ? (
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto"></div>
                </div>
              ) : (
                <>
                  <blockquote className="text-base italic text-gray-700 mb-2 text-center">
                    &quot;{quote}&quot;
                  </blockquote>
                  <cite className="text-sm text-gray-500 text-center block">— {quoteAuthor}</cite>
                </>
              )}
              <button
                onClick={handleNewQuote}
                className="text-gray-800 mt-3 px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors duration-200 w-full"
              >
                New Quote
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                Mood Colors
              </h2>
              <div className="flex gap-2 justify-center items-center">
                {colors.map((colorOption, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <button
                      onClick={() => handleColorClick(colorOption.value)}
                      className={`
                        w-10 h-10 border-2 
                        ${colorOption.value === null ? 'border-gray-400 border-dashed bg-white' : 'border-gray-300'}
                        ${colorOption.color} 
                        hover:border-gray-600 hover:scale-105 
                        transition-all duration-200 shadow-md hover:shadow-lg rounded-md
                        ${selectedDay === null ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                      `}
                      disabled={selectedDay === null}
                      title={colorOption.name}
                    >
                      {colorOption.value === null && (
                        <span className="text-gray-400 text-sm">✕</span>
                      )}
                      <span className="sr-only">{colorOption.name}</span>
                    </button>
                    <span className="text-xs text-gray-600 mt-1 text-center">
                      {colorOption.name.split(' ')[0]}
                    </span>
                  </div>
                ))}
              </div>

              {selectedDay === null && (
                <div className="mt-4 text-sm text-gray-500 text-center">
                  Select a day first to assign a mood color
                </div>
              )}
            </div>

            <button
              onClick={downloadAsPNG}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 font-medium shadow-md hover:shadow-lg w-full"
            >
              Download as PNG
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
