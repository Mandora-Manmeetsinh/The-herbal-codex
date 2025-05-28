
import { useEffect, useRef, useState } from 'react';
import Layout from '../components/layout/Layout';
import { Book, Globe, FlaskConical, Users, ChevronDown } from 'lucide-react';

const About = () => {
  const [visibleSections, setVisibleSections] = useState<string[]>([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
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
    
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      Object.values(sectionRefs).forEach(ref => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const isVisible = (sectionId: string) => visibleSections.includes(sectionId);
  
  const calculateParallax = (depth: number) => {
    return `translateY(${scrollPosition * depth * 0.1}px)`;
  };
  
  const calculateMouseParallax = (depth: number) => {
    const x = (mousePosition.x - 0.5) * depth * 20;
    const y = (mousePosition.y - 0.5) * depth * 20;
    return `translate(${x}px, ${y}px)`;
  };
  
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
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-64 bg-herb-green-dark opacity-5 -skew-y-6 transform origin-top-left"></div>
        <div className="absolute top-96 right-0 w-1/2 h-96 bg-herb-green opacity-5 skew-y-12 transform origin-bottom-right"></div>
        
        {/* Floating botanical elements */}
        <div 
          className="hidden md:block absolute top-1/4 left-5 w-16 h-16 opacity-10"
          style={{ transform: `${calculateParallax(1.5)} rotate(${scrollPosition * 0.05}deg)` }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="text-herb-green-dark">
            <path d="M12,3C16.97,3 21,7.03 21,12C21,16.97 16.97,21 12,21C7.03,21 3,16.97 3,12C3,7.03 7.03,3 12,3M12,5C8.14,5 5,8.14 5,12C5,15.86 8.14,19 12,19C15.86,19 19,15.86 19,12C19,8.14 15.86,5 12,5M12,7C14.76,7 17,9.24 17,12C17,14.76 14.76,17 12,17C9.24,17 7,14.76 7,12C7,9.24 9.24,7 12,7M12,9C10.35,9 9,10.35 9,12C9,13.65 10.35,15 12,15C13.65,15 15,13.65 15,12C15,10.35 13.65,9 12,9Z" />
          </svg>
        </div>
        
        <div 
          className="hidden md:block absolute top-1/3 right-10 w-24 h-24 opacity-10"
          style={{ transform: `${calculateParallax(2)} rotate(${-scrollPosition * 0.03}deg)` }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="text-herb-brown">
            <path d="M12,2L4.5,20.29L5.21,21L18.79,21L19.5,20.29L12,2Z" />
          </svg>
        </div>
        
        <div 
          className="hidden md:block absolute bottom-1/3 left-20 w-20 h-20 opacity-10"
          style={{ transform: `${calculateParallax(1.2)} rotate(${scrollPosition * 0.02}deg)` }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="text-herb-gold">
            <path d="M12,5.5A3.5,3.5 0 0,1 15.5,9A3.5,3.5 0 0,1 12,12.5A3.5,3.5 0 0,1 8.5,9A3.5,3.5 0 0,1 12,5.5M5,8C5.56,8 6.08,8.15 6.53,8.42C6.38,9.85 6.8,11.27 7.66,12.38C7.16,13.34 6.16,14 5,14A3,3 0 0,1 2,11A3,3 0 0,1 5,8M19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14C17.84,14 16.84,13.34 16.34,12.38C17.2,11.27 17.62,9.85 17.47,8.42C17.92,8.15 18.44,8 19,8M5.5,18.25C5.5,16.18 8.41,14.5 12,14.5C15.59,14.5 18.5,16.18 18.5,18.25V20H5.5V18.25M0,20V18.5C0,17.11 1.89,15.94 4.45,15.6C3.86,16.28 3.5,17.22 3.5,18.25V20H0M24,20H20.5V18.25C20.5,17.22 20.14,16.28 19.55,15.6C22.11,15.94 24,17.11 24,18.5V20Z" />
          </svg>
        </div>
        
        <div className="container mx-auto px-6 py-12 relative z-10">
          {/* Scroll indicator at the top */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-4 animate-bounce">
            <ChevronDown className="w-6 h-6 text-herb-green-dark opacity-60" />
          </div>
          
          <div 
            id="intro" 
            ref={sectionRefs.intro}
            className={`max-w-4xl mx-auto mb-20 transition-all duration-1000 transform ${
              isVisible('intro') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-herb-green-dark mb-4 relative">
              About The Herbal Codex
              <span className="block h-1 w-24 bg-herb-gold mt-3 rounded-full transform origin-left transition-transform duration-1000 scale-x-0" 
                style={{ transform: isVisible('intro') ? 'scaleX(1)' : 'scaleX(0)', transitionDelay: '400ms' }}>
              </span>
            </h1>
            
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
                      transitionDelay: `${idx * 100 + 300}ms`,
                      opacity: isVisible('intro') ? 1 : 0,
                      transform: isVisible('intro') ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
                      transition: 'all 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                    }}
                  >
                    <div className="bg-white w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center shadow-md hover:shadow-xl transform hover:scale-110 transition-all duration-300">
                      <value.icon className="h-8 w-8 text-herb-green-dark" />
                    </div>
                    <h3 className="font-bold text-herb-green-dark">{value.title}</h3>
                    <p className="text-sm text-gray-700 mt-1">{value.description}</p>
                  </div>
                ))}
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
              <div 
                className="w-16 h-1 bg-herb-green-dark rounded-full mr-4 transition-all duration-700"
                style={{ 
                  width: isVisible('mission') ? '4rem' : '0',
                  opacity: isVisible('mission') ? 1 : 0 
                }}
              ></div>
              <h2 className="text-3xl font-bold text-herb-green-dark">Our Mission</h2>
            </div>
            
            <div 
              className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-herb-green-dark transition-all duration-500"
              style={{ 
                transform: isVisible('mission') ? 'translateX(0)' : 'translateX(-40px)',
                boxShadow: isVisible('mission') ? '0 10px 25px rgba(45, 106, 79, 0.1)' : '0 4px 6px rgba(45, 106, 79, 0.05)'
              }}
            >
              <p className="text-lg text-gray-700 leading-relaxed">
                Our mission is to preserve and share traditional plant knowledge while making it accessible to everyone through modern technology. We aim to bridge the gap between ancient herbal wisdom and contemporary scientific understanding, creating a resource that is both educational and engaging.
              </p>
              
              <div 
                className="mt-6 p-4 bg-herb-cream rounded-md transform transition-transform duration-700"
                style={{ 
                  transform: isVisible('mission') ? 'translateY(0) rotate(0deg)' : 'translateY(20px) rotate(-1deg)',
                  transitionDelay: '300ms'
                }}
              >
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
              <div 
                className="w-16 h-1 bg-herb-green-dark rounded-full mr-4 transition-all duration-700"
                style={{ 
                  width: isVisible('story') ? '4rem' : '0',
                  opacity: isVisible('story') ? 1 : 0 
                }}
              ></div>
              <h2 className="text-3xl font-bold text-herb-green-dark">Our Story</h2>
            </div>
            
            <div className="md:flex gap-8 items-center">
              <div 
                className="md:w-1/3 mb-6 md:mb-0 transition-all duration-700"
                style={{ 
                  transform: isVisible('story') ? 'translateX(0) rotate(0deg)' : 'translateX(-30px) rotate(-3deg)',
                  opacity: isVisible('story') ? 1 : 0 
                }}
              >
                <div className="relative overflow-hidden rounded-lg shadow-lg perspective">
                  <div className="transform transition-transform duration-700 hover:scale-105">
                    <img 
                      src="/plants/lavender.png" 
                      alt="Herbal garden" 
                      className="w-full h-auto"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-herb-green-dark/60 to-transparent"></div>
                  </div>
                  <div 
                    className="absolute top-2 left-2 bg-herb-green-dark/30 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-white border border-white/20"
                    style={{
                      opacity: isVisible('story') ? 1 : 0,
                      transform: isVisible('story') ? 'translateY(0)' : 'translateY(-10px)',
                      transitionDelay: '500ms',
                      transition: 'all 0.5s ease'
                    }}
                  >
                    Est. 2023
                  </div>
                </div>
              </div>
              
              <div 
                className="md:w-2/3"
                style={{ 
                  opacity: isVisible('story') ? 1 : 0,
                  transform: isVisible('story') ? 'translateX(0)' : 'translateX(30px)',
                  transition: 'all 0.7s ease',
                  transitionDelay: '200ms'
                }}
              >
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
              <div 
                className="w-16 h-1 bg-herb-green-dark rounded-full mr-4 transition-all duration-700"
                style={{ 
                  width: isVisible('team') ? '4rem' : '0',
                  opacity: isVisible('team') ? 1 : 0 
                }}
              ></div>
              <h2 className="text-3xl font-bold text-herb-green-dark">Our Team</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {['botanist', 'developer', 'join'].map((member, idx) => {
                if (member === 'join') {
                  return (
                    <div 
                      key={member} 
                      className="bg-white rounded-lg overflow-hidden shadow-lg group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                      style={{
                        opacity: isVisible('team') ? 1 : 0,
                        transform: isVisible('team') ? 'translateY(0) rotate(0deg)' : 'translateY(40px) rotate(2deg)',
                        transition: 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)',
                        transitionDelay: `${idx * 200}ms`
                      }}
                    >
                      <div className="relative h-64 overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center bg-herb-green-light/20">
                          <div className="text-center">
                            <div className="w-24 h-24 bg-herb-cream rounded-full mx-auto mb-4 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
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
                        <a 
                          href="/contact" 
                          className="inline-block px-6 py-2 bg-herb-green-dark text-white rounded-full hover:bg-herb-green transition-colors transform hover:scale-105 active:scale-95 duration-300"
                        >
                          Get In Touch
                        </a>
                      </div>
                    </div>
                  );
                }
                
                const name = member === 'botanist' ? 'Mandora Manmeetsinh' : 'Astha Kharadi';
                const role = member === 'botanist' ? 'Backend Devloper , Team Leader' : 'Frontend Developer , UI/UX Designer';
                const description = member === 'botanist' 
                  ? 'With a PhD in Ethnobotany, Sofia brings extensive knowledge of medicinal plants from around the world.'
                  : 'A specialist in 3D visualization and web technologies, Marcus leads our development team.';
                
                return (
                  <div 
                    key={member} 
                    className="bg-white rounded-lg overflow-hidden shadow-lg group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                    style={{
                      opacity: isVisible('team') ? 1 : 0,
                      transform: isVisible('team') ? 'translateY(0) rotate(0deg)' : 'translateY(40px) rotate(2deg)',
                      transition: 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)',
                      transitionDelay: `${idx * 200}ms`
                    }}
                  > 
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={`/team/${member}.png`} 
                        alt={name} 
                        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-herb-green-dark to-transparent opacity-70"></div>
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="text-xl font-bold">{name}</h3>
                        <p className="text-herb-cream font-medium">{role}</p>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-700">
                        {description}
                      </p>
                    </div>
                  </div>
                );
              })}
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
              <div 
                className="w-16 h-1 bg-herb-green-dark rounded-full mr-4 transition-all duration-700"
                style={{ 
                  width: isVisible('approach') ? '4rem' : '0',
                  opacity: isVisible('approach') ? 1 : 0 
                }}
              ></div>
              <h2 className="text-3xl font-bold text-herb-green-dark">Our Approach</h2>
            </div>
            
            <div 
              className="bg-gradient-to-r from-white to-herb-cream/30 p-8 rounded-lg shadow-lg"
              style={{ 
                transform: isVisible('approach') ? 'translateY(0)' : 'translateY(30px)',
                opacity: isVisible('approach') ? 1 : 0,
                transition: 'all 0.8s ease-out'
              }}
            >
              <p className="text-gray-700 mb-6">
                The Herbal Codex combines historical herbal knowledge with modern scientific research. We verify all plant information through peer-reviewed studies and traditional texts, providing a comprehensive view of each plant's properties and uses.
              </p>
              <p className="text-gray-700 mb-6">
                Our 3D models are created with detailed attention to botanical accuracy, ensuring that each virtual plant correctly represents its real-world counterpart. The interactive garden environment allows users to see how plants grow and respond to different conditions, offering insights that go beyond static text and images.
              </p>
              
              <div 
                className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
                style={{ 
                  transitionDelay: '300ms',
                  transition: 'all 0.8s ease-out'
                }}
              >
                <div 
                  className="bg-white p-6 rounded-md shadow-md hover:shadow-lg transform transition-all duration-300 hover:-translate-y-1 hover:bg-gradient-to-br hover:from-white hover:to-herb-cream/50"
                  style={{ 
                    transitionDelay: '400ms',
                    opacity: isVisible('approach') ? 1 : 0,
                    transform: isVisible('approach') ? 'translateX(0)' : 'translateX(-20px)'
                  }}
                >
                  <h3 className="text-xl font-bold text-herb-green-dark mb-3">Science-Based</h3>
                  <p className="text-gray-600">We rely on peer-reviewed studies and collaborate with academic institutions to ensure accuracy.</p>
                </div>
                <div 
                  className="bg-white p-6 rounded-md shadow-md hover:shadow-lg transform transition-all duration-300 hover:-translate-y-1 hover:bg-gradient-to-br hover:from-white hover:to-herb-cream/50"
                  style={{ 
                    transitionDelay: '600ms',
                    opacity: isVisible('approach') ? 1 : 0,
                    transform: isVisible('approach') ? 'translateX(0)' : 'translateX(20px)'
                  }}
                >
                  <h3 className="text-xl font-bold text-herb-green-dark mb-3">Traditional Wisdom</h3>
                  <p className="text-gray-600">We honor indigenous and traditional knowledge systems that have preserved herbal wisdom for centuries.</p>
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
      </div>
    </Layout>
  );
};

export default About;
