
import Layout from '../components/layout/Layout';
import HeroSection from '../components/home/HeroSection';
import FeaturesSection from '../components/home/FeaturesSection';
import FeaturedPlantsSection from '../components/home/FeaturedPlantsSection';
import PlantGallery from '../components/home/PlantGallery';
import CtaSection from '../components/home/CtaSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import CinematicGardenPreview from '../components/home/CinematicGardenPreview';

const Index = () => {
  return (
    <Layout fullHeight={true}>
      <HeroSection />
      <FeaturesSection />
      <CinematicGardenPreview />
      <PlantGallery />
      <FeaturedPlantsSection />
      <TestimonialsSection />
      <CtaSection />
    </Layout>
  );
};

export default Index;
