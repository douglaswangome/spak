import '@/pages/Gallery/index.css';
import { useEffect, useState } from 'react';
import { galleryItems } from '@/pages/Gallery/data.ts';
import { CaretLeftIcon, CaretRightIcon, XIcon } from '@phosphor-icons/react';

const CATEGORY_COLORS = ['navy', 'lime', 'teal', 'mix'] as const;

function isPhoto(img: string) {
	return img.startsWith('/');
}

export function Gallery() {
	const [activeFilter, setActiveFilter] = useState('all');
	const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

	const filteredItems = activeFilter === 'all'
		? galleryItems
		: galleryItems.filter(item => item.cat === activeFilter);

	// Changing filters while the lightbox is open could point it at an
	// index that no longer exists in the new list, so just close it.
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

	// Esc to close, arrow keys to navigate — only listens while the
	// lightbox is actually open, and locks background scroll meanwhile.
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [lightboxIndex, filteredItems.length]);

	const activeItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

	return (
		<div id="page-gallery" className="page active">
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

					<div className="gallery-grid">
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