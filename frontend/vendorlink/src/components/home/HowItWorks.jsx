import React from 'react';
import Card from '../common/Card';

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: 'Create Your Profile',
      description: 'Sign up as a vendor or supplier and create your profile with your specific needs and offerings.',
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
        </svg>
      ),
      color: '#e8630a'
    },
    {
      id: 2,
      title: 'Find Perfect Matches',
      description: 'Our smart algorithm connects vendors with the most suitable suppliers based on location, needs, and preferences.',
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      ),
      color: '#2a9d8f'
    },
    {
      id: 3,
      title: 'Trade with Confidence',
      description: 'Secure transactions, quality assurance, and transparent reviews build trust between vendors and suppliers.',
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
        </svg>
      ),
      color: '#e9c46a'
    }
  ];

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <Card 
              key={step.id}
              title={step.title}
              description={step.description}
              icon={step.icon}
              iconBgColor={step.color}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
      