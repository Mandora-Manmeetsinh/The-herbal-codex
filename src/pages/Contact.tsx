
import { useState, useEffect, useRef } from 'react';
import Layout from '../components/layout/Layout';
import { Mail, MapPin, Phone, Send, Calendar, MessageSquare, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  
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
    
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      if (pageRef.current) {
        const { left, top, width, height } = pageRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;
        setMousePosition({ x, y });
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      if (formRef.current) {
        observer.unobserve(formRef.current);
      }
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
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
  
  const calculateMouseParallax = (depth: number) => {
    const x = (mousePosition.x - 0.5) * depth * 20;
    const y = (mousePosition.y - 0.5) * depth * 20;
    return `translate(${x}px, ${y}px)`;
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
      <div className="relative overflow-hidden" ref={pageRef}>
        {/* Animated background elements */}
        <div 
          className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-herb-green-light/10 blur-3xl"
          style={{ transform: calculateMouseParallax(1.5) }}
        ></div>
        <div 
          className="absolute top-1/3 -right-24 w-96 h-96 rounded-full bg-herb-cream/20 blur-3xl"
          style={{ transform: calculateMouseParallax(2) }}
        ></div>
        <div 
          className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-herb-gold/10 blur-3xl"
          style={{ transform: calculateMouseParallax(1.2) }}
        ></div>
        
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-1/3 h-screen bg-herb-cream opacity-50 -skew-x-12 transform origin-top-right z-0"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-96 bg-herb-green opacity-5 skew-y-6 transform origin-bottom-left z-0"></div>
        
        {/* Floating botanical elements */}
        <div 
          className="hidden md:block absolute top-1/4 left-5 w-16 h-16 opacity-10"
          style={{ transform: `translateY(${scrollPosition * 0.05}px) rotate(${scrollPosition * 0.02}deg)` }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="text-herb-green-dark">
            <path d="M12,3C16.97,3 21,7.03 21,12C21,16.97 16.97,21 12,21C7.03,21 3,16.97 3,12C3,7.03 7.03,3 12,3M12,5C8.14,5 5,8.14 5,12C5,15.86 8.14,19 12,19C15.86,19 19,15.86 19,12C19,8.14 15.86,5 12,5M12,7C14.76,7 17,9.24 17,12C17,14.76 14.76,17 12,17C9.24,17 7,14.76 7,12C7,9.24 9.24,7 12,7M12,9C10.35,9 9,10.35 9,12C9,13.65 10.35,15 12,15C13.65,15 15,13.65 15,12C15,10.35 13.65,9 12,9Z" />
          </svg>
        </div>
        
        <div 
          className="hidden md:block absolute top-1/3 right-10 w-24 h-24 opacity-10"
          style={{ transform: `translateY(${scrollPosition * 0.08}px) rotate(${-scrollPosition * 0.01}deg)` }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="text-herb-brown">
            <path d="M12,2L4.5,20.29L5.21,21L18.79,21L19.5,20.29L12,2Z" />
          </svg>
        </div>
        
        <div className="container mx-auto px-6 py-12 relative z-10">
          {/* Scroll indicator at the top */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-4 animate-bounce">
            <ChevronDown className="w-6 h-6 text-herb-green-dark opacity-60" />
          </div>
          
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold text-herb-green-dark mb-4 relative inline-block">
                Get in Touch
                <span className="block h-1 w-24 mx-auto bg-herb-gold mt-3 rounded-full animate-scale-in" style={{ animationDelay: '0.5s', transformOrigin: 'center' }}></span>
              </h1>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto mt-6">
                We'd love to hear from you! Whether you have questions about herbs, want to collaborate, or need assistance, we're here to help.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {contactCards.map((card, index) => (
                <div 
                  key={card.title}
                  className={`bg-gradient-to-br bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-500 transform ${
                    activeCard === index ? 'scale-105 -translate-y-1' : 'scale-100 translate-y-0'
                  }`}
                  style={{ 
                    animationDelay: `${index * 0.2}s`,
                    animationDuration: '0.8s',
                    animation: 'fade-in 0.8s ease-out forwards',
                    opacity: 0,
                    transform: 'translateY(10px)'
                  }}
                  onMouseEnter={() => setActiveCard(index)}
                  onMouseLeave={() => setActiveCard(null)}
                >
                  <div className={`p-6 text-center relative overflow-hidden transition-all duration-300`}>
                    <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${card.bgColor}`}></div>
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${card.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <card.icon className="h-8 w-8 text-herb-green-dark" />
                    </div>
                    <h3 className="text-xl font-bold text-herb-green-dark mb-2">{card.title}</h3>
                    <p className="text-gray-600 mb-4">{card.description}</p>
                    <a 
                      href={card.link} 
                      className="text-herb-green hover:text-herb-green-dark transition-colors font-medium inline-flex items-center justify-center relative overflow-hidden group-hover:underline"
                    >
                      <span>{card.contact}</span>
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-herb-green-dark group-hover:w-full transition-all duration-300"></span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
            
            <div ref={formRef} className="bg-white rounded-xl shadow-xl overflow-hidden transform transition-all duration-500">
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
                      <div className="relative">
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-herb-green focus:border-herb-green transition-shadow duration-300 focus:shadow-md"
                          placeholder="John Doe"
                        />
                        <span className="absolute h-1 w-0 bg-herb-green-light bottom-0 left-0 transition-all duration-300 group-focus-within:w-full"></span>
                      </div>
                      
                      <div className="relative">
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-herb-green focus:border-herb-green transition-shadow duration-300 focus:shadow-md"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                    
                    <div className="relative">
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Subject
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-herb-green focus:border-herb-green appearance-none bg-no-repeat bg-right transition-shadow duration-300 focus:shadow-md"
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
                    
                    <div className="relative">
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-herb-green focus:border-herb-green transition-shadow duration-300 focus:shadow-md"
                        placeholder="How can we help you?"
                      ></textarea>
                    </div>
                    
                    <button
                      type="submit"
                      className="herb-button w-full group flex items-center justify-center shadow-lg hover:shadow-xl transition-all bg-gradient-to-r from-herb-green to-herb-green-dark overflow-hidden relative"
                    >
                      <span className="relative z-10">Send Message</span>
                      <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform relative z-10" />
                      <div className="absolute inset-0 w-full h-full bg-herb-green-dark transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></div>
                    </button>
                  </form>
                </div>
                
                {/* Map and Upcoming Events - Spans 2 columns */}
                <div className="lg:col-span-2 bg-herb-green-dark text-white">
                  {/* Map */}
                  <div className="bg-herb-green-dark h-64 relative overflow-hidden">
                    <div className="absolute inset-0 transform hover:scale-110 transition-transform duration-700">
                      <div 
                        id="map" 
                        className="w-full h-full flex items-center justify-center bg-gradient-to-br from-herb-green-dark to-herb-green border-b border-white/10"
                      >
                        <div className="text-center">
                          <MapPin className="h-12 w-12 mx-auto mb-3 animate-float" />
                          <p className="text-lg font-medium">Interactive Map Coming Soon</p>
                          <p className="text-sm opacity-80 mt-2">
                            Visit us at 123 Botany Lane, Greenville, Earth
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-herb-green-dark/30 pointer-events-none"></div>
                  </div>
                  
                  {/* Upcoming Events */}
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <Calendar className="h-5 w-5 mr-2" />
                      <h3 className="text-xl font-bold">Upcoming Events</h3>
                    </div>
                    
                    <div className="space-y-4">
                      {[
                        { title: "Herb Identification Walk", date: "May 25, 2025 • 10:00 AM" },
                        { title: "Medicinal Tea Workshop", date: "June 8, 2025 • 2:00 PM" },
                        { title: "Summer Solstice Herb Gathering", date: "June 21, 2025 • 7:00 AM" }
                      ].map((event, idx) => (
                        <div 
                          key={event.title}
                          className="bg-white/10 rounded-lg p-4 transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer border border-transparent hover:border-white/20"
                          style={{
                            animationDelay: `${idx * 0.2}s`,
                            animationDuration: '0.8s',
                            animation: 'fade-in 0.8s ease-out forwards',
                            opacity: 0
                          }}
                        >
                          <h4 className="font-medium">{event.title}</h4>
                          <p className="text-sm opacity-80 mt-1 flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {event.date}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* FAQ Section */}
            <div className="mt-16 max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-herb-green-dark mb-8 text-center relative">
                Frequently Asked Questions
                <span className="block h-1 w-24 mx-auto bg-herb-gold mt-3 rounded-full animate-scale-in" style={{ animationDelay: '1s', transformOrigin: 'center' }}></span>
              </h2>
              
              <div className="space-y-4">
                {faq.map((item, idx) => (
                  <div 
                    key={idx} 
                    className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-500 ${
                      activeFaq === idx ? 'shadow-xl' : ''
                    }`}
                    style={{ 
                      animationDelay: `${idx * 0.2}s`,
                      animation: 'fade-in 0.8s ease-out forwards',
                      opacity: 0,
                      transform: 'translateY(10px)'
                    }}
                  >
                    <div 
                      className="flex justify-between items-center p-5 font-medium cursor-pointer list-none group"
                      onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    >
                      <span className="text-herb-green-dark font-semibold">{item.question}</span>
                      <span className={`transition-transform duration-300 transform ${
                        activeFaq === idx ? 'rotate-180' : 'rotate-0'
                      }`}>
                        <ChevronDown className="w-5 h-5 text-herb-green" />
                      </span>
                    </div>
                    <div 
                      className={`px-5 pb-5 pt-0 text-gray-700 border-t border-gray-100 overflow-hidden transition-all duration-300 ${
                        activeFaq === idx ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <p className="py-2">{item.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Back to top button */}
        <div 
          className={`fixed bottom-8 right-8 bg-herb-green-dark text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg cursor-pointer transform transition-all duration-300 hover:bg-herb-green hover:scale-110 ${
            scrollPosition > 300 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
          }`}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <ChevronDown className="transform rotate-180" />
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
