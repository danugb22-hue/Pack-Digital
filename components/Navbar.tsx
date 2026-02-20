
import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 h-20 px-6 flex items-center justify-between bg-white/80 backdrop-blur-md z-50">
      <div className="flex items-center space-x-2">
        <div className="w-12 h-12 flex items-center justify-center">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Volkswagen_logo_2019.svg/500px-Volkswagen_logo_2019.svg.png" 
            alt="Volkswagen Logo" 
            className="w-full h-full object-contain"
          />
        </div>
      </div>
      <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#001e50]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>
    </nav>
  );
};

export default Navbar;
