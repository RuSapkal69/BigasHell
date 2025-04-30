import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const Video = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  // Toggle mute/unmute function
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  // Set initial mute state when component mounts
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
       
        <source src="../public/HellGymVideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Subtle overlay to enhance text visibility */}
      <div className="absolute inset-0 bg-black bg-opacity-10"></div>

      {/* Content Container - Positioned top-left with margins */}
      <div className="relative h-full">
        <div className="absolute top-0 left-0 pt-16 pl-6 md:pt-20 md:pl-12 lg:pt-24 lg:pl-16">
          <div className="max-w-lg p-6 md:p-8 bg-transparent rounded-lg text-white">
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

      {/* Audio Control Button */}
      <button 
        onClick={toggleMute}
        className="absolute bottom-6 right-6 md:bottom-8 md:right-8 p-3 rounded-full bg-black bg-opacity-40 text-white hover:bg-opacity-60 transition-colors duration-300"
        aria-label={isMuted ? "Unmute video" : "Mute video"}
      >
        {isMuted ? (
          <VolumeX size={24} />
        ) : (
          <Volume2 size={24} />
        )}
      </button>
    </div>
  );
};

export default Video;