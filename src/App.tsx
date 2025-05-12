import React, { lazy, Suspense, useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ProjectsSection from './components/ProjectsSection';
import TechStackSection from './components/TechStackSection';
import CertificationSection from './components/CertificationSection';
import Footer from './components/Footer';
// Import animation components lazily
const BackgroundBeams = lazy(() => import('./components/ui/background-beams').then(module => ({ default: module.BackgroundBeams })));
const SparklesCore = lazy(() => import('./components/ui/sparkles').then(module => ({ default: module.SparklesCore })));

function App() {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
    
    // Force re-render after a short delay to ensure everything is properly positioned
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Navbar is outside other containers to ensure it's always visible */}
      <Navbar />
      
      <div className="relative pb-20 pt-16"> {/* Added pt-16 to create space for the fixed navbar */}
        <Suspense fallback={<div className="absolute inset-0 bg-black"></div>}>
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 h-screen">
              <SparklesCore
                id="tsparticles"
                background="transparent"
                minSize={0.6}
                maxSize={1.4}
                particleDensity={20}
                className="w-full h-full"
                particleColor="#FFFFFF"
                speedFactor={0.5}
              />
            </div>
          </div>
        </Suspense>
        
        <div className="relative z-10">
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <TechStackSection />
          <CertificationSection />
          <Footer />
        </div>
      </div>
      
      <Suspense fallback={null}>
        {isMounted && (
          <BackgroundBeams 
            className="fixed top-0 left-0 w-full h-full z-0 opacity-50"
            initialCentered={true} 
          />
        )}
      </Suspense>
    </div>
  );
}

export default App;