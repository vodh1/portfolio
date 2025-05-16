import React, { useState, useEffect } from 'react';
import {
	motion,
	useScroll,
	useMotionValueEvent
} from 'framer-motion';
import { Code2, User, Briefcase, Layout, Award } from 'lucide-react';

const navItems = [
	{ name: 'Home', href: '#home', icon: <Layout className='w-4 h-4' /> },
	{ name: 'About', href: '#about', icon: <User className='w-4 h-4' /> },
	{
		name: 'Projects',
		href: '#projects',
		icon: <Briefcase className='w-4 h-4' />
	},
	{
		name: 'Tech Stack',
		href: '#tech-stack',
		icon: <Code2 className='w-4 h-4' />
	},
	{
		name: 'Certificates',
		href: '#certificates',
		icon: <Award className='w-4 h-4' />
	}
];

const Navbar = () => {
	const [activeSection, setActiveSection] = useState('home');
	const [scrollVisible, setScrollVisible] = useState(false);
	const { scrollY } = useScroll();

	// Listen to scroll position for navbar transformation
	useMotionValueEvent(scrollY, 'change', (latest) => {
		if (latest > 100) {
			setScrollVisible(true);
		} else {
			setScrollVisible(false);
		}
	});

	// Function to check which section is currently in view
	const checkActiveSection = () => {
		const sections = navItems.map((item) => item.href.substring(1));
		const scrollPosition = window.scrollY + 100; // Add offset for navbar height

		for (let i = sections.length - 1; i >= 0; i--) {
			const section = document.getElementById(sections[i]);
			if (section && section.offsetTop <= scrollPosition) {
				setActiveSection(sections[i]);
				break;
			}
		}
	};

	useEffect(() => {
		window.addEventListener('scroll', checkActiveSection);
		checkActiveSection(); // Check on initial render

		return () => {
			window.removeEventListener('scroll', checkActiveSection);
		};
	}, []);

	const scrollToSection = (sectionId: string) => {
		const targetElement = document.getElementById(sectionId);

		if (targetElement) {
			setActiveSection(sectionId);
			window.scrollTo({
				top: targetElement.offsetTop - 70, // Offset for navbar height
				behavior: 'smooth'
			});
		}
	};

	return (
		<>
			<motion.header
				initial={{ y: -100 }}
				animate={{ y: 0 }}
				transition={{ type: 'spring', stiffness: 200, damping: 30 }}
				className='fixed inset-x-0 top-0 z-50 w-full hidden lg:flex items-center justify-center'
			>
				{/* Desktop Navigation */}
				<motion.nav
					animate={{
						backdropFilter: scrollVisible ? 'blur(10px)' : 'none',
						boxShadow: scrollVisible
							? '0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset'
							: 'none',
						width: scrollVisible ? '70%' : '90%',
						y: scrollVisible ? 20 : 10,
						background: scrollVisible
							? 'rgba(10, 10, 10, 0.8)'
							: 'rgba(10, 10, 10, 0.6)',
						borderRadius: 'xl'
					}}
					transition={{
						type: 'spring',
						stiffness: 200,
						damping: 30
					}}
					className='mx-auto max-w-7xl justify-between px-6 py-3 flex border border-purple-500/20 overflow-hidden rounded-xl'
				>
					{/* Logo */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.2 }}
						className='relative z-20 flex items-center'
					>
						<button
							onClick={() => scrollToSection('home')}
							className='cursor-pointer bg-transparent border-0 font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 outline-none focus:outline-none'
						>
							Andre C.
						</button>
					</motion.div>

					{/* Nav Items */}
					<div
						className='flex items-center justify-center'
						onMouseLeave={() => {}}
					>
						{navItems.map((item, idx) => {
							const isActive = activeSection === item.href.substring(1);
							return (
								<button
									key={idx}
									onClick={() => scrollToSection(item.href.substring(1))}
									className='relative px-4 py-2 text-neutral-300 hover:text-white transition-colors'
								>
									{isActive && (
										<motion.div
											layoutId='navActiveIndicator'
											className='absolute inset-0 h-full w-full rounded-lg bg-purple-900/40 border border-purple-500/30 shadow-[0_0_10px_rgba(168,85,247,0.4)]'
										/>
									)}
									<span className='relative z-20 flex items-center space-x-1'>
										<span>{item.icon}</span>
										<span>{item.name}</span>
									</span>
								</button>
							);
						})}
					</div>

					{/* Contact button */}
					<div className='relative z-20 flex items-center'>
						<a
							href='https://www.linkedin.com/in/andre-lee-cuyugan-125068365/'
							className='px-4 py-2 rounded-md text-sm font-bold bg-gradient-to-r from-purple-500 to-purple-700 text-white shadow-lg hover:-translate-y-0.5 transition duration-200'
						>
							Contact Me
						</a>
					</div>
				</motion.nav>
			</motion.header>
		</>
	);
};

export default Navbar;
