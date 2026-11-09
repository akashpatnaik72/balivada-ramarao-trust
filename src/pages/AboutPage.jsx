import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Award, 
    Calendar, 
    Clock, 
    Users, 
    Layers, 
    Heart, 
    ShieldCheck, 
    Handshake, 
    ArrowUpRight, 
    Eye, 
    Minus, 
    Plus, 
    ChevronLeft, 
    ChevronRight,
    X,
    Quote 
} from 'lucide-react';
import Navbar from '@/components/site/Navbar';
import Footer from '@/components/site/Footer';
import Reveal from '@/components/Reveal';
import CountUp from '@/components/CountUp';
import Seo from '@/components/Seo';
import trophiesImg from '@/assets/trophies.jpg';
import awardPhoto1 from '@/assets/award_photo_1.jpg';
import awardPhoto2 from '@/assets/award_photo_2.jpg';
import awardPhoto3 from '@/assets/award_photo_3.jpg';

const IMG = {
    founder: 'https://images.hostinger.com/1d6e79ff-4815-484e-84fc-088e5465a852.png',
    medical: 'https://images.hostinger.com/a30e70f1-6b2b-4b29-b9bb-e5b3535f077d.png',
    trophies: trophiesImg,
    stage: 'https://images.hostinger.com/7d8f377e-b547-4c78-b999-93aa363d3f07.png',
};

const timelineData = [
    { year: '2010', title: 'Trust established', desc: 'Officially registered to serve the rural communities of Andhra Pradesh.' },
    { year: 'Early Years', title: 'Grassroots food distribution and community support', desc: 'Focusing on neighborhood drives and immediate hunger relief during calamities.' },
    { year: 'Growth', title: 'Expansion into multiple community initiatives', desc: 'Adding educational tool kits, tailoring training for women, and village plantation programs.' },
    { year: 'Today', title: 'Food, education, healthcare and community welfare initiatives', desc: 'A holistic, multi-program volunteer effort driving sustainable rural development.' }
];

const valuesData = [
    { icon: Heart, title: 'Compassion', text: 'We lead with empathy in every interaction.' },
    { icon: ShieldCheck, title: 'Integrity', text: 'Transparent operations and accountable giving.' },
    { icon: Handshake, title: 'Service', text: 'Selfless action to uplift the underserved.' },
    { icon: Users, title: 'Community', text: 'Building local resilience, hand in hand.' }
];

const awardNames = [
    'Akkineni Nageswara Rao Excellence Award',
    'Abdul Kalam Excellence Award (Hyderabad)',
    "India's 75th Independence Anniversary (Vajrotsavam) Award",
    'Potti Sriramulu Excellence Award',
    'Best Service Award (SRB Army Day)',
    'Ten Ugadi Awards',
    'Lions Club Best President Award',
    'Felicitations at numerous social, cultural, and public service gatherings'
];

const galleryImages = [
    { src: IMG.stage, caption: 'BSK Patnaik receiving state recognition award' },
    { src: IMG.trophies, caption: 'Trophies and awards gallery collection' },
    { src: IMG.medical, caption: 'Grassroots medical camp diagnostics service' }
];

const testimonials = [
    { quote: 'My daughter would have stopped studying after class seven. The trust paid her fees and gave books every single year. Today she is in a nursing college.', name: 'Satyavathi K.', role: 'Parent, Kothapeta' },
    { quote: 'We ran a free eye camp with them. In one morning, 340 villagers were screened and 42 got cataract surgery arranged. The organisation was flawless.', name: 'Dr. P. Venkateswarlu', role: 'Ophthalmologist, Kakinada' },
    { quote: 'After the cyclone, their volunteers reached our street before anyone else — rice, water and blankets for eighty families.', name: 'Nageswara Rao B.', role: 'Village elder, Konaseema' },
];

const faqs = [
    { q: 'Where does my donation actually go?', a: 'Directly into programme costs — school kits, medicines, ration kits, training material and camp logistics. Administrative work is done voluntarily by trustees.' },
    { q: 'Will I receive a receipt?', a: 'Yes. Share your name and phone number while donating and we issue a signed receipt, along with 80G documentation on request, within seven days.' },
    { q: 'Can I volunteer instead of donating?', a: 'Absolutely. Doctors, teachers, students and professionals help at camps, tuition centres and distribution drives every month.' },
    { q: 'Which areas does the trust serve?', a: 'Villages and towns across Konaseema, East Godavari and neighbouring districts of Andhra Pradesh, with select programmes in Hyderabad.' },
];

const serviceActivities = [
    {
        title: 'Education',
        subtitle: 'Student support & school adoption',
        desc: 'Provided textbooks, scholarships, and writing materials. Adopted Puchchapalli Leela Elementary School for three years, adding essential infrastructure.',
    },
    {
        title: 'Healthcare',
        subtitle: 'Free medicine & cataract surgeries',
        desc: 'Provided ₹1 lakh in annual medicines to a government hospital for three years. Organized 147 free cataract surgeries in father\'s memory.',
    },
    {
        title: 'Women Empowerment',
        subtitle: 'Tailoring training & livelihoods',
        desc: 'Established Tailoring Training Centre for women. Distributed 60 sewing machines to trainees presented by actor Naresh.',
    },
    {
        title: 'COVID-19 Relief',
        subtitle: '40 days of continuous aid',
        desc: 'Distributed groceries and vitamin tablets, supplied PPE kits to barbers, and served fresh fruit juice to frontline police.',
    },
    {
        title: 'Flood Relief',
        subtitle: '52 families supported in Vijayawada',
        desc: 'Responded promptly with groceries, vegetables, and financial assistance to flood-affected Shishta Karana families.',
    },
    {
        title: 'Community Support',
        subtitle: '2,000+ sarees & 1,200+ blankets',
        desc: 'Sustained Annadanam food donation programs. Distributed sarees to over 2,000 women and blankets to 1,200+ individuals.',
    }
];

const AboutPage = () => {
    const [slide, setSlide] = useState(0);
    const [openFaq, setOpenFaq] = useState(0);

    const activeFounderImg = localStorage.getItem('custom_slot_about_founder') || IMG.founder;
    const activeStageImg = localStorage.getItem('custom_slot_about_stage') || IMG.stage;
    const activeTrophiesImg = IMG.trophies;
    const activeMedicalImg = localStorage.getItem('custom_slot_about_medical') || IMG.medical;

    const activeGalleryImages = [
        { src: awardPhoto1, caption: 'BSK Patnaik receiving state recognition award' },
        { src: awardPhoto2, caption: 'Trophies and awards gallery collection' },
        { src: awardPhoto3, caption: 'Grassroots medical camp diagnostics service' }
    ];
    const [lightbox, setLightbox] = useState(null);

    useEffect(() => {
        const id = window.setInterval(() => setSlide((s) => (s + 1) % testimonials.length), 6000);
        return () => window.clearInterval(id);
    }, []);

    useEffect(() => {
        if (lightbox === null) return undefined;
        const onKey = (e) => {
            if (e.key === 'Escape') setLightbox(null);
            if (e.key === 'ArrowRight') setLightbox((i) => (i + 1) % galleryImages.length);
            if (e.key === 'ArrowLeft') setLightbox((i) => (i - 1 + galleryImages.length) % galleryImages.length);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [lightbox]);

    return (
        <div className="min-h-screen bg-[#FAFCFF] overflow-x-hidden text-[#111827]">
            <Seo
                title="About BSK Patnaik - balivada ramarao PATNAIK charitable trust"
                description="Carrying forward the vision and values of BSK Patnaik, establishing health services and village developments."
                image={activeFounderImg}
                siteName="balivada ramarao PATNAIK charitable trust"
            />

            <Navbar />

            {/* SECTION INTRO */}
            <header className="pt-32 pb-10 sm:pt-40 sm:pb-12 text-center sm:text-left">
                <div className="mx-auto max-w-[76rem] px-6">
                    <Reveal>
                        <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-green">
                            ABOUT THE FOUNDER
                        </p>
                        <h1 className="mt-3 font-display text-[2.5rem] leading-tight text-[#111827] sm:text-5xl lg:text-6xl tracking-tight">
                            Serving with purpose, leading with compassion.
                        </h1>
                        <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-[#4B5563]">
                            Sri BSK Patnaik established the Balivada Ramarao Patnaik Charitable Trust with a single belief — that small, consistent acts of kindness can reshape entire communities.
                        </p>
                    </Reveal>
                </div>
            </header>

            {/* FOUNDER SECTION */}
            <section className="py-12 sm:py-16 bg-[#FAFCFF]">
                <div className="mx-auto max-w-[76rem] px-6">
                    <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
                        
                        {/* LEFT: Founder image */}
                        <div className="flex justify-center lg:justify-start lg:h-full w-full">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="group relative overflow-hidden rounded-[24px] shadow-soft border border-[#E5E7EB] bg-white p-2.5 max-w-sm sm:max-w-md lg:max-w-none w-full h-[26rem] sm:h-[32rem] lg:h-full flex flex-col transition-shadow duration-500 hover:shadow-lift"
                            >
                                <img
                                    src={activeFounderImg}
                                    alt="Founder BSK Patnaik portrait"
                                    className="w-full h-full object-cover rounded-[16px] object-center transition-transform duration-1000 ease-out group-hover:scale-[1.035]"
                                    loading="eager"
                                />
                            </motion.div>
                        </div>

                        {/* RIGHT: Founder description */}
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col gap-1.5">
                                <div className="inline-flex items-center gap-1.5 rounded-full bg-[#EEF5FF] px-3.5 py-1 w-fit">
                                    <span className="h-1.5 w-1.5 rounded-full bg-brand-accent animate-pulse" />
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-green">
                                        Serving since 2010
                                    </span>
                                </div>
                                <h3 className="font-display text-3xl font-bold text-[#111827] mt-2">BSK Patnaik</h3>
                                <p className="text-xs font-semibold uppercase tracking-widest text-[#4B5563]">Founder &amp; Trustee</p>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.55 }}
                                className="text-[15px] leading-relaxed text-[#4B5563] space-y-4"
                            >
                                <p>
                                    For the past 15 years, the <span className="font-semibold text-[#111827]">Balivada Ramarao Patnaik Charitable Trust</span> has been continuously carrying out numerous social welfare and service initiatives aimed at improving the lives of economically weaker and middle-class sections of society.
                                </p>
                                <p>
                                    The Trust was established by <span className="font-semibold text-[#111827]">Balivada Shivakumar Patnaik</span> in memory of his father. Through his own financial contributions and the support of friends and well-wishers, he has sustained the Trust's journey of service across education, healthcare, women empowerment, disaster relief, and community welfare.
                                </p>

                                <div className="border-t border-[#E5E7EB] pt-6 mt-6">
                                    <h4 className="font-display text-lg font-bold text-[#111827] mb-5">
                                        Major Service Activities
                                    </h4>
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        {serviceActivities.map((act) => (
                                            <div
                                                key={act.title}
                                                className="group/service p-4 rounded-[1.25rem] border border-[#E5E7EB] bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift flex flex-col gap-1"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span className="font-display text-[14px] font-bold text-[#111827]">
                                                        {act.title}
                                                    </span>
                                                    <span className="text-[10px] font-semibold text-brand-green px-2.5 py-0.5 rounded-full bg-brand-accent/10 border border-brand-accent/20">
                                                        Active
                                                    </span>
                                                </div>
                                                <span className="text-[11px] font-semibold text-brand-green uppercase tracking-wide">
                                                    {act.subtitle}
                                                </span>
                                                <p className="text-[12px] leading-relaxed text-[#4B5563]/90 mt-1">
                                                    {act.desc}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                    </div>
                </div>
            </section>

            {/* IMPACT / JOURNEY STRIP */}
            <section className="py-10 bg-[#EEF5FF] border-y border-[#E5E7EB]">
                <div className="mx-auto max-w-[76rem] px-6">
                    <div className="grid grid-cols-2 gap-8 md:grid-cols-4 items-center text-center">
                        {[
                            { value: '2010', label: 'Established', icon: Calendar },
                            { value: '10+', label: 'Years of Service', icon: Clock },
                            { value: 'Thousands', label: 'Families Reached', icon: Users },
                            { value: 'Multiple', label: 'Community Programs', icon: Layers }
                        ].map((item, idx) => (
                            <motion.div
                                key={item.label}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.45, delay: idx * 0.08 }}
                                className="flex flex-col items-center gap-2"
                            >
                                <item.icon className="h-5 w-5 text-brand-green" />
                                <span className="font-display text-2xl font-bold text-[#111827]">{item.value}</span>
                                <span className="text-xs uppercase tracking-wider text-[#4B5563] font-medium">{item.label}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* OUR JOURNEY (TIMELINE) */}
            <section className="py-16 sm:py-24 bg-[#FAFCFF] relative">
                <div className="mx-auto max-w-[62rem] px-6">
                    <Reveal>
                        <div className="text-center mb-16">
                            <p className="text-xs uppercase tracking-[0.28em] text-[#2563EB] font-bold">OUR JOURNEY</p>
                            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-[#111827]">Legacy of grassroots service</h2>
                        </div>
                    </Reveal>

                    <div className="relative pl-12 sm:pl-16">
                        <div className="absolute left-[7px] top-4 bottom-4 w-[1px] bg-[#E5E7EB]" />
                        <motion.div
                            initial={{ height: 0 }}
                            whileInView={{ height: '90%' }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.1, ease: 'easeOut' }}
                            className="absolute left-[7px] top-4 w-[1px] bg-brand-green"
                        />

                        <div className="space-y-12">
                            {timelineData.map((milestone, idx) => (
                                <motion.div
                                    key={milestone.year}
                                    initial={{ opacity: 0, x: -15 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: idx * 0.12 }}
                                    className="relative flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-10"
                                >
                                    <span className="absolute -left-[41px] top-2 h-3.5 w-3.5 rounded-full bg-brand-green ring-4 ring-white" />
                                    <div className="sm:w-32 shrink-0">
                                        <span className="font-display text-xl font-extrabold text-brand-green">{milestone.year}</span>
                                    </div>
                                    <div className="flex-grow">
                                        <h4 className="text-[16px] font-bold text-[#111827]">{milestone.title}</h4>
                                        <p className="mt-1 text-sm text-[#4B5563] leading-relaxed">{milestone.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* VALUES & OBJECTIVES */}
            <section className="py-16 sm:py-24 bg-[#EEF5FF] border-y border-[#E5E7EB]">
                <div className="mx-auto max-w-[76rem] px-6">
                    <Reveal>
                        <div className="text-center mb-14">
                            <p className="text-xs uppercase tracking-[0.28em] text-brand-green font-bold">OUR CORE VALUES</p>
                            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-[#111827]">Values &amp; Objectives</h2>
                        </div>
                    </Reveal>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {valuesData.map((val, idx) => (
                            <motion.div
                                key={val.title}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.45, delay: idx * 0.08 }}
                                className="group relative rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-soft transition-all duration-250 ease-out hover:-translate-y-1 hover:border-brand-accent/30 hover:shadow-lift flex flex-col justify-between"
                            >
                                <div>
                                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-accent/15 text-brand-dark transition-transform duration-300 group-hover:scale-105">
                                        <val.icon className="h-5 w-5" />
                                    </div>
                                    <h4 className="font-display text-[16px] font-bold text-[#111827] mt-5">{val.title}</h4>
                                    <p className="mt-2.5 text-xs text-[#4B5563] leading-relaxed">{val.text}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* AWARDS & RECOGNITION */}
            <section className="py-20 sm:py-28 bg-[#FAFCFF] relative overflow-hidden">
                <div className="mx-auto max-w-[76rem] px-6">
                    {/* Header */}
                    <div className="mb-10">
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-xs uppercase tracking-[0.28em] text-brand-green font-bold"
                        >
                            Honours &amp; Laurels
                        </motion.p>
                        <motion.h2
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mt-3 font-display text-[2.25rem] leading-[1.1] text-[#111827] sm:text-4xl tracking-tight font-bold"
                        >
                            Awards &amp; Recognition
                        </motion.h2>
                        <div className="mt-5 text-[15px] leading-relaxed text-[#4B5563] max-w-4xl space-y-3">
                            <p>
                                The following awards and honours stand as a testament to the unwavering dedication, selfless service, and meaningful contributions of Balivada Shivakumar Patnaik towards society.
                            </p>
                            <p>
                                Each recognition reflects years of commitment to humanitarian service, community welfare, and inspiring positive change.
                            </p>
                        </div>
                        
                        {/* Compact Stat Badge */}
                        <div className="mt-6 flex items-center gap-6">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.96 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="rounded-2xl border border-[#E5E7EB] bg-white px-5 py-4 shadow-soft flex items-center gap-4"
                            >
                                <span className="font-display text-3xl font-black text-brand-green tracking-tight shrink-0">
                                    15+
                                </span>
                                <div>
                                    <p className="text-xs font-bold text-[#111827] uppercase tracking-wider">Awards &amp; Honours</p>
                                    <p className="text-[11px] text-[#4B5563] mt-0.5 leading-relaxed">Recognitions achieved over a legacy of public welfare and community leadership.</p>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Split Grid: Award List Left & Image Right */}
                    <div className="grid gap-10 md:grid-cols-[1.25fr_0.75fr] border-t border-[#E5E7EB] pt-8 items-start">
                        
                        {/* LEFT: Award List (Strict 2-Column aligned table) */}
                        <div className="grid gap-4 sm:grid-cols-2">
                            {awardNames.map((name, i) => (
                                <motion.div
                                    key={name}
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: '-20px' }}
                                    transition={{ duration: 0.45, delay: Math.min(i, 6) * 0.05 }}
                                    className="group relative flex items-start gap-3.5 py-4 border-b border-[#E5E7EB] cursor-pointer transition-all duration-250 ease-out hover:translate-x-1"
                                >
                                    <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand-accent/15 text-brand-dark transition-transform duration-300 group-hover:scale-105">
                                        <Award className="h-4 w-4" />
                                    </div>
                                    <div className="flex-grow pr-4">
                                        <h4 className="font-display text-[14px] font-semibold leading-snug text-[#111827] group-hover:text-brand-green transition-colors duration-250">
                                            {name}
                                        </h4>
                                    </div>
                                    <ArrowUpRight className="h-3.5 w-3.5 text-brand-green opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 shrink-0 self-center" />
                                </motion.div>
                            ))}
                        </div>

                        {/* RIGHT: Uploaded Awards Image */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            onClick={() => setLightbox(1)} // opens index 1: IMG.trophies in galleryImages
                            className="group relative overflow-hidden rounded-[24px] border border-[#E5E7EB] bg-white p-2.5 shadow-soft hover:shadow-lift transition-all duration-300 cursor-pointer h-full min-h-[16rem] lg:min-h-[22rem] flex flex-col justify-center"
                        >
                            <div 
                                onClick={(e) => { e.stopPropagation(); setLightbox(1); }}
                                className="overflow-hidden rounded-[16px] relative w-full h-full aspect-[4/3] sm:aspect-auto sm:flex-grow"
                            >
                                <img
                                    src={activeTrophiesImg}
                                    alt="Main awards and recognition trophies"
                                    onClick={() => setLightbox(1)}
                                    className="w-full h-full object-cover filter transition-all duration-300 group-hover:brightness-105 group-hover:scale-[1.02]"
                                />
                                
                                {/* Hover Overlay View */}
                                <div className="absolute inset-0 bg-[#0B1220]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-4 py-2 text-xs font-semibold text-brand-green shadow-soft">
                                        <Eye className="h-4 w-4" />
                                        View Award
                                    </span>
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* ONE SINGLE AWARDS & RECOGNITION GALLERY (MOMENTS OF RECOGNITION) */}
            <section className="py-20 sm:py-24 bg-[#EEF5FF] border-t border-[#E5E7EB]">
                <div className="mx-auto max-w-[76rem] px-6">
                    <div className="mb-12 text-center sm:text-left">
                        <h3 className="font-display text-3xl font-bold text-[#111827]">Moments of Recognition</h3>
                        <p className="mt-2 text-sm text-[#4B5563]">A glimpse into the honours and recognitions received over the years.</p>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {activeGalleryImages.map((img, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                onClick={() => setLightbox(idx)}
                                className="group relative overflow-hidden rounded-2xl border border-white bg-white p-2.5 shadow-soft hover:shadow-lift transition-all duration-500 cursor-pointer"
                            >
                                <div className="overflow-hidden rounded-xl aspect-[4/3] relative">
                                    <img
                                        src={img.src}
                                        alt={img.caption}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                                    />
                                    
                                    {/* Hover Overlay View */}
                                    <div className="absolute inset-0 bg-[#0B1220]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-4 py-2 text-xs font-semibold text-brand-green shadow-soft">
                                            <Eye className="h-4 w-4" />
                                            View
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* VOICES (TESTIMONIALS) */}
            <section className="relative overflow-hidden py-24 sm:py-32 bg-[#FAFCFF]">
                <div className="mx-auto max-w-[62rem] px-6 text-center">
                    <Reveal>
                        <p className="text-xs uppercase tracking-[0.28em] text-brand-green">Voices</p>
                        <h2 className="mt-4 font-display text-4xl leading-[1.08] text-[#111827] sm:text-5xl">
                            What the villages say
                        </h2>
                    </Reveal>

                    <div className="relative mt-14 min-h-[19rem] sm:min-h-[15rem]">
                        <AnimatePresence mode="wait">
                            <motion.blockquote
                                key={slide}
                                initial={{ opacity: 0, y: 18 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -14 }}
                                transition={{ duration: 0.45, ease: 'easeOut' }}
                                className="glass mx-auto rounded-[2rem] border border-white/80 p-9 shadow-soft sm:p-12"
                            >
                                <Quote className="mx-auto h-7 w-7 text-brand-accent" strokeWidth={1.5} />
                                <p className="mt-6 font-display text-[21px] leading-[1.7] text-[#111827] sm:text-[24px]">
                                    {testimonials[slide].quote}
                                </p>
                                <footer className="mt-7 text-sm text-[#4B5563]">
                                    <span className="font-medium text-brand-green">{testimonials[slide].name}</span>
                                    {` · ${testimonials[slide].role}`}
                                </footer>
                            </motion.blockquote>
                        </AnimatePresence>
                    </div>

                    <div className="mt-8 flex justify-center gap-2">
                        {testimonials.map((t, i) => (
                            <button
                                key={t.name}
                                aria-label={`Show testimonial from ${t.name}`}
                                onClick={() => setSlide(i)}
                                className={`h-2.5 rounded-full transition-all duration-300 ${i === slide ? 'w-8 bg-brand-green' : 'w-2.5 bg-brand-green/25 hover:bg-brand-green/50'}`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section id="faq" className="bg-[#EEF5FF] py-24 sm:py-32">
                <div className="mx-auto max-w-[56rem] px-6">
                    <Reveal>
                        <h2 className="font-display text-4xl leading-[1.08] text-[#111827] sm:text-5xl">Questions, answered</h2>
                    </Reveal>
                    <div className="mt-12 space-y-3">
                        {faqs.map((f, i) => (
                            <Reveal key={f.q} delay={i * 0.05}>
                                <div className="overflow-hidden rounded-[1.5rem] border border-[#E5E7EB] bg-white shadow-soft transition-colors duration-200 hover:border-[#3B82F6]/40">
                                    <button
                                        onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                                        className="flex w-full items-center justify-between gap-6 px-7 py-6 text-left"
                                    >
                                        <span className="text-[17px] font-medium text-[#111827]">{f.q}</span>
                                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#EEF5FF] text-[#0F4CBA] transition-transform duration-200 active:scale-90">
                                            {openFaq === i ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                                        </span>
                                    </button>
                                    <AnimatePresence initial={false}>
                                        {openFaq === i && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.25, ease: 'easeOut' }}
                                            >
                                                <p className="px-7 pb-7 text-[16px] leading-relaxed text-[#4B5563]">{f.a}</p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* CLOSING MESSAGE */}
            <section className="py-20 sm:py-24 bg-[#FAFCFF] border-t border-[#E5E7EB]">
                <div className="mx-auto max-w-[48rem] px-6 text-center">
                    <Reveal>
                        <blockquote className="font-display text-[22px] sm:text-[26px] leading-snug text-[#111827] font-medium">
                            “Every award represents the trust, appreciation, and blessings of the people we serve.”
                        </blockquote>
                        <div className="mx-auto mt-6 h-[2px] w-20 bg-brand-accent" />
                        <p className="mt-6 font-display text-[15px] font-bold text-[#4B5563]">
                            Service continues.
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* LIGHTBOX MODAL */}
            <AnimatePresence>
                {lightbox !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] flex items-center justify-center bg-[#0B1220]/80 p-4 backdrop-blur-md"
                        onClick={() => setLightbox(null)}
                    >
                        <motion.figure
                            initial={{ opacity: 0, scale: 0.96 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.96 }}
                            transition={{ duration: 0.22, ease: 'easeOut' }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-[2rem] border border-white p-4 shadow-lift max-w-3xl w-full max-h-[85vh] flex flex-col items-center overflow-hidden"
                        >
                            <div className="relative w-full h-[60vh] flex items-center justify-center bg-[#FAFCFF] rounded-2xl overflow-hidden">
                                <img
                                    src={activeGalleryImages[lightbox].src}
                                    alt={activeGalleryImages[lightbox].caption}
                                    className="max-h-full max-w-full object-contain rounded-xl p-2"
                                />
                                
                                <button
                                    onClick={() => setLightbox(null)}
                                    className="absolute top-4 right-4 h-10 w-10 bg-white rounded-full text-brand-dark shadow-soft hover:bg-brand-accent/10 transition-all duration-200 grid place-items-center"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>
                            
                            <figcaption className="mt-4 text-center font-display text-sm font-semibold text-[#111827] px-6">
                                {activeGalleryImages[lightbox].caption}
                            </figcaption>
                        </motion.figure>

                        {[
                            { Icon: ChevronLeft, cls: 'left-4', act: () => setLightbox((i) => (i - 1 + activeGalleryImages.length) % activeGalleryImages.length), label: 'Previous image' },
                            { Icon: ChevronRight, cls: 'right-4', act: () => setLightbox((i) => (i + 1) % activeGalleryImages.length), label: 'Next image' }
                        ].map(({ Icon, cls, act, label }) => (
                            <button
                                key={label}
                                aria-label={label}
                                onClick={(e) => { e.stopPropagation(); act(); }}
                                className={`absolute ${cls} top-1/2 -translate-y-1/2 grid h-11 w-11 place-items-center rounded-full bg-white/90 text-brand-dark shadow-lift transition-all duration-200 hover:scale-105 active:scale-95 hover:text-brand-green`}
                            >
                                <Icon className="h-5 w-5" />
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            <Footer />
        </div>
    );
};

export default AboutPage;
