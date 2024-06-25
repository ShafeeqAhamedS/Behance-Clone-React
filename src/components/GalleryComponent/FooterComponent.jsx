import React from 'react';
import { adobe_inverse } from '../../logos';
import { FaCaretDown } from "react-icons/fa";

const FooterComponent = ({pos}) => {
  return (
    <footer className=''>
        <div className={`container-fluid bg-black text-white w-full flex w-full ${pos} bottom-0`}>
            <div className="py-4 px-5">
                <div className="flex items-center">
                    <div className="brand-logo mr-4">
                        <p className='flex items-center hover:opacity-70'>
                            <img src={adobe_inverse} alt={adobe_inverse} className='w-6 h-auto mx-1 grayscale'/>
                            <a className='font-bold text-sm'>Adobe</a>
                        </p>
                    </div>
                    <div>
                        <p className='text-xs font-medium hidden sm:block'>© 2024 Adobe Inc. All rights reserved.</p>
                    </div>
                    <div className='absolute right-0 px-5'>
                        <ul className='flex items-center ml-2'>
                            <li className='mx-2'> 
                                <p className="text-sm cursor-pointer flex items-center">
                                    English &nbsp; <FaCaretDown style={{color:"white"}}/>
                                </p> 
                            </li>
                            <li className='mx-2 hidden md:block'> 
                                <p className="text-sm cursor-pointer">
                                    TOU
                                </p> 
                            </li>
                            <li className='mx-2'> 
                                <p className="text-sm cursor-pointer">
                                    Privacy
                                </p> 
                            </li>
                            <li className='mx-2 hidden md:block'> 
                                <p className="text-sm cursor-pointer">
                                    Community
                                </p> 
                            </li>
                            <li className='mx-2 hidden lg:block'> 
                                <p className="text-sm cursor-pointer">
                                    Cookie Preference
                                </p> 
                            </li>
                            <li className='mx-2 hidden xl:block'> 
                                <p className="text-sm cursor-pointer">
                                    Do not sell or share my personal information
                                </p> 
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </footer>
  );
}

export default FooterComponent;
