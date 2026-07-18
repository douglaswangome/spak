export type ResourceDocument = {
	id: number;
	title: string;
	description: string;
	file: string; // path under /public
	updated: string; // e.g. 'March 2025'
};

// Add more documents here as they're published — each renders as a card
// with an inline "View PDF" viewer and a direct download link.
export const documentsData: ResourceDocument[] = [
	{
		id: 1,
		title: 'SPAK Strategy 2025–2030',
		description: 'SPAK\'s five-year strategic plan — mission, core values, the four strategic pillars, nine strategic objectives, and the monitoring & evaluation framework guiding the Society through 2030.',
		file: '/documents/spak-strategy-2025-2030.pdf',
		updated: 'March 2025',
	},
];

export type Recording = {
	id: number;
	date: string; // e.g. '19 Mar 2025'
	topic: string;
	speakers: string;
	url: string;
};

// No recordings uploaded yet — add entries here once the first session
// recording is ready to share. Example shape (copy, fill in, then remove
// this comment):
// {
// 	id: 1,
// 	date: '19 Mar 2025',
// 	topic: 'Fluid Shifts in Paediatric Anaesthesia',
// 	speakers: 'Dr. Jane Doe',
// 	url: 'https://example.com/recording-link',
// },
export const recordingsData: Recording[] = [];