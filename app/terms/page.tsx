import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className="flex flex-col gap-y-3 w-full overflow-y-auto scrollbar-hide p-5">
        <div className="flex flex-col gap-y-3 max-w-lg mx-auto items-center bg-slate-50 p-5 rounded-md shadow-md">
            <h1 className="font-plex-sans font-regular text-[16px] sm:text-[18px] md:text[20px]">Terms of Service</h1>
            <p className="font-plex-sans font-light text-[10px] md:text-[12px]">
                {`Last updated: 06/27/2025`}
            </p>
            <div className="flex flex-col gap-y-3 w-full">
                <h2 className="font-plex-sans font-regular text-[14px] sm:text-[16px] md:text[18px]">1. Introduction</h2>
                <p className="font-plex-sans font-light text-[10px] md:text-[12px]">
                    {`These terms of service ("Terms") govern your use of the services provided by Shadow ("we," "us," or "our"). By accessing or using our services, you agree to comply with and be bound by these Terms. If you do not agree with these Terms, please do not use our services.`}
                </p>
                <h2 className="font-plex-sans font-regular text-[14px] sm:text-[16px] md:text[18px]">2. User Accounts</h2>
                <p className="font-plex-sans font-light text-[10px] md:text-[12px]">
                    {`You must be at least 18 years old to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.`}
                </p>
                <h2 className="font-plex-sans font-regular text-[14px] sm:text-[16px] md:text[18px]">3. User Conduct</h2>
                <p className="font-plex-sans font-light text-[10px] md:text-[12px]">
                    {`You are responsible for all content you submit or post to our services. You must not use our services to submit or post any content that is unlawful, harmful, or violates the rights of others.`}
                </p>
                <h2 className="font-plex-sans font-regular text-[14px] sm:text-[16px] md:text[18px]">4. Privacy</h2>
                <p className="font-plex-sans font-light text-[10px] md:text-[12px]">
                    {`We respect your privacy and are committed to protecting your personal information. Our Privacy Policy explains how we collect, use, and share your information.`}
                </p>
                <h2 className="font-plex-sans font-regular text-[14px] sm:text-[16px] md:text[18px]">5. Disclaimer</h2>
                <p className="font-plex-sans font-light text-[10px] md:text-[12px]">
                    {`Our services are provided "as is" and "as available" without any warranties of any kind, either express or implied. We do not guarantee that our services will be uninterrupted or error-free.`}
                </p>
                <h2 className="font-plex-sans font-regular text-[14px] sm:text-[16px] md:text[18px]">6. Limitation of Liability</h2>
                <p className="font-plex-sans font-light text-[10px] md:text-[12px]">
                    {`We are not liable for any damages arising from your use of our services.`}
                </p>
                <h2 className="font-plex-sans font-regular text-[14px] sm:text-[16px] md:text[18px]">7. Changes to Terms</h2>
                <p className="font-plex-sans font-light text-[10px] md:text-[12px]">
                    {`We may update these Terms from time to time. Any changes will be posted on this page.`}
                </p>
                <h2 className="font-plex-sans font-regular text-[14px] sm:text-[16px] md:text[18px]">8. Contact Us</h2>
                <p className="font-plex-sans font-light text-[10px] md:text-[12px]">
                    {`If you have any questions about these Terms, please contact us at shadow-relent@gmail.com.`}
                </p>
                <Link href="/" className="flex items-center justify-center w-full bg-slate-600 rounded-md">
                    <button className="text-white font-semibold px-2 py-1 text-[10px] sm:text-[12px] md:text-[14px] rounded-md transition-all duration-300 ease-in-out hover:bg-slate-700 w-full">
                        Home
                    </button>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default page