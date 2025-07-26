import React from 'react';
import Button from '../common/Button';
import VendorIllustration from '../../assets/svg/VendorIIlustration';

const HeroSection = () => {
  const handlemarketplaceClick = () => {
    <Link to= "/marketplace"></Link>
  }
  return (
    <section className="hero-pattern py-16 md:py-24">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-12 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            <span className="text-[#e8630a]">Empowering Vendors,</span> 
            <span className="text-[#2a9d8f]">Building Trust</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            Connecting street food vendors with quality suppliers through trust-driven technology. 
            Simplifying supply chains, empowering local businesses.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Button 
              variant="primary" 
             onClick={handlemarketplaceClick}
            >
              Explore Marketplace
            </Button>
            <Button 
              variant="secondary" 
              onClick={() => console.log('Find a Warehouse')}
            >
              Find a Warehouse
            </Button>
          </div>
        </div>
        <div className="md:w-1/2">
          <VendorIllustration />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
      