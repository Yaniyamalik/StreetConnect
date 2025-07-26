import React from 'react';
import Button from '../common/Button';

const CTASection = () => {
  return (
    <section className="bg-[#e8630a] text-white py-16">
      <div className="container mx-auto px-6 md:px-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join thousands of vendors and suppliers already building trust and growing their businesses on our platform.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Button 
            variant="white" 
            onClick={() => console.log('Get Started')}
          >
            Get Started Now
          </Button>
          <Button 
            variant="outline" 
            onClick={() => console.log('Watch Demo')}
          >
            Watch Demo
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;