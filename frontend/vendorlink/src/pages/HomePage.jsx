import React from 'react';
import HeroSection from '../components/home/HeroSection';
import HowItWorks from '../components/home/HowItWorks';
import Features from '../components/home/Features';
import CTASection from '../components/home/CTASection';

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <HowItWorks />
      <Features />
      <CTASection />
    </div>
  );
};

export default HomePage;
