export type EventItem = {
	id: number;
	title: string;
	category: string;
	startDate: string; // ISO date, e.g. '2025-09-12'
	endDate?: string; // omit for single-day events
	location: string;
	description: string;
};

// Add real events here as they're scheduled — this file is the only thing
// the Events page reads from, so no CMS or backend needed. Each event
// automatically sorts into "Upcoming" or "Past" based on today's date.
export const eventsData: EventItem[] = [ 
	{
		id: 1,
		title: "Children’s Safety During Surgery – World Anaesthesia Day 2026",
		category: "Health & Awareness",
		startDate: "2026-10-17",
		location: "Karura Forest, Nairobi",
		description: "Join the Society of Paediatric Anaesthesiologists in Kenya (SPAK) to celebrate World Anaesthesia Day 2026 and raise awareness about safe anaesthesia and children’s safety during surgery. Activities include 5 KM, 10 KM and 15 KM fun runs/walks, health and anaesthesia awareness, family-friendly activities, participant T-shirts, awards, refreshments, and professional and community networking. The event starts at 7:30 AM. Registration: Adults KSh 1,500; children aged 4–12 KSh 700.",
	},
];