import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, MessageCircle } from 'lucide-react';
import PillButton from '@/components/site/PillButton';

const Footer = () => {
    return (
        <footer className="bg-brand-dark py-24 text-white/80 border-t border-brand-green/20 relative overflow-hidden">
            <div className="relative z-10 mx-auto max-w-[78rem] px-6">
                <div className="grid gap-14 md:grid-cols-3 lg:grid-cols-[1.6fr_1fr_1fr]">
                    <div>
                        <p className="font-display text-2xl tracking-[-0.02em] text-white">balivada ramarao PATNAIK</p>
                        <p className="mt-1 text-xs uppercase tracking-[0.22em] text-white/50">Charitable Trust</p>
                        <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-white/65">
                            A volunteer-led trust serving villages across Andhra Pradesh with education, healthcare,
                            food relief and livelihood training since 1992.
                        </p>
                        <div className="mt-6 flex gap-3">
                            {[
                                { Icon: Facebook, href: 'https://www.facebook.com/share/1EoJ59cEqg/' },
                                { Icon: Instagram, href: 'https://www.instagram.com/patnaikbsk?igsh=MWsyN3g4cHl2cWF2YQ==' },
                                { Icon: Youtube, href: 'https://youtube.com/@bskpatnaik4914?si=1QIyl1XBp0lgHLg2' },
                            ].map((item, i) => (
                                <a
                                    key={i}
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Social profile"
                                    className="grid h-10 w-10 place-items-center rounded-full border border-white/15 transition-all duration-200 hover:-translate-y-1 hover:border-white/40 hover:bg-white/10 active:scale-95"
                                >
                                    <item.Icon className="h-4 w-4" strokeWidth={1.7} />
                                </a>
                            ))}
                        </div>
                    </div>
                    <div>
                        <p className="text-sm uppercase tracking-[0.18em] text-white/50">Quick links</p>
                        <ul className="mt-5 space-y-3 text-[15px]">
                            {[
                                { to: '/', label: 'Home' },
                                { to: '/about', label: 'About' },
                                { to: '/services', label: 'Services' },
                                { to: '/gallery', label: 'Gallery' },
                            ].map((link) => (
                                <li key={link.to}>
                                    <Link
                                        to={link.to}
                                        className="capitalize transition-all duration-200 hover:translate-x-1 hover:text-white inline-block"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <p className="text-sm uppercase tracking-[0.18em] text-white/50">Support</p>
                        <ul className="mt-5 space-y-3 text-[15px]">
                            {[
                                { to: '/donate', label: 'Donate' },
                                { to: '/contact', label: 'Contact' },
                            ].map((link) => (
                                <li key={link.to}>
                                    <Link
                                        to={link.to}
                                        className="inline-block transition-all duration-200 hover:translate-x-1 hover:text-white"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="mt-14 border-t border-white/10 pt-8 text-sm text-white/50">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <p>© {new Date().getFullYear()} balivada ramarao PATNAIK charitable trust. All rights reserved.</p>
                        <p>Registered charitable trust · Andhra Pradesh, India</p>
                    </div>
                    <div className="mt-8 text-center text-xs text-white/40 tracking-[0.08em]">
                        Created by <span className="text-white/60 font-semibold">Avinash Patnaik</span>
                    </div>
                </div>
            </div>

            <a
                href="https://wa.me/919290834533"
                target="_blank"
                rel="noreferrer"
                aria-label="Chat with us on WhatsApp"
                className="fixed bottom-6 right-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-brand-accent text-brand-dark shadow-lift transition-all duration-300 hover:-translate-y-1 hover:bg-[#c9e448] active:scale-95"
            >
                <MessageCircle className="h-6 w-6" strokeWidth={1.8} />
            </a>
        </footer>
    );
};

export default Footer;
