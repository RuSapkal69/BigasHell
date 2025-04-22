import { useState } from "react"

const FeatureItem = ({ title, description, ctaText, isActive, isMobile, onHover, onClick }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={`relative group cursor-pointer transition-all duration-500 ${
        isMobile ? "py-6 px-0" : "flex-1 py-12 px-8"
      } ${isMobile ? "text-black" : ""}`}
      onMouseEnter={() => {
        onHover()
        setIsHovered(true)
      }}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Top border that's always visible */}
      {!isMobile && <div className="absolute top-0 left-0 right-0 h-0.5 bg-white z-10"></div>}

      {/* Container background */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          isActive && !isMobile
            ? "bg-white bg-opacity-90"
            : !isMobile
              ? "bg-transparent bg-opacity-0 group-hover:bg-white group-hover:bg-opacity-10"
              : ""
        }`}
      ></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full justify-between">
        <div>
          <h3
            className={`${isMobile ? "text-base md:text-lg" : "text-xl md:text-2xl"} font-bold ${
              isMobile ? "mb-4" : "mb-2"
            } ${isActive && !isMobile ? "text-black" : isMobile ? "text-black" : "text-white"}`}
          >
            {title}
          </h3>
          <p
            className={`${isMobile ? "text-sm mb-6" : "text-base md:text-lg mb-4"} ${
              isActive && !isMobile ? "text-black" : isMobile ? "text-black" : "text-white"
            } max-w-prose ${isMobile ? "break-words" : ""}`}
          >
            {description}
          </p>
        </div>

        {/* CTA with contained underline */}
        <div className={`${isMobile ? "relative overflow-hidden w-fit" : ""}`}>
          <span
            className={`${isMobile ? "text-sm" : "text-lg md:text-xl"} font-medium relative inline-block
              ${isActive && !isMobile ? "text-black" : isMobile ? "text-black" : "text-white"}
              transition-all duration-300 ease-in-out
              ${isHovered || isActive || isMobile ? "opacity-100" : "opacity-0"}`}
          >
            {ctaText}
            <span
              className={`absolute left-0 bottom-0 h-0.5 
                ${isActive && !isMobile ? "bg-black" : isMobile ? "bg-black" : "bg-white"}
                transition-all duration-500 ease-in-out
                ${isHovered || isActive || isMobile ? "w-full" : "w-0"}`}
            ></span>
          </span>
        </div>
      </div>
    </div>
  )
}

export default FeatureItem

