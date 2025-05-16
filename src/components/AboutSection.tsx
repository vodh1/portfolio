import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { TextRevealCard } from './ui/text-reveal-card';

const AboutSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Check if viewport is mobile size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Check on initial render
    checkMobile();
    
    // Listen for resize events
    window.addEventListener('resize', checkMobile);
    
    // Clean up
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Simplified animations for mobile
  const getAnimationProps = () => {
    if (isMobile || prefersReducedMotion) {
      return {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        transition: { duration: 0.3 },
        viewport: { once: true, margin: "-50px" }
      };
    }
    
    return {
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      transition: { duration: 0.5 },
      viewport: { once: true }
    };
  };
  
  return (
    <section id="about" className="py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          {...getAnimationProps()}
          className="mb-10 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <div className="w-20 h-1 bg-purple-500 mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <TextRevealCard
              text="Andre Lee R. Cuyugan"
              revealText="Computing Student"
              className="w-full h-60 md:h-80"
              isMobile={isMobile}
            >
              <div className="absolute inset-0 h-full w-full bg-gradient-to-br from-purple-700 to-violet-900 opacity-90" />
            </TextRevealCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-gray-300"
          >
            <h3 className="text-2xl font-bold mb-4 text-white">Who I Am</h3>
            <p className="mb-4">
              I'm currently a 2nd year student pursuing a Bachelor's in Science in Computing Studies, 
              with a passion for creating innovative digital solutions.
            </p>
            <p className="mb-4">
              My journey in tech began with curiosity about how things work in the digital world. 
              Now, I'm focused on expanding my skills in web development and data science to build 
              applications that solve real-world problems.
            </p>
            <p className="mb-6">
              When I'm not coding, I enjoy exploring new technologies, collaborating on interesting 
              projects, and continuously learning to improve my craft.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-900/50 p-4 rounded-lg backdrop-blur-sm">
                <h4 className="text-purple-400 font-semibold mb-2">Education</h4>
                <p>Bachelor's in Science in Computing Studies</p>
                <p className="text-gray-400">2nd Year</p>
              </div>
              <div className="bg-gray-900/50 p-4 rounded-lg backdrop-blur-sm">
                <h4 className="text-purple-400 font-semibold mb-2">Interests</h4>
                <p>Web Development</p>
                <p>Data Science</p>
                <p className="text-gray-400">Machine Learning</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;