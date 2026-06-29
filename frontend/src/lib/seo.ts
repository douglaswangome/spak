import type { AnyRouteMatch } from '@tanstack/react-router';

export const siteName = 'Society of Paediatric Anaesthesiologists of Kenya';
export const siteUrl = 'https://spak.or.ke';
export const siteDescription =
	'SPAK advances paediatric anaesthesia in Kenya through training, research, advocacy, and collaboration.';
export const defaultOgImage = new URL('/logo.svg', siteUrl).toString();

type SeoOptions = {
	title: string;
	description: string;
	pathname: string;
	type?: 'website' | 'article';
	image?: string;
	noindex?: boolean;
};

function absoluteUrl(pathname: string) {
	return new URL(pathname, siteUrl).toString();
}

function imageUrl(imagePath: string) {
	return new URL(imagePath, siteUrl).toString();
}

export function createSeoHead({
	title,
	description,
	pathname,
	type = 'website',
	image = defaultOgImage,
	noindex = false,
}: SeoOptions) {
	const canonical = absoluteUrl(pathname);
	const imageSrc = imageUrl(image);

	return {
		meta: [
			{ title },
			{ name: 'description', content: description },
			{ name: 'application-name', content: siteName },
			{ name: 'theme-color', content: '#1B4B8A' },
			{ name: 'robots', content: noindex ? 'noindex,nofollow' : 'index,follow' },
			{ property: 'og:site_name', content: siteName },
			{ property: 'og:title', content: title },
			{ property: 'og:description', content: description },
			{ property: 'og:type', content: type },
			{ property: 'og:url', content: canonical },
			{ property: 'og:image', content: imageSrc },
			{ name: 'twitter:card', content: 'summary_large_image' },
			{ name: 'twitter:title', content: title },
			{ name: 'twitter:description', content: description },
			{ name: 'twitter:image', content: imageSrc },
		] satisfies NonNullable<AnyRouteMatch['meta']>,
		links: [
			{ rel: 'canonical', href: canonical },
		] satisfies NonNullable<AnyRouteMatch['links']>,
	};
}

export function createOrganizationSchema({
	name = siteName,
	description = siteDescription,
	pathname = '/',
}: {
	name?: string;
	description?: string;
	pathname?: string;
} = {}) {
	return {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name,
		url: absoluteUrl(pathname),
		description,
		logo: defaultOgImage,
		areaServed: 'Kenya',
		sameAs: [
			'https://www.facebook.com/spak.or.ke',
		],
	};
}

export function createFaqSchema(
	faqs: Array<{
		question: string;
		answer: string;
	}>,
	pathname = '/contact',
) {
	return {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: faqs.map((faq) => ({
			'@type': 'Question',
			name: faq.question,
			acceptedAnswer: {
				'@type': 'Answer',
				text: faq.answer,
			},
		})),
		url: absoluteUrl(pathname),
	};
}
