import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, HeartHandshake } from 'lucide-react';
import PillButton from '@/components/site/PillButton';
import { cn } from '@/lib/utils';

const links = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/services', label: 'Services' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/donate', label: 'Donate' },
    { path: '/contact', label: 'Contact' },
];

const menuVariants = {
    closed: {
        opacity: 0,
        scale: 0.96,
        transition: {
            staggerChildren: 0.04,
            staggerDirection: -1
        }
    },
    open: {
        opacity: 1,
        scale: 1,
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0.04
        }
    }
};

const itemVariants = {
    closed: { opacity: 0, x: -8, transition: { duration: 0.12 } },
    open: { opacity: 1, x: 0, transition: { duration: 0.2, ease: 'easeOut' } }
};

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const { pathname } = useLocation();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <header
            className={cn(
                'fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-out',
                scrolled ? 'py-1.5' : 'py-2.5',
            )}
        >
            <nav
                className={cn(
                    'mx-auto flex max-w-[84rem] items-center justify-between gap-4 rounded-full px-4 sm:px-5 transition-all duration-300 ease-out',
                    scrolled ? 'glass border border-white/70 shadow-soft py-1.5 mx-3 sm:mx-4 lg:mx-auto' : 'border border-transparent py-2 mx-3 sm:mx-4 lg:mx-auto',
                )}
            >
                <Link
                    to="/"
                    className="group flex items-center gap-2.5 rounded-full pr-3 text-left transition-transform duration-200 active:scale-[0.98]"
                >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-accent text-brand-dark shadow-soft transition-transform duration-300 group-hover:scale-105">
                        <HeartHandshake className="h-4.5 w-4.5" strokeWidth={1.75} />
                    </span>
                    <span className="leading-tight">
                        <span className="block font-display text-[13px] font-semibold tracking-[-0.01em] text-[#111827]">Balivada Ramarao PATNAIK</span>
                        <span className="block text-[9px] uppercase tracking-[0.2em] text-[#4B5563]">Charitable Trust</span>
                    </span>
                </Link>

                <div className="hidden items-center gap-1 lg:flex">
                    {links.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={cn(
                                "relative rounded-full px-3 py-1.5 text-[13px] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/40",
                                pathname === link.path ? "text-brand-dark font-semibold" : "text-brand-dark/70 hover:text-brand-dark",
                                pathname !== link.path && "after:absolute after:bottom-1.5 after:left-4 after:right-4 after:h-[1.5px] after:bg-brand-accent after:scale-x-0 hover:after:scale-x-100 after:origin-center after:transition-transform after:duration-200"
                            )}
                        >
                            {pathname === link.path && (
                                <motion.span
                                    layoutId="nav-active"
                                    className="absolute inset-0 rounded-full bg-brand-accent/15"
                                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                                />
                            )}
                            <span className="relative">{link.label}</span>
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-2">
                    <Link to="/donate" className="hidden sm:inline-flex">
                        <PillButton as="span" className="px-6">
                            Donate
                        </PillButton>
                    </Link>
                    <button
                        onClick={() => setOpen((v) => !v)}
                        aria-label="Toggle menu"
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E5E7EB] bg-white/80 text-brand-dark hover:text-brand-green transition-transform duration-200 active:scale-95 lg:hidden"
                    >
                        {open ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
                    </button>
                </div>
            </nav>

            <AnimatePresence>
                {open && (
                    <motion.div
                        variants={menuVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        className="mx-4 mt-2 rounded-3xl border border-white/70 glass p-3 shadow-lift lg:hidden flex flex-col gap-0.5"
                    >
                        {links.map((link) => (
                            <motion.div key={link.path} variants={itemVariants}>
                                <Link
                                    to={link.path}
                                    onClick={() => setOpen(false)}
                                    className={cn(
                                        "block w-full rounded-2xl px-4 py-3 text-left text-[15px] transition-colors duration-150",
                                        pathname === link.path ? "bg-brand-accent/15 text-brand-dark font-semibold" : "text-brand-dark hover:bg-brand-accent/10 hover:text-brand-dark"
                                    )}
                                >
                                    {link.label}
                                </Link>
                            </motion.div>
                        ))}
                        <motion.div variants={itemVariants} className="mt-2">
                            <Link to="/donate" onClick={() => setOpen(false)} className="block">
                                <PillButton as="span" className="w-full">
                                    Donate now
                                </PillButton>
                            </Link>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;
