import '@/pages/Contact/index.css';
import { type SyntheticEvent, useState } from 'react';
import {
	CaretDownIcon,
	CheckCircleIcon,
	EnvelopeSimpleIcon,
	FacebookLogoIcon,
	GlobeIcon,
	LinkedinLogoIcon,
	MapPinIcon,
	XLogoIcon
} from '@phosphor-icons/react';

export function Contact() {
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [openFaq, setOpenFaq] = useState<number | null>(null);

	function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
		e.preventDefault(); // Prevents the page from refreshing
		setIsSubmitted(true);
	}

	function toggleFaq(index: number) {
		setOpenFaq(openFaq === index ? null : index);
	}

	return (
		<div id="page-contact" className="page active">

			{/* --- HERO SECTION --- */}
			<div className="contact-hero">
				<div className="contact-hero-inner">
					<div className="contact-eyebrow">
						Get in Touch
					</div>
					<h1 className="contact-title">Contact Us</h1>
					<p className="contact-desc">
						Whether you want to join SPAK, partner with us, or just learn more about our work — we'd love to hear from
						you.
					</p>
				</div>
			</div>

			{/* --- CONTACT INFO & FORM SECTION --- */}
			<section className="section" style={{ background: 'var(--bg)' }}>
				<div className="section-inner">
					<div className="contact-wrap">

						{/* Left Side: Info */}
						<div className="contact-info">
							<h3>We'd Love to Hear From You</h3>
							<p>SPAK welcomes paediatric anaesthesiologists, hospitals, researchers, government partners, and
								international organisations to reach out. Together, we can keep more children safe.</p>

							<div className="contact-detail">
								<div className="contact-icon"><MapPinIcon size={22} weight="fill"/></div>
								<div className="contact-detail-text">
									<div className="label">Address</div>
									<div className="value">The Nairobi Hospital, Argwings Kodhek Road, Nairobi, Kenya</div>
								</div>
							</div>
							<div className="contact-detail">
								<div className="contact-icon"><GlobeIcon size={22}/></div>
								<div className="contact-detail-text">
									<div className="label">Facebook</div>
									<div className="value">
										<a href="https://www.facebook.com/spak.or.ke" style={{ color: 'var(--navy)', fontWeight: 700 }}
										   target="_blank" rel="noreferrer">
											facebook.com/spak.or.ke
										</a>
									</div>
								</div>
							</div>
							<div className="contact-detail">
								<div className="contact-icon"><EnvelopeSimpleIcon size={22}/></div>
								<div className="contact-detail-text">
									<div className="label">Email</div>
									<div className="value">info@spak.or.ke</div>
								</div>
							</div>

							<div className="map-placeholder">
								<div className="map-pin"><MapPinIcon size={32} weight="fill" color="var(--text3)"/></div>
								<div>The Nairobi Hospital · Nairobi, Kenya</div>
								<div style={{ fontSize: '11px', color: 'var(--text3)' }}>Map integration available via Google Maps API
								</div>
							</div>

							<div className="contact-socials">
								<a href="https://www.facebook.com/spak.or.ke" target="_blank" rel="noreferrer" className="social-btn"
								   title="Facebook">
									<FacebookLogoIcon size={20} weight="fill"/>
								</a>
								<a href="#" className="social-btn" title="Twitter/X">
									<XLogoIcon size={20}/>
								</a>
								<a href="#" className="social-btn" title="LinkedIn">
									<LinkedinLogoIcon size={20} weight="fill"/>
								</a>
							</div>
						</div>

						{/* Right Side: Form */}
						<div>
							<div className="contact-form-card">
								{!isSubmitted ? (
									<>
										<h3>Send Us a Message</h3>
										<form id="contact-form" onSubmit={handleSubmit}>
											<div className="form-row">
												<div className="form-group">
													<label className="form-label" htmlFor="f-fname">First Name</label>
													<input type="text" className="form-input" placeholder="Jane" id="f-fname" required/>
												</div>
												<div className="form-group">
													<label className="form-label" htmlFor="f-lname">Last Name</label>
													<input type="text" className="form-input" placeholder="Doe" id="f-lname" required/>
												</div>
											</div>
											<div className="form-group">
												<label className="form-label" htmlFor="f-email">Email Address</label>
												<input type="email" className="form-input" placeholder="jane@hospital.co.ke" id="f-email"
												       required/>
											</div>
											<div className="form-group">
												<label className="form-label" htmlFor="f-org">Organisation / Hospital</label>
												<input type="text" className="form-input" placeholder="e.g. Kenyatta National Hospital"
												       id="f-org"/>
											</div>
											<div className="form-group">
												<label className="form-label" htmlFor="f-subject">Subject</label>
												<select className="form-input" id="f-subject" required>
													<option value="">Select a topic</option>
													<option>Membership Enquiry</option>
													<option>Training & Short Courses</option>
													<option>Partnership Opportunity</option>
													<option>Research Collaboration</option>
													<option>Media & Press</option>
													<option>General Enquiry</option>
												</select>
											</div>
											<div className="form-group">
												<label className="form-label" htmlFor="f-msg">Message</label>
												<textarea className="form-input" placeholder="Tell us about your interest in SPAK..." id="f-msg"
												          required></textarea>
											</div>
											<button type="submit" className="submit-btn">Send Message →</button>
										</form>
									</>
								) : (
									<div className="form-success show" id="form-success">
										<div className="form-success-icon">
											<CheckCircleIcon size={64} weight="fill" color="var(--lime)"/>
										</div>
										<h4>Message Sent!</h4>
										<p>Thank you for reaching out to SPAK. We will be in touch within 2–3 business days.</p>
										<button onClick={() => setIsSubmitted(false)} className="form-success-btn">
											Send Another
										</button>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* --- FAQ SECTION --- */}
			<section className="section" style={{ background: 'var(--surface)', paddingTop: 0 }}>
				<div className="section-inner">
					<div className="section-eyebrow">FAQs</div>
					<h2 className="section-title">Frequently Asked Questions</h2>
					<div className="faq-list">

						<div className={`faq-item ${openFaq === 0 ? 'open' : ''}`} onClick={() => toggleFaq(0)}>
							<div className="faq-q">
								Who can join SPAK?
								<span className="faq-chevron"><CaretDownIcon size={16} weight="bold"/></span>
							</div>
							<div className="faq-a">
								<div className="faq-a-inner">
									SPAK welcomes paediatric anaesthesiologists, anaesthesia trainees with an interest in paediatrics, and
									allied healthcare professionals involved in children's surgical care across Kenya and East Africa.
								</div>
							</div>
						</div>

						<div className={`faq-item ${openFaq === 1 ? 'open' : ''}`} onClick={() => toggleFaq(1)}>
							<div className="faq-q">
								How does SPAK differ from the Kenya Society of Anaesthesiologists (KSA)?
								<span className="faq-chevron"><CaretDownIcon size={16} weight="bold"/></span>
							</div>
							<div className="faq-a">
								<div className="faq-a-inner">
									While the KSA covers all anaesthesiology in Kenya, SPAK focuses specifically on the paediatric
									sub-specialty — children's unique physiological needs, dedicated training, and the critical gap in
									paediatric anaesthesia capacity across the country.
								</div>
							</div>
						</div>

						<div className={`faq-item ${openFaq === 2 ? 'open' : ''}`} onClick={() => toggleFaq(2)}>
							<div className="faq-q">
								How can hospitals or counties partner with SPAK?
								<span className="faq-chevron"><CaretDownIcon size={16} weight="bold"/></span>
							</div>
							<div className="faq-a">
								<div className="faq-a-inner">
									SPAK actively works with county governments and hospitals to deliver short courses, outreach
									programmes, and capacity assessments. Use the contact form above or reach out via Facebook to start
									that conversation.
								</div>
							</div>
						</div>

						<div className={`faq-item ${openFaq === 3 ? 'open' : ''}`} onClick={() => toggleFaq(3)}>
							<div className="faq-q">
								Does SPAK offer training for non-specialists?
								<span className="faq-chevron"><CaretDownIcon size={16} weight="bold"/></span>
							</div>
							<div className="faq-a">
								<div className="faq-a-inner">
									Yes. SPAK's short courses are designed to upskill general anaesthesiologists and nurses working in
									counties where paediatric specialists are not available, improving baseline safety for children
									undergoing surgery.
								</div>
							</div>
						</div>

						<div className={`faq-item ${openFaq === 4 ? 'open' : ''}`} onClick={() => toggleFaq(4)}>
							<div className="faq-q">
								How can international organisations collaborate with SPAK?
								<span className="faq-chevron"><CaretDownIcon size={16} weight="bold"/></span>
							</div>
							<div className="faq-a">
								<div className="faq-a-inner">
									International medical societies, NGOs, and equipment providers are encouraged to reach out via our
									contact page. SPAK has existing partnerships with WFSA, SPA Global, APAGBI, and KidsOR, and welcomes
									new collaborations that align with our mission.
								</div>
							</div>
						</div>

					</div>
				</div>
			</section>
		</div>
	);
}