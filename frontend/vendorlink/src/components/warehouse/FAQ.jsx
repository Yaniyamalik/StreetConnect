import React from 'react';

const FAQ = () => {
  const faqItems = [
    {
      question: "What is a capsule storage unit?",
      answer: "Capsule storage units are compact, secure compartments designed for efficient storage of inventory and goods. Each capsule is individually secured and accessible only to you."
    },
    {
      question: "How do I access my capsule?",
      answer: "You'll receive a unique access code and can use biometric authentication (fingerprint) to enter the facility. Your specific capsule will have a digital lock that can be opened via our mobile app."
    },
    {
      question: "What items are not allowed in storage?",
      answer: "Prohibited items include perishable food (unless in cold storage), live animals, hazardous materials, illegal items, and extremely valuable items without proper insurance."
    },
    {
      question: "Can I cancel my booking?",
      answer: "Yes, you can cancel up to 48 hours before your booking start date for a full refund. Cancellations within 48 hours will incur a one-day charge."
    },
    {
      question: "What's the difference between standard and cold storage?",
      answer: "Standard storage maintains a temperature between 18-24°C, while cold storage units are kept between 2-8°C, ideal for temperature-sensitive items."
    },
    {
      question: "Is there staff available on-site?",
      answer: "Staff is available during business hours (8 AM - 6 PM). After hours, our 24/7 customer support is available via phone, and the facility is monitored remotely."
    }
  ];

  return (
    <div className="mt-12 bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Frequently Asked Questions</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {faqItems.map((item, index) => (
          <div key={index}>
            <h3 className="font-medium text-gray-800 mb-2">{item.question}</h3>
            <p className="text-sm text-gray-600">{item.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;