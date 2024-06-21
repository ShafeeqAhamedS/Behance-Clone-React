import React from 'react'
import {behance_logo} from '../../data'
import { GoChevronDown } from "react-icons/go";
import { BiSolidBell } from "react-icons/bi";
import {adobeLogo} from '../../data'
import './HeaderComponent.css'


const HeaderComponent = () => {
  return (
    <div>
        <header>
            <div className="container-fluid bg-white">
                <div className="top-header py-2 px-5 border-b border flex justify-between ">
                    <div className="navbar flex items-center ">
                        <div className="brand-logo">
                            <img src={behance_logo} alt={behance_logo} className='w-auto h-4'/>
                        </div>
                        <div className="page-links">
                            <ul className='flex items-center ml-2'>
                                <li className='mx-2 text-sm relative'>
                                    <a href="http://" target="_blank" rel="noopener noreferrer" className="active font-semibold">Explore <GoChevronDown className='inline' /> </a>
                                    <div className="dropdown-content">
                                        <a href="http://" target="_blank" rel="noopener noreferrer" className='d-1 text-xs'>Search & Explore</a>
                                        <a href="http://" target="_blank" rel="noopener noreferrer" className='d-2 text-xs'>Curated Galleries</a>
                                    <div className="dropdown-divider"></div>
                                        <a href="http://" target="_blank" rel="noopener noreferrer" className='smaller-font'>Best of Behance</a>
                                        <a href="http://" target="_blank" rel="noopener noreferrer" className='smaller-font'>Graphic Design</a>
                                        <a href="http://" target="_blank" rel="noopener noreferrer" className='smaller-font'>Illustration</a>
                                        <a href="http://" target="_blank" rel="noopener noreferrer" className='smaller-font'>Photography</a>
                                        <a href="http://" target="_blank" rel="noopener noreferrer" className='smaller-font'>UI/UX</a>
                                        <a href="http://" target="_blank" rel="noopener noreferrer" className='smaller-font'>3D Art</a>
                                    </div>
                                </li>
                                <li className='mx-2 font-semibold text-sm'><a href="http://" target="_blank" rel="noopener noreferrer">Assets</a></li>
                                <li className='mx-2 font-semibold text-sm'><a href="http://" target="_blank" rel="noopener noreferrer">Jobs</a></li>
                                <li className='mx-2 font-semibold text-sm behance'>
                                    <a href="http://" target="_blank" rel="noopener noreferrer" className='flex items-center'>
                                        Behance
                                        <a className="pro-btn rounded-md font-bold border mx-2" href="">PRO</a>
                                    </a>                                    
                                </li>
                                <li className='mx-2 text-sm border-l pl-6 relative'>
                                    <a href="http://" target="_blank" rel="noopener noreferrer" className="font-semibold">Hire Freelancers <GoChevronDown className='inline' /></a>
                                    <div className="dropdown-content">
                                        <a href="http://" target="_blank" rel="noopener noreferrer" className='text-xs d-2-1'>Hiring on Behance</a>
                                        <a href="http://" target="_blank" rel="noopener noreferrer" className='text-xs d-2-1'>Find Creatives</a>
                                        <a href="http://" target="_blank" rel="noopener noreferrer" className='text-xs d-2-2'>My Freelance Projects</a>
                                        <a href="http://" target="_blank" rel="noopener noreferrer" className='text-xs d-2-3'>New Freelance Projects</a>
                                    <div className="dropdown-divider"></div>
                                        <a href="http://" target="_blank" rel="noopener noreferrer" className='smaller-font'>Graphic Designers</a>
                                        <a href="http://" target="_blank" rel="noopener noreferrer" className='smaller-font'>Brand Designers</a>
                                        <a href="http://" target="_blank" rel="noopener noreferrer" className='smaller-font'>UI/UX Designer</a>
                                        <a href="http://" target="_blank" rel="noopener noreferrer" className='smaller-font'>Illustrators</a>
                                        <a href="http://" target="_blank" rel="noopener noreferrer" className='smaller-font'>Logo Designers</a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="action-area flex items-center">
                        <BiSolidBell className='mx-2'/>
                        <div className="text-sm login-btn rounded-full font-bold border px-3 py-1 mx-1">
                            <a href="" className='font-bold'>Log In</a>
                        </div>
                        <div className="signup-btn rounded-full font-bold border px-3 py-1 mx-1">
                            <a href="">Sign Up</a>
                        </div>
                        <div className="adobe-btn mx-3">
                            <a href="http://" target="_blank" rel="noopener noreferrer" className='flex items-center hover:opacity-70'>
                                <img src={adobeLogo} alt={adobeLogo} className='w-4 h-4 mx-1'/>
                                <p className='font-bold text-xs'>Adobe</p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    </div>
  )
}

export default HeaderComponent