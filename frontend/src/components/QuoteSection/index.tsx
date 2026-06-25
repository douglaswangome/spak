import '@/components/QuoteSection/index.css';
import { quoteData } from '@/components/QuoteSection/data.ts';

export function QuoteSection() {
	const { text, source, buttonText } = quoteData;

	return (
		<section className="quote-section">
			<div className="quote-container">
				<div className="quote-icon">❝</div>
				QuoteSection
				<p className="quote-text">"{text}"</p>
				<div className="quote-source">— {source}</div>

				<div className="quote-action">
					<button
						className="btn-white"
					>
						{buttonText}
					</button>
				</div>
			</div>
		</section>
	);
}