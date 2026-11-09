import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Lock, BadgeCheck, QrCode, Heart, Loader2, TrendingUp, Users, IndianRupee, MessageCircle, X, Copy, ArrowRight } from 'lucide-react';
import pb from '@/lib/pocketbaseClient';
import phonepeQr from '@/assets/phonepe_qr.png';
import PillButton from '@/components/site/PillButton';
import Reveal from '@/components/Reveal';
import CountUp from '@/components/CountUp';

const GOAL = 2500000;
const UPI_ID = '9346230235@ybl';

const maskPhone = (phone = '') => {
    const digits = String(phone).replace(/\D/g, '');
    if (digits.length < 6) return '*****';

    return `${digits.slice(0, 5)}*****`;
};

const initials = (name = '') =>
    name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((w) => w[0])
        .join('')
        .toUpperCase();

const formatINR = (n) => `₹${Number(n || 0).toLocaleString('en-IN')}`;

const formatDate = (value) => {
    if (!value) return '';
    const d = new Date(String(value).replace(' ', 'T'));

    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};

const parseDonationAmount = (value) => {
    const normalized = String(value ?? '').trim();
    if (!/^\d+(?:\.\d{1,2})?$/.test(normalized)) return null;

    const amount = Number(normalized);
    return Number.isFinite(amount) && amount > 0 ? amount : null;
};

const DonateDonors = () => {
    const [donors, setDonors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [done, setDone] = useState(false);
    const [form, setForm] = useState({
        donor_name: '',
        phone_number: '',
        amount: '2500',
        city: '',
        message: '',
        anonymous: false,
    });

    const [copied, setCopied] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedApp, setSelectedApp] = useState(null);
    const [paymentStatus, setPaymentStatus] = useState(null);

    const handleCopyUpi = () => {
        navigator.clipboard.writeText(UPI_ID).then(() => {
            setCopied(true);
            window.setTimeout(() => setCopied(false), 2000);
        });
    };

    const handlePaymentAreaClick = () => {
        const amt = parseDonationAmount(form.amount);
        if (amt === null) {
            setError('Please enter a valid donation amount.');
            const amtInput = document.getElementById('amount');
            if (amtInput) {
                amtInput.focus();
                amtInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }
        setError('');
        setSelectedApp(null);
        setPaymentStatus(null);
        setShowModal(true);
    };

    const handleSelectApp = (appId, appName) => {
        const amt = parseDonationAmount(form.amount);
        if (amt === null) {
            setError('Please enter a valid donation amount.');
            return;
        }

        setSelectedApp(appName);
        const note = (form.message || `Donation from ${form.donor_name || 'Well wisher'}`).trim();
        const upiUri = `upi://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent('Balivada Ramarao Patnaik Charitable Trust')}&am=${encodeURIComponent(amt.toFixed(2))}&cu=INR&tn=${encodeURIComponent(note.slice(0, 50))}`;

        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        if (isMobile) {
            setPaymentStatus('mobile_pending');
            window.location.href = upiUri;
        } else {
            setPaymentStatus('desktop_fallback');
        }
    };

    const load = useCallback(async () => {
        try {
            setError('');
            const records = await pb.collection('donors').getFullList({ sort: '-created' });
            setDonors(records);
        } catch (err) {
            if (!String(err?.message || '').includes('autocancelled')) {
                setError('We could not load donations just now. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        load();
    }, [load]);

    const totals = useMemo(() => {
        const amount = donors.reduce((sum, d) => sum + Number(d.amount || 0), 0);

        return { amount, count: donors.length, progress: Math.min(100, Math.round((amount / GOAL) * 100)) };
    }, [donors]);

    const ticker = useMemo(() => (donors.length ? [...donors, ...donors] : []), [donors]);

    const submit = (event) => {
        event.preventDefault();
        const amount = parseDonationAmount(form.amount);

        if (!form.donor_name.trim() || !/^\d{10}$/.test(form.phone_number.trim()) || amount === null) {
            setError('Please enter your name, a 10-digit phone number and a valid amount.');
            return;
        }

        setError('');
        setDone(true);
        window.setTimeout(() => setDone(false), 6000);
    };
    const handleWhatsAppDonate = (event) => {
        event.preventDefault();
        setError('');

        const name = form.donor_name.trim();
        const amt = form.amount.trim();

        if (!name) {
            setError('Please enter your name.');
            return;
        }

        if (!amt) {
            setError('Please enter a donation amount.');
            return;
        }

        const parsedAmt = parseDonationAmount(amt);
        if (parsedAmt === null) {
            setError('Please enter a valid donation amount.');
            return;
        }

        const message = `Hello, I am ${name}. I would like to donate ₹${parsedAmt} to Balivada Ramarao Patnaik Charitable Trust. Please guide me through the donation process. Thank you.`;
        const encodedMessage = encodeURIComponent(message);

        window.open(`https://wa.me/919290834533?text=${encodedMessage}`, '_blank', 'noopener,noreferrer');
    };

    const field =
        'w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 text-[15px] text-[#111827] placeholder:text-[#9CA3AF] transition-all duration-200 focus:border-[#3B82F6] focus:outline-none focus:ring-4 focus:ring-[#3B82F6]/15';

    return (
        <>
            <section id="donate" className="relative overflow-hidden bg-[#EEF5FF] py-24 sm:py-32">
                <div
                    aria-hidden
                    className="pointer-events-none absolute -right-24 top-10 h-[26rem] w-[26rem] rounded-full bg-[#3B82F6]/12 blur-3xl"
                />
                <div className="relative mx-auto max-w-[72rem] px-6">
                    <Reveal>
                        <p className="text-xs uppercase tracking-[0.28em] text-[#2563EB]">Give with confidence</p>
                        <h2 className="mt-4 max-w-2xl font-display text-4xl leading-[1.08] text-[#111827] sm:text-5xl">
                            A small gift today becomes someone's whole tomorrow.
                        </h2>
                        <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-[#4B5563]">
                            Every rupee is spent in the villages we serve — school kits, medicines, meals and skill
                            training. No middlemen, no overheads, full transparency.
                        </p>
                    </Reveal>

                    <div className="mt-14 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
                        <Reveal>
                            <div className="glass h-full rounded-[2rem] border border-white/80 p-8 shadow-soft transition-shadow duration-500 hover:shadow-lift sm:p-10">
                                <div className="flex items-baseline justify-between gap-4">
                                    <div>
                                        <p className="text-sm text-[#4B5563]">Raised so far</p>
                                        <p className="mt-1 font-display text-3xl text-brand-green font-bold">
                                            <CountUp value={totals.amount} prefix="₹" locale="en-IN" />
                                        </p>
                                    </div>
                                    <p className="text-sm text-[#4B5563]">Goal {formatINR(GOAL)}</p>
                                </div>
                                <div className="mt-5 h-2.5 w-full overflow-hidden rounded-full bg-white/90 ring-1 ring-brand-green/10">
                                    <motion.div
                                        className="h-full rounded-full bg-gradient-to-r from-brand-green via-brand-green to-brand-accent"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${Math.max(totals.progress, 3)}%` }}
                                        transition={{ duration: 1.1, ease: 'easeOut' }}
                                    />
                                </div>
                                <p className="mt-3 text-sm text-[#4B5563]">
                                    {totals.progress}% of this year's community fund · {totals.count} donors
                                </p>

                                <form onSubmit={submit} className="mt-8 space-y-4">
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="donor_name" className="text-sm text-[#4B5563]">Full name</label>
                                            <input
                                                id="donor_name"
                                                className={field}
                                                value={form.donor_name}
                                                onChange={(e) => setForm({ ...form, donor_name: e.target.value })}
                                                placeholder="Your name"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="phone_number" className="text-sm text-[#4B5563]">Phone number</label>
                                            <input
                                                id="phone_number"
                                                inputMode="numeric"
                                                className={field}
                                                value={form.phone_number}
                                                onChange={(e) => setForm({ ...form, phone_number: e.target.value })}
                                                placeholder="10-digit mobile"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="amount" className="text-sm text-[#4B5563]">Amount (INR)</label>
                                            <input
                                                id="amount"
                                                inputMode="numeric"
                                                className={field}
                                                value={form.amount}
                                                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="city" className="text-sm text-[#4B5563]">City (optional)</label>
                                            <input
                                                id="city"
                                                className={field}
                                                value={form.city}
                                                onChange={(e) => setForm({ ...form, city: e.target.value })}
                                                placeholder="Visakhapatnam"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {[1000, 2500, 5000, 11000].map((amt) => (
                                            <button
                                                key={amt}
                                                type="button"
                                                onClick={() => setForm({ ...form, amount: String(amt) })}
                                                className="rounded-full border border-brand-dark/10 bg-white px-4 py-2 text-sm font-medium text-brand-green transition-all duration-250 hover:-translate-y-0.5 hover:border-brand-accent hover:text-brand-dark hover:bg-brand-accent/10 active:scale-95"
                                            >
                                                {formatINR(amt)}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="message" className="text-sm text-[#4B5563]">Message (optional)</label>
                                        <textarea
                                            id="message"
                                            rows={2}
                                            className={field}
                                            value={form.message}
                                            onChange={(e) => setForm({ ...form, message: e.target.value })}
                                            placeholder="Why you are giving today"
                                        />
                                    </div>
                                    <label className="flex cursor-pointer items-center gap-3 text-sm text-[#4B5563]">
                                        <input
                                            type="checkbox"
                                            checked={form.anonymous}
                                            onChange={(e) => setForm({ ...form, anonymous: e.target.checked })}
                                            className="h-4 w-4 rounded border-[#E5E7EB] accent-brand-green"
                                        />
                                        Donate anonymously
                                    </label>

                                    {error && <p className="text-sm text-[#B42318]">{error}</p>}

                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <PillButton type="submit" disabled={submitting} className="w-full sm:w-auto">
                                            {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Heart className="h-4 w-4" />}
                                            {submitting ? 'Recording donation' : 'Complete donation'}
                                        </PillButton>
                                        <PillButton
                                            type="button"
                                            onClick={handleWhatsAppDonate}
                                            variant="soft"
                                            className="w-full sm:w-auto"
                                        >
                                            <MessageCircle className="h-4 w-4" />
                                            Donate via WhatsApp
                                        </PillButton>
                                    </div>

                                    <AnimatePresence>
                                        {done && (
                                            <motion.p
                                                initial={{ opacity: 0, y: 6 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0 }}
                                                className="rounded-2xl bg-white px-4 py-3 text-sm text-brand-green font-medium"
                                            >
                                                Payment verification is required before your donation can be recorded. Complete the UPI payment and share the transaction reference with the trust.
                                            </motion.p>
                                        )}
                                    </AnimatePresence>
                                </form>
                            </div>
                        </Reveal>

                        <Reveal delay={0.1}>
                            <div className="h-full rounded-[2rem] border border-[#E5E7EB] bg-white p-8 shadow-soft sm:p-10">
                                <p className="text-xs uppercase tracking-[0.24em] text-[#2563EB]">Pay by UPI</p>
                                <div className="mt-6 flex flex-col items-center rounded-3xl bg-[#FAFCFF] p-8 text-center">
                                    <p className="font-display text-lg font-medium text-[#111827] mb-4">Scan to Donate</p>
                                    
                                    <button
                                        type="button"
                                        onClick={handlePaymentAreaClick}
                                        className="group relative grid h-40 w-40 place-items-center overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-soft transition-all duration-300 hover:scale-[1.03] hover:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/50"
                                        title="Click to pay via UPI app"
                                    >
                                        <img src={phonepeQr} alt="PhonePe QR Code for Donation" className="h-full w-full object-cover" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white text-xs font-semibold p-2">
                                            <QrCode className="h-6 w-6 mb-1" />
                                            <span>Pay via UPI App</span>
                                        </div>
                                    </button>

                                    <div className="mt-6 w-full flex flex-col items-center gap-3">
                                        <div className="flex flex-col items-center">
                                            <span className="text-xs text-[#6B7280] font-medium uppercase tracking-wider">UPI ID</span>
                                            <button
                                                type="button"
                                                onClick={handlePaymentAreaClick}
                                                className="mt-1 font-mono select-all rounded-full bg-brand-accent/15 px-4 py-2 text-sm font-semibold text-brand-dark border border-brand-accent/10 hover:border-brand-accent/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-accent/40"
                                            >
                                                {UPI_ID}
                                            </button>
                                        </div>

                                        <div className="relative flex flex-col items-center">
                                            <button
                                                type="button"
                                                onClick={handleCopyUpi}
                                                className="rounded-full bg-white border border-brand-dark/10 px-4 py-1.5 text-xs font-medium text-brand-dark shadow-sm hover:border-brand-accent hover:text-brand-dark hover:bg-brand-accent/10 transition-all duration-200 active:scale-95 flex items-center gap-1.5"
                                            >
                                                <Copy className="h-3 w-3" />
                                                Copy UPI ID
                                            </button>
                                            <AnimatePresence>
                                                {copied && (
                                                    <motion.span
                                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                        animate={{ opacity: 1, y: 4, scale: 1 }}
                                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                        className="absolute top-full whitespace-nowrap rounded-md bg-brand-green px-2 py-0.5 text-[11px] font-medium text-white shadow-sm"
                                                    >
                                                        UPI ID copied
                                                    </motion.span>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                    <p className="mt-6 text-sm leading-relaxed text-[#4B5563]">
                                        Works with PhonePe, GPay, Paytm and all UPI apps. You can enter the UPI ID <strong>{UPI_ID}</strong> directly in your payment app or scan. Add your name in the payment note so we can record your donation.
                                    </p>
                                </div>
                                <ul className="mt-8 space-y-4">
                                    {[
                                        { icon: ShieldCheck, text: 'Registered charitable trust, audited annually' },
                                        { icon: Lock, text: 'Secure UPI / bank transfer — we never store card data' },
                                        { icon: BadgeCheck, text: '80G receipt issued on request within 7 days' },
                                    ].map((item) => (
                                        <li key={item.text} className="flex items-start gap-3 text-sm text-[#4B5563]">
                                            <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-accent/15 text-brand-dark">
                                                <item.icon className="h-4 w-4" strokeWidth={1.75} />
                                            </span>
                                            {item.text}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            <section id="donors" className="py-24 sm:py-32">
                <div className="mx-auto max-w-[78rem] px-6">
                    <Reveal>
                        <div className="max-w-2xl">
                            <p className="text-xs uppercase tracking-[0.28em] text-brand-green font-semibold">Gratitude</p>
                            <h2 className="mt-4 font-display text-4xl leading-[1.08] text-[#111827] sm:text-5xl">
                                Our Generous Donors
                            </h2>
                            <p className="mt-5 text-[17px] leading-relaxed text-[#4B5563]">
                                Every contribution helps us transform lives and create lasting impact.
                            </p>
                        </div>
                    </Reveal>

                    <div className="mt-12 grid gap-4 sm:grid-cols-3">
                        {[
                            { icon: IndianRupee, label: 'Total raised', node: <CountUp value={totals.amount} prefix="₹" locale="en-IN" /> },
                            { icon: Users, label: 'Total donors', node: <CountUp value={totals.count} /> },
                            {
                                icon: TrendingUp,
                                label: 'Largest gift',
                                node: <CountUp value={donors.reduce((m, d) => Math.max(m, Number(d.amount || 0)), 0)} prefix="₹" locale="en-IN" />,
                            },
                        ].map((stat, i) => (
                            <Reveal key={stat.label} delay={i * 0.06}>
                                <div className="glass rounded-3xl border border-white/80 p-6 shadow-soft transition-all duration-250 ease-out hover:-translate-y-1 hover:border-brand-accent/30 hover:shadow-lift">
                                    <stat.icon className="h-5 w-5 text-brand-green" strokeWidth={1.75} />
                                    <p className="mt-4 font-display text-3xl text-[#111827]">{stat.node}</p>
                                    <p className="mt-1 text-sm text-[#4B5563]">{stat.label}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>

                    {ticker.length > 0 && (
                        <div className="mt-10 overflow-hidden rounded-full border border-[#E5E7EB] bg-white py-3">
                            <div className="flex w-max animate-marquee gap-10 px-6">
                                {ticker.map((d, i) => (
                                    <span key={`${d.id}-${i}`} className="whitespace-nowrap text-sm text-[#4B5563]">
                                        <span className="text-brand-green font-semibold">{d.anonymous ? 'Anonymous Donor ❤️' : d.donor_name}</span>
                                        {` gave ${formatINR(d.amount)}`}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {loading &&
                            [0, 1, 2].map((i) => (
                                <div key={i} className="h-44 animate-pulse rounded-3xl border border-[#E5E7EB] bg-white" />
                            ))}

                        {!loading && donors.length === 0 && (
                            <p className="text-[15px] text-[#4B5563]">
                                No donations recorded yet — be the first to support this work.
                            </p>
                        )}

                        {!loading &&
                            donors.map((d, i) => (
                                <Reveal key={d.id} delay={Math.min(i, 6) * 0.05}>
                                    <article className="group h-full rounded-3xl border border-[#E5E7EB] bg-white/85 p-6 shadow-soft backdrop-blur transition-all duration-250 ease-out hover:-translate-y-1 hover:border-brand-accent/30 hover:shadow-lift">
                                        <div className="flex items-center gap-4">
                                            <span className="grid h-12 w-12 place-items-center rounded-full bg-brand-accent/15 font-semibold text-brand-dark transition-transform duration-300 group-hover:scale-105">
                                                {d.anonymous ? <Heart className="h-5 w-5" strokeWidth={1.75} /> : initials(d.donor_name)}
                                            </span>
                                            <div className="min-w-0">
                                                <p className="truncate font-medium text-[#111827]">
                                                    {d.anonymous ? 'Anonymous Donor ❤️' : d.donor_name}
                                                </p>
                                                <p className="text-sm text-[#4B5563]">
                                                    {d.anonymous ? 'Details withheld by request' : maskPhone(d.phone_number)}
                                                    {!d.anonymous && d.city ? ` · ${d.city}` : ''}
                                                </p>
                                            </div>
                                        </div>
                                        <p className="mt-5 font-display text-2xl text-brand-green font-bold">{formatINR(d.amount)}</p>
                                        <p className="mt-1 text-xs uppercase tracking-[0.16em] text-[#9CA3AF]">
                                            {formatDate(d.created)}
                                        </p>
                                        {d.message && (
                                            <p className="mt-4 border-t border-[#E5E7EB] pt-4 text-[15px] leading-relaxed text-[#4B5563]">
                                                “{d.message}”
                                            </p>
                                        )}
                                    </article>
                                </Reveal>
                            ))}
                    </div>
                </div>
            </section>

            <AnimatePresence>
                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowModal(false)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />

                        {/* Modal Content */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: 'spring', duration: 0.4 }}
                            className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-[#E5E7EB] bg-white p-8 shadow-xl"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setShowModal(false)}
                                className="absolute right-6 top-6 flex h-8 w-8 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#4B5563] hover:border-brand-accent hover:text-brand-dark hover:bg-brand-accent/10 transition-all duration-200"
                                aria-label="Close modal"
                            >
                                <X className="h-4 w-4" />
                            </button>

                            {!paymentStatus ? (
                                <>
                                    <h3 className="font-display text-2xl text-[#111827] font-bold">Choose Payment Method</h3>
                                    <p className="mt-2 text-sm text-[#4B5563]">
                                        Amount to support: <strong className="text-brand-green font-bold">{formatINR(form.amount)}</strong>
                                    </p>

                                    <div className="mt-6 grid gap-3">
                                        {[
                                            { id: 'phonepe', name: 'PhonePe', color: 'hover:border-[#5f259f] hover:bg-[#5f259f]/5' },
                                            { id: 'gpay', name: 'Google Pay', color: 'hover:border-[#4285F4] hover:bg-[#4285F4]/5' },
                                            { id: 'paytm', name: 'Paytm', color: 'hover:border-[#00b9f5] hover:bg-[#00b9f5]/5' },
                                            { id: 'other', name: 'Other UPI App', color: 'hover:border-[#2563EB] hover:bg-[#2563EB]/5' },
                                        ].map((app) => (
                                            <button
                                                key={app.id}
                                                onClick={() => handleSelectApp(app.id, app.name)}
                                                className={`flex items-center justify-between rounded-2xl border border-[#E5E7EB] bg-white px-5 py-4 text-left font-medium text-[#111827] shadow-sm transition-all duration-200 active:scale-[0.98] ${app.color}`}
                                            >
                                                <span>{app.name}</span>
                                                <ArrowRight className="h-4 w-4 text-[#9CA3AF]" />
                                            </button>
                                        ))}

                                        <button
                                            onClick={() => handleSelectApp('any', 'UPI App')}
                                            className="mt-2 w-full rounded-2xl bg-brand-accent py-4 text-center font-semibold text-brand-dark shadow-soft transition-all duration-200 hover:bg-brand-accent/90 active:scale-[0.98]"
                                        >
                                            Pay using any UPI app
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="flex flex-col items-center py-6 text-center">
                                    {paymentStatus === 'desktop_fallback' ? (
                                        <>
                                            <div className="grid h-16 w-16 place-items-center rounded-full bg-[#FEF3C7] text-[#D97706]">
                                                <QrCode className="h-8 w-8" />
                                            </div>
                                            <h3 className="mt-6 font-display text-xl text-[#111827] font-bold">UPI Not Supported</h3>
                                            <p className="mt-3 text-sm leading-relaxed text-[#4B5563]">
                                                UPI payment isn't supported on this device. Please scan the QR code or copy the UPI ID below.
                                            </p>
                                            <div className="mt-6 w-full rounded-2xl bg-brand-cream/80 p-4 text-left font-mono text-sm font-semibold text-brand-dark border border-brand-dark/10 select-all flex items-center justify-between">
                                                <span>UPI ID: {UPI_ID}</span>
                                                <button
                                                    onClick={handleCopyUpi}
                                                    className="text-xs font-sans text-[#4B5563] hover:text-brand-green underline"
                                                >
                                                    Copy
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="grid h-16 w-16 place-items-center rounded-full bg-brand-accent/20 text-brand-green animate-pulse">
                                                <ShieldCheck className="h-8 w-8" />
                                            </div>
                                            <h3 className="mt-6 font-display text-xl text-[#111827] font-bold">Opening {selectedApp}...</h3>
                                            <p className="mt-3 text-sm leading-relaxed text-[#4B5563]">
                                                Complete the payment in your UPI app. After payment, please retain your transaction reference.
                                            </p>
                                        </>
                                    )}

                                    <div className="mt-8 flex gap-3 w-full">
                                        <button
                                            onClick={() => setPaymentStatus(null)}
                                            className="w-1/2 rounded-2xl border border-[#E5E7EB] py-3 text-sm font-medium text-[#4B5563] hover:bg-gray-50 transition-colors"
                                        >
                                            Go Back
                                        </button>
                                        <button
                                            onClick={() => setShowModal(false)}
                                            className="w-1/2 rounded-2xl bg-brand-accent py-3 text-sm font-semibold text-brand-dark hover:bg-brand-accent/90 transition-colors"
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

export default DonateDonors;
