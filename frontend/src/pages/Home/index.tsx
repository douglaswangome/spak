import '@/pages/Home/index.css';
import { statsData } from '@/components/StatCard/data.ts';
import { StatCard } from '@/components/StatCard';
import { QuoteSection } from '@/components/QuoteSection';
import { initiativesData } from '@/components/Card/data.ts';
import { Card } from '@/components/Card';

export function Home() {
	return (
		<div id="page-home" className="page active">
			<section className="hero">
				<div className="hero-inner">
					<div className="hero-content">
						<div className="hero-badge">🏥 Est. 2023 · Nairobi, Kenya</div>
						<h1>Every Child Deserves to Be <span>In Safe Hands</span></h1>
						<p className="hero-desc">The Society of Paediatric Anaesthesiologists of Kenya is dedicated to advancing
							safe anaesthesia care for children — through training, research, advocacy, and collaboration across Kenya
							and East Africa.</p>
						<div className="hero-actions">
							<button className="btn-white">Our Mission</button>
							<button className="btn-outline-white">Get Involved</button>
						</div>
					</div>
					<div className="hero-visual">
						<div className="hero-card-stack">
							<div className="hero-ring"></div>
							<div className="hero-ring-2"></div>
							<div className="hero-center">
								<div className="hero-center-num">20+</div>
								<div className="hero-center-lbl">Paediatric<br/>Specialists</div>
							</div>
							<div className="hero-stat hero-stat-1">🩺 In Safe Hands</div>
							<div className="hero-stat hero-stat-2">🌍 East Africa Reach</div>
						</div>
					</div>
				</div>
			</section>

			<section className="stats-bar">
				<div className="stats-bar-inner">
					<div className="stat-item">
						<div className="num">20+</div>
						<div className="lbl">Paediatric Specialists</div>
					</div>
					<div className="stat-item">
						<div className="num">2023</div>
						<div className="lbl">Year Founded</div>
					</div>
					<div className="stat-item">
						<div className="num">47</div>
						<div className="lbl">Counties Reached</div>
					</div>
					<div className="stat-item">
						<div className="num">5+</div>
						<div className="lbl">Partner Nations</div>
					</div>
				</div>
			</section>

			<section className="section" id={"what-we-do"}>
				<div className="section-inner">
					<div className={"section-header"}>
						<div className="section-eyebrow">What We Do</div>
						<h2 className="section-title">Advancing Paediatric Anaesthesia Across Kenya</h2>
						<p className="section-body">From short courses in county hospitals to national
							research, SPAK works on every level to keep children safe.</p>
					</div>
					<div className="cards-grid">
						{initiativesData.map((initiative) => (
							<Card
								key={initiative.id}
								icon={initiative.icon}
								title={initiative.title}
								body={initiative.body}
							/>
						))}
					</div>
				</div>
			</section>

			<section className="section" id={"why-it-matters"}>
				<div className="section-inner">
					<div className={"section-header"}>
						<div className="section-eyebrow">Why It Matters</div>
						<h2 className="section-title">The Stakes Are High for Kenya's
							Children</h2>
					</div>
					<div className={"cards-grid"}>
						{statsData.map((item, index) => (
							<StatCard
								key={index}
								index={index}
								stat={item.stat}
								title={item.title}
								description={item.description}
								statColor={item.statColor}
							/>
						))}
					</div>
				</div>
			</section>

			<QuoteSection/>
		</div>
	)
}