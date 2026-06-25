import '@/pages/Gallery/index.css';
import { useState } from 'react';
import { galleryItems } from '@/pages/Gallery/data.ts';

export function Gallery() {
	const [activeFilter, setActiveFilter] = useState('all');

	const filteredItems = activeFilter === 'all'
		? galleryItems
		: galleryItems.filter(item => item.cat === activeFilter);

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
						{filteredItems.map((item, index) => (
							<div key={item.id} className={`gallery-item gallery-cat-${index % 4 === 0 ? 'navy' : 'lime'}`}>
								<div className="gallery-tag">{item.tag}</div>
								<div className="gallery-img">{item.img}</div>
								<div className="gallery-overlay">
									<div className="gallery-overlay-text">{item.text}</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
		</div>
	);
}