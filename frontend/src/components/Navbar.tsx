import { useEffect, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { ListIcon, MoonIcon, SunIcon, XIcon } from '@phosphor-icons/react';

export const Navbar = () => {
	const [isMobileOpen, setIsMobileOpen] = useState(false);
	const [isDarkMode, setIsDarkMode] = useState(() => {
		return localStorage.getItem('theme') === 'dark';
	});

	useEffect(() => {
		document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
		localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
	}, [isDarkMode]);

	function toggleDark() {
		setIsDarkMode(!isDarkMode);
	}

	return (
		<nav id="main-nav">
			<div className="nav-inner">
				{/* LOGO */}
				<div className="nav-logo">
					<img src={"/logo.svg"} alt="logo"/>
				</div>

				{/* DESKTOP LINKS */}
				<div className="nav-links">
					<Link to="/" className="nav-link" activeProps={{ className: 'active' }}>Home</Link>
					<Link to="/about" className="nav-link" activeProps={{ className: 'active' }}>About Us</Link>
					<Link to="/gallery" className="nav-link" activeProps={{ className: 'active' }}>Gallery</Link>
					<Link to="/contact" className="nav-link" activeProps={{ className: 'active' }}>Contact Us</Link>
				</div>

				{/* ACTIONS */}
				<div className="nav-actions">
					<button className="dark-btn" onClick={toggleDark} aria-label="Toggle dark mode">
						{isDarkMode ? <SunIcon size={20}/> : <MoonIcon size={20}/>}
					</button>

					<Link to="/contact" className="btn-primary">Join Us</Link>

					<button
						className="hamburger"
						onClick={() => setIsMobileOpen(!isMobileOpen)}
						aria-label="Menu"
					>
						{isMobileOpen ? <XIcon size={24}/> : <ListIcon size={24}/>}
					</button>
				</div>
			</div>

			{/* MOBILE MENU */}
			<div className={`mobile-menu ${isMobileOpen ? 'open' : ''}`}>
				<Link
					to="/" className="mobile-link"
					onClick={() => setIsMobileOpen(false)}
					activeProps={{ className: 'active' }}
				>
					Home
				</Link>
				<Link
					to="/about" className="mobile-link"
					onClick={() => setIsMobileOpen(false)}
					activeProps={{ className: 'active' }}
				>
					About Us
				</Link>
				<Link
					to="/gallery"
					className="mobile-link"
					onClick={() => setIsMobileOpen(false)}
					activeProps={{ className: 'active' }}
				>
					Gallery
				</Link>
				<Link
					to="/contact"
					className="mobile-link"
					onClick={() => setIsMobileOpen(false)}
					activeProps={{ className: 'active' }}
				>
					Contact Us
				</Link>
			</div>
		</nav>
	);
};