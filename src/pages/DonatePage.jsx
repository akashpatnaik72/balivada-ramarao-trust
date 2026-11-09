import React from 'react';
import Navbar from '@/components/site/Navbar';
import DonateDonors from '@/components/site/DonateDonors';
import Footer from '@/components/site/Footer';
import Seo from '@/components/Seo';

const DonatePage = () => {
    return (
        <div className="min-h-screen bg-[#FAFCFF]">
            <Seo
                title="Secure Donation - balivada ramarao PATNAIK charitable trust"
                description="Securely donate online via PhonePe, GPay, Paytm or other UPI apps, and view our donor list."
                siteName="balivada ramarao PATNAIK charitable trust"
            />

            <Navbar />

            <div className="pt-20">
                <DonateDonors />
            </div>

            <Footer />
        </div>
    );
};

export default DonatePage;
