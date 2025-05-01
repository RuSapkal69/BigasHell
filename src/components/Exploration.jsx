import { useState } from 'react';

export default function Exploration() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/HellGym_1_quality.jpg')`,
          filter: 'brightness(1.0)',
        }}
      ></div>
      
      {/* Overlay to enhance text visibility */}
      <div className="absolute inset-0 bg-black bg-opacity-10"></div>

      {/* Content Container - Positioned top-left with margins */}
      <div className="relative h-full">
        <div className="absolute top-0 left-0 pt-16 pl-6 md:pt-20 md:pl-12 lg:pt-24 lg:pl-16">
          <div className="max-w-lg p-6 md:p-8 bg-transparent rounded-lg text-white hover:backdrop-blur-md transition-all duration-300 ease-in-out">
            <h1 className="text-2xl md:text-4xl lg:text-4xl font-bold mb-4 text-blue-100">
              Once Entered.
                <br /> Never Exited.
            </h1>
            
            <p className="text-lg md:text-xl mb-8 text-white font-semibold">
              Unlimited Services, personal Demons, Classes, exclusive amenities to recover from torture, and more.
            </p>
            
            <div 
              className="inline-block cursor-pointer"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <span 
                className={`text-lg md:text-xl font-medium relative
                  ${isHovered ? 'text-blue-300' : 'text-blue-200'}
                  transition-all duration-300 ease-in-out`}
              >
                Explore Membership
                <span 
                  className={`absolute left-0 bottom-0 h-0.5 
                    bg-blue-300
                    transition-all duration-500 ease-in-out
                    ${isHovered ? 'w-full' : 'w-0'}`}
                ></span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}