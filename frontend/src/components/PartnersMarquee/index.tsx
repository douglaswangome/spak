import { useState } from 'react';
import { partnersData } from '@/components/PartnersMarquee/data.ts';

function PartnerLogo({ partner }: { partner: any }) {
	const [imageFailed, setImageFailed] = useState(false);
	const showImage = partner.logoPath && !imageFailed;

	return (
		<div className="marquee-item">
			{showImage ? (
				<img
					src={partner.logoPath!}
					alt={partner.name}
					className="marquee-logo"
					onError={() => setImageFailed(true)}
				/>
			) : (
				<span className="pill pill-navy marquee-fallback-pill">
					{partner.name}
				</span>
			)}
		</div>
	);
}

export function PartnersMarquee() {
	// Render the list twice so the CSS animation can loop seamlessly —
	// see the CSS explanation below for why this duplication is necessary.
	const loopedPartners = [...partnersData, ...partnersData];

	return (
		<div className="marquee">
			<div className="marquee-track">
				{loopedPartners.map((partner, index) => (
					<PartnerLogo key={`${partner.id}-${index}`} partner={partner}/>
				))}
			</div>
		</div>
	);
}