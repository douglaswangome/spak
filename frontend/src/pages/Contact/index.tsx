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
	SpinnerIcon,
	WarningCircleIcon,
	XLogoIcon
} from '@phosphor-icons/react';

const FORMBRICKS_ENV_ID = import.meta.env.VITE_FORMBRICKS_ENV_ID;
const FORMBRICKS_SURVEY_ID = import.meta.env.VITE_FORMBRICKS_SURVEY_ID;

// The field IDs below must match the IDs Formbricks assigns to each question
const FIELD_IDS = {
	firstName: 'tuktvw0h1dpir3rs0kullq39', // 'FORMBRICKS_FIELD_ID_FIRST_NAME',
	lastName: 'ayn7fijwqlp44e1fj1m44c61', // 'FORMBRICKS_FIELD_ID_LAST_NAME',
	email: 'y7tuj3degrax190d97fkbmq1', // 'FORMBRICKS_FIELD_ID_EMAIL',
	organisation: 'wwzslv27ahmosap4jnjnid6h', // 'FORMBRICKS_FIELD_ID_ORGANISATION',
	subject: 'wx6lxv5iu5juz2kr5fa5xixr', // 'FORMBRICKS_FIELD_ID_SUBJECT',
	message: 'p5axyhj2tjqi0w72t5n6k7bx', // 'FORMBRICKS_FIELD_ID_MESSAGE',
} as const;


type SubmitState = 'idle' | 'loading' | 'success' | 'error';

export function Contact() {
	const [submitState, setSubmitState] = useState<SubmitState>('idle');
	const [errorMessage, setErrorMessage] = useState<string>('');
	const [openFaq, setOpenFaq] = useState<number | null>(null);

	async function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
		e.preventDefault();

		// Guard: don't allow a second submission while one is in flight.
		if (submitState === 'loading') return;

		setSubmitState('loading');
		setErrorMessage('');

		// FormData reads every named input/select/textarea from the form element
		// without us having to wire up controlled state for each field.
		const form = e.currentTarget;
		const fd = new FormData(form);

		const payload = {
			surveyId: FORMBRICKS_SURVEY_ID,
			finished: true,
			data: {
				[FIELD_IDS.firstName]: fd.get('firstName') as string,
				[FIELD_IDS.lastName]: fd.get('lastName') as string,
				[FIELD_IDS.email]: fd.get('email') as string,
				[FIELD_IDS.organisation]: (fd.get('organisation') as string) ?? '',
				[FIELD_IDS.subject]: fd.get('subject') as string,
				[FIELD_IDS.message]: fd.get('message') as string,
			},
		};

		try {
			const res = await fetch(
				`https://app.formbricks.com/api/v1/client/${FORMBRICKS_ENV_ID}/responses`,
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(payload),
				}
			);

			if (!res.ok) {
				// Formbricks returns a JSON body with a "message" field on errors.
				const body = await res.json().catch(() => ({}));
				throw new Error(
					(body as { message?: string }).message ??
					`Unexpected error (HTTP ${res.status}). Please try again.`
				);
			}

			setSubmitState('success');
		} catch (err) {
			const message =
				err instanceof Error
					? err.message
					: 'Something went wrong. Please try again or email us directly.';
			setErrorMessage(message);
			setSubmitState('error');
		}
	}

	function handleReset() {
		setSubmitState('idle');
		setErrorMessage('');
	}

	function toggleFaq(index: number) {
		setOpenFaq(openFaq === index ? null : index);
	}

	return (
		<div id="page-contact" className="page active">

			{/* --- HERO SECTION --- */}
			<div className="contact-hero">
				<div className="contact-hero-inner">
					<div className="contact-eyebrow">Get in Touch</div>
					<h1 className="contact-title">Contact Us</h1>
					<p className="contact-desc">
						Whether you want to join SPAK, partner with us, or just learn more about our work — we'd
						love to hear from you.
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
							<p>
								SPAK welcomes paediatric anaesthesiologists, hospitals, researchers, government
								partners, and international organisations to reach out. Together, we can keep more
								children safe.
							</p>

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
										<a
											href="https://www.facebook.com/spak.or.ke"
											style={{ color: 'var(--navy)', fontWeight: 700 }}
											target="_blank"
											rel="noreferrer"
										>
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
								<div style={{ fontSize: '11px', color: 'var(--text3)' }}>
									Map integration available via Google Maps API
								</div>
							</div>

							<div className="contact-socials">
								<a href="https://www.facebook.com/spak.or.ke" target="_blank" rel="noreferrer"
								   className="social-btn" title="Facebook">
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

						{/* Right Side: Form / Feedback */}
						<div>
							<div className="contact-form-card">

								{/* ── IDLE / ERROR: show the form ── */}
								{(submitState === 'idle' || submitState === 'loading' || submitState === 'error') && (
									<>
										<h3>Send Us a Message</h3>

										{/* Error banner — only visible after a failed submission */}
										{submitState === 'error' && (
											<div className="form-error-banner" role="alert">
												<WarningCircleIcon size={20} weight="fill"/>
												<span>{errorMessage}</span>
											</div>
										)}

										{/*
											All inputs use the `name` attribute so FormData can pick
											them up in handleSubmit without controlled state.
										*/}
										<form id="contact-form" onSubmit={handleSubmit} noValidate>
											<div className="form-row">
												<div className="form-group">
													<label className="form-label" htmlFor="f-fname">First Name</label>
													<input
														type="text"
														className="form-input"
														placeholder="Jane"
														id="f-fname"
														name="firstName"
														required
														disabled={submitState === 'loading'}
													/>
												</div>
												<div className="form-group">
													<label className="form-label" htmlFor="f-lname">Last Name</label>
													<input
														type="text"
														className="form-input"
														placeholder="Doe"
														id="f-lname"
														name="lastName"
														required
														disabled={submitState === 'loading'}
													/>
												</div>
											</div>
											<div className="form-group">
												<label className="form-label" htmlFor="f-email">Email Address</label>
												<input
													type="email"
													className="form-input"
													placeholder="jane@hospital.co.ke"
													id="f-email"
													name="email"
													required
													disabled={submitState === 'loading'}
												/>
											</div>
											<div className="form-group">
												<label className="form-label" htmlFor="f-org">Organisation / Hospital</label>
												<input
													type="text"
													className="form-input"
													placeholder="e.g. Kenyatta National Hospital"
													id="f-org"
													name="organisation"
													disabled={submitState === 'loading'}
												/>
											</div>
											<div className="form-group">
												<label className="form-label" htmlFor="f-subject">Subject</label>
												<select
													className="form-input"
													id="f-subject"
													name="subject"
													required
													disabled={submitState === 'loading'}
													defaultValue=""
												>
													<option value="" disabled>Select a topic</option>
													<option>Membership Enquiry</option>
													<option>Training &amp; Short Courses</option>
													<option>Partnership Opportunity</option>
													<option>Research Collaboration</option>
													<option>Media &amp; Press</option>
													<option>General Enquiry</option>
												</select>
											</div>
											<div className="form-group">
												<label className="form-label" htmlFor="f-msg">Message</label>
												<textarea
													className="form-input"
													placeholder="Tell us about your interest in SPAK..."
													id="f-msg"
													name="message"
													required
													disabled={submitState === 'loading'}
												/>
											</div>

											<button
												type="submit"
												className="submit-btn"
												disabled={submitState === 'loading'}
												aria-busy={submitState === 'loading'}
											>
												{submitState === 'loading' ? (
													<>
														<SpinnerIcon size={18} className="spin"/>
														Sending…
													</>
												) : (
													'Send Message →'
												)}
											</button>
										</form>
									</>
								)}

								{/* ── SUCCESS: confirmation screen ── */}
								{submitState === 'success' && (
									<div className="form-success show" id="form-success">
										<div className="form-success-icon">
											<CheckCircleIcon size={64} weight="fill" color="var(--lime)"/>
										</div>
										<h4>Message Sent!</h4>
										<p>
											Thank you for reaching out to SPAK. We will be in touch within 2–3 business days.
										</p>
										<button onClick={handleReset} className="form-success-btn">
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

						{[
							{
								q: 'Who can join SPAK?',
								a: 'SPAK welcomes paediatric anaesthesiologists, anaesthesia trainees with an interest in paediatrics, and allied healthcare professionals involved in children\'s surgical care across Kenya and East Africa.',
							},
							{
								q: 'How does SPAK differ from the Kenya Society of Anaesthesiologists (KSA)?',
								a: 'While the KSA covers all anaesthesiology in Kenya, SPAK focuses specifically on the paediatric sub-specialty — children\'s unique physiological needs, dedicated training, and the critical gap in paediatric anaesthesia capacity across the country.',
							},
							{
								q: 'How can hospitals or counties partner with SPAK?',
								a: 'SPAK actively works with county governments and hospitals to deliver short courses, outreach programmes, and capacity assessments. Use the contact form above or reach out via Facebook to start that conversation.',
							},
							{
								q: 'Does SPAK offer training for non-specialists?',
								a: 'Yes. SPAK\'s short courses are designed to upskill general anaesthesiologists and nurses working in counties where paediatric specialists are not available, improving baseline safety for children undergoing surgery.',
							},
							{
								q: 'How can international organisations collaborate with SPAK?',
								a: 'International medical societies, NGOs, and equipment providers are encouraged to reach out via our contact page. SPAK has existing partnerships with WFSA, SPA Global, APAGBI, and KidsOR, and welcomes new collaborations that align with our mission.',
							},
						].map((faq, i) => (
							<div
								key={i}
								className={`faq-item ${openFaq === i ? 'open' : ''}`}
								onClick={() => toggleFaq(i)}
							>
								<div className="faq-q">
									{faq.q}
									<span className="faq-chevron"><CaretDownIcon size={16} weight="bold"/></span>
								</div>
								<div className="faq-a">
									<div className="faq-a-inner">{faq.a}</div>
								</div>
							</div>
						))}

					</div>
				</div>
			</section>
		</div>
	);
}