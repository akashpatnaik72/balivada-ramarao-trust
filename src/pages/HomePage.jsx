import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Navbar from '@/components/site/Navbar';
import Footer from '@/components/site/Footer';
import PillButton from '@/components/site/PillButton';
import Reveal from '@/components/Reveal';
import Seo from '@/components/Seo';
import lionsDistributionImg from '@/assets/lions_distribution.jpg';
import HeroFlipCard from '@/components/site/HeroFlipCard';

const IMG = {
    founder: 'https://images.hostinger.com/1d6e79ff-4815-484e-84fc-088e5465a852.png',
    trees: lionsDistributionImg,
};


const HomePage = () => {
    const [coords, setCoords] = React.useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const { clientX, clientY, currentTarget } = e;
        const { width, height, left, top } = currentTarget.getBoundingClientRect();
        const x = (clientX - left) / width - 0.5;
        const y = (clientY - top) / height - 0.5;
        setCoords({ x, y });
    };

    const handleMouseLeave = () => {
        setCoords({ x: 0, y: 0 });
    };

    const activeFounderImg = localStorage.getItem('custom_slot_home_founder') || IMG.founder;
    const activeTreesImg = IMG.trees;

    return (
        <div className="min-h-screen bg-[#FAFCFF]">
            <Helmet>
                <title>balivada ramarao PATNAIK charitable trust | Service, Education & Healthcare in Andhra Pradesh</title>
                <meta
                    name="description"
                    content="The balivada ramarao PATNAIK charitable trust serves villages across Andhra Pradesh with free medical camps, education support, food relief, women's livelihood training and emergency aid. Donate securely by UPI."
                />
            </Helmet>
            <Seo
                title="balivada ramarao PATNAIK charitable trust | Service, Education & Healthcare in Andhra Pradesh"
                description="Carrying forward a timeless tradition of care since 2010. Providing free diagnostic medical camps, class kits, monsoonal flood relief and plantation drives in villages."
                image={activeFounderImg}
                siteName="balivada ramarao PATNAIK charitable trust"
            />

            <Navbar />

            {/* HERO */}
            <section
                id="home"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative min-h-[100dvh] overflow-hidden pb-16 pt-32 sm:pb-20 sm:pt-40 flex items-center bg-[#FAF9F5] text-brand-dark"
            >
                <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_34%,rgba(183,211,52,0.12),transparent_26rem)]" />
                <div aria-hidden className="pointer-events-none absolute left-1/2 top-[-14rem] h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-brand-accent/5 blur-[110px]" />
                <div aria-hidden className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-brand-green/6 blur-3xl" />

                <div className="relative mx-auto grid max-w-[80rem] items-center gap-12 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 w-full">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.65, delay: 0.08, ease: 'easeOut' }}
                            className="mt-7 max-w-3xl"
                        >
                            <p className="font-display text-[15px] uppercase tracking-[0.32em] text-brand-green font-semibold">2010 — PRESENT</p>
                            <h1 className="mt-4 font-display text-[2.95rem] leading-[0.95] text-brand-dark sm:text-6xl lg:text-[4.75rem] tracking-tight">
                                A TIMELESS<br />
                                <span className="text-brand-green">TRADITION OF CARE.</span>
                            </h1>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.18, ease: 'easeOut' }}
                            className="mt-8 max-w-xl text-[18px] leading-[1.75] text-brand-dark/70"
                        >
                            The balivada ramarao PATNAIK charitable trust carries forward an established legacy of care — 
                            ensuring that medical camp logistics, school supply distribution, and community support reaches 
                            the villages where help is needed most.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.28, ease: 'easeOut' }}
                            className="mt-10 flex flex-wrap gap-4"
                        >
                            <Link to="/about">
                                <PillButton as="span" className="shadow-soft hover:shadow-lift">
                                    Explore Our Story <ArrowRight className="h-4 w-4" />
                                </PillButton>
                            </Link>
                            <Link to="/contact">
                                <PillButton variant="ghost" as="span">
                                    Contact Us
                                </PillButton>
                            </Link>
                        </motion.div>
                    </div>

                    <div className="relative flex justify-center lg:justify-end lg:translate-x-3">
                        <motion.div
                            animate={{
                                x: coords.x * 20,
                                y: coords.y * 20,
                            }}
                            transition={{ type: 'spring', stiffness: 100, damping: 25 }}
                            className="w-full flex justify-center lg:justify-end"
                        >
                            <HeroFlipCard />
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className="bg-[#F5F1E8] border-y border-brand-green/10 py-32 text-brand-dark relative overflow-hidden">
                <div aria-hidden className="pointer-events-none absolute right-[-10rem] top-[-10rem] h-[30rem] w-[30rem] rounded-full bg-brand-green/5 blur-[100px]" />
                <div className="mx-auto max-w-[64rem] px-6 text-center">
                    <Reveal>
                        <p className="text-xs uppercase tracking-[0.3em] text-brand-green font-semibold">Since 2010</p>
                        <h2 className="mt-8 font-display text-[2.25rem] leading-[1.1] text-brand-dark sm:text-5xl lg:text-[3.25rem] tracking-tight">
                            15+ years of quiet service,<br />
                            creating hope, and being part of everyday lives.
                        </h2>
                        <p className="mt-8 mx-auto max-w-2xl text-[17px] leading-relaxed text-brand-dark/70">
                            We believe that grassroots service has a ripple effect. What started as support for a few children has grown into an enduring tradition of care across Andhra Pradesh.
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* VISUAL TRANSITION */}
            <section className="relative h-[62vh] min-h-[28rem] overflow-hidden bg-brand-dark">
                <div aria-hidden className="absolute inset-0 bg-black/10 z-10" />
                <motion.div 
                    initial={{ scale: 1.04, opacity: 0 }}
                    whileInView={{ scale: 1.0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                    className="absolute inset-0 w-full h-full image-reveal"
                >
                    <img 
                        src={activeTreesImg}
                        alt="Lions Club charity distribution event"
                        className="w-full h-full object-cover object-center scale-[1.015]"
                    />
                </motion.div>
            </section>

            {/* FINAL CTA */}
            <section className="py-28 sm:py-36 bg-brand-cream/30 relative overflow-hidden border-t border-brand-green/10">
                <div className="mx-auto max-w-[48rem] px-6 text-center">
                    <Reveal>
                        <h2 className="font-display text-4xl sm:text-5xl leading-tight text-[#111827] tracking-tight">
                            Come, experience the joy of giving.
                        </h2>
                        <p className="mt-6 text-[17px] leading-relaxed text-[#4B5563] max-w-md mx-auto">
                            Join us as a volunteer, request a medical camp in your village, or support our education and nutrition programs.
                        </p>
                        <div className="mt-10">
                            <Link to="/contact">
                                <PillButton as="span" className="shadow-soft hover:shadow-lift">
                                    Get in Touch
                                </PillButton>
                            </Link>
                        </div>
                    </Reveal>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default HomePage;
