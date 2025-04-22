import { useState } from 'react';

export default function Exploration() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/HellGym_1.jpg')`,
          filter: 'brightness(0.9)',
        }}
      ></div>
      
      {/* Overlay to enhance text visibility */}
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>

      {/* Content Container - Positioned top-left with margins */}
      <div className="relative h-full">
        <div className="absolute top-0 left-0 pt-16 pl-6 md:pt-20 md:pl-12 lg:pt-24 lg:pl-16">
          <div className="max-w-lg p-6 md:p-8 bg-black bg-opacity-40 backdrop-blur-sm rounded-lg text-white">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-blue-100">
              Welcome to our Beautiful Hell
            </h1>
            
            <p className="text-lg md:text-xl mb-8 text-blue-50 font-light">
              Unlimited Services, personal demons, classes, exclusive amenities to recover
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