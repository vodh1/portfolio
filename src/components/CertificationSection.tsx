import React from 'react';
import { motion } from 'framer-motion';
import { CardBody, CardContainer, CardItem } from './ui/3d-card';
import { Award, FileText } from 'lucide-react';

// Import PDF for certificate
import certificatePdf from '../assets/pdf/certification_react.pdf';

const CertificationSection = () => {
  const handleViewCertificate = () => {
    window.open(certificatePdf, '_blank');
  };

  return (
    <section id="certificates" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Certifications</h2>
          <div className="w-20 h-1 bg-purple-500 mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-400">
            Professional certifications that demonstrate my commitment to continuous learning.
          </p>
        </motion.div>

        <div className="flex justify-center">
          <div onClick={handleViewCertificate} className="cursor-pointer w-full max-w-md relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl opacity-0 group-hover:opacity-100 blur transition duration-300"></div>
            <CardContainer className="w-full">
              <CardBody className="bg-gray-900 relative group/card dark:hover:shadow-2xl dark:hover:shadow-purple-500/[0.1] dark:border-white/[0.1] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6">
                <CardItem
                  translateZ="50"
                  className="text-xl font-bold text-neutral-200 mb-4 flex items-center gap-2"
                >
                  <Award className="w-6 h-6 text-purple-500" />
                  The Joy of React
                </CardItem>
                <CardItem
                  as="p"
                  translateZ="60"
                  className="text-neutral-300 text-sm max-w-sm mt-2 mb-4"
                >
                  A comprehensive course covering React fundamentals, advanced patterns, and modern best practices for building interactive web applications.
                </CardItem>
                <CardItem translateZ="100" className="w-full mt-4">
                  <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-px rounded-lg">
                    <div className="bg-black rounded-lg p-6 text-center">
                      <p className="font-medium text-neutral-200 flex items-center justify-center gap-2">
                        <FileText className="w-4 h-4" />
                        Certificate of Completion
                      </p>
                      <p className="text-neutral-400 text-sm mt-1">Click to view certificate</p>
                    </div>
                  </div>
                </CardItem>
                <CardItem
                  translateZ="50"
                  className="text-xs font-normal text-neutral-500 mt-4"
                >
                  Issued 2023
                </CardItem>
                
                <div className="absolute -bottom-5 -right-5">
                  <CardItem
                    translateZ={20}
                    translateX={-40}
                    translateY={-40}
                    className="opacity-50"
                  >
                    <div className="w-24 h-24 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </CardItem>
                </div>
              </CardBody>
            </CardContainer>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h3 className="text-xl font-semibold text-white mb-4">
            Continuing Education
          </h3>
          <p className="max-w-2xl mx-auto text-gray-400">
            I'm constantly expanding my knowledge through online courses, workshops, and self-directed learning.
            Currently exploring advanced React patterns, machine learning basics, and cloud computing.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CertificationSection;