import '@/components/StatCard/index.css';

type Props = {
	stat: string;
	title: string;
	description: string;
	index: number;
	statColor: string;
}

export function StatCard({ stat, title, description, index, statColor }: Props) {
	const isFirst = index === 0;
	const cardClass = isFirst ? 'primary' : 'secondary';

	return (
		<div className={`stat-card ${cardClass}`}>
			<div
				className="stat-value"
				style={{ color: statColor }}
			>
				{stat}
			</div>
			<div className="stat-title">
				{title}
			</div>
			<div className="stat-desc">
				{description}
			</div>
		</div>
	);
}