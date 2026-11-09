import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, HeartHandshake } from 'lucide-react';

const HeroFlipCard = () => {
    const reduceMotion = useReducedMotion();

    const floatTransition = reduceMotion
        ? undefined
        : { duration: 1.2, ease: [0.22, 1, 0.36, 1] };

    return (
        <motion.div
            className="relative w-full max-w-[31rem] aspect-[0.88] sm:aspect-square select-none"
            initial={{ opacity: 0, scale: 0.94, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            whileHover={reduceMotion ? undefined : { scale: 1.012 }}
        >
            <div className="absolute inset-[7%] rounded-full border border-brand-green/15" />
            <div className="absolute inset-[15%] rounded-full border border-brand-green/10" />
            <div className="hero-orbit-drift absolute inset-[4%] rounded-full border border-dashed border-brand-accent/30" />

            <motion.div
                className="absolute inset-0 grid place-items-center"
                animate={reduceMotion ? undefined : { y: [0, -5, 0] }}
                transition={reduceMotion ? undefined : { duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            >
                <div className="relative flex h-[82%] w-[82%] flex-col items-center justify-center rounded-[42%] bg-[#fdfcf8]/88 px-8 py-10 text-center shadow-[0_28px_80px_-34px_rgba(111,127,56,0.42)] backdrop-blur-sm sm:h-[78%] sm:w-[78%]">
                    <div className="absolute left-7 top-7 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-brand-green">
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-accent" />
                        A living promise
                    </div>

                    <motion.div
                        className="hero-heart-breathe relative mt-4 w-[58%] max-w-[15rem]"
                        animate={reduceMotion ? undefined : { y: [0, -3, 0] }}
                        transition={reduceMotion ? undefined : { duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        <svg viewBox="0 0 240 240" className="relative z-10 h-auto w-full" role="img" aria-label="Illustrated heart representing care and service">
                            <defs>
                                <linearGradient id="heroHeartGradient" x1="12%" y1="5%" x2="88%" y2="95%">
                                    <stop offset="0%" stopColor="#d6ed61" />
                                    <stop offset="52%" stopColor="#a9c83d" />
                                    <stop offset="100%" stopColor="#6f7f38" />
                                </linearGradient>
                                <filter id="heroHeartShadow" x="-30%" y="-30%" width="160%" height="170%">
                                    <feDropShadow dx="0" dy="14" stdDeviation="12" floodColor="#6f7f38" floodOpacity="0.2" />
                                </filter>
                            </defs>
                            <path
                                filter="url(#heroHeartShadow)"
                                fill="url(#heroHeartGradient)"
                                d="M120 202C104 181 34 139 34 78c0-31 22-54 51-54 18 0 31 9 35 25 4-16 17-25 35-25 29 0 51 23 51 54 0 61-70 103-86 124Z"
                            />
                            <path
                                d="M70 61c10-15 29-19 43-10"
                                fill="none"
                                stroke="rgba(255,255,255,.62)"
                                strokeLinecap="round"
                                strokeWidth="7"
                            />
                        </svg>
                        <span className="absolute -bottom-3 left-1/2 h-5 w-[48%] -translate-x-1/2 rounded-full bg-brand-green/20 blur-xl" />
                    </motion.div>

                    <motion.div
                        className="mt-6"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ ...floatTransition, delay: 0.55 }}
                    >
                        <p className="font-display text-2xl font-semibold tracking-[0.12em] text-brand-dark sm:text-3xl">SAVE LIVES</p>
                        <p className="mt-3 max-w-[15rem] text-[11px] leading-relaxed text-brand-dark/55">
                            Care becomes action when a community chooses to show up.
                        </p>
                    </motion.div>

                    <div className="absolute bottom-7 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-muted">
                        <HeartHandshake className="h-3.5 w-3.5 text-brand-green" strokeWidth={1.7} />
                        Since 2010
                    </div>
                </div>
            </motion.div>

            <motion.div
                className="absolute right-[6%] top-[26%] hidden items-center gap-2 rounded-full border border-brand-green/10 bg-white/86 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-green shadow-soft backdrop-blur sm:flex"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.72, ease: [0.22, 1, 0.36, 1] }}
            >
                <span className="h-1.5 w-1.5 rounded-full bg-brand-accent" />
                People first
            </motion.div>

            <motion.div
                className="absolute bottom-[18%] left-[2%] flex items-center gap-2 rounded-full border border-brand-green/10 bg-white/86 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-green shadow-soft backdrop-blur"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.86, ease: [0.22, 1, 0.36, 1] }}
            >
                Quietly, every day
                <ArrowUpRight className="h-3.5 w-3.5 text-brand-accent" />
            </motion.div>
        </motion.div>
    );
};

export default HeroFlipCard;
