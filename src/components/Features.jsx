import { useState } from 'react';

const Features = () => {
  const [currentIndex, setCurrentIndex] = useState(1);

  const features = [
    {
      title: "Signature Classes",
      description: "New and Unlimited Classes exclusive to Equinox. Designed for the individual. Powered by the collective.",
      linkText: "Discover Classes",
      linkUrl: "/groupfitness?icmp=home-classes",
      // You'll replace this with your own image imports
      imageSrc: "/HellGym_2.jpg",
      imageAlt: "Signature Classes"
    },
    {
      title: "Personal Training",
      description: "Precision-backed 1:1 Personal Training with EFTI-certified COACHES, dedicated to maximizing your potential.",
      linkText: "Discover Personal Training",
      linkUrl: "/personaltraining?icmp=home-personaltraining",
      imageSrc: "/HellGym_3.jpg",
      imageAlt: "Personal Training"
    },
    {
      title: "Authentic Pilates",
      description: "Studio Pilates sessions with 1:1 instruction. Tone your core and activate your mind-body connection.",
      linkText: "Discover Pilates",
      linkUrl: "/pilates?icmp=home-pilates",
      imageSrc: "/HellGym_4.jpg",
      imageAlt: "Authentic Pilates"
    }
  ];

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <ul className="flex w-full h-full">
        {features.map((feature, index) => (
          <li 
            key={index}
            className={`relative w-full h-full flex-shrink-0 transition-all duration-500 ${index === currentIndex ? 'opacity-100' : 'opacity-0 absolute'}`}
            aria-current={index === currentIndex ? "true" : "false"}
          >
            <div className={`absolute inset-0 flex items-center justify-center z-10 p-8 md:p-16 lg:p-24 transition-all duration-300 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}>
              <div className={`max-w-md bg-black bg-opacity-70 text-white p-8 rounded-lg ${index === currentIndex ? 'translate-y-0' : 'translate-y-8'}`}>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                  {feature.title}
                </h3>
                <p className="mb-6 text-sm md:text-base">
                  {feature.description}
                </p>
                <a 
                  href={feature.linkUrl} 
                  className="inline-block px-6 py-3 bg-white text-black font-medium hover:bg-gray-200 transition-colors duration-200"
                  title={feature.linkText}
                >
                  {feature.linkText}
                </a>
              </div>
            </div>
            
            {/* Replace with your actual image component or img tag */}
            <div className="absolute inset-0 bg-gray-800">
              <img 
                src={feature.imageSrc} 
                alt={feature.imageAlt}
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
            </div>
          </li>
        ))}
      </ul>

      {/* Navigation dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {features.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-white bg-opacity-50'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Features;