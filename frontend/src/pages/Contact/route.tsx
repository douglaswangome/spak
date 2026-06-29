import { createRoute } from '@tanstack/react-router';
import { rootRoute } from '@/routes';
import { Contact } from '@/pages/Contact/';
import { createFaqSchema, createSeoHead, siteName } from '@/lib/seo';

export const contactRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/contact',
	head: () => ({
		...createSeoHead({
			title: `Contact SPAK | ${siteName}`,
			description: 'Contact SPAK in Nairobi for membership, training, research, and partnership enquiries.',
			pathname: '/contact',
		}),
		scripts: [
			{
				type: 'application/ld+json',
				children: JSON.stringify(createFaqSchema([
					{
						question: 'Who can join SPAK?',
						answer: 'SPAK welcomes paediatric anaesthesiologists, anaesthesia trainees with an interest in paediatrics, and allied healthcare professionals involved in children\'s surgical care across Kenya and East Africa.',
					},
					{
						question: 'How does SPAK differ from the Kenya Society of Anaesthesiologists (KSA)?',
						answer: 'While the KSA covers all anaesthesiology in Kenya, SPAK focuses specifically on the paediatric sub-specialty - children\'s unique physiological needs, dedicated training, and the critical gap in paediatric anaesthesia capacity across the country.',
					},
					{
						question: 'How can hospitals or counties partner with SPAK?',
						answer: 'SPAK works with county governments and hospitals to deliver short courses, outreach programmes, and capacity assessments. Use the contact form or reach out via Facebook to start the conversation.',
					},
					{
						question: 'Does SPAK offer training for non-specialists?',
						answer: 'Yes. SPAK\'s short courses are designed to upskill general anaesthesiologists and nurses working in counties where paediatric specialists are not available, improving baseline safety for children undergoing surgery.',
					},
					{
						question: 'How can international organisations collaborate with SPAK?',
						answer: 'International medical societies, NGOs, and equipment providers are encouraged to reach out via the contact page. SPAK welcomes new collaborations that align with its mission.',
					},
				])),
			},
		],
	}),
	component: Contact,
});