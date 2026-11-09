import React, { useCallback, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const variants = {
    primary:
        'bg-brand-accent text-brand-dark hover:bg-[#c9e448] shadow-soft hover:shadow-lift focus-visible:ring-brand-accent/40 font-semibold',
    ghost:
        'bg-transparent text-brand-dark border border-brand-dark/25 hover:border-brand-dark hover:bg-brand-dark/5 ripple-dark focus-visible:ring-brand-dark/20',
    soft:
        'bg-brand-green/10 text-brand-green hover:bg-brand-green/15 ripple-dark focus-visible:ring-brand-green/30',
};

const PillButton = React.forwardRef(function PillButton(
    { as = 'button', variant = 'primary', className, children, onClick, ...props },
    forwardedRef,
) {
    const Comp = as;
    const localRef = useRef(null);
    const [ripples, setRipples] = useState([]);

    const handleClick = useCallback(
        (event) => {
            const el = localRef.current;

            if (el) {
                const rect = el.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const id = Date.now() + Math.random();

                setRipples((prev) => [
                    ...prev,
                    {
                        id,
                        style: {
                            width: size,
                            height: size,
                            left: (event.clientX ?? rect.left + rect.width / 2) - rect.left - size / 2,
                            top: (event.clientY ?? rect.top + rect.height / 2) - rect.top - size / 2,
                        },
                    },
                ]);
                window.setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 650);
            }

            if (onClick) onClick(event);
        },
        [onClick],
    );

    return (
        <Comp
            ref={(node) => {
                localRef.current = node;
                if (typeof forwardedRef === 'function') forwardedRef(node);
                else if (forwardedRef) forwardedRef.current = node;
            }}
            onClick={handleClick}
            className={cn(
                'ripple-btn inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-semibold tracking-[0.01em]',
                'min-h-[48px] cursor-pointer select-none transition-all duration-250 ease-out will-change-transform',
                'hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.975]',
                'focus:outline-none focus-visible:ring-4',
                variants[variant],
                className,
            )}
            {...props}
        >
            {ripples.map((r) => (
                <span key={r.id} className="ripple" style={r.style} />
            ))}
            {children}
        </Comp>
    );
});

export default PillButton;
