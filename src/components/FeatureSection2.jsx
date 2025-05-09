import { useState, useEffect, useCallback, useRef } from "react"
import { useMediaQuery } from "../hooks/useMediaQuery"
import FeatureItem from "./FeatureItem"

const FeatureSection2 = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const isMobileOrTablet = useMediaQuery("(max-width: 1023px)")
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)
  const autoSlideRef = useRef(null)

  const features = [
    {
      id: 1,
      title: "Premium Fitness Experience",
      description: "State-of-the-art equipment and facilities designed for the ultimate workout experience.",
      image: "https://aicdn.picsart.com/2403caab-675d-4f54-9428-814d8a8da796.png",
      ctaText: "Explore Facilities",
    },
    {
      id: 2,
      title: "Expert Personal Training",
      description: "One-on-one sessions with certified trainers who will help you achieve your fitness goals.",
      image: "https://aicdn.picsart.com/f6cdad6e-562f-4730-b623-60514a3bae8d.png",
      ctaText: "Meet Our Trainers",
    },
    {
      id: 3,
      title: "Specialized Group Classes",
      description: "High-energy group sessions for all fitness levels, from yoga to high-intensity training.",
      image: "https://images.pexels.com/photos/4498151/pexels-photo-4498151.jpeg?auto=compress&cs=tinysrgb&w=1600",
      ctaText: "View Schedule",
    },
  ]

  const nextSlide = useCallback(() => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % features.length)
  }, [features.length])

  useEffect(() => {
    if (isMobileOrTablet) {
      autoSlideRef.current = setInterval(nextSlide, 5000)
      return () => {
        if (autoSlideRef.current) {
          clearInterval(autoSlideRef.current)
        }
      }
    }
  }, [isMobileOrTablet, nextSlide])

  const handleTouchStart = (e) => {
    if (autoSlideRef.current) {
      clearInterval(autoSlideRef.current)
    }
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      setActiveIndex((prevIndex) => (prevIndex + 1) % features.length)
    } else if (touchStartX.current - touchEndX.current < -50) {
      setActiveIndex((prevIndex) => (prevIndex - 1 + features.length) % features.length)
    }
    touchStartX.current = 0
    touchEndX.current = 0

    if (isMobileOrTablet) {
      autoSlideRef.current = setInterval(nextSlide, 5000)
    }
  }

  const handleHover = (index) => {
    if (!isMobileOrTablet) {
      setActiveIndex(index)
    }
  }

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0 transition-opacity duration-1000">
        {features.map((feature, index) => (
          <div
            key={feature.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === activeIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img src={feature.image || "/placeholder.svg"} alt={feature.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          </div>
        ))}
      </div>

      {/* Feature containers */}
      <div
        className="absolute bottom-0 left-0 right-0 px-4 sm:px-6 md:px-10 lg:px-16 pb-10 lg:pb-16"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {isMobileOrTablet ? (
          // Mobile/tablet view - vertical white container
          <div className="max-w-md mx-auto">
            <div className="bg-white p-6">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${activeIndex * 100}%)`,
                  width: `${features.length * 100}%`,
                }}
              >
                {features.map((feature, index) => (
                  <div key={feature.id} className="w-full flex-shrink-0 overflow-hidden whitespace-normal px-2">
                    <FeatureItem
                      title={feature.title}
                      description={feature.description}
                      ctaText={feature.ctaText}
                      isActive={true}
                      isMobile={true}
                      onHover={() => {}}
                      onClick={() => {}}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile indicators - clean styling */}
            <div className="flex justify-center mt-6 space-x-3 pb-2">
              {features.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex ? "bg-black w-4" : "bg-gray-300"
                  }`}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        ) : (
          // Desktop view - unchanged
          <div className="grid grid-cols-3 gap-2 md:gap-4 lg:gap-6">
            {features.map((feature, index) => (
              <FeatureItem
                key={feature.id}
                title={feature.title}
                description={feature.description}
                ctaText={feature.ctaText}
                isActive={index === activeIndex}
                isMobile={false}
                onHover={() => handleHover(index)}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default FeatureSection2