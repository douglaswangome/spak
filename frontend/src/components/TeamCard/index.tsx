import { useState } from 'react';

type Props = {
	avatarText: string;
	name: string;
	role: string;
	bio: string;
	imagePath?: string | null;
	imagePosition?: string; // e.g. "center top", "50% 20%"
	avatarGradient?: string;
}

export function TeamCard({
	avatarText,
	name,
	role,
	bio,
	imagePath,
	imagePosition = 'center top', // sensible default for headshots
	avatarGradient,
}: Props) {
	const [imageFailed, setImageFailed] = useState(false);
	const customStyle = avatarGradient ? { background: avatarGradient } : {};

	const showImage = imagePath && !imageFailed;

	return (
		<div className="team-card">
			<div className="team-avatar" style={showImage ? undefined : customStyle}>
				{showImage ? (
					<img
						src={imagePath}
						alt={name}
						className="team-avatar-img"
						style={{ objectPosition: imagePosition }}
						onError={() => setImageFailed(true)}
					/>
				) : (
					avatarText
				)}
			</div>
			<div className="team-info">
				<div className="team-name">{name}</div>
				<div className="team-role">{role}</div>
				<p className="team-bio">{bio}</p>
			</div>
		</div>
	);
}