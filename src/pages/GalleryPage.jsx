import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Eye } from 'lucide-react';
import Navbar from '@/components/site/Navbar';
import Footer from '@/components/site/Footer';
import Reveal from '@/components/Reveal';
import Seo from '@/components/Seo';
import { supabase } from '@/lib/supabaseClient';

import imgEducation1 from '@/assets/image .jpeg';
import imgEducation2 from '@/assets/image 1.jpeg';
import imgEducation3 from '@/assets/image 2.jpeg';
import imgEducation4 from '@/assets/image 3.jpeg';
import imgEducation5 from '@/assets/image 4.jpeg';

import imgEdu1 from '@/assets/edu 1.jpeg';
import imgEdu2 from '@/assets/edu 2 .jpeg';
import imgEdu3 from '@/assets/edu 3.jpeg';
import imgEdu4 from '@/assets/edu 4.jpeg';
import imgEdu5 from '@/assets/edu 5.jpeg';
import imgEdu6 from '@/assets/edu 6.jpeg';
import imgEdu7 from '@/assets/edu 7.jpeg';
import imgEdu8 from '@/assets/edu 8.jpeg';

import imgWemp1 from '@/assets/wemp 1.jpeg';
import imgWemp2 from '@/assets/wemp 2.jpeg';
import imgWemp3 from '@/assets/wemp 3 .jpeg';
import imgWemp4 from '@/assets/wemp 4.jpeg';
import imgWemp5 from '@/assets/wemp 5.jpeg';

import imgHealth1 from '@/assets/h 1.jpeg';
import imgHealth2 from '@/assets/h 2.jpeg';
import imgHealth3 from '@/assets/h 3.jpeg';
import imgHealth4 from '@/assets/h 4.jpeg';

import imgCovid1 from '@/assets/covid.jpeg';
import imgCovid2 from '@/assets/covid 1.jpeg';
import imgCovid3 from '@/assets/covid 2.jpeg';
import imgCovid4 from '@/assets/covid 3.jpeg';
import imgCovid5 from '@/assets/covid 4.jpeg';
import imgCovid6 from '@/assets/covid 5.jpeg';
import imgCovid7 from '@/assets/covid 6.jpeg';
import imgCovid8 from '@/assets/covid 7.jpeg';
import imgCovid9 from '@/assets/covid 8.jpeg';
import imgCovid10 from '@/assets/covid 9.jpeg';
import imgCovid11 from '@/assets/covid 10.jpeg';
import imgCovid12 from '@/assets/covid11.jpeg';
import imgCovid13 from '@/assets/covid 12.jpeg';
import imgCovid14 from '@/assets/covid 13.jpeg';
import imgCovid15 from '@/assets/covid 14.jpeg';
import imgCovid16 from '@/assets/covid 15.jpeg';
import imgCovid17 from '@/assets/covid 16.jpeg';
import imgCovid18 from '@/assets/covid 17.jpeg';
import imgCovid20 from '@/assets/covid 20.jpeg';
import imgCovid21 from '@/assets/covid 21.jpeg';
import imgCovid22 from '@/assets/covid 22.jpeg';
import imgCovid23 from '@/assets/covid 23.jpeg';
import imgCovid24 from '@/assets/covid 24.jpeg';
import imgCovid25 from '@/assets/covid 25.jpeg';

const IMG = {
    school: 'https://images.hostinger.com/694a504c-806e-4a98-b2e9-a6b5aa1b79e7.png',
    medical: 'https://images.hostinger.com/a30e70f1-6b2b-4b29-b9bb-e5b3535f077d.png',
    meals: 'https://images.hostinger.com/a4aeb330-e0dd-428f-89b1-3df350ace527.png',
    tailoring: 'https://images.hostinger.com/b7527eea-e64b-4d79-804e-58f2942e3a8c.png',
    trees: 'https://images.hostinger.com/c92e91df-7b9b-4848-b9bc-4053cbc8c61c.png',
    blood: 'https://images.hostinger.com/bbfb8a9a-4dec-4736-beee-4f8749e75d7d.png',
    elders: 'https://images.hostinger.com/1dee6357-62b4-4aa0-9d4c-10e4bd61372e.png',
    stage: 'https://images.hostinger.com/7d8f377e-b547-4c78-b999-93aa363d3f07.png',
    trophies: 'https://images.hostinger.com/1934db4c-6537-4338-a109-65862a815a46.png',
};

const gallery = [
    { src: IMG.school, category: 'Community', caption: 'School kit distribution, Ramachandrapuram' },
    { src: IMG.medical, category: 'Healthcare', caption: 'Free health camp for village elders' },
    { src: IMG.meals, category: 'Food', caption: 'Annadanam during the monsoon floods' },
    { src: IMG.tailoring, category: 'Women Empowerment', caption: 'Tailoring batch for self-help group women' },
    { src: IMG.trees, category: 'Community', caption: 'Roadside plantation with student eco-club' },
    { src: IMG.blood, category: 'Healthcare', caption: 'Voluntary blood donation camp' },
    { src: IMG.elders, category: 'Community', caption: 'Monthly support for elderly couples' },
    { src: IMG.stage, category: 'Community', caption: 'Felicitation at a civic service ceremony' },
    { src: IMG.trophies, category: 'Community', caption: 'Awards received over three decades' },
];

const categories = ['Education', 'Healthcare', 'Community', 'Women Empowerment', 'COVID-19', 'Food'];

const getPhotoCategory = (item) => {
    if (item.category) return item.category;
    const caption = (item.caption || '').toLowerCase();
    if (caption.includes('school') || caption.includes('education') || caption.includes('class') || caption.includes('student')) {
        return 'Education';
    }
    if (caption.includes('medical') || caption.includes('health') || caption.includes('doctor') || caption.includes('camp') || caption.includes('blood') || caption.includes('surgery')) {
        return 'Healthcare';
    }
    if (caption.includes('food') || caption.includes('annadanam') || caption.includes('meals') || caption.includes('ration') || caption.includes('juice')) {
        return 'Food';
    }
    if (caption.includes('tailor') || caption.includes('women') || caption.includes('sewing')) {
        return 'Women Empowerment';
    }
    if (caption.includes('covid') || caption.includes('lockdown') || caption.includes('pandemic')) {
        return 'COVID-19';
    }
    return 'Community';
};

const GalleryPage = () => {
    const [lightbox, setLightbox] = useState(null);
    const [supabasePhotos, setSupabasePhotos] = useState([]);
    const [activeCategory, setActiveCategory] = useState('Education');
    const [visibleCount, setVisibleCount] = useState(8);

    // Fetch photos from Supabase Storage for the active category
    useEffect(() => {
        setSupabasePhotos([]);

        const fetchCategoryPhotos = async () => {
            if (!supabase) return;

            try {
                const { data, error } = await supabase.storage.from('galleryy').list(activeCategory);
                if (error) throw error;
                if (data) {
                    const photos = data
                        .filter(file => file.name !== '.emptyFolderPlaceholder')
                        .map(file => {
                            const { data: urlData } = supabase.storage.from('galleryy').getPublicUrl(`${activeCategory}/${file.name}`);
                            return {
                                src: urlData.publicUrl,
                                category: activeCategory,
                                caption: file.name.substring(file.name.indexOf('_') + 1)
                            };
                        });
                    setSupabasePhotos(photos);
                }
            } catch (err) {
                console.error("Error fetching photos from Supabase storage:", err);
            }
        };
        fetchCategoryPhotos();
    }, [activeCategory]);

    const activeGallery = activeCategory === 'Education'
        ? [
            { src: imgEducation1, category: 'Education', caption: '' },
            { src: imgEducation2, category: 'Education', caption: '' },
            { src: imgEducation3, category: 'Education', caption: '' },
            { src: imgEducation4, category: 'Education', caption: '' },
            { src: imgEducation5, category: 'Education', caption: '' },
            { src: imgEdu1, category: 'Education', caption: '' },
            { src: imgEdu2, category: 'Education', caption: '' },
            { src: imgEdu3, category: 'Education', caption: '' },
            { src: imgEdu4, category: 'Education', caption: '' },
            { src: imgEdu5, category: 'Education', caption: '' },
            { src: imgEdu6, category: 'Education', caption: '' },
            { src: imgEdu7, category: 'Education', caption: '' },
            { src: imgEdu8, category: 'Education', caption: '' },
          ]
        : activeCategory === 'COVID-19'
        ? [
            { src: imgCovid1, category: 'COVID-19', caption: '' },
            { src: imgCovid2, category: 'COVID-19', caption: '' },
            { src: imgCovid3, category: 'COVID-19', caption: '' },
            { src: imgCovid4, category: 'COVID-19', caption: '' },
            { src: imgCovid5, category: 'COVID-19', caption: '' },
            { src: imgCovid6, category: 'COVID-19', caption: '' },
            { src: imgCovid7, category: 'COVID-19', caption: '' },
            { src: imgCovid8, category: 'COVID-19', caption: '' },
            { src: imgCovid9, category: 'COVID-19', caption: '' },
            { src: imgCovid10, category: 'COVID-19', caption: '' },
            { src: imgCovid11, category: 'COVID-19', caption: '' },
            { src: imgCovid12, category: 'COVID-19', caption: '' },
            { src: imgCovid13, category: 'COVID-19', caption: '' },
            { src: imgCovid14, category: 'COVID-19', caption: '' },
            { src: imgCovid15, category: 'COVID-19', caption: '' },
            { src: imgCovid16, category: 'COVID-19', caption: '' },
            { src: imgCovid17, category: 'COVID-19', caption: '' },
            { src: imgCovid18, category: 'COVID-19', caption: '' },
            { src: imgCovid20, category: 'COVID-19', caption: '' },
            { src: imgCovid21, category: 'COVID-19', caption: '' },
            { src: imgCovid22, category: 'COVID-19', caption: '' },
            { src: imgCovid23, category: 'COVID-19', caption: '' },
            { src: imgCovid24, category: 'COVID-19', caption: '' },
            { src: imgCovid25, category: 'COVID-19', caption: '' },
          ]
        : activeCategory === 'Women Empowerment'
        ? [
            { src: IMG.tailoring, category: 'Women Empowerment', caption: '' },
            { src: imgWemp1, category: 'Women Empowerment', caption: '' },
            { src: imgWemp2, category: 'Women Empowerment', caption: '' },
            { src: imgWemp3, category: 'Women Empowerment', caption: '' },
            { src: imgWemp4, category: 'Women Empowerment', caption: '' },
            { src: imgWemp5, category: 'Women Empowerment', caption: '' },
          ]
        : activeCategory === 'Healthcare'
        ? [
            ...supabasePhotos,
            { src: imgHealth1, category: 'Healthcare', caption: '' },
            { src: imgHealth2, category: 'Healthcare', caption: '' },
            { src: imgHealth3, category: 'Healthcare', caption: '' },
            { src: imgHealth4, category: 'Healthcare', caption: '' },
          ]
        : activeCategory === 'Community'
        ? [
            ...supabasePhotos
          ]
        : activeCategory === 'Food'
        ? [
            ...supabasePhotos
          ]
        : [];

    const visibleGallery = activeGallery.slice(0, visibleCount);

    useEffect(() => {
        if (lightbox === null) return undefined;

        const onKey = (e) => {
            if (e.key === 'Escape') setLightbox(null);
            if (e.key === 'ArrowRight') setLightbox((i) => (i + 1) % activeGallery.length);
            if (e.key === 'ArrowLeft') setLightbox((i) => (i - 1 + activeGallery.length) % activeGallery.length);
        };

        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [lightbox, activeGallery]);

    return (
        <div className="min-h-screen bg-[#FAF9F5] text-brand-dark">
            <Seo
                title="Photo Gallery - balivada ramarao PATNAIK charitable trust"
                description="Visual highlights from free diagnostics camps, flood relief campaigns, student supplies distribution, and green village activities."
                siteName="balivada ramarao PATNAIK charitable trust"
            />

            <Navbar />

            {/* GALLERY SECTION */}
            <section className="pb-24 pt-36 sm:pb-32 sm:pt-44 relative overflow-hidden">
                <div className="mx-auto max-w-[80rem] px-6">
                    <Reveal>
                        <div className="max-w-2xl editorial-rule">
                            <p className="text-xs uppercase tracking-[0.28em] text-brand-green font-semibold">In the field</p>
                            <h2 className="mt-4 font-display text-4xl leading-[1.08] text-brand-dark sm:text-5xl">Gallery</h2>
                            <p className="mt-5 text-[17px] leading-relaxed text-brand-dark/70">
                                Moments from camps, classrooms, kitchens and plantation drives.
                            </p>
                        </div>
                    </Reveal>

                    {/* Category Filter Tabs */}
                    <div className="mt-10 flex gap-2.5 overflow-x-auto pb-4 scrollbar-none -mx-6 px-6 lg:mx-0 lg:px-0 lg:flex-wrap lg:justify-center">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => {
                                    setActiveCategory(cat);
                                    setVisibleCount(8);
                                }}
                                className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-brand-accent/40 ${
                                    activeCategory === cat
                                        ? 'bg-brand-green text-white shadow-soft font-semibold'
                                        : 'bg-white border border-brand-dark/10 text-brand-dark/70 hover:text-brand-dark hover:border-brand-dark/20'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="mt-10 grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        <AnimatePresence mode="popLayout">
                            {visibleGallery.map((item, i) => (
                                <motion.figure
                                    key={item.src + '_' + i}
                                    layout
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.98 }}
                                    transition={{ duration: 0.22, ease: 'easeOut' }}
                                    className="flex h-full flex-col relative"
                                >
                                    <button
                                        onClick={() => setLightbox(i)}
                                        className="group block w-full overflow-hidden rounded-[1.5rem] border border-brand-dark/5 bg-white shadow-soft transition-all duration-500 ease-out hover:-translate-y-1 hover:border-brand-accent/40 hover:shadow-lift focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-accent/30"
                                    >
                                        <div className="w-full overflow-hidden aspect-[4/3] relative">
                                            <img
                                                src={item.src}
                                                alt={item.caption}
                                                loading="lazy"
                                                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.055]"
                                            />
                                            <div className="absolute inset-0 bg-brand-dark/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                <span className="p-2.5 rounded-full bg-brand-accent text-brand-dark shadow-md scale-90 group-hover:scale-100 transition-all duration-300">
                                                    <Eye className="h-4 w-4" />
                                                </span>
                                            </div>
                                        </div>
                                    </button>

                                    {/* Temporary Remove Button (Admin Mode Only) */}

                                </motion.figure>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* View More Button */}
                    {activeGallery.length > visibleCount && (
                        <div className="mt-12 flex justify-center">
                            <button
                                onClick={() => setVisibleCount((v) => v + 4)}
                                className="rounded-full bg-brand-green text-white px-8 py-3 text-sm font-semibold hover:bg-brand-green/90 shadow-soft transition-all duration-200 active:scale-95 focus:outline-none focus:ring-4 focus:ring-brand-green/30"
                            >
                                View More
                            </button>
                        </div>
                    )}
                </div>
            </section>

            <AnimatePresence>
                {lightbox !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] flex items-center justify-center bg-[#101212]/90 p-4 backdrop-blur-md"
                        onClick={() => setLightbox(null)}
                    >
                        <motion.figure
                            initial={{ opacity: 0, scale: 0.96 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.97 }}
                            transition={{ duration: 0.22, ease: 'easeOut' }}
                            onClick={(e) => e.stopPropagation()}
                            className="max-h-[88vh] w-full max-w-4xl overflow-hidden rounded-[1.75rem] bg-white p-3"
                        >
                            <img src={activeGallery[lightbox].src} alt={activeGallery[lightbox].caption} className="max-h-[80vh] w-full rounded-[1.35rem] object-contain" />
                        </motion.figure>

                        {[
                            { Icon: ChevronLeft, cls: 'left-4', act: () => setLightbox((i) => (i - 1 + activeGallery.length) % activeGallery.length), label: 'Previous image' },
                            { Icon: ChevronRight, cls: 'right-4', act: () => setLightbox((i) => (i + 1) % activeGallery.length), label: 'Next image' },
                            { Icon: X, cls: 'right-4 top-4', act: () => setLightbox(null), label: 'Close' },
                        ].map(({ Icon, cls, act, label }) => (
                            <button
                                key={label}
                                aria-label={label}
                                onClick={(e) => { e.stopPropagation(); act(); }}
                                className={`absolute ${cls} ${label === 'Close' ? '' : 'top-1/2 -translate-y-1/2'} grid h-12 w-12 place-items-center rounded-full bg-white/90 text-[#0F4CBA] transition-all duration-200 hover:scale-105 active:scale-95`}
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

export default GalleryPage;
