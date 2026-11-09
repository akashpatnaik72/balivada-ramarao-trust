import React, { useState } from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import Navbar from '@/components/site/Navbar';
import Footer from '@/components/site/Footer';
import PillButton from '@/components/site/PillButton';
import Reveal from '@/components/Reveal';
import Seo from '@/components/Seo';
import { cn } from '@/lib/utils';

const ContactPage = () => {
    const [cName, setCName] = useState('');
    const [cPhone, setCPhone] = useState('');
    const [cMsg, setCMsg] = useState('');
    const [cError, setCError] = useState('');
    const [shake, setShake] = useState(false);

    const handleWhatsAppSend = (e) => {
        e.preventDefault();
        setCError('');

        const name = cName.trim();
        const phone = cPhone.trim();
        const msg = cMsg.trim();

        if (!name) {
            setCError('Please enter your name.');
            setShake(true);
            window.setTimeout(() => setShake(false), 500);
            return;
        }

        let message = `Hello! \uD83D\uDC4B\n\nI'm ${name}.\n`;
        if (phone) {
            message += `Phone: ${phone}\n`;
        }
        message += `\n${msg || "I would like to know more about your services."}\n\nThank you!`;

        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/919290834533?text=${encodedMessage}`, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="min-h-screen bg-[#FAFCFF]">
            <Seo
                title="Contact Us - balivada ramarao PATNAIK charitable trust"
                description="Get in touch with us. Send us a message via WhatsApp, call us, or visit our office in Vijayawada."
                siteName="balivada ramarao PATNAIK charitable trust"
            />

            <Navbar />

            {/* CONTACT SECTION */}
            <section className="pb-24 pt-36 sm:pb-32 sm:pt-44 relative overflow-hidden">
                <div className="mx-auto max-w-[78rem] px-6">
                    <Reveal>
                        <div className="max-w-2xl editorial-rule">
                            <p className="text-xs uppercase tracking-[0.28em] text-brand-green font-semibold">Reach us</p>
                            <h2 className="mt-4 font-display text-4xl leading-[1.08] text-[#111827] sm:text-5xl">Get in touch</h2>
                            <p className="mt-5 text-[17px] leading-relaxed text-[#4B5563]">
                                Volunteer, request a camp in your village, or ask anything about our work.
                            </p>
                        </div>
                    </Reveal>

                    <div className="mt-14 grid gap-5 sm:grid-cols-3">
                        {[
                            { icon: Phone, label: 'Call us', value: '+91 9290834533', href: 'tel:+919290834533' },
                            { icon: Mail, label: 'Email', value: 'bskpatnaik3333@gmail.com', href: 'mailto:bskpatnaik3333@gmail.com' },
                            { icon: MapPin, label: 'Office', value: 'Patnaik Towers, Cholera Hospital, Chittinagar, Vijayawada', href: '#contact' },
                        ].map((c, i) => (
                            <Reveal key={c.label} delay={i * 0.06}>
                                <a
                                    href={c.href}
                                    className="group flex h-full flex-col rounded-[1.75rem] border border-white/90 bg-white/85 p-7 shadow-soft transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-brand-accent/30 hover:shadow-lift"
                                >
                                    <span className="grid h-12 w-12 place-items-center rounded-full bg-brand-accent text-brand-dark transition-transform duration-300 group-hover:scale-110">
                                        <c.icon className="h-5 w-5" strokeWidth={1.7} />
                                    </span>
                                    <span className="mt-5 text-xs uppercase tracking-[0.18em] text-brand-green font-semibold">{c.label}</span>
                                    <span className="mt-2 text-[16px] leading-relaxed text-brand-dark">{c.value}</span>
                                </a>
                            </Reveal>
                        ))}
                    </div>

                    <div className="mt-6 grid gap-6 lg:grid-cols-2">
                        <Reveal>
                            <form
                                onSubmit={handleWhatsAppSend}
                                className={cn(
                                    "rounded-[2rem] border border-white/90 bg-white/85 p-8 shadow-soft transition-shadow duration-500 hover:shadow-lift sm:p-10",
                                    shake && "animate-shake"
                                )}
                            >
                                <div className="grid gap-5 sm:grid-cols-2">
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="c-name" className="text-sm text-[#4B5563]">Name *</label>
                                        <input
                                            id="c-name"
                                            type="text"
                                            value={cName}
                                            onChange={(e) => setCName(e.target.value)}
                                            placeholder="Your name"
                                            className="w-full rounded-2xl border border-[#E5E7EB] bg-brand-cream/20 px-4 py-3 text-[15px] transition-all duration-200 focus:border-brand-accent focus:outline-none focus:ring-4 focus:ring-brand-accent/20"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="c-phone" className="text-sm text-[#4B5563]">Phone Number</label>
                                        <input
                                            id="c-phone"
                                            type="tel"
                                            value={cPhone}
                                            onChange={(e) => setCPhone(e.target.value)}
                                            placeholder="10-digit mobile"
                                            className="w-full rounded-2xl border border-[#E5E7EB] bg-brand-cream/20 px-4 py-3 text-[15px] transition-all duration-200 focus:border-brand-accent focus:outline-none focus:ring-4 focus:ring-brand-accent/20"
                                        />
                                    </div>
                                </div>
                                <div className="mt-5 flex flex-col gap-2">
                                    <label htmlFor="c-msg" className="text-sm text-[#4B5563]">How can we help?</label>
                                    <textarea
                                        id="c-msg"
                                        rows={4}
                                        value={cMsg}
                                        onChange={(e) => setCMsg(e.target.value)}
                                        placeholder="Hi, I'm interested in your services. I'd like to know more about..."
                                        className="w-full rounded-2xl border border-[#E5E7EB] bg-brand-cream/20 px-4 py-3 text-[15px] transition-all duration-200 focus:border-brand-accent focus:outline-none focus:ring-4 focus:ring-brand-accent/20"
                                    />
                                </div>
                                {cError && <p className="text-sm text-[#B42318] mt-3">{cError}</p>}
                                <PillButton type="submit" className="mt-7 w-full sm:w-auto">
                                    Send via WhatsApp
                                </PillButton>
                                <p className="mt-4 text-sm text-[#4B5563]">
                                    We reply within one working day.
                                </p>
                            </form>
                        </Reveal>
                        <Reveal delay={0.08}>
                            <div className="h-full overflow-hidden rounded-[2rem] border border-white/90 bg-white p-3 shadow-soft transition-shadow duration-500 hover:shadow-lift">
                                <iframe
                                    title="Trust office location on Google Maps"
                                    src="https://www.google.com/maps?q=Patnaik+Towers%2C+Cholera+Hospital%2C+Chittinagar%2C+Vijayawada&output=embed"
                                    loading="lazy"
                                    className="h-[26rem] w-full rounded-[1.5rem] border-0 lg:h-full"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default ContactPage;
