import '@/pages/Events/index.css';
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { eventsData, type EventItem } from '@/pages/Events/data.ts';
import { CalendarBlankIcon, MapPinIcon } from '@phosphor-icons/react';

gsap.registerPlugin(ScrollTrigger);

const MONTH_LABELS = [
	'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
	'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

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

function formatDateRange(event: EventItem): string {
	const start = new Date(event.startDate);
	const startLabel = `${start.getDate()} ${MONTH_LABELS[start.getMonth()]} ${start.getFullYear()}`;
	if (!event.endDate || event.endDate === event.startDate) return startLabel;

	const end = new Date(event.endDate);
	const sameMonth = start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear();
	const endLabel = sameMonth
		? `${end.getDate()} ${MONTH_LABELS[end.getMonth()]} ${end.getFullYear()}`
		: `${end.getDate()} ${MONTH_LABELS[end.getMonth()]} ${end.getFullYear()}`;
	return `${startLabel} – ${endLabel}`;
}

// @ts-ignore
function EventCard({ event, past }: { event: EventItem; past?: boolean }) {
	const start = new Date(event.startDate);
	return (
		<div className="event-card">
			<div className="event-date">
				<div className="event-date-day">{start.getDate()}</div>
				<div className="event-date-month">{MONTH_LABELS[start.getMonth()]}</div>
			</div>
			<div className="event-body">
				<div className="event-tag">{event.category}</div>
				<h3>{event.title}</h3>
				<p>{event.description}</p>
				<div className="event-meta">
					<span><CalendarBlankIcon size={16}/> {formatDateRange(event)}</span>
					<span><MapPinIcon size={16}/> {event.location}</span>
				</div>
			</div>
		</div>
	);
}

export function Events() {
	const rootRef = useRef<HTMLDivElement>(null);

	const today = new Date();
	today.setHours(0, 0, 0, 0);

	const upcoming = eventsData
	.filter((e) => new Date(e.endDate ?? e.startDate) >= today)
	.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

	const past = eventsData
	.filter((e) => new Date(e.endDate ?? e.startDate) < today)
	.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());

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
				.from('.events-eyebrow', { opacity: 0, y: -14, duration: 0.45, clearProps: 'opacity,transform' })
				.from('.events-title', { opacity: 0, y: 28, duration: 0.6, clearProps: 'opacity,transform' }, '-=0.25')
				.from('.events-desc', { opacity: 0, y: 18, duration: 0.5, clearProps: 'opacity,transform' }, '-=0.3');

				gsap.utils.toArray<HTMLElement>('.events-block').forEach((block) => {
					gsap.from(block.querySelectorAll('.event-card, .events-empty'), {
						opacity: 0,
						y: 30,
						duration: 0.6,
						stagger: 0.08,
						ease: 'power3.out',
						clearProps: 'opacity,transform',
						scrollTrigger: {
							trigger: block,
							start: 'top 85%',
							once: true,
						},
					});
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

	return (
		<div id="page-events" className="page active" ref={rootRef}>
			<div className="events-hero">
				<div className="events-hero-inner">
					<div className="events-eyebrow">Events</div>
					<h1 className="events-title">Trainings, Workshops &amp; Gatherings</h1>
					<p className="events-desc">From hands-on skills workshops to outreach camps and our annual gathering —
						see what's coming up, and look back at what we've done.</p>
				</div>
			</div>

			<section className="section" style={{ background: 'var(--bg)' }}>
				<div className="section-inner">
					<div className="events-block">
						<div className="section-header">
							<div className="section-eyebrow">Upcoming</div>
							<h2 className="section-title">What's Next</h2>
						</div>
						{upcoming.length > 0 ? (
							<div className="events-list">
								{upcoming.map((event) => <EventCard event={event} key={event.id}/>)}
							</div>
						) : (
							<div className="events-empty">No upcoming events scheduled right now — check back soon.</div>
						)}
					</div>

					{past.length > 0 && (
						<div className="events-block events-block-past">
							<div className="section-header">
								<div className="section-eyebrow">Past Events</div>
								<h2 className="section-title">Where We've Been</h2>
							</div>
							<div className="events-list">
								{past.map((event) => <EventCard event={event} past key={event.id}/>)}
							</div>
						</div>
					)}
				</div>
			</section>
		</div>
	);
}