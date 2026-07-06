import '@/pages/About/index.css';
import { Card } from '@/components/Card';
import { coreValuesData, partnersData } from '@/components/Card/data.ts';
import { teamData } from '@/pages/About/data.ts';
import { TeamCard } from '@/components/TeamCard';

export function About() {
	return (
		<div id="page-about" className="page active">
			<div className={"intro"}>
				<div className={"intro-inner"}>
					<div className={"section-eyebrow"}>
						About the Society
					</div>
					<h1>Who We Are</h1>
					<p>Founded in 2023, SPAK is Kenya's professional home for paediatric anaesthesiologists — dedicated to the
						safety of
						every child in the operating theatre.</p>
				</div>
			</div>

			<section className="section" id={"mission"}>
				<div className="section-inner">
					<div className="mission-split">
						<div className="mission-img-box">
							<div className="mission-img-inner">
								<div className="mission-quote">"In Safe Hands"</div>
								<div className={"line"}></div>
								<p>Our tagline is our promise — to every child,
									every family, every county in Kenya.</p>
							</div>
						</div>
						<div>
							<div className="mission-green-bar"></div>
							<div className="section-eyebrow">Our Mission</div>
							<h2 className="section-title">Growing the Specialty. Protecting the Child.</h2>
							<div className="mission-text">
								<p>The Society of Paediatric Anaesthesiologists of Kenya (SPAK) was established to address the critical
									shortage of trained paediatric anaesthesia specialists in Kenya and the wider East African region.</p>
								<p>We exist to ensure that no child suffers preventable harm because of inadequate anaesthesia — and
									that every hospital, from Nairobi to the most remote county, has access to skills and knowledge to
									keep children safe during surgery.</p>
							</div>
							<ul className="mission-list">
								<li>Grow the capacity of paediatric anaesthesia to meet Kenya's surgical burden</li>
								<li>Enhance training at county governments and referral hospitals</li>
								<li>Drive research and data collection to inform national health policy</li>
								<li>Strengthen collaboration with global anaesthesia organisations</li>
								<li>Roll out short courses to improve knowledge and skills across the country</li>
							</ul>
						</div>
					</div>
				</div>
			</section>

			<section className="section" id={"core-values"}>
				<div className="section-inner">
					<div className="section-eyebrow">Core Values</div>
					<h2 className="section-title">What Drives Us</h2>
					<div className="cards-grid">
						{coreValuesData.map((value) => (
							<Card
								key={value.id}
								icon={value.icon}
								title={value.title}
								body={value.body}
							/>
						))}
					</div>
				</div>
			</section>

			<section className="section" id={"leadership"}>
				<div className="section-inner">
					<div className="section-eyebrow">Our Leadership</div>
					<h2 className="section-title">Meet the Team</h2>
					<p className="section-body">SPAK is led by dedicated paediatric anaesthesiologists committed to transforming
						children's surgical safety in Kenya.</p>
					<div className="team-grid">
						{teamData.map((member) => (
							<TeamCard key={member.id} {...member} />
						))}
					</div>
				</div>
			</section>

			<section className="section" id={"partners"}>
				<div className="section-inner">
					<div className="section-eyebrow">Our Partners</div>
					<h2 className="section-title">Global Collaborators</h2>
					<p className="section-body">SPAK stands on the shoulders of strong international partnerships that provide
						mentorship, funding, and technical support.</p>
					<div className={"partners-pills"}>
						{partnersData.map((partner, index) => {
							const colorClass = index % 2 === 0 ? 'pill-navy' : 'pill-lime';

							return (
								<span
									key={partner} // Using the name as a unique key
									className={`pill ${colorClass}`}
									style={{ fontSize: '13px', padding: '0.5rem 1rem' }}
								>
								{partner}
							</span>
							);
						})}
					</div>
				</div>
			</section>
		</div>
	);
}