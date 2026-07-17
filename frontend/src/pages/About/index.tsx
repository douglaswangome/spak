import '@/pages/About/index.css';
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card } from '@/components/Card';
import { coreValuesData } from '@/components/Card/data.ts';
import { teamData } from '@/pages/About/data.ts';
import { TeamCard } from '@/components/TeamCard';
import { PartnersMarquee } from '@/components/PartnersMarquee';

gsap.registerPlugin(ScrollTrigger);

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

export function About() {
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
				.from('.intro-inner .section-eyebrow', { opacity: 0, y: -14, duration: 0.45, clearProps: 'opacity,transform' })
				.from('.intro-inner h1', { opacity: 0, y: 28, duration: 0.65, clearProps: 'opacity,transform' }, '-=0.25')
				.from('.intro-inner p', { opacity: 0, y: 18, duration: 0.55, clearProps: 'opacity,transform' }, '-=0.35');

				gsap.from('#mission .mission-img-box', {
					opacity: 0,
					x: -40,
					duration: 0.8,
					ease: 'power3.out',
					clearProps: 'opacity,transform',
					scrollTrigger: {
						trigger: '#mission .mission-split',
						start: 'top 80%',
						once: true,
					},
				});

				gsap.from('#mission .mission-split > div:last-child > *', {
					opacity: 0,
					x: 40,
					duration: 0.7,
					stagger: 0.1,
					ease: 'power3.out',
					clearProps: 'opacity,transform',
					scrollTrigger: {
						trigger: '#mission .mission-split',
						start: 'top 80%',
						once: true,
					},
				});

				gsap.from('#core-values .section-eyebrow, #core-values .section-title', {
					opacity: 0,
					y: 30,
					duration: 0.7,
					ease: 'power3.out',
					clearProps: 'opacity,transform',
					scrollTrigger: {
						trigger: '#core-values .section-inner',
						start: 'top 85%',
						once: true,
					},
				});

				gsap.from('#core-values .cards-grid > *', {
					opacity: 0,
					y: 36,
					duration: 0.6,
					stagger: 0.12,
					ease: 'power3.out',
					clearProps: 'opacity,transform',
					scrollTrigger: {
						trigger: '#core-values .cards-grid',
						start: 'top 85%',
						once: true,
					},
				});

				gsap.from('#leadership .section-eyebrow, #leadership .section-title', {
					opacity: 0,
					y: 30,
					duration: 0.7,
					ease: 'power3.out',
					clearProps: 'opacity,transform',
					scrollTrigger: {
						trigger: '#leadership .section-inner',
						start: 'top 85%',
						once: true,
					},
				});

				gsap.from('#leadership .leadership-intro .section-body', {
					opacity: 0,
					y: 24,
					duration: 0.7,
					ease: 'power3.out',
					clearProps: 'opacity,transform',
					scrollTrigger: {
						trigger: '#leadership .leadership-intro',
						start: 'top 85%',
						once: true,
					},
				});

				gsap.from('#leadership .leadership-photo', {
					opacity: 0,
					scale: 0.96,
					duration: 0.8,
					ease: 'power3.out',
					clearProps: 'opacity,transform',
					scrollTrigger: {
						trigger: '#leadership .leadership-intro',
						start: 'top 85%',
						once: true,
					},
				});

				gsap.from('#leadership .team-grid > *', {
					opacity: 0,
					y: 36,
					duration: 0.6,
					stagger: 0.1,
					ease: 'power3.out',
					clearProps: 'opacity,transform',
					scrollTrigger: {
						trigger: '#leadership .team-grid',
						start: 'top 85%',
						once: true,
					},
				});

				gsap.from('#partners .section-inner > *', {
					opacity: 0,
					y: 30,
					duration: 0.7,
					stagger: 0.1,
					ease: 'power3.out',
					clearProps: 'opacity,transform',
					scrollTrigger: {
						trigger: '#partners .section-inner',
						start: 'top 85%',
						once: true,
					},
				});

				gsap.from('#partners > *:last-child', {
					opacity: 0,
					y: 20,
					duration: 0.8,
					ease: 'power3.out',
					clearProps: 'opacity,transform',
					scrollTrigger: {
						trigger: '#partners',
						start: 'top 80%',
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

	return (
		<div id="page-about" className="page active" ref={rootRef}>
			<div className={"intro"}>
				<div className={"intro-inner"}>
					<div className={"section-eyebrow"}>
						About the Society
					</div>
					<h1>Who We Are</h1>
					<p>Founded in 2023, SPAK is Kenya's professional home for paediatric anaesthesiologists — dedicated to the
						safety of
						every child in the operating theatre.</p>
				</div>
			</div>

			<section className="section" id={"mission"}>
				<div className="section-inner">
					<div className="mission-split">
						<div className="mission-img-box">
							<div className="mission-photo">
								<div className="mission-img-inner">
									<div className="mission-quote">"In Safe Hands"</div>
									<div className={"line"}></div>
									<p>Our tagline is our promise — to every child,
										every family, every county in Kenya.</p>
								</div>
							</div>
						</div>
						<div>
							<div className="mission-green-bar"></div>
							<div className="section-eyebrow">Our Mission</div>
							<h2 className="section-title">Growing the Specialty. Protecting the Child.</h2>
							<div className="mission-text">
								<p>The Society of Paediatric Anaesthesiologists of Kenya (SPAK) was established to address the critical
									shortage of trained paediatric anaesthesia specialists in Kenya and the wider East African region.</p>
								<p>We exist to ensure that no child suffers preventable harm because of inadequate anaesthesia — and
									that every hospital, from Nairobi to the most remote county, has access to skills and knowledge to
									keep children safe during surgery.</p>
							</div>
							<ul className="mission-list">
								<li>Grow the capacity of paediatric anaesthesia to meet Kenya's surgical burden</li>
								<li>Enhance training at county governments and referral hospitals</li>
								<li>Drive research and data collection to inform national health policy</li>
								<li>Strengthen collaboration with global anaesthesia organisations</li>
								<li>Roll out short courses to improve knowledge and skills across the country</li>
							</ul>
						</div>
					</div>
				</div>
			</section>

			<section className="section" id={"core-values"}>
				<div className="section-inner">
					<div className="section-eyebrow">Core Values</div>
					<h2 className="section-title">What Drives Us</h2>
					<div className="cards-grid">
						{coreValuesData.map((value) => (
							<Card
								key={value.id}
								icon={value.icon}
								title={value.title}
								body={value.body}
							/>
						))}
					</div>
				</div>
			</section>

			<section className="section" id={"leadership"}>
				<div className="section-inner">
					<div className="section-eyebrow">Our Leadership</div>
					<h2 className="section-title">Meet the Team</h2>
					<div className="leadership-intro">
						<p className="section-body">SPAK is led by dedicated paediatric anaesthesiologists committed to transforming
							children's surgical safety in Kenya.</p>
						<div className="leadership-photo">
							<img
								src="/images/gallery/team/executive-committee-meeting-2024.jpg"
								alt="SPAK Executive Committee members meeting together"
								loading="lazy"
							/>
						</div>
					</div>
					<div className="team-grid">
						{teamData.map((member) => (
							<TeamCard key={member.id} {...member} />
						))}
					</div>
				</div>
			</section>

			<section className="section" id={"partners"}>
				<div className="section-inner">
					<div className="section-eyebrow">Our Partners</div>
					<h2 className="section-title">Global Collaborators</h2>
					<p className="section-body">SPAK stands on the shoulders of strong international partnerships that provide
						mentorship, funding, and technical support.</p>
				</div>
				<PartnersMarquee/>
			</section>
		</div>
	);
}