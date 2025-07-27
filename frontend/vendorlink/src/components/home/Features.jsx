import React from 'react';

const Features = () => {
  const features = [
    {
      id: 1,
      title: 'Direct Connections',
      description: 'Cut out middlemen and connect directly with suppliers for better prices and relationships.',
      iconColor: '#e8630a'
    },
    {
      id: 2,
      title: 'Quality Assurance',
      description: 'All suppliers are vetted for quality, reliability, and fair pricing practices.',
      iconColor: '#2a9d8f'
    },
    {
      id: 3,
      title: 'Community Support',
      description: 'Join a community of vendors and suppliers sharing knowledge and best practices.',
      iconColor: '#e9c46a'
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: "China's Momo Stand",
      location: "Delhi",
      quote: "StreetConnect helped me find reliable suppliers for my ingredients. My costs are down 20% and quality is better than ever!",
      initial: "M",
      bgColor: "#ffddd2",
      textColor: "#e8630a"
    },
    {
      id: 2,
      name: "Raj's Spice Warehouse",
      location: "Mumbai",
      quote: "I've connected with over 50 local food vendors through this platform. My business has grown 35% in just six months!",
      initial: "R",
      bgColor: "#e9f5f3",
      textColor: "#2a9d8f"
    }
  ];

  return (
    <section className="bg-[#f8f9fa] py-16">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose StreetConnect?</h2>
            <div className="space-y-6">
              {features.map((feature) => (
                <div key={feature.id} className="flex items-start">
                  <div className={`bg-[${feature.iconColor}] rounded-full p-2 mr-4 mt-1`}>
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="md:w-1/2 md:pl-12">
            <div className="bg-white rounded-lg shadow-xl overflow-hidden">
              <div className="bg-[#e8630a] text-white py-4 px-6">
                <h3 className="text-xl font-semibold">Success Stories</h3>
              </div>
              <div className="p-6">
                {testimonials.map((testimonial, index) => (
                  <div 
                    key={testimonial.id} 
                    className={`${index !== testimonials.length - 1 ? 'mb-6 pb-6 border-b border-gray-200' : ''}`}
                  >
                    <div className="flex items-center mb-3">
                      <div 
                        className={`bg-[${testimonial.bgColor}] rounded-full w-12 h-12 flex items-center justify-center mr-4`}
                      >
                        <span className={`text-[${testimonial.textColor}] font-bold text-xl`}>{testimonial.initial}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-gray-500">{testimonial.location}</p>
                      </div>
                    </div>
                    <p className="text-gray-600">"{testimonial.quote}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
      