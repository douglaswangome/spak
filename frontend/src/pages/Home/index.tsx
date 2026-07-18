import '@/pages/Home/index.css';
import { useLayoutEffect, useRef } from 'react';
import type { SyntheticEvent } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { statsData } from '@/components/StatCard/data.ts';
import { StatCard } from '@/components/StatCard';
import { QuoteSection } from '@/components/QuoteSection';
import { initiativesData } from '@/components/Card/data.ts';
import { Card } from '@/components/Card';
import { galleryItems } from '@/pages/Gallery/data.ts';

gsap.registerPlugin(ScrollTrigger);

const FALLBACK_IMAGE =
	'data:image/svg+xml;utf8,' +
	encodeURIComponent(
		'<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600">' +
		'<rect width="100%" height="100%" fill="#0EA69F"/>' +
		'<text x="50%" y="50%" fill="#ffffff" font-family="sans-serif" ' +
		'font-size="28" text-anchor="middle" dominant-baseline="middle">SPAK</text>' +
		'</svg>'
	);

const HOME_GALLERY_IDS = [20, 14, 13, 19, 22];
const homeGalleryItems = HOME_GALLERY_IDS
.map((id) => galleryItems.find((item) => item.id === id))
.filter((item): item is (typeof galleryItems)[number] => Boolean(item));

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

export function Home() {
	const rootRef = useRef<HTMLDivElement>(null);

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
				.from('.hero-badge', { opacity: 0, y: -14, duration: 0.45 })
				.from('.hero-content h1', { opacity: 0, y: 28, duration: 0.65 }, '-=0.25')
				.from('.hero-desc', { opacity: 0, y: 18, duration: 0.55 }, '-=0.35')
				.from(
					'.hero-actions button',
					{ opacity: 0, y: 14, duration: 0.45, stagger: 0.12 },
					'-=0.3'
				)
				.from(
					['.hero-ring', '.hero-ring-2', '.hero-center', '.hero-stat-1', '.hero-stat-2'],
					{ opacity: 0, scale: 0.85, duration: 0.55, stagger: 0.08 },
					'-=0.5'
				);

				gsap.from('.anniversary-banner-inner', {
					opacity: 0,
					y: 30,
					scale: 0.97,
					duration: 0.8,
					ease: 'power3.out',
					scrollTrigger: {
						trigger: '.anniversary-banner',
						start: 'top 90%',
						once: true,
					},
				});

				// Continuous soft pulse — this section has no scroll-triggered
				// re-entry, so a quiet ongoing motion is what keeps the badge
				// from blending into the page once the entrance settles.
				gsap.to('.anniversary-badge', {
					scale: 1.06,
					duration: 1.1,
					repeat: -1,
					yoyo: true,
					ease: 'sine.inOut',
				});

				gsap.from('.stats-bar .stat-item', {
					opacity: 0,
					y: 16,
					duration: 0.6,
					stagger: 0.1,
					ease: 'power3.out',
					scrollTrigger: {
						trigger: '.stats-bar',
						start: 'top 85%',
						once: true,
					},
				});

				ScrollTrigger.create({
					trigger: '.stats-bar',
					start: 'top 80%',
					once: true,
					onEnter: () => {
						gsap.utils.toArray<HTMLElement>('.stats-bar .stat-item .num').forEach((el) => {
							const raw = el.textContent?.trim() ?? '';
							const match = raw.match(/^(\d+)(.*)$/);
							if (!match) return;

							const target = parseInt(match[1], 10);
							const suffix = match[2] ?? '';
							const counter = { value: 0 };

							gsap.to(counter, {
								value: target,
								duration: 1.4,
								ease: 'power2.out',
								onUpdate: () => {
									el.textContent = `${Math.round(counter.value)}${suffix}`;
								},
								onComplete: () => {
									el.textContent = `${target}${suffix}`;
								},
							});
						});
					},
				});

				gsap.from('#what-we-do .section-header', {
					opacity: 0,
					y: 30,
					duration: 0.7,
					ease: 'power3.out',
					scrollTrigger: {
						trigger: '#what-we-do .section-header',
						start: 'top 85%',
						once: true,
					},
				});

				gsap.from('#what-we-do .what-we-do-media img', {
					opacity: 0,
					y: 40,
					scale: 0.97,
					duration: 0.8,
					stagger: 0.15,
					ease: 'power3.out',
					scrollTrigger: {
						trigger: '#what-we-do .what-we-do-media',
						start: 'top 85%',
						once: true,
					},
				});

				gsap.from('#what-we-do .cards-grid > *', {
					opacity: 0,
					y: 36,
					duration: 0.6,
					stagger: 0.12,
					ease: 'power3.out',
					scrollTrigger: {
						trigger: '#what-we-do .cards-grid',
						start: 'top 85%',
						once: true,
					},
				});

				gsap.from('#why-it-matters .section-header', {
					opacity: 0,
					y: 30,
					duration: 0.7,
					ease: 'power3.out',
					scrollTrigger: {
						trigger: '#why-it-matters .section-header',
						start: 'top 85%',
						once: true,
					},
				});

				gsap.from('#why-it-matters .cards-grid > *', {
					opacity: 0,
					y: 36,
					duration: 0.6,
					stagger: 0.1,
					ease: 'power3.out',
					scrollTrigger: {
						trigger: '#why-it-matters .cards-grid',
						start: 'top 85%',
						once: true,
					},
				});

				gsap.from('#in-pictures .gallery-item', {
					opacity: 0,
					y: 44,
					scale: 0.94,
					duration: 0.7,
					stagger: 0.12,
					ease: 'power3.out',
					clearProps: 'opacity,transform',
					scrollTrigger: {
						trigger: '#in-pictures .gallery-grid',
						start: 'top 85%',
						once: true,
					},
				});

				gsap.utils.toArray<HTMLElement>('#in-pictures .gallery-item img').forEach((img, i) => {
					gsap.to(img, {
						yPercent: i % 2 === 0 ? 8 : -8,
						ease: 'none',
						scrollTrigger: {
							trigger: img,
							start: 'top bottom',
							end: 'bottom top',
							scrub: 1,
						},
					});
				});

				gsap.from('#quote-section-wrap', {
					opacity: 0,
					scale: 0.97,
					duration: 0.8,
					ease: 'power2.out',
					scrollTrigger: {
						trigger: '#quote-section-wrap',
						start: 'top 85%',
						once: true,
					},
				});
			});
		}, root);

		const images = Array.from(root.querySelectorAll('img'));
		let pending = images.length;
		const settle = () => {
			pending -= 1;
			if (pending <= 0) ScrollTrigger.refresh();
		};
		if (images.length === 0) {
			ScrollTrigger.refresh();
		} else {
			images.forEach((img) => {
				if (img.complete) {
					settle();
				} else {
					img.addEventListener('load', settle, { once: true });
					img.addEventListener('error', settle, { once: true });
				}
			});
		}

		return () => {
			ctx.revert();
			if (scrollContainer) {
				ScrollTrigger.defaults({ scroller: window });
			}
		};
	}, []);

	const handleImgError = (e: SyntheticEvent<HTMLImageElement>) => {
		const img = e.currentTarget;
		if (img.dataset.fallback === 'true') return;
		img.dataset.fallback = 'true';
		img.src = FALLBACK_IMAGE;
	};

	return (
		<div id="page-home" className="page active" ref={rootRef}>
			<section className="hero">
				<div className="hero-inner">
					<div className="hero-content">
						<div className="hero-badge">🏥 Est. 2023 · Nairobi, Kenya</div>
						<h1>Every Child Deserves to Be <span>In Safe Hands</span></h1>
						<p className="hero-desc">The Society of Paediatric Anaesthesiologists of Kenya is dedicated to advancing
							safe anaesthesia care for children — through training, research, advocacy, and collaboration across Kenya
							and East Africa.</p>
						<div className="hero-actions">
							<button className="btn-white">Our Mission</button>
							<button className="btn-outline-white">Get Involved</button>
						</div>
					</div>
					<div className="hero-visual">
						<div className="hero-card-stack">
							<div className="hero-ring"></div>
							<div className="hero-ring-2"></div>
							<div className="hero-center">
								<div className="hero-center-num">20+</div>
								<div className="hero-center-lbl">Paediatric<br/>Specialists</div>
							</div>
							<div className="hero-stat hero-stat-1">🩺 In Safe Hands</div>
							<div className="hero-stat hero-stat-2">🌍 East Africa Reach</div>
						</div>
					</div>
				</div>
			</section>

			<section className="anniversary-banner">
				<div className="anniversary-banner-inner">
					<div className="anniversary-banner-media">
						<img
							src="/images/home/spak-first-anniversary.jpg"
							alt="SPAK leadership and members marking the Society's first anniversary celebration"
							loading="lazy"
							onError={handleImgError}
						/>
					</div>
					<div className="anniversary-banner-text">
						<span className="anniversary-badge">🎉 1 Year Anniversary</span>
						<h2>SPAK Turns One!</h2>
						<p>A year down, forever to go — ensuring children are <strong>In Safe Hands</strong>. Thank you to
							everyone who celebrated this milestone with us.</p>
					</div>
				</div>
			</section>

			<section className="stats-bar">
				<div className="stats-bar-inner">
					<div className="stat-item">
						<div className="num">20+</div>
						<div className="lbl">Paediatric Specialists</div>
					</div>
					<div className="stat-item">
						<div className="num">2023</div>
						<div className="lbl">Year Founded</div>
					</div>
					<div className="stat-item">
						<div className="num">47</div>
						<div className="lbl">Counties Reached</div>
					</div>
					<div className="stat-item">
						<div className="num">5+</div>
						<div className="lbl">Partner Nations</div>
					</div>
				</div>
			</section>

			<section className="section" id={"what-we-do"}>
				<div className="section-inner">
					<div className={"section-header"}>
						<div className="section-eyebrow">What We Do</div>
						<h2 className="section-title">Advancing Paediatric Anaesthesia Across Kenya</h2>
						<p className="section-body">From short courses in county hospitals to national
							research, SPAK works on every level to keep children safe.</p>
					</div>
					<div className="what-we-do-media">
						<img
							src="/images/gallery/training/hands-on-anaesthesia-skills-workshop.jpg"
							alt="SPAK anaesthesiologists during a hands-on paediatric theatre session"
							loading="lazy"
							onError={handleImgError}
						/>
						<img
							src="/images/gallery/outreach/surgical-camp-nakuru-level5-hospital.jpg"
							alt="SPAK surgical outreach team at Nakuru Level 5 Hospital"
							loading="lazy"
							onError={handleImgError}
						/>
					</div>
					<div className="cards-grid">
						{initiativesData.map((initiative) => (
							<Card
								key={initiative.id}
								icon={initiative.icon}
								title={initiative.title}
								body={initiative.body}
							/>
						))}
					</div>
				</div>
			</section>

			<section className="section" id={"why-it-matters"}>
				<div className="section-inner">
					<div className={"section-header"}>
						<div className="section-eyebrow">Why It Matters</div>
						<h2 className="section-title">The Stakes Are High for Kenya's
							Children</h2>
					</div>
					<div className={"cards-grid"}>
						{statsData.map((item, index) => (
							<StatCard
								key={index}
								index={index}
								stat={item.stat}
								title={item.title}
								description={item.description}
								statColor={item.statColor}
							/>
						))}
					</div>
				</div>
			</section>

			<section className="section" id={"in-pictures"}>
				<div className="section-inner">
					<div className="section-header">
						<div className="section-eyebrow">In Pictures</div>
						<h2 className="section-title">Care, Comfort &amp; Community</h2>
						<p className="section-body">A glimpse into the moments SPAK works every day to
							protect — from a newborn's first hours to the classrooms of tomorrow's
							healthcare heroes.</p>
					</div>
					<div className="gallery-grid">
						{homeGalleryItems.map((item, idx) => (
							<figure
								key={item.id}
								className={`gallery-item${idx === 0 ? ' gallery-item-wide' : ''}`}
							>
								<img
									src={item.img}
									alt={item.text}
									loading="lazy"
									onError={handleImgError}
								/>
								<figcaption>{item.text}</figcaption>
							</figure>
						))}
					</div>
				</div>
			</section>

			<div id="quote-section-wrap">
				<QuoteSection/>
			</div>
		</div>
	)
}