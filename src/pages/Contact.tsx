
import { useState } from 'react';
import Layout from '../components/layout/Layout';
import { Mail, MapPin, Phone } from 'lucide-react';
import { toast } from 'sonner';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
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
  
  return (
    <Layout>
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-herb-green-dark mb-4">Get in Touch</h1>
            <p className="text-lg text-gray-700">
              We'd love to hear from you! Whether you have questions about herbs, want to collaborate, or need assistance, we're here to help.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Contact Card - Email */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-herb-cream w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center">
                <Mail className="h-8 w-8 text-herb-green-dark" />
              </div>
              <h3 className="text-xl font-bold text-herb-green-dark mb-2">Email Us</h3>
              <p className="text-gray-700 mb-4">Our team will respond within 24 hours</p>
              <a href="mailto:info@herbalcodex.com" className="text-herb-green hover:text-herb-green-dark transition-colors">
                info@herbalcodex.com
              </a>
            </div>
            
            {/* Contact Card - Visit */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-herb-cream w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center">
                <MapPin className="h-8 w-8 text-herb-green-dark" />
              </div>
              <h3 className="text-xl font-bold text-herb-green-dark mb-2">Visit Us</h3>
              <p className="text-gray-700 mb-4">Our research garden is open to visitors</p>
              <address className="not-italic text-herb-green">
                123 Botany Lane<br />
                Greenville, Earth
              </address>
            </div>
            
            {/* Contact Card - Call */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-herb-cream w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center">
                <Phone className="h-8 w-8 text-herb-green-dark" />
              </div>
              <h3 className="text-xl font-bold text-herb-green-dark mb-2">Call Us</h3>
              <p className="text-gray-700 mb-4">Monday - Friday, 9am - 5pm</p>
              <a href="tel:+11234567890" className="text-herb-green hover:text-herb-green-dark transition-colors">
                +1 (123) 456-7890
              </a>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Contact Form */}
              <div className="p-8">
                <h2 className="text-2xl font-bold text-herb-green-dark mb-6">Send Us a Message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-herb-green focus:border-herb-green"
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-herb-green focus:border-herb-green"
                    />
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-herb-green focus:border-herb-green"
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-herb-green focus:border-herb-green"
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="herb-button w-full"
                  >
                    Send Message
                  </button>
                </form>
              </div>
              
              {/* Map */}
              <div className="bg-gray-300 h-full min-h-[400px]">
                {/* In a real implementation, this would be a Google Maps or similar embed */}
                <div className="w-full h-full flex items-center justify-center bg-herb-green-dark">
                  <div className="text-center text-white">
                    <MapPin className="h-12 w-12 mx-auto mb-3" />
                    <p className="text-lg font-medium">Interactive Map Coming Soon</p>
                    <p className="text-sm opacity-80 mt-2">
                      Visit us at 123 Botany Lane, Greenville, Earth
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
