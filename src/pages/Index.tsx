
import React from 'react';
import { CityHero } from '@/components/CityHero';
import { ServicesSection } from '@/components/ServicesSection';
import { BlogSection } from '@/components/BlogSection';

const Index = () => {
  return (
    <div className="min-h-screen pt-16">
      <CityHero />
      <ServicesSection />
      <BlogSection />
    </div>
  );
};

export default Index;
