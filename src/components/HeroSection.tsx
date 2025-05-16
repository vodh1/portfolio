import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { TypewriterEffect } from './ui/typewriter-effect';
import { Button } from './ui/moving-border';
import { Github, Linkedin } from 'lucide-react';

const HeroSection = () => {
	const sectionRef = useRef<HTMLElement>(null);
	const [isMobile, setIsMobile] = useState(false);
	const prefersReducedMotion = useReducedMotion();

	// Ensure the section is properly centered after mount
	useEffect(() => {
		if (sectionRef.current) {
			// Small delay to ensure DOM is fully rendered
			setTimeout(() => {
				window.scrollTo(0, 0); // Scroll to top to ensure proper initial view
			}, 100);
		}

		// Check if viewport is mobile size
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

	const words = [
		{
			text: 'Andre'
		},
		{
			text: 'Lee'
		},
		{
			text: 'R.'
		},
		{
			text: 'Cuyugan',
			className: 'text-purple-500 dark:text-purple-500'
		}
	];

	// Simplified animations for mobile
	const getAnimationProps = (delay = 0) => {
		if (isMobile || prefersReducedMotion) {
			return {
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				transition: { delay, duration: 0.3 }
			};
		}
		
		return {
			initial: { opacity: 0, y: 20 },
			animate: { opacity: 1, y: 0 },
			transition: { delay, duration: 0.5 }
		};
	};

	return (
		<section
			id='home'
			ref={sectionRef}
			className='relative min-h-screen w-full flex items-center justify-center py-10 md:py-0'
		>
			<div className='absolute inset-0 flex items-center justify-center'>
				<div className='w-full max-w-7xl mx-auto px-4'>
					<div className='flex flex-col items-center justify-center text-center w-full'>
						<motion.div
							{...getAnimationProps()}
							className='mb-8 w-full'
						>
							<div className='text-sm uppercase tracking-widest bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent font-semibold mb-4'>
								BACHELOR'S IN SCIENCE IN COMPUTING STUDIES
							</div>
							<div className='flex flex-col items-center justify-center mt-3'>
								<TypewriterEffect 
									words={words} 
									className={isMobile ? "scale-125 mb-3" : ""} 
								/>
							</div>
							<h2 className='text-xl md:text-3xl mt-6 bg-clip-text text-transparent bg-gradient-to-r from-neutral-200 to-neutral-500'>
								Aspiring Developer & Tech Enthusiast
							</h2>
						</motion.div>

						<motion.p
							{...getAnimationProps(0.2)}
							className='max-w-2xl text-base md:text-lg text-gray-400 mb-10 px-3'
						>
							I'm a passionate 2nd year computing student focused on building
							creative and functional web applications. Currently exploring the
							intersection of web development and data science.
						</motion.p>

						<motion.div
							{...getAnimationProps(0.3)}
							className='flex flex-wrap gap-4 justify-center'
						>
							<a href='https://www.linkedin.com/in/andre-lee-cuyugan-125068365/'>
								<Button
									borderRadius='1.75rem'
									className='bg-white text-black border-neutral-200 dark:border-slate-800 px-6 py-3'
								>
									Contact Me
								</Button>
							</a>
							<div className='flex gap-4'>
								<a
									href='https://github.com/vodh1'
									target='_blank'
									rel='noopener noreferrer'
									className='flex items-center justify-center w-12 h-12 rounded-full bg-gray-900 border border-gray-800 transition-all hover:bg-gray-800'
								>
									<Github className='w-5 h-5' />
								</a>
								<a
									href='https://www.linkedin.com/in/andre-lee-cuyugan-125068365/'
									target='_blank'
									rel='noopener noreferrer'
									className='flex items-center justify-center w-12 h-12 rounded-full bg-gray-900 border border-gray-800 transition-all hover:bg-gray-800'
								>
									<Linkedin className='w-5 h-5' />
								</a>
							</div>
						</motion.div>

						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.5, duration: 0.5 }}
							className='mt-16 mb-8 hidden lg:block'
						>
							<div className='flex flex-col items-center'>
								<span className='text-gray-500 text-sm mb-2'>Scroll Down</span>
								<div className='w-6 h-10 border-2 border-gray-500 rounded-full flex justify-center p-1'>
									<motion.div
										animate={{
											y: [0, 8, 0]
										}}
										transition={{
											duration: 1.5,
											repeat: Infinity,
											repeatType: 'loop'
										}}
										className='w-1 h-1 bg-white rounded-full'
									></motion.div>
								</div>
							</div>
						</motion.div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
