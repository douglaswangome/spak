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
	// Example — copy this shape for a real event, then delete the example:
	// {
	// 	id: 1,
	// 	title: 'Hands-On Paediatric Anaesthesia Skills Workshop',
	// 	category: 'Training',
	// 	startDate: '2025-09-12',
	// 	endDate: '2025-09-13',
	// 	location: 'Nairobi, Kenya',
	// 	description: 'A two-day hands-on workshop covering airway management and safe paediatric anaesthesia practice for county hospital teams.',
	// },
];