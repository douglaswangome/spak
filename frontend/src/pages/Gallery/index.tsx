import '@/pages/Gallery/index.css';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { galleryItems } from '@/pages/Gallery/data.ts';
import { CaretLeftIcon, CaretRightIcon, XIcon } from '@phosphor-icons/react';

const CATEGORY_COLORS = ['navy', 'lime', 'teal', 'mix'] as const;

function isPhoto(img: string) {
	return img.startsWith('/');
}

export function Gallery() {
	const rootRef = useRef<HTMLDivElement>(null);
	const gridRef = useRef<HTMLDivElement>(null);
	const [activeFilter, setActiveFilter] = useState('all');
	const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

	const filteredItems = activeFilter === 'all'
		? galleryItems
		: galleryItems.filter(item => item.cat === activeFilter);

	useEffect(() => {
		setLightboxIndex(null);
	}, [activeFilter]);

	const closeLightbox = () => setLightboxIndex(null);

	const showPrev = () => {
		if (lightboxIndex === null) return;
		setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
	};

	const showNext = () => {
		if (lightboxIndex === null) return;
		setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
	};

	useEffect(() => {
		if (lightboxIndex === null) return;

		function handleKeyDown(e: KeyboardEvent) {
			if (e.key === 'Escape') closeLightbox();
			if (e.key === 'ArrowLeft') showPrev();
			if (e.key === 'ArrowRight') showNext();
		}

		document.addEventListener('keydown', handleKeyDown);
		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
			document.body.style.overflow = previousOverflow;
		};
	}, [lightboxIndex, filteredItems.length]);

	useLayoutEffect(() => {
		const root = rootRef.current;
		if (!root) return;

		const ctx = gsap.context(() => {
			const mm = gsap.matchMedia();

			mm.add('(prefers-reduced-motion: no-preference)', () => {
				gsap.timeline({ defaults: { ease: 'power3.out' } })
				.from('.gallery-eyebrow', { opacity: 0, y: -14, duration: 0.45, clearProps: 'opacity,transform' })
				.from('.gallery-title', { opacity: 0, y: 28, duration: 0.6, clearProps: 'opacity,transform' }, '-=0.25')
				.from('.gallery-desc', { opacity: 0, y: 18, duration: 0.5, clearProps: 'opacity,transform' }, '-=0.3')
				.from('.filter-btn', { opacity: 0, y: 14, duration: 0.4, stagger: 0.06, clearProps: 'opacity,transform' }, '-=0.2');
			});
		}, root);

		return () => ctx.revert();
	}, []);

	useLayoutEffect(() => {
		const grid = gridRef.current;
		if (!grid) return;

		const ctx = gsap.context(() => {
			const mm = gsap.matchMedia();

			mm.add('(prefers-reduced-motion: no-preference)', () => {
				gsap.from('.gallery-item', {
					opacity: 0,
					y: 28,
					scale: 0.96,
					duration: 0.5,
					stagger: 0.06,
					ease: 'power3.out',
					clearProps: 'opacity,transform',
				});
			});
		}, grid);

		return () => ctx.revert();
	}, [activeFilter]);

	const activeItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

	return (
		<div id="page-gallery" className="page active" ref={rootRef}>
			<div className="gallery-hero">
				<div className="gallery-hero-inner">
					<div className="gallery-eyebrow">Gallery</div>
					<h1 className="gallery-title">Our Work in Pictures</h1>
					<p className="gallery-desc">From training workshops to surgical camps — a visual record of SPAK's impact
						across Kenya.</p>
				</div>
			</div>

			<section className="section" style={{ background: 'var(--bg)' }}>
				<div className="section-inner">
					<div className="gallery-filters">
						{['all', 'training', 'events', 'outreach', 'team'].map(filter => (
							<button
								key={filter}
								className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
								onClick={() => setActiveFilter(filter)}
							>
								{filter.charAt(0).toUpperCase() + filter.slice(1)}
							</button>
						))}
					</div>

					<div className="gallery-grid" ref={gridRef}>
						{filteredItems.length > 0 ? (
							filteredItems.map((item, index) => (
								<div
									key={item.id}
									className={`gallery-item gallery-cat-${CATEGORY_COLORS[index % CATEGORY_COLORS.length]}`}
									onClick={() => setLightboxIndex(index)}
									role="button"
									tabIndex={0}
									onKeyDown={(e) => {
										if (e.key === 'Enter' || e.key === ' ') setLightboxIndex(index);
									}}
								>
									<div className="gallery-tag">{item.tag}</div>
									<div className="gallery-img">
										{isPhoto(item.img)
											? <img src={item.img} alt={item.text} loading="lazy" />
											: item.img}
									</div>
									<div className="gallery-overlay">
										<div className="gallery-overlay-text">{item.text}</div>
									</div>
								</div>
							))
						) : (
							<div className="gallery-empty">No items in this category yet — check back soon.</div>
						)}
					</div>
				</div>
			</section>

			{activeItem && (
				<div className="lightbox-overlay" onClick={closeLightbox}>
					<button
						className="lightbox-close"
						onClick={closeLightbox}
						aria-label="Close"
					>
						<XIcon size={22} weight="bold" />
					</button>

					{filteredItems.length > 1 && (
						<button
							className="lightbox-nav lightbox-prev"
							onClick={(e) => { e.stopPropagation(); showPrev(); }}
							aria-label="Previous image"
						>
							<CaretLeftIcon size={26} weight="bold" />
						</button>
					)}

					<div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
						<div className="lightbox-media">
							{isPhoto(activeItem.img)
								? <img src={activeItem.img} alt={activeItem.text} />
								: <div className="lightbox-emoji">{activeItem.img}</div>}
						</div>
						<div className="lightbox-caption">
							<span className="lightbox-tag">{activeItem.tag}</span>
							<p>{activeItem.text}</p>
						</div>
					</div>

					{filteredItems.length > 1 && (
						<button
							className="lightbox-nav lightbox-next"
							onClick={(e) => { e.stopPropagation(); showNext(); }}
							aria-label="Next image"
						>
							<CaretRightIcon size={26} weight="bold" />
						</button>
					)}
				</div>
			)}
		</div>
	);
}