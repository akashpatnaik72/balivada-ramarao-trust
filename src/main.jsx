import React, { Component } from 'react';
import ReactDOM from 'react-dom/client';
import '@/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

const StartupLoading = () => (
    <main className="grid min-h-screen place-items-center bg-[#FAF9F5] px-6 text-[#101212]">
        <div className="flex items-center gap-3" role="status" aria-live="polite">
            <span className="h-3 w-3 animate-pulse rounded-full bg-[#B7D334]" />
            <span className="font-display text-lg font-semibold">Loading Balivada Ramarao Patnaik Charitable Trust…</span>
        </div>
    </main>
);

const StartupError = ({ title, error }) => (
    <main className="min-h-screen bg-[#FAF9F5] px-6 py-20 text-[#101212]">
        <section className="mx-auto max-w-2xl rounded-3xl border border-[#E5E7EB] bg-white p-8 shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6F7F38]">Application error</p>
            <h1 className="mt-3 font-display text-3xl font-semibold">{title}</h1>
            <p className="mt-4 text-sm leading-6 text-[#4B5563]">
                The page could not be displayed. Check the browser console for technical details, then reload after correcting the configuration.
            </p>
            {import.meta.env.DEV && error?.message && (
                <pre className="mt-6 overflow-auto rounded-2xl bg-[#101212] p-4 text-xs text-white">{error.message}</pre>
            )}
        </section>
    </main>
);

class ErrorBoundary extends Component {
    state = { error: null };

    static getDerivedStateFromError(error) {
        return { error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('React render failed:', error, errorInfo);
    }

    render() {
        if (this.state.error) {
            return <StartupError title="Something went wrong while rendering this page." error={this.state.error} />;
        }

        return this.props.children;
    }
}

root.render(<StartupLoading />);

import('@/App')
    .then(({ default: App }) => {
        root.render(
            <ErrorBoundary>
                <App />
            </ErrorBoundary>,
        );
    })
    .catch((error) => {
        console.error('Application startup failed:', error);
        root.render(<StartupError title="The application could not start." error={error} />);
    });
