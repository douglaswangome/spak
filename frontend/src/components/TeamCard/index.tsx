type Props = {
	avatarText: string;
	name: string;
	role: string;
	bio: string;
	avatarGradient?: string;
}

export function TeamCard({ avatarText, name, role, bio, avatarGradient }: Props) {
	const customStyle = avatarGradient ? { background: avatarGradient } : {};

	return (
		<div className="team-card">
			<div className="team-avatar" style={customStyle}>
				{avatarText}
			</div>
			<div className="team-info">
				<div className="team-name">{name}</div>
				<div className="team-role">{role}</div>
				<p className="team-bio">{bio}</p>
			</div>
		</div>
	);
}