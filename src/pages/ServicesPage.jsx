import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, GraduationCap, Stethoscope, UtensilsCrossed, Sprout, Scissors, Droplets } from 'lucide-react';
import Navbar from '@/components/site/Navbar';
import Footer from '@/components/site/Footer';
import Reveal from '@/components/Reveal';
import Seo from '@/components/Seo';

const activities = [
    { icon: GraduationCap, title: 'Education support', text: 'Notebooks, uniforms, school bags and fee assistance for children in government schools across our mandals.' },
    { icon: Stethoscope, title: 'Free medical camps', text: 'Monthly general, eye and diabetes camps with visiting doctors, free diagnostics and medicines.' },
    { icon: UtensilsCrossed, title: 'Food & nutrition', text: 'Hot meals during festivals and calamities, plus monthly ration kits for widows and daily-wage families.' },
    { icon: Scissors, title: 'Skills & livelihood', text: 'Tailoring, embroidery and computer training so rural women can earn from home with dignity.' },
    { icon: Sprout, title: 'Green villages', text: 'Plantation drives, pond cleaning and roadside saplings maintained by student eco-clubs.' },
    { icon: Droplets, title: 'Blood & emergency aid', text: 'Voluntary blood donation camps and immediate help for accident and hospital emergencies.' },
];

const ServicesPage = () => {
    return (
        <div className="min-h-screen bg-[#FAFCFF]">
            <Seo
                title="Our Services - balivada ramarao PATNAIK charitable trust"
                description="Our core volunteer programs spanning education support, medical camps, nutrition aid, and skills training."
                siteName="balivada ramarao PATNAIK charitable trust"
            />

            <Navbar />

            {/* SERVICES LIST */}
            <section className="pb-24 pt-36 sm:pb-32 sm:pt-44 relative overflow-hidden">
                <div className="mx-auto max-w-[78rem] px-6">
                    <Reveal>
                        <div className="max-w-2xl editorial-rule">
                            <p className="text-xs uppercase tracking-[0.28em] text-brand-green font-semibold">What we do</p>
                            <h2 className="mt-4 font-display text-4xl leading-[1.08] text-[#111827] sm:text-5xl">Our Services</h2>
                            <p className="mt-5 text-[17px] leading-relaxed text-[#4B5563]">
                                Six steady programmes, run month after month, in the places where help rarely arrives on time.
                            </p>
                        </div>
                    </Reveal>

                    <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {activities.map((a, i) => (
                            <Reveal key={a.title} delay={i * 0.06}>
                                <article className="group flex h-full flex-col justify-between rounded-[1.75rem] border border-white/90 bg-white/80 p-8 shadow-soft transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-brand-accent/30 hover:shadow-lift">
                                    <div>
                                        <span className="grid h-14 w-14 place-items-center rounded-full bg-brand-accent text-brand-dark shadow-soft transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                                            <a.icon className="h-6 w-6" strokeWidth={1.6} />
                                        </span>
                                        <h3 className="mt-6 font-display text-xl text-brand-dark font-bold">{a.title}</h3>
                                        <p className="mt-3 text-[15px] leading-relaxed text-brand-dark/70">{a.text}</p>
                                    </div>
                                    <div className="mt-6 pt-4 border-t border-brand-cream">
                                        <Link to="/donate" className="text-sm font-semibold text-brand-green hover:text-brand-dark inline-flex items-center gap-1.5 transition-colors duration-200 group/link">
                                            Support This Program <ArrowRight className="h-3.5 w-3.5 text-brand-accent group-hover/link:translate-x-0.5 transition-transform" />
                                        </Link>
                                    </div>
                                </article>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default ServicesPage;
