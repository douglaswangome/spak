import '@/pages/Resources/index.css';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { documentsData, recordingsData, type ResourceDocument } from '@/pages/Resources/data.ts';
import {
	CalendarBlankIcon,
	DownloadSimpleIcon,
	FilePdfIcon,
	PlayCircleIcon,
	XIcon,
} from '@phosphor-icons/react';

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

export function Resources() {
	const rootRef = useRef<HTMLDivElement>(null);
	const [activeDoc, setActiveDoc] = useState<ResourceDocument | null>(null);

	useEffect(() => {
		if (!activeDoc) return;

		function handleKeyDown(e: KeyboardEvent) {
			if (e.key === 'Escape') setActiveDoc(null);
		}

		document.addEventListener('keydown', handleKeyDown);
		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
			document.body.style.overflow = previousOverflow;
		};
	}, [activeDoc]);

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
				.from('.resources-eyebrow', { opacity: 0, y: -14, duration: 0.45, clearProps: 'opacity,transform' })
				.from('.resources-title', { opacity: 0, y: 28, duration: 0.6, clearProps: 'opacity,transform' }, '-=0.25')
				.from('.resources-desc', { opacity: 0, y: 18, duration: 0.5, clearProps: 'opacity,transform' }, '-=0.3');

				gsap.from('.document-card', {
					opacity: 0,
					y: 30,
					scale: 0.97,
					duration: 0.5,
					stagger: 0.08,
					ease: 'power3.out',
					clearProps: 'opacity,transform',
					scrollTrigger: {
						trigger: '.documents-grid',
						start: 'top 85%',
						once: true,
					},
				});

				gsap.from('.recording-row, .resources-empty', {
					opacity: 0,
					y: 24,
					duration: 0.5,
					stagger: 0.08,
					ease: 'power3.out',
					clearProps: 'opacity,transform',
					scrollTrigger: {
						trigger: '.recordings-list, .resources-empty',
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

	return (
		<div id="page-resources" className="page active" ref={rootRef}>
			<div className="resources-hero">
				<div className="resources-hero-inner">
					<div className="resources-eyebrow">Resources</div>
					<h1 className="resources-title">Publications &amp; Recordings</h1>
					<p className="resources-desc">Strategy documents, guidelines, and session recordings from SPAK — all
						in one place.</p>
				</div>
			</div>

			<section className="section" style={{ background: 'var(--bg)' }}>
				<div className="section-inner">
					<div className="section-header">
						<div className="section-eyebrow">Documents</div>
						<h2 className="section-title">Strategy &amp; Publications</h2>
					</div>
					<div className="documents-grid">
						{documentsData.map((doc: any) => (
							<div className="document-card" key={doc.id}>
								<div className="document-icon"><FilePdfIcon size={28} weight="fill"/></div>
								<h3>{doc.title}</h3>
								<p>{doc.description}</p>
								<div className="document-meta">Updated {doc.updated}</div>
								<div className="document-actions">
									<button className="document-view-btn" onClick={() => setActiveDoc(doc)}>
										View PDF
									</button>
									<a className="document-download-btn" href={doc.file} download>
										<DownloadSimpleIcon size={18}/> Download
									</a>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="section" style={{ background: 'var(--surface)' }}>
				<div className="section-inner">
					<div className="section-header">
						<div className="section-eyebrow">Recordings</div>
						<h2 className="section-title">Session Recordings</h2>
					</div>
					{recordingsData.length > 0 ? (
						<div className="recordings-list">
							{recordingsData.map((rec: any) => (
								<a
									className="recording-row"
									href={rec.url}
									target="_blank"
									rel="noreferrer"
									key={rec.id}
								>
									<div className="recording-date"><CalendarBlankIcon size={16}/> {rec.date}</div>
									<div className="recording-topic">{rec.topic}</div>
									<div className="recording-speakers">{rec.speakers}</div>
									<div className="recording-watch">
										<PlayCircleIcon size={18} weight="fill"/> Watch
									</div>
								</a>
							))}
						</div>
					) : (
						<div className="resources-empty">Recordings will be added here as sessions become available.</div>
					)}
				</div>
			</section>

			{activeDoc && (
				<div className="pdf-modal-overlay" onClick={() => setActiveDoc(null)}>
					<button className="pdf-modal-close" onClick={() => setActiveDoc(null)} aria-label="Close">
						<XIcon size={22} weight="bold"/>
					</button>
					<div className="pdf-modal-content" onClick={(e) => e.stopPropagation()}>
						<iframe src={activeDoc.file} title={activeDoc.title}/>
					</div>
				</div>
			)}
		</div>
	);
}