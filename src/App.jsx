import { useState, useEffect } from 'react';
import './App.css';

import avatarImg from './assets/avatar.jpg';

const NAV_LINKS = ['About', 'Projects', 'Connect'];

const PROJECTS = [
	{
		name: 'HypnoBot',
		description: 'A feature-rich Discord bot built for communities — bringing moderation, logging, and ease of use under one roof.',
		tags: ['Discord.js', 'Node.js', 'TypeScript'],
		link: 'https://github.com/AdriTheDev/hypno-bot',
		icon: '⚡',
		type: 'github',
	},
	{
		name: 'VATSIM UK',
		description:
			'I am an active staff member of VATSIM UK, creating media content, managing social media, as well as contributing to the UK Controller Pack and UK Sector File each AIRAC cycle.',
		tags: ['Media Creation', 'ATC', 'Aviation'],
		link: 'https://vatsim.uk',
		icon: '✈',
		type: 'volunteer',
	},
	{
		name: 'CTP Controller',
		description:
			'Recently created for VATSIM CTP 2026 Eastbound, this was used to control the multiple streams, sources, overlays, music, etc for the VATSIM UK Livestreams.',
		tags: ['Node.js', 'React', 'Web Based'],
		link: 'https://github.com/AdriTheDev/CtpController',
		icon: '📺',
		type: 'github',
	},
];

const SOCIALS = [
	{
		name: 'Discord',
		handle: "I am most active on Discord! Send me a friend request and I'll get to you as soon as I can.",
		copyValue: 'spoopy.adri',
		icon: (
			<svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.032.055a19.898 19.898 0 0 0 5.993 3.03.077.077 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"
				/>
			</svg>
		),
		color: '#5865F2',
	},
	{
		name: 'Email',
		handle: 'I check my email regularly, so feel free to reach out for anything work-related or just to say hi!',
		copyValue: 'adri@spoopyadri.xyz',
		icon: (
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
				<rect x="2" y="4" width="20" height="16" rx="2" />
				<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
			</svg>
		),
		color: '#a78bfa',
	},
	{
		name: 'X / Twitter',
		handle: '@SpoopyAdri',
		link: 'https://x.com/SpoopyAdri',
		icon: (
			<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
				<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.258 5.63 5.906-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
			</svg>
		),
		color: '#e2e8f0',
	},
	{
		name: 'Bluesky',
		handle: '@spoopyadri.xyz',
		link: 'https://bsky.app/profile/spoopyadri.xyz',
		icon: (
			<svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
				<path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.267-4.308 1.172-6.498-2.74-7.078a8.741 8.741 0 0 1-.415-.056c.14.017.279.036.415.056 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.478 0-.69-.139-1.861-.902-2.204-.659-.298-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8z" />
			</svg>
		),
		color: '#0085ff',
	},
];

const PRIDE_FLAGS = [
	{
		label: 'Pansexual Pride',
		stripes: ['#FF218C', '#FF218C', '#FFD800', '#FFD800', '#21B1FF', '#21B1FF'],
	},
	{
		label: 'LGBTQIA+ Pride',
		stripes: ['#FF0018', '#FFA52C', '#FFFF41', '#008018', '#0000F9', '#86007D'],
	},
];

function useScrollProgress() {
	const [progress, setProgress] = useState(0);
	useEffect(() => {
		const onScroll = () => {
			const doc = document.documentElement;
			const scrollTop = window.scrollY;
			const scrollHeight = doc.scrollHeight - doc.clientHeight;
			setProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);
		};
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);
	return progress;
}

function useActiveSection() {
	const [active, setActive] = useState('About');
	useEffect(() => {
		const sections = NAV_LINKS.map((id) => document.getElementById(id));
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) setActive(entry.target.id);
				});
			},
			{ rootMargin: '-40% 0px -55% 0px' },
		);
		sections.forEach((s) => s && observer.observe(s));
		return () => observer.disconnect();
	}, []);
	return active;
}

function Orb({ style }) {
	return <div className="orb" style={style} />;
}

function Nav({ active }) {
	const progress = useScrollProgress();
	const scrollTo = (id) => {
		document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
	};
	return (
		<nav className="nav">
			<div className="nav-progress" style={{ width: `${progress}%` }} />
			<div className="nav-inner">
				<span className="nav-brand">
					<span className="brand-dot" />
					Adri
				</span>
				<ul className="nav-links">
					{NAV_LINKS.map((link) => (
						<li key={link}>
							<button className={`nav-link ${active === link ? 'active' : ''}`} onClick={() => scrollTo(link)}>
								{link}
							</button>
						</li>
					))}
				</ul>
			</div>
		</nav>
	);
}

function Hero() {
	return (
		<section className="hero" id="About">
			<div className="hero-content">
				<div className="hero-badge">Available for opportunities</div>
				<h1 className="hero-title">
					<span className="title-line">Callum Hicks</span>
					<span className="title-line accent">(Adri)</span>
				</h1>
				<p className="hero-sub">Developer · Volunteer · Creator</p>
				<p className="hero-desc">
					I like to tinker, build stuff, and make content. Whether it be an entire livestream setup with a web app to control it via,
					or a simple Discord bot, I love creating things that are useful and fun!
				</p>
				<div className="hero-cta">
					<button
						className="btn-primary"
						onClick={() => document.getElementById('Projects')?.scrollIntoView({ behavior: 'smooth' })}
					>
						View my work
					</button>
					<button
						className="btn-ghost"
						onClick={() => document.getElementById('Connect')?.scrollIntoView({ behavior: 'smooth' })}
					>
						Get in touch
					</button>
				</div>
			</div>
			<div className="hero-visual">
				<div className="avatar-ring">
					<div className="avatar-inner">
						{avatarImg ? (
							<img src={avatarImg} alt="Adri" className="avatar-photo" />
						) : (
							<span className="avatar-initials">Adri</span>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}

function Projects() {
	return (
		<section className="section" id="Projects">
			<div className="section-header">
				<span className="section-label">Work</span>
				<h2 className="section-title">Projects & Contributions</h2>
				<p className="section-desc">A selection of things I've built and communities I'm proud to be part of.</p>
			</div>
			<div className="projects-grid">
				{PROJECTS.map((project) => (
					<a key={project.name} href={project.link} target="_blank" rel="noopener noreferrer" className="project-card">
						<div className="project-card-top">
							<div className="project-icon">{project.icon}</div>
							<span className="project-type">{project.type === 'github' ? 'GitHub' : 'Volunteer'}</span>
						</div>
						<h3 className="project-name">{project.name}</h3>
						<p className="project-desc">{project.description}</p>
						<div className="project-tags">
							{project.tags.map((tag) => (
								<span key={tag} className="tag">
									{tag}
								</span>
							))}
						</div>
						<div className="project-arrow">↗</div>
					</a>
				))}
			</div>
		</section>
	);
}

function Connect() {
	const [copied, setCopied] = useState(null);

	const handleSocialClick = (e, social) => {
		if (social.copyValue) {
			e.preventDefault();
			navigator.clipboard?.writeText(social.copyValue);
			setCopied(social.name);
			setTimeout(() => setCopied(null), 2000);
		}
	};

	return (
		<section className="section" id="Connect">
			<div className="section-header">
				<span className="section-label">Social</span>
				<h2 className="section-title">Let's Connect</h2>
				<p className="section-desc">
					Whether you want to collaborate, chat, or just say hello — I'm always happy to hear from people.
				</p>
			</div>
			<div className="socials-grid">
				{SOCIALS.map((social) => (
					<a
						key={social.name}
						href={social.link || '#'}
						target={social.link ? '_blank' : undefined}
						rel="noopener noreferrer"
						className={`social-card ${social.copyValue ? 'is-copyable' : ''}`}
						style={{ '--accent': social.color }}
						onClick={social.copyValue ? (e) => handleSocialClick(e, social) : undefined}
					>
						<div className="social-icon">{social.icon}</div>
						<div className="social-info">
							<span className="social-name">{social.name}</span>
							<span className="social-handle">{copied === social.name ? 'Copied!' : social.handle}</span>
						</div>
						<span className="social-arrow">
							{social.copyValue ? (
								copied === social.name ? (
									'✓'
								) : (
									<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
										<rect x="9" y="9" width="13" height="13" rx="2" />
										<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
									</svg>
								)
							) : (
								'↗'
							)}
						</span>
					</a>
				))}
			</div>
		</section>
	);
}

function PrideFlags() {
	return (
		<div className="pride-section">
			<div className="pride-flags">
				{PRIDE_FLAGS.map((flag) => (
					<div key={flag.label} className="pride-flag">
						<div className="flag-stripes">
							{flag.stripes.map((color, i) => (
								<div key={i} className="flag-stripe" style={{ background: color }} />
							))}
						</div>
						<span className="flag-label">{flag.label}</span>
					</div>
				))}
			</div>
			<p className="pride-text">Proud supporter of the LGBTQIA+ community 🏳️‍🌈</p>
		</div>
	);
}

function Footer() {
	return (
		<footer className="footer">
			<PrideFlags />
			<p className="footer-copy">
				Built with React · Hosted on GitHub Pages · <span className="footer-heart">♥</span> {new Date().getFullYear()}
			</p>
		</footer>
	);
}

export default function App() {
	const active = useActiveSection();
	return (
		<div className="app">
			<div className="bg-orbs">
				<Orb
					style={{
						top: '5%',
						left: '15%',
						width: 520,
						height: 520,
						background: 'radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 70%)',
					}}
				/>
				<Orb
					style={{
						top: '40%',
						right: '5%',
						width: 380,
						height: 380,
						background: 'radial-gradient(circle, rgba(168,85,247,0.13) 0%, transparent 70%)',
					}}
				/>
				<Orb
					style={{
						bottom: '10%',
						left: '30%',
						width: 440,
						height: 440,
						background: 'radial-gradient(circle, rgba(109,40,217,0.12) 0%, transparent 70%)',
					}}
				/>
			</div>
			<Nav active={active} />
			<main>
				<Hero />
				<Projects />
				<Connect />
			</main>
			<Footer />
		</div>
	);
}
