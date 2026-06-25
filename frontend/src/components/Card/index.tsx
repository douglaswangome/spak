type Props = {
	icon: string;
	title: string;
	body: string;
}

export function Card({ icon, title, body }: Props) {
	return (
		<div className="card">
			<div className="card-icon">{icon}</div>
			<h3 className="card-title">{title}</h3>
			<p className="card-body">{body}</p>
		</div>
	);
}

