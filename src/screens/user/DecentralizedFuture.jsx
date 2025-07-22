import React, { useState, useEffect } from "react";
import t1 from "../../assets/website/t1.png";
import t2 from "../../assets/website/t2.png";
import t3 from "../../assets/website/t3.png";
import t4 from "../../assets/website/t4.png";
import t5 from "../../assets/website/t5.png";
import t6 from "../../assets/website/t6.png";
// Mock image data (replace with backend API call)
const mockImageData = [
  { id: 1, src: t1, alt: "Blockchain Icon" },
  { id: 2, src: t2, alt: "Crypto Wallet Icon" },
  { id: 3, src: t3, alt: "Smart Contract Icon" },
  { id: 4, src: t4, alt: "Decentralized Network Icon" },
  { id: 5, src: t5, alt: "Token Icon" },
  { id: 6, src: t6, alt: "Web3 Icon" },
  { id: 7, src: t1, alt: "Blockchain Icon" },
  { id: 8, src: t2, alt: "Crypto Wallet Icon" },
  { id: 9, src: t3, alt: "Smart Contract Icon" },
  { id: 10, src: t4, alt: "Decentralized Network Icon" },
  { id: 11, src: t5, alt: "Token Icon" },
  { id: 12, src: t6, alt: "Web3 Icon" },
];

const DecentralizedFuture = () => {
  const [images, setImages] = useState(mockImageData);

  // Simulate fetching images from a backend
  useEffect(() => {
    // Replace with actual API call, e.g., fetch('/api/images')
    const fetchImages = async () => {
      try {
        // Mock API response
        const response = mockImageData; // Replace with: await fetch('/api/images').then(res => res.json());
        setImages(response);
      } catch (error) {
        console.error("Error fetching images:", error);
        setImages(mockImageData); // Fallback to mock data
      }
    };
    fetchImages();
  }, []);

  return (
    <section className="bg-[#0f0f0f] text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      {/* Heading Section */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
        <h6 className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
          Decentralized Future
        </h6>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 leading-tight">
          The next generation of the internet
        </h2>
        <p className="text-base sm:text-xl mt-4 text-gray-300">
          Lorem ipsum dolor sit amet consectetur. Diam et quis sit pretium orci.
          At feugiat duis parturient amet scelerisque enim vulputate tortor.
        </p>
      </div>

      {/* Dynamic Image Grid */}
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6 max-w-4xl mx-auto">
        {images.map((image) => (
          <img
            key={image.id}
            src={image.src}
            alt={image.alt}
            className="w-16 sm:w-20 lg:w-24 h-auto object-contain"
          />
        ))}
      </div>
    </section>
  );
};

export default DecentralizedFuture;