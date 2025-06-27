import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className="flex flex-col gap-y-3 w-full overflow-y-auto scrollbar-hide p-5">
        <div className="flex flex-col gap-y-3 max-w-lg mx-auto items-center bg-slate-50 p-5 rounded-md shadow-md">
            <h1 className="font-plex-sans font-regular text-[16px] sm:text-[18px] md:text[20px]">Privacy Policy</h1>
            <p className="font-plex-sans font-light text-[10px] md:text-[12px]">
                Last updated: 06/27/2025
            </p>
            <div className="flex flex-col gap-y-3 w-full">
                <h2 className="font-plex-sans font-regular text-[14px] sm:text-[16px] md:text[18px]">1. Information We Collect</h2>
                <p className="font-plex-sans font-light text-[10px] md:text-[12px]">
                    We collect information from you when you create an account or place an order.
                </p>
                <h2 className="font-plex-sans font-regular text-[14px] sm:text-[16px] md:text[18px]">2. How We Use Your Information</h2>
                <p className="font-plex-sans font-light text-[10px] md:text-[12px]">
                    We use your information to process your orders and provide you with the best possible service.
                </p>
                <h2 className="font-plex-sans font-regular text-[14px] sm:text-[16px] md:text[18px]">3. How We Share Your Information</h2>
                <p className="font-plex-sans font-light text-[10px] md:text-[12px]">
                    We share your information with third-party service providers who assist us in processing your orders.
                </p>
                <h2 className="font-plex-sans font-regular text-[14px] sm:text-[16px] md:text[18px]">4. How We Protect Your Information</h2>
                <p className="font-plex-sans font-light text-[10px] md:text-[12px]">
                    We take appropriate measures to protect your information from unauthorized access, use, or disclosure.
                </p>
                <h2 className="font-plex-sans font-regular text-[14px] sm:text-[16px] md:text[18px]">5. Your Rights</h2>
                <p className="font-plex-sans font-light text-[10px] md:text-[12px]">
                    You have the right to access, correct, or delete your personal information. You can also opt out of receiving marketing communications from us.
                </p>
                <h2 className="font-plex-sans font-regular text-[14px] sm:text-[16px] md:text[18px]">6. Changes to This Privacy Policy</h2>
                <p className="font-plex-sans font-light text-[10px] md:text-[12px]">
                    We may update this privacy policy from time to time. Any changes will be posted on this page.
                </p>
                <h2 className="font-plex-sans font-regular text-[14px] sm:text-[16px] md:text[18px]">7. Contact Us</h2>
                <p className="font-plex-sans font-light text-[10px] md:text-[12px]">
                    If you have any questions about this privacy policy, please contact us at shadow-relent@gmail.com.
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