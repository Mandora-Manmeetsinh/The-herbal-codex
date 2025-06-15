
import Layout from '../components/layout/Layout';
import HeroSection from '../components/home/HeroSection';
import FeaturesSection from '../components/home/FeaturesSection';
import FeaturedPlantsSection from '../components/home/FeaturedPlantsSection';
import PlantGallery from '../components/home/PlantGallery';
import CtaSection from '../components/home/CtaSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import CinematicGardenPreview from '../components/home/CinematicGardenPreview';
import MiniGame from '../components/home/MiniGame';

const Index = () => {
  return (
    <Layout fullHeight={true}>
      <div className="animate-garden-fade">
        <HeroSection />
      </div>
      <div className="animate-garden-slide" style={{ animationDelay: '0.13s' }}>
        <FeaturesSection />
      </div>
      <div className="animate-garden-float" style={{ animationDelay: '0.25s' }}>
        <CinematicGardenPreview />
      </div>
      <div className="animate-garden-fade" style={{ animationDelay: '0.38s' }}>
        <MiniGame />
      </div>
      <div className="animate-garden-slide" style={{ animationDelay: '0.46s' }}>
        <PlantGallery />
      </div>
      <div className="animate-garden-float" style={{ animationDelay: '0.58s' }}>
        <FeaturedPlantsSection />
      </div>
      <div className="animate-garden-slide" style={{ animationDelay: '0.66s' }}>
        <TestimonialsSection />
      </div>
      <div className="animate-garden-fade" style={{ animationDelay: '0.75s' }}>
        <CtaSection />
      </div>
    </Layout>
  );
};

export default Index;
