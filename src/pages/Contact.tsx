
import { useState, useEffect, useRef } from 'react';
import Layout from '../components/layout/Layout';
import { Mail, MapPin, Phone, Send, Calendar, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isFormVisible, setIsFormVisible] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsFormVisible(true);
        }
      },
      { threshold: 0.2 }
    );
    
    if (formRef.current) {
      observer.observe(formRef.current);
    }
    
    return () => {
      if (formRef.current) {
        observer.unobserve(formRef.current);
      }
    };
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    // Mock form submission
    setTimeout(() => {
      toast.success('Your message has been sent! We will get back to you soon.');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1000);
  };
  
  const contactCards = [
    {
      icon: Mail,
      title: "Email Us",
      description: "Our team will respond within 24 hours",
      contact: "info@herbalcodex.com",
      link: "mailto:info@herbalcodex.com",
      bgColor: "from-blue-400/20 to-blue-500/10"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      description: "Our research garden is open to visitors",
      contact: "123 Botany Lane, Greenville, Earth",
      link: "#map",
      bgColor: "from-herb-green-light/20 to-herb-green/10"
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "Monday - Friday, 9am - 5pm",
      contact: "+1 (123) 456-7890",
      link: "tel:+11234567890",
      bgColor: "from-amber-400/20 to-amber-500/10"
    }
  ];
  
  const faq = [
    {
      question: "Do you offer guided tours of your garden?",
      answer: "Yes, we offer guided tours of our research garden on weekends. Tours must be booked at least 48 hours in advance through our booking system."
    },
    {
      question: "Can I purchase herbs from your garden?",
      answer: "We do not sell herbs directly from our garden as it is primarily for research and education. However, we can connect you with reputable suppliers."
    },
    {
      question: "Do you offer workshops or classes?",
      answer: "Yes! We regularly host workshops on herb identification, cultivation, and preparation. Check our Events page for upcoming sessions."
    }
  ];

  return (
    <Layout>
      <div className="relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-1/3 h-screen bg-herb-cream opacity-50 -skew-x-12 transform origin-top-right z-0"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-96 bg-herb-green opacity-5 skew-y-6 transform origin-bottom-left z-0"></div>
        
        <div className="container mx-auto px-6 py-12 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold text-herb-green-dark mb-4">Get in Touch</h1>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                We'd love to hear from you! Whether you have questions about herbs, want to collaborate, or need assistance, we're here to help.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {contactCards.map((card, index) => (
                <div 
                  key={card.title}
                  className="bg-gradient-to-br bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  style={{ 
                    animationDelay: `${index * 0.1}s`,
                    animationDuration: '0.8s',
                    animation: 'fade-in 0.8s ease-out forwards',
                    opacity: 0,
                    transform: 'translateY(10px)'
                  }}
                >
                  <div className={`p-6 text-center relative overflow-hidden`}>
                    <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${card.bgColor}`}></div>
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${card.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <card.icon className="h-8 w-8 text-herb-green-dark" />
                    </div>
                    <h3 className="text-xl font-bold text-herb-green-dark mb-2">{card.title}</h3>
                    <p className="text-gray-600 mb-4">{card.description}</p>
                    <a 
                      href={card.link} 
                      className="text-herb-green hover:text-herb-green-dark transition-colors font-medium inline-flex items-center justify-center"
                    >
                      {card.contact}
                    </a>
                  </div>
                </div>
              ))}
            </div>
            
            <div ref={formRef} className="bg-white rounded-xl shadow-xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-5">
                {/* Contact Form - Spans 3 columns */}
                <div className={`lg:col-span-3 p-8 transition-all duration-1000 transform ${
                  isFormVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
                }`}>
                  <div className="flex items-center mb-6">
                    <MessageSquare className="h-6 w-6 text-herb-green mr-2" />
                    <h2 className="text-2xl font-bold text-herb-green-dark">Send Us a Message</h2>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-herb-green focus:border-herb-green"
                          placeholder="John Doe"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-herb-green focus:border-herb-green"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Subject
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-herb-green focus:border-herb-green appearance-none bg-no-repeat bg-right"
                        style={{ 
                          backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236B7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E\")",
                          backgroundSize: "1.5em 1.5em", 
                          paddingRight: "2.5rem" 
                        }}
                      >
                        <option value="">Please select</option>
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Plant Information">Plant Information</option>
                        <option value="Technical Support">Technical Support</option>
                        <option value="Collaboration">Collaboration</option>
                        <option value="Feedback">Feedback</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-herb-green focus:border-herb-green"
                        placeholder="How can we help you?"
                      ></textarea>
                    </div>
                    
                    <button
                      type="submit"
                      className="herb-button w-full group flex items-center justify-center shadow-lg hover:shadow-xl transition-all bg-gradient-to-r from-herb-green to-herb-green-dark"
                    >
                      Send Message
                      <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </form>
                </div>
                
                {/* Map and Upcoming Events - Spans 2 columns */}
                <div className="lg:col-span-2 bg-herb-green-dark text-white">
                  {/* Map */}
                  <div className="bg-herb-green-dark h-64 relative">
                    <div id="map" className="w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <MapPin className="h-12 w-12 mx-auto mb-3" />
                        <p className="text-lg font-medium">Interactive Map Coming Soon</p>
                        <p className="text-sm opacity-80 mt-2">
                          Visit us at 123 Botany Lane, Greenville, Earth
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Upcoming Events */}
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <Calendar className="h-5 w-5 mr-2" />
                      <h3 className="text-xl font-bold">Upcoming Events</h3>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="bg-white/10 rounded-lg p-4">
                        <h4 className="font-medium">Herb Identification Walk</h4>
                        <p className="text-sm opacity-80 mt-1">May 25, 2025 • 10:00 AM</p>
                      </div>
                      <div className="bg-white/10 rounded-lg p-4">
                        <h4 className="font-medium">Medicinal Tea Workshop</h4>
                        <p className="text-sm opacity-80 mt-1">June 8, 2025 • 2:00 PM</p>
                      </div>
                      <div className="bg-white/10 rounded-lg p-4">
                        <h4 className="font-medium">Summer Solstice Herb Gathering</h4>
                        <p className="text-sm opacity-80 mt-1">June 21, 2025 • 7:00 AM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* FAQ Section */}
            <div className="mt-16 max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-herb-green-dark mb-8 text-center">Frequently Asked Questions</h2>
              
              <div className="space-y-4">
                {faq.map((item, idx) => (
                  <div 
                    key={idx} 
                    className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-500"
                    style={{ 
                      animationDelay: `${idx * 0.2}s`,
                      animation: 'fade-in 0.8s ease-out forwards',
                      opacity: 0,
                      transform: 'translateY(10px)'
                    }}
                  >
                    <details className="group">
                      <summary className="flex justify-between items-center p-5 font-medium cursor-pointer list-none">
                        <span className="text-herb-green-dark font-semibold">{item.question}</span>
                        <span className="transition group-open:rotate-180">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-herb-green">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </span>
                      </summary>
                      <div className="px-5 pb-5 pt-0 text-gray-700 border-t border-gray-100">
                        <p>{item.answer}</p>
                      </div>
                    </details>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
