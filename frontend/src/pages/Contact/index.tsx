import '@/pages/Contact/index.css';
import { type SyntheticEvent, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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

gsap.registerPlugin(ScrollTrigger);

const FORMBRICKS_ENV_ID = import.meta.env.VITE_FORMBRICKS_ENV_ID;
const FORMBRICKS_SURVEY_ID = import.meta.env.VITE_FORMBRICKS_SURVEY_ID;

const FIELD_IDS = {
	firstName: 'tuktvw0h1dpir3rs0kullq39',
	lastName: 'ayn7fijwqlp44e1fj1m44c61',
	email: 'y7tuj3degrax190d97fkbmq1',
	organisation: 'wwzslv27ahmosap4jnjnid6h',
	subject: 'wx6lxv5iu5juz2kr5fa5xixr',
	message: 'p5axyhj2tjqi0w72t5n6k7bx',
} as const;

type SubmitState = 'idle' | 'loading' | 'success' | 'error';

function findScrollableAncestor(el: HTMLElement | null): HTMLElement | null {
	let node = el?.parentElement ?? null;
	while (node && node !== document.body) {
		const style = getComputedStyle(node);
		const overflowY = style.overflowY;
		const isScrollable =
			(overflowY === 'auto' || overflowY === 'scroll' || overflowY === 'overlay') &&
			node.scrollHeight > node.clientHeight;
		if (isScrollable) return node;
		node = node.parentElement;
	}
	return null;
}

export function Contact() {
	const rootRef = useRef<HTMLDivElement>(null);
	const successRef = useRef<HTMLDivElement>(null);
	const [submitState, setSubmitState] = useState<SubmitState>('idle');
	const [errorMessage, setErrorMessage] = useState<string>('');
	const [openFaq, setOpenFaq] = useState<number | null>(null);

	async function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
		e.preventDefault();

		if (submitState === 'loading') return;

		setSubmitState('loading');
		setErrorMessage('');

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

	useLayoutEffect(() => {
		const root = rootRef.current;
		if (!root) return;

		const scrollContainer = findScrollableAncestor(root);

		const ctx = gsap.context(() => {
			const mm = gsap.matchMedia();

			if (scrollContainer) {
				ScrollTrigger.defaults({ scroller: scrollContainer });
			}

			mm.add('(prefers-reduced-motion: no-preference)', () => {
				gsap.timeline({ defaults: { ease: 'power3.out' } })
				.from('.contact-eyebrow', { opacity: 0, y: -14, duration: 0.45, clearProps: 'opacity,transform' })
				.from('.contact-title', { opacity: 0, y: 28, duration: 0.6, clearProps: 'opacity,transform' }, '-=0.25')
				.from('.contact-desc', { opacity: 0, y: 18, duration: 0.5, clearProps: 'opacity,transform' }, '-=0.3');

				gsap.from('.contact-info > *', {
					opacity: 0,
					y: 30,
					duration: 0.6,
					stagger: 0.08,
					ease: 'power3.out',
					clearProps: 'opacity,transform',
					scrollTrigger: {
						trigger: '.contact-info',
						start: 'top 80%',
						once: true,
					},
				});

				gsap.from('.contact-form-card', {
					opacity: 0,
					y: 30,
					scale: 0.98,
					duration: 0.7,
					ease: 'power3.out',
					clearProps: 'opacity,transform',
					scrollTrigger: {
						trigger: '.contact-form-card',
						start: 'top 80%',
						once: true,
					},
				});

				gsap.from('.section-eyebrow, .section-title', {
					opacity: 0,
					y: 30,
					duration: 0.7,
					ease: 'power3.out',
					clearProps: 'opacity,transform',
					scrollTrigger: {
						trigger: '.faq-list',
						start: 'top 85%',
						once: true,
					},
				});

				gsap.from('.faq-item', {
					opacity: 0,
					y: 24,
					duration: 0.5,
					stagger: 0.08,
					ease: 'power3.out',
					clearProps: 'opacity,transform',
					scrollTrigger: {
						trigger: '.faq-list',
						start: 'top 85%',
						once: true,
					},
				});
			});
		}, root);

		return () => {
			ctx.revert();
			if (scrollContainer) {
				ScrollTrigger.defaults({ scroller: window });
			}
		};
	}, []);

	useLayoutEffect(() => {
		if (submitState !== 'success') return;
		const el = successRef.current;
		if (!el) return;

		const ctx = gsap.context(() => {
			const mm = gsap.matchMedia();

			mm.add('(prefers-reduced-motion: no-preference)', () => {
				gsap.from(el, {
					opacity: 0,
					y: 16,
					scale: 0.97,
					duration: 0.5,
					ease: 'power3.out',
					clearProps: 'opacity,transform',
				});
			});
		}, el);

		return () => ctx.revert();
	}, [submitState]);

	return (
		<div id="page-contact" className="page active" ref={rootRef}>

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

			<section className="section" style={{ background: 'var(--bg)' }}>
				<div className="section-inner">
					<div className="contact-wrap">

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

							<div className="contact-photo">
								<img
									src="/images/gallery/team/colleagues-outside-nairobi-hospital.jpg"
									alt="SPAK members outside The Nairobi Hospital"
									loading="lazy"
								/>
							</div>
						</div>

						<div>
							<div className="contact-form-card">

								{(submitState === 'idle' || submitState === 'loading' || submitState === 'error') && (
									<>
										<h3>Send Us a Message</h3>

										{submitState === 'error' && (
											<div className="form-error-banner" role="alert">
												<WarningCircleIcon size={20} weight="fill"/>
												<span>{errorMessage}</span>
											</div>
										)}

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

								{submitState === 'success' && (
									<div className="form-success show" id="form-success" ref={successRef}>
										<div className="form-success-icon">
											<CheckCircleIcon size={64} weight="fill" color="var(--contact-teal)"/>
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