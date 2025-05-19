
import Layout from '../components/layout/Layout';
import HeroSection from '../components/home/HeroSection';
import FeaturesSection from '../components/home/FeaturesSection';
import FeaturedPlantsSection from '../components/home/FeaturedPlantsSection';
import CtaSection from '../components/home/CtaSection';
import TestimonialsSection from '../components/home/TestimonialsSection';

const Index = () => {
  return (
    <Layout fullHeight={true}>
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <FeaturedPlantsSection />
      <CtaSection />
    </Layout>
  );
};

export default Index;
