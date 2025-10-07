import React from 'react';

const LinkedInIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"></path>
    </svg>
);

const TwitterIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616v.064c0 2.298 1.634 4.212 3.793 4.649-.65.177-1.354.238-2.08.188.62 1.922 2.423 3.313 4.564 3.354-1.615 1.267-3.633 2.022-5.834 2.022-1.025 0-2.02-.06-3.006-.175 2.089 1.349 4.575 2.13 7.24 2.13 8.683 0 13.44-7.23 13.44-13.442 0-.205-.005-.41-.013-.615.922-.667 1.72-1.5 2.359-2.449z"></path>
    </svg>
);


const Footer: React.FC = () => {
  return (
    <footer className="bg-spyn-slate-800 border-t border-spyn-slate-700 mt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold text-white mb-4">About SPYN</h3>
            <p className="text-spyn-slate-300 text-sm max-w-md">
              SPYN (Smart People You Need) is dedicated to de-risking and formalizing Equity-for-Services partnerships through a secure, transactional platform. We connect innovative founders with top-tier talent, providing the legal and governance framework to build great companies together.
            </p>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-spyn-slate-300 hover:text-spyn-teal-400 transition-colors">Home</a></li>
              <li><a href="#" className="text-spyn-slate-300 hover:text-spyn-teal-400 transition-colors">Find Opportunities</a></li>
              <li><a href="#" className="text-spyn-slate-300 hover:text-spyn-teal-400 transition-colors">EFS Contracts</a></li>
              <li><a href="#" className="text-spyn-slate-300 hover:text-spyn-teal-400 transition-colors">Pricing</a></li>
            </ul>
          </div>

          {/* Contact & Social Section */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
             <p className="text-sm text-spyn-slate-300 mb-4">
                Have questions? Reach out to us. <br/>
                <a href="mailto:contact@spyn.ai" className="text-spyn-teal-400 hover:text-spyn-teal-300">
                    contact@spyn.ai
                </a>
             </p>
            <div className="flex space-x-4">
              <a href="#" className="text-spyn-slate-400 hover:text-white transition-colors" aria-label="Twitter">
                <TwitterIcon />
              </a>
              <a href="#" className="text-spyn-slate-400 hover:text-white transition-colors" aria-label="LinkedIn">
                <LinkedInIcon />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-spyn-slate-700 pt-8 text-center text-sm text-spyn-slate-400">
          <p>&copy; {new Date().getFullYear()} SPYN, Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;