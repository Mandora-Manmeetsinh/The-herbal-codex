import { useEffect, useRef, useState } from 'react';
import Layout from '../components/layout/Layout';
import { Book, Globe, FlaskConical, Users } from 'lucide-react';

const About = () => {
  const [visibleSections, setVisibleSections] = useState<string[]>([]);
  const sectionRefs = {
    intro: useRef<HTMLDivElement>(null),
    mission: useRef<HTMLDivElement>(null),
    story: useRef<HTMLDivElement>(null),
    team: useRef<HTMLDivElement>(null),
    approach: useRef<HTMLDivElement>(null)
  };
  
  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -10% 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.id) {
          setVisibleSections(prev => [...prev, entry.target.id]);
        }
      });
    }, observerOptions);
    
    Object.values(sectionRefs).forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });
    
    return () => {
      Object.values(sectionRefs).forEach(ref => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);
  
  const isVisible = (sectionId: string) => visibleSections.includes(sectionId);
  
  const valuesData = [
    {
      icon: Book,
      title: "Research-Based",
      description: "We combine historical knowledge with modern scientific research to provide accurate information."
    },
    {
      icon: Globe,
      title: "Sustainability",
      description: "We promote sustainable harvesting practices and conservation of medicinal plant species."
    },
    {
      icon: FlaskConical,
      title: "Innovation",
      description: "We use cutting-edge technology to make learning about plants more interactive and engaging."
    },
    {
      icon: Users,
      title: "Community",
      description: "We believe in knowledge sharing and building a community of plant enthusiasts and practitioners."
    }
  ];

  return (
    <Layout>
      <div className="relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-64 bg-herb-green-dark opacity-5 -skew-y-6 transform origin-top-left"></div>
        <div className="absolute top-96 right-0 w-1/2 h-96 bg-herb-green opacity-5 skew-y-12 transform origin-bottom-right"></div>
        
        <div className="container mx-auto px-6 py-12 relative z-10">
          <div 
            id="intro" 
            ref={sectionRefs.intro}
            className={`max-w-4xl mx-auto mb-20 transition-all duration-1000 transform ${
              isVisible('intro') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-herb-green-dark mb-8">About The Herbal Codex</h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                The Herbal Codex is a digital compendium of medicinal plants, offering an immersive and educational experience through cutting-edge 3D technology and evidence-based information.
              </p>
              
              <div className="bg-gradient-to-r from-herb-green-light/20 to-herb-cream p-8 rounded-lg my-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {valuesData.map((value, idx) => (
                    <div 
                      key={value.title} 
                      className="text-center"
                      style={{ 
                        transitionDelay: `${idx * 100}ms`,
                        opacity: isVisible('intro') ? 1 : 0,
                        transform: isVisible('intro') ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'all 0.5s ease'
                      }}
                    >
                      <div className="bg-white w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center shadow-md">
                        <value.icon className="h-8 w-8 text-herb-green-dark" />
                      </div>
                      <h3 className="font-bold text-herb-green-dark">{value.title}</h3>
                      <p className="text-sm text-gray-700 mt-1">{value.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
            
          <div 
            id="mission" 
            ref={sectionRefs.mission}
            className={`max-w-4xl mx-auto mb-20 transition-all duration-1000 transform ${
              isVisible('mission') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <div className="flex items-center mb-6">
              <div className="w-16 h-1 bg-herb-green-dark rounded-full mr-4"></div>
              <h2 className="text-3xl font-bold text-herb-green-dark">Our Mission</h2>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-herb-green-dark">
              <p className="text-lg text-gray-700 leading-relaxed">
                Our mission is to preserve and share traditional plant knowledge while making it accessible to everyone through modern technology. We aim to bridge the gap between ancient herbal wisdom and contemporary scientific understanding, creating a resource that is both educational and engaging.
              </p>
              
              <div className="mt-6 p-4 bg-herb-cream rounded-md">
                <blockquote className="italic text-herb-green-dark">
                  "Nature itself is the best physician."
                  <footer className="mt-1 text-gray-600 text-sm">— Hippocrates</footer>
                </blockquote>
              </div>
            </div>
          </div>
          
          <div 
            id="story" 
            ref={sectionRefs.story}
            className={`max-w-4xl mx-auto mb-20 transition-all duration-1000 transform ${
              isVisible('story') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <div className="flex items-center mb-6">
              <div className="w-16 h-1 bg-herb-green-dark rounded-full mr-4"></div>
              <h2 className="text-3xl font-bold text-herb-green-dark">Our Story</h2>
            </div>
            
            <div className="md:flex gap-8 items-center">
              <div className="md:w-1/3 mb-6 md:mb-0">
                <div className="relative overflow-hidden rounded-lg shadow-lg">
                  <img 
                    src="/plants/lavender.jpg" 
                    alt="Herbal garden" 
                    className="w-full h-auto transform transition-transform duration-700 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-herb-green-dark/60 to-transparent"></div>
                </div>
              </div>
              
              <div className="md:w-2/3">
                <p className="text-gray-700 mb-6">
                  The Herbal Codex began as a passion project by a team of botanists, herbalists, and technology enthusiasts who wanted to create a new way to learn about medicinal plants. Inspired by both ancient herbals and modern interactive technology, we set out to build a digital platform that would make plant knowledge come alive.
                </p>
                <p className="text-gray-700">
                  What started as a simple database has grown into an immersive 3D experience that allows users to explore plants in a virtual garden, learn about their properties through interactive information panels, and understand how they respond to different environmental conditions.
                </p>
              </div>
            </div>
          </div>
          
          <div 
            id="team" 
            ref={sectionRefs.team}
            className={`max-w-4xl mx-auto mb-20 transition-all duration-1000 transform ${
              isVisible('team') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <div className="flex items-center mb-12">
              <div className="w-16 h-1 bg-herb-green-dark rounded-full mr-4"></div>
              <h2 className="text-3xl font-bold text-herb-green-dark">Our Team</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg overflow-hidden shadow-lg group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative h-64 overflow-hidden">
                  <img src="/team/botanist.jpg" alt="Dr. Sofia Chen" className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-herb-green-dark to-transparent opacity-70"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">Dr. Sofia Chen</h3>
                    <p className="text-herb-cream font-medium">Lead Botanist</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-700">
                    With a PhD in Ethnobotany, Sofia brings extensive knowledge of medicinal plants from around the world.
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg overflow-hidden shadow-lg group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative h-64 overflow-hidden">
                  <img src="/team/developer.jpg" alt="Marcus Johnson" className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-herb-green-dark to-transparent opacity-70"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">Marcus Johnson</h3>
                    <p className="text-herb-cream font-medium">Tech Lead</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-700">
                    A specialist in 3D visualization and web technologies, Marcus leads our development team.
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg overflow-hidden shadow-lg group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center bg-herb-green-light/20">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-herb-cream rounded-full mx-auto mb-4 flex items-center justify-center">
                        <span className="text-3xl font-bold text-herb-green-dark">+</span>
                      </div>
                      <h3 className="text-xl font-bold text-herb-green-dark">Join Our Team</h3>
                    </div>
                  </div>
                </div>
                <div className="p-6 text-center">
                  <p className="text-gray-700 mb-4">
                    We're always looking for passionate people to join our mission.
                  </p>
                  <a href="/contact" className="inline-block px-6 py-2 bg-herb-green-dark text-white rounded-full hover:bg-herb-green transition-colors">
                    Get In Touch
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div 
            id="approach" 
            ref={sectionRefs.approach}
            className={`max-w-4xl mx-auto mb-10 transition-all duration-1000 transform ${
              isVisible('approach') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <div className="flex items-center mb-6">
              <div className="w-16 h-1 bg-herb-green-dark rounded-full mr-4"></div>
              <h2 className="text-3xl font-bold text-herb-green-dark">Our Approach</h2>
            </div>
            
            <div className="bg-gradient-to-r from-white to-herb-cream/30 p-8 rounded-lg shadow-lg">
              <p className="text-gray-700 mb-6">
                The Herbal Codex combines historical herbal knowledge with modern scientific research. We verify all plant information through peer-reviewed studies and traditional texts, providing a comprehensive view of each plant's properties and uses.
              </p>
              <p className="text-gray-700 mb-6">
                Our 3D models are created with detailed attention to botanical accuracy, ensuring that each virtual plant correctly represents its real-world counterpart. The interactive garden environment allows users to see how plants grow and respond to different conditions, offering insights that go beyond static text and images.
              </p>
              
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-md shadow-md">
                  <h3 className="text-xl font-bold text-herb-green-dark mb-3">Science-Based</h3>
                  <p className="text-gray-600">We rely on peer-reviewed studies and collaborate with academic institutions to ensure accuracy.</p>
                </div>
                <div className="bg-white p-6 rounded-md shadow-md">
                  <h3 className="text-xl font-bold text-herb-green-dark mb-3">Traditional Wisdom</h3>
                  <p className="text-gray-600">We honor indigenous and traditional knowledge systems that have preserved herbal wisdom for centuries.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
