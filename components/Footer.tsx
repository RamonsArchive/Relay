import Link from "next/link";

const Footer = () => {
  return (
    <footer className="flex flex-col gap-y-6 w-full pb-4 px-5 pt-8 border-t border-slate-200">
      <div className="flex flex-col sm:flex-row w-full gap-8 sm:gap-12">
        {/* Stay Connected Section */}
        <div className="flex flex-col gap-4">
          <h3 className="font-plex-sans font-medium text-lg sm:text-xl text-slate-800">
            Stay Connected
          </h3>
          <div className="flex flex-row gap-4 sm:flex-col sm:gap-3">
            <Link
              href="https://www.instagram.com/ramon.mnm/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 hover:opacity-75 transition-opacity"
              aria-label="Follow us on Instagram"
            >
              <div className="relative w-6 h-6 sm:w-7 sm:h-7">
                <img
                  src="/assets/icons/instagram.svg"
                  alt="Instagram icon"
                  className="object-contain w-full h-full"
                />
              </div>
              <span className="hidden sm:inline font-plex-sans text-sm text-slate-600 group-hover:text-slate-800 transition-colors">
                Instagram
              </span>
            </Link>

            <Link
              href="https://www.facebook.com/profile.php?id=61569189908839"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 hover:opacity-75 transition-opacity"
              aria-label="Follow us on Facebook"
            >
              <div className="relative w-6 h-6 sm:w-7 sm:h-7">
                <img
                  src="/assets/icons/facebook.svg"
                  alt="Facebook icon"
                  className="object-contain w-full h-full"
                />
              </div>
              <span className="hidden sm:inline font-plex-sans text-sm text-slate-600 group-hover:text-slate-800 transition-colors">
                Facebook
              </span>
            </Link>

            <Link
              href="https://www.linkedin.com/in/ramonmnm100"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 hover:opacity-75 transition-opacity"
              aria-label="Connect with us on LinkedIn"
            >
              <div className="relative w-6 h-6 sm:w-7 sm:h-7">
                <img
                  src="/assets/icons/LI-In-Bug.png"
                  alt="LinkedIn icon"
                  className="object-contain w-full h-full"
                />
              </div>
              <span className="hidden sm:inline font-plex-sans text-sm text-slate-600 group-hover:text-slate-800 transition-colors">
                LinkedIn
              </span>
            </Link>
          </div>
        </div>

        {/* Contact Section */}
        <div className="flex flex-col gap-4">
          <h3 className="font-plex-sans font-medium text-lg sm:text-xl text-slate-800">
            Contact Me
          </h3>
          <div className="flex flex-col gap-2">
            <p className="font-plex-sans text-sm text-slate-600">
              Email:
              <Link
                href="mailto:shadow-relent@gmail.com"
                className="ml-1 font-medium text-slate-800 hover:text-blue-600 transition-colors"
              >
                shadow-relent@gmail.com
              </Link>
            </p>
          </div>
        </div>

        {/* Additional Links Section (Optional) */}
        <div className="flex flex-col gap-4">
          <h3 className="font-plex-sans font-medium text-lg sm:text-xl text-slate-800">
            Quick Links
          </h3>
          <div className="flex flex-col gap-2">
            <Link
              href="/privacy"
              className="font-plex-sans text-sm text-slate-600 hover:text-slate-800 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="font-plex-sans text-sm text-slate-600 hover:text-slate-800 transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/about"
              className="font-plex-sans text-sm text-slate-600 hover:text-slate-800 transition-colors"
            >
              About Me
            </Link>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="pt-4 border-t border-slate-200">
        <p className="font-plex-sans font-light text-xs sm:text-sm text-slate-500 text-center sm:text-left">
          © {new Date().getFullYear()} Shadow. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
