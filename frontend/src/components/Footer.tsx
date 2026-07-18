import { Link } from '@tanstack/react-router';

export function Footer() {
	return (
		<footer>
			<div className="footer-inner">
				<div>
					<div className="footer-brand">Society of Paediatric Anaesthesiologists of Kenya</div>
					<p className="footer-desc">Dedicated to advancing safe anaesthesia care for every child in Kenya — through
						training, research, advocacy, and global partnerships.</p>
					<div className="footer-tagline">In Safe Hands</div>
				</div>
				<div>
					<h4>Navigate</h4>
					<Link className="footer-link" to="/">Home</Link>
					<Link className="footer-link" to="/about">About Us</Link>
					<Link className="footer-link" to="/gallery">Gallery</Link>
					<Link className="footer-link" to="/events">Events</Link>
					<Link className="footer-link" to="/resources">Resources</Link>
					<Link className="footer-link" to="/contact">Contact</Link>
				</div>
				<div>
					<h4>Connect</h4>
					<a className="footer-link" href="https://www.facebook.com/spak.or.ke" target="_blank">Facebook</a>
					<a className="footer-link">Twitter / X</a>
					<a className="footer-link">LinkedIn</a>
					<a className="footer-link" href={"#"}>Email Us</a>
				</div>
			</div>
			<div className="footer-bottom">
				<div className="footer-copy">© 2026 Society of Paediatric Anaesthesiologists of Kenya (SPAK). All rights
					reserved.
				</div>
				<div className="footer-copy">Built with <span className="footer-heart">♥</span> in Nairobi</div>
			</div>
		</footer>
	)
}