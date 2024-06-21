import React, { useState } from 'react';
import { behance_logo } from '../../data';
import { GoChevronDown } from "react-icons/go";
import { BiSolidBell } from "react-icons/bi";
import { adobeLogo } from '../../data';
import './HeaderComponent.css';

const HeaderComponent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <header className='fixed w-full z-10 bg-white shadow'>
        <div className="container-fluid">
          <div className="top-header py-2 px-5 border-b border-gray-200 flex justify-between items-center">
            <div className="brand-logo">
              <img src={behance_logo} alt="Behance Logo" className='w-auto h-6' />
            </div>
            <div className="mobile-menu-toggle md:hidden" onClick={toggleMenu}>
              {isMenuOpen ? <span>&times;</span> : <span>&#9776;</span>}
            </div>
            <nav className={`page-links ${isMenuOpen ? 'open' : ''} hidden md:flex md:items-center`}>
              <ul className='flex flex-col md:flex-row items-center ml-2'>
                <li className='mx-2 text-sm'>
                  <a href="#" className="font-semibold">Discover</a>
                </li>
                <li className='mx-2 text-sm'>
                  <a href="#" className="font-semibold">Assets</a>
                </li>
                <li className='mx-2 text-sm'>
                  <a href="#" className="font-semibold">Jobs</a>
                </li>
                <li className='mx-2 text-sm'>
                  <a href="#" className="font-semibold">Behance</a>
                </li>
                <li className='mx-2 text-sm'>
                  <a href="#" className="font-semibold">Hire Freelancers</a>
                </li>
              </ul>
            </nav>
            <div className="action-area flex items-center hidden md:flex">
              <BiSolidBell className='mx-2' />
              <div className="text-sm login-btn rounded-full font-bold border px-3 py-1 mx-1">
                <a href="#" className='font-bold text-blue-500'>Log In</a>
              </div>
              <div className="signup-btn rounded-full font-bold border px-3 py-1 mx-1 bg-blue-500 text-white">
                <a href="#">Sign Up</a>
              </div>
              <div className="adobe-btn mx-3">
                <a href="#" className='flex items-center hover:opacity-70'>
                  <img src={adobeLogo} alt="Adobe Logo" className='w-4 h-4 mx-1' />
                  <p className='font-bold text-xs'>Adobe</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default HeaderComponent;