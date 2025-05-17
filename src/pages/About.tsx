
import Layout from '../components/layout/Layout';

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-herb-green-dark mb-6">About The Herbal Codex</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-700 mb-8">
              The Herbal Codex is a digital compendium of medicinal plants, offering an immersive and educational experience through cutting-edge 3D technology and evidence-based information.
            </p>
            
            <h2 className="text-2xl font-bold text-herb-green-dark mt-10 mb-4">Our Mission</h2>
            <p className="text-gray-700 mb-6">
              Our mission is to preserve and share traditional plant knowledge while making it accessible to everyone through modern technology. We aim to bridge the gap between ancient herbal wisdom and contemporary scientific understanding, creating a resource that is both educational and engaging.
            </p>
            
            <h2 className="text-2xl font-bold text-herb-green-dark mt-10 mb-4">Our Story</h2>
            <p className="text-gray-700 mb-6">
              The Herbal Codex began as a passion project by a team of botanists, herbalists, and technology enthusiasts who wanted to create a new way to learn about medicinal plants. Inspired by both ancient herbals and modern interactive technology, we set out to build a digital platform that would make plant knowledge come alive.
            </p>
            <p className="text-gray-700 mb-6">
              What started as a simple database has grown into an immersive 3D experience that allows users to explore plants in a virtual garden, learn about their properties through interactive information panels, and understand how they respond to different environmental conditions.
            </p>
            
            <h2 className="text-2xl font-bold text-herb-green-dark mt-10 mb-4">Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                  <img src="/team/botanist.jpg" alt="Dr. Sofia Chen" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-bold text-herb-green-dark">Dr. Sofia Chen</h3>
                <p className="text-herb-green">Lead Botanist</p>
                <p className="text-gray-700 mt-2">
                  With a PhD in Ethnobotany, Sofia brings extensive knowledge of medicinal plants from around the world.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                  <img src="/team/developer.jpg" alt="Marcus Johnson" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-bold text-herb-green-dark">Marcus Johnson</h3>
                <p className="text-herb-green">Tech Lead</p>
                <p className="text-gray-700 mt-2">
                  A specialist in 3D visualization and web technologies, Marcus leads our development team.
                </p>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-herb-green-dark mt-12 mb-4">Our Approach</h2>
            <p className="text-gray-700 mb-6">
              The Herbal Codex combines historical herbal knowledge with modern scientific research. We verify all plant information through peer-reviewed studies and traditional texts, providing a comprehensive view of each plant's properties and uses.
            </p>
            <p className="text-gray-700 mb-6">
              Our 3D models are created with detailed attention to botanical accuracy, ensuring that each virtual plant correctly represents its real-world counterpart. The interactive garden environment allows users to see how plants grow and respond to different conditions, offering insights that go beyond static text and images.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
