import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InfiniteMovingCards } from './ui/infinite-moving-cards';

const techStack = [
  {
    title: "React",
    type: "Frontend",
    color: "#61DAFB",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
  },
  {
    title: "Tailwind CSS",
    type: "Frontend",
    color: "#38B2AC",
    logo: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg"
  },
  {
    title: "HTML",
    type: "Frontend",
    color: "#E34F26",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"
  },
  {
    title: "JavaScript",
    type: "Frontend",
    color: "#F7DF1E",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
  },
  {
    title: "CSS",
    type: "Frontend",
    color: "#1572B6",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"
  },
  {
    title: "Python",
    type: "Backend",
    color: "#3776AB",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
  },
  {
    title: "Django",
    type: "Backend",
    color: "#092E20",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg"
  },
  {
    title: "MySQL",
    type: "Database",
    color: "#4479A1",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg"
  },
  {
    title: "SQLite",
    type: "Database",
    color: "#003B57",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg"
  },
];

// Group technologies by type
const frontendTech = techStack.filter(tech => tech.type === "Frontend");
const backendTech = techStack.filter(tech => tech.type === "Backend");
const databaseTech = techStack.filter(tech => tech.type === "Database");

// Create card data for focus cards
const skillCards = [
  {
    title: "Frontend Development",
    src: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // Minimal code editor with purple/blue tones
    description: "Specializing in building responsive and interactive user interfaces using modern frameworks and techniques.",
    technologies: frontendTech,
    skills: [
      "Building responsive UI components with React",
      "Creating modern layouts with Tailwind CSS",
      "Writing clean, semantic HTML",
      "Implementing interactive features with JavaScript",
      "Animation and transitions for enhanced UX"
    ],
    gradientFrom: "purple-700",
    gradientTo: "blue-900"
  },
  {
    title: "Backend Development",
    src: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // Minimal server/code representation
    description: "Creating robust server-side applications and APIs to power modern web experiences.",
    technologies: backendTech,
    skills: [
      "Building web applications with Django",
      "Creating RESTful APIs for frontend integration",
      "Server-side rendering and processing",
      "Authentication and authorization systems",
      "Data processing and analysis with Python"
    ],
    gradientFrom: "indigo-700",
    gradientTo: "purple-900"
  },
  {
    title: "Database Management",
    src: "https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // Abstract data visualization
    description: "Designing and implementing efficient database solutions for data storage and retrieval.",
    technologies: databaseTech,
    skills: [
      "Database design and normalization",
      "SQL query optimization",
      "Working with relational databases (MySQL, SQLite)",
      "Database migrations and version control",
      "Data integrity and security practices"
    ],
    gradientFrom: "purple-600",
    gradientTo: "pink-700"
  }
];

// New component for detailed skill cards
const SkillDetail = ({ skill, onClose }: { skill: typeof skillCards[0], onClose: () => void }) => {
  // Function to determine the gradient class based on the skill title
  const getGradientClass = () => {
    switch(skill.title) {
      case "Frontend Development":
        return "bg-gradient-to-br from-purple-700 to-blue-900";
      case "Backend Development":
        return "bg-gradient-to-br from-indigo-700 to-purple-900";
      case "Database Management":
        return "bg-gradient-to-br from-purple-600 to-pink-700";
      default:
        return "bg-gradient-to-br from-purple-700 to-blue-900";
    }
  };
  
  // Function to determine the outer glow gradient
  const getOuterGlowGradient = () => {
    switch(skill.title) {
      case "Frontend Development":
        return "bg-gradient-to-r from-purple-600 to-blue-600";
      case "Backend Development":
        return "bg-gradient-to-r from-indigo-600 to-purple-600";
      case "Database Management":
        return "bg-gradient-to-r from-purple-500 to-pink-600";
      default:
        return "bg-gradient-to-r from-purple-600 to-blue-600";
    }
  };

  return (
    <motion.div 
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4 }}
    >
      {/* Outer glow effect */}
      <div className={`${getOuterGlowGradient()} p-px rounded-xl`}>
        <div className="relative bg-black backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
          <div className="p-6 md:p-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-white">{skill.title}</h3>
              {/* Close button inside the card */}
              <motion.button
                className="p-2 rounded-full bg-white/10 text-white backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-colors"
                onClick={onClose}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Close detail view"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </motion.button>
            </div>
            <p className="text-gray-300 mb-6">{skill.description}</p>
            
            <div className={`${getGradientClass()} rounded-lg p-6 md:p-8`}>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {skill.technologies.map((tech, index) => (
                  <div 
                    key={index} 
                    className="flex flex-col items-center bg-black/40 rounded-lg p-4 backdrop-blur-sm transition-all hover:scale-105 hover:bg-black/30 border border-white/5 hover:border-white/10"
                  >
                    <div className="w-12 h-12 mb-3 flex items-center justify-center rounded-md bg-white/10 p-2 hover:bg-white/15 transition-colors">
                      <img 
                        src={tech.logo} 
                        alt={tech.title} 
                        className={`w-full h-full ${tech.type === 'Database' ? 'drop-shadow-[0_0_3px_rgba(255,255,255,0.5)]' : ''} transition-transform hover:scale-110`}
                      />
                    </div>
                    <span className="text-white font-medium text-center text-sm">{tech.title}</span>
                  </div>
                ))}
              </div>
              
              <ul className="list-disc pl-5 space-y-3 text-white">
                {skill.skills.map((item, index) => (
                  <li key={index} className="text-gray-200">{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Modified FocusCards component that handles selection
const SkillFocusCards = ({ 
  cards, 
  onSelect 
}: { 
  cards: typeof skillCards, 
  onSelect: (index: number) => void 
}) => {
  const [hovered, setHovered] = React.useState<number | null>(null);

  // Function to get gradient overlay for each card
  const getGradientOverlay = (index: number) => {
    switch(index) {
      case 0: // Frontend
        return "bg-gradient-to-t from-purple-900/90 via-purple-800/40 to-transparent";
      case 1: // Backend
        return "bg-gradient-to-t from-indigo-900/90 via-indigo-800/40 to-transparent";
      case 2: // Database
        return "bg-gradient-to-t from-pink-800/90 via-purple-900/40 to-transparent";
      default:
        return "bg-gradient-to-t from-purple-900/90 via-purple-800/40 to-transparent";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto md:px-8 w-full">
      {cards.map((card, index) => (
        <div
          key={card.title}
          onClick={() => onSelect(index)}
          onMouseEnter={() => setHovered(index)}
          onMouseLeave={() => setHovered(null)}
          className={`rounded-lg relative bg-gray-100 dark:bg-neutral-900 overflow-hidden h-60 md:h-80 w-full transition-all duration-300 ease-out cursor-pointer border border-white/5 shadow-lg shadow-purple-500/5
            ${hovered !== null && hovered !== index ? "blur-sm scale-[0.98] opacity-70" : "hover:scale-[1.02] hover:shadow-purple-500/20"}
          `}
        >
          <img
            src={card.src}
            alt={card.title}
            className="object-cover absolute inset-0 h-full w-full filter saturate-[0.8] contrast-[1.1]"
          />
          
          {/* Base gradient overlay for each card */}
          <div className={`absolute inset-0 ${getGradientOverlay(index)}`}></div>
          
          {/* Hover overlay with additional details */}
          <div
            className={`absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col justify-end py-8 px-6 transition-all duration-300
              ${hovered === index ? "opacity-100" : "opacity-0"}
            `}
          >
            <div className="text-xl md:text-2xl font-medium text-white mb-2">
              {card.title}
            </div>
            <p className="text-sm text-gray-200 opacity-90 line-clamp-2 mb-3">
              {card.description}
            </p>
            <p className="text-sm text-purple-300 font-medium">
              Click to view details
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

const TechStackSection = () => {
  const [selectedSkill, setSelectedSkill] = React.useState<number | null>(null);

  const handleSelectSkill = (index: number) => {
    setSelectedSkill(index);
    // Improved scrolling behavior with a better offset
    setTimeout(() => {
      const detailElement = document.getElementById("skill-detail");
      if (detailElement) {
        const viewportHeight = window.innerHeight;
        const headerOffset = Math.min(viewportHeight * 0.15, 100); // Dynamic offset based on viewport height
        const elementPosition = detailElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }, 100);
  };
  
  const handleCloseDetail = () => {
    setSelectedSkill(null);
  };

  return (
    <section id="tech-stack" className="py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Tech Stack</h2>
          <div className="w-20 h-1 bg-purple-500 mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-400">
            The technologies I work with to bring ideas to life.
          </p>
        </motion.div>

        <div className="flex justify-center w-full mb-16 overflow-hidden">
          <div className="w-full max-w-7xl mx-auto">
            <InfiniteMovingCards
              items={techStack}
              direction="right"
              speed="slow"
              className="py-4"
            />
          </div>
        </div>
        
        <div className="relative py-10">
          <h3 className="text-2xl font-bold mb-12 text-center">My Skills & Expertise</h3>
          
          {/* Focus Cards for Skills */}
          <div className="mb-16">
            <SkillFocusCards 
              cards={skillCards}
              onSelect={handleSelectSkill}
            />
          </div>
          
          {/* Display selected skill detail */}
          <div id="skill-detail" className="scroll-mt-32">
            <AnimatePresence>
              {selectedSkill !== null && (
                <motion.div 
                  key="skill-detail"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4 }}
                  className="mt-24 max-w-5xl mx-auto pt-6"
                >
                  <SkillDetail 
                    skill={skillCards[selectedSkill]} 
                    onClose={handleCloseDetail}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;