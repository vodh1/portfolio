import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Database, Server, Clipboard } from 'lucide-react';
import { BentoGrid, BentoGridItem } from './ui/bento-grid';
import { GlowingEffect } from './ui/glowing-effect';

const projects = [
  {
    title: "Loan Default Prediction",
    description: "Web application that predicts loan defaults using machine learning algorithms.",
    link: "https://github.com/vodh1/loan_default",
    icon: <PieChart className="h-10 w-10 text-purple-500" />,
    className: "md:col-span-2"
  },
  {
    title: "Pokemon Prediction",
    description: "Web app that predicts Pokemon attributes and characteristics using data analysis.",
    link: "https://github.com/vodh1/pokemon_prediction",
    icon: <Database className="h-10 w-10 text-blue-500" />,
  },
  {
    title: "CCS Inventory System",
    description: "A comprehensive inventory management system for tracking computer and IT equipment.",
    link: "https://github.com/vodh1/inventory_system",
    icon: <Server className="h-10 w-10 text-green-500" />,
  },
  {
    title: "To-Do Web App",
    description: "A minimalist to-do application with task management and organization features.",
    link: "https://github.com/vodh1/todo-fe",
    icon: <Clipboard className="h-10 w-10 text-yellow-500" />,
    className: "md:col-span-2"
  },
];

// Render a card with glowing effect as shown in the Aceternity UI example
const ProjectCard = ({ project }: { project: typeof projects[0] }) => {
  return (
    <div className={`relative ${project.className || ""}`}>
      <div className="group relative rounded-xl overflow-hidden">
        {/* This is exactly how Aceternity UI implements it */}
        <GlowingEffect 
          disabled={false} 
          spread={20} 
          borderWidth={1} 
          movementDuration={1.2}
          inactiveZone={0.5}
          proximity={10}
        />
        
        <BentoGridItem
          title={project.title}
          description={project.description}
          icon={project.icon}
          link={project.link}
          header={
            <div className="flex items-center justify-between">
              <span className="text-xs text-purple-400 flex items-center group-hover:text-purple-300 transition-colors">
                View Project
                <svg
                  className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </span>
            </div>
          }
        />
      </div>
    </div>
  );
};

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
          <div className="w-20 h-1 bg-purple-500 mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-400">
            Here are some of my recent projects, demonstrating my skills in web development, 
            data science, and system design.
          </p>
        </motion.div>

        <div className="relative mx-auto max-w-6xl">
          <BentoGrid className="grid-cols-1 md:grid-cols-3 gap-3">
            {projects.map((project, i) => (
              <ProjectCard key={i} project={project} />
            ))}
          </BentoGrid>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <a
            href="https://github.com/vodh1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors"
          >
            <span className="mr-2">View more on GitHub</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;